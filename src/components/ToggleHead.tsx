import { useDarkMode } from './DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ToggleHead = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow">
      <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight">Where in the world?</h1>
          <button onClick={toggleDarkMode} className="text-sm px-4 py-2 rounded-full shadow bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
  {darkMode ? (
    <>
      <FontAwesomeIcon icon={faSun} className="text-yellow-500 mr-2" />
      Light Mode
    </>
  ) : (
    <>
      <FontAwesomeIcon icon={faMoon} className="text-gray-500 mr-2" />
      Dark Mode
    </>
  )}
</button>

        </header>
        </div>
   
  );
};

export default ToggleHead;