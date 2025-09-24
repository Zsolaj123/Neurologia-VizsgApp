/**
 * Table of Contents Generator Module
 * Generates and manages TOC from parsed content
 */

class TocGenerator {
    constructor() {
        this.tocContainer = null;
        this.currentTopic = null;
        this.activeItemId = null;
        
        // Bind methods
        this.handleTocClick = this.handleTocClick.bind(this);
    }
    
    /**
     * Initialize TOC generator
     */
    initialize() {
        this.tocContainer = document.getElementById('toc-container');
        if (!this.tocContainer) {
            throw new InitializationError('TOC container not found');
        }
        
        // Set up event delegation
        this.tocContainer.addEventListener('click', this.handleTocClick);
    }
    
    /**
     * ENHANCED: Generate TOC from topic with comprehensive error handling
     * @param {Topic} topic - The topic object
     */
    generateTOC(topic) {
        console.log('🏗️ TOC DEBUG: generateTOC called with topic:', topic?.id);
        
        try {
            if (!topic) {
                console.log('❌ TOC DEBUG: No topic provided, clearing TOC');
                this.clearTOC();
                return;
            }
            
            console.log('🔍 TOC DEBUG: Topic object:', {
                id: topic.id,
                hasTableOfContents: !!topic.tableOfContents,
                tableOfContentsType: typeof topic.tableOfContents,
                tableOfContentsLength: topic.tableOfContents?.length,
                topicKeys: Object.keys(topic)
            });
            
            if (!topic.tableOfContents) {
                console.log('❌ TOC DEBUG: No tableOfContents property, clearing TOC');
                console.log('🔍 TOC DEBUG: Available topic properties:', Object.keys(topic));
                console.log('🚨 SIDEBAR ISSUE: Topic', topic.id, 'has no TOC - this will clear TOC and might hide sidebar');
                this.clearTOC();
                return;
            }
            
            if (!Array.isArray(topic.tableOfContents)) {
                console.log('❌ TOC DEBUG: tableOfContents is not an array:', typeof topic.tableOfContents);
                console.log('🔍 TOC DEBUG: tableOfContents value:', topic.tableOfContents);
                console.log('🚨 SIDEBAR ISSUE: Topic', topic.id, 'has invalid TOC data - this will clear TOC and might hide sidebar');
                this.clearTOC();
                return;
            }
            
            if (topic.tableOfContents.length === 0) {
                console.log('⚠️ TOC DEBUG: tableOfContents array is empty');
                console.log('🚨 SIDEBAR ISSUE: Topic', topic.id, 'has empty TOC - this will clear TOC and might hide sidebar');
                this.clearTOC();
                return;
            }
            
            console.log('📋 TOC DEBUG: Generating TOC with items:', topic.tableOfContents.length);
            console.log('🔍 TOC DEBUG: First TOC item sample:', topic.tableOfContents[0]);
            
            this.currentTopic = topic;
            
            const tocHTML = this.buildTOCHTML(topic.tableOfContents);
            console.log('🔨 TOC DEBUG: Built TOC HTML length:', tocHTML.length);
            console.log('🔨 TOC DEBUG: TOC HTML sample:', tocHTML.substring(0, 300));
            
            this.renderTOC(tocHTML);
            console.log('✅ TOC DEBUG: TOC rendered to container');
            
            // DEBUG: Verify TOC container state after rendering
            if (this.tocContainer) {
                console.log('📦 TOC DEBUG: TOC container after render:', {
                    innerHTML: this.tocContainer.innerHTML.substring(0, 500),
                    childElementCount: this.tocContainer.childElementCount,
                    containerVisible: this.tocContainer.offsetHeight > 0,
                    containerDisplay: getComputedStyle(this.tocContainer).display,
                    containerVisibility: getComputedStyle(this.tocContainer).visibility
                });
                
                // Check if right sidebar is visible
                const rightSidebar = document.getElementById('right-sidebar');
                if (rightSidebar) {
                    console.log('🔍 TOC DEBUG: Right sidebar state:', {
                        sidebarVisible: rightSidebar.offsetHeight > 0,
                        sidebarClasses: rightSidebar.className,
                        sidebarDisplay: getComputedStyle(rightSidebar).display,
                        sidebarVisibility: getComputedStyle(rightSidebar).visibility,
                        sidebarWidth: getComputedStyle(rightSidebar).width
                    });
                } else {
                    console.log('❌ TOC DEBUG: Right sidebar element not found');
                }
                
                const tocItems = this.tocContainer.querySelectorAll('[data-toc-id]');
                console.log('📋 TOC DEBUG: TOC items after render:', tocItems.length);
                if (tocItems.length > 0) {
                    console.log('📋 TOC DEBUG: First TOC item:', tocItems[0].outerHTML.substring(0, 200));
                }
            }
            
            // DEBUG: Check if headers exist in content
            setTimeout(() => {
                const contentArea = document.getElementById('content-display');
                const headers = contentArea?.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
                console.log('🔍 TOC DEBUG: Found headers in content after render:', headers?.length || 0);
                if (headers?.length > 0) {
                    console.log('📄 TOC DEBUG: Header IDs:', Array.from(headers).map(h => h.id));
                    console.log('📄 TOC DEBUG: First header sample:', headers[0]?.outerHTML?.substring(0, 200));
                }
            }, 100);
            
            // Emit event
            window.dispatchEvent(new CustomEvent('tocGenerated', {
                detail: { topicId: topic.id, itemCount: topic.tableOfContents.length }
            }));
            
            // CRITICAL FIX: Force initial TOC highlighting after generation
            setTimeout(() => {
                console.log('🔧 TOC FIX: Force updating TOC highlighting after generation');
                this.activeItemId = null; // Reset to force update
                this.updateActiveFromScroll();
            }, 150);
            
        } catch (error) {
            console.error('💥 TOC DEBUG: Error generating TOC for topic', topic?.id, ':', error);
            console.error('💥 TOC DEBUG: Error stack:', error.stack);
            console.log('🔍 TOC DEBUG: Topic data at error:', topic);
            this.clearTOC();
        }
    }
    
    /**
     * ENHANCED: Build TOC HTML with error handling
     * @private
     */
    buildTOCHTML(tocItems, level = 0) {
        if (!tocItems || tocItems.length === 0) {
            console.log('⚠️ TOC BUILD DEBUG: No TOC items provided at level', level);
            return '';
        }
        
        console.log(`🔨 TOC BUILD DEBUG: Building HTML for ${tocItems.length} items at level ${level}`);
        
        try {
            const html = tocItems.map((item, index) => {
                console.log(`🔍 TOC BUILD DEBUG: Processing item ${index}:`, {
                    id: item?.id,
                    text: item?.text?.substring(0, 50),
                    level: item?.level,
                    hasChildren: !!(item?.children && item.children.length > 0)
                });
                
                if (!item || !item.id || !item.text) {
                    console.error('❌ TOC BUILD DEBUG: Invalid TOC item:', item);
                    return '';
                }
                
                const indent = level * 16; // 16px per level
                const hasChildren = item.children && item.children.length > 0;
                
                let itemHTML = `
                    <div class="toc-item ${hasChildren ? 'expanded' : ''}" data-toc-id="${item.id}" data-level="${item.level}" style="padding-left: ${indent}px;">
                        <a href="#${item.id}" class="toc-link">
                            ${hasChildren ? '<span class="toc-arrow">▼</span>' : '<span class="toc-bullet">•</span>'}
                            <span class="toc-text">${this.escapeHtml(item.text)}</span>
                        </a>
                    </div>
                `;
                
                // Add children recursively
                if (hasChildren) {
                    itemHTML += `<div class="toc-children expanded" data-parent="${item.id}">`;
                    itemHTML += this.buildTOCHTML(item.children, level + 1);
                    itemHTML += '</div>';
                }
                
                return itemHTML;
            }).join('');
            
            console.log(`✅ TOC BUILD DEBUG: Built HTML for level ${level}, length:`, html.length);
            return html;
            
        } catch (error) {
            console.error('💥 TOC BUILD DEBUG: Error building TOC HTML at level', level, ':', error);
            console.error('💥 TOC BUILD DEBUG: Problematic items:', tocItems);
            return '';
        }
    }
    
    /**
     * Render TOC to container
     * @private
     */
    renderTOC(html) {
        if (!this.tocContainer) return;
        
        this.tocContainer.innerHTML = `
            <div class="toc-header">
                <button class="toc-toggle" id="toc-expand-all">Összes kinyitása</button>
            </div>
            <div class="toc-content">
                ${html || '<p class="toc-empty">Nincs tartalomjegyzék</p>'}
            </div>
        `;
        
        // Set up expand/collapse button
        const expandButton = document.getElementById('toc-expand-all');
        if (expandButton) {
            expandButton.addEventListener('click', () => this.toggleAllItems());
        }
    }
    
    /**
     * DEBUG: Clear TOC and check sidebar visibility
     */
    clearTOC() {
        console.log('🧹 TOC CLEAR DEBUG: clearTOC called');
        
        // Check sidebar state BEFORE clearing
        const rightSidebar = document.getElementById('right-sidebar');
        if (rightSidebar) {
            console.log('📊 SIDEBAR DEBUG: Right sidebar BEFORE clear:', {
                visible: rightSidebar.offsetHeight > 0,
                classes: rightSidebar.className,
                display: getComputedStyle(rightSidebar).display,
                visibility: getComputedStyle(rightSidebar).visibility,
                width: getComputedStyle(rightSidebar).width,
                height: getComputedStyle(rightSidebar).height
            });
        }
        
        if (this.tocContainer) {
            console.log('🧹 TOC CLEAR DEBUG: Clearing TOC container content');
            this.tocContainer.innerHTML = '';
            
            // Check if clearing TOC affects sidebar
            setTimeout(() => {
                if (rightSidebar) {
                    console.log('📊 SIDEBAR DEBUG: Right sidebar AFTER clear:', {
                        visible: rightSidebar.offsetHeight > 0,
                        classes: rightSidebar.className,
                        display: getComputedStyle(rightSidebar).display,
                        visibility: getComputedStyle(rightSidebar).visibility
                    });
                }
            }, 50);
        } else {
            console.log('❌ TOC CLEAR DEBUG: TOC container not found');
        }
        
        this.currentTopic = null;
        this.activeItemId = null;
        console.log('✅ TOC CLEAR DEBUG: TOC cleared and state reset');
    }
    
    /**
     * Handle TOC item click
     * @private
     */
    handleTocClick(event) {
        const tocLink = event.target.closest('.toc-link');
        if (!tocLink) return;
        
        event.preventDefault();
        
        const tocItem = tocLink.closest('.toc-item');
        const tocId = tocItem.dataset.tocId;
        
        // Handle arrow click for expand/collapse
        if (event.target.classList.contains('toc-arrow')) {
            this.toggleItem(tocId);
            return;
        }
        
        // Navigate to section
        this.navigateToSection(tocId);
    }
    
    /**
     * Navigate to section - ENHANCED for better scrolling
     * @private
     */
    navigateToSection(tocId) {
        // Update active state
        this.setActiveItem(tocId);
        
        // Find element in content
        const targetElement = document.getElementById(tocId);
        const contentDisplay = document.getElementById('content-display');
        
        if (targetElement && contentDisplay) {
            // Enable smooth scrolling for this navigation
            contentDisplay.classList.add('smooth-scroll');
            
            // Scroll to the element
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Remove smooth scroll class after animation
            setTimeout(() => {
                contentDisplay.classList.remove('smooth-scroll');
            }, 1000);
        }
        
        // Emit navigation event
        window.dispatchEvent(new CustomEvent('tocNavigation', {
            detail: { tocId, topicId: this.currentTopic?.id }
        }));
    }
    
    /**
     * DEBUG: Set active TOC item with enhanced debugging
     */
    setActiveItem(tocId) {
        console.log('🎯 TOC ACTIVE DEBUG: setActiveItem called with:', tocId);
        
        if (!this.tocContainer) {
            console.log('❌ TOC ACTIVE DEBUG: TOC container not found');
            return;
        }
        
        // Remove previous active
        const previousActive = this.tocContainer.querySelector('.toc-item.active');
        console.log('📤 TOC ACTIVE DEBUG: Previous active item:', previousActive?.dataset?.tocId || 'none');
        if (previousActive) {
            previousActive.classList.remove('active');
            console.log('✅ TOC ACTIVE DEBUG: Removed active class from previous');
        }
        
        // Set new active
        const newActive = this.tocContainer.querySelector(`[data-toc-id="${tocId}"]`);
        console.log('🔍 TOC ACTIVE DEBUG: Looking for TOC item with data-toc-id:', tocId);
        console.log('📋 TOC ACTIVE DEBUG: Found element:', newActive);
        
        if (newActive) {
            newActive.classList.add('active');
            this.activeItemId = tocId;
            console.log('✅ TOC ACTIVE DEBUG: Added active class to element');
            console.log('🎨 TOC ACTIVE DEBUG: Element classes after adding:', newActive.className);
            console.log('🎨 TOC ACTIVE DEBUG: Element computed style background:', getComputedStyle(newActive).backgroundColor);
            
            // Ensure item is visible
            this.ensureItemVisible(newActive);
        } else {
            console.log('❌ TOC ACTIVE DEBUG: Could not find TOC item with data-toc-id:', tocId);
            // Show all available TOC items
            const allTocItems = this.tocContainer.querySelectorAll('[data-toc-id]');
            console.log('🔍 TOC ACTIVE DEBUG: Available TOC item IDs:', Array.from(allTocItems).map(item => item.dataset.tocId));
        }
    }
    
    /**
     * Toggle item expansion
     * @private
     */
    toggleItem(tocId) {
        const item = this.tocContainer.querySelector(`[data-toc-id="${tocId}"]`);
        const children = this.tocContainer.querySelector(`[data-parent="${tocId}"]`);
        const arrow = item?.querySelector('.toc-arrow');
        
        if (!children || !arrow) return;
        
        const isExpanded = children.classList.contains('expanded');
        
        if (isExpanded) {
            children.classList.remove('expanded');
            item.classList.remove('expanded');
            arrow.textContent = '▶';
        } else {
            children.classList.add('expanded');
            item.classList.add('expanded');
            arrow.textContent = '▼';
        }
    }
    
    /**
     * Toggle all items
     * @private
     */
    toggleAllItems() {
        const allChildren = this.tocContainer.querySelectorAll('.toc-children');
        const allArrows = this.tocContainer.querySelectorAll('.toc-arrow');
        const expandButton = document.getElementById('toc-expand-all');
        
        const hasCollapsed = Array.from(allChildren).some(child => !child.classList.contains('expanded'));
        
        if (hasCollapsed) {
            // Expand all
            allChildren.forEach(child => {
                child.classList.add('expanded');
                const parentItem = child.previousElementSibling;
                if (parentItem && parentItem.classList.contains('toc-item')) {
                    parentItem.classList.add('expanded');
                }
            });
            allArrows.forEach(arrow => arrow.textContent = '▼');
            if (expandButton) expandButton.textContent = 'Összes becsukása';
        } else {
            // Collapse all
            allChildren.forEach(child => {
                child.classList.remove('expanded');
                const parentItem = child.previousElementSibling;
                if (parentItem && parentItem.classList.contains('toc-item')) {
                    parentItem.classList.remove('expanded');
                }
            });
            allArrows.forEach(arrow => arrow.textContent = '▶');
            if (expandButton) expandButton.textContent = 'Összes kinyitása';
        }
    }
    
    /**
     * Ensure item is visible in scrollable container
     * @private
     */
    ensureItemVisible(item) {
        // First ensure all parent items are expanded
        let parent = item.parentElement;
        while (parent && parent !== this.tocContainer) {
            if (parent.classList.contains('toc-children') && !parent.classList.contains('expanded')) {
                // Expand this parent
                parent.classList.add('expanded');
                const parentItem = parent.previousElementSibling;
                if (parentItem && parentItem.classList.contains('toc-item')) {
                    parentItem.classList.add('expanded');
                    const arrow = parentItem.querySelector('.toc-arrow');
                    if (arrow) arrow.textContent = '▼';
                }
            }
            parent = parent.parentElement;
        }
        
        // Then scroll into view if needed
        const container = this.tocContainer.querySelector('.toc-content');
        if (!container) return;
        
        const itemRect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    /**
     * DEBUG: Update TOC based on scroll position with targeted debugging
     */
    updateActiveFromScroll() {
        console.log('🔍 TOC SCROLL DEBUG: updateActiveFromScroll called');
        
        if (!this.currentTopic || !this.currentTopic.tableOfContents) {
            console.log('❌ TOC SCROLL DEBUG: No current topic or TOC data');
            return;
        }
        
        const contentArea = document.getElementById('content-display');
        if (!contentArea) {
            console.log('❌ TOC SCROLL DEBUG: Content area not found');
            return;
        }
        
        // Find all headers in content
        const headers = contentArea.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
        console.log('📋 TOC SCROLL DEBUG: Found headers:', headers.length);
        
        if (headers.length === 0) {
            console.log('❌ TOC SCROLL DEBUG: No headers found in content');
            console.log('📄 TOC SCROLL DEBUG: Content sample:', contentArea.innerHTML.substring(0, 300));
            return;
        }
        
        // Log all header IDs
        const headerIds = Array.from(headers).map(h => h.id);
        console.log('📄 TOC SCROLL DEBUG: Header IDs found:', headerIds);
        
        let activeId = null;
        const scrollTop = contentArea.scrollTop;
        const scrollHeight = contentArea.scrollHeight;
        const clientHeight = contentArea.clientHeight;
        
        console.log('📊 TOC SCROLL DEBUG: Scroll position:', { scrollTop, scrollHeight, clientHeight });
        
        // Determine active header
        if (scrollTop <= 20) {
            // At the very top - always highlight first header
            activeId = headers[0].id;
            console.log('📍 TOC SCROLL DEBUG: At top, selecting first header:', activeId);
        } else if (scrollTop + clientHeight >= scrollHeight - 20) {
            // At the bottom - highlight last header
            activeId = headers[headers.length - 1].id;
            console.log('📍 TOC SCROLL DEBUG: At bottom, selecting last header:', activeId);
        } else {
            // Find the best header in viewport
            const viewportThreshold = 100;
            console.log('🔍 TOC SCROLL DEBUG: Finding header in viewport');
            
            for (let i = headers.length - 1; i >= 0; i--) {
                const header = headers[i];
                const rect = header.getBoundingClientRect();
                const contentRect = contentArea.getBoundingClientRect();
                const relativeTop = rect.top - contentRect.top;
                
                console.log(`📋 TOC SCROLL DEBUG: Header ${i} (${header.id}) - relativeTop: ${relativeTop}`);
                
                if (relativeTop <= viewportThreshold) {
                    activeId = header.id;
                    console.log('✅ TOC SCROLL DEBUG: Selected header:', activeId);
                    break;
                }
            }
            
            // Fallback to first header if nothing found
            if (!activeId) {
                activeId = headers[0].id;
                console.log('🔄 TOC SCROLL DEBUG: Fallback to first header:', activeId);
            }
        }
        
        console.log('🎯 TOC SCROLL DEBUG: activeId determined:', activeId, 'current activeItemId:', this.activeItemId);
        
        if (activeId && activeId !== this.activeItemId) {
            console.log('🔄 TOC SCROLL DEBUG: Setting new active item:', activeId);
            this.setActiveItem(activeId);
        } else {
            console.log('⏭️ TOC SCROLL DEBUG: No change needed or activeId is null');
            
            // DEBUG: Check if the current active item actually has the active class
            if (activeId && this.tocContainer) {
                const currentActiveElement = this.tocContainer.querySelector(`[data-toc-id="${activeId}"]`);
                if (currentActiveElement) {
                    const hasActiveClass = currentActiveElement.classList.contains('active');
                    const computedStyle = getComputedStyle(currentActiveElement);
                    console.log('🎨 TOC CSS DEBUG: Element has active class:', hasActiveClass);
                    console.log('🎨 TOC CSS DEBUG: Element className:', currentActiveElement.className);
                    console.log('🎨 TOC CSS DEBUG: Computed backgroundColor:', computedStyle.backgroundColor);
                    console.log('🎨 TOC CSS DEBUG: Computed borderLeft:', computedStyle.borderLeft);
                    console.log('🎨 TOC CSS DEBUG: Computed color:', computedStyle.color);
                    console.log('🎨 TOC CSS DEBUG: Computed fontWeight:', computedStyle.fontWeight);
                    console.log('🎨 TOC CSS DEBUG: Element HTML:', currentActiveElement.outerHTML.substring(0, 300));
                } else {
                    console.log('❌ TOC CSS DEBUG: Could not find element for activeId:', activeId);
                }
            }
        }
    }
    
    /**
     * Escape HTML characters
     * @private
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Get TOC statistics
     */
    getStats() {
        if (!this.currentTopic || !this.currentTopic.tableOfContents) {
            return { totalItems: 0, maxDepth: 0 };
        }
        
        let totalItems = 0;
        let maxDepth = 0;
        
        const countItems = (items, depth = 1) => {
            for (const item of items) {
                totalItems++;
                maxDepth = Math.max(maxDepth, depth);
                if (item.children && item.children.length > 0) {
                    countItems(item.children, depth + 1);
                }
            }
        };
        
        countItems(this.currentTopic.tableOfContents);
        
        return { totalItems, maxDepth };
    }
    
    /**
     * Destroy TOC generator
     */
    destroy() {
        if (this.tocContainer) {
            this.tocContainer.removeEventListener('click', this.handleTocClick);
        }
        this.clearTOC();
    }
}

// Create singleton instance
const tocGenerator = new TocGenerator();

// Make available globally
window.tocGenerator = tocGenerator;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TocGenerator, tocGenerator };
}