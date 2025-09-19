/**
 * Sidebar Manager - Optimized Version
 * Smooth animations with proper event handling
 * No duplicate buttons, no conflicts
 */

(function() {
    'use strict';
    
    // Singleton check
    if (window.sidebarManagerOptimized) {
        console.log('Sidebar Manager already initialized');
        return;
    }
    
    console.log('🚀 Optimized Sidebar Manager initializing...');
    
    class SidebarManagerOptimized {
        constructor() {
            // Cache DOM references
            this.elements = {
                leftSidebar: null,
                rightSidebar: null,
                leftToggle: null,
                rightToggle: null,
                body: document.body,
                container: null
            };
            
            // State
            this.state = {
                animating: false,
                leftCollapsed: false,
                rightCollapsed: false
            };
            
            // Configuration
            this.config = {
                animationDuration: 1500, // 1.5s to match CSS animations
                laserDuration: 1500,     // Match CSS laser animation duration
                debounceDelay: 50
            };
            
            // Bind methods
            this.toggleLeft = this.toggleLeft.bind(this);
            this.toggleRight = this.toggleRight.bind(this);
            this.handleToggle = this.handleToggle.bind(this);
        }
        
        init() {
            // Cache all DOM elements
            this.cacheElements();
            
            if (!this.validateElements()) {
                console.error('❌ Required elements not found');
                return false;
            }
            
            // Set initial state
            this.loadState();
            
            // Setup event listeners with delegation
            this.setupEventListeners();
            
            // Setup mutation observer for state changes
            this.setupObserver();
            
            // Mark as initialized
            window.sidebarManagerOptimized = this;
            
            console.log('✅ Sidebar Manager initialized');
            return true;
        }
        
        cacheElements() {
            this.elements.leftSidebar = document.getElementById('left-sidebar');
            this.elements.rightSidebar = document.getElementById('right-sidebar');
            this.elements.leftToggle = document.getElementById('left-sidebar-toggle');
            this.elements.rightToggle = document.getElementById('right-sidebar-toggle');
            this.elements.container = document.getElementById('app-container');
        }
        
        validateElements() {
            return !!(
                this.elements.leftSidebar && 
                this.elements.rightSidebar && 
                this.elements.leftToggle && 
                this.elements.rightToggle &&
                this.elements.container
            );
        }
        
        loadState() {
            // Load from localStorage or check current DOM state
            this.state.leftCollapsed = 
                this.elements.leftSidebar.classList.contains('collapsed') ||
                this.elements.leftSidebar.classList.contains('hidden');
            
            this.state.rightCollapsed = 
                this.elements.rightSidebar.classList.contains('collapsed') ||
                this.elements.rightSidebar.classList.contains('hidden');
            
            this.updateUI();
        }
        
        setupEventListeners() {
            // Use single event listener with delegation for better performance
            document.addEventListener('click', (e) => {
                // Check if clicked element is a toggle button
                if (e.target === this.elements.leftToggle || 
                    e.target.closest('#left-sidebar-toggle')) {
                    e.preventDefault();
                    this.handleToggle('left');
                } else if (e.target === this.elements.rightToggle || 
                           e.target.closest('#right-sidebar-toggle')) {
                    e.preventDefault();
                    this.handleToggle('right');
                }
            });
            
            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey) {
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.handleToggle('left');
                    } else if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.handleToggle('right');
                    }
                }
            });
        }
        
        setupObserver() {
            // Watch for external changes to sidebar classes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && 
                        mutation.attributeName === 'class') {
                        this.loadState();
                    }
                });
            });
            
            const config = { 
                attributes: true, 
                attributeFilter: ['class'] 
            };
            
            observer.observe(this.elements.leftSidebar, config);
            observer.observe(this.elements.rightSidebar, config);
            
            // Store observer for cleanup
            this.observer = observer;
        }
        
        handleToggle(side) {
            // Debounce rapid clicks
            if (this.state.animating) {
                console.log('Animation in progress, ignoring toggle');
                return;
            }
            
            // Set animating flag
            this.state.animating = true;
            
            // Perform toggle
            if (side === 'left') {
                this.toggleLeft();
            } else {
                this.toggleRight();
            }
            
            // Clear animating flag after animation completes
            setTimeout(() => {
                this.state.animating = false;
            }, this.config.animationDuration);
        }
        
        toggleLeft() {
            console.log('Toggling left sidebar');
            this.animateSidebar('left');
        }
        
        toggleRight() {
            console.log('Toggling right sidebar');
            this.animateSidebar('right');
        }
        
        animateSidebar(side) {
            const sidebar = side === 'left' ? 
                this.elements.leftSidebar : 
                this.elements.rightSidebar;
            
            const isCollapsed = side === 'left' ? 
                this.state.leftCollapsed : 
                this.state.rightCollapsed;
            
            // Add animation class
            sidebar.classList.add('animating');
            
            // Trigger laser effect
            this.triggerLaserEffect(sidebar);
            
            // Toggle state
            if (isCollapsed) {
                this.expandSidebar(side);
            } else {
                this.collapseSidebar(side);
            }
            
            // Remove animation class after completion
            setTimeout(() => {
                sidebar.classList.remove('animating');
            }, this.config.animationDuration);
            
            // Update UI
            this.updateUI();
            
            // Save state
            this.saveState();
        }
        
        triggerLaserEffect(sidebar) {
            const shineEffect = sidebar.querySelector('.shine-effect');
            if (!shineEffect) return;
            
            // Reset animation by forcing reflow
            shineEffect.style.animation = 'none';
            void shineEffect.offsetWidth; // Force reflow
            shineEffect.style.animation = ''; // Let CSS take over
            
            // The parent .animating class will trigger the CSS animation
            // No need to add .active class since CSS uses .animating .shine-effect
        }
        
        expandSidebar(side) {
            const sidebar = side === 'left' ? 
                this.elements.leftSidebar : 
                this.elements.rightSidebar;
            
            // Update state
            if (side === 'left') {
                this.state.leftCollapsed = false;
            } else {
                this.state.rightCollapsed = false;
            }
            
            // Remove collapsed classes
            sidebar.classList.remove('collapsed', 'hidden');
            
            // Dispatch event
            this.dispatchSidebarEvent('expand', side);
        }
        
        collapseSidebar(side) {
            const sidebar = side === 'left' ? 
                this.elements.leftSidebar : 
                this.elements.rightSidebar;
            
            // Update state
            if (side === 'left') {
                this.state.leftCollapsed = true;
            } else {
                this.state.rightCollapsed = true;
            }
            
            // Add collapsed class
            sidebar.classList.add('collapsed');
            
            // Keep hidden class for compatibility
            setTimeout(() => {
                sidebar.classList.add('hidden');
            }, 50);
            
            // Dispatch event
            this.dispatchSidebarEvent('collapse', side);
        }
        
        updateUI() {
            // Update button icons
            this.updateButtonIcon('left');
            this.updateButtonIcon('right');
            
            // Update body classes
            this.updateBodyClasses();
        }
        
        updateButtonIcon(side) {
            const button = side === 'left' ? 
                this.elements.leftToggle : 
                this.elements.rightToggle;
            
            const isCollapsed = side === 'left' ? 
                this.state.leftCollapsed : 
                this.state.rightCollapsed;
            
            if (!button) return;
            
            // Update icon based on state
            if (side === 'left') {
                button.textContent = isCollapsed ? '▶' : '◀';
                button.title = isCollapsed ? 'Tételek megjelenítése' : 'Összecsukás';
            } else {
                button.textContent = isCollapsed ? '◀' : '▶';
                button.title = isCollapsed ? 'Tartalomjegyzék megjelenítése' : 'Összecsukás';
            }
        }
        
        updateBodyClasses() {
            const body = this.elements.body;
            const container = this.elements.container;
            
            // Remove all state classes
            const stateClasses = [
                'left-sidebar-visible', 'left-sidebar-hidden', 'left-sidebar-collapsed',
                'right-sidebar-visible', 'right-sidebar-hidden', 'right-sidebar-collapsed',
                'both-sidebars-hidden', 'both-sidebars-collapsed'
            ];
            
            stateClasses.forEach(cls => {
                body.classList.remove(cls);
                container.classList.remove(cls);
            });
            
            // Add appropriate classes based on state
            if (this.state.leftCollapsed) {
                body.classList.add('left-sidebar-hidden', 'left-sidebar-collapsed');
                container.classList.add('left-sidebar-collapsed');
            } else {
                body.classList.add('left-sidebar-visible');
            }
            
            if (this.state.rightCollapsed) {
                body.classList.add('right-sidebar-hidden', 'right-sidebar-collapsed');
                container.classList.add('right-sidebar-collapsed');
            } else {
                body.classList.add('right-sidebar-visible');
            }
            
            if (this.state.leftCollapsed && this.state.rightCollapsed) {
                body.classList.add('both-sidebars-hidden', 'both-sidebars-collapsed');
            }
        }
        
        saveState() {
            // Save to localStorage
            try {
                localStorage.setItem('sidebarState', JSON.stringify({
                    leftCollapsed: this.state.leftCollapsed,
                    rightCollapsed: this.state.rightCollapsed
                }));
            } catch (e) {
                console.warn('Failed to save sidebar state:', e);
            }
        }
        
        dispatchSidebarEvent(action, side) {
            // Dispatch custom event for other components
            const event = new CustomEvent('sidebarToggle', {
                detail: { action, side },
                bubbles: true
            });
            
            document.dispatchEvent(event);
        }
        
        // Public API
        getState() {
            return { ...this.state };
        }
        
        // Cleanup
        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
            
            window.sidebarManagerOptimized = null;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new SidebarManagerOptimized().init();
        });
    } else {
        new SidebarManagerOptimized().init();
    }
    
})();