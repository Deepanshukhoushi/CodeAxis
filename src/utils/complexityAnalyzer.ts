interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface ComplexityResult {
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
  let patterns: string[] = [];
  let suggestions: string[] = [];

  // Count lines of code (excluding comments and empty lines)
  const linesOfCode = code.split('\n').filter(line => {
    const t = line.trim();
    return t && !t.startsWith('#') && !t.startsWith('//') && !t.startsWith('*') && !t.startsWith('/*');
  }).length;

  // Calculate cyclomatic complexity (simplified)
  let cyclomaticComplexity = 1;
  cyclomaticComplexity += (code.match(/\bif\b/g) || []).length;
  cyclomaticComplexity += (code.match(/\bfor\b/g) || []).length;
  cyclomaticComplexity += (code.match(/\bwhile\b/g) || []).length;
  cyclomaticComplexity += (code.match(/\bcatch\b/g) || []).length;

  // Helper: only upgrade complexity, never downgrade
  function upgrade(current: string, candidate: string): string {
    return complexityRank(candidate) > complexityRank(current) ? candidate : current;
  }

  // Common loop counts used across multiple language cases
  const forCount = (code.match(/\bfor\b/g) || []).length;
  const whileCount = (code.match(/\bwhile\b/g) || []).length;
  const hasLoop = forCount > 0 || whileCount > 0;
  const hasNestedLoop = forCount + whileCount > 1;

  // Language-specific analysis
  switch (language) {
    case 'python': {
      if (code.includes('print(')) {
        patterns.push('Print statement');
        explanation += 'The code contains print statements which have O(1) time complexity.\n';
      }
      if (code.includes('for ') || code.includes('while ')) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if ((code.match(/\bfor\b/g) || []).length > 1 || (code.match(/\bwhile\b/g) || []).length > 1) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('.sort(') || code.includes('sorted(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('list(') || code.includes('[]') || code.includes('.append(')) {
        patterns.push('List operation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses lists which have O(n) space complexity.\n';
      }
      if (code.includes('dict(') || code.includes('{}') || code.includes('.get(')) {
        patterns.push('Dictionary operation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses dictionaries which have O(n) space complexity.\n';
      }
      break;
    }

    case 'javascript':
    case 'typescript': {
      if (code.includes('function ') || code.includes('=>')) {
        patterns.push('Function declaration');
        explanation += 'The code contains function declarations.\n';
      }
      if (hasLoop || code.includes('.forEach(') || code.includes('.map(') || code.includes('.filter(') || code.includes('.reduce(')) {
        patterns.push('Loop or array iteration');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops or array iterations which have O(n) time complexity.\n';
      }
      if (hasNestedLoop) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('.sort(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses array sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('new Array') || code.includes('Array.from') || code.includes('new Map(') || code.includes('new Set(') || /\[\s*\]/.test(code)) {
        patterns.push('Data structure creation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code creates data structures which have O(n) space complexity.\n';
      }
      break;
    }

    case 'java': {
      if (hasLoop || code.includes('.forEach(') || code.includes('forEach(')) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (hasNestedLoop) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('Collections.sort(') || code.includes('Arrays.sort(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('ArrayList') || code.includes('LinkedList') || code.includes('HashMap') || code.includes('HashSet') || /new\s+\w+\[/.test(code)) {
        patterns.push('Collection creation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses collections which have O(n) space complexity.\n';
      }
      break;
    }

    case 'c': {
      if (hasLoop) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (hasNestedLoop) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('qsort(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('malloc(') || code.includes('calloc(') || /\w+\s+\w+\s*\[/.test(code)) {
        patterns.push('Dynamic memory allocation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses dynamic memory allocation which has O(n) space complexity.\n';
      }
      break;
    }

    case 'cpp': {
      if (hasLoop) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (hasNestedLoop) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('sort(') || code.includes('std::sort(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('vector<') || code.includes('map<') || code.includes('set<') || code.includes('unordered_map') || /\bnew\s+\w+/.test(code)) {
        patterns.push('STL container / dynamic allocation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses STL containers or dynamic allocation which have O(n) space complexity.\n';
      }
      break;
    }

    case 'csharp': {
      const foreachCount = (code.match(/\bforeach\b/g) || []).length;
      if (hasLoop || foreachCount > 0) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (forCount + whileCount + foreachCount > 1) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('.Sort(') || code.includes('.OrderBy(') || code.includes('.ThenBy(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('new List') || code.includes('new Dictionary') || code.includes('new HashSet') || /new\s+\w+\[/.test(code)) {
        patterns.push('Collection creation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses collections which have O(n) space complexity.\n';
      }
      break;
    }

    case 'go': {
      const goForCount = (code.match(/\bfor\b/g) || []).length;
      if (goForCount > 0) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (goForCount > 1) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('sort.')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('make([]') || code.includes('make(map') || code.includes('append(')) {
        patterns.push('Slice or map operation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses slices or maps which have O(n) space complexity.\n';
      }
      break;
    }

    case 'rust': {
      if (hasLoop || code.includes('loop {') || code.includes('loop{')) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (hasNestedLoop) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('.sort(') || code.includes('.sort_by(') || code.includes('.sort_unstable(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('Vec::new()') || code.includes('vec![') || code.includes('HashMap::new()') || code.includes('HashSet::new()')) {
        patterns.push('Collection creation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses collections which have O(n) space complexity.\n';
      }
      break;
    }

    case 'swift': {
      if (hasLoop) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (hasNestedLoop) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('.sorted(') || code.includes('.sort(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('Array(') || code.includes('Dictionary(') || code.includes('Set(') || /\[\s*\]/.test(code)) {
        patterns.push('Collection creation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses collections which have O(n) space complexity.\n';
      }
      break;
    }

    case 'kotlin': {
      if (hasLoop || code.includes('forEach {') || code.includes('forEach{')) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (hasNestedLoop) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('.sort(') || code.includes('sortedBy(') || code.includes('sortedWith(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('listOf(') || code.includes('mutableListOf(') || code.includes('arrayOf(') || code.includes('mapOf(') || code.includes('mutableMapOf(')) {
        patterns.push('Collection creation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses collections which have O(n) space complexity.\n';
      }
      break;
    }

    case 'php': {
      const foreachCountPHP = (code.match(/\bforeach\b/g) || []).length;
      if (hasLoop || foreachCountPHP > 0) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (forCount + whileCount + foreachCountPHP > 1) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      if (code.includes('sort(') || code.includes('usort(') || code.includes('asort(') || code.includes('ksort(')) {
        patterns.push('Sorting operation');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n log n)');
        explanation += 'The code uses sorting which has O(n log n) time complexity.\n';
      }
      if (code.includes('array(') || /\$\w+\s*=\s*\[/.test(code) || /\[\s*\]/.test(code)) {
        patterns.push('Array creation');
        highestSpaceComplexity = upgrade(highestSpaceComplexity, 'O(n)');
        explanation += 'The code uses arrays which have O(n) space complexity.\n';
      }
      break;
    }

    default: {
      // Generic analysis for any other language
      if (hasLoop) {
        patterns.push('Loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n)');
        explanation += 'The code contains loops which have O(n) time complexity.\n';
      }
      if (hasNestedLoop) {
        patterns.push('Nested loop');
        highestTimeComplexity = upgrade(highestTimeComplexity, 'O(n²)');
        explanation += 'The code contains nested loops which have O(n²) time complexity.\n';
      }
      break;
    }
  }

  // Common suggestions based on findings
  if (patterns.includes('Nested loop')) {
    suggestions.push('Consider using more efficient algorithms to avoid nested loops');
  }
  if (cyclomaticComplexity > 5) {
    suggestions.push('Consider breaking down complex logic into smaller functions');
  }
  if (linesOfCode > 20) {
    suggestions.push('Consider modularizing the code into separate functions');
  }

  if (!explanation) {
    explanation = 'The code appears to be a simple program with constant time and space complexity.';
  }

  return {
    timeComplexity: highestTimeComplexity,
    spaceComplexity: highestSpaceComplexity,
    explanation,
    detailedAnalysis: {
      patterns,
      impact: highestTimeComplexity,
      suggestions,
      cyclomaticComplexity,
      linesOfCode
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
    'O(2^n)': 6,
    'O(n!)': 7
  };
  return ranks[complexity] || 0;
} 