/**
 * Animation and Feature Fixes
 * Ensures laser animations and TOC highlighting work properly
 */

(function() {
    'use strict';
    
    console.log('🔧 Animation fixes loading...');
    
    // Force remove any CSS that might interfere
    function removeConflictingCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Override any overflow hidden on sidebars */
            .sidebar-container,
            #left-sidebar,
            #right-sidebar,
            #left-sidebar.collapsed,
            #left-sidebar.hidden,
            #right-sidebar.collapsed,
            #right-sidebar.hidden {
                overflow: visible !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Wait for app to be ready
    function waitForApp(callback) {
        if (window.sidebarManagerOptimized && window.tocGenerator) {
            callback();
        } else {
            setTimeout(() => waitForApp(callback), 100);
        }
    }
    
    waitForApp(() => {
        console.log('✅ Applying animation fixes...');
        
        // Apply CSS conflict fixes first
        removeConflictingCSS();
        
        // Fix 1: Ensure laser animation is visible
        function enhanceLaserAnimation() {
            // Add missing CSS if needed
            const style = document.createElement('style');
            style.textContent = `
                /* Enhanced laser visibility */
                .shine-effect {
                    position: absolute;
                    top: 0;
                    width: 6px; /* Slightly wider for visibility */
                    height: 100%;
                    z-index: 200; /* Higher z-index */
                    opacity: 0;
                    pointer-events: none;
                    background: linear-gradient(
                        to bottom,
                        transparent 0%,
                        rgba(38, 237, 101, 0.3) 10%,
                        rgba(38, 237, 101, 0.8) 35%,
                        #26ed65 50%,
                        rgba(38, 237, 101, 0.8) 65%,
                        rgba(38, 237, 101, 0.3) 90%,
                        transparent 100%
                    );
                    transform: translateY(-100%);
                    transition: none; /* Remove transition for animation */
                }
                
                .shine-effect.active {
                    opacity: 1 !important;
                    animation: laser-sweep 0.6s ease-out !important;
                }
                
                @keyframes laser-sweep {
                    0% {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                }
                
                /* Ensure sidebars have relative positioning */
                .sidebar-container {
                    position: relative !important;
                }
            `;
            document.head.appendChild(style);
            
            // Override the triggerLaserEffect method
            const originalTriggerLaser = window.sidebarManagerOptimized.triggerLaserEffect;
            window.sidebarManagerOptimized.triggerLaserEffect = function(sidebar) {
                const shineEffect = sidebar.querySelector('.shine-effect');
                if (!shineEffect) {
                    console.warn('Shine effect not found in sidebar');
                    return;
                }
                
                console.log('Triggering laser animation...');
                
                // Reset animation
                shineEffect.classList.remove('active');
                void shineEffect.offsetWidth; // Force reflow
                
                // Add active class
                shineEffect.classList.add('active');
                
                // Remove after animation completes
                setTimeout(() => {
                    shineEffect.classList.remove('active');
                }, 600);
            };
            
            console.log('✅ Laser animation enhanced');
        }
        
        // Fix 2: Ensure TOC highlighting works
        function fixTOCHighlighting() {
            // Store original method
            const originalUpdateActive = window.tocGenerator.updateActiveFromScroll;
            
            // Enhanced version with better detection
            window.tocGenerator.updateActiveFromScroll = function() {
                if (!this.currentTopic || !this.currentTopic.tableOfContents) {
                    console.log('No TOC to update');
                    return;
                }
                
                const contentArea = document.getElementById('content-display');
                if (!contentArea) return;
                
                // Find all headers in content
                const headers = contentArea.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
                if (headers.length === 0) {
                    console.log('No headers found in content');
                    return;
                }
                
                let activeId = null;
                const scrollTop = contentArea.scrollTop;
                const scrollHeight = contentArea.scrollHeight;
                const clientHeight = contentArea.clientHeight;
                
                // Enhanced detection logic
                if (scrollTop + clientHeight >= scrollHeight - 10) {
                    // At bottom - highlight last header
                    activeId = headers[headers.length - 1].id;
                } else if (scrollTop < 10) {
                    // At top - highlight first header
                    activeId = headers[0].id;
                } else {
                    // Find the most visible header
                    let closestHeader = null;
                    let closestDistance = Infinity;
                    
                    for (const header of headers) {
                        const rect = header.getBoundingClientRect();
                        const contentRect = contentArea.getBoundingClientRect();
                        const relativeTop = rect.top - contentRect.top;
                        
                        // Header is above the viewport top + offset
                        if (relativeTop <= 100) {
                            // Find the header closest to the top (but still above)
                            const distance = Math.abs(relativeTop - 50);
                            if (distance < closestDistance) {
                                closestDistance = distance;
                                closestHeader = header;
                            }
                        }
                    }
                    
                    if (closestHeader) {
                        activeId = closestHeader.id;
                    } else {
                        // No header above viewport, use first visible
                        activeId = headers[0].id;
                    }
                }
                
                if (activeId) {
                    console.log('Setting active TOC item:', activeId);
                    this.setActiveItem(activeId);
                }
            };
            
            // Ensure scroll handler is properly attached
            const contentDisplay = document.getElementById('content-display');
            if (contentDisplay) {
                // Add scroll listener with proper event handling
                let scrollTimeout;
                const scrollHandler = () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        console.log('Scroll event triggered, updating TOC...');
                        window.tocGenerator.updateActiveFromScroll();
                    }, 50); // Shorter debounce for more responsive updates
                };
                
                // Remove existing listener if any
                contentDisplay.removeEventListener('scroll', scrollHandler);
                
                // Add new listener
                contentDisplay.addEventListener('scroll', scrollHandler);
                
                // Also ensure uiManager's scroll handler is working
                if (window.uiManager && window.uiManager.handleContentScroll) {
                    // Re-bind the scroll handler
                    const uiScrollHandler = window.uiManager.handleContentScroll.bind(window.uiManager);
                    contentDisplay.addEventListener('scroll', window.uiManager.debounce(uiScrollHandler, 50));
                }
            }
            
            console.log('✅ TOC highlighting fixed');
        }
        
        // Apply fixes
        enhanceLaserAnimation();
        fixTOCHighlighting();
        
        console.log('✅ All animation fixes applied');
    });
})();