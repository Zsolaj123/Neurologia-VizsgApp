/**
 * Consolidated Animation Controller
 * Single source for all animation logic
 */

(function() {
    'use strict';
    
    console.log('🎯 Consolidated Animation Controller loading...');
    
    // Configuration - matches CSS exactly
    const TIMING = {
        sidebarDuration: 800,  // 0.8s in ms
        laserDuration: 800,    // Must match sidebar
        debounceDelay: 30,     // TOC scroll debounce
        cleanupDelay: 50       // Small buffer after animation
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        setupSidebarAnimation();
        setupTOCHighlighting();
        console.log('✅ Animations consolidated and ready');
    }
    
    // ============================================
    // SIDEBAR & LASER ANIMATION
    // ============================================
    
    function setupSidebarAnimation() {
        // Wait for sidebar manager
        if (!window.sidebarManagerOptimized) {
            setTimeout(setupSidebarAnimation, 50);
            return;
        }
        
        // Update timing config
        window.sidebarManagerOptimized.config.animationDuration = TIMING.sidebarDuration;
        window.sidebarManagerOptimized.config.laserDuration = TIMING.laserDuration;
        
        // Override animate method for proper sync
        const originalAnimate = window.sidebarManagerOptimized.animateSidebar;
        
        window.sidebarManagerOptimized.animateSidebar = function(side) {
            const sidebar = side === 'left' ? 
                this.elements.leftSidebar : 
                this.elements.rightSidebar;
            
            const isCollapsed = side === 'left' ? 
                this.state.leftCollapsed : 
                this.state.rightCollapsed;
            
            // Add animating class for laser
            sidebar.classList.add('animating');
            
            // Ensure shine effect exists
            const shineEffect = sidebar.querySelector('.shine-effect');
            if (shineEffect) {
                // Force animation restart
                shineEffect.style.animation = 'none';
                void shineEffect.offsetWidth; // Force reflow
                shineEffect.style.animation = ''; // Let CSS take over
            }
            
            // Toggle state
            if (isCollapsed) {
                this.expandSidebar(side);
            } else {
                this.collapseSidebar(side);
            }
            
            // Clean up after animation completes
            setTimeout(() => {
                sidebar.classList.remove('animating');
            }, TIMING.sidebarDuration + TIMING.cleanupDelay);
            
            // Update UI
            this.updateUI();
            this.saveState();
        };
        
        console.log('✅ Sidebar animation synchronized');
    }
    
    // ============================================
    // TOC HIGHLIGHTING
    // ============================================
    
    function setupTOCHighlighting() {
        // Wait for required modules
        if (!window.tocGenerator || !window.uiManager) {
            setTimeout(setupTOCHighlighting, 50);
            return;
        }
        
        let scrollTimeout;
        let isScrolling = false;
        
        // Enhanced TOC update function
        window.tocGenerator.updateActiveFromScroll = function() {
            if (!this.currentTopic || !this.tocContainer) return;
            
            const contentDisplay = document.getElementById('content-display');
            if (!contentDisplay) return;
            
            const headers = contentDisplay.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
            if (headers.length === 0) return;
            
            const scrollTop = contentDisplay.scrollTop;
            const viewportHeight = contentDisplay.clientHeight;
            const scrollHeight = contentDisplay.scrollHeight;
            const viewportMiddle = scrollTop + (viewportHeight / 3); // Focus on top third
            
            let activeHeader = null;
            let closestDistance = Infinity;
            
            // Special cases
            if (scrollTop <= 10) {
                // At top
                activeHeader = headers[0];
            } else if (scrollTop + viewportHeight >= scrollHeight - 10) {
                // At bottom
                activeHeader = headers[headers.length - 1];
            } else {
                // Find header closest to viewport top third
                headers.forEach(header => {
                    const rect = header.getBoundingClientRect();
                    const contentRect = contentDisplay.getBoundingClientRect();
                    const headerTop = rect.top - contentRect.top + scrollTop;
                    const distance = Math.abs(headerTop - viewportMiddle);
                    
                    if (headerTop <= viewportMiddle && distance < closestDistance) {
                        closestDistance = distance;
                        activeHeader = header;
                    }
                });
                
                // If no header above middle, use the first visible one
                if (!activeHeader) {
                    for (const header of headers) {
                        const rect = header.getBoundingClientRect();
                        const contentRect = contentDisplay.getBoundingClientRect();
                        if (rect.top >= contentRect.top && rect.top <= contentRect.bottom) {
                            activeHeader = header;
                            break;
                        }
                    }
                }
            }
            
            if (activeHeader) {
                this.setActiveItem(activeHeader.id);
            }
        };
        
        // Override setActiveItem for better visibility
        const originalSetActive = window.tocGenerator.setActiveItem;
        window.tocGenerator.setActiveItem = function(tocId) {
            if (!this.tocContainer) return;
            
            // Remove all active classes
            this.tocContainer.querySelectorAll('.toc-item.active').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to new item
            const tocItem = this.tocContainer.querySelector(`[data-toc-id="${tocId}"]`);
            if (tocItem) {
                tocItem.classList.add('active');
                
                // Ensure visible in scrollable TOC
                if (isScrolling) {
                    const tocRect = this.tocContainer.getBoundingClientRect();
                    const itemRect = tocItem.getBoundingClientRect();
                    
                    if (itemRect.top < tocRect.top + 50 || itemRect.bottom > tocRect.bottom - 50) {
                        tocItem.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                }
            }
        };
        
        // Set up scroll listener
        function attachScrollListener() {
            const contentDisplay = document.getElementById('content-display');
            if (!contentDisplay) return;
            
            contentDisplay.addEventListener('scroll', function() {
                isScrolling = true;
                clearTimeout(scrollTimeout);
                
                scrollTimeout = setTimeout(() => {
                    window.tocGenerator.updateActiveFromScroll();
                    isScrolling = false;
                }, TIMING.debounceDelay);
            }, { passive: true });
        }
        
        // Attach listener when topic loads
        const originalLoadTopic = window.uiManager.displayTopicContent;
        window.uiManager.displayTopicContent = async function(topic, section) {
            const result = await originalLoadTopic.call(this, topic, section);
            
            // Reattach scroll listener and trigger initial highlight
            setTimeout(() => {
                attachScrollListener();
                window.tocGenerator.updateActiveFromScroll();
            }, 100);
            
            return result;
        };
        
        // Initial setup if content exists
        attachScrollListener();
        
        console.log('✅ TOC highlighting enhanced');
    }
})();