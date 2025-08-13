import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement 
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data for demonstration
const mockAnalysisResults = {
  id: 'sample-analysis-123',
  language: 'JavaScript',
  metrics: {
    cyclomatic: {
      total: 24,
      average: 3.4,
      perFunction: [
        { name: 'main', value: 2 },
        { name: 'calculateTotal', value: 5 },
        { name: 'processData', value: 8 },
        { name: 'handleError', value: 3 },
        { name: 'renderUI', value: 6 }
      ]
    },
    halstead: {
      volume: 1245.32,
      difficulty: 18.5,
      effort: 23038.42,
      time: 1279.91
    },
    maintainability: 68.2,
    cognitive: 16,
    loc: {
      code: 120,
      comments: 35,
      blank: 15,
      total: 170
    }
  },
  timestamp: new Date().toISOString(),
  codeSnapshot: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === 'regular') {
      total += items[i].price;
    } else if (items[i].type === 'discounted') {
      total += items[i].price * 0.9;
    } else if (items[i].type === 'clearance') {
      total += items[i].price * 0.7;
    }
  }
  return total;
}`
};

const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, we would fetch the results from an API
    // For now, we'll use mock data
    setTimeout(() => {
      setResults(mockAnalysisResults);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Analysis not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">The analysis results you're looking for could not be found.</p>
      </div>
    );
  }

  // Data for complexity by function bar chart
  const complexityByFunctionData = {
    labels: results.metrics.cyclomatic.perFunction.map((func: any) => func.name),
    datasets: [
      {
        label: 'Cyclomatic Complexity',
        data: results.metrics.cyclomatic.perFunction.map((func: any) => func.value),
        backgroundColor: 'rgba(75, 85, 202, 0.6)',
        borderColor: 'rgb(67, 56, 202)',
        borderWidth: 1,
      },
    ],
  };

  // Data for code composition pie chart
  const codeCompositionData = {
    labels: ['Code', 'Comments', 'Blank Lines'],
    datasets: [
      {
        label: 'Lines',
        data: [results.metrics.loc.code, results.metrics.loc.comments, results.metrics.loc.blank],
        backgroundColor: [
          'rgba(67, 56, 202, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(209, 213, 219, 0.7)',
        ],
        borderColor: [
          'rgb(67, 56, 202)',
          'rgb(16, 185, 129)',
          'rgb(209, 213, 219)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Analysis Results</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="complexity-card">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Cyclomatic Complexity</h3>
            <p className="text-3xl font-bold text-primary-dark dark:text-primary-light">{results.metrics.cyclomatic.average.toFixed(1)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Avg. per function</p>
          </div>
          
          <div className="complexity-card">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Maintainability</h3>
            <p className="text-3xl font-bold text-primary-dark dark:text-primary-light">{results.metrics.maintainability.toFixed(1)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Index (0-100)</p>
          </div>
          
          <div className="complexity-card">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Cognitive Complexity</h3>
            <p className="text-3xl font-bold text-primary-dark dark:text-primary-light">{results.metrics.cognitive}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total score</p>
          </div>
          
          <div className="complexity-card">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Lines of Code</h3>
            <p className="text-3xl font-bold text-primary-dark dark:text-primary-light">{results.metrics.loc.total}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total lines</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Complexity by Function</h3>
            <div className="h-64">
              <Bar 
                data={complexityByFunctionData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(156, 163, 175, 0.1)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Code Composition</h3>
            <div className="h-64 flex justify-center">
              <div className="w-full max-w-xs">
                <Pie 
                  data={codeCompositionData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Halstead Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{results.metrics.halstead.volume.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{results.metrics.halstead.difficulty.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Effort</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{results.metrics.halstead.effort.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Time (seconds)</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{results.metrics.halstead.time.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Code Sample</h2>
        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-gray-800 dark:text-gray-200">
            {results.codeSnapshot}
          </code>
        </pre>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recommendations</h2>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-md">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Reduce Cyclomatic Complexity</h3>
            <p className="text-yellow-700 dark:text-yellow-300">The 'processData' function has high cyclomatic complexity (8). Consider refactoring by extracting helper functions.</p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 border-l-4 border-green-400 dark:border-green-500 rounded-r-md">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Good Comment Ratio</h3>
            <p className="text-green-700 dark:text-green-300">Your code has a good balance of comments to code (29% comments). This helps with maintainability.</p>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-500 rounded-r-md">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Consider Adding Tests</h3>
            <p className="text-blue-700 dark:text-blue-300">Functions with high complexity like 'calculateTotal' should have comprehensive unit tests to ensure reliability.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage; 