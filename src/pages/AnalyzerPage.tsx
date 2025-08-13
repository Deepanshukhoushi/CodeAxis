import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { analyzeComplexity } from '../utils/complexityAnalyzer';

interface AnalysisResult {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  detailedAnalysis?: {
    patterns: string[];
    impact: string;
    suggestions: string[];
    cyclomaticComplexity: number;
    linesOfCode: number;
  };
}

interface AnalysisError {
  message: string;
}

const ComplexityIndicator: React.FC<{ type: 'time' | 'space'; complexity: string }> = ({ type, complexity }) => {
  const getComplexityColor = (complexity: string) => {
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

  const getComplexityWidth = (complexity: string) => {
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

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {type === 'time' ? 'Time Complexity' : 'Space Complexity'}
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {complexity}
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getComplexityColor(complexity)} ${getComplexityWidth(complexity)} transition-all duration-500 ease-in-out`}
        />
      </div>
    </div>
  );
};

const AnalyzerPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisErrors, setAnalysisErrors] = useState<AnalysisError[]>([]);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysisErrors([]);
    setResults(null);

    try {
      const result = analyzeComplexity(code, language);
      if (result.error) {
        setAnalysisErrors(result.error);
        return;
      }
      setResults(result);
    } catch (error) {
      setAnalysisErrors([{ message: 'An error occurred during analysis.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">CodeAxis</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Code Analysis Dashboard</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="swift">Swift</option>
                <option value="kotlin">Kotlin</option>
                <option value="php">PHP</option>
              </select>
              <button
                onClick={handleAnalyze}
                disabled={loading || !code.trim()}
                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-md hover:from-violet-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Analyze Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyond: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {analysisErrors.length > 0 && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Analysis Errors</h3>
                    <ul className="mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside space-y-1">
                      {analysisErrors.map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
                <div className="space-y-4">
                  <ComplexityIndicator type="time" complexity={results.timeComplexity} />
                  <ComplexityIndicator type="space" complexity={results.spaceComplexity} />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Analysis Explanation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {results.explanation}
                  </p>
                </div>

                {results.detailedAnalysis && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Cyclomatic Complexity</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {results.detailedAnalysis.cyclomaticComplexity}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Lines of Code</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {results.detailedAnalysis.linesOfCode}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Improvement Suggestions</h4>
                      <ul className="space-y-2">
                        {results.detailedAnalysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <svg className="w-4 h-4 text-violet-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No Analysis Yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter your code and click "Analyze Code" to see the results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzerPage; 