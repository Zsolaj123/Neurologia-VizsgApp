/**
 * TOC Highlight Fix
 * Ensures table of contents highlights properly on scroll
 */

(function() {
    'use strict';
    
    console.log('📍 TOC Highlight Fix initializing...');
    
    // Wait for required modules
    function waitForModules(callback) {
        if (window.tocGenerator && window.uiManager) {
            callback();
        } else {
            setTimeout(() => waitForModules(callback), 50);
        }
    }
    
    waitForModules(() => {
        // Enhanced scroll detection
        function setupScrollDetection() {
            const contentDisplay = document.getElementById('content-display');
            if (!contentDisplay) {
                console.warn('Content display not found');
                return;
            }
            
            let scrollTimeout;
            let lastScrollTop = 0;
            
            // Enhanced scroll handler
            const handleScroll = () => {
                clearTimeout(scrollTimeout);
                
                scrollTimeout = setTimeout(() => {
                    const currentScrollTop = contentDisplay.scrollTop;
                    const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
                    lastScrollTop = currentScrollTop;
                    
                    updateActiveSection(currentScrollTop, scrollDirection);
                }, 30); // Faster response time
            };
            
            // Remove any existing listeners
            contentDisplay.removeEventListener('scroll', handleScroll);
            
            // Add new listener
            contentDisplay.addEventListener('scroll', handleScroll, { passive: true });
            
            console.log('✅ Scroll detection set up');
        }
        
        // Update active section in TOC
        function updateActiveSection(scrollTop, direction) {
            const contentDisplay = document.getElementById('content-display');
            const tocContainer = document.getElementById('toc-container');
            
            if (!contentDisplay || !tocContainer) return;
            
            // Find all headers with IDs
            const headers = contentDisplay.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
            if (headers.length === 0) return;
            
            const contentRect = contentDisplay.getBoundingClientRect();
            const offset = 100; // Offset from top for better UX
            
            let activeHeader = null;
            
            // Check if at top
            if (scrollTop < 50) {
                activeHeader = headers[0];
            } 
            // Check if at bottom
            else if (scrollTop + contentRect.height >= contentDisplay.scrollHeight - 50) {
                activeHeader = headers[headers.length - 1];
            } 
            // Find the most visible header
            else {
                for (let i = headers.length - 1; i >= 0; i--) {
                    const header = headers[i];
                    const headerRect = header.getBoundingClientRect();
                    const relativeTop = headerRect.top - contentRect.top;
                    
                    if (relativeTop <= offset) {
                        activeHeader = header;
                        break;
                    }
                }
            }
            
            if (activeHeader) {
                highlightTOCItem(activeHeader.id);
            }
        }
        
        // Highlight the corresponding TOC item
        function highlightTOCItem(headerId) {
            const tocContainer = document.getElementById('toc-container');
            if (!tocContainer) return;
            
            // Remove all active classes
            tocContainer.querySelectorAll('.toc-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Find and highlight the corresponding TOC item
            const tocItem = tocContainer.querySelector(`[data-toc-id="${headerId}"]`);
            if (tocItem) {
                tocItem.classList.add('active');
                
                // Ensure the active item is visible in TOC
                ensureTOCItemVisible(tocItem);
            }
        }
        
        // Scroll TOC to show active item
        function ensureTOCItemVisible(tocItem) {
            const tocContainer = document.getElementById('toc-container');
            if (!tocContainer) return;
            
            const tocRect = tocContainer.getBoundingClientRect();
            const itemRect = tocItem.getBoundingClientRect();
            
            // Check if item is outside visible area
            if (itemRect.top < tocRect.top || itemRect.bottom > tocRect.bottom) {
                // Smooth scroll to center the item
                tocItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
        
        // Initialize on topic load
        const originalLoadTopic = window.uiManager.loadTopic;
        window.uiManager.loadTopic = async function(topicId) {
            const result = await originalLoadTopic.call(this, topicId);
            
            // Set up scroll detection after content loads
            setTimeout(() => {
                setupScrollDetection();
                // Trigger initial highlight
                updateActiveSection(0, 'down');
            }, 100);
            
            return result;
        };
        
        // Also set up if content already loaded
        if (window.uiManager.currentTopic) {
            setupScrollDetection();
        }
        
        console.log('✅ TOC highlight fix ready');
    });
})();