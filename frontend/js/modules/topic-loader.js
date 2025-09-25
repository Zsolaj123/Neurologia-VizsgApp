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
            for (let i = 1; i <= 259; i++) {
                const topicData = window.TOPIC_METADATA[i];
                if (topicData) {
                    metadata.set(i, {
                        id: i,
                        title: topicData.title,
                        category: topicData.category || 'neuroanat',
                        range: topicData.folder,
                        folder: topicData.folder,
                        filename: this.getTopicFilename(i, topicData),
                        bundledWith: topicData.bundledWith,
                        isSecondary: topicData.isSecondary
                    });
                }
            }
        } else {
            // Fallback if metadata not loaded
            for (let i = 1; i <= 259; i++) {
                metadata.set(i, {
                    id: i,
                    title: `${i}. tétel`,
                    category: i <= 59 ? 'neuroanat' : (i <= 179 ? 'clinical' : 'detailed-clinical'),
                    range: this.getTopicRange(i),
                    folder: this.getTopicRange(i),
                    filename: `${i}.md`
                });
            }
        }
        
        return metadata;
    }
    
    /**
     * Get topic filename
     * @private
     */
    getTopicFilename(id, topicData) {
        // Handle special cases like 70-71, 91-92, etc.
        const title = topicData.title;
        
        // Check if this topic is bundled with another
        if (topicData.bundledWith) {
            const bundledId = topicData.bundledWith;
            const lowerID = Math.min(id, bundledId);
            const higherID = Math.max(id, bundledId);
            return `${lowerID}-${higherID}. ${title}.md`;
        } else if (id >= 185 && id <= 187) {
            return `185-186-187. Parkinson-kór, Parkinson-kór vizsgálata és kezelése.md`;
        } else if (id === 189 || id === 190) {
            return `189-190. Parkinson szindrómával járó betegségek klinikuma és kórszövettana és multiszisztémás atrófia.md`;
        } else if (id === 193 || id === 194) {
            return `193-194. Dystoniák, choreák és kezelésük.md`;
        } else if (id === 202 || id === 203) {
            return `202-203. Neuroborreliosis és neurosyphilis.md`;
        } else if (id === 211 || id === 212) {
            return `211-212. A polyneuropathiák diagnózisa és kezelése.md`;
        } else if (id === 213 || id === 214) {
            return `213-214. Szerzett és herediter polyneuropathiák.md`;
        } else if (id === 218 || id === 219) {
            return `218-219. Izomdystrophiák, myotonia és a neuromuscularis ingerületátvitel zavarai.md`;
        } else if (id === 220 || id === 221) {
            return `220-221. Myopathiák és gyulladásos, endokrin, metabolikus és toxikus izombetegségek.md`;
        } else if (id === 224 || id === 225) {
            return `224-225. A tensios és a cluster fejfájás; Neuralgiák.md`;
        } else if (id === 229 || id === 230) {
            return `229-230. Nem-Alzheimer típusú degeneratív demenciák és Vascularis demencia.md`;
        } else if (id === 232 || id === 233) {
            return `232-233. Kezelhető dementia formák és normal pressure hydrocephalus.md`;
        } else if (id === 234 || id === 235) {
            return `234-235. Demenciák kezelése és a neuropszichológiai vizsgálatok.md`;
        } else if (id === 236 || id === 237) {
            return `236-237. Mitochondiralis és trinucleotid repeat expanziós betegségek.md`;
        } else if (id === 238 || id === 239) {
            return `238-239. Neurogenetika - demenciák és izombetegségek.md`;
        } else if (id === 240 || id === 241) {
            return `240-241. A neurológiai rehabilitációs és az aphasia rehabilitációja.md`;
        } else if (id === 242 || id === 243) {
            return `242-243. A koponyasérült beteg kivizsgálásának menete és a traumás intracraniális vérzések.md`;
        } else if (id === 244 || id === 245) {
            return `244-245. Az agy traumás károsodása és a post-traumás neurológiai kórképek.md`;
        } else if (id === 246 || id === 247) {
            return `246-247. Vizsgálati stratégia gerincvelő károsodás gyanúja esetén és a gerincvelői harántlézió.md`;
        } else if (id === 248 || id === 249) {
            return `248-249. Psychosomaticus zavarok tünetei és depresszió organikus idegrendszeri betegségekben.md`;
        } else if (id === 250 || id === 251) {
            return `250-251. Organikus psychoszindrómák és konverziós kórképek differenciáldiagnosztikája.md`;
        } else if (id === 252 || id === 253) {
            return `252-253. Monitorizálás neurológiai intenzív osztályon és az agyhalál megállapítása.md`;
        } else if (id === 258 || id === 259) {
            return `258-259. Neurológiai betegségek a terhesség alatt és az idős kor neurológiája.md`;
        } else {
            return `${id}. ${title}.md`;
        }
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
        
        // Determine base URL based on category
        let baseUrl;
        if (meta.category === 'clinical') {
            baseUrl = 'content/clinical';
        } else if (meta.category === 'detailed-clinical') {
            baseUrl = 'content/detailed-clinical';
        } else {
            baseUrl = this.baseUrl; // neuroanat
        }
        
        const url = `${baseUrl}/${meta.folder}/${meta.filename}`;
        
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