/**
 * Sidebar Manager - Consolidated
 * Single source of truth for all sidebar toggle functionality
 */

(function() {
    'use strict';
    
    console.log('🔧 Sidebar Manager Consolidated initializing...');
    
    class SidebarManager {
        constructor() {
            this.leftSidebar = null;
            this.rightSidebar = null;
            this.leftToggle = null;
            this.rightToggle = null;
            this.leftToggleFixed = null;
            this.rightToggleFixed = null;
            this.initialized = false;
            
            // Bind methods
            this.toggleLeft = this.toggleLeft.bind(this);
            this.toggleRight = this.toggleRight.bind(this);
            this.updateBodyClasses = this.updateBodyClasses.bind(this);
        }
        
        init() {
            if (this.initialized) return;
            
            // Get DOM elements
            this.leftSidebar = document.getElementById('left-sidebar');
            this.rightSidebar = document.getElementById('right-sidebar');
            this.leftToggle = document.getElementById('left-sidebar-toggle');
            this.rightToggle = document.getElementById('right-sidebar-toggle');
            
            if (!this.leftSidebar || !this.rightSidebar) {
                console.error('❌ Sidebars not found!');
                return;
            }
            
            // Create fixed buttons if they don't exist
            this.createFixedButtons();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initial state update
            this.updateBodyClasses();
            
            // Set up mutation observer
            this.setupObserver();
            
            // Hook into uiManager if available
            this.hookIntoUiManager();
            
            this.initialized = true;
            console.log('✅ Sidebar Manager initialized successfully');
        }
        
        createFixedButtons() {
            // Create left fixed button if not exists
            if (!document.getElementById('left-sidebar-toggle-fixed')) {
                this.leftToggleFixed = document.createElement('button');
                this.leftToggleFixed.id = 'left-sidebar-toggle-fixed';
                this.leftToggleFixed.className = 'sidebar-toggle-fixed';
                this.leftToggleFixed.innerHTML = '☰';
                this.leftToggleFixed.title = 'Tételek megjelenítése';
                document.body.appendChild(this.leftToggleFixed);
            } else {
                this.leftToggleFixed = document.getElementById('left-sidebar-toggle-fixed');
            }
            
            // Create right fixed button if not exists
            if (!document.getElementById('right-sidebar-toggle-fixed')) {
                this.rightToggleFixed = document.createElement('button');
                this.rightToggleFixed.id = 'right-sidebar-toggle-fixed';
                this.rightToggleFixed.className = 'sidebar-toggle-fixed';
                this.rightToggleFixed.innerHTML = '☰';
                this.rightToggleFixed.title = 'Tartalomjegyzék megjelenítése';
                document.body.appendChild(this.rightToggleFixed);
            } else {
                this.rightToggleFixed = document.getElementById('right-sidebar-toggle-fixed');
            }
        }
        
        setupEventListeners() {
            // Header toggle buttons
            if (this.leftToggle) {
                this.leftToggle.addEventListener('click', this.toggleLeft);
            }
            
            if (this.rightToggle) {
                this.rightToggle.addEventListener('click', this.toggleRight);
            }
            
            // Fixed toggle buttons
            if (this.leftToggleFixed) {
                this.leftToggleFixed.addEventListener('click', this.toggleLeft);
            }
            
            if (this.rightToggleFixed) {
                this.rightToggleFixed.addEventListener('click', this.toggleRight);
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
            
            if (!sidebar) return;
            
            // Use uiManager if available, otherwise toggle directly
            if (window.uiManager && typeof window.uiManager.toggleSidebar === 'function') {
                window.uiManager.toggleSidebar(side);
            } else {
                sidebar.classList.toggle('hidden');
                this.updateBodyClasses();
            }
        }
        
        updateBodyClasses() {
            const body = document.body;
            const container = document.getElementById('app-container');
            
            if (!container) return;
            
            // Clear all state classes
            body.classList.remove(
                'left-sidebar-visible', 'left-sidebar-hidden',
                'right-sidebar-visible', 'right-sidebar-hidden',
                'both-sidebars-hidden'
            );
            
            container.classList.remove('left-sidebar-hidden', 'right-sidebar-hidden');
            
            // Check current states
            const leftHidden = this.leftSidebar.classList.contains('hidden');
            const rightHidden = this.rightSidebar.classList.contains('hidden');
            
            // Update classes based on state
            if (leftHidden) {
                body.classList.add('left-sidebar-hidden');
                container.classList.add('left-sidebar-hidden');
            } else {
                body.classList.add('left-sidebar-visible');
            }
            
            if (rightHidden) {
                body.classList.add('right-sidebar-hidden');
                container.classList.add('right-sidebar-hidden');
            } else {
                body.classList.add('right-sidebar-visible');
            }
            
            if (leftHidden && rightHidden) {
                body.classList.add('both-sidebars-hidden');
            }
            
            console.log('📊 Body classes updated:', {
                leftHidden,
                rightHidden,
                bodyClasses: body.className
            });
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
                originalToggleSidebar.call(window.uiManager, side);
                
                // Update our body classes
                this.updateBodyClasses();
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
            
            if (this.leftToggleFixed) {
                this.leftToggleFixed.removeEventListener('click', this.toggleLeft);
            }
            
            if (this.rightToggleFixed) {
                this.rightToggleFixed.removeEventListener('click', this.toggleRight);
            }
            
            this.initialized = false;
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
    
    // Also try after a delay to catch late initialization
    setTimeout(() => sidebarManager.init(), 500);
    
    // Export for debugging
    window.sidebarManager = sidebarManager;
    
})();