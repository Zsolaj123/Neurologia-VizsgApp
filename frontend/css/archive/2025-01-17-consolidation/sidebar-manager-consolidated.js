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
            this.updateButtonStates();
            
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
                this.leftToggleFixed.innerHTML = '▶';
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
                this.rightToggleFixed.innerHTML = '◀';
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
                sidebar.classList.toggle('hidden'); // Keep for backward compatibility
                this.updateBodyClasses();
            }
            
            // Update button icon based on visibility
            if (button) {
                const isCollapsed = sidebar.classList.contains('collapsed') || sidebar.classList.contains('hidden');
                if (side === 'left') {
                    button.textContent = isCollapsed ? '▶' : '◀';
                } else {
                    button.textContent = isCollapsed ? '◀' : '▶';
                }
                
                // Add rotation animation
                button.style.transition = 'transform 0.3s ease';
                button.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    button.style.transform = 'rotate(0deg)';
                }, 300);
            }
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
                rightHidden,
                bodyClasses: body.className
            });
            
            // Update button states when body classes change
            this.updateButtonStates();
        }
        
        updateButtonStates() {
            // Update button icons based on current sidebar states
            if (this.leftToggle && this.leftSidebar) {
                const leftHidden = this.leftSidebar.classList.contains('hidden') || 
                                   this.leftSidebar.classList.contains('collapsed');
                this.leftToggle.textContent = leftHidden ? '▶' : '◀';
            }
            
            if (this.rightToggle && this.rightSidebar) {
                const rightHidden = this.rightSidebar.classList.contains('hidden') || 
                                    this.rightSidebar.classList.contains('collapsed');
                this.rightToggle.textContent = rightHidden ? '◀' : '▶';
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