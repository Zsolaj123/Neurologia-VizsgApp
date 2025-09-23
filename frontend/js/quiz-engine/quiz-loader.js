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
        
        // Extract quiz data from script and DOM
        const scriptContent = this.extractScriptContent(doc);
        const parsedData = this.parseQuizData(scriptContent, doc);
        
        // Extract metadata from filename
        const filename = path.split('/').pop();
        const topicMatch = filename.match(/^(\d+(?:-\d+)?)/);
        const topics = topicMatch ? topicMatch[1] : '';
        
        return {
            title,
            topics,
            path,
            questions: parsedData.questions,
            availableTopics: parsedData.topics,
            format: parsedData.format,
            totalQuestions: parsedData.questions.length
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
        
        let combinedContent = '';
        for (const script of scripts) {
            const content = script.textContent;
            if (content.includes('fullQuizData') || 
                content.includes('const questions') || 
                content.includes('const quizData') ||
                content.includes('startQuiz')) {
                console.log('[QuizLoader] Found relevant script content');
                combinedContent += content + '\n';
            }
        }
        
        return combinedContent;
    }

    /**
     * Parse quiz data from script content and DOM
     * @param {string} scriptContent - JavaScript content
     * @param {Document} doc - Parsed HTML document
     * @returns {Object} Parsed quiz data with format info
     */
    parseQuizData(scriptContent, doc) {
        console.log('[QuizLoader] Parsing quiz data...');
        
        // First, try to detect the quiz format
        
        // Format A: Single array (fullQuizData or questions)
        const fullQuizMatch = scriptContent.match(/const\s+fullQuizData\s*=\s*\[([\s\S]*?)\];/);
        const questionsMatch = scriptContent.match(/const\s+questions\s*=\s*\[([\s\S]*?)\];/);
        
        if (fullQuizMatch || questionsMatch) {
            console.log('[QuizLoader] Detected Format A: Single quiz bundle');
            const match = fullQuizMatch || questionsMatch;
            const questions = this.parseFormatA(match[1]);
            return {
                format: 'single-bundle',
                questions,
                topics: []
            };
        }
        
        // Format B: Topic selection with array (quizData array with topic field)
        const quizDataArrayMatch = scriptContent.match(/const\s+quizData\s*=\s*\[([\s\S]*?)\];/);
        if (quizDataArrayMatch && scriptContent.includes('startQuiz')) {
            console.log('[QuizLoader] Detected Format B: Topic array with buttons');
            return this.parseFormatB(quizDataArrayMatch[1], doc);
        }
        
        // Format C: Topic object (quizData object with topic keys)
        const quizDataObjectMatch = scriptContent.match(/const\s+quizData\s*=\s*\{([\s\S]*?)\};/);
        if (quizDataObjectMatch) {
            console.log('[QuizLoader] Detected Format C: Topic object');
            return this.parseFormatC(quizDataObjectMatch[1]);
        }
        
        console.warn('[QuizLoader] No recognized quiz format found');
        return {
            format: 'unknown',
            questions: [],
            topics: []
        };
    }
    
    /**
     * Parse Format A: Single bundle (fullQuizData)
     */
    parseFormatA(dataContent) {
        const questions = [];
        
        try {
            const evalFunction = new Function('return [' + dataContent + ']');
            const quizData = evalFunction();
            
            quizData.forEach((item, index) => {
                const questionText = item.question || item.anulus; // Handle typo
                if (questionText && item.answers && item.correctAnswer && item.explanation) {
                    questions.push({
                        question: questionText,
                        answers: item.answers,
                        correctAnswer: item.correctAnswer,
                        explanation: item.explanation
                    });
                } else {
                    console.warn(`[QuizLoader] Question ${index} missing required fields`);
                }
            });
        } catch (error) {
            console.error('[QuizLoader] Failed to parse Format A:', error);
            // Fallback to regex parsing
            const questionRegex = /\{\s*(?:question|anulus):\s*"([^"]+)"[^}]*answers:\s*\{([^}]+)\}[^}]*correctAnswer:\s*"([^"]+)"[^}]*explanation:\s*"([^"]+)"/g;
            let match;
            while ((match = questionRegex.exec(dataContent)) !== null) {
                const [_, question, answersStr, correctAnswer, explanation] = match;
                const answers = {};
                const answerRegex = /([a-z]):\s*"([^"]+)"/g;
                let answerMatch;
                while ((answerMatch = answerRegex.exec(answersStr)) !== null) {
                    answers[answerMatch[1]] = this.decodeHTML(answerMatch[2]);
                }
                questions.push({
                    question: this.decodeHTML(question),
                    answers,
                    correctAnswer,
                    explanation: this.decodeHTML(explanation)
                });
            }
        }
        
        return questions;
    }
    
    /**
     * Parse Format B: Topic array with buttons
     */
    parseFormatB(dataContent, doc) {
        const questions = [];
        const topics = [];
        const topicMap = new Map();
        
        // First, extract topic info from DOM buttons
        const topicButtons = doc.querySelectorAll('button[onclick*="startQuiz"]');
        topicButtons.forEach(button => {
            const onclick = button.getAttribute('onclick');
            const match = onclick.match(/startQuiz\('([^']+)'\)/);
            if (match) {
                const topicKey = match[1];
                const topicName = button.textContent.trim();
                topicMap.set(topicKey, topicName);
                topics.push({ key: topicKey, name: topicName });
            }
        });
        
        console.log('[QuizLoader] Found topics from buttons:', topics);
        
        // Parse questions
        try {
            const evalFunction = new Function('return [' + dataContent + ']');
            const quizData = evalFunction();
            
            quizData.forEach(item => {
                if (item.topic && item.question && item.options && typeof item.answer !== 'undefined' && item.explanation) {
                    const answers = {};
                    item.options.forEach((opt, i) => {
                        answers[String.fromCharCode(97 + i)] = opt;
                    });
                    
                    questions.push({
                        question: item.question,
                        answers,
                        correctAnswer: typeof item.answer === 'number' ? 
                            String.fromCharCode(97 + item.answer) : item.answer,
                        explanation: item.explanation,
                        topic: item.topic
                    });
                }
            });
        } catch (error) {
            console.error('[QuizLoader] Failed to parse Format B:', error);
        }
        
        return {
            format: 'topic-array',
            questions,
            topics
        };
    }
    
    /**
     * Parse Format C: Topic object
     */
    parseFormatC(dataContent) {
        const questions = [];
        const topics = [];
        
        try {
            const evalFunction = new Function('return {' + dataContent + '}');
            const quizData = evalFunction();
            
            // Extract topics and questions
            for (const [topicKey, topicData] of Object.entries(quizData)) {
                if (topicData.title && topicData.questions) {
                    topics.push({ key: topicKey, name: topicData.title });
                    
                    topicData.questions.forEach((q, index) => {
                        if (q.question && q.options && typeof q.answer !== 'undefined' && q.explanation) {
                            const answers = {};
                            q.options.forEach((opt, i) => {
                                answers[String.fromCharCode(97 + i)] = opt;
                            });
                            
                            questions.push({
                                question: q.question,
                                answers,
                                correctAnswer: String.fromCharCode(97 + q.answer),
                                explanation: q.explanation,
                                topic: topicKey
                            });
                        }
                    });
                }
            }
        } catch (error) {
            console.error('[QuizLoader] Failed to parse Format C:', error);
        }
        
        return {
            format: 'topic-object',
            questions,
            topics
        };
    }
    
    /**
     * Filter questions by topic
     * @param {Array} questions - All questions
     * @param {string} topic - Selected topic
     * @returns {Array} Filtered questions
     */
    filterByTopic(questions, topic) {
        return questions.filter(q => q.topic === topic);
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