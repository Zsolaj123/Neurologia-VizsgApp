/**
 * Contract Tests for TopicLoader Module
 * Tests the loading and caching of topic markdown files
 */

function testTopicLoader() {
    describe('TopicLoader Module Contract Tests', () => {
        // The topicLoader should be loaded from the actual module
        
        // Test: Load existing topic
        it('should load an existing topic (Topic 15)', async () => {
            try {
                const topic = await window.topicLoader.loadTopic(15);
                expect(topic).toBeTruthy();
                expect(topic.id).toBe(15);
                expect(topic.title).toBeTruthy();
                expect(topic.sections).toBeTruthy();
                expect(topic.sections.reszletes).toBeTruthy();
                expect(topic.category).toBe('neuroanat');
                expect(topic.range).toBe('1-20');
            } catch (error) {
                throw error; // Test should fail
            }
        });
        
        // Test: Load non-existent topic
        it('should throw TopicNotFoundError for non-existent topic (Topic 999)', async () => {
            try {
                await window.topicLoader.loadTopic(999);
                throw new Error('Should have thrown TopicNotFoundError');
            } catch (error) {
                expect(error.name).toBe('TopicNotFoundError');
                expect(error.message).toContain('999');
            }
        });
        
        // Test: Cache hit
        it('should return cached topic on second load', async () => {
            // First load
            let firstLoadTime = Date.now();
            const topic1 = await window.topicLoader.loadTopic(15);
            firstLoadTime = Date.now() - firstLoadTime;
            
            // Second load (should be from cache)
            let cacheLoadTime = Date.now();
            const topic2 = await window.topicLoader.loadTopic(15);
            cacheLoadTime = Date.now() - cacheLoadTime;
            
            expect(topic1).toEqual(topic2);
            expect(cacheLoadTime).toBeLessThan(firstLoadTime / 2); // Cache should be much faster
        });
        
        // Test: Get available topics
        it('should get available topics', () => {
            const topics = window.topicLoader.getAvailableTopics();
            expect(topics).toBeTruthy();
            expect(topics.length).toBe(60); // neuroanat has 60 topics (1-60)
            expect(topics[0].id).toBe(1);
            expect(topics[0].category).toBe('neuroanat');
        });
        
        // Test: Handle non-existent topic
        it('should throw error for non-existing topics', async () => {
            try {
                await window.topicLoader.loadTopic(999);
                throw new Error('Should have thrown error');
            } catch (error) {
                expect(error instanceof TopicNotFoundError).toBe(true);
                expect(error.topicId).toBe(999);
            }
        });
        
        // Test: Clear entire cache
        it('should clear entire cache', () => {
            window.topicLoader.clearCache();
            
            const stats = window.topicLoader.getStats();
            expect(stats.cached).toBe(0);
        });
        
        // Test: Get loader statistics
        it('should return correct loader statistics', () => {
            const stats = window.topicLoader.getStats();
            expect(stats).toBeTruthy();
            expect(stats.totalAvailable).toBe(60);
            expect(stats.loaded).toBeDefined();
            expect(stats.cached).toBeDefined();
            expect(stats.currentlyLoading).toBeDefined();
        });
        
        // Test: Handle Hungarian characters in topic titles
        it('should properly handle Hungarian characters', async () => {
            const topic = await window.topicLoader.loadTopic(1);
            // Topic 1 title contains Hungarian characters
            expect(topic.title).toContain('anatómiája');
        });
    });
}