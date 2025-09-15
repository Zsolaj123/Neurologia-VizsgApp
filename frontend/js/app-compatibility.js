/**
 * Browser Compatibility Layer
 * Handles features that might not work in all browsers
 */

(function() {
    'use strict';
    
    console.log('🔧 Compatibility layer initializing...');
    
    // Check for :has() support
    function checkHasSupport() {
        try {
            document.querySelector(':has(body)');
            return true;
        } catch (e) {
            return false;
        }
    }
    
    const hasSupport = checkHasSupport();
    console.log(`Browser :has() support: ${hasSupport ? 'YES' : 'NO'}`);
    
    // Initialize when DOM is ready
    function init() {
        // Add body class for CSS fallbacks
        if (!hasSupport) {
            document.body.classList.add('no-has-support');
        }
        
        // Setup sidebar state management
        manageSidebarStates();
        
        // Fix toggle buttons
        ensureToggleButtonsExist();
        
        // Log current state
        logCurrentState();
    }
    
    // Manage sidebar states with classes on body
    function manageSidebarStates() {
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        const body = document.body;
        
        if (!leftSidebar || !rightSidebar) {
            console.error('❌ Sidebars not found!');
            return;
        }
        
        // Create observer to watch for class changes
        const observer = new MutationObserver(() => {
            updateBodyClasses();
        });
        
        // Observe both sidebars
        observer.observe(leftSidebar, { attributes: true, attributeFilter: ['class'] });
        observer.observe(rightSidebar, { attributes: true, attributeFilter: ['class'] });
        
        // Initial update
        updateBodyClasses();
        
        function updateBodyClasses() {
            // Remove all sidebar state classes
            body.classList.remove(
                'left-sidebar-visible', 'left-sidebar-hidden',
                'right-sidebar-visible', 'right-sidebar-hidden',
                'both-sidebars-hidden'
            );
            
            // Add appropriate classes
            const leftHidden = leftSidebar.classList.contains('hidden');
            const rightHidden = rightSidebar.classList.contains('hidden');
            
            if (leftHidden) {
                body.classList.add('left-sidebar-hidden');
            } else {
                body.classList.add('left-sidebar-visible');
            }
            
            if (rightHidden) {
                body.classList.add('right-sidebar-hidden');
            } else {
                body.classList.add('right-sidebar-visible');
            }
            
            if (leftHidden && rightHidden) {
                body.classList.add('both-sidebars-hidden');
            }
            
            console.log('Sidebar states:', {
                left: leftHidden ? 'hidden' : 'visible',
                right: rightHidden ? 'hidden' : 'visible'
            });
        }
    }
    
    // Ensure toggle buttons exist and are properly set up
    function ensureToggleButtonsExist() {
        const leftToggle = document.getElementById('left-sidebar-toggle');
        const rightToggle = document.getElementById('right-sidebar-toggle');
        
        if (!leftToggle || !rightToggle) {
            console.error('❌ Toggle buttons not found in DOM!');
            return;
        }
        
        console.log('✅ Toggle buttons found:', {
            left: leftToggle,
            right: rightToggle
        });
        
        // Remove any inline styles that might hide them
        leftToggle.removeAttribute('style');
        rightToggle.removeAttribute('style');
        
        // Ensure they have the correct class
        leftToggle.classList.add('sidebar-toggle-fixed');
        rightToggle.classList.add('sidebar-toggle-fixed');
        
        // Log their computed styles
        const leftStyles = window.getComputedStyle(leftToggle);
        const rightStyles = window.getComputedStyle(rightToggle);
        
        console.log('Left toggle visibility:', {
            display: leftStyles.display,
            visibility: leftStyles.visibility,
            opacity: leftStyles.opacity,
            position: leftStyles.position,
            zIndex: leftStyles.zIndex
        });
    }
    
    // Log current state for debugging
    function logCurrentState() {
        const container = document.getElementById('app-container');
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        const contentArea = document.getElementById('content-area');
        
        console.log('Current DOM state:', {
            container: {
                exists: !!container,
                overflow: container ? getComputedStyle(container).overflow : 'N/A',
                display: container ? getComputedStyle(container).display : 'N/A'
            },
            leftSidebar: {
                exists: !!leftSidebar,
                classes: leftSidebar ? leftSidebar.className : 'N/A',
                position: leftSidebar ? getComputedStyle(leftSidebar.querySelector('.topic-list')).position : 'N/A'
            },
            rightSidebar: {
                exists: !!rightSidebar,
                classes: rightSidebar ? rightSidebar.className : 'N/A',
                position: rightSidebar ? getComputedStyle(rightSidebar.querySelector('.toc-sidebar')).position : 'N/A'
            },
            contentArea: {
                exists: !!contentArea,
                overflow: contentArea ? getComputedStyle(contentArea).overflow : 'N/A'
            }
        });
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also run after a delay to catch any late initialization
    setTimeout(init, 1000);
    
    // Export for debugging
    window.CompatibilityLayer = {
        checkHasSupport,
        manageSidebarStates,
        ensureToggleButtonsExist,
        logCurrentState
    };
    
})();