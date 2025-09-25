/**
 * Opening Screen Boot Sequence
 * Matrix-style typewriter effects and pill selection
 */

class OpeningScreen {
    constructor() {
        this.currentStep = 0;
        this.isTyping = false;
        this.typewriterSpeed = 50; // milliseconds per character
        
        this.welcomeText = `A neurológia VizsgApp célja, hogy segítsen a neurológia tanulásban. Alapja a neurológia rezidens képzés részvizsga tételsora részletesen kidolgozva, kiegészítve kvízekkel, podcast-okkal és interaktív összefoglalókkal.

Figyelem! A tartalom jelentős része AI segítségével készült, így előfordulhatnak kisebb-nagyobb hibák, pontatlanságok. A project work-in-progress, tervben van a tartalmak kiegészítése, bővítése, pontosítása.

Visszajelzés, ötlet, egyebek terén információt a kapcsolat menüpontban találsz.

Jó tanulást, sok sikert!`;

        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startBootSequence();
    }
    
    bindEvents() {
        const bluePill = document.getElementById('blue-pill');
        const redPill = document.getElementById('red-pill');
        const skipButton = document.getElementById('skip-button');
        
        if (bluePill) {
            bluePill.addEventListener('click', () => this.handleBluePill());
        }
        
        if (redPill) {
            redPill.addEventListener('click', () => this.handleRedPill());
        }
        
        if (skipButton) {
            skipButton.addEventListener('click', () => this.handleSkip());
        }
        
        // Allow Enter key to select red pill (enter the app)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isTyping) {
                this.handleRedPill();
            } else if (e.key === 'Escape') {
                this.handleSkip();
            }
        });
    }
    
    async startBootSequence() {
        // Step 1: Wait for matrix rain to be visible
        await this.delay(2000);
        
        // Step 2: Show and type the main title
        await this.showTitle();
        
        // Step 3: Show and type welcome text
        await this.showWelcomeText();
        
        // Step 4: Show pill selection
        await this.showPillSelection();
        
        // Step 5: Show footer
        await this.showFooter();
    }
    
    async showTitle() {
        const titleElement = document.getElementById('main-title');
        const titleTextElement = document.getElementById('title-text');
        const titleCursor = document.getElementById('title-cursor');
        const titleText = 'NEUROLÓGIA VIZSGAPP';
        
        if (!titleElement || !titleTextElement) return;
        
        // Show title container
        titleElement.classList.remove('hidden');
        
        // Type out the title
        await this.typeText(titleTextElement, titleText, this.typewriterSpeed);
        
        // Hide title cursor after typing
        if (titleCursor) {
            titleCursor.style.display = 'none';
        }
        
        // Wait a moment before continuing
        await this.delay(1000);
    }
    
    async showWelcomeText() {
        const welcomeContainer = document.getElementById('welcome-container');
        const welcomeTextElement = document.getElementById('welcome-text');
        const welcomeCursor = document.getElementById('welcome-cursor');
        
        if (!welcomeContainer || !welcomeTextElement) return;
        
        // Show welcome container and cursor
        welcomeContainer.classList.remove('hidden');
        welcomeContainer.classList.add('visible');
        if (welcomeCursor) {
            welcomeCursor.classList.remove('hidden');
        }
        
        // Type out the welcome text (clear existing content first)
        welcomeTextElement.innerHTML = '';
        await this.typeText(welcomeTextElement, this.welcomeText, this.typewriterSpeed * 0.7, true);
        
        // Hide welcome cursor after typing
        if (welcomeCursor) {
            welcomeCursor.style.display = 'none';
        }
        
        // Wait before showing pills
        await this.delay(1500);
    }
    
    async showPillSelection() {
        const pillSelection = document.getElementById('pill-selection');
        
        if (!pillSelection) return;
        
        pillSelection.classList.remove('hidden');
        pillSelection.classList.add('visible');
        
        // Add subtle animation delay between pills
        const bluePill = document.getElementById('blue-pill');
        const redPill = document.getElementById('red-pill');
        
        if (bluePill) {
            bluePill.style.animation = 'fadeIn 1s ease-in-out 0.3s both';
        }
        if (redPill) {
            redPill.style.animation = 'fadeIn 1s ease-in-out 0.6s both';
        }
        
        await this.delay(1000);
    }
    
    async showFooter() {
        // Footer is already visible from the beginning, no need to show it
        return;
    }
    
    async typeText(element, text, speed = 50, preserveNewlines = false) {
        if (!element) return;
        
        this.isTyping = true;
        const cursor = element.nextElementSibling;
        
        // Clear existing content but keep the cursor separate
        if (element.id === 'welcome-text') {
            element.innerHTML = '';
        } else {
            element.textContent = '';
        }
        
        // Process text for newlines if needed
        const processedText = preserveNewlines ? text : text.replace(/\n/g, ' ');
        
        for (let i = 0; i < processedText.length; i++) {
            const char = processedText[i];
            
            if (preserveNewlines && char === '\n') {
                element.innerHTML += '<br>';
            } else {
                if (element.id === 'welcome-text') {
                    element.innerHTML += char;
                } else {
                    element.textContent += char;
                }
            }
            
            // Scroll to keep text visible if needed
            if (element.scrollTop !== undefined) {
                element.scrollTop = element.scrollHeight;
            }
            
            // Variable speed for more natural typing
            const currentSpeed = speed + (Math.random() * 20 - 10);
            await this.delay(Math.max(20, currentSpeed));
        }
        
        this.isTyping = false;
    }
    
    handleBluePill() {
        // Create exit effect
        this.createExitEffect();
        
        // Close window or go back after animation
        setTimeout(() => {
            // Try to close window, fallback to going back
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.close();
            }
        }, 1500);
    }
    
    handleRedPill() {
        // Create enter effect
        this.createEnterEffect();
        
        // Navigate to main app after animation
        setTimeout(() => {
            window.location.href = 'main-app.html';
        }, 2000);
    }
    
    handleSkip() {
        // Skip all animations and go directly to app
        window.location.href = 'main-app.html';
    }
    
    createExitEffect() {
        const container = document.getElementById('opening-container');
        if (!container) return;
        
        // Add dissolve effect
        container.style.transition = 'all 1.5s ease-in-out';
        container.style.opacity = '0';
        container.style.filter = 'blur(10px)';
        container.style.transform = 'scale(0.8)';
        
        // Show exit message
        const exitMessage = document.createElement('div');
        exitMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.5rem;
            color: #0074d9;
            text-shadow: 0 0 20px #0074d9;
            z-index: 1000;
            animation: fadeIn 1s ease-in-out;
        `;
        exitMessage.textContent = 'Visszatérés a valóságba...';
        document.body.appendChild(exitMessage);
    }
    
    createEnterEffect() {
        const container = document.getElementById('opening-container');
        if (!container) return;
        
        // Create hyperspace tunnel animation
        this.createHyperspaceTunnel();
        
        // Add matrix-style entrance effect
        container.style.transition = 'all 3s ease-in-out';
        container.style.opacity = '0';
        container.style.filter = 'brightness(2) blur(5px)';
        
        // Show enter message with proper centering
        const enterMessage = document.createElement('div');
        enterMessage.className = 'rabbit-hole-message';
        enterMessage.textContent = 'Entering the rabbit hole...';
        document.body.appendChild(enterMessage);
        
        // Animate the message
        setTimeout(() => {
            enterMessage.style.opacity = '1';
            enterMessage.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 500);
        
        // Intensify matrix rain
        if (window.matrixRain) {
            const canvas = window.matrixRain.canvas;
            canvas.style.transition = 'opacity 3s ease-in-out';
            canvas.style.opacity = '1';
        }
    }
    
    createHyperspaceTunnel() {
        // Create hyperspace tunnel canvas
        const tunnelCanvas = document.createElement('canvas');
        tunnelCanvas.id = 'hyperspace-tunnel';
        tunnelCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            background: #000;
        `;
        document.body.appendChild(tunnelCanvas);
        
        const ctx = tunnelCanvas.getContext('2d');
        tunnelCanvas.width = window.innerWidth;
        tunnelCanvas.height = window.innerHeight;
        
        // Tunnel animation variables
        const centerX = tunnelCanvas.width / 2;
        const centerY = tunnelCanvas.height / 2;
        const maxRadius = Math.max(tunnelCanvas.width, tunnelCanvas.height);
        let time = 0;
        const speed = 0.1;
        const numRings = 30;
        
        // Create tunnel effect
        const animateTunnel = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, tunnelCanvas.width, tunnelCanvas.height);
            
            // Draw expanding rings
            for (let i = 0; i < numRings; i++) {
                const ringTime = time + (i * 0.3);
                const radius = ((ringTime * 200) % maxRadius) + 50;
                const opacity = Math.max(0, 1 - (radius / maxRadius));
                
                // Create gradient ring
                const gradient = ctx.createRadialGradient(centerX, centerY, radius - 10, centerX, centerY, radius + 10);
                gradient.addColorStop(0, `rgba(0, 255, 0, 0)`);
                gradient.addColorStop(0.5, `rgba(0, 255, 0, ${opacity * 0.8})`);
                gradient.addColorStop(1, `rgba(0, 255, 0, 0)`);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
                
                // Add some sparkles
                if (i % 3 === 0) {
                    const sparkleCount = 8;
                    for (let j = 0; j < sparkleCount; j++) {
                        const angle = (j / sparkleCount) * Math.PI * 2 + ringTime;
                        const sparkleX = centerX + Math.cos(angle) * radius;
                        const sparkleY = centerY + Math.sin(angle) * radius;
                        
                        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
                        ctx.fillRect(sparkleX - 1, sparkleY - 1, 2, 2);
                    }
                }
            }
            
            time += speed;
            
            // Stop animation after 3 seconds
            if (time < 15) {
                requestAnimationFrame(animateTunnel);
            } else {
                // Fade out tunnel
                tunnelCanvas.style.transition = 'opacity 1s ease-out';
                tunnelCanvas.style.opacity = '0';
                setTimeout(() => {
                    if (tunnelCanvas.parentNode) {
                        tunnelCanvas.parentNode.removeChild(tunnelCanvas);
                    }
                }, 1000);
            }
        };
        
        animateTunnel();
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.openingScreen = new OpeningScreen();
});