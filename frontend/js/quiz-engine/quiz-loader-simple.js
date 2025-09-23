/**
 * Simplified Quiz Loader Module
 * Returns quiz paths without parsing
 */

export class QuizLoader {
    constructor() {
        // No cache needed for simple path loading
    }

    /**
     * Get quiz path - no parsing needed
     * @param {string} quizPath - Path to the quiz HTML file
     * @returns {Object} Quiz metadata
     */
    getQuizInfo(quizPath) {
        const filename = quizPath.split('/').pop();
        const title = filename.replace('.html', '');
        
        return {
            path: quizPath,
            title: title,
            filename: filename
        };
    }

    /**
     * Clear any old cached data
     */
    clearCache() {
        // No cache in simplified version
    }
}