/**
 * Laser Animation Controller
 * Synchronizes laser scanning with sidebar animations
 */

(function() {
    'use strict';
    
    console.log('🔦 Laser Animation Controller initializing...');
    
    // Configuration matching CSS
    const CONFIG = {
        laserScanDuration: 2000, // 2 seconds
        sidebarAnimationDuration: 1200, // 1.2 seconds
        cleanupDelay: 100 // Small delay after animation
    };
    
    // Wait for sidebar manager to be ready
    function waitForSidebarManager(callback) {
        if (window.sidebarManagerOptimized) {
            callback();
        } else {
            setTimeout(() => waitForSidebarManager(callback), 50);
        }
    }
    
    waitForSidebarManager(() => {
        console.log('✅ Enhancing sidebar manager with laser controller...');
        
        // Store original methods
        const originalAnimateSidebar = window.sidebarManagerOptimized.animateSidebar;
        const originalTriggerLaser = window.sidebarManagerOptimized.triggerLaserEffect;
        
        // Enhanced animate sidebar method
        window.sidebarManagerOptimized.animateSidebar = function(side) {
            const sidebar = side === 'left' ? 
                this.elements.leftSidebar : 
                this.elements.rightSidebar;
            
            if (!sidebar) return;
            
            // Add animating class
            sidebar.classList.add('animating');
            
            // Trigger the enhanced laser effect
            this.triggerLaserEffect(sidebar);
            
            // Call original animation logic
            if (originalAnimateSidebar) {
                originalAnimateSidebar.call(this, side);
            }
            
            // Clean up animating class after laser scan completes
            setTimeout(() => {
                sidebar.classList.remove('animating');
            }, CONFIG.laserScanDuration + CONFIG.cleanupDelay);
        };
        
        // Enhanced laser trigger method
        window.sidebarManagerOptimized.triggerLaserEffect = function(sidebar) {
            const shineEffect = sidebar.querySelector('.shine-effect');
            if (!shineEffect) {
                console.warn('Shine effect element not found');
                return;
            }
            
            // Ensure laser is properly positioned
            const sidebarRect = sidebar.getBoundingClientRect();
            console.log(`Triggering laser scan for sidebar height: ${sidebarRect.height}px`);
            
            // Force animation restart
            shineEffect.style.animation = 'none';
            shineEffect.offsetHeight; // Force reflow
            shineEffect.style.animation = ''; // Let CSS take over
            
            // Optional: Add custom properties for dynamic sizing
            sidebar.style.setProperty('--sidebar-height', `${sidebarRect.height}px`);
        };
        
        // Update animation duration in config
        window.sidebarManagerOptimized.config.animationDuration = CONFIG.sidebarAnimationDuration;
        window.sidebarManagerOptimized.config.laserDuration = CONFIG.laserScanDuration;
        
        console.log('✅ Laser animation controller ready');
        
        // Optional: Add visual feedback for testing
        if (window.location.hash === '#debug-laser') {
            addDebugControls();
        }
    });
    
    // Debug controls for testing
    function addDebugControls() {
        const debugDiv = document.createElement('div');
        debugDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff41;
            padding: 15px;
            color: #00ff41;
            font-family: monospace;
            z-index: 10000;
        `;
        
        debugDiv.innerHTML = `
            <h4 style="margin: 0 0 10px;">Laser Debug</h4>
            <button onclick="window.sidebarManagerOptimized.handleToggle('left')" style="
                background: transparent;
                border: 1px solid #00ff41;
                color: #00ff41;
                padding: 5px 10px;
                cursor: pointer;
                margin-right: 5px;
            ">Toggle Left</button>
            <button onclick="window.sidebarManagerOptimized.handleToggle('right')" style="
                background: transparent;
                border: 1px solid #00ff41;
                color: #00ff41;
                padding: 5px 10px;
                cursor: pointer;
            ">Toggle Right</button>
        `;
        
        document.body.appendChild(debugDiv);
        console.log('Debug controls added. Remove #debug-laser from URL to hide.');
    }
})();