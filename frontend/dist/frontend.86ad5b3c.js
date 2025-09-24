/**
 * AppState Model
 * Global application state management
 */ /**
 * UI State for sidebar and content display
 */ class UIState {
    constructor(data = {}){
        this.leftSidebarVisible = data.leftSidebarVisible !== undefined ? data.leftSidebarVisible : true;
        this.rightSidebarVisible = data.rightSidebarVisible !== undefined ? data.rightSidebarVisible : true;
        this.contentZoom = data.contentZoom || 100;
        this.theme = data.theme || 'cyberpunk';
        this.activeSection = data.activeSection || 'reszletes';
        this.currentTopicId = data.currentTopicId || null;
    }
    /**
     * Toggle sidebar visibility
     */ toggleSidebar(side) {
        if (side === 'left') this.leftSidebarVisible = !this.leftSidebarVisible;
        else if (side === 'right') this.rightSidebarVisible = !this.rightSidebarVisible;
    }
    /**
     * Set content zoom level
     */ setZoom(zoomLevel) {
        // Clamp between 50% and 200%
        this.contentZoom = Math.max(50, Math.min(200, zoomLevel));
    }
    /**
     * Convert to plain object for storage
     */ toJSON() {
        return {
            leftSidebarVisible: this.leftSidebarVisible,
            rightSidebarVisible: this.rightSidebarVisible,
            contentZoom: this.contentZoom,
            theme: this.theme,
            activeSection: this.activeSection,
            currentTopicId: this.currentTopicId
        };
    }
}
/**
 * Cache State for topic caching
 */ class CacheState {
    constructor(data = {}){
        this.topics = new Map(data.topics || []);
        this.maxSize = data.maxSize || 50;
        this.stats = new CacheStats(data.stats || {});
        this.accessOrder = data.accessOrder || [];
    }
    /**
     * Add or update a topic in cache
     */ set(topicId, topic) {
        // Remove if already exists to update access order
        if (this.topics.has(topicId)) this.remove(topicId);
        // Check cache size limit
        if (this.topics.size >= this.maxSize) this.evictLRU();
        // Add to cache
        this.topics.set(topicId, topic);
        this.accessOrder.push(topicId);
        this.stats.size = this.topics.size;
    }
    /**
     * Get a topic from cache
     */ get(topicId) {
        if (this.topics.has(topicId)) {
            // Update access order
            this.updateAccessOrder(topicId);
            this.stats.recordHit();
            return this.topics.get(topicId);
        }
        this.stats.recordMiss();
        return null;
    }
    /**
     * Remove a topic from cache
     */ remove(topicId) {
        this.topics.delete(topicId);
        this.accessOrder = this.accessOrder.filter((id)=>id !== topicId);
        this.stats.size = this.topics.size;
    }
    /**
     * Clear entire cache
     */ clear() {
        this.topics.clear();
        this.accessOrder = [];
        this.stats.size = 0;
        this.stats.reset();
    }
    /**
     * Evict least recently used item
     */ evictLRU() {
        if (this.accessOrder.length > 0) {
            const lruId = this.accessOrder.shift();
            this.topics.delete(lruId);
            this.stats.size = this.topics.size;
        }
    }
    /**
     * Update access order for a topic
     */ updateAccessOrder(topicId) {
        this.accessOrder = this.accessOrder.filter((id)=>id !== topicId);
        this.accessOrder.push(topicId);
    }
    /**
     * Check if topic is in cache
     */ has(topicId) {
        return this.topics.has(topicId);
    }
}
/**
 * Error log entry
 */ class ErrorLog {
    constructor(data = {}){
        this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
        this.type = data.type || 'unknown';
        this.message = data.message || '';
        this.details = data.details || null;
        this.topicId = data.topicId || null;
        this.stack = data.stack || null;
    }
    /**
     * Create error log from Error object
     */ static fromError(error, type = 'unknown', topicId = null) {
        return new ErrorLog({
            type,
            message: error.message,
            details: error.details || null,
            topicId,
            stack: error.stack
        });
    }
    /**
     * Format error for display
     */ getDisplayMessage() {
        let msg = `[${this.timestamp.toLocaleTimeString()}] ${this.type}: ${this.message}`;
        if (this.topicId) msg += ` (T\xe9tel ${this.topicId})`;
        return msg;
    }
}
/**
 * Main application state
 */ class AppState {
    constructor(data = {}){
        this.currentTopic = data.currentTopic || null;
        this.ui = new UIState(data.ui || {});
        this.cache = new CacheState(data.cache || {});
        this.errors = (data.errors || []).map((e)=>new ErrorLog(e));
        this.isLoading = data.isLoading || false;
        this.initialized = data.initialized || false;
    }
    /**
     * Set current topic
     */ setCurrentTopic(topic) {
        this.currentTopic = topic;
        if (topic) {
            this.ui.currentTopicId = topic.id;
            this.cache.set(topic.id, topic);
        }
    }
    /**
     * Clear current topic
     */ clearCurrentTopic() {
        this.currentTopic = null;
        this.ui.currentTopicId = null;
    }
    /**
     * Add error to log
     */ logError(error, type = 'unknown') {
        const errorLog = error instanceof ErrorLog ? error : ErrorLog.fromError(error, type, this.ui.currentTopicId);
        this.errors.push(errorLog);
        // Keep only last 50 errors
        if (this.errors.length > 50) this.errors = this.errors.slice(-50);
    }
    /**
     * Clear error log
     */ clearErrors() {
        this.errors = [];
    }
    /**
     * Get recent errors
     */ getRecentErrors(count = 10) {
        return this.errors.slice(-count);
    }
    /**
     * Set loading state
     */ setLoading(isLoading) {
        this.isLoading = isLoading;
    }
    /**
     * Save UI state to localStorage
     */ saveUIState() {
        try {
            localStorage.setItem('neurologyApp_uiState', JSON.stringify(this.ui.toJSON()));
        } catch (e) {
            console.error('Failed to save UI state:', e);
        }
    }
    /**
     * Load UI state from localStorage
     */ loadUIState() {
        try {
            const saved = localStorage.getItem('neurologyApp_uiState');
            if (saved) {
                const data = JSON.parse(saved);
                this.ui = new UIState(data);
            }
        } catch (e) {
            console.error('Failed to load UI state:', e);
        }
    }
    /**
     * Reset to default state
     */ reset() {
        this.currentTopic = null;
        this.ui = new UIState();
        this.cache.clear();
        this.errors = [];
        this.isLoading = false;
        this.initialized = false;
    }
    /**
     * Get state summary for debugging
     */ getSummary() {
        return {
            currentTopicId: this.currentTopic?.id || null,
            currentTopicTitle: this.currentTopic?.title || null,
            uiState: this.ui.toJSON(),
            cacheSize: this.cache.topics.size,
            cacheHitRate: this.cache.stats.getHitRate() + '%',
            errorCount: this.errors.length,
            isLoading: this.isLoading,
            initialized: this.initialized
        };
    }
}
// Create singleton instance
const appState = new AppState();
// Load saved UI state on initialization
appState.loadUIState();
// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) module.exports = {
    AppState,
    UIState,
    CacheState,
    ErrorLog,
    appState
};

//# sourceMappingURL=frontend.86ad5b3c.js.map
