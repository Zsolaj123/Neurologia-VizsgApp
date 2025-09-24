/**
 * COMPREHENSIVE SCROLL DEBUG AND FIX
 * 
 * This file identifies and fixes all scroll-related conflicts in the app
 * 
 * IDENTIFIED ISSUES:
 * 1. Multiple scroll event listeners causing interference
 * 2. CSS scroll-behavior: smooth conflicting with programmatic scroll resets
 * 3. Timing conflicts between TOC highlighting and scroll resets
 * 4. Animation file still present but disabled in HTML
 */

class ScrollDebugManager {
    constructor() {
        this.isDebugMode = true;
        this.scrollListeners = [];
        this.conflictsFound = [];
    }

    init() {
        this.log('🚀 Starting comprehensive scroll debug...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.performAnalysis());
        } else {
            this.performAnalysis();
        }
    }

    performAnalysis() {
        this.log('📊 Performing scroll conflict analysis...');
        
        // 1. Check DOM elements
        this.checkDOMElements();
        
        // 2. Check existing scroll listeners
        this.checkScrollListeners();
        
        // 3. Check CSS conflicts
        this.checkCSSConflicts();
        
        // 4. Implement fixes
        this.implementFixes();
        
        // 5. Report results
        this.reportResults();
    }

    checkDOMElements() {
        this.log('🔍 Checking DOM elements...');
        
        const contentDisplay = document.getElementById('content-display');
        const tocContainer = document.getElementById('toc-container');
        
        if (!contentDisplay) {
            this.addConflict('CRITICAL: content-display element not found');
            return;
        }
        
        this.log('✅ content-display found:', contentDisplay);
        this.log('📐 content-display styles:', {
            overflow: getComputedStyle(contentDisplay).overflow,
            overflowY: getComputedStyle(contentDisplay).overflowY,
            scrollBehavior: getComputedStyle(contentDisplay).scrollBehavior,
            height: getComputedStyle(contentDisplay).height
        });
        
        if (tocContainer) {
            this.log('✅ toc-container found:', tocContainer);
        } else {
            this.addConflict('WARNING: toc-container not found');
        }
    }

    checkScrollListeners() {
        this.log('🎧 Checking for existing scroll listeners...');
        
        const contentDisplay = document.getElementById('content-display');
        if (!contentDisplay) return;
        
        // Check for multiple uiManager scroll listeners
        if (window.uiManager) {
            this.log('✅ uiManager found');
            if (window.uiManager.handleContentScroll) {
                this.log('📝 uiManager.handleContentScroll exists');
            }
        }
        
        // Check for tocGenerator
        if (window.tocGenerator) {
            this.log('✅ tocGenerator found');
            if (window.tocGenerator.updateActiveFromScroll) {
                this.log('📝 tocGenerator.updateActiveFromScroll exists');
            }
        }
        
        // Check for animation manager conflicts
        if (window.appAnimations) {
            this.addConflict('WARNING: appAnimations still present despite being disabled in HTML');
        }
    }

    checkCSSConflicts() {
        this.log('🎨 Checking CSS conflicts...');
        
        const html = document.documentElement;
        const body = document.body;
        const contentDisplay = document.getElementById('content-display');
        
        const htmlScrollBehavior = getComputedStyle(html).scrollBehavior;
        const bodyScrollBehavior = getComputedStyle(body).scrollBehavior;
        
        if (htmlScrollBehavior === 'smooth') {
            this.addConflict('CRITICAL: html has scroll-behavior: smooth - conflicts with programmatic scroll resets');
        }
        
        if (bodyScrollBehavior === 'smooth') {
            this.addConflict('CRITICAL: body has scroll-behavior: smooth - conflicts with programmatic scroll resets');
        }
        
        if (contentDisplay) {
            const contentScrollBehavior = getComputedStyle(contentDisplay).scrollBehavior;
            if (contentScrollBehavior === 'smooth') {
                this.addConflict('CRITICAL: content-display has scroll-behavior: smooth - conflicts with programmatic scroll resets');
            }
        }
    }

    implementFixes() {
        this.log('🔧 Implementing comprehensive fixes...');
        
        // Fix 1: Remove CSS scroll-behavior conflicts
        this.fixScrollBehavior();
        
        // Fix 2: Create single authoritative scroll handler
        this.createAuthoritativeScrollHandler();
        
        // Fix 3: Fix TOC highlighting timing
        this.fixTOCHighlighting();
        
        // Fix 4: Create proper scroll-to-top function
        this.createScrollToTopFunction();
    }

    fixScrollBehavior() {
        this.log('🎨 Fixing CSS scroll-behavior conflicts...');
        
        // Temporarily disable smooth scrolling for programmatic resets
        const style = document.createElement('style');
        style.id = 'scroll-behavior-fix';
        style.textContent = `
            /* Fix for programmatic scroll resets */
            .instant-scroll, .instant-scroll * {
                scroll-behavior: auto !important;
            }
            
            /* Keep smooth scrolling for user interactions */
            .smooth-scroll, .smooth-scroll * {
                scroll-behavior: smooth !important;
            }
        `;
        document.head.appendChild(style);
        this.log('✅ Added scroll behavior fix CSS');
    }

    createAuthoritativeScrollHandler() {
        this.log('🎧 Creating single authoritative scroll handler...');
        
        const contentDisplay = document.getElementById('content-display');
        if (!contentDisplay) return;
        
        // Remove any existing scroll listeners
        const newContentDisplay = contentDisplay.cloneNode(true);
        contentDisplay.parentNode.replaceChild(newContentDisplay, contentDisplay);
        this.log('🗑️ Removed all existing scroll listeners by cloning element');
        
        // Add single debounced scroll listener
        let scrollTimeout;
        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.tocGenerator && window.tocGenerator.updateActiveFromScroll) {
                    window.tocGenerator.updateActiveFromScroll();
                }
            }, 50);
        };
        
        newContentDisplay.addEventListener('scroll', handleScroll, { passive: true });
        this.log('✅ Added single authoritative scroll listener');
        
        // Store reference for future use
        window.fixedContentDisplay = newContentDisplay;
    }

    fixTOCHighlighting() {
        this.log('📋 Fixing TOC highlighting...');
        
        // Override tocGenerator.updateActiveFromScroll with improved version
        if (window.tocGenerator) {
            window.tocGenerator.updateActiveFromScroll = function() {
                if (!this.currentTopic || !this.currentTopic.tableOfContents) {
                    console.debug('TOC-DEBUG: No current topic or TOC data');
                    return;
                }
                
                const contentArea = document.getElementById('content-display') || window.fixedContentDisplay;
                if (!contentArea) {
                    console.debug('TOC-DEBUG: No content area found');
                    return;
                }
                
                // Find all headers in content
                const headers = contentArea.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
                if (headers.length === 0) {
                    console.debug('TOC-DEBUG: No headers found in content');
                    return;
                }
                
                const scrollTop = contentArea.scrollTop;
                const scrollHeight = contentArea.scrollHeight;
                const clientHeight = contentArea.clientHeight;
                
                let activeId = null;
                
                console.debug(`TOC-DEBUG: Scroll position ${scrollTop}/${scrollHeight}, viewport height ${clientHeight}`);
                
                // IMPROVED ALGORITHM: More reliable header detection
                if (scrollTop <= 20) {
                    // At or near top - use first header
                    activeId = headers[0].id;
                    console.debug('TOC-DEBUG: At top, using first header:', activeId);
                } else if (scrollTop + clientHeight >= scrollHeight - 20) {
                    // At or near bottom - use last header
                    activeId = headers[headers.length - 1].id;
                    console.debug('TOC-DEBUG: At bottom, using last header:', activeId);
                } else {
                    // Find the header closest to the top of the viewport
                    const viewportTop = scrollTop + 100; // 100px offset
                    
                    for (let i = headers.length - 1; i >= 0; i--) {
                        const header = headers[i];
                        const rect = header.getBoundingClientRect();
                        const contentRect = contentArea.getBoundingClientRect();
                        const headerTop = rect.top - contentRect.top + scrollTop;
                        
                        console.debug(`TOC-DEBUG: Header ${header.id} at position ${headerTop}, viewport top ${viewportTop}`);
                        
                        if (headerTop <= viewportTop) {
                            activeId = header.id;
                            console.debug(`TOC-DEBUG: Selected header ${header.id} at position ${headerTop}`);
                            break;
                        }
                    }
                    
                    // Fallback
                    if (!activeId) {
                        activeId = headers[0].id;
                        console.debug('TOC-DEBUG: Using fallback first header:', activeId);
                    }
                }
                
                // Update active item only if changed
                if (activeId && activeId !== this.activeItemId) {
                    console.log('TOC-DEBUG: Setting new active item:', activeId, 'Previous:', this.activeItemId);
                    this.setActiveItem(activeId);
                } else {
                    console.debug('TOC-DEBUG: No change needed, activeId:', activeId, 'current:', this.activeItemId);
                }
            };
            
            this.log('✅ Fixed TOC highlighting algorithm');
        }
    }

    createScrollToTopFunction() {
        this.log('⬆️ Creating proper scroll-to-top function...');
        
        // Create a reliable scroll-to-top function
        window.scrollToTopFixed = function() {
            const contentDisplay = document.getElementById('content-display') || window.fixedContentDisplay;
            if (!contentDisplay) {
                console.error('❌ Cannot find content display element for scroll reset');
                return;
            }
            
            // Temporarily disable smooth scrolling
            contentDisplay.classList.add('instant-scroll');
            
            // Reset scroll position
            contentDisplay.scrollTop = 0;
            
            console.log('✅ SCROLL-TO-TOP: Reset scroll position to 0');
            
            // Re-enable smooth scrolling after a short delay
            setTimeout(() => {
                contentDisplay.classList.remove('instant-scroll');
                contentDisplay.classList.add('smooth-scroll');
                
                // Trigger TOC update after scroll reset
                setTimeout(() => {
                    if (window.tocGenerator && window.tocGenerator.updateActiveFromScroll) {
                        console.log('🔄 SCROLL-TO-TOP: Updating TOC after scroll reset');
                        window.tocGenerator.updateActiveFromScroll();
                    }
                }, 100);
            }, 50);
        };
        
        this.log('✅ Created scrollToTopFixed function');
    }

    addConflict(message) {
        this.conflictsFound.push(message);
        this.log('⚠️ CONFLICT:', message);
    }

    reportResults() {
        this.log('📊 ANALYSIS COMPLETE');
        this.log('🔍 Conflicts found:', this.conflictsFound.length);
        
        if (this.conflictsFound.length > 0) {
            this.log('⚠️ CONFLICTS:');
            this.conflictsFound.forEach((conflict, index) => {
                this.log(`  ${index + 1}. ${conflict}`);
            });
        }
        
        this.log('✅ Fixes implemented - testing scroll behavior...');
        
        // Test the fixes
        setTimeout(() => this.testFixes(), 1000);
    }

    testFixes() {
        this.log('🧪 Testing scroll fixes...');
        
        const contentDisplay = document.getElementById('content-display') || window.fixedContentDisplay;
        if (!contentDisplay) {
            this.log('❌ Cannot test - content display not found');
            return;
        }
        
        // Test scroll-to-top
        this.log('⬆️ Testing scroll-to-top...');
        
        // Scroll down first
        contentDisplay.scrollTop = 500;
        setTimeout(() => {
            this.log('📍 Scrolled to position:', contentDisplay.scrollTop);
            
            // Test our fixed scroll-to-top
            window.scrollToTopFixed();
            
            setTimeout(() => {
                this.log('📍 After scroll-to-top:', contentDisplay.scrollTop);
                if (contentDisplay.scrollTop === 0) {
                    this.log('✅ Scroll-to-top working correctly!');
                } else {
                    this.log('❌ Scroll-to-top failed!');
                }
            }, 200);
        }, 100);
    }

    log(...args) {
        if (this.isDebugMode) {
            console.log('[SCROLL-DEBUG]', ...args);
        }
    }
}

// Initialize the debug manager
const scrollDebugManager = new ScrollDebugManager();
scrollDebugManager.init();

// Make it available globally
window.scrollDebugManager = scrollDebugManager;