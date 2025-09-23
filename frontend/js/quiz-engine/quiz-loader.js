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
        console.log('[QuizLoader] Current page URL:', window.location.href);
        
        // Check cache first
        if (this.cache.has(quizPath)) {
            console.log('[QuizLoader] Returning cached quiz');
            return this.cache.get(quizPath);
        }

        try {
            // Ensure we're not navigating away
            if (window.location.href.includes(quizPath)) {
                console.error('[QuizLoader] ERROR: Page has navigated to quiz file!');
                // Try to go back
                window.history.back();
                throw new Error('Page navigation detected - should be AJAX loading');
            }
            
            // Fetch the HTML file
            console.log('[QuizLoader] Fetching quiz file via AJAX...');
            const response = await fetch(quizPath, {
                method: 'GET',
                headers: {
                    'Accept': 'text/html',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            console.log('[QuizLoader] Response status:', response.status);
            console.log('[QuizLoader] Response headers:', response.headers.get('content-type'));
            
            if (!response.ok) {
                throw new Error(`Failed to load quiz: ${response.status}`);
            }

            const html = await response.text();
            console.log('[QuizLoader] HTML loaded, length:', html.length);
            console.log('[QuizLoader] First 200 chars:', html.substring(0, 200));
            
            const quizData = this.parseQuizHTML(html, quizPath);
            console.log('[QuizLoader] Quiz data parsed:', {
                title: quizData.title,
                format: quizData.format,
                totalQuestions: quizData.totalQuestions,
                questionsLength: quizData.questions.length,
                availableTopics: quizData.availableTopics
            });
            
            // Cache the result
            this.cache.set(quizPath, quizData);
            
            return quizData;
        } catch (error) {
            console.error('[QuizLoader] Error loading quiz:', error);
            console.error('[QuizLoader] Stack trace:', error.stack);
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
        console.log('[QuizLoader] Script content length:', scriptContent.length);
        
        // First, try to detect the quiz format
        
        // Format A: Single array (fullQuizData or questions)
        const fullQuizMatch = scriptContent.match(/const\s+fullQuizData\s*=\s*\[([\s\S]*?)\];/);
        const questionsMatch = scriptContent.match(/const\s+questions\s*=\s*\[([\s\S]*?)\];/);
        
        if (fullQuizMatch || questionsMatch) {
            console.log('[QuizLoader] Detected Format A: Single quiz bundle');
            const match = fullQuizMatch || questionsMatch;
            const questions = this.parseFormatA(match[1]);
            console.log('[QuizLoader] Format A parsed, questions:', questions.length);
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
            const result = this.parseFormatB(quizDataArrayMatch[1], doc);
            console.log('[QuizLoader] Format B parsed, questions:', result.questions.length, 'topics:', result.topics.length);
            return result;
        }
        
        // Format C: Topic object (quizData object with topic keys)
        const quizDataObjectMatch = scriptContent.match(/const\s+quizData\s*=\s*\{([\s\S]*?)\};/);
        if (quizDataObjectMatch) {
            console.log('[QuizLoader] Detected Format C: Topic object');
            const result = this.parseFormatC(quizDataObjectMatch[1]);
            console.log('[QuizLoader] Format C parsed, questions:', result.questions.length, 'topics:', result.topics.length);
            return result;
        }
        
        // Try alternative patterns
        console.log('[QuizLoader] Trying alternative patterns...');
        
        // Check if quizData is an array without startQuiz
        if (quizDataArrayMatch && !scriptContent.includes('startQuiz')) {
            console.log('[QuizLoader] Found quizData array without startQuiz, checking structure...');
            // Check if it's format B by looking at the structure
            if (quizDataArrayMatch[1].includes('topic:') && quizDataArrayMatch[1].includes('questions:')) {
                console.log('[QuizLoader] Detected Format B (alternative)');
                const result = this.parseFormatB(quizDataArrayMatch[1], doc);
                return result;
            }
        }
        
        console.warn('[QuizLoader] No recognized quiz format found');
        console.warn('[QuizLoader] Script content preview:', scriptContent.substring(0, 500));
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
        
        console.log('[QuizLoader] Parsing Format A...');
        
        // Try regex parsing first (safer)
        const questionRegex = /\{\s*(?:question|anulus):\s*"((?:[^"\\]|\\.)*)"\s*,\s*answers:\s*\{([^}]+)\}\s*,\s*correctAnswer:\s*"([^"]+)"\s*,\s*explanation:\s*"((?:[^"\\]|\\.)*)"/g;
        
        let match;
        let regexCount = 0;
        while ((match = questionRegex.exec(dataContent)) !== null) {
            const [_, question, answersStr, correctAnswer, explanation] = match;
            const answers = {};
            
            // Parse answers
            const answerRegex = /([a-z]):\s*"((?:[^"\\]|\\.)*)"/g;
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
            regexCount++;
        }
        
        console.log(`[QuizLoader] Format A: Found ${regexCount} questions via regex`);
        
        // If regex found nothing, try JSON-like parsing as fallback
        if (questions.length === 0) {
            console.log('[QuizLoader] Regex found no questions, trying JSON-like parsing...');
            try {
                // Clean the data content for JSON parsing
                let cleanedContent = dataContent
                    .replace(/(\w+):/g, '"$1":') // Add quotes to keys
                    .replace(/'/g, '"') // Replace single quotes with double quotes
                    .replace(/,\s*}/g, '}') // Remove trailing commas
                    .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays
                
                const quizData = JSON.parse('[' + cleanedContent + ']');
                
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
                console.log(`[QuizLoader] Format A: Parsed ${questions.length} questions via JSON`);
            } catch (error) {
                console.error('[QuizLoader] JSON parsing failed:', error);
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
            const match = onclick.match(/startQuiz\(['"](.*?)['"]\)/);
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
            
            console.log('[QuizLoader] Format B data length:', quizData.length);
            
            quizData.forEach((item, index) => {
                if (item.topic && item.question && item.options && typeof item.answer !== 'undefined' && item.explanation) {
                    const answers = {};
                    if (Array.isArray(item.options)) {
                        item.options.forEach((opt, i) => {
                            answers[String.fromCharCode(97 + i)] = opt;
                        });
                    } else if (typeof item.options === 'object') {
                        // Handle object format options
                        Object.assign(answers, item.options);
                    }
                    
                    questions.push({
                        question: item.question,
                        answers,
                        correctAnswer: typeof item.answer === 'number' ? 
                            String.fromCharCode(97 + item.answer) : item.answer,
                        explanation: item.explanation,
                        topic: item.topic
                    });
                } else {
                    console.warn(`[QuizLoader] Format B item ${index} missing fields:`, {
                        hasTopic: !!item.topic,
                        hasQuestion: !!item.question,
                        hasOptions: !!item.options,
                        hasAnswer: typeof item.answer !== 'undefined',
                        hasExplanation: !!item.explanation
                    });
                }
            });
        } catch (error) {
            console.error('[QuizLoader] Failed to parse Format B with Function:', error);
            console.log('[QuizLoader] Trying regex fallback for Format B...');
            
            // Fallback regex parsing
            const itemRegex = /\{[^}]*topic:\s*['"](.*?)['"],[^}]*question:\s*['"](.*?)['"],[^}]*options:\s*\[(.*?)\],[^}]*answer:\s*(\d+),[^}]*explanation:\s*['"](.*?)['"]\s*\}/g;
            let match;
            while ((match = itemRegex.exec(dataContent)) !== null) {
                const [_, topic, question, optionsStr, answer, explanation] = match;
                const options = optionsStr.match(/['"](.*?)['"]/g)?.map(s => s.replace(/['"]/g, '')) || [];
                const answers = {};
                options.forEach((opt, i) => {
                    answers[String.fromCharCode(97 + i)] = opt;
                });
                questions.push({
                    topic,
                    question: this.decodeHTML(question),
                    answers,
                    correctAnswer: String.fromCharCode(97 + parseInt(answer)),
                    explanation: this.decodeHTML(explanation)
                });
            }
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
        
        console.log('[QuizLoader] Parsing Format C...');
        
        // Try regex parsing for safety
        // Look for topic objects with structure: "topicKey": { title: "...", questions: [...] }
        const topicRegex = /"([^"]+)":\s*\{\s*title:\s*"([^"]+)"[^}]*questions:\s*\[([\s\S]*?)\]\s*\}/g;
        
        let topicMatch;
        while ((topicMatch = topicRegex.exec(dataContent)) !== null) {
            const [_, topicKey, topicTitle, questionsStr] = topicMatch;
            topics.push({ key: topicKey, name: topicTitle });
            
            console.log(`[QuizLoader] Found topic: ${topicKey} - ${topicTitle}`);
            
            // Parse questions for this topic
            const questionRegex = /\{\s*question:\s*"((?:[^"\\]|\\.)*)"\s*,\s*options:\s*\[(.*?)\]\s*,\s*answer:\s*(\d+)\s*,\s*explanation:\s*"((?:[^"\\]|\\.)*)"/g;
            
            let qMatch;
            while ((qMatch = questionRegex.exec(questionsStr)) !== null) {
                const [_, question, optionsStr, answerIdx, explanation] = qMatch;
                
                // Parse options
                const options = [];
                const optionRegex = /"((?:[^"\\]|\\.)*)"/g;
                let optMatch;
                while ((optMatch = optionRegex.exec(optionsStr)) !== null) {
                    options.push(this.decodeHTML(optMatch[1]));
                }
                
                // Convert to answers object
                const answers = {};
                options.forEach((opt, idx) => {
                    answers[String.fromCharCode(97 + idx)] = opt;
                });
                
                questions.push({
                    topic: topicKey,
                    question: this.decodeHTML(question),
                    answers,
                    correctAnswer: String.fromCharCode(97 + parseInt(answerIdx)),
                    explanation: this.decodeHTML(explanation)
                });
            }
        }
        
        console.log(`[QuizLoader] Format C: Found ${topics.length} topics and ${questions.length} questions`);
        
        // If regex parsing found nothing, try fallback
        if (questions.length === 0) {
            console.log('[QuizLoader] Regex found no questions, trying JSON-like parsing...');
            try {
                // Clean content for JSON parsing
                let cleanedContent = dataContent
                    .replace(/(\w+):/g, '"$1":')
                    .replace(/'/g, '"')
                    .replace(/,\s*}/g, '}')
                    .replace(/,\s*]/g, ']');
                
                const quizData = JSON.parse('{' + cleanedContent + '}');
                
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
                console.log(`[QuizLoader] Format C: Parsed ${questions.length} questions via JSON`);
            } catch (error) {
                console.error('[QuizLoader] Format C JSON parsing failed:', error);
            }
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