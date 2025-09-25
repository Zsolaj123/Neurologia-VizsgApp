/**
 * Matrix Rain Effect
 * Creates the iconic Matrix digital rain background effect
 */

class MatrixRain {
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
        for (let x = 0; x < this.columns; x++) {
            this.drops[x] = Math.random() * this.canvas.height;
        }
    }

    /**
     * Get random character
     */
    getRandomChar() {
        const chars = this.config.characters;
        return chars[Math.floor(Math.random() * chars.length)];
    }

    /**
     * Draw single frame
     */
    draw(currentTime) {
        // Control frame rate
        if (currentTime - this.lastTime < this.config.speed) {
            return;
        }
        this.lastTime = currentTime;

        // Fade previous frame
        this.ctx.fillStyle = this.config.fadeColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Set font and text color
        this.ctx.fillStyle = this.config.color;
        this.ctx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;

        // Draw drops
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const text = this.getRandomChar();
            
            // Calculate position
            const x = i * this.config.fontSize;
            const y = this.drops[i] * this.config.fontSize;

            // Draw character
            this.ctx.fillText(text, x, y);

            // Reset drop if it goes off screen or randomly
            if (y > this.canvas.height && Math.random() > this.config.density) {
                this.drops[i] = 0;
            }

            // Move drop down
            this.drops[i]++;
        }
    }

    /**
     * Start animation
     */
    start() {
        if (this.animationId) {
            return; // Already running
        }

        const animate = (currentTime) => {
            this.draw(currentTime);
            this.animationId = requestAnimationFrame(animate);
        };

        this.animationId = requestAnimationFrame(animate);
    }

    /**
     * Stop animation
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Destroy effect
     */
    destroy() {
        this.stop();
        window.removeEventListener('resize', this.resize);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-rain');
    if (canvas) {
        window.matrixRain = new MatrixRain(canvas);
        // Start matrix rain immediately
        window.matrixRain.start();
    }
});