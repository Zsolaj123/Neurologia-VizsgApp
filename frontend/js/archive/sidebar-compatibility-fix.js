/**
 * Sidebar Compatibility Fix
 * Provides fallback for browsers that don't support :has() selector
 */

(function() {
    'use strict';
    
    // Check if browser supports :has() selector
    function supportsHasSelector() {
        try {
            document.querySelector(':has(*)');
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Initialize compatibility fix
    function initCompatibilityFix() {
        console.log('🔧 Initializing sidebar compatibility fix...');
        
        const hasSupport = supportsHasSelector();
        console.log(`📊 Browser :has() support: ${hasSupport ? 'YES' : 'NO'}`);
        
        if (!hasSupport) {
            console.log('⚠️ Applying :has() selector fallback');
            setupFallbackToggleVisibility();
        }
        
        // Fix sticky positioning issues
        fixStickyPositioning();
        
        // Ensure proper sidebar initialization
        initializeSidebars();
    }
    
    // Fallback for toggle button visibility
    function setupFallbackToggleVisibility() {
        const appContainer = document.getElementById('app-container');
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        
        if (!appContainer || !leftSidebar || !rightSidebar) {
            console.error('❌ Required elements not found');
            return;
        }
        
        // Function to update container classes based on sidebar state
        function updateContainerClasses() {
            // Left sidebar
            if (leftSidebar.classList.contains('hidden')) {
                appContainer.classList.add('sidebar-hidden-left');
            } else {
                appContainer.classList.remove('sidebar-hidden-left');
            }
            
            // Right sidebar
            if (rightSidebar.classList.contains('hidden')) {
                appContainer.classList.add('sidebar-hidden-right');
            } else {
                appContainer.classList.remove('sidebar-hidden-right');
            }
        }
        
        // Initial update
        updateContainerClasses();
        
        // Watch for changes using MutationObserver
        const observer = new MutationObserver(() => {
            updateContainerClasses();
        });
        
        observer.observe(leftSidebar, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        observer.observe(rightSidebar, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
    
    // Fix sticky positioning issues
    function fixStickyPositioning() {
        // Remove any conflicting styles from parent containers
        const containers = ['app-container', 'content-area', 'content-display'];
        
        containers.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                // Ensure overflow is visible
                const computedStyle = window.getComputedStyle(element);
                if (computedStyle.overflow === 'hidden' || 
                    computedStyle.overflow === 'auto' || 
                    computedStyle.overflow === 'scroll') {
                    console.log(`🔧 Fixing overflow on #${id}`);
                    element.style.overflow = 'visible';
                }
            }
        });
        
        // Special handling for content-display to allow scrolling
        const contentDisplay = document.getElementById('content-display');
        if (contentDisplay) {
            // Create a wrapper for scrollable content
            if (!contentDisplay.querySelector('.content-scroll-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'content-scroll-wrapper';
                wrapper.style.cssText = `
                    overflow-y: auto;
                    overflow-x: hidden;
                    height: calc(100vh - var(--header-height) - var(--section-tabs-height));
                    padding: var(--spacing-xl);
                `;
                
                // Move all children to wrapper
                while (contentDisplay.firstChild) {
                    wrapper.appendChild(contentDisplay.firstChild);
                }
                
                contentDisplay.appendChild(wrapper);
                contentDisplay.style.overflow = 'visible';
                contentDisplay.style.height = 'auto';
            }
        }
    }
    
    // Initialize sidebars properly
    function initializeSidebars() {
        const leftToggle = document.getElementById('left-sidebar-toggle');
        const rightToggle = document.getElementById('right-sidebar-toggle');
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        
        // Make toggle buttons visible for debugging
        if (leftToggle) {
            console.log('👁️ Left toggle button found, ensuring visibility');
            leftToggle.style.cssText += `
                opacity: 1 !important;
                pointer-events: auto !important;
                transform: none !important;
                position: fixed !important;
                z-index: 9999 !important;
                display: flex !important;
                visibility: visible !important;
            `;
        }
        
        if (rightToggle) {
            console.log('👁️ Right toggle button found, ensuring visibility');
            rightToggle.style.cssText += `
                opacity: 1 !important;
                pointer-events: auto !important;
                transform: none !important;
                position: fixed !important;
                z-index: 9999 !important;
                display: flex !important;
                visibility: visible !important;
            `;
        }
        
        // Log current state
        console.log('📊 Sidebar states:', {
            leftHidden: leftSidebar?.classList.contains('hidden'),
            rightHidden: rightSidebar?.classList.contains('hidden'),
            leftToggleVisible: leftToggle ? window.getComputedStyle(leftToggle).opacity : 'not found',
            rightToggleVisible: rightToggle ? window.getComputedStyle(rightToggle).opacity : 'not found'
        });
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompatibilityFix);
    } else {
        initCompatibilityFix();
    }
    
    // Also run after a delay to catch any late-loading elements
    setTimeout(initCompatibilityFix, 1000);
})();