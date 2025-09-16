/**
 * Final Sidebar Fix
 * Ensures compatibility between ui-manager and our CSS
 */

(function() {
    'use strict';
    
    console.log('🔧 Final sidebar fix initializing...');
    
    // Override the toggleSidebar function in ui-manager
    let retryCount = 0;
    const maxRetries = 20; // Max 10 seconds
    
    function fixUiManagerToggle() {
        if (!window.uiManager) {
            retryCount++;
            if (retryCount < maxRetries) {
                console.warn(`UI Manager not found, retrying... (${retryCount}/${maxRetries})`);
                setTimeout(fixUiManagerToggle, 500);
            } else {
                console.error('UI Manager not found after maximum retries');
            }
            return;
        }
        
        // Store original function
        const originalToggleSidebar = window.uiManager.toggleSidebar;
        
        // Override with fixed version
        window.uiManager.toggleSidebar = function(side) {
            console.log(`🔄 Fixed toggle for ${side} sidebar`);
            
            // Call original
            originalToggleSidebar.call(this, side);
            
            // Update body classes for CSS compatibility
            updateBodyClasses();
        };
        
        console.log('✅ UI Manager toggle fixed');
    }
    
    // Update body classes based on sidebar states
    function updateBodyClasses() {
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        const body = document.body;
        const container = document.getElementById('app-container');
        
        if (!leftSidebar || !rightSidebar || !container) return;
        
        // Clear all state classes
        body.classList.remove(
            'left-sidebar-visible', 'left-sidebar-hidden',
            'right-sidebar-visible', 'right-sidebar-hidden',
            'both-sidebars-hidden'
        );
        
        container.classList.remove(
            'left-sidebar-hidden', 'right-sidebar-hidden'
        );
        
        // Check states
        const leftHidden = leftSidebar.classList.contains('hidden');
        const rightHidden = rightSidebar.classList.contains('hidden');
        
        // Update body classes
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
        
        console.log('📊 Sidebar states updated:', {
            left: leftHidden ? 'hidden' : 'visible',
            right: rightHidden ? 'hidden' : 'visible',
            bodyClasses: body.className,
            containerClasses: container.className
        });
    }
    
    // Force sticky positioning
    function forceSticky() {
        const topicList = document.querySelector('.topic-list');
        const tocSidebar = document.querySelector('.toc-sidebar');
        
        if (topicList) {
            const computed = window.getComputedStyle(topicList);
            console.log('Topic list position:', computed.position);
            
            // Check parent overflow
            let parent = topicList.parentElement;
            while (parent && parent !== document.body) {
                const parentStyle = window.getComputedStyle(parent);
                if (parentStyle.overflow !== 'visible') {
                    console.warn('Parent has overflow:', parent, parentStyle.overflow);
                }
                parent = parent.parentElement;
            }
        }
        
        if (tocSidebar) {
            const computed = window.getComputedStyle(tocSidebar);
            console.log('TOC sidebar position:', computed.position);
        }
    }
    
    // Initialize
    function init() {
        fixUiManagerToggle();
        updateBodyClasses();
        forceSticky();
        
        // Set up observers for changes
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        
        if (leftSidebar && rightSidebar) {
            const observer = new MutationObserver(() => {
                updateBodyClasses();
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
        
        console.log('✅ Final sidebar fix complete');
    }
    
    // Initialize when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also run after delay to catch late initialization
    setTimeout(init, 1000);
    
})();