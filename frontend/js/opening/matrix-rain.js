/**
 * Matrix Rain Effect for Opening Screen
 * Creates the iconic falling Matrix code effect
 */

class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.columns = [];
        this.columnCount = 0;
        this.animationId = null;
        
        // Matrix characters (mix of katakana, numbers, and symbols)
        this.characters = [
            'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
            'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
            'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
            'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ',
            'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン', '0', '1', '2', '3', '4',
            '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ':', '.', '"', '=', '*',
            '+', '-', '<', '>', '¦', '|', 'ç', 'ë'
        ];
        
        this.fontSize = 16;
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.initColumns();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columnCount = Math.floor(this.canvas.width / this.fontSize);
    }
    
    handleResize() {
        this.resizeCanvas();
        this.initColumns();
    }
    
    initColumns() {
        this.columns = [];
        for (let i = 0; i < this.columnCount; i++) {
            this.columns[i] = {
                chars: [],
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 2,
                opacity: Math.random() * 0.5 + 0.3
            };
        }
    }
    
    getRandomChar() {
        return this.characters[Math.floor(Math.random() * this.characters.length)];
    }
    
    draw() {
        // Create trailing effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
        
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];
            const x = i * this.fontSize;
            
            // Add new character at the top of the column
            if (Math.random() < 0.02) {
                column.chars.unshift({
                    char: this.getRandomChar(),
                    opacity: 1,
                    age: 0
                });
            }
            
            // Update and draw characters
            for (let j = 0; j < column.chars.length; j++) {
                const charData = column.chars[j];
                const y = column.y + (j * this.fontSize);
                
                // Calculate opacity based on position and age
                let opacity = 1 - (j * 0.05) - (charData.age * 0.01);
                opacity = Math.max(0, Math.min(1, opacity));
                
                // Brighten the leading character
                if (j === 0) {
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                } else if (j < 3) {
                    this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                } else {
                    this.ctx.fillStyle = `rgba(0, ${Math.floor(200 * opacity)}, 0, ${opacity})`;
                }
                
                // Occasionally change character to create glitch effect
                if (Math.random() < 0.01) {
                    charData.char = this.getRandomChar();
                }
                
                this.ctx.fillText(charData.char, x, y);
                charData.age++;
            }
            
            // Move column down
            column.y += column.speed;
            
            // Remove characters that are too old or off-screen
            column.chars = column.chars.filter((charData, index) => {
                const y = column.y + (index * this.fontSize);
                return y < this.canvas.height + 100 && charData.age < 50;
            });
            
            // Reset column when it goes off screen
            if (column.y > this.canvas.height && column.chars.length === 0) {
                column.y = -Math.random() * this.canvas.height;
                column.speed = Math.random() * 3 + 2;
            }
        }
    }
    
    start() {
        const animate = () => {
            this.draw();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    destroy() {
        this.stop();
        window.removeEventListener('resize', this.handleResize);
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