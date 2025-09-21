/**
 * Quiz Loader Module
 * Loads and parses quiz data from HTML files
 */

export class QuizLoader {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Load quiz from HTML file
     * @param {string} quizPath - Path to the quiz HTML file
     * @returns {Promise<Object>} Parsed quiz data
     */
    async loadQuiz(quizPath) {
        // Check cache first
        if (this.cache.has(quizPath)) {
            return this.cache.get(quizPath);
        }

        try {
            // Fetch the HTML file
            const response = await fetch(quizPath);
            if (!response.ok) {
                throw new Error(`Failed to load quiz: ${response.status}`);
            }

            const html = await response.text();
            const quizData = this.parseQuizHTML(html, quizPath);
            
            // Cache the result
            this.cache.set(quizPath, quizData);
            
            return quizData;
        } catch (error) {
            console.error('Error loading quiz:', error);
            throw error;
        }
    }

    /**
     * Parse quiz HTML to extract questions
     * @param {string} html - Raw HTML content
     * @param {string} path - Quiz file path
     * @returns {Object} Parsed quiz data
     */
    parseQuizHTML(html, path) {
        // Create a temporary DOM element
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract title
        const title = doc.querySelector('title')?.textContent || 'Quiz';
        
        // Extract quiz data from script
        const scriptContent = this.extractScriptContent(doc);
        const questions = this.parseQuestions(scriptContent);
        
        // Extract metadata from filename
        const filename = path.split('/').pop();
        const topicMatch = filename.match(/^(\d+(?:-\d+)?)/);
        const topics = topicMatch ? topicMatch[1] : '';
        
        return {
            title,
            topics,
            path,
            questions,
            totalQuestions: questions.length
        };
    }

    /**
     * Extract script content containing quiz data
     * @param {Document} doc - Parsed HTML document
     * @returns {string} Script content
     */
    extractScriptContent(doc) {
        const scripts = doc.querySelectorAll('script');
        for (const script of scripts) {
            const content = script.textContent;
            if (content.includes('fullQuizData') || content.includes('const questions')) {
                return content;
            }
        }
        return '';
    }

    /**
     * Parse questions from script content
     * @param {string} scriptContent - JavaScript content
     * @returns {Array} Array of question objects
     */
    parseQuestions(scriptContent) {
        const questions = [];
        
        try {
            // Create a function to safely evaluate the quiz data
            const evalFunction = new Function('return ' + scriptContent.replace(/const\s+fullQuizData\s*=\s*/, '').replace(/;\s*$/, ''));
            const fullQuizData = evalFunction();
            
            if (Array.isArray(fullQuizData)) {
                fullQuizData.forEach(item => {
                    // Fix the typo: check for both 'question' and 'anulus' keys
                    const questionText = item.question || item.anulus;
                    
                    if (questionText && item.answers && item.correctAnswer && item.explanation) {
                        questions.push({
                            question: questionText,
                            answers: item.answers,
                            correctAnswer: item.correctAnswer,
                            explanation: item.explanation
                        });
                    }
                });
            }
        } catch (error) {
            // Fallback to regex parsing if evaluation fails
            console.warn('Failed to evaluate quiz data, falling back to regex parsing:', error);
            
            // Try to find quiz data array
            const fullQuizMatch = scriptContent.match(/const\s+fullQuizData\s*=\s*\[([\s\S]*?)\];/);
            
            if (fullQuizMatch) {
                // More flexible regex that handles the actual data format
                const questionRegex = /\{\s*(?:question|anulus):\s*"([^"]+)"[^}]*answers:\s*\{([^}]+)\}[^}]*correctAnswer:\s*"([^"]+)"[^}]*explanation:\s*"([^"]+)"/g;
                
                let match;
                while ((match = questionRegex.exec(fullQuizMatch[0])) !== null) {
                    const [_, questionText, answersStr, correctAnswer, explanation] = match;
                    
                    // Parse answers
                    const answers = {};
                    const answerRegex = /([a-z]):\s*"([^"]+)"/g;
                    let answerMatch;
                    while ((answerMatch = answerRegex.exec(answersStr)) !== null) {
                        answers[answerMatch[1]] = this.decodeHTML(answerMatch[2]);
                    }
                    
                    questions.push({
                        question: this.decodeHTML(questionText),
                        answers,
                        correctAnswer,
                        explanation: this.decodeHTML(explanation)
                    });
                }
            }
        }
        
        console.log(`Parsed ${questions.length} questions from quiz data`);
        return questions;
    }

    /**
     * Decode HTML entities and escape sequences
     * @param {string} text - Encoded text
     * @returns {string} Decoded text
     */
    decodeHTML(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'");
    }

    /**
     * Load quiz list for a category
     * @param {string} categoryPath - Path to category directory
     * @returns {Promise<Array>} List of available quizzes
     */
    async loadQuizList(categoryPath) {
        // In a real implementation, this would fetch a directory listing
        // For now, we'll return the hardcoded list from quiz-app.js
        return [];
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Preload multiple quizzes
     * @param {Array<string>} paths - Array of quiz paths
     * @returns {Promise<void>}
     */
    async preloadQuizzes(paths) {
        const promises = paths.map(path => this.loadQuiz(path));
        await Promise.all(promises);
    }
}