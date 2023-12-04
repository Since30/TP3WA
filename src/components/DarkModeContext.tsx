import React, { createContext, useState,useContext, useEffect, ReactNode, FunctionComponent } from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: FunctionComponent<DarkModeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

 
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    const root = window.document.documentElement;
    root.classList.toggle('dark', darkMode);
  }, [darkMode]);

  
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
