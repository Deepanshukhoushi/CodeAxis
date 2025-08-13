import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { analyzeComplexity } from '../utils/complexityAnalyzer';
const ComplexityIndicator = ({ type, complexity }) => {
    const getComplexityColor = (complexity) => {
        switch (complexity) {
            case 'O(1)': return 'bg-emerald-500';
            case 'O(log n)': return 'bg-sky-500';
            case 'O(n)': return 'bg-amber-500';
            case 'O(n log n)': return 'bg-orange-500';
            case 'O(n²)': return 'bg-red-500';
            case 'O(2^n)': return 'bg-purple-500';
            case 'O(n!)': return 'bg-pink-500';
            default: return 'bg-gray-500';
        }
    };
    const getComplexityWidth = (complexity) => {
        switch (complexity) {
            case 'O(1)': return 'w-1/6';
            case 'O(log n)': return 'w-2/6';
            case 'O(n)': return 'w-3/6';
            case 'O(n log n)': return 'w-4/6';
            case 'O(n²)': return 'w-5/6';
            case 'O(2^n)': return 'w-full';
            case 'O(n!)': return 'w-full';
            default: return 'w-1/6';
        }
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: type === 'time' ? 'Time Complexity' : 'Space Complexity' }), _jsx("span", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: complexity })] }), _jsx("div", { className: "h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full ${getComplexityColor(complexity)} ${getComplexityWidth(complexity)} transition-all duration-500 ease-in-out` }) })] }));
};
const AnalyzerPage = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [analysisErrors, setAnalysisErrors] = useState([]);
    const handleAnalyze = async () => {
        setLoading(true);
        setAnalysisErrors([]);
        setResults(null);
        try {
            const result = analyzeComplexity(code, language);
            if (result.error) {
                // Ensure we store error messages as strings
                const errorMessages = Array.isArray(result.error)
                    ? result.error.map((err) => typeof err === 'string' ? err : err.message || 'Unknown error')
                    : [String(result.error)];
                setAnalysisErrors(errorMessages);
                return;
            }
            setResults(result);
        }
        catch {
            setAnalysisErrors(['An error occurred during analysis.']);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-white dark:bg-gray-900 p-4", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg", children: _jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }) }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "CodeAxis" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Code Analysis Dashboard" })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("select", { value: language, onChange: (e) => setLanguage(e.target.value), className: "px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500", children: ['javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 'go', 'rust', 'swift', 'kotlin', 'php'].map(lang => (_jsx("option", { value: lang, children: lang.charAt(0).toUpperCase() + lang.slice(1) }, lang))) }), _jsx("button", { onClick: handleAnalyze, disabled: loading || !code.trim(), className: "px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-md hover:from-violet-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2", children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), _jsx("span", { children: "Analyzing..." })] })) : (_jsxs(_Fragment, { children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }), _jsx("span", { children: "Analyze Code" })] })) })] }), _jsx("div", { className: "h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden", children: _jsx(Editor, { height: "100%", defaultLanguage: language, theme: "vs-dark", value: code, onChange: (value) => setCode(value || ''), options: {
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            lineNumbers: 'on',
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true,
                                        } }) }), analysisErrors.length > 0 && (_jsx("div", { className: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("svg", { className: "w-5 h-5 text-red-500 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-red-800 dark:text-red-200", children: "Analysis Errors" }), _jsx("ul", { className: "mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside space-y-1", children: analysisErrors.map((error, index) => (_jsx("li", { children: error }, index))) })] })] }) }))] }), _jsx("div", { className: "space-y-6", children: results ? (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(ComplexityIndicator, { type: "time", complexity: results.timeComplexity }), _jsx(ComplexityIndicator, { type: "space", complexity: results.spaceComplexity })] }), _jsxs("div", { className: "pt-4 border-t border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900 dark:text-white mb-2", children: "Analysis Explanation" }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line", children: results.explanation })] }), results.detailedAnalysis && (_jsxs("div", { className: "pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg", children: [_jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Cyclomatic Complexity" }), _jsx("p", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: results.detailedAnalysis.cyclomaticComplexity })] }), _jsxs("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg", children: [_jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Lines of Code" }), _jsx("p", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: results.detailedAnalysis.linesOfCode })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-900 dark:text-white mb-2", children: "Improvement Suggestions" }), _jsx("ul", { className: "space-y-2", children: results.detailedAnalysis.suggestions.map((suggestion, index) => (_jsxs("li", { className: "flex items-start space-x-2", children: [_jsx("svg", { className: "w-4 h-4 text-violet-500 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: suggestion })] }, index))) })] })] }))] })) : (_jsx("div", { className: "h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700", children: _jsxs("div", { className: "text-center", children: [_jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }), _jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900 dark:text-white", children: "No Analysis Yet" }), _jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Enter your code and click \"Analyze Code\" to see the results" })] }) })) })] })] }) }));
};
export default AnalyzerPage;
