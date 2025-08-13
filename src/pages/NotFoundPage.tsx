import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-9xl font-bold text-primary-dark dark:text-primary-light">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 my-6">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary-dark hover:bg-primary text-white rounded-md transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage; 