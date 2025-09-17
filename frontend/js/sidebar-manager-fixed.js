/**
 * Sidebar Manager - Fixed Version
 * Handles all sidebar functionality without duplicates
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.sidebarManagerInitialized) {
        console.log('Sidebar Manager already initialized');
        return;
    }
    
    console.log('🔧 Sidebar Manager Fixed initializing...');
    
    class SidebarManager {
        constructor() {
            this.leftSidebar = null;
            this.rightSidebar = null;
            this.leftToggle = null;
            this.rightToggle = null;
            this.initialized = false;
            
            // Bind methods
            this.toggleLeft = this.toggleLeft.bind(this);
            this.toggleRight = this.toggleRight.bind(this);
            this.updateBodyClasses = this.updateBodyClasses.bind(this);
        }
        
        init() {
            if (this.initialized) return;
            
            // Clean up any existing fixed buttons first
            this.cleanupFixedButtons();
            
            // Get DOM elements
            this.leftSidebar = document.getElementById('left-sidebar');
            this.rightSidebar = document.getElementById('right-sidebar');
            this.leftToggle = document.getElementById('left-sidebar-toggle');
            this.rightToggle = document.getElementById('right-sidebar-toggle');
            
            if (!this.leftSidebar || !this.rightSidebar) {
                console.error('❌ Sidebars not found!');
                return;
            }
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initial state update
            this.updateBodyClasses();
            this.updateButtonStates();
            
            // Set up mutation observer
            this.setupObserver();
            
            // Hook into uiManager if available
            this.hookIntoUiManager();
            
            this.initialized = true;
            window.sidebarManagerInitialized = true;
            console.log('✅ Sidebar Manager initialized successfully');
        }
        
        cleanupFixedButtons() {
            // Remove any existing fixed buttons
            const existingFixed = document.querySelectorAll('.sidebar-toggle-fixed');
            existingFixed.forEach(btn => btn.remove());
        }
        
        setupEventListeners() {
            // Header toggle buttons
            if (this.leftToggle) {
                // Remove any existing listeners
                this.leftToggle.replaceWith(this.leftToggle.cloneNode(true));
                this.leftToggle = document.getElementById('left-sidebar-toggle');
                this.leftToggle.addEventListener('click', this.toggleLeft);
            }
            
            if (this.rightToggle) {
                // Remove any existing listeners
                this.rightToggle.replaceWith(this.rightToggle.cloneNode(true));
                this.rightToggle = document.getElementById('right-sidebar-toggle');
                this.rightToggle.addEventListener('click', this.toggleRight);
            }
        }
        
        setupObserver() {
            // Watch for class changes on sidebars
            const observer = new MutationObserver(() => {
                this.updateBodyClasses();
            });
            
            const config = { attributes: true, attributeFilter: ['class'] };
            
            observer.observe(this.leftSidebar, config);
            observer.observe(this.rightSidebar, config);
        }
        
        toggleLeft(event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            
            console.log('Toggling left sidebar');
            this.toggleSidebar('left');
        }
        
        toggleRight(event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            
            console.log('Toggling right sidebar');
            this.toggleSidebar('right');
        }
        
        toggleSidebar(side) {
            const sidebar = side === 'left' ? this.leftSidebar : this.rightSidebar;
            const button = side === 'left' ? this.leftToggle : this.rightToggle;
            
            if (!sidebar) return;
            
            // Trigger laser animation
            const shineEffect = sidebar.querySelector('.shine-effect');
            if (shineEffect) {
                shineEffect.classList.add('active');
                setTimeout(() => {
                    shineEffect.classList.remove('active');
                }, 1200); // Match animation duration
            }
            
            // Use uiManager if available, otherwise toggle directly
            if (window.uiManager && typeof window.uiManager.toggleSidebar === 'function') {
                window.uiManager.toggleSidebar(side);
            } else {
                // Toggle between collapsed and expanded states
                sidebar.classList.toggle('collapsed');
                // Also toggle hidden for backward compatibility
                if (sidebar.classList.contains('collapsed')) {
                    sidebar.classList.add('hidden');
                } else {
                    sidebar.classList.remove('hidden');
                }
                this.updateBodyClasses();
            }
            
            // Update button state
            this.updateButtonStates();
        }
        
        updateBodyClasses() {
            const body = document.body;
            const container = document.getElementById('app-container');
            
            if (!container) return;
            
            // Clear all state classes
            body.classList.remove(
                'left-sidebar-visible', 'left-sidebar-hidden', 'left-sidebar-collapsed',
                'right-sidebar-visible', 'right-sidebar-hidden', 'right-sidebar-collapsed',
                'both-sidebars-hidden', 'both-sidebars-collapsed'
            );
            
            container.classList.remove('left-sidebar-hidden', 'right-sidebar-hidden', 
                                       'left-sidebar-collapsed', 'right-sidebar-collapsed');
            
            // Check current states
            const leftHidden = this.leftSidebar.classList.contains('hidden');
            const leftCollapsed = this.leftSidebar.classList.contains('collapsed');
            const rightHidden = this.rightSidebar.classList.contains('hidden');
            const rightCollapsed = this.rightSidebar.classList.contains('collapsed');
            
            // Update classes based on state
            if (leftHidden || leftCollapsed) {
                body.classList.add('left-sidebar-hidden');
                container.classList.add('left-sidebar-hidden');
                if (leftCollapsed) {
                    body.classList.add('left-sidebar-collapsed');
                    container.classList.add('left-sidebar-collapsed');
                }
            } else {
                body.classList.add('left-sidebar-visible');
            }
            
            if (rightHidden || rightCollapsed) {
                body.classList.add('right-sidebar-hidden');
                container.classList.add('right-sidebar-hidden');
                if (rightCollapsed) {
                    body.classList.add('right-sidebar-collapsed');
                    container.classList.add('right-sidebar-collapsed');
                }
            } else {
                body.classList.add('right-sidebar-visible');
            }
            
            if ((leftHidden || leftCollapsed) && (rightHidden || rightCollapsed)) {
                body.classList.add('both-sidebars-hidden');
                if (leftCollapsed && rightCollapsed) {
                    body.classList.add('both-sidebars-collapsed');
                }
            }
            
            console.log('📊 Body classes updated:', {
                leftHidden,
                leftCollapsed,
                rightHidden,
                rightCollapsed
            });
        }
        
        updateButtonStates() {
            // Update button icons based on current sidebar states
            if (this.leftToggle && this.leftSidebar) {
                const leftHidden = this.leftSidebar.classList.contains('hidden') || 
                                   this.leftSidebar.classList.contains('collapsed');
                this.leftToggle.textContent = leftHidden ? '▶' : '◀';
                this.leftToggle.title = leftHidden ? 'Tételek megjelenítése' : 'Összecsukás';
            }
            
            if (this.rightToggle && this.rightSidebar) {
                const rightHidden = this.rightSidebar.classList.contains('hidden') || 
                                    this.rightSidebar.classList.contains('collapsed');
                this.rightToggle.textContent = rightHidden ? '◀' : '▶';
                this.rightToggle.title = rightHidden ? 'Tartalomjegyzék megjelenítése' : 'Összecsukás';
            }
        }
        
        hookIntoUiManager() {
            if (!window.uiManager) {
                // Try again after a delay
                setTimeout(() => this.hookIntoUiManager(), 500);
                return;
            }
            
            // Store original function
            const originalToggleSidebar = window.uiManager.toggleSidebar;
            
            // Override with enhanced version
            window.uiManager.toggleSidebar = (side) => {
                console.log(`🔄 Enhanced toggle for ${side} sidebar`);
                
                // Call original
                if (originalToggleSidebar) {
                    originalToggleSidebar.call(window.uiManager, side);
                }
                
                // Update our body classes
                this.updateBodyClasses();
                this.updateButtonStates();
            };
            
            console.log('✅ Hooked into uiManager');
        }
        
        destroy() {
            // Remove event listeners
            if (this.leftToggle) {
                this.leftToggle.removeEventListener('click', this.toggleLeft);
            }
            
            if (this.rightToggle) {
                this.rightToggle.removeEventListener('click', this.toggleRight);
            }
            
            // Clean up fixed buttons
            this.cleanupFixedButtons();
            
            this.initialized = false;
            window.sidebarManagerInitialized = false;
        }
    }
    
    // Create singleton instance
    const sidebarManager = new SidebarManager();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => sidebarManager.init());
    } else {
        sidebarManager.init();
    }
    
    // Export for debugging
    window.sidebarManager = sidebarManager;
    
})();