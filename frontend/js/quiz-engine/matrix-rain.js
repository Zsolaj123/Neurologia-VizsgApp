/**
 * Matrix Rain Effect
 * Creates the iconic Matrix digital rain background effect
 */

export class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Configuration
        this.config = {
            fontSize: 14,
            fontFamily: 'JetBrains Mono, monospace',
            color: '#00ff41',
            fadeColor: 'rgba(10, 10, 10, 0.05)',
            speed: 35,
            density: 0.95,
            characters: 'アィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺーヽヾABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()'
        };
        
        // State
        this.columns = 0;
        this.drops = [];
        this.animationId = null;
        this.lastTime = 0;
        
        this.init();
    }

    /**
     * Initialize the effect
     */
    init() {
        // Set canvas size
        this.resize();
        
        // Listen for window resize
        window.addEventListener('resize', () => this.resize());
        
        // Initialize drops
        this.initDrops();
    }

    /**
     * Resize canvas to window size
     */
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Recalculate columns
        this.columns = Math.floor(this.canvas.width / this.config.fontSize);
        
        // Reinitialize drops if needed
        if (this.drops.length !== this.columns) {
            this.initDrops();
        }
    }

    /**
     * Initialize drop positions
     */
    initDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            // Start drops at random heights
            this.drops[i] = Math.random() * -100;
        }
    }

    /**
     * Start the animation
     */
    start() {
        if (!this.animationId) {
            this.animate();
        }
    }

    /**
     * Stop the animation
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Animation loop
     */
    animate(currentTime = 0) {
        this.animationId = requestAnimationFrame((time) => this.animate(time));
        
        // Throttle to target speed
        if (currentTime - this.lastTime < this.config.speed) {
            return;
        }
        this.lastTime = currentTime;
        
        // Draw frame
        this.draw();
    }

    /**
     * Draw a frame
     */
    draw() {
        // Fade previous frame
        this.ctx.fillStyle = this.config.fadeColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set text properties
        this.ctx.fillStyle = this.config.color;
        this.ctx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
        
        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            // Get random character
            const char = this.config.characters.charAt(
                Math.floor(Math.random() * this.config.characters.length)
            );
            
            // Calculate position
            const x = i * this.config.fontSize;
            const y = this.drops[i] * this.config.fontSize;
            
            // Draw character with varying opacity
            const opacity = this.getOpacity(this.drops[i]);
            this.ctx.fillStyle = this.hexToRgba(this.config.color, opacity);
            this.ctx.fillText(char, x, y);
            
            // Move drop down
            if (y > this.canvas.height && Math.random() > this.config.density) {
                // Reset to top
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }

    /**
     * Get opacity based on position
     * @param {number} position - Drop position
     * @returns {number} Opacity value
     */
    getOpacity(position) {
        const screenHeight = this.canvas.height / this.config.fontSize;
        const fadeStart = screenHeight * 0.6;
        
        if (position < 0) return 0;
        if (position < 5) return position / 5;
        if (position > fadeStart) {
            const fadeProgress = (position - fadeStart) / (screenHeight - fadeStart);
            return Math.max(0, 1 - fadeProgress);
        }
        return 1;
    }

    /**
     * Convert hex color to rgba
     * @param {string} hex - Hex color
     * @param {number} alpha - Alpha value
     * @returns {string} RGBA color
     */
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Destroy the effect
     */
    destroy() {
        this.stop();
        window.removeEventListener('resize', () => this.resize());
    }

    /**
     * Set configuration
     * @param {Object} config - Configuration object
     */
    setConfig(config) {
        this.config = { ...this.config, ...config };
    }

    /**
     * Trigger a burst effect
     * @param {number} intensity - Burst intensity (0-1)
     */
    burst(intensity = 0.5) {
        const affectedColumns = Math.floor(this.columns * intensity);
        const startColumn = Math.floor(Math.random() * (this.columns - affectedColumns));
        
        for (let i = startColumn; i < startColumn + affectedColumns; i++) {
            this.drops[i] = 0;
        }
    }

    /**
     * Create a wave effect
     */
    wave() {
        for (let i = 0; i < this.columns; i++) {
            setTimeout(() => {
                this.drops[i] = 0;
            }, i * 10);
        }
    }
}