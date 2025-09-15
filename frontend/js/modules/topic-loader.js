/**
 * Topic Loader Module
 * Loads and manages topic content
 */

class TopicLoader {
    constructor() {
        this.baseUrl = 'content/neuroanat';
        this.topics = new Map(); // Topic metadata cache
        this.loadingPromises = new Map(); // Prevent duplicate loads
        
        // Topic metadata (pre-defined for neuroanatomy topics 1-60)
        this.topicMetadata = this.initializeTopicMetadata();
    }
    
    /**
     * Initialize topic metadata
     * @private
     */
    initializeTopicMetadata() {
        const metadata = new Map();
        
        // Use the actual topic metadata if available
        if (window.TOPIC_METADATA) {
            for (let i = 1; i <= 59; i++) {
                const topicData = window.TOPIC_METADATA[i];
                if (topicData) {
                    metadata.set(i, {
                        id: i,
                        title: topicData.title,
                        category: 'neuroanat',
                        range: topicData.folder,
                        folder: topicData.folder,
                        filename: `${i}. ${topicData.title}.md`
                    });
                }
            }
        } else {
            // Fallback if metadata not loaded
            for (let i = 1; i <= 59; i++) {
                metadata.set(i, {
                    id: i,
                    title: `${i}. tétel`,
                    category: 'neuroanat',
                    range: this.getTopicRange(i),
                    folder: this.getTopicRange(i),
                    filename: `${i}.md`
                });
            }
        }
        
        return metadata;
    }
    
    /**
     * Get topic range
     * @private
     */
    getTopicRange(topicId) {
        if (topicId <= 20) return '1-20';
        if (topicId <= 40) return '21-40';
        return '41-59'; // Note: actual range is 41-60, but following template pattern
    }
    
    /**
     * Get all available topics
     * @returns {Array<TopicMetadata>}
     */
    getAvailableTopics() {
        const topics = [];
        
        for (const [id, meta] of this.topicMetadata) {
            topics.push(new TopicMetadata({
                id: meta.id,
                title: meta.title,
                category: meta.category,
                hasOsszefoglalas: true, // Will be updated when loaded
                hasKepek: true // Will be updated when loaded
            }));
        }
        
        return topics.sort((a, b) => a.id - b.id);
    }
    
    /**
     * Load a topic by ID
     * @param {number} topicId - The topic ID
     * @returns {Promise<Topic>}
     */
    async loadTopic(topicId) {
        // Validate topic ID
        if (!this.topicMetadata.has(topicId)) {
            throw new TopicNotFoundError(topicId);
        }
        
        // Check cache first
        const cached = appState.cache.get(topicId);
        if (cached) {
            return cached;
        }
        
        // Check if already loading
        if (this.loadingPromises.has(topicId)) {
            return this.loadingPromises.get(topicId);
        }
        
        // Create loading promise
        const loadingPromise = this._loadTopicContent(topicId);
        this.loadingPromises.set(topicId, loadingPromise);
        
        try {
            const topic = await loadingPromise;
            this.loadingPromises.delete(topicId);
            
            // Cache the topic
            appState.cache.set(topicId, topic);
            
            // Update metadata
            this.topics.set(topicId, TopicMetadata.fromTopic(topic));
            
            // Emit event
            window.dispatchEvent(new CustomEvent('topicLoaded', {
                detail: { topicId, topic }
            }));
            
            return topic;
        } catch (error) {
            this.loadingPromises.delete(topicId);
            
            // Emit error event
            window.dispatchEvent(new CustomEvent('topicLoadError', {
                detail: { topicId, error }
            }));
            
            throw error;
        }
    }
    
    /**
     * Load topic content from file
     * @private
     */
    async _loadTopicContent(topicId) {
        const meta = this.topicMetadata.get(topicId);
        const url = `${this.baseUrl}/${meta.folder}/${meta.filename}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new TopicNotFoundError(topicId);
                }
                throw new NetworkError(url, response.status);
            }
            
            const markdown = await response.text();
            
            // Parse markdown
            const parsed = markdownParser.parseMarkdown(markdown);
            const sections = markdownParser.parseSections(markdown);
            
            // Extract title from content
            const title = this.extractTitle(markdown, topicId);
            
            // Create topic
            const topic = Topic.fromRawData(
                topicId,
                title,
                markdown,
                sections,
                parsed.toc
            );
            
            return topic;
            
        } catch (error) {
            if (error instanceof NeurologyAppError) {
                throw error;
            }
            
            if (error.name === 'NetworkError' || error.message.includes('Failed to fetch')) {
                throw new NetworkError(url, null, error);
            }
            
            throw new FileLoadError(meta.filename, error);
        }
    }
    
    /**
     * Extract title from markdown
     * @private
     */
    extractTitle(markdown, topicId) {
        // Look for first H1 header
        const h1Match = markdown.match(/^# (.+)$/m);
        if (h1Match) {
            return h1Match[1].trim();
        }
        
        // Look for any header
        const headerMatch = markdown.match(/^#{1,6} (.+)$/m);
        if (headerMatch) {
            return headerMatch[1].trim();
        }
        
        // Fallback to default title
        return `${topicId}. tétel`;
    }
    
    /**
     * Preload multiple topics
     * @param {Array<number>} topicIds - Array of topic IDs
     * @returns {Promise<Array<Topic>>}
     */
    async preloadTopics(topicIds) {
        const promises = topicIds.map(id => 
            this.loadTopic(id).catch(error => {
                console.error(`Failed to preload topic ${id}:`, error);
                return null;
            })
        );
        
        const results = await Promise.all(promises);
        return results.filter(topic => topic !== null);
    }
    
    /**
     * Reload a topic (bypass cache)
     * @param {number} topicId - The topic ID
     * @returns {Promise<Topic>}
     */
    async reloadTopic(topicId) {
        // Remove from cache
        appState.cache.remove(topicId);
        
        // Load fresh
        return this.loadTopic(topicId);
    }
    
    /**
     * Search topics by keyword
     * @param {string} keyword - Search keyword
     * @returns {Array<TopicMetadata>}
     */
    searchTopics(keyword) {
        if (!keyword || keyword.trim().length === 0) {
            return this.getAvailableTopics();
        }
        
        const searchTerm = keyword.toLowerCase();
        const results = [];
        
        for (const [id, meta] of this.topics) {
            if (meta.title.toLowerCase().includes(searchTerm)) {
                results.push(meta);
            }
        }
        
        return results.sort((a, b) => a.id - b.id);
    }
    
    /**
     * Get topics by range
     * @param {string} range - Range like "1-20"
     * @returns {Array<TopicMetadata>}
     */
    getTopicsByRange(range) {
        const topics = [];
        
        for (const [id, meta] of this.topicMetadata) {
            if (meta.range === range) {
                const cached = this.topics.get(id);
                if (cached) {
                    topics.push(cached);
                } else {
                    topics.push(new TopicMetadata({
                        id: meta.id,
                        title: meta.title,
                        category: meta.category
                    }));
                }
            }
        }
        
        return topics.sort((a, b) => a.id - b.id);
    }
    
    /**
     * Clear all cached topics
     */
    clearCache() {
        appState.cache.clear();
        this.topics.clear();
        this.loadingPromises.clear();
    }
    
    /**
     * Get loading statistics
     */
    getStats() {
        return {
            totalAvailable: this.topicMetadata.size,
            loaded: this.topics.size,
            cached: appState.cache.topics.size,
            currentlyLoading: this.loadingPromises.size
        };
    }
}

// Create singleton instance
const topicLoader = new TopicLoader();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TopicLoader, topicLoader };
}