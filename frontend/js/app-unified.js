/**
 * Neurológia VizsgApp - Unified JavaScript
 * Single source of truth for all app functionality
 * Clean, maintainable, no conflicts
 */

(function() {
    'use strict';
    
    // ============================================
    // Global State
    // ============================================
    
    const AppState = {
        initialized: false,
        currentTopic: null,
        currentSection: 'reszletes',
        scrollHandler: null,
        tocUpdateTimer: null
    };
    
    // ============================================
    // Initialization
    // ============================================
    
    function initialize() {
        if (AppState.initialized) return;
        
        console.log('🚀 Neurológia VizsgApp inicializálás...');
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }
    
    function setup() {
        try {
            // Initialize all components
            setupSidebarToggles();
            setupTOCScrollSync();
            setupAuthorCredit();
            
            // Initialize existing modules if available
            if (window.tocGenerator) {
                window.tocGenerator.initialize();
            }
            
            if (window.uiManager) {
                window.uiManager.initialize();
            }
            
            AppState.initialized = true;
            console.log('✅ Alkalmazás sikeresen inicializálva');
            
        } catch (error) {
            console.error('❌ Inicializálási hiba:', error);
        }
    }
    
    // ============================================
    // Sidebar Toggle Functionality
    // ============================================
    
    function setupSidebarToggles() {
        console.log('🔧 Sidebar toggle beállítása...');
        
        const leftToggle = document.getElementById('left-sidebar-toggle');
        const rightToggle = document.getElementById('right-sidebar-toggle');
        const leftSidebar = document.getElementById('left-sidebar');
        const rightSidebar = document.getElementById('right-sidebar');
        
        if (!leftToggle || !rightToggle || !leftSidebar || !rightSidebar) {
            console.warn('⚠️ Sidebar elemek nem találhatók, újrapróbálkozás...');
            setTimeout(setupSidebarToggles, 500);
            return;
        }
        
        // Clean event listeners
        const newLeftToggle = leftToggle.cloneNode(true);
        const newRightToggle = rightToggle.cloneNode(true);
        leftToggle.parentNode.replaceChild(newLeftToggle, leftToggle);
        rightToggle.parentNode.replaceChild(newRightToggle, rightToggle);
        
        // Add click handlers
        newLeftToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar('left', leftSidebar);
        });
        
        newRightToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar('right', rightSidebar);
        });
        
        console.log('✅ Sidebar toggle kész');
    }
    
    function toggleSidebar(side, sidebar) {
        console.log(`🔄 ${side} sidebar váltása`);
        
        // Toggle hidden class
        sidebar.classList.toggle('hidden');
        
        // Update app state if available
        if (window.appState && window.appState.ui) {
            const key = side === 'left' ? 'leftSidebarVisible' : 'rightSidebarVisible';
            window.appState.ui[key] = !sidebar.classList.contains('hidden');
            window.appState.saveUIState();
        }
        
        // Update layout
        if (window.uiManager && window.uiManager.adjustLayout) {
            window.uiManager.adjustLayout();
        }
    }
    
    // ============================================
    // TOC Scroll Synchronization
    // ============================================
    
    function setupTOCScrollSync() {
        console.log('🔧 TOC scroll szinkronizáció beállítása...');
        
        const contentDisplay = document.getElementById('content-display');
        if (!contentDisplay) {
            console.warn('⚠️ Content display nem található, újrapróbálkozás...');
            setTimeout(setupTOCScrollSync, 500);
            return;
        }
        
        // Remove existing handler
        if (AppState.scrollHandler) {
            contentDisplay.removeEventListener('scroll', AppState.scrollHandler);
        }
        
        // Create new scroll handler
        AppState.scrollHandler = debounce(updateActiveTOCItem, 50);
        contentDisplay.addEventListener('scroll', AppState.scrollHandler);
        
        // Update on topic display
        window.addEventListener('topicDisplayed', () => {
            setTimeout(updateActiveTOCItem, 100);
        });
        
        console.log('✅ TOC scroll szinkronizáció kész');
    }
    
    function updateActiveTOCItem() {
        const contentDisplay = document.getElementById('content-display');
        const tocContainer = document.getElementById('toc-container');
        
        if (!contentDisplay || !tocContainer) return;
        
        // Find all headers
        const headers = contentDisplay.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
        if (headers.length === 0) return;
        
        const scrollTop = contentDisplay.scrollTop;
        const scrollHeight = contentDisplay.scrollHeight;
        const clientHeight = contentDisplay.clientHeight;
        let activeId = null;
        
        // Check if at bottom
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            activeId = headers[headers.length - 1].id;
        } else {
            // Find header in viewport
            const contentRect = contentDisplay.getBoundingClientRect();
            
            for (const header of headers) {
                const rect = header.getBoundingClientRect();
                const relativeTop = rect.top - contentRect.top;
                
                if (relativeTop <= 80) {
                    activeId = header.id;
                } else if (relativeTop > 80) {
                    break;
                }
            }
        }
        
        if (activeId) {
            highlightTOCItem(activeId);
        }
    }
    
    function highlightTOCItem(activeId) {
        const tocContainer = document.getElementById('toc-container');
        if (!tocContainer) return;
        
        // Remove all active classes
        tocContainer.querySelectorAll('.toc-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current item
        const activeItem = tocContainer.querySelector(`[data-toc-id="${activeId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            
            // Ensure visible in TOC
            const tocContent = tocContainer.querySelector('.toc-content');
            if (tocContent) {
                const itemRect = activeItem.getBoundingClientRect();
                const containerRect = tocContent.getBoundingClientRect();
                
                if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
                    activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }
    }
    
    // ============================================
    // Author Credit Positioning
    // ============================================
    
    function setupAuthorCredit() {
        const header = document.querySelector('.app-header');
        const title = document.querySelector('.app-title');
        const authorCredit = document.querySelector('.author-credit');
        
        if (!header || !title || !authorCredit) return;
        
        // Check if already structured
        if (header.querySelector('.header-title-wrapper')) return;
        
        console.log('🔧 Author credit pozicionálás...');
        
        // Create new structure
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
        
        console.log('✅ Author credit kész');
    }
    
    // ============================================
    // Utility Functions
    // ============================================
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ============================================
    // Public API
    // ============================================
    
    window.NeuroApp = {
        initialize,
        toggleSidebar,
        updateActiveTOCItem,
        state: AppState
    };
    
    // ============================================
    // Start Application
    // ============================================
    
    initialize();
    
    // Backup initialization on window load
    window.addEventListener('load', () => {
        if (!AppState.initialized) {
            initialize();
        }
    });
    
})();