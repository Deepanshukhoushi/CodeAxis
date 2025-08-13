import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-primary-dark text-white flex items-center justify-center text-2xl font-bold mb-4">
                JS
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Your name</h2>
              <p className="text-gray-500 dark:text-gray-400">xyz.123@example.com</p>
              
              <div className="mt-6 w-full">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Member Since</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Jan 15, 2025</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Analyses Run</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">48</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Most Used Language</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">JavaScript</span>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-primary-dark hover:bg-primary text-white py-2 px-4 rounded-md transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Analyses</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Language
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Complexity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Mar 28, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      JavaScript
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Medium (14)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-primary-dark hover:text-primary">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Mar 15, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Python
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Low (6)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-primary-dark hover:text-primary">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Feb 22, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Java
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      High (27)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-primary-dark hover:text-primary">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Jan 30, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      TypeScript
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      Medium (18)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-primary-dark hover:text-primary">View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-right">
              <a href="#" className="text-sm text-primary-dark hover:text-primary">View All Analyses →</a>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Account Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Notifications
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                    Send me analysis completion notifications
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    value="api---------------------"
                    readOnly
                  />
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500">
                    Copy
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Use this API key to access the Code Complexity Analyzer API.
                </p>
              </div>
              
              <div className="pt-4">
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 