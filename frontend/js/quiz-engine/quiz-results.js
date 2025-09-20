/**
 * Quiz Results Module
 * Displays and manages quiz results
 */

export class QuizResults {
    constructor() {
        this.elements = {
            scoreDisplay: document.getElementById('score-display'),
            scorePercentage: document.getElementById('score-percentage'),
            resultsBreakdown: document.getElementById('results-breakdown')
        };
    }

    /**
     * Display quiz results
     * @param {Object} results - Results from quiz manager
     */
    displayResults(results) {
        // Update score display
        this.displayScore(results);
        
        // Display question breakdown
        this.displayBreakdown(results.breakdown);
        
        // Add performance message
        this.displayPerformanceMessage(results.percentage);
        
        // Save statistics
        this.saveStatistics(results);
    }

    /**
     * Display score with animation
     * @param {Object} results - Results data
     */
    displayScore(results) {
        if (this.elements.scoreDisplay) {
            this.elements.scoreDisplay.textContent = `${results.correctCount}/${results.totalQuestions}`;
        }
        
        if (this.elements.scorePercentage) {
            // Animate percentage
            this.animatePercentage(0, results.percentage, this.elements.scorePercentage);
            
            // Set color based on score
            const scoreClass = this.getScoreClass(results.percentage);
            this.elements.scorePercentage.className = `score-percentage ${scoreClass}`;
        }
    }

    /**
     * Display question-by-question breakdown
     * @param {Array} breakdown - Question breakdown data
     */
    displayBreakdown(breakdown) {
        if (!this.elements.resultsBreakdown) return;
        
        const html = breakdown.map((item, index) => this.createBreakdownItem(item, index + 1)).join('');
        
        this.elements.resultsBreakdown.innerHTML = `
            <div class="breakdown-header">
                <h3>Részletes eredmények</h3>
            </div>
            <div class="breakdown-items">
                ${html}
            </div>
        `;
    }

    /**
     * Create breakdown item HTML
     * @param {Object} item - Question result
     * @param {number} number - Question number
     * @returns {string} HTML
     */
    createBreakdownItem(item, number) {
        const statusIcon = item.isCorrect ? '✓' : '✗';
        const statusClass = item.isCorrect ? 'correct' : 'incorrect';
        
        let answersHTML = '';
        Object.entries(item.answers).forEach(([letter, text]) => {
            const isUserAnswer = letter === item.userAnswer;
            const isCorrectAnswer = letter === item.correctAnswer;
            
            let answerClass = 'result-answer';
            if (isUserAnswer && !item.isCorrect) answerClass += ' incorrect';
            if (isCorrectAnswer) answerClass += ' correct';
            
            let label = '';
            if (isUserAnswer) label = '<span class="answer-label">Te válaszod</span>';
            if (isCorrectAnswer && !item.isCorrect) label = '<span class="answer-label">Helyes válasz</span>';
            
            answersHTML += `
                <div class="${answerClass}">
                    <span class="answer-letter">${letter.toUpperCase()}.</span>
                    ${text}
                    ${label}
                </div>
            `;
        });
        
        const explanationHTML = !item.isCorrect && item.explanation ? `
            <div class="explanation">
                <strong>Magyarázat:</strong> ${item.explanation}
            </div>
        ` : '';
        
        return `
            <div class="result-item ${statusClass}">
                <div class="result-header">
                    <span class="result-number">${number}.</span>
                    <span class="result-status ${statusClass}">${statusIcon}</span>
                    <span class="result-time">${this.formatTime(item.timeSpent)}</span>
                </div>
                <div class="result-question">${item.question}</div>
                <div class="result-answers">
                    ${answersHTML}
                </div>
                ${explanationHTML}
            </div>
        `;
    }

    /**
     * Display performance message
     * @param {number} percentage - Score percentage
     */
    displayPerformanceMessage(percentage) {
        const messages = {
            excellent: [
                'Kiváló teljesítmény! 🎉',
                'Gratulálok, remek munka! 🌟',
                'Lenyűgöző tudás! 💫'
            ],
            good: [
                'Jó munka! 👍',
                'Szép teljesítmény! ✨',
                'Ügyes vagy! 👏'
            ],
            average: [
                'Nem rossz, de van még mit tanulni! 📚',
                'Közepes eredmény, gyakorolj még! 💪',
                'Fejlődésre van még lehetőség! 🎯'
            ],
            poor: [
                'Ne csüggedj, gyakorlás teszi a mestert! 💪',
                'Próbáld újra, menni fog! 🎯',
                'Tanulj még egy kicsit és próbáld újra! 📖'
            ]
        };
        
        let category;
        if (percentage >= 90) category = 'excellent';
        else if (percentage >= 70) category = 'good';
        else if (percentage >= 50) category = 'average';
        else category = 'poor';
        
        const message = messages[category][Math.floor(Math.random() * messages[category].length)];
        
        const messageEl = document.createElement('div');
        messageEl.className = `performance-message ${category}`;
        messageEl.innerHTML = `
            <div class="message-icon">${this.getPerformanceIcon(percentage)}</div>
            <div class="message-text">${message}</div>
        `;
        
        const header = document.querySelector('.results-header');
        if (header) {
            header.appendChild(messageEl);
        }
    }

    /**
     * Get performance icon based on score
     * @param {number} percentage - Score percentage
     * @returns {string} Icon
     */
    getPerformanceIcon(percentage) {
        if (percentage >= 90) return '🏆';
        if (percentage >= 70) return '⭐';
        if (percentage >= 50) return '📈';
        return '📚';
    }

    /**
     * Get score class for styling
     * @param {number} percentage - Score percentage
     * @returns {string} CSS class
     */
    getScoreClass(percentage) {
        if (percentage >= 90) return 'excellent';
        if (percentage >= 70) return 'good';
        if (percentage >= 50) return 'average';
        return 'poor';
    }

    /**
     * Format time in milliseconds to readable format
     * @param {number} ms - Time in milliseconds
     * @returns {string} Formatted time
     */
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        if (seconds < 60) {
            return `${seconds} mp`;
        }
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Animate percentage from start to end
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {HTMLElement} element - Element to update
     */
    animatePercentage(start, end, element) {
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.round(start + (end - start) * easeOutQuart);
            element.textContent = `(${current}%)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    /**
     * Save quiz statistics
     * @param {Object} results - Results data
     */
    saveStatistics(results) {
        const stats = this.loadStatistics();
        
        // Update overall statistics
        stats.totalQuizzes = (stats.totalQuizzes || 0) + 1;
        stats.totalQuestions = (stats.totalQuestions || 0) + results.totalQuestions;
        stats.totalCorrect = (stats.totalCorrect || 0) + results.correctCount;
        stats.totalTime = (stats.totalTime || 0) + results.totalTime;
        
        // Update best scores
        if (!stats.bestScores) stats.bestScores = {};
        const quizKey = window.quizApp?.state.currentQuizPath || 'unknown';
        
        if (!stats.bestScores[quizKey] || stats.bestScores[quizKey] < results.percentage) {
            stats.bestScores[quizKey] = results.percentage;
        }
        
        // Update streaks
        if (results.percentage === 100) {
            stats.perfectScores = (stats.perfectScores || 0) + 1;
        }
        
        // Save
        localStorage.setItem('quizStatistics', JSON.stringify(stats));
    }

    /**
     * Load statistics from storage
     * @returns {Object} Statistics
     */
    loadStatistics() {
        const saved = localStorage.getItem('quizStatistics');
        return saved ? JSON.parse(saved) : {};
    }

    /**
     * Display overall statistics
     */
    displayOverallStats() {
        const stats = this.loadStatistics();
        
        if (!stats.totalQuizzes) return '';
        
        const averageScore = Math.round((stats.totalCorrect / stats.totalQuestions) * 100);
        const averageTime = Math.round(stats.totalTime / stats.totalQuizzes / 1000);
        
        return `
            <div class="overall-stats">
                <h3>Összesített statisztika</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value">${stats.totalQuizzes}</div>
                        <div class="stat-label">Teljesített kvíz</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${averageScore}%</div>
                        <div class="stat-label">Átlagos eredmény</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.perfectScores || 0}</div>
                        <div class="stat-label">Hibátlan kvíz</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${this.formatTime(averageTime * 1000)}</div>
                        <div class="stat-label">Átlagos idő</div>
                    </div>
                </div>
            </div>
        `;
    }
}