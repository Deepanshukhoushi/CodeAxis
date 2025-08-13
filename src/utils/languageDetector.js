const languagePatterns = {
    python: [
        { pattern: /def\s+\w+\s*\([^)]*\)\s*:/, score: 10 }, // Function definition
        { pattern: /import\s+\w+|from\s+\w+\s+import/, score: 8 }, // Python imports
        { pattern: /(if|while|for)\s+.*:/, score: 5 }, // Python control structures
        { pattern: /print\s*\(.*\)/, score: 3 }, // Print statements
        { pattern: /#.*$/, score: 2 }, // Python comments
        { pattern: /\b(self|None|True|False)\b/, score: 4 }, // Python keywords
        { pattern: /\b(list|dict|set|tuple)\(/, score: 4 }, // Python built-in types
    ],
    java: [
        { pattern: /public\s+class\s+\w+/, score: 10 }, // Class declaration
        { pattern: /public\s+(static\s+)?void\s+main/, score: 10 }, // Main method
        { pattern: /System\.(out|err)\.(println|print)\(/, score: 8 }, // System.out
        { pattern: /import\s+java\./, score: 8 }, // Java imports
        { pattern: /private|protected|public\s+\w+/, score: 5 }, // Access modifiers
        { pattern: /\b(String|Integer|Boolean)\b/, score: 4 }, // Java types
        { pattern: /@Override|\@\w+/, score: 6 }, // Java annotations
    ],
    javascript: [
        { pattern: /function\s+\w+\s*\([^)]*\)\s*{/, score: 10 }, // Function declaration
        { pattern: /const|let|var\s+\w+\s*=/, score: 8 }, // Variable declarations
        { pattern: /console\.(log|error|warn)\(/, score: 5 }, // Console methods
        { pattern: /\b(if|while|for)\s*\([^)]*\)\s*{/, score: 5 }, // JS control structures
        { pattern: /\/\/.*$/, score: 2 }, // JS comments
        { pattern: /\b(undefined|null|Promise|async|await)\b/, score: 4 }, // JS specific terms
        { pattern: /\b(map|filter|reduce)\b/, score: 4 }, // JS array methods
    ],
    cpp: [
        { pattern: /#include\s*<[^>]+>/, score: 10 }, // Include directives
        { pattern: /std::\w+/, score: 8 }, // STD namespace usage
        { pattern: /cout\s*<<|cin\s*>>/, score: 8 }, // IO operations
        { pattern: /int\s+main\s*\([^)]*\)/, score: 10 }, // Main function
        { pattern: /\b(void|int|char|double|float)\s+\w+/, score: 5 }, // C++ types
        { pattern: /\b(vector|string|map|set)\b/, score: 4 }, // C++ STL
        { pattern: /class\s+\w+\s*:\s*(public|private|protected)/, score: 6 }, // C++ class inheritance
    ],
    c: [
        { pattern: /#include\s*<[^>]+>/, score: 10 }, // Include directives
        { pattern: /printf\s*\(|scanf\s*\(/, score: 8 }, // IO functions
        { pattern: /int\s+main\s*\([^)]*\)/, score: 10 }, // Main function
        { pattern: /\b(void|int|char|float|double|struct)\s+\w+/, score: 5 }, // C types
        { pattern: /malloc\s*\(|free\s*\(/, score: 6 }, // Memory management
        { pattern: /\b(typedef|enum|union)\b/, score: 4 }, // C specific keywords
    ],
    csharp: [
        { pattern: /namespace\s+\w+/, score: 10 }, // Namespace declaration
        { pattern: /public\s+class\s+\w+/, score: 10 }, // Class declaration
        { pattern: /Console\.(Write|WriteLine)\(/, score: 8 }, // Console output
        { pattern: /using\s+\w+(\.\w+)*;/, score: 6 }, // Using directives
        { pattern: /\b(string|int|bool|var)\s+\w+/, score: 4 }, // C# types
        { pattern: /\b(async|await|Task)\b/, score: 4 }, // C# async features
    ],
    go: [
        { pattern: /package\s+\w+/, score: 10 }, // Package declaration
        { pattern: /func\s+\w+\s*\([^)]*\)/, score: 10 }, // Function declaration
        { pattern: /import\s+\(\s*"[^"]+"\s*\)/, score: 8 }, // Go imports
        { pattern: /fmt\.(Print|Println)\(/, score: 6 }, // fmt package usage
        { pattern: /\b(string|int|bool|interface)\b/, score: 4 }, // Go types
        { pattern: /\b(chan|go|defer)\b/, score: 6 }, // Go specific keywords
    ],
    rust: [
        { pattern: /fn\s+\w+\s*\([^)]*\)/, score: 10 }, // Function declaration
        { pattern: /use\s+\w+::\w+/, score: 8 }, // Use statements
        { pattern: /println!\s*\(/, score: 6 }, // Println macro
        { pattern: /\b(let|mut|impl|trait)\b/, score: 6 }, // Rust keywords
        { pattern: /\b(String|Vec|Option|Result)\b/, score: 4 }, // Rust types
        { pattern: /\b(&mut|&self|'static)\b/, score: 6 }, // Rust references
    ],
    swift: [
        { pattern: /class\s+\w+\s*:\s*\w+/, score: 10 }, // Class declaration
        { pattern: /func\s+\w+\s*\([^)]*\)/, score: 10 }, // Function declaration
        { pattern: /import\s+\w+/, score: 8 }, // Import statement
        { pattern: /\b(var|let)\s+\w+\s*:/, score: 6 }, // Variable declaration
        { pattern: /\b(String|Int|Bool|Array)\b/, score: 4 }, // Swift types
        { pattern: /@objc|@IBOutlet|@IBAction/, score: 6 }, // Swift annotations
    ],
    kotlin: [
        { pattern: /class\s+\w+(\s*:\s*\w+)?/, score: 10 }, // Class declaration
        { pattern: /fun\s+\w+\s*\([^)]*\)/, score: 10 }, // Function declaration
        { pattern: /import\s+\w+(\.\w+)*/, score: 8 }, // Import statement
        { pattern: /\b(val|var)\s+\w+\s*:/, score: 6 }, // Variable declaration
        { pattern: /\b(String|Int|Boolean|List)\b/, score: 4 }, // Kotlin types
        { pattern: /@\w+/, score: 4 }, // Kotlin annotations
    ],
    php: [
        { pattern: /<\?php/, score: 10 }, // PHP opening tag
        { pattern: /function\s+\w+\s*\([^)]*\)/, score: 10 }, // Function declaration
        { pattern: /\$\w+\s*=/, score: 8 }, // Variable assignment
        { pattern: /echo\s+|print\s+/, score: 6 }, // Output statements
        { pattern: /\b(public|private|protected)\s+function/, score: 6 }, // Method modifiers
        { pattern: /use\s+\w+(\\\w+)*/, score: 4 }, // Namespace usage
    ],
    typescript: [
        { pattern: /interface\s+\w+/, score: 10 }, // Interface declaration
        { pattern: /type\s+\w+\s*=/, score: 10 }, // Type declaration
        { pattern: /:\s*(string|number|boolean|any)\b/, score: 8 }, // Type annotations
        { pattern: /\b(public|private|protected)\s+\w+/, score: 6 }, // Access modifiers
        { pattern: /\b(Promise|async|await)\b/, score: 4 }, // TS/JS features
        { pattern: /<\w+>\s*\(/, score: 6 }, // Generic types
    ],
    ruby: [
        { pattern: /def\s+\w+/, score: 10 }, // Method definition
        { pattern: /class\s+\w+(\s*<\s*\w+)?/, score: 10 }, // Class declaration
        { pattern: /require\s+['"][^'"]+['"]/, score: 8 }, // Require statement
        { pattern: /\b(puts|print)\b/, score: 6 }, // Output methods
        { pattern: /@\w+/, score: 4 }, // Instance variables
        { pattern: /\b(attr_accessor|attr_reader)\b/, score: 6 }, // Ruby specific keywords
    ],
    sql: [
        { pattern: /SELECT\s+.*\s+FROM\s+\w+/i, score: 10 }, // SELECT statement
        { pattern: /CREATE\s+TABLE\s+\w+/i, score: 10 }, // CREATE TABLE
        { pattern: /INSERT\s+INTO\s+\w+/i, score: 8 }, // INSERT statement
        { pattern: /UPDATE\s+\w+\s+SET/i, score: 8 }, // UPDATE statement
        { pattern: /JOIN\s+\w+\s+ON/i, score: 6 }, // JOIN clause
        { pattern: /WHERE\s+\w+\s*=/i, score: 4 }, // WHERE clause
    ],
    dart: [
        { pattern: /void\s+main\s*\(\)/, score: 10 }, // Main function
        { pattern: /class\s+\w+(\s+extends\s+\w+)?/, score: 10 }, // Class declaration
        { pattern: /import\s+['"][^'"]+['"]/, score: 8 }, // Import statement
        { pattern: /\b(final|const|var)\s+\w+/, score: 6 }, // Variable declaration
        { pattern: /\b(String|int|bool|List)\b/, score: 4 }, // Dart types
        { pattern: /@override/, score: 4 }, // Dart annotations
    ]
};
export function detectLanguage(code) {
    const scores = {};
    // Initialize scores
    Object.keys(languagePatterns).forEach(lang => {
        scores[lang] = 0;
    });
    // Calculate scores for each language
    Object.entries(languagePatterns).forEach(([language, patterns]) => {
        patterns.forEach(({ pattern, score }) => {
            const matches = (code.match(pattern) || []).length;
            scores[language] += matches * score;
        });
    });
    // Find the language with the highest score
    let maxScore = 0;
    let detectedLanguage = null;
    Object.entries(scores).forEach(([language, score]) => {
        if (score > maxScore) {
            maxScore = score;
            detectedLanguage = language;
        }
    });
    // Return null if the confidence is too low
    return maxScore > 10 ? detectedLanguage : null;
}
