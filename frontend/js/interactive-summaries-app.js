/**
 * Interactive Summaries App
 * Main application logic for interactive summaries
 */

import { summariesData } from './interactive-summaries-data.js';
import { MatrixRain } from './quiz-engine/matrix-rain.js';
import { MatrixTerminal } from './quiz-engine/matrix-terminal.js';

class InteractiveSummariesApp {
    constructor() {
        this.currentCategory = null;
        this.currentSummary = null;
        this.matrixRain = null;
        this.matrixTerminal = null;
        
        this.init();
    }
    
    async init() {
        try {
            // Initialize matrix rain
            this.initMatrixRain();
            
            // Initialize matrix terminal
            this.initMatrixTerminal();
            
            // Setup event listeners
            this.setupEventListeners();
            
            console.log('Interactive Summaries App initialized');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }
    
    initMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        if (canvas) {
            this.matrixRain = new MatrixRain(canvas);
            this.matrixRain.stop();
            
            // Configure for visibility
            this.matrixRain.setConfig({
                fadeColor: 'rgba(10, 10, 10, 0.02)',
                speed: 25,
                density: 0.98,
                color: '#00ff41',
                fontSize: 16
            });
            
            this.matrixRain.start();
            console.log('Matrix rain initialized');
        }
    }
    
    initMatrixTerminal() {
        const container = document.getElementById('matrix-terminal-container');
        if (container) {
            this.matrixTerminal = new MatrixTerminal();
            this.matrixTerminal.init(container);
            console.log('Matrix terminal initialized');
        }
    }
    
    setupEventListeners() {
        // Category card clicks
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.handleCategorySelect(category);
            });
        });
        
        // Back button
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.target;
                this.switchScreen(target);
            });
        });
    }
    
    handleCategorySelect(category) {
        console.log('Category selected:', category);
        this.currentCategory = category;
        
        const categoryData = summariesData[category];
        if (!categoryData) {
            console.error('Category not found:', category);
            return;
        }
        
        // Update screen title
        const titleElement = document.getElementById('summary-list-title');
        if (titleElement) {
            titleElement.textContent = `${categoryData.title} - Interaktív összefoglalók`;
        }
        
        // Display summaries
        this.displaySummaryList(categoryData);
        
        // Switch to summary list screen
        this.switchScreen('summary-list-screen');
    }
    
    displaySummaryList(categoryData) {
        const container = document.getElementById('summary-list-container');
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create summary items
        categoryData.summaries.forEach(summary => {
            const summaryItem = this.createSummaryItem(summary, categoryData.path);
            container.appendChild(summaryItem);
        });
    }
    
    createSummaryItem(summary, basePath) {
        const div = document.createElement('div');
        div.className = 'summary-item';
        div.innerHTML = `
            <div class="summary-topics">Témák: ${summary.topics}</div>
            <h3 class="summary-title">${summary.title}</h3>
            <div class="summary-topics-list">Interaktív összefoglaló</div>
        `;
        
        div.addEventListener('click', () => {
            this.handleSummarySelect(summary, basePath);
        });
        
        return div;
    }
    
    async handleSummarySelect(summary, basePath) {
        console.log('Summary selected:', summary.title);
        this.currentSummary = summary;
        
        const summaryPath = basePath + summary.file;
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Load summary in matrix terminal
        if (this.matrixTerminal) {
            await this.matrixTerminal.loadQuiz(summaryPath, summary.title);
        }
    }
    
    switchScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }
    
    onTerminalClose() {
        // Return to summary list when terminal closes
        console.log('Terminal closed, returning to summary list');
        this.switchScreen('summary-list-screen');
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.summariesApp = new InteractiveSummariesApp();
    });
} else {
    window.summariesApp = new InteractiveSummariesApp();
}