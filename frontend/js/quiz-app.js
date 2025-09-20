/**
 * Quiz Engine - Main Application Entry Point
 * Initializes and coordinates all quiz modules
 */

import { QuizLoader } from './quiz-engine/quiz-loader.js';
import { QuizManager } from './quiz-engine/quiz-manager.js';
import { QuizUI } from './quiz-engine/quiz-ui.js';
import { QuizResults } from './quiz-engine/quiz-results.js';
import { MatrixRain } from './quiz-engine/matrix-rain.js';

class QuizApp {
    constructor() {
        this.state = {
            currentCategory: null,
            currentQuizPath: null,
            quizData: null,
            userProgress: this.loadProgress()
        };

        // Initialize modules
        this.loader = new QuizLoader();
        this.manager = new QuizManager();
        this.ui = new QuizUI();
        this.results = new QuizResults();
        this.matrixRain = null;

        this.init();
    }

    async init() {
        try {
            // Show loading
            this.ui.showLoading(true);

            // Initialize matrix rain effect
            this.initMatrixRain();

            // Setup event listeners
            this.setupEventListeners();

            // Load quiz metadata
            await this.loadQuizMetadata();

            // Update progress displays
            this.updateProgressBars();

            // Hide loading
            this.ui.showLoading(false);

        } catch (error) {
            console.error('Quiz app initialization error:', error);
            this.ui.showError('Hiba történt az alkalmazás betöltése közben.');
        }
    }

    initMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        if (canvas) {
            this.matrixRain = new MatrixRain(canvas);
            this.matrixRain.start();
        }
    }

    setupEventListeners() {
        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.handleCategorySelect(category);
            });
        });

        // Back buttons
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                this.ui.switchScreen(target);
            });
        });

        // Quiz controls
        document.getElementById('submit-answer')?.addEventListener('click', () => {
            this.handleAnswerSubmit();
        });

        document.getElementById('next-question')?.addEventListener('click', () => {
            this.handleNextQuestion();
        });

        // Results actions
        document.querySelectorAll('.action-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleResultAction(action);
            });
        });

        // Answer selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.answer-option')) {
                this.handleAnswerSelect(e.target.closest('.answer-option'));
            }
        });
    }

    async loadQuizMetadata() {
        // Define quiz structure based on directory analysis
        this.quizMetadata = {
            neuroanat: {
                title: 'Neuroanatómia',
                path: 'content/quizzes/Neuroanat',
                quizzes: [
                    { file: '1-3 Koponya_gerinc_látópálya.html', topics: '1-3', title: 'Koponya, gerinc és látópálya' },
                    { file: '4-6. Középagy_tekintés_szemmozgás.html', topics: '4-6', title: 'Középagy, tekintés és szemmozgás' },
                    { file: '7-11. NV_VII_vestib_hallás.html', topics: '7-11', title: 'V., VII. agyideg, vestibularis és hallás' },
                    { file: '12. Szédülés_vertigo.html', topics: '12', title: 'Szédülés és vertigo' },
                    { file: '12-15. Szédülés_bulbaris_híd.html', topics: '12-15', title: 'Szédülés, bulbaris és híd' },
                    { file: '16-20. kisagy_thalamus_caps interna_basalis ggl.html', topics: '16-20', title: 'Kisagy, thalamus, capsula interna, basalis ganglionok' },
                    { file: '21-24. mozgato_paresis_prefront_kérgiszerk.html', topics: '21-24', title: 'Mozgató, paresis, prefrontális, kérgi szerveződés' },
                    { file: '25-27. Dominancia_asszoc_érzőrendszerek.html', topics: '25-27', title: 'Dominancia, asszociációs és érzőrendszerek' },
                    { file: '28-30. Occip_perieet_temporalis.html', topics: '28-30', title: 'Occipitalis, parietalis és temporalis' },
                    { file: '31-34. limbik_magatart_memória_hippocamp.html', topics: '31-34', title: 'Limbikus, magatartás, memória és hippocampus' },
                    { file: '35-38. Hypothal_hypophys_beszéd_fájdalom.html', topics: '35-38', title: 'Hypothalamus, hypophysis, beszéd és fájdalom' },
                    { file: '39-40. gerincvelő_izomtónus.html', topics: '39-40', title: 'Gerincvelő és izomtónus' },
                    { file: '41-43. plexus_cerv_lumb_sacr_autonom.html', topics: '41-43', title: 'Plexusok és autonóm idegrendszer' },
                    { file: '44-48. agyi keringés (carotis, vertebro, gv, vénás).html', topics: '44-48', title: 'Agyi keringés' },
                    { file: '49-53. Vénás anatómia_gvvérell_vénáskeringés_sinuscavernosus_thalamusésbasalisggl.html', topics: '49-53', title: 'Vénás anatómia' },
                    { file: '54-59.  agy víztér, BBB, vér-liquor, transzmitterek.html', topics: '54-59', title: 'Agy víztér, BBB, transzmitterek' }
                ]
            },
            vizsmod: {
                title: 'Vizsgálómódszerek, alap klinikum',
                path: 'content/quizzes/Vizsgálómódszerek, alap klinikum',
                quizzes: [] // To be filled similarly
            },
            klinikum: {
                title: 'Klinikum',
                path: 'content/quizzes/Klinikum',
                quizzes: [] // To be filled similarly
            }
        };
    }

    handleCategorySelect(category) {
        this.state.currentCategory = category;
        const categoryData = this.quizMetadata[category];
        
        if (categoryData) {
            // Update UI
            this.ui.displayQuizList(categoryData);
            this.ui.switchScreen('quiz-list-screen');
        }
    }

    async handleQuizSelect(quizPath) {
        try {
            this.ui.showLoading(true);
            
            // Load quiz data
            const quizData = await this.loader.loadQuiz(quizPath);
            this.state.quizData = quizData;
            this.state.currentQuizPath = quizPath;
            
            // Initialize quiz manager with data
            this.manager.initQuiz(quizData);
            
            // Start quiz
            this.startQuiz();
            
            this.ui.showLoading(false);
        } catch (error) {
            console.error('Error loading quiz:', error);
            this.ui.showError('Hiba történt a kvíz betöltése közben.');
            this.ui.showLoading(false);
        }
    }

    startQuiz() {
        // Reset UI
        this.ui.resetQuiz();
        
        // Display first question
        const question = this.manager.getCurrentQuestion();
        this.ui.displayQuestion(question, this.manager.state.currentQuestionIndex + 1, this.manager.state.totalQuestions);
        
        // Switch to quiz screen
        this.ui.switchScreen('quiz-active-screen');
        
        // Start timer
        this.manager.startTimer((time) => {
            this.ui.updateTimer(time);
        });
    }

    handleAnswerSelect(answerElement) {
        if (!this.manager.canAnswer()) return;
        
        // Update UI
        this.ui.selectAnswer(answerElement);
        
        // Enable submit button
        document.getElementById('submit-answer').disabled = false;
    }

    handleAnswerSubmit() {
        const selectedAnswer = document.querySelector('.answer-option.selected');
        if (!selectedAnswer) return;
        
        const answerIndex = parseInt(selectedAnswer.dataset.answerIndex);
        const result = this.manager.submitAnswer(answerIndex);
        
        // Update UI
        this.ui.showAnswerResult(result);
        
        // Show next button or finish
        if (this.manager.hasMoreQuestions()) {
            document.getElementById('submit-answer').classList.add('hidden');
            document.getElementById('next-question').classList.remove('hidden');
        } else {
            // Quiz complete
            setTimeout(() => this.completeQuiz(), 1500);
        }
    }

    handleNextQuestion() {
        const question = this.manager.nextQuestion();
        this.ui.displayQuestion(question, this.manager.state.currentQuestionIndex + 1, this.manager.state.totalQuestions);
        
        // Reset buttons
        document.getElementById('submit-answer').classList.remove('hidden');
        document.getElementById('submit-answer').disabled = true;
        document.getElementById('next-question').classList.add('hidden');
    }

    completeQuiz() {
        // Stop timer
        this.manager.stopTimer();
        
        // Get results
        const results = this.manager.getResults();
        
        // Save progress
        this.saveQuizProgress(results);
        
        // Display results
        this.results.displayResults(results);
        this.ui.switchScreen('results-screen');
    }

    handleResultAction(action) {
        switch (action) {
            case 'retry':
                this.handleQuizSelect(this.state.currentQuizPath);
                break;
            case 'new-quiz':
                this.ui.switchScreen('quiz-list-screen');
                break;
            case 'home':
                this.ui.switchScreen('category-screen');
                break;
        }
    }

    loadProgress() {
        const saved = localStorage.getItem('quizProgress');
        return saved ? JSON.parse(saved) : {};
    }

    saveQuizProgress(results) {
        if (!this.state.userProgress[this.state.currentCategory]) {
            this.state.userProgress[this.state.currentCategory] = {};
        }
        
        this.state.userProgress[this.state.currentCategory][this.state.currentQuizPath] = {
            completed: true,
            bestScore: results.percentage,
            lastAttempt: new Date().toISOString()
        };
        
        localStorage.setItem('quizProgress', JSON.stringify(this.state.userProgress));
        this.updateProgressBars();
    }

    updateProgressBars() {
        Object.keys(this.quizMetadata).forEach(category => {
            const categoryData = this.quizMetadata[category];
            const progress = this.calculateCategoryProgress(category, categoryData);
            this.ui.updateCategoryProgress(category, progress);
        });
    }

    calculateCategoryProgress(category, categoryData) {
        const userCategoryProgress = this.state.userProgress[category] || {};
        const completedQuizzes = Object.keys(userCategoryProgress).filter(
            quiz => userCategoryProgress[quiz].completed
        ).length;
        
        return Math.round((completedQuizzes / categoryData.quizzes.length) * 100);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.quizApp = new QuizApp();
    });
} else {
    window.quizApp = new QuizApp();
}