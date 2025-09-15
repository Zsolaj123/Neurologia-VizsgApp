/**
 * Nuclear JavaScript Fixes
 * Removes ALL inline styles and uses proper classes
 */

(function() {
    'use strict';
    
    console.log('Nuclear fixes initializing...');
    
    /**
     * Wait for everything to be ready
     */
    function init() {
        // Remove any inline styles that might exist
        removeAllInlineStyles();
        
        // Setup features
        setupToggleButtons();
        setupTOCHighlighting();
        fixAuthorCredit();
        
        console.log('Nuclear fixes initialized');
    }
    
    /**
     * Remove ALL inline styles from key elements
     */
    function removeAllInlineStyles() {
        const elements = [
            '#left-sidebar-toggle',
            '#right-sidebar-toggle',
            '#left-sidebar',
            '#right-sidebar',
            '.topic-list',
            '.toc-sidebar'
        ];
        
        elements.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
                el.removeAttribute('style');
                console.log(`Removed inline styles from ${selector}`);
            }
        });
    }
    
    /**
     * Setup toggle buttons WITHOUT inline styles
     */
    function setupToggleButtons() {
        console.log('Setting up toggle buttons...');
        
        const leftToggle = document.getElementById('left-sidebar-toggle');
        const rightToggle = document.getElementById('right-sidebar-toggle');
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        
        if (!leftToggle || !rightToggle || !leftSidebar || !rightSidebar) {
            console.error('Toggle elements not found, retrying...');
            setTimeout(setupToggleButtons, 500);
            return;
        }
        
        // Remove any existing event listeners by cloning
        const newLeftToggle = leftToggle.cloneNode(true);
        const newRightToggle = rightToggle.cloneNode(true);
        
        leftToggle.parentNode.replaceChild(newLeftToggle, leftToggle);
        rightToggle.parentNode.replaceChild(newRightToggle, rightToggle);
        
        // Remove any inline styles
        newLeftToggle.removeAttribute('style');
        newRightToggle.removeAttribute('style');
        
        // Add click handlers
        newLeftToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Left toggle clicked');
            toggleSidebar(leftSidebar, 'left');
        });
        
        newRightToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Right toggle clicked');
            toggleSidebar(rightSidebar, 'right');
        });
        
        console.log('Toggle buttons setup complete');
    }
    
    /**
     * Toggle sidebar using classes only
     */
    function toggleSidebar(sidebar, side) {
        console.log(`Toggling ${side} sidebar`);
        
        // Remove any inline styles
        sidebar.removeAttribute('style');
        
        // Toggle hidden class
        sidebar.classList.toggle('hidden');
        
        // Log state
        console.log(`${side} sidebar hidden:`, sidebar.classList.contains('hidden'));
        
        // Update app state if available
        if (window.appState && window.appState.ui) {
            const key = side === 'left' ? 'leftSidebarVisible' : 'rightSidebarVisible';
            window.appState.ui[key] = !sidebar.classList.contains('hidden');
            window.appState.saveUIState();
        }
        
        // Trigger layout adjustment if available
        if (window.uiManager && window.uiManager.adjustLayout) {
            window.uiManager.adjustLayout();
        }
    }
    
    /**
     * Setup TOC highlighting
     */
    function setupTOCHighlighting() {
        console.log('Setting up TOC highlighting...');
        
        const contentDisplay = document.getElementById('content-display');
        if (!contentDisplay) {
            console.error('Content display not found, retrying...');
            setTimeout(setupTOCHighlighting, 500);
            return;
        }
        
        // Remove any existing listeners
        contentDisplay.onscroll = null;
        
        // Add new scroll handler
        let scrollTimeout;
        contentDisplay.addEventListener('scroll', function() {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(function() {
                updateTOCHighlight();
            }, 50);
        });
        
        // Also update on topic display
        window.addEventListener('topicDisplayed', function() {
            setTimeout(updateTOCHighlight, 100);
        });
        
        console.log('TOC highlighting setup complete');
    }
    
    /**
     * Update TOC highlight
     */
    function updateTOCHighlight() {
        const contentDisplay = document.getElementById('content-display');
        const tocContainer = document.getElementById('toc-container');
        
        if (!contentDisplay || !tocContainer) return;
        
        // Find all headers with IDs
        const headers = contentDisplay.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
        if (headers.length === 0) return;
        
        let activeId = null;
        const scrollTop = contentDisplay.scrollTop;
        const contentHeight = contentDisplay.scrollHeight;
        const viewHeight = contentDisplay.clientHeight;
        
        // Check if at bottom
        if (scrollTop + viewHeight >= contentHeight - 10) {
            activeId = headers[headers.length - 1].id;
        } else {
            // Find header in view
            for (const header of headers) {
                const rect = header.getBoundingClientRect();
                const contentRect = contentDisplay.getBoundingClientRect();
                const relativeTop = rect.top - contentRect.top;
                
                if (relativeTop <= 80) {
                    activeId = header.id;
                }
            }
        }
        
        if (activeId) {
            // Remove all active classes
            tocContainer.querySelectorAll('.toc-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class
            const activeItem = tocContainer.querySelector(`[data-toc-id="${activeId}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
                console.log('Active TOC item:', activeId);
            }
        }
    }
    
    /**
     * Fix author credit
     */
    function fixAuthorCredit() {
        const header = document.querySelector('.app-header');
        const title = document.querySelector('.app-title');
        const authorCredit = document.querySelector('.author-credit');
        
        if (!header || !title || !authorCredit) return;
        
        // Check if already fixed
        if (header.querySelector('.header-title-wrapper')) return;
        
        // Create structure
        const titleWrapper = document.createElement('div');
        titleWrapper.className = 'header-title-wrapper';
        
        const authorWrapper = document.createElement('div');
        authorWrapper.className = 'header-author-wrapper';
        
        // Move elements
        authorCredit.remove();
        header.innerHTML = '';
        
        titleWrapper.appendChild(title);
        authorWrapper.appendChild(authorCredit);
        
        header.appendChild(titleWrapper);
        header.appendChild(authorWrapper);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also init on window load as backup
    window.addEventListener('load', function() {
        removeAllInlineStyles(); // Remove any late-added inline styles
    });
    
})();