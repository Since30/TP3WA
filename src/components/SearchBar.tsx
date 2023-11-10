"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Country {
    name: string;
    alpha3Code: string;
    flag: string; 
    population: number;
    region: string;
    capital: string;
}



const CountrySearch: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [continent, setContinent] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v2/all`);
        const data: Country[] = await response.json();
        setCountries(data);
        setFilteredCountries(data); 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const filterCountries = (countries: Country[], searchText: string) => {
      return countries.filter(country =>
        country.name.toLowerCase().startsWith(searchText.toLowerCase())
      );
    };

    if (searchText) {
      setFilteredCountries(filterCountries(countries, searchText));
    } else {
      setFilteredCountries(countries);
    }
  }, [searchText, countries]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleContinentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setContinent(region);

    if (region) {
      try {
        const response = await fetch(`https://restcountries.com/v2/region/${region}`);
        const data: Country[] = await response.json();
        setCountries(data);
        setFilteredCountries(data); 
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      
      try {
        const response = await fetch(`https://restcountries.com/v2/all`);
        const data: Country[] = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">  
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6a7 7 0 0114 0 ..."/>
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search for a country..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full md:w-40">
            <select
              onChange={handleContinentChange}
              value={continent}
              className="block w-full pl-3 pr-10 py-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Filter by Region</option>
              <option value="africa">Africa</option>
              <option value="americas">Americas</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {filteredCountries.map((country: Country) => (
          <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
            <div className="block rounded overflow-hidden shadow-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer h-full flex-col">
              <div className="flex-shrink-0"> 
                <img className="w-full h-32 object-cover" src={country.flag} alt={`Flag of ${country.name}`} />
              </div>
              <div className="flex-grow p-6"> 
                <div className="font-bold text-xl mb-2">{country.name}</div>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  Population: {country.population.toLocaleString()}
                  <br />
                  Region: {country.region}
                  <br />
                  Capital: {country.capital}
                </p>
      </div>
    </div>
  </Link>
))}
</div>
        </div>
</main>
  );
};

export default CountrySearch;