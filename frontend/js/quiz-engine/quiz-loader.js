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
        console.log('[QuizLoader] Loading quiz from:', quizPath);
        
        // Check cache first
        if (this.cache.has(quizPath)) {
            console.log('[QuizLoader] Returning cached quiz');
            return this.cache.get(quizPath);
        }

        try {
            // Fetch the HTML file
            console.log('[QuizLoader] Fetching quiz file...');
            const response = await fetch(quizPath);
            console.log('[QuizLoader] Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Failed to load quiz: ${response.status}`);
            }

            const html = await response.text();
            console.log('[QuizLoader] HTML loaded, length:', html.length);
            
            const quizData = this.parseQuizHTML(html, quizPath);
            console.log('[QuizLoader] Quiz data parsed:', {
                title: quizData.title,
                totalQuestions: quizData.totalQuestions,
                questionsLength: quizData.questions.length
            });
            
            // Cache the result
            this.cache.set(quizPath, quizData);
            
            return quizData;
        } catch (error) {
            console.error('[QuizLoader] Error loading quiz:', error);
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
        console.log('[QuizLoader] Found', scripts.length, 'script tags');
        
        for (const script of scripts) {
            const content = script.textContent;
            if (content.includes('fullQuizData') || content.includes('const questions') || content.includes('const quizData')) {
                console.log('[QuizLoader] Found quiz data in script tag');
                return content;
            }
        }
        
        console.warn('[QuizLoader] No quiz data found in script tags');
        return '';
    }

    /**
     * Parse questions from script content
     * @param {string} scriptContent - JavaScript content
     * @returns {Array} Array of question objects
     */
    parseQuestions(scriptContent) {
        const questions = [];
        
        if (!scriptContent) {
            console.error('[QuizLoader] No script content to parse');
            return questions;
        }
        
        try {
            console.log('[QuizLoader] Attempting to parse quiz data...');
            
            // Check for clinical format first (quizData with topics)
            const clinicalMatch = scriptContent.match(/const\s+quizData\s*=\s*(\[[\s\S]*?\]);/);
            if (clinicalMatch) {
                console.log('[QuizLoader] Found clinical format quizData');
                
                const evalFunction = new Function('return ' + clinicalMatch[1]);
                const quizData = evalFunction();
                
                if (Array.isArray(quizData)) {
                    console.log('[QuizLoader] Successfully parsed clinical data with', quizData.length, 'topics');
                    
                    // Extract all questions from all topics
                    let totalQuestions = 0;
                    let convertedQuestions = 0;
                    quizData.forEach(topicData => {
                        if (topicData.questions && Array.isArray(topicData.questions)) {
                            console.log(`[QuizLoader] Topic "${topicData.topic}" has ${topicData.questions.length} questions`);
                            totalQuestions += topicData.questions.length;
                            topicData.questions.forEach((q, index) => {
                                if (q.question && q.options && typeof q.answer === 'number' && q.explanation) {
                                    convertedQuestions++;
                                    // Convert clinical format to standard format
                                    const answers = {};
                                    q.options.forEach((opt, i) => {
                                        answers[String.fromCharCode(97 + i)] = opt; // a, b, c, d
                                    });
                                    
                                    questions.push({
                                        question: q.question,
                                        answers: answers,
                                        correctAnswer: String.fromCharCode(97 + q.answer), // Convert index to letter
                                        explanation: q.explanation,
                                        topic: topicData.topic // Keep topic info for filtering
                                    });
                                } else {
                                    console.warn(`[QuizLoader] Clinical question ${index} missing required fields`);
                                }
                            });
                        }
                    });
                    
                    console.log(`[QuizLoader] Clinical format conversion: ${totalQuestions} total questions, ${convertedQuestions} successfully converted`);
                    return questions;
                }
            }
            
            // Try neuroanatomy format (fullQuizData)
            const arrayMatch = scriptContent.match(/const\s+fullQuizData\s*=\s*(\[[\s\S]*?\]);/);
            if (arrayMatch) {
                console.log('[QuizLoader] Found fullQuizData array');
                
                // Create a safer evaluation function
                const evalFunction = new Function('return ' + arrayMatch[1]);
                const fullQuizData = evalFunction();
                
                if (Array.isArray(fullQuizData)) {
                    console.log('[QuizLoader] Successfully parsed array with', fullQuizData.length, 'items');
                    
                    fullQuizData.forEach((item, index) => {
                        // Fix the typo: check for both 'question' and 'anulus' keys
                        const questionText = item.question || item.anulus;
                        
                        if (questionText && item.answers && item.correctAnswer && item.explanation) {
                            questions.push({
                                question: questionText,
                                answers: item.answers,
                                correctAnswer: item.correctAnswer,
                                explanation: item.explanation
                            });
                        } else {
                            console.warn(`[QuizLoader] Item ${index} missing required fields:`, {
                                hasQuestion: !!questionText,
                                hasAnswers: !!item.answers,
                                hasCorrectAnswer: !!item.correctAnswer,
                                hasExplanation: !!item.explanation
                            });
                        }
                    });
                }
            } else {
                console.warn('[QuizLoader] Could not find quiz data in script content');
            }
        } catch (error) {
            // Fallback to regex parsing if evaluation fails
            console.warn('[QuizLoader] Failed to evaluate quiz data, falling back to regex parsing:', error);
            
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
        
        console.log(`[QuizLoader] Parsed ${questions.length} questions from quiz data`);
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