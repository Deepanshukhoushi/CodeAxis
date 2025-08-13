interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface ComplexityResult {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  detailedAnalysis?: {
    patterns: Array<{
      type: string;
      description: string;
      impact: string;
      suggestion?: string;
    }>;
    metrics: {
      cyclomaticComplexity?: number;
      linesOfCode?: number;
      numberOfFunctions?: number;
    };
    impact?: string;
    suggestions?: string[];
  };
  error?: string[];
}

// Language-specific patterns for loops and other constructs
const languagePatterns = {
  javascript: {
    forLoop: /for\s*\([^)]*\)/,
    whileLoop: /while\s*\([^)]*\)/,
    arrayCreation: /new Array|Array\.from|\[\]/,
    recursion: /function\s+(\w+).*\{.*return.*\1.*\}/s,
  },
  typescript: {
    forLoop: /for\s*\([^)]*\)/,
    whileLoop: /while\s*\([^)]*\)/,
    arrayCreation: /new Array|Array\.from|\[\]/,
    recursion: /function\s+(\w+).*\{.*return.*\1.*\}/s,
  },
  python: {
    forLoop: /for\s+\w+\s+in/,
    whileLoop: /while\s+.*:/,
    arrayCreation: /list\(|set\(|\[\]/,
    recursion: /def\s+(\w+).*:.*return.*\1/s,
  },
  java: {
    forLoop: /for\s*\([^)]*\)/,
    whileLoop: /while\s*\([^)]*\)/,
    arrayCreation: /new\s+\w+\[|ArrayList|HashSet/,
    recursion: /(\w+)\s+\w+\s*\([^)]*\)\s*\{.*return.*\1.*\}/s,
  },
  cpp: {
    forLoop: /for\s*\([^)]*\)/,
    whileLoop: /while\s*\([^)]*\)/,
    arrayCreation: /vector<|array<|new\s+\w+\[/,
    recursion: /(\w+)\s+\w+\s*\([^)]*\)\s*\{.*return.*\1.*\}/s,
  }
};

// Common patterns for identifying time complexity based on language-specific patterns
function getTimeComplexityPatterns(language: string) {
  const patterns = languagePatterns[language as keyof typeof languagePatterns] || languagePatterns.javascript;
  
  return [
    {
      // Nested loops pattern
      pattern: new RegExp(`${patterns.forLoop.source}.*${patterns.forLoop.source}|${patterns.whileLoop.source}.*${patterns.whileLoop.source}`, 'gs'),
      complexity: 'O(n²)',
      type: 'Nested loops'
    },
    {
      // Mixed nested loops
      pattern: new RegExp(`${patterns.forLoop.source}.*${patterns.whileLoop.source}|${patterns.whileLoop.source}.*${patterns.forLoop.source}`, 'gs'),
      complexity: 'O(n²)',
      type: 'Mixed nested loops'
    },
    {
      // Sorting operations
      pattern: language === 'python' ? /\.sort\(|sorted\(/ : /\.sort\(/,
      complexity: 'O(n log n)',
      type: 'Sorting operation'
    },
    {
      // Single loop
      pattern: new RegExp(`${patterns.forLoop.source}|${patterns.whileLoop.source}`, 'g'),
      complexity: 'O(n)',
      type: 'Single loop'
    },
    {
      // Basic operations
      pattern: /if|else|switch|return/,
      complexity: 'O(1)',
      type: 'Basic operation'
    }
  ];
}

// Common patterns for identifying space complexity based on language-specific patterns
function getSpaceComplexityPatterns(language: string) {
  const patterns = languagePatterns[language as keyof typeof languagePatterns] || languagePatterns.javascript;
  
  return [
    {
      pattern: patterns.arrayCreation,
      complexity: 'O(n)',
      type: 'Array/Collection creation'
    },
    {
      pattern: language === 'python' ? 
        /dict\(|set\(|list\(/ : 
        /new Map\(|new Set\(|new Array\(/,
      complexity: 'O(n)',
      type: 'Data structure initialization'
    },
    {
      pattern: patterns.recursion,
      complexity: 'O(n)',
      type: 'Recursive call stack'
    }
  ];
}

function validateCode(code: string, language: string): ValidationResult {
  const errors: string[] = [];

  // Basic validation
  if (!code || code.trim().length === 0) {
    errors.push('Code cannot be empty');
    return { isValid: false, errors };
  }

  if (code.trim().length < 10) {
    errors.push('Code is too short to analyze');
    return { isValid: false, errors };
  }

  // Language-specific validation
  switch (language) {
    case 'python':
      // Check for basic Python syntax
      if (!code.includes('print(') && !code.includes('def ') && !code.includes('class ')) {
        errors.push('Invalid Python syntax. Code must contain at least one print statement, function, or class.');
      }
      // Check for common Python syntax errors
      if (code.includes('{') || code.includes('}')) {
        errors.push('Python does not use curly braces. Please use proper Python indentation.');
      }
      if (code.includes(';')) {
        errors.push('Python does not use semicolons at the end of statements.');
      }
      break;
    case 'javascript':
    case 'typescript':
      if (!code.includes(';') && !code.includes('{') && !code.includes('}')) {
        errors.push('Invalid JavaScript/TypeScript syntax: Missing basic syntax elements');
      }
      break;
    case 'java':
      if (!code.includes('class') || !code.includes('{')) {
        errors.push('Invalid Java syntax: Missing class definition or basic syntax elements');
      }
      break;
  }

  // Check for random text/gibberish
  const words = code.split(/\s+/);
  const hasLongWords = words.some(word => word.length > 50);
  if (hasLongWords) {
    errors.push('Code contains unusually long words. Please check for random text or gibberish.');
  }

  // Check if code is just comments or empty lines
  const nonEmptyLines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
  if (nonEmptyLines.length === 0) {
    errors.push('Code contains only comments or empty lines.');
  }

  return { isValid: errors.length === 0, errors };
}

export const analyzeComplexity = (code: string, language: string): ComplexityResult => {
  // First validate the code
  const validation = validateCode(code, language);
  if (!validation.isValid) {
    return {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      explanation: 'Code validation failed',
      error: validation.errors
    };
  }

  // Initialize complexity variables
  let highestTimeComplexity = 'O(1)';
  let highestSpaceComplexity = 'O(1)';
  let explanation = '';
  let patterns: Array<{ type: string; description: string; impact: string; suggestion?: string }> = [];
  let impact = '';
  let suggestions: string[] = [];

  // Count lines of code (excluding comments and empty lines)
  const linesOfCode = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#')).length;

  // Calculate cyclomatic complexity (simplified)
  let cyclomaticComplexity = 1; // Base complexity
  cyclomaticComplexity += (code.match(/if/g) || []).length;
  cyclomaticComplexity += (code.match(/for/g) || []).length;
  cyclomaticComplexity += (code.match(/while/g) || []).length;
  cyclomaticComplexity += (code.match(/catch/g) || []).length;

  // Language-specific analysis
  switch (language) {
    case 'python':
      // Check for print statements (O(1))
      if (code.includes('print(')) {
        patterns.push({
          type: 'Print Statement',
          description: 'Contains print statements',
          impact: 'O(1) time complexity',
          suggestion: 'Print statements are efficient for basic output'
        });
        explanation += 'The code contains print statements which have O(1) time complexity.\n';
      }

      // Check for loops
      if (code.includes('for ') || code.includes('while ')) {
        patterns.push({
          type: 'Loop',
          description: 'Contains loops',
          impact: 'O(n) time complexity',
          suggestion: 'Consider if loop can be optimized'
        });
        highestTimeComplexity = 'O(n)';
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }

      // Check for nested loops
      if ((code.match(/for/g) || []).length > 1 || (code.match(/while/g) || []).length > 1) {
        patterns.push({
          type: 'Nested Loop',
          description: 'Contains nested loops',
          impact: 'O(n²) time complexity',
          suggestion: 'Consider using more efficient algorithms to avoid nested loops'
        });
        highestTimeComplexity = 'O(n²)';
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }

      // Check for list operations
      if (code.includes('list(') || code.includes('[]') || code.includes('.append(')) {
        patterns.push({
          type: 'List Operation',
          description: 'Contains list operations',
          impact: 'O(n) space complexity',
          suggestion: 'Consider using more space-efficient data structures if possible'
        });
        highestSpaceComplexity = 'O(n)';
        explanation += 'The code uses lists which have O(n) space complexity.\n';
      }

      // Check for dictionary operations
      if (code.includes('dict(') || code.includes('{}') || code.includes('.get(')) {
        patterns.push({
          type: 'Dictionary Operation',
          description: 'Contains dictionary operations',
          impact: 'O(n) space complexity',
          suggestion: 'Consider if dictionary is necessary for the use case'
        });
        highestSpaceComplexity = 'O(n)';
        explanation += 'The code uses dictionaries which have O(n) space complexity.\n';
      }

      // Check for recursive functions
      if (code.includes('def ') && code.includes('return ') && code.includes('def ')) {
        patterns.push({
          type: 'Recursive Function',
          description: 'Contains recursive functions',
          impact: 'O(2^n) time complexity',
          suggestion: 'Consider using iterative solutions for better performance'
        });
        highestTimeComplexity = 'O(2^n)';
        explanation += 'The code contains recursive functions which can have exponential time complexity.\n';
      }

      // Generate suggestions based on patterns
      if (patterns.some(p => p.type === 'Nested Loop')) {
        suggestions.push('Consider using more efficient algorithms to avoid nested loops');
      }
      if (cyclomaticComplexity > 5) {
        suggestions.push('Consider breaking down complex logic into smaller functions');
      }
      if (linesOfCode > 20) {
        suggestions.push('Consider modularizing the code into separate functions');
      }
      break;
    // ... existing code for other languages ...
  }

  // If no specific patterns were found, provide a default explanation
  if (!explanation) {
    explanation = 'The code appears to be a simple program with constant time and space complexity.';
  }

  return {
    timeComplexity: highestTimeComplexity,
    spaceComplexity: highestSpaceComplexity,
    explanation,
    detailedAnalysis: {
      patterns,
      metrics: {
        cyclomaticComplexity,
        linesOfCode
      },
      impact,
      suggestions
    }
  };
};

// Helper function to rank complexity for comparison
function complexityRank(complexity: string): number {
  const ranks: { [key: string]: number } = {
    'O(1)': 1,
    'O(log n)': 2,
    'O(n)': 3,
    'O(n log n)': 4,
    'O(n²)': 5,
    'O(2ⁿ)': 6
  };
  return ranks[complexity] || 0;
} 