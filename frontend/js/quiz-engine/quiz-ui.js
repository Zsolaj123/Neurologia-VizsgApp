/**
 * Quiz UI Module
 * Handles all UI interactions and display updates
 */

export class QuizUI {
    constructor() {
        this.elements = {
            screens: {
                category: document.getElementById('category-screen'),
                quizList: document.getElementById('quiz-list-screen'),
                activeQuiz: document.getElementById('quiz-active-screen'),
                results: document.getElementById('results-screen')
            },
            loading: document.getElementById('loading-overlay'),
            quizContent: document.getElementById('quiz-content'),
            questionCounter: document.getElementById('question-counter'),
            timer: document.querySelector('.timer-text'),
            quizTitle: document.getElementById('active-quiz-title'),
            submitButton: document.getElementById('submit-answer'),
            nextButton: document.getElementById('next-question')
        };
    }

    /**
     * Switch between screens
     * @param {string} screenId - ID of the screen to show
     */
    switchScreen(screenId) {
        // Hide all screens
        Object.values(this.elements.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    /**
     * Show/hide loading overlay
     * @param {boolean} show - Whether to show loading
     */
    showLoading(show) {
        if (this.elements.loading) {
            if (show) {
                this.elements.loading.classList.remove('hidden');
            } else {
                this.elements.loading.classList.add('hidden');
            }
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        // Create error toast
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--quiz-incorrect);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    /**
     * Display quiz list for a category
     * @param {Object} categoryData - Category metadata
     */
    displayQuizList(categoryData) {
        const container = document.getElementById('quiz-list-container');
        const title = document.getElementById('quiz-list-title');
        
        if (title) {
            title.textContent = `${categoryData.title} kvízek`;
        }
        
        if (!container) return;
        
        container.innerHTML = '';
        
        categoryData.quizzes.forEach(quiz => {
            const item = document.createElement('div');
            item.className = 'quiz-item';
            item.dataset.quizPath = `${categoryData.path}/${quiz.file}`;
            
            // Check if completed
            const progress = this.getQuizProgress(quiz.file);
            const isCompleted = progress && progress.completed;
            
            item.innerHTML = `
                <div class="quiz-item-info">
                    <h3 class="quiz-item-title">${quiz.title}</h3>
                    <p class="quiz-item-topics">Témák: ${quiz.topics}</p>
                </div>
                <div class="quiz-item-status">
                    ${isCompleted ? 
                        `<span class="quiz-score completed">✓ ${progress.bestScore}%</span>` : 
                        '<span class="quiz-score">Még nem teljesített</span>'
                    }
                </div>
            `;
            
            item.addEventListener('click', () => {
                const app = window.quizApp;
                if (app) app.handleQuizSelect(item.dataset.quizPath);
            });
            
            container.appendChild(item);
        });
    }

    /**
     * Display a quiz question
     * @param {Object} question - Question data
     * @param {number} current - Current question number
     * @param {number} total - Total questions
     */
    displayQuestion(question, current, total) {
        if (!question || !this.elements.quizContent) return;
        
        // Update counter
        if (this.elements.questionCounter) {
            this.elements.questionCounter.textContent = `Kérdés ${current} / ${total}`;
        }
        
        // Build question HTML
        const answersHTML = Object.entries(question.answers).map(([index, text]) => `
            <div class="answer-option" data-answer-index="${index}">
                <div class="answer-label">
                    <span class="answer-letter">${String.fromCharCode(65 + parseInt(index))}</span>
                    <span class="answer-text">${text}</span>
                </div>
            </div>
        `).join('');
        
        this.elements.quizContent.innerHTML = `
            <div class="question">${question.question}</div>
            <div class="answers">${answersHTML}</div>
        `;
        
        // Reset submit button
        if (this.elements.submitButton) {
            this.elements.submitButton.disabled = true;
        }
    }

    /**
     * Select an answer option
     * @param {HTMLElement} answerElement - Answer element
     */
    selectAnswer(answerElement) {
        // Remove previous selection
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection
        answerElement.classList.add('selected');
    }

    /**
     * Show answer result
     * @param {Object} result - Answer result from manager
     */
    showAnswerResult(result) {
        const selectedOption = document.querySelector('.answer-option.selected');
        if (!selectedOption) return;
        
        // Mark selected answer
        selectedOption.classList.add(result.isCorrect ? 'correct' : 'incorrect');
        
        // Mark correct answer if different
        if (!result.isCorrect) {
            const correctLetter = result.correctAnswer.toUpperCase();
            const correctIndex = correctLetter.charCodeAt(0) - 65;
            const correctOption = document.querySelector(`[data-answer-index="${correctIndex}"]`);
            if (correctOption) {
                correctOption.classList.add('correct');
            }
        }
        
        // Disable all options
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.add('disabled');
        });
        
        // Show explanation if wrong
        if (!result.isCorrect && result.explanation) {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'explanation';
            explanationDiv.innerHTML = `<strong>Magyarázat:</strong> ${result.explanation}`;
            this.elements.quizContent.appendChild(explanationDiv);
        }
    }

    /**
     * Update timer display
     * @param {number} seconds - Elapsed seconds
     */
    updateTimer(seconds) {
        if (!this.elements.timer) return;
        
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Reset quiz UI
     */
    resetQuiz() {
        if (this.elements.quizContent) {
            this.elements.quizContent.innerHTML = '';
        }
        
        if (this.elements.submitButton) {
            this.elements.submitButton.classList.remove('hidden');
            this.elements.submitButton.disabled = true;
        }
        
        if (this.elements.nextButton) {
            this.elements.nextButton.classList.add('hidden');
        }
        
        this.updateTimer(0);
    }

    /**
     * Update category progress bar
     * @param {string} category - Category ID
     * @param {number} progress - Progress percentage
     */
    updateCategoryProgress(category, progress) {
        const card = document.querySelector(`[data-category="${category}"]`);
        if (!card) return;
        
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
            progressFill.dataset.progress = progress;
        }
        
        if (progressText) {
            progressText.textContent = `${progress}% teljesítve`;
        }
    }

    /**
     * Get quiz progress from localStorage
     * @param {string} quizFile - Quiz filename
     * @returns {Object|null} Progress data
     */
    getQuizProgress(quizFile) {
        const progress = localStorage.getItem('quizProgress');
        if (!progress) return null;
        
        const data = JSON.parse(progress);
        // Search through all categories
        for (const category of Object.values(data)) {
            for (const [path, progressData] of Object.entries(category)) {
                if (path.includes(quizFile)) {
                    return progressData;
                }
            }
        }
        
        return null;
    }

    /**
     * Set quiz title
     * @param {string} title - Quiz title
     */
    setQuizTitle(title) {
        if (this.elements.quizTitle) {
            this.elements.quizTitle.textContent = title;
        }
    }

    /**
     * Create loading spinner
     * @returns {HTMLElement} Spinner element
     */
    createSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        return spinner;
    }

    /**
     * Animate score display
     * @param {number} score - Score percentage
     * @param {HTMLElement} element - Element to animate
     */
    animateScore(score, element) {
        let current = 0;
        const increment = score > 50 ? 2 : 1;
        const duration = 1000;
        const steps = duration / (1000 / 60); // 60 fps
        const stepSize = score / steps;
        
        const interval = setInterval(() => {
            current += stepSize;
            if (current >= score) {
                current = score;
                clearInterval(interval);
            }
            element.textContent = `${Math.round(current)}%`;
        }, 1000 / 60);
    }
}