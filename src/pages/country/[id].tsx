import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ToggleHead from '../../components/ToggleHead';



 
interface CountryDetailProps {
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string[];
    currencies: Array<{ code: string; name: string; symbol: string }>;
    languages: Array<{ iso639_1: string; iso639_2: string; name: string; nativeName: string }>;
    flag: string;
    borders?: string[];
    
  }

  

const CountryDetailPage: React.FC = () => {
  const [country, setCountry] = useState<CountryDetailProps | null>(null);
  const router = useRouter();
  const { id } = router.query;


  useEffect(() => {
    async function fetchCountryData() {
      if (typeof id === 'string') {
        const response = await fetch(`https://restcountries.com/v2/alpha/${id}`);
        const data = await response.json();
        setCountry(data);
      }
    }

    fetchCountryData();
  }, [id]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
       <ToggleHead />
   
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => router.back()} className="mb-12 text-sm px-4 py-2 rounded shadow bg-gray-200 dark:bg-gray-600">
          Back
        </button>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img src={country.flag} alt={`Flag of ${country.name}`} className="shadow-lg rounded" />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <h1 className="text-3xl font-extrabold mb-6">{country.name}</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong>Native Name:</strong> {country.nativeName}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Sub Region:</strong> {country.subregion}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
              </div>
              <div>
                <p><strong>Top Level Domain:</strong> {country.topLevelDomain.join(', ')}</p>
                <p><strong>Currencies:</strong> {country.currencies.map(currency => currency.name).join(', ')}</p>
                <p><strong>Languages:</strong> {country.languages.map(language => language.name).join(', ')}</p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Border Countries:</h2>
              <div className="flex flex-wrap">
                {country.borders?.map(border => (
                  <span key={border} className="m-1 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded shadow">
                    {border}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailPage;
