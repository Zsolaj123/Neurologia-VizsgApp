/**
 * Quiz Manager Module
 * Manages quiz state, scoring, and logic
 */

export class QuizManager {
    constructor() {
        this.state = {
            questions: [],
            currentQuestionIndex: 0,
            totalQuestions: 0,
            answers: [],
            startTime: null,
            endTime: null,
            timerInterval: null,
            isComplete: false
        };
    }

    /**
     * Initialize quiz with data
     * @param {Object} quizData - Quiz data from loader
     * @param {number} questionCount - Number of questions per round (default 20)
     */
    initQuiz(quizData, questionCount = 20) {
        // Reset state
        this.reset();
        
        // Shuffle questions and select subset
        const shuffled = this.shuffleArray([...quizData.questions]);
        const questionsPerRound = Math.min(questionCount, shuffled.length);
        
        this.state.questions = shuffled.slice(0, questionsPerRound);
        this.state.totalQuestions = this.state.questions.length;
        this.state.startTime = Date.now();
    }

    /**
     * Reset quiz state
     */
    reset() {
        this.stopTimer();
        this.state = {
            questions: [],
            currentQuestionIndex: 0,
            totalQuestions: 0,
            answers: [],
            startTime: null,
            endTime: null,
            timerInterval: null,
            isComplete: false
        };
    }

    /**
     * Get current question
     * @returns {Object|null} Current question object
     */
    getCurrentQuestion() {
        if (this.state.currentQuestionIndex >= this.state.totalQuestions) {
            return null;
        }
        
        const question = this.state.questions[this.state.currentQuestionIndex];
        
        // Shuffle answers while preserving correct answer reference
        const shuffledAnswers = this.shuffleAnswers(question.answers, question.correctAnswer);
        
        return {
            ...question,
            answers: shuffledAnswers.answers,
            answerMapping: shuffledAnswers.answerMapping,
            correctIndex: shuffledAnswers.correctIndex
        };
    }

    /**
     * Shuffle answers while tracking correct answer
     * @param {Object} answers - Original answers object
     * @param {string} correctAnswer - Correct answer letter
     * @returns {Object} Shuffled answers with correct index and mapping
     */
    shuffleAnswers(answers, correctAnswer) {
        const entries = Object.entries(answers);
        const shuffled = this.shuffleArray(entries);
        
        const newAnswers = {};
        const answerMapping = {}; // Maps display index to original letter
        let correctIndex = -1;
        
        shuffled.forEach((entry, index) => {
            const [letter, text] = entry;
            newAnswers[index] = text;
            answerMapping[index] = letter;
            
            if (letter === correctAnswer) {
                correctIndex = index;
            }
        });
        
        return {
            answers: newAnswers,
            answerMapping,
            correctIndex
        };
    }

    /**
     * Submit answer for current question
     * @param {number} answerIndex - Selected answer index
     * @param {Object} answerMapping - Mapping of display indices to original letters
     * @returns {Object} Answer result
     */
    submitAnswer(answerIndex, answerMapping) {
        const question = this.state.questions[this.state.currentQuestionIndex];
        
        // Get the original letter from the mapping
        const selectedLetter = answerMapping ? answerMapping[answerIndex] : null;
        
        const isCorrect = selectedLetter === question.correctAnswer;
        
        const answer = {
            questionIndex: this.state.currentQuestionIndex,
            selectedAnswer: answerIndex,
            selectedLetter,
            isCorrect,
            timeSpent: Date.now() - (this.state.answers[this.state.answers.length - 1]?.timestamp || this.state.startTime)
        };
        
        answer.timestamp = Date.now();
        this.state.answers.push(answer);
        
        return {
            isCorrect,
            correctAnswer: question.correctAnswer,
            selectedLetter,
            explanation: question.explanation
        };
    }

    /**
     * Move to next question
     * @returns {Object|null} Next question or null if complete
     */
    nextQuestion() {
        this.state.currentQuestionIndex++;
        
        if (this.state.currentQuestionIndex >= this.state.totalQuestions) {
            this.completeQuiz();
            return null;
        }
        
        return this.getCurrentQuestion();
    }

    /**
     * Check if there are more questions
     * @returns {boolean}
     */
    hasMoreQuestions() {
        return this.state.currentQuestionIndex < this.state.totalQuestions - 1;
    }

    /**
     * Check if can submit answer
     * @returns {boolean}
     */
    canAnswer() {
        return !this.state.isComplete && 
               this.state.answers.length === this.state.currentQuestionIndex;
    }

    /**
     * Complete the quiz
     */
    completeQuiz() {
        this.state.isComplete = true;
        this.state.endTime = Date.now();
        this.stopTimer();
    }

    /**
     * Get quiz results
     * @returns {Object} Results summary
     */
    getResults() {
        const correctCount = this.state.answers.filter(a => a.isCorrect).length;
        const totalTime = this.state.endTime - this.state.startTime;
        
        return {
            questions: this.state.questions,
            answers: this.state.answers,
            correctCount,
            totalQuestions: this.state.totalQuestions,
            percentage: Math.round((correctCount / this.state.totalQuestions) * 100),
            totalTime,
            averageTime: Math.round(totalTime / this.state.totalQuestions),
            breakdown: this.getQuestionBreakdown()
        };
    }

    /**
     * Get detailed question breakdown
     * @returns {Array} Question-by-question results
     */
    getQuestionBreakdown() {
        return this.state.questions.map((question, index) => {
            const answer = this.state.answers[index];
            return {
                question: question.question,
                answers: question.answers,
                correctAnswer: question.correctAnswer,
                userAnswer: answer ? answer.selectedLetter : null,
                isCorrect: answer ? answer.isCorrect : false,
                timeSpent: answer ? answer.timeSpent : 0,
                explanation: question.explanation
            };
        });
    }

    /**
     * Start timer
     * @param {Function} callback - Called with elapsed time
     */
    startTimer(callback) {
        const startTime = Date.now();
        
        this.state.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            callback(elapsed);
        }, 1000);
    }

    /**
     * Stop timer
     */
    stopTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    }

    /**
     * Shuffle array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Get quiz statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        return {
            questionsAnswered: this.state.answers.length,
            questionsRemaining: this.state.totalQuestions - this.state.answers.length,
            correctSoFar: this.state.answers.filter(a => a.isCorrect).length,
            currentStreak: this.getCurrentStreak(),
            averageTimePerQuestion: this.getAverageTime()
        };
    }

    /**
     * Get current correct answer streak
     * @returns {number} Streak count
     */
    getCurrentStreak() {
        let streak = 0;
        for (let i = this.state.answers.length - 1; i >= 0; i--) {
            if (this.state.answers[i].isCorrect) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    /**
     * Get average time per question
     * @returns {number} Average time in seconds
     */
    getAverageTime() {
        if (this.state.answers.length === 0) return 0;
        
        const totalTime = this.state.answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
        return Math.round(totalTime / this.state.answers.length / 1000);
    }
}