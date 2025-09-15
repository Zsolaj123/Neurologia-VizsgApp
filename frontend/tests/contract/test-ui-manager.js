/**
 * Contract Tests for UIManager Module
 * Tests UI state management and user interactions
 */

function testUIManager() {
    describe('UIManager Module Contract Tests', () => {
        // The uiManager should be loaded from the actual module
        
        // Set up DOM elements for testing
        beforeEach(() => {
            // Add required DOM elements if they don't exist
            if (!document.getElementById('content-display')) {
                document.body.innerHTML = `
                    <div id="left-sidebar" class="topic-list"></div>
                    <div id="right-sidebar" class="toc-sidebar"></div>
                    <div id="content-display"></div>
                    <nav id="section-tabs">
                        <button class="tab-btn active" data-section="reszletes">Részletes</button>
                        <button class="tab-btn" data-section="osszefoglalas">Összefoglalás</button>
                        <button class="tab-btn" data-section="kepek">Képek</button>
                    </nav>
                    <div id="toc-content"></div>
                    <div id="error-container" class="hidden"></div>
                `;
            }
        });
        
        // Test: Initialize UI components
        it('should initialize UI components', () => {
            window.uiManager.initialize();
            
            // Check that event listeners are attached
            const tabs = document.querySelectorAll('.tab-btn');
            expect(tabs.length).toBe(3);
            
            // Check initial state
            const state = window.uiManager.getState();
            expect(state.leftSidebarVisible).toBe(true);
            expect(state.rightSidebarVisible).toBe(true);
            expect(state.activeSection).toBe('reszletes');
        });
        
        // Test: Display topic content
        it('should display topic content and update UI', () => {
            const mockTopic = {
                id: 15,
                title: 'Test Topic',
                sections: {
                    reszletes: {
                        content: '<h1>Részletes</h1><p>Content</p>',
                        isEmpty: false
                    },
                    osszefoglalas: {
                        content: '<h1>Összefoglalás</h1><p>Summary</p>',
                        isEmpty: false
                    },
                    kepek: {
                        content: '',
                        isEmpty: true
                    }
                },
                tableOfContents: [
                    { id: 'h1-1', text: 'Részletes', level: 1, children: [] }
                ]
            };
            
            window.uiManager.currentTopic = mockTopic;
            window.uiManager.displayTopic(mockTopic);
            
            // Check that content is displayed
            const contentDisplay = document.getElementById('content-display');
            expect(contentDisplay.innerHTML).toContain('Részletes');
            expect(contentDisplay.innerHTML).toContain('Content');
            
            // Check that section tabs are updated
            const tabs = document.querySelectorAll('.section-tab');
            expect(tabs.length).toBeGreaterThan(0);
        });
        
        // Test: Switch content sections
        it('should switch between content sections', () => {
            // First display a topic
            const mockTopic = {
                id: 1,
                sections: {
                    reszletes: { content: '<p>Detailed</p>', isEmpty: false },
                    osszefoglalas: { content: '<p>Summary</p>', isEmpty: false },
                    kepek: { content: '<p>Images</p>', isEmpty: false }
                }
            };
            
            window.uiManager.currentTopic = mockTopic;
            window.uiManager.displayTopic(mockTopic);
            
            // Switch to summary
            window.uiManager.switchSection('osszefoglalas');
            
            const contentDisplay = document.getElementById('content-display');
            expect(contentDisplay.innerHTML).toContain('Summary');
            
            // Check active tab
            const activeTab = document.querySelector('.section-tab.active');
            expect(activeTab.dataset.section).toBe('osszefoglalas');
        });
        
        // Test: Handle empty section
        it('should show empty message for empty sections', () => {
            const mockTopic = {
                id: 1,
                sections: {
                    reszletes: { content: '<p>Content</p>', isEmpty: false },
                    osszefoglalas: { content: '', isEmpty: true },
                    kepek: { content: '', isEmpty: true }
                }
            };
            
            window.uiManager.currentTopic = mockTopic;
            window.uiManager.displayTopic(mockTopic);
            window.uiManager.switchSection('kepek');
            
            const contentDisplay = document.getElementById('content-display');
            expect(contentDisplay.innerHTML.toLowerCase()).toContain('kép');
        });
        
        // Test: Toggle left sidebar
        it('should toggle left sidebar visibility', () => {
            const leftSidebar = document.getElementById('left-sidebar');
            
            // Initially visible
            expect(leftSidebar.classList.contains('hidden')).toBe(false);
            
            // Toggle to hide
            window.uiManager.toggleSidebar('left');
            expect(leftSidebar.classList.contains('hidden')).toBe(true);
            
            // Toggle to show
            window.uiManager.toggleSidebar('left');
            expect(leftSidebar.classList.contains('hidden')).toBe(false);
        });
        
        // Test: Toggle right sidebar
        it('should toggle right sidebar visibility', () => {
            const rightSidebar = document.getElementById('right-sidebar');
            
            // Initially visible
            expect(rightSidebar.classList.contains('hidden')).toBe(false);
            
            // Toggle to hide
            window.uiManager.toggleSidebar('right');
            expect(rightSidebar.classList.contains('hidden')).toBe(true);
            
            // Toggle to show
            window.uiManager.toggleSidebar('right');
            expect(rightSidebar.classList.contains('hidden')).toBe(false);
        });
        
        // Test: TOC generation - SKIP
        // TOC is handled by tocGenerator module, not UIManager
        
        // Test: Show error message
        it('should display error messages', () => {
            const errorContainer = document.getElementById('error-container');
            
            window.uiManager.showError('Hiba történt');
            
            expect(errorContainer.classList.contains('hidden')).toBe(false);
            expect(errorContainer.textContent).toContain('Hiba történt');
            
            // Should auto-hide after timeout
            setTimeout(() => {
                expect(errorContainer.classList.contains('hidden')).toBe(true);
            }, 5000);
        });
        
        // Test: Get current UI state
        it('should return current UI state', () => {
            const state = window.uiManager.getState();
            
            expect(state).toBeTruthy();
            expect(state.leftSidebarVisible).toBeDefined();
            expect(state.rightSidebarVisible).toBeDefined();
            expect(state.activeSection).toBeDefined();
            expect(state.currentTopicId).toBeDefined();
        });
        
        // Test: Keyboard shortcuts
        it('should respond to keyboard shortcuts', () => {
            // Ctrl+B toggles left sidebar
            const event = new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 'b'
            });
            
            document.dispatchEvent(event);
            
            const leftSidebar = document.getElementById('left-sidebar');
            expect(leftSidebar.classList.contains('sidebar-collapsed')).toBe(true);
        });
        
        // Test: Active topic highlighting
        it('should highlight active topic in menu', () => {
            // Assuming topic menu items exist
            const topicItems = document.querySelectorAll('.topic-item');
            if (topicItems.length > 0) {
                const mockTopic = { id: 15, title: 'Test' };
                window.uiManager.currentTopic = mockTopic;
            window.uiManager.displayTopic(mockTopic);
                
                const activeItem = document.querySelector('.topic-item.active');
                expect(activeItem).toBeTruthy();
                expect(activeItem.textContent).toContain('15');
            }
        });
    });
}