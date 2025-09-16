/**
 * Sidebar Toggle Fix
 * Handles the new toggle button structure with buttons inside headers
 * and fixed buttons for when sidebars are hidden
 */

(function() {
    'use strict';
    
    console.log('🔧 Sidebar toggle fix initializing...');
    
    function init() {
        setupToggleButtons();
        createFixedButtons();
        updateToggleStates();
    }
    
    // Setup event listeners for toggle buttons
    function setupToggleButtons() {
        // Get buttons inside headers
        const leftToggle = document.getElementById('left-sidebar-toggle');
        const rightToggle = document.getElementById('right-sidebar-toggle');
        
        if (leftToggle) {
            leftToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSidebar('left');
            });
            console.log('✅ Left sidebar toggle button found and configured');
        }
        
        if (rightToggle) {
            rightToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSidebar('right');
            });
            console.log('✅ Right sidebar toggle button found and configured');
        }
    }
    
    // Create fixed position buttons for when sidebars are hidden
    function createFixedButtons() {
        // Check if fixed buttons already exist
        if (!document.getElementById('left-sidebar-toggle-fixed')) {
            const leftFixed = document.createElement('button');
            leftFixed.id = 'left-sidebar-toggle-fixed';
            leftFixed.className = 'sidebar-toggle-fixed';
            leftFixed.innerHTML = '☰';
            leftFixed.title = 'Tételek megjelenítése';
            leftFixed.addEventListener('click', () => toggleSidebar('left'));
            document.body.appendChild(leftFixed);
        }
        
        if (!document.getElementById('right-sidebar-toggle-fixed')) {
            const rightFixed = document.createElement('button');
            rightFixed.id = 'right-sidebar-toggle-fixed';
            rightFixed.className = 'sidebar-toggle-fixed';
            rightFixed.innerHTML = '☰';
            rightFixed.title = 'Tartalomjegyzék megjelenítése';
            rightFixed.addEventListener('click', () => toggleSidebar('right'));
            document.body.appendChild(rightFixed);
        }
    }
    
    // Toggle sidebar visibility
    function toggleSidebar(side) {
        console.log(`Toggling ${side} sidebar`);
        
        // Use uiManager if available
        if (window.uiManager && typeof window.uiManager.toggleSidebar === 'function') {
            window.uiManager.toggleSidebar(side);
        } else {
            // Fallback direct toggle
            const sidebar = document.getElementById(`${side}-sidebar`);
            if (sidebar) {
                sidebar.classList.toggle('hidden');
                updateToggleStates();
            }
        }
    }
    
    // Update toggle button states based on sidebar visibility
    function updateToggleStates() {
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        const body = document.body;
        
        // Update body classes for CSS
        if (leftSidebar) {
            if (leftSidebar.classList.contains('hidden')) {
                body.classList.add('left-sidebar-hidden');
                body.classList.remove('left-sidebar-visible');
            } else {
                body.classList.add('left-sidebar-visible');
                body.classList.remove('left-sidebar-hidden');
            }
        }
        
        if (rightSidebar) {
            if (rightSidebar.classList.contains('hidden')) {
                body.classList.add('right-sidebar-hidden');
                body.classList.remove('right-sidebar-visible');
            } else {
                body.classList.add('right-sidebar-visible');
                body.classList.remove('right-sidebar-hidden');
            }
        }
    }
    
    // Watch for sidebar changes
    function observeSidebarChanges() {
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        
        const observer = new MutationObserver(() => {
            updateToggleStates();
        });
        
        const config = { attributes: true, attributeFilter: ['class'] };
        
        if (leftSidebar) {
            observer.observe(leftSidebar, config);
        }
        
        if (rightSidebar) {
            observer.observe(rightSidebar, config);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also run after a delay to catch late initialization
    setTimeout(() => {
        init();
        observeSidebarChanges();
    }, 500);
    
})();