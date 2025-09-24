/**
 * Matrix Terminal Component
 * Retrofuturistic terminal interface for loading quiz modules
 */

export class MatrixTerminal {
    constructor() {
        this.container = null;
        this.terminal = null;
        this.iframe = null;
        this.bootSequence = [
            "NEUROLÓGIA QUIZ SYSTEM v2.0.1",
            "Copyright (c) 2025 Neurológia VizsgApp made by Dr. Zsolaj",
            "",
            "> INITIALIZING...",
            "[ SYSTEM READY ]"
        ];
        this.terminalTitle = "NEURAL QUIZ INTERFACE";
        this.isBooting = false;
    }

    /**
     * Initialize the terminal in the given container
     * @param {HTMLElement} container - Container element
     */
    init(container) {
        this.container = container;
        this.createTerminal();
    }

    /**
     * Create the terminal UI
     */
    createTerminal() {
        this.terminal = document.createElement('div');
        this.terminal.className = 'matrix-terminal';
        this.terminal.innerHTML = `
            <div class="terminal-frame">
                <div class="terminal-header">
                    <div class="terminal-title">${this.terminalTitle}</div>
                    <div class="terminal-controls">
                        <button class="terminal-btn minimize">_</button>
                        <button class="terminal-btn maximize">□</button>
                        <button class="terminal-btn close" id="terminal-close">×</button>
                    </div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-scanlines"></div>
                    <div class="terminal-glow"></div>
                    <div class="terminal-output" id="terminal-output"></div>
                    <div class="terminal-content" id="terminal-content">
                        <iframe 
                            id="quiz-iframe" 
                            class="quiz-iframe hidden"
                            allowfullscreen
                            allow="autoplay; fullscreen"
                            tabindex="0"
                            frameborder="0"
                        ></iframe>
                    </div>
                </div>
            </div>
        `;

        this.container.appendChild(this.terminal);
        
        // Get references
        this.output = document.getElementById('terminal-output');
        this.content = document.getElementById('terminal-content');
        this.iframe = document.getElementById('quiz-iframe');
        
        // Setup event listeners
        this.setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const closeBtn = document.getElementById('terminal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Listen for iframe load
        if (this.iframe) {
            this.iframe.addEventListener('load', () => this.onQuizLoaded());
        }
    }

    /**
     * Show terminal with boot sequence
     */
    async show() {
        // Reset terminal state
        this.reset();
        this.terminal.classList.add('active');
        await this.runBootSequence();
    }
    
    /**
     * Reset terminal to initial state
     */
    reset() {
        // Clear output
        if (this.output) {
            this.output.innerHTML = '';
            this.output.classList.remove('fade-out');
            this.output.classList.remove('visible');
        }
        
        // Reset iframe
        if (this.iframe) {
            this.iframe.src = 'about:blank';
            this.iframe.classList.add('hidden');
            this.iframe.classList.remove('visible');
        }
        
        // Reset flags
        this.isBooting = false;
    }

    /**
     * Run boot sequence animation
     */
    async runBootSequence() {
        this.isBooting = true;
        
        // Ensure output is visible and iframe is hidden
        this.output.innerHTML = '';
        this.output.classList.remove('fade-out');
        this.output.classList.add('visible');
        this.iframe.classList.add('hidden');
        this.iframe.classList.remove('visible');

        for (const line of this.bootSequence) {
            await this.typeLine(line);
            await this.delay(68);  // Reduced by 25% for faster startup
        }

        await this.delay(338);  // Reduced by 25% for faster startup
        this.isBooting = false;
    }

    /**
     * Type a line in the terminal
     * @param {string} text - Text to type
     */
    async typeLine(text) {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        
        if (text.startsWith('>')) {
            lineElement.classList.add('command');
        } else if (text.startsWith('[')) {
            lineElement.classList.add('success');
        }
        
        this.output.appendChild(lineElement);

        // Type effect (10% faster)
        for (let i = 0; i < text.length; i++) {
            lineElement.textContent = text.substring(0, i + 1);
            if (!text.startsWith('[')) { // Don't delay for status messages
                await this.delay(14 + Math.random() * 20);  // Reduced by 25% for faster typing
            }
        }

        // Add cursor blink at end
        if (text.length > 0) {
            lineElement.innerHTML += '<span class="cursor">█</span>';
            await this.delay(135);  // Reduced by 25% for faster cursor
            lineElement.querySelector('.cursor')?.remove();
        }

        // Auto scroll
        this.output.scrollTop = this.output.scrollHeight;
    }

    /**
     * Load quiz in iframe
     * @param {string} quizPath - Path to quiz HTML
     * @param {string} title - Quiz title
     */
    async loadQuiz(quizPath, title) {
        // Show terminal first
        await this.show();

        // Show loading message
        await this.typeLine(`> LOADING: ${title}`);
        
        // Wait a moment before loading to ensure boot sequence is visible
        await this.delay(338);  // Reduced by 25% for faster loading
        
        // Load the quiz with absolute path from current location
        // This ensures the quiz loads from the correct path
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        const fullPath = window.location.origin + basePath + '/' + quizPath;
        
        console.log('[MatrixTerminal] Loading quiz from:', fullPath);
        this.iframe.src = fullPath;
    }

    /**
     * Called when quiz is loaded in iframe
     */
    async onQuizLoaded() {
        // Ignore about:blank loads
        if (this.iframe.src === 'about:blank' || this.iframe.src === '') return;
        
        if (this.isBooting) return;

        await this.typeLine("[ MODULE LOADED ]");
        await this.delay(203);  // Reduced by 25% for faster transitions
        
        // Fade out terminal output, fade in quiz
        this.output.classList.add('fade-out');
        await this.delay(203);  // Reduced by 25% for faster fade-out
        
        this.output.classList.remove('visible');
        this.iframe.classList.remove('hidden');
        this.iframe.classList.add('visible');

        // Give focus to iframe for interaction
        setTimeout(() => {
            this.iframe.focus();
            // Try to focus the iframe content window too
            try {
                if (this.iframe.contentWindow) {
                    this.iframe.contentWindow.focus();
                }
            } catch (e) {
                console.log('Could not focus iframe content window');
            }
        }, 100);

        // Don't inject any styles - let the quiz use its original styling
        // The terminal frame provides the Matrix aesthetic
    }

    /**
     * Close terminal
     */
    close() {
        this.terminal.classList.add('closing');
        setTimeout(() => {
            this.terminal.classList.remove('active', 'closing');
            
            // Full reset
            this.reset();
            
            // Notify app
            if (window.quizApp) {
                window.quizApp.onTerminalClose();
            } else if (window.summariesApp) {
                window.summariesApp.onTerminalClose();
            }
        }, 270);  // Reduced from 300ms (10% faster)
    }

    /**
     * Utility delay function
     * @param {number} ms - Milliseconds to delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Destroy terminal
     */
    destroy() {
        if (this.terminal) {
            this.terminal.remove();
            this.terminal = null;
        }
    }
}