import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          CodeAxis
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Analyze your code's complexity across multiple programming languages. Get insights to improve code quality and maintainability.
        </p>
        <Link
          to="/analyzer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-dark hover:bg-primary transition duration-150 ease-in-out"
        >
          Start Analyzing
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Key Features
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
              Everything you need to analyze and improve your code quality.
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-dark dark:bg-primary-light text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Multi-Language Support</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                Analyze code complexity in Python, Java, C++, JavaScript, and more programming languages.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-dark dark:bg-primary-light text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Comprehensive Metrics</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                Calculate cyclomatic complexity, Halstead metrics, maintainability index, and other advanced metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-dark dark:bg-primary-light text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Visual Reports</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                View interactive visualizations of your code complexity with charts and graphs for easier understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
              Our platform makes code complexity analysis simple and effective.
            </p>
          </div>

          <div className="mt-12">
            <div className="relative">
              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-dark text-white text-2xl font-bold mx-auto">
                    1
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
                    Upload or Paste Code
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Submit your code by uploading a file or pasting directly into our editor.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-dark text-white text-2xl font-bold mx-auto">
                    2
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
                    Select Language & Metrics
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Choose the programming language and which complexity metrics to analyze.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-dark text-white text-2xl font-bold mx-auto">
                    3
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
                    View Detailed Analysis
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Get comprehensive reports with visualizations to understand your code's complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-dark dark:bg-primary rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to analyze your code?
                </h2>
                <p className="mt-4 text-lg text-indigo-100">
                  Start improving your code quality and maintainability today.
                </p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/analyzer"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-dark bg-white hover:bg-indigo-50"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 