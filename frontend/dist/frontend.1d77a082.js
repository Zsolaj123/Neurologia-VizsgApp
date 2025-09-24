/**
 * Topic Model and Related Entities
 * Data structures for the neurology exam app
 */ /**
 * Represents a content section within a topic
 */ class Section {
    constructor(data = {}){
        this.type = data.type || ''; // "reszletes" | "osszefoglalas" | "kepek"
        this.title = data.title || '';
        this.content = data.content || '';
        this.rawMarkdown = data.rawMarkdown || '';
        this.isEmpty = data.isEmpty !== undefined ? data.isEmpty : true;
    }
    /**
     * Create a Section from markdown content
     */ static fromMarkdown(type, title, markdown, html) {
        return new Section({
            type,
            title,
            content: html,
            rawMarkdown: markdown,
            isEmpty: !markdown || markdown.trim().length === 0
        });
    }
    /**
     * Create an empty section
     */ static empty(type, title) {
        return new Section({
            type,
            title,
            content: '',
            rawMarkdown: '',
            isEmpty: true
        });
    }
}
/**
 * Represents a table of contents item
 */ class TocItem {
    constructor(data = {}){
        this.id = data.id || '';
        this.text = data.text || '';
        this.level = data.level || 1;
        this.children = data.children || [];
    }
    /**
     * Add a child TOC item
     */ addChild(childItem) {
        this.children.push(childItem);
    }
    /**
     * Convert to plain object for serialization
     */ toJSON() {
        return {
            id: this.id,
            text: this.text,
            level: this.level,
            children: this.children.map((child)=>child.toJSON())
        };
    }
}
/**
 * Represents a single exam topic
 */ class Topic {
    constructor(data = {}){
        this.id = data.id || 0;
        this.title = data.title || '';
        this.category = data.category || '';
        this.range = data.range || '';
        this.tags = data.tags || [];
        this.sections = this._initializeSections(data.sections);
        this.tableOfContents = this._initializeToc(data.tableOfContents);
        this.lastModified = data.lastModified ? new Date(data.lastModified) : new Date();
        this.isBundled = data.isBundled || false;
    }
    /**
     * Initialize sections with Section instances
     */ _initializeSections(sectionsData = {}) {
        return {
            reszletes: sectionsData.reszletes instanceof Section ? sectionsData.reszletes : new Section(sectionsData.reszletes || {
                type: 'reszletes',
                title: "R\xe9szletes"
            }),
            osszefoglalas: sectionsData.osszefoglalas instanceof Section ? sectionsData.osszefoglalas : new Section(sectionsData.osszefoglalas || {
                type: 'osszefoglalas',
                title: "\xd6sszefoglal\xe1s"
            }),
            kepek: sectionsData.kepek instanceof Section ? sectionsData.kepek : new Section(sectionsData.kepek || {
                type: 'kepek',
                title: "K\xe9pek"
            })
        };
    }
    /**
     * Initialize TOC with TocItem instances
     */ _initializeToc(tocData = []) {
        return tocData.map((item)=>item instanceof TocItem ? item : new TocItem(item));
    }
    /**
     * Get the category range for this topic
     */ static getCategoryAndRange(topicId) {
        if (topicId >= 1 && topicId <= 59) {
            const category = 'neuroanat';
            let range;
            if (topicId <= 20) range = '1-20';
            else if (topicId <= 40) range = '21-40';
            else range = '41-59';
            return {
                category,
                range
            };
        }
        // Future categories can be added here
        return {
            category: 'unknown',
            range: 'unknown'
        };
    }
    /**
     * Create a Topic from raw data
     */ static fromRawData(id, title, markdownContent, parsedSections, tocItems, tags = []) {
        const { category, range } = Topic.getCategoryAndRange(id);
        return new Topic({
            id,
            title,
            category,
            range,
            tags,
            sections: parsedSections,
            tableOfContents: tocItems,
            lastModified: new Date(),
            isBundled: false
        });
    }
    /**
     * Check if topic has content in a specific section
     */ hasSection(sectionType) {
        return this.sections[sectionType] && !this.sections[sectionType].isEmpty;
    }
    /**
     * Get section by type
     */ getSection(sectionType) {
        return this.sections[sectionType];
    }
    /**
     * Convert to plain object for serialization
     */ toJSON() {
        return {
            id: this.id,
            title: this.title,
            category: this.category,
            range: this.range,
            tags: this.tags,
            sections: {
                reszletes: this.sections.reszletes,
                osszefoglalas: this.sections.osszefoglalas,
                kepek: this.sections.kepek
            },
            tableOfContents: this.tableOfContents.map((item)=>item.toJSON()),
            lastModified: this.lastModified.toISOString(),
            isBundled: this.isBundled
        };
    }
}
/**
 * Lightweight topic information for menu display
 */ class TopicMetadata {
    constructor(data = {}){
        this.id = data.id || 0;
        this.title = data.title || '';
        this.category = data.category || '';
        this.hasOsszefoglalas = data.hasOsszefoglalas || false;
        this.hasKepek = data.hasKepek || false;
    }
    /**
     * Create metadata from a full Topic
     */ static fromTopic(topic) {
        return new TopicMetadata({
            id: topic.id,
            title: topic.title,
            category: topic.category,
            hasOsszefoglalas: topic.hasSection('osszefoglalas'),
            hasKepek: topic.hasSection('kepek')
        });
    }
}
/**
 * Cache statistics
 */ class CacheStats {
    constructor(data = {}){
        this.size = data.size || 0;
        this.maxSize = data.maxSize || 50;
        this.hits = data.hits || 0;
        this.misses = data.misses || 0;
        this.lastAccess = data.lastAccess ? new Date(data.lastAccess) : null;
    }
    /**
     * Calculate hit rate percentage
     */ getHitRate() {
        const total = this.hits + this.misses;
        return total > 0 ? (this.hits / total * 100).toFixed(1) : 0;
    }
    /**
     * Record a cache hit
     */ recordHit() {
        this.hits++;
        this.lastAccess = new Date();
    }
    /**
     * Record a cache miss
     */ recordMiss() {
        this.misses++;
        this.lastAccess = new Date();
    }
    /**
     * Reset statistics
     */ reset() {
        this.hits = 0;
        this.misses = 0;
        this.lastAccess = null;
    }
}
// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) module.exports = {
    Topic,
    Section,
    TocItem,
    TopicMetadata,
    CacheStats
};

//# sourceMappingURL=frontend.1d77a082.js.map
