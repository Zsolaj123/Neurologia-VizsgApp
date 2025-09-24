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
     * Generate TOC from topic
     * @param {Topic} topic - The topic object
     */
    generateTOC(topic) {
        try {
            if (!topic) {
                this.clearTOC();
                return;
            }
            
            if (!topic.tableOfContents || !Array.isArray(topic.tableOfContents) || topic.tableOfContents.length === 0) {
                this.clearTOC();
                return;
            }
            
            this.currentTopic = topic;
            const tocHTML = this.buildTOCHTML(topic.tableOfContents);
            this.renderTOC(tocHTML);
            
            // Emit event
            window.dispatchEvent(new CustomEvent('tocGenerated', {
                detail: { topicId: topic.id, itemCount: topic.tableOfContents.length }
            }));
            
            // Force initial TOC highlighting after generation
            setTimeout(() => {
                this.activeItemId = null; // Reset to force update
                this.updateActiveFromScroll();
            }, 150);
            
        } catch (error) {
            console.error('Error generating TOC for topic', topic?.id, ':', error);
            this.clearTOC();
        }
    }
    
    /**
     * Build TOC HTML
     * @private
     */
    buildTOCHTML(tocItems, level = 0) {
        if (!tocItems || tocItems.length === 0) {
            return '';
        }
        
        try {
            const html = tocItems.map((item) => {
                if (!item || !item.id || !item.text) {
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
            
            return html;
            
        } catch (error) {
            console.error('Error building TOC HTML at level', level, ':', error);
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
     * Clear TOC
     */
    clearTOC() {
        if (this.tocContainer) {
            this.tocContainer.innerHTML = '';
        }
        
        this.currentTopic = null;
        this.activeItemId = null;
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
     * Set active TOC item
     */
    setActiveItem(tocId) {
        if (!this.tocContainer) {
            return;
        }
        
        // Remove previous active
        const previousActive = this.tocContainer.querySelector('.toc-item.active');
        if (previousActive) {
            previousActive.classList.remove('active');
        }
        
        // Set new active
        const newActive = this.tocContainer.querySelector(`[data-toc-id="${tocId}"]`);
        
        if (newActive) {
            newActive.classList.add('active');
            this.activeItemId = tocId;
            
            // Ensure item is visible
            this.ensureItemVisible(newActive);
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
     * Update TOC based on scroll position
     */
    updateActiveFromScroll() {
        if (!this.currentTopic || !this.currentTopic.tableOfContents) {
            return;
        }
        
        const contentArea = document.getElementById('content-display');
        if (!contentArea) {
            return;
        }
        
        // Find all headers in content
        const headers = contentArea.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
        
        if (headers.length === 0) {
            return;
        }
        
        let activeId = null;
        
        // Use window scroll if content area isn't scrollable
        const isContentScrollable = contentArea.scrollHeight > contentArea.clientHeight;
        
        let scrollTop, scrollHeight, clientHeight;
        if (isContentScrollable) {
            scrollTop = contentArea.scrollTop;
            scrollHeight = contentArea.scrollHeight;
            clientHeight = contentArea.clientHeight;
        } else {
            scrollTop = window.scrollY;
            scrollHeight = document.documentElement.scrollHeight;
            clientHeight = window.innerHeight;
        }
        
        // Determine active header
        if (scrollTop <= 20) {
            // At the very top - always highlight first header
            activeId = headers[0].id;
        } else if (scrollTop + clientHeight >= scrollHeight - 20) {
            // At the bottom - highlight last header
            activeId = headers[headers.length - 1].id;
        } else {
            // Find the best header in viewport
            const viewportThreshold = 100;
            
            for (let i = headers.length - 1; i >= 0; i--) {
                const header = headers[i];
                const rect = header.getBoundingClientRect();
                
                let relativeTop;
                if (isContentScrollable) {
                    const contentRect = contentArea.getBoundingClientRect();
                    relativeTop = rect.top - contentRect.top;
                } else {
                    // For window scroll, use distance from top of viewport
                    relativeTop = rect.top;
                }
                
                if (relativeTop <= viewportThreshold) {
                    activeId = header.id;
                    break;
                }
            }
            
            // Fallback to first header if nothing found
            if (!activeId) {
                activeId = headers[0].id;
            }
        }
        
        if (activeId && activeId !== this.activeItemId) {
            this.setActiveItem(activeId);
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