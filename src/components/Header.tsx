import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/public/favicon.svg"
                alt="CodeAxis Logo"
                className="h-8 w-8"
              />

              <span className="font-bold text-xl text-gray-900 dark:text-white">CodeAxis</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-primary-dark dark:text-primary-light font-medium' : 'text-gray-600 dark:text-gray-300'
              } hover:text-primary-dark dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium`}
            >
              Home
            </Link>
            <Link
              to="/analyzer"
              className={`${
                isActive('/analyzer') ? 'text-primary-dark dark:text-primary-light font-medium' : 'text-gray-600 dark:text-gray-300'
              } hover:text-primary-dark dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium`}
            >
              Analyzer
            </Link>
            <Link
              to="/profile"
              className={`${
                isActive('/profile') ? 'text-primary-dark dark:text-primary-light font-medium' : 'text-gray-600 dark:text-gray-300'
              } hover:text-primary-dark dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium`}
            >
              Profile
            </Link>
          </nav>

          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  isActive('/') ? 'bg-gray-100 dark:bg-gray-700 text-primary-dark dark:text-primary-light' : 'text-gray-600 dark:text-gray-300'
                } hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium`}
              >
                Home
              </Link>
              <Link
                to="/analyzer"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  isActive('/analyzer') ? 'bg-gray-100 dark:bg-gray-700 text-primary-dark dark:text-primary-light' : 'text-gray-600 dark:text-gray-300'
                } hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium`}
              >
                Analyzer
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  isActive('/profile') ? 'bg-gray-100 dark:bg-gray-700 text-primary-dark dark:text-primary-light' : 'text-gray-600 dark:text-gray-300'
                } hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium`}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 