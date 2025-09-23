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
        if (!topic || !topic.tableOfContents) {
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
    }
    
    /**
     * Build TOC HTML
     * @private
     */
    buildTOCHTML(tocItems, level = 0) {
        if (!tocItems || tocItems.length === 0) {
            return '';
        }
        
        const html = tocItems.map(item => {
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
     * Navigate to section
     * @private
     */
    navigateToSection(tocId) {
        // Update active state
        this.setActiveItem(tocId);
        
        // Find element in content
        const targetElement = document.getElementById(tocId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            console.debug('TOC: No current topic or TOC data');
            return;
        }
        
        const contentArea = document.getElementById('content-display');
        if (!contentArea) {
            console.debug('TOC: No content area found');
            return;
        }
        
        // Find all headers in content
        const headers = contentArea.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
        if (headers.length === 0) {
            console.debug('TOC: No headers found in content');
            return;
        }
        
        let activeId = null;
        const scrollTop = contentArea.scrollTop;
        const scrollHeight = contentArea.scrollHeight;
        const clientHeight = contentArea.clientHeight;
        
        // Check if we're at the bottom
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            // Highlight the last header
            activeId = headers[headers.length - 1].id;
        } else {
            // Find the header that's currently in view
            for (const header of headers) {
                const rect = header.getBoundingClientRect();
                const contentRect = contentArea.getBoundingClientRect();
                const relativeTop = rect.top - contentRect.top;
                
                if (relativeTop <= 50) { // 50px offset from top of content area
                    activeId = header.id;
                } else if (relativeTop > 50) {
                    break;
                }
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