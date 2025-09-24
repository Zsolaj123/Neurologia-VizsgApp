/**
 * UI Manager Module
 * Manages all UI interactions and updates
 */

class UIManager {
    constructor() {
        // DOM elements
        this.elements = {
            topicMenu: null,
            contentDisplay: null,
            sectionTabs: null,
            loadingOverlay: null,
            errorContainer: null,
            leftSidebar: null,
            rightSidebar: null,
            appContainer: null
        };
        
        // Current state
        this.currentTopic = null;
        this.currentSection = 'reszletes';
        this.isLoading = false;
        
        // Error dismiss timer
        this.errorTimer = null;
        
        // Bind methods
        this.handleTopicClick = this.handleTopicClick.bind(this);
        this.handleSectionClick = this.handleSectionClick.bind(this);
        this.handleKeyboardShortcuts = this.handleKeyboardShortcuts.bind(this);
        this.handleContentScroll = this.handleContentScroll.bind(this);
    }
    
    /**
     * Debounce function for scroll events
     * @private
     */
    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Initialize UI Manager
     */
    initialize() {
        // Get DOM elements
        this.elements.topicMenu = document.getElementById('topic-menu');
        this.elements.contentDisplay = document.getElementById('content-display');
        this.elements.sectionTabs = document.getElementById('section-tabs');
        this.elements.loadingOverlay = document.getElementById('loading-overlay');
        this.elements.errorContainer = document.getElementById('error-container');
        this.elements.leftSidebar = document.getElementById('left-sidebar');
        this.elements.rightSidebar = document.getElementById('right-sidebar');
        this.elements.appContainer = document.getElementById('app-container');
        
        // Validate required elements
        const required = ['topicMenu', 'contentDisplay', 'sectionTabs'];
        for (const elem of required) {
            if (!this.elements[elem]) {
                throw new InitializationError(`Required element ${elem} not found`);
            }
        }
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load UI state
        this.loadUIState();
        
        // Populate topic menu
        this.populateTopicMenu();
        
        // Initialize TOC generator
        tocGenerator.initialize();
        
        appState.initialized = true;
    }
    
    /**
     * Set up event listeners
     * @private
     */
    setupEventListeners() {
        // Topic menu clicks
        this.elements.topicMenu.addEventListener('click', this.handleTopicClick);
        
        // Section tab clicks
        this.elements.sectionTabs.addEventListener('click', this.handleSectionClick);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts);
        
        // Content scroll for TOC sync - Auto-detect scrollable element
        if (this.elements.contentDisplay) {
            // Test if content display element is scrollable after content loads
            setTimeout(() => {
                const isContentScrollable = this.elements.contentDisplay.scrollHeight > this.elements.contentDisplay.clientHeight;
                
                if (isContentScrollable) {
                    // Content display is scrollable - use it for scroll events
                    this.elements.contentDisplay.addEventListener('scroll', 
                        this.debounce(() => this.handleContentScroll(), 50)
                    );
                } else {
                    // Content display not scrollable - use window scroll events
                    window.addEventListener('scroll', 
                        this.debounce(() => this.handleContentScroll(), 50)
                    );
                }
            }, 1000);
            
        } else {
            // Fallback to window scroll if content display not found
            window.addEventListener('scroll', 
                this.debounce(() => this.handleContentScroll(), 50)
            );
        }
        
        // Sidebar toggle buttons - Removed to prevent conflicts with sidebar-manager-optimized.js
        // The optimized sidebar manager handles all toggle button functionality
        
        // Window resize
        window.addEventListener('resize', 
            this.debounce(() => this.adjustLayout(), 200)
        );
        
        // Custom events
        window.addEventListener('tocNavigation', (e) => {
            this.handleTocNavigation(e.detail);
        });
    }
    
    /**
     * Populate topic menu
     * @private
     */
    populateTopicMenu() {
        const topics = topicLoader.getAvailableTopics();
        const ranges = ['1-20', '21-40', '41-59', '60-79', '80-99', '100-119', '120-139', '140-159', '160-179', '180-199', '200-219', '220-239', '240-259'];
        
        let html = '';
        
        // Structure for organizing topics by main categories
        const categories = [
            {
                id: 'neuroanat',
                title: 'Neuroanatómia',
                ranges: ['1-20', '21-40', '41-59'],
                collapsed: false
            },
            {
                id: 'clinical',
                title: 'Vizsgálómódszerek, Általános Klinikum',
                ranges: ['60-79', '80-99', '100-119', '120-139', '140-159', '160-179'],
                collapsed: false
            },
            {
                id: 'detailed-clinical',
                title: 'Részletes Klinikum',
                ranges: ['180-199', '200-219', '220-239', '240-259'],
                collapsed: false
            }
        ];
        
        // Load collapsed states from localStorage
        const collapsedStates = this.loadCollapsedStates();
        
        categories.forEach(category => {
            const categoryCollapsed = collapsedStates.categories[category.id] || false;
            
            html += `
                <div class="topic-category ${categoryCollapsed ? 'collapsed' : ''}" data-category="${category.id}">
                    <div class="category-header" onclick="uiManager.toggleCategory('${category.id}')">
                        <span class="collapse-icon">${categoryCollapsed ? '▶' : '▼'}</span>
                        <h3 class="category-title">${category.title}</h3>
                    </div>
                    <div class="category-content">`;
            
            category.ranges.forEach(range => {
                const rangeTopics = topics.filter(t => this.getTopicRange(t.id) === range);
                const rangeCollapsed = collapsedStates.ranges[range] || false;
                
                if (rangeTopics.length > 0) {
                    html += `
                        <div class="topic-range ${rangeCollapsed ? 'collapsed' : ''}" data-range="${range}">
                            <div class="range-header" onclick="uiManager.toggleRange('${range}')">
                                <span class="collapse-icon">${rangeCollapsed ? '▶' : '▼'}</span>
                                <span class="range-title">${range}. tételek</span>
                                <span class="range-count">(${rangeTopics.length})</span>
                            </div>
                            <div class="range-topics">`;
                    
                    for (const topic of rangeTopics) {
                        // Don't add number prefix if title already starts with number
                        const titleStartsWithNumber = /^\d+\./.test(topic.title);
                        html += `
                            <button class="topic-item" data-topic-id="${topic.id}">
                                ${titleStartsWithNumber ? '' : `<span class="topic-number">${topic.id}.</span>`}
                                <span class="topic-title">${topic.title}</span>
                            </button>
                        `;
                    }
                    
                    html += '</div></div>';
                }
            });
            
            html += '</div></div>';
        });
        
        // Add expand/collapse all button
        html = `
            <div class="topic-menu-controls">
                <button class="control-btn" id="topic-expand-all" onclick="uiManager.toggleAllTopics()">Összes kinyitása</button>
            </div>
        ` + html;
        
        this.elements.topicMenu.innerHTML = html;
        
        // Debug: Verify onClick handlers will work
        console.log('🏗️ Topic menu populated with ranges');
        console.log('🔧 window.uiManager available:', !!window.uiManager);
        console.log('🔧 this.toggleRange method:', typeof this.toggleRange);
    }
    
    /**
     * Load collapsed states from localStorage
     * @private
     */
    loadCollapsedStates() {
        const saved = localStorage.getItem('topicMenuCollapsedStates');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            categories: {},
            ranges: {}
        };
    }
    
    /**
     * Save collapsed states to localStorage
     * @private
     */
    saveCollapsedStates(states) {
        localStorage.setItem('topicMenuCollapsedStates', JSON.stringify(states));
    }
    
    /**
     * Toggle category collapse state
     * @param {string} categoryId - The category ID
     */
    toggleCategory(categoryId) {
        const categoryEl = this.elements.topicMenu.querySelector(`[data-category="${categoryId}"]`);
        if (!categoryEl) return;
        
        const isCollapsed = categoryEl.classList.contains('collapsed');
        categoryEl.classList.toggle('collapsed');
        
        // Update icon
        const icon = categoryEl.querySelector('.collapse-icon');
        if (icon) {
            icon.textContent = isCollapsed ? '▼' : '▶';
        }
        
        // Save state
        const states = this.loadCollapsedStates();
        states.categories[categoryId] = !isCollapsed;
        this.saveCollapsedStates(states);
    }
    
    /**
     * Toggle range collapse state - ENHANCED
     * @param {string} range - The range (e.g., '1-20')
     */
    toggleRange(range, event = null) {
        console.log('🔄 toggleRange called for:', range);
        
        const rangeEl = this.elements.topicMenu.querySelector(`[data-range="${range}"]`);
        if (!rangeEl) {
            console.error('❌ Range element not found for:', range);
            return;
        }
        
        const isCollapsed = rangeEl.classList.contains('collapsed');
        console.log('📊 Current collapsed state:', isCollapsed);
        
        rangeEl.classList.toggle('collapsed');
        
        // Update icon
        const icon = rangeEl.querySelector('.collapse-icon');
        if (icon) {
            icon.textContent = isCollapsed ? '▼' : '▶';
            console.log('🔄 Updated icon to:', icon.textContent);
        }
        
        // Save state
        const states = this.loadCollapsedStates();
        states.ranges[range] = !isCollapsed;
        this.saveCollapsedStates(states);
        
        console.log('✅ Range toggle completed, new state:', !isCollapsed);
        
        // Stop event propagation if event exists
        if (event) {
            event.stopPropagation();
        }
    }
    
    /**
     * Toggle all categories and ranges
     */
    toggleAllTopics() {
        const allCategories = this.elements.topicMenu.querySelectorAll('.topic-category');
        const allRanges = this.elements.topicMenu.querySelectorAll('.topic-range');
        const expandButton = document.getElementById('topic-expand-all');
        
        // Check if any are collapsed
        const hasCollapsed = Array.from(allCategories).some(el => el.classList.contains('collapsed')) ||
                           Array.from(allRanges).some(el => el.classList.contains('collapsed'));
        
        if (hasCollapsed) {
            // Expand all
            this.expandAll();
            if (expandButton) expandButton.textContent = 'Összes bezárása';
        } else {
            // Collapse all
            this.collapseAll();
            if (expandButton) expandButton.textContent = 'Összes kinyitása';
        }
    }
    
    /**
     * Expand all categories and ranges
     */
    expandAll() {
        // Expand all categories
        this.elements.topicMenu.querySelectorAll('.topic-category').forEach(el => {
            el.classList.remove('collapsed');
            const icon = el.querySelector('.category-header .collapse-icon');
            if (icon) icon.textContent = '▼';
        });
        
        // Expand all ranges
        this.elements.topicMenu.querySelectorAll('.topic-range').forEach(el => {
            el.classList.remove('collapsed');
            const icon = el.querySelector('.range-header .collapse-icon');
            if (icon) icon.textContent = '▼';
        });
        
        // Clear saved states
        this.saveCollapsedStates({ categories: {}, ranges: {} });
    }
    
    /**
     * Collapse all categories and ranges
     */
    collapseAll() {
        const states = { categories: {}, ranges: {} };
        
        // Collapse all categories
        this.elements.topicMenu.querySelectorAll('.topic-category').forEach(el => {
            el.classList.add('collapsed');
            const icon = el.querySelector('.category-header .collapse-icon');
            if (icon) icon.textContent = '▶';
            const categoryId = el.dataset.category;
            if (categoryId) states.categories[categoryId] = true;
        });
        
        // Collapse all ranges
        this.elements.topicMenu.querySelectorAll('.topic-range').forEach(el => {
            el.classList.add('collapsed');
            const icon = el.querySelector('.range-header .collapse-icon');
            if (icon) icon.textContent = '▶';
            const range = el.dataset.range;
            if (range) states.ranges[range] = true;
        });
        
        // Save states
        this.saveCollapsedStates(states);
    }
    
    /**
     * Get topic range
     * @private
     */
    getTopicRange(topicId) {
        if (topicId <= 20) return '1-20';
        if (topicId <= 40) return '21-40';
        if (topicId <= 59) return '41-59';
        if (topicId <= 79) return '60-79';
        if (topicId <= 99) return '80-99';
        if (topicId <= 119) return '100-119';
        if (topicId <= 139) return '120-139';
        if (topicId <= 159) return '140-159';
        if (topicId <= 179) return '160-179';
        if (topicId <= 199) return '180-199';
        if (topicId <= 219) return '200-219';
        if (topicId <= 239) return '220-239';
        return '240-259';
    }
    
    /**
     * Handle topic click
     * @private
     */
    async handleTopicClick(event) {
        const topicItem = event.target.closest('.topic-item');
        if (!topicItem) return;
        
        const topicId = parseInt(topicItem.dataset.topicId);
        if (isNaN(topicId)) return;
        
        // Don't reload if already current
        if (this.currentTopic && this.currentTopic.id === topicId) {
            return;
        }
        
        await this.loadTopic(topicId);
    }
    
    /**
     * Load a topic
     * @param {number} topicId - The topic ID
     */
    async loadTopic(topicId) {
        try {
            this.showLoading(true);
            
            // Load topic
            const topic = await topicLoader.loadTopic(topicId);
            
            // Update state
            this.currentTopic = topic;
            appState.setCurrentTopic(topic);
            
            // Update UI
            this.displayTopic(topic);
            this.updateActiveTopicItem(topicId);
            
            // Generate TOC
            tocGenerator.generateTOC(topic);
            
            // Reset to detailed section
            this.switchSection('reszletes');
            
            // Scroll to top of content
            if (this.elements.contentDisplay) {
                this.elements.contentDisplay.scrollTop = 0;
            }
            
            // Save UI state
            appState.ui.currentTopicId = topicId;
            appState.saveUIState();
            
            // Emit event
            window.dispatchEvent(new CustomEvent('topicDisplayed', {
                detail: { topicId, topic }
            }));
            
        } catch (error) {
            appState.logError(error, 'topic-load');
            this.showError(ErrorUtils.formatForDisplay(error));
        } finally {
            this.showLoading(false);
        }
    }
    
    /**
     * Display topic content
     * @private
     */
    displayTopic(topic) {
        if (!topic) {
            this.elements.contentDisplay.innerHTML = '';
            return;
        }
        
        // Display current section
        const section = topic.getSection(this.currentSection);
        
        if (!section || section.isEmpty) {
            this.displayEmptySection(this.currentSection);
        } else {
            const wrappedContent = this.wrapContent(section.content);
            this.elements.contentDisplay.innerHTML = wrappedContent;
            
            // Format tables after content is loaded
            this.formatTables();
        }
        
        // Update section tabs
        this.updateSectionTabs(topic);
        
        // Scroll to top after content is rendered
        requestAnimationFrame(() => {
            this.scrollToTopInstant();
        });
    }
    
    /**
     * SIMPLIFIED: Clean scroll to top without excessive debugging
     * @private
     */
    scrollToTopInstant() {
        if (!this.elements.contentDisplay) {
            console.error('❌ contentDisplay element not found');
            return;
        }
        
        const element = this.elements.contentDisplay;
        
        // Simple, direct scroll to top
        element.style.scrollBehavior = 'auto';
        element.scrollTop = 0;
        element.scrollTo({ top: 0, behavior: 'auto' });
        
        // Also try window scroll (in case content scrolls with page)
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Reset scroll behavior after a brief moment
        setTimeout(() => {
            element.style.scrollBehavior = '';
            
            // Update TOC highlighting
            if (window.tocGenerator) {
                tocGenerator.updateActiveFromScroll();
            }
        }, 50);
    }

    /**
     * Wrap content with proper structure
     * @private
     */
    wrapContent(html) {
        return `<div class="topic-content">${html}</div>`;
    }
    
    /**
     * Format tables for better display and responsive behavior
     * @private
     */
    formatTables() {
        const tables = this.elements.contentDisplay.querySelectorAll('table');
        
        tables.forEach(table => {
            // Skip if table is already wrapped
            if (table.parentElement.classList.contains('table-container')) {
                return;
            }
            
            // Check if table is wide enough to need scrolling
            const tableWidth = table.offsetWidth;
            const containerWidth = this.elements.contentDisplay.offsetWidth - 64; // Account for padding
            
            if (tableWidth > containerWidth) {
                // Wrap wide tables in scrollable container
                const wrapper = document.createElement('div');
                wrapper.classList.add('table-container');
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
            
            // Ensure table has proper styling class
            table.classList.add('formatted-table');
        });
    }
    
    /**
     * Display empty section message
     * @private
     */
    displayEmptySection(sectionType) {
        const messages = {
            'reszletes': 'Nincs elérhető részletes leírás ehhez a tételhez.',
            'osszefoglalas': 'Nincs elérhető összefoglalás ehhez a tételhez.',
            'kepek': 'Nincsenek elérhető képek vagy diagrammok ehhez a tételhez.'
        };
        
        this.elements.contentDisplay.innerHTML = `
            <div class="empty-section">
                <p>${messages[sectionType] || 'Ez a szakasz üres.'}</p>
            </div>
        `;
    }
    
    /**
     * Update section tabs
     * @private
     */
    updateSectionTabs(topic) {
        const tabs = [
            { id: 'reszletes', label: 'Részletes', available: true },
            { id: 'osszefoglalas', label: 'Összefoglalás', available: topic.hasSection('osszefoglalas') },
            { id: 'kepek', label: 'Képek', available: topic.hasSection('kepek') }
        ];
        
        let html = '';
        for (const tab of tabs) {
            const isActive = tab.id === this.currentSection;
            const isDisabled = !tab.available;
            
            html += `
                <button class="section-tab ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}"
                        data-section="${tab.id}"
                        ${isDisabled ? 'disabled' : ''}>
                    ${tab.label}
                    ${isDisabled ? '<span class="unavailable">(nem elérhető)</span>' : ''}
                </button>
            `;
        }
        
        this.elements.sectionTabs.innerHTML = html;
    }
    
    /**
     * Handle section click
     * @private
     */
    handleSectionClick(event) {
        const tab = event.target.closest('.section-tab:not(.disabled)');
        if (!tab) return;
        
        const section = tab.dataset.section;
        if (section && section !== this.currentSection) {
            this.switchSection(section);
        }
    }
    
    /**
     * Switch to a different section
     * @param {string} sectionType - The section type
     */
    switchSection(sectionType) {
        if (!this.currentTopic) return;
        
        this.currentSection = sectionType;
        appState.ui.activeSection = sectionType;
        
        // Update content
        this.displayTopic(this.currentTopic);
        
        // Save UI state
        appState.saveUIState();
        
        // Emit event
        window.dispatchEvent(new CustomEvent('sectionSwitched', {
            detail: { 
                sectionType, 
                topicId: this.currentTopic.id,
                isEmpty: !this.currentTopic.hasSection(sectionType)
            }
        }));
    }
    
    /**
     * Update active topic item
     * @private
     */
    updateActiveTopicItem(topicId) {
        // Remove previous active
        const previousActive = this.elements.topicMenu.querySelector('.topic-item.active');
        if (previousActive) {
            previousActive.classList.remove('active');
        }
        
        // Set new active
        const newActive = this.elements.topicMenu.querySelector(`[data-topic-id="${topicId}"]`);
        if (newActive) {
            newActive.classList.add('active');
            
            // Ensure visible in scrollable container
            newActive.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    /**
     * Show/hide loading overlay
     * @param {boolean} show - Whether to show loading
     */
    showLoading(show) {
        this.isLoading = show;
        appState.setLoading(show);
        
        if (this.elements.loadingOverlay) {
            if (show) {
                this.elements.loadingOverlay.classList.remove('hidden');
            } else {
                this.elements.loadingOverlay.classList.add('hidden');
            }
        }
    }
    
    /**
     * Show error message
     * @param {string} message - The error message
     */
    showError(message) {
        if (!this.elements.errorContainer) return;
        
        // Clear previous timer
        if (this.errorTimer) {
            clearTimeout(this.errorTimer);
        }
        
        // Show error
        this.elements.errorContainer.innerHTML = `
            <div class="error-message">
                <span class="error-icon">⚠️</span>
                <span class="error-text">${message}</span>
                <button class="error-close" onclick="uiManager.hideError()">×</button>
            </div>
        `;
        this.elements.errorContainer.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        this.errorTimer = setTimeout(() => this.hideError(), 5000);
    }
    
    /**
     * Hide error message
     */
    hideError() {
        if (this.elements.errorContainer) {
            this.elements.errorContainer.classList.add('hidden');
        }
        
        if (this.errorTimer) {
            clearTimeout(this.errorTimer);
            this.errorTimer = null;
        }
    }
    
    /**
     * Handle keyboard shortcuts
     * @private
     */
    handleKeyboardShortcuts(event) {
        // Don't handle if in input field
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (event.key) {
            case '1':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.toggleSidebar('left');
                }
                break;
                
            case '2':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.toggleSidebar('right');
                }
                break;
                
            case 'ArrowLeft':
                if (event.altKey) {
                    event.preventDefault();
                    this.navigateTopic(-1);
                }
                break;
                
            case 'ArrowRight':
                if (event.altKey) {
                    event.preventDefault();
                    this.navigateTopic(1);
                }
                break;
                
            case 'r':
                if (!event.ctrlKey && !event.metaKey && !event.altKey) {
                    this.switchSection('reszletes');
                }
                break;
                
            case 'o':
                if (!event.ctrlKey && !event.metaKey && !event.altKey) {
                    this.switchSection('osszefoglalas');
                }
                break;
                
            case 'k':
                if (!event.ctrlKey && !event.metaKey && !event.altKey) {
                    this.switchSection('kepek');
                }
                break;
        }
    }
    
    /**
     * Toggle sidebar visibility
     * @param {string} side - 'left' or 'right'
     */
    toggleSidebar(side) {
        // Delegate to sidebar-manager-optimized.js instead of handling here
        if (window.sidebarManagerOptimized && window.sidebarManagerOptimized.handleToggle) {
            window.sidebarManagerOptimized.handleToggle(side);
        } else {
            // Fallback only if optimized manager not available
            console.warn('Sidebar manager not available, using fallback');
            appState.ui.toggleSidebar(side);
            
            const sidebar = side === 'left' ? this.elements.leftSidebar : this.elements.rightSidebar;
            if (sidebar) {
                sidebar.classList.toggle('hidden');
            }
            
            this.adjustLayout();
            appState.saveUIState();
        }
    }
    
    /**
     * Navigate to next/previous topic
     * @private
     */
    navigateTopic(direction) {
        if (!this.currentTopic) return;
        
        const currentId = this.currentTopic.id;
        const newId = currentId + direction;
        
        // Check bounds
        if (newId >= 1 && newId <= 259) {
            this.loadTopic(newId);
        }
    }
    
    /**
     * Handle content scroll for TOC sync
     * @private
     */
    handleContentScroll() {
        if (window.tocGenerator && typeof tocGenerator.updateActiveFromScroll === 'function') {
            tocGenerator.updateActiveFromScroll();
        }
    }
    
    /**
     * Handle TOC navigation
     * @private
     */
    handleTocNavigation(detail) {
        // Content scrolling is handled by tocGenerator
        // We just need to track the event
        console.log('TOC navigation:', detail);
    }
    
    /**
     * Adjust layout based on sidebar visibility
     * @private
     */
    adjustLayout() {
        if (!this.elements.appContainer) return;
        
        const leftVisible = !this.elements.leftSidebar?.classList.contains('hidden');
        const rightVisible = !this.elements.rightSidebar?.classList.contains('hidden');
        
        this.elements.appContainer.classList.toggle('left-sidebar-hidden', !leftVisible);
        this.elements.appContainer.classList.toggle('right-sidebar-hidden', !rightVisible);
    }
    
    /**
     * Load UI state from storage
     * @private
     */
    loadUIState() {
        appState.loadUIState();
        
        // Apply loaded state
        if (!appState.ui.leftSidebarVisible) {
            this.toggleSidebar('left');
        }
        
        if (!appState.ui.rightSidebarVisible) {
            this.toggleSidebar('right');
        }
        
        // Load last topic if available
        if (appState.ui.currentTopicId) {
            setTimeout(() => {
                this.loadTopic(appState.ui.currentTopicId);
            }, 100);
        }
    }
    
    /**
     * Debounce helper
     * @private
     */
    debounce(func, wait) {
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
    
    /**
     * Get current state
     */
    getState() {
        return {
            currentTopicId: this.currentTopic?.id,
            currentSection: this.currentSection,
            isLoading: this.isLoading,
            sidebarStates: {
                left: !this.elements.leftSidebar?.classList.contains('hidden'),
                right: !this.elements.rightSidebar?.classList.contains('hidden')
            }
        };
    }
    
    /**
     * Destroy UI manager
     */
    destroy() {
        // Remove event listeners
        this.elements.topicMenu?.removeEventListener('click', this.handleTopicClick);
        this.elements.sectionTabs?.removeEventListener('click', this.handleSectionClick);
        document.removeEventListener('keydown', this.handleKeyboardShortcuts);
        this.elements.contentDisplay?.removeEventListener('scroll', this.handleContentScroll);
        
        // Clear timers
        if (this.errorTimer) {
            clearTimeout(this.errorTimer);
        }
        
        // Destroy TOC generator
        tocGenerator.destroy();
        
        // Clear state
        this.currentTopic = null;
        appState.clearCurrentTopic();
    }
}

// Create singleton instance
const uiManager = new UIManager();

// Make it available globally for browser use
window.uiManager = uiManager;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UIManager, uiManager };
}