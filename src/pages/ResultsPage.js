import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
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
const ResultsPage = () => {
    const { id } = useParams();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // In a real app, we would fetch the results from an API
        // For now, we'll use mock data
        setTimeout(() => {
            setResults(mockAnalysisResults);
            setLoading(false);
        }, 1000);
    }, [id]);
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-[500px]", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark" }) }));
    }
    if (!results) {
        return (_jsxs("div", { className: "text-center py-16", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900 dark:text-white", children: "Analysis not found" }), _jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-300", children: "The analysis results you're looking for could not be found." })] }));
    }
    // Data for complexity by function bar chart
    const complexityByFunctionData = {
        labels: results.metrics.cyclomatic.perFunction.map((func) => func.name),
        datasets: [
            {
                label: 'Cyclomatic Complexity',
                data: results.metrics.cyclomatic.perFunction.map((func) => func.value),
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
    return (_jsxs("div", { className: "flex flex-col space-y-8", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-4", children: "Analysis Results" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [_jsxs("div", { className: "complexity-card", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-700 dark:text-gray-300", children: "Cyclomatic Complexity" }), _jsx("p", { className: "text-3xl font-bold text-primary-dark dark:text-primary-light", children: results.metrics.cyclomatic.average.toFixed(1) }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Avg. per function" })] }), _jsxs("div", { className: "complexity-card", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-700 dark:text-gray-300", children: "Maintainability" }), _jsx("p", { className: "text-3xl font-bold text-primary-dark dark:text-primary-light", children: results.metrics.maintainability.toFixed(1) }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Index (0-100)" })] }), _jsxs("div", { className: "complexity-card", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-700 dark:text-gray-300", children: "Cognitive Complexity" }), _jsx("p", { className: "text-3xl font-bold text-primary-dark dark:text-primary-light", children: results.metrics.cognitive }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Total score" })] }), _jsxs("div", { className: "complexity-card", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-700 dark:text-gray-300", children: "Lines of Code" }), _jsx("p", { className: "text-3xl font-bold text-primary-dark dark:text-primary-light", children: results.metrics.loc.total }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Total lines" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4", children: "Complexity by Function" }), _jsx("div", { className: "h-64", children: _jsx(Bar, { data: complexityByFunctionData, options: {
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
                                            } }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4", children: "Code Composition" }), _jsx("div", { className: "h-64 flex justify-center", children: _jsx("div", { className: "w-full max-w-xs", children: _jsx(Pie, { data: codeCompositionData, options: {
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        legend: {
                                                            position: 'bottom',
                                                        },
                                                    },
                                                } }) }) })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4", children: "Halstead Metrics" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Volume" }), _jsx("p", { className: "text-xl font-semibold text-gray-800 dark:text-gray-200", children: results.metrics.halstead.volume.toFixed(2) })] }), _jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Difficulty" }), _jsx("p", { className: "text-xl font-semibold text-gray-800 dark:text-gray-200", children: results.metrics.halstead.difficulty.toFixed(2) })] }), _jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Effort" }), _jsx("p", { className: "text-xl font-semibold text-gray-800 dark:text-gray-200", children: results.metrics.halstead.effort.toFixed(2) })] }), _jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Time (seconds)" }), _jsx("p", { className: "text-xl font-semibold text-gray-800 dark:text-gray-200", children: results.metrics.halstead.time.toFixed(2) })] })] })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-4", children: "Code Sample" }), _jsx("pre", { className: "bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm", children: _jsx("code", { className: "text-gray-800 dark:text-gray-200", children: results.codeSnapshot }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-4", children: "Recommendations" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-md", children: [_jsx("h3", { className: "text-lg font-semibold text-yellow-800 dark:text-yellow-200", children: "Reduce Cyclomatic Complexity" }), _jsx("p", { className: "text-yellow-700 dark:text-yellow-300", children: "The 'processData' function has high cyclomatic complexity (8). Consider refactoring by extracting helper functions." })] }), _jsxs("div", { className: "p-4 bg-green-50 dark:bg-green-900 border-l-4 border-green-400 dark:border-green-500 rounded-r-md", children: [_jsx("h3", { className: "text-lg font-semibold text-green-800 dark:text-green-200", children: "Good Comment Ratio" }), _jsx("p", { className: "text-green-700 dark:text-green-300", children: "Your code has a good balance of comments to code (29% comments). This helps with maintainability." })] }), _jsxs("div", { className: "p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-500 rounded-r-md", children: [_jsx("h3", { className: "text-lg font-semibold text-blue-800 dark:text-blue-200", children: "Consider Adding Tests" }), _jsx("p", { className: "text-blue-700 dark:text-blue-300", children: "Functions with high complexity like 'calculateTotal' should have comprehensive unit tests to ensure reliability." })] })] })] })] }));
};
export default ResultsPage;
