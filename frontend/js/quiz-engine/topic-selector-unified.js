/**
 * Unified Topic Selector Module
 * Single topic selection interface for all quiz formats
 */

export class UnifiedTopicSelector {
    constructor() {
        this.modalElement = null;
        this.resolveCallback = null;
    }

    /**
     * Show topic selector modal
     * @param {Array} topics - Array of topic objects {key, name}
     * @param {string} quizTitle - Quiz bundle title
     * @returns {Promise<string|null>} Selected topic key or null if cancelled
     */
    async showTopicSelector(topics, quizTitle) {
        return new Promise((resolve) => {
            this.resolveCallback = resolve;
            
            // Handle edge cases
            if (!topics || topics.length === 0) {
                console.log('[TopicSelector] No topics available, resolving with null');
                resolve(null);
                return;
            }
            
            if (topics.length === 1) {
                console.log('[TopicSelector] Only one topic available, auto-selecting:', topics[0].key);
                resolve(topics[0].key);
                return;
            }
            
            this.createModal(topics, quizTitle);
        });
    }
    
    createModal(topics, quizTitle) {
        // Remove any existing modal
        this.cleanup();
        
        // Create modal HTML
        const modalHTML = `
            <div class="topic-selector-modal" id="topic-selector-modal">
                <div class="topic-modal-content">
                    <div class="topic-modal-header">
                        <h2 class="topic-modal-title">${quizTitle}</h2>
                        <p class="topic-modal-subtitle">Válassz egy témakört a kezdéshez!</p>
                    </div>
                    <div class="topic-buttons-grid">
                        ${topics.map(topic => `
                            <button class="topic-button" data-topic="${topic.key}">
                                ${topic.name}
                            </button>
                        `).join('')}
                    </div>
                    <button class="topic-cancel-button">Mégsem</button>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modalElement = document.getElementById('topic-selector-modal');
        
        // Add styles if not already present
        if (!document.getElementById('topic-selector-styles')) {
            const styles = `
                <style id="topic-selector-styles">
                    .topic-selector-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(5px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                        animation: fadeIn 0.3s ease-out;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    .topic-modal-content {
                        background: white;
                        padding: 2rem;
                        border-radius: 16px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                        max-width: 600px;
                        width: 90%;
                        max-height: 80vh;
                        overflow-y: auto;
                        animation: slideUp 0.3s ease-out;
                    }
                    
                    @keyframes slideUp {
                        from { 
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .topic-modal-header {
                        text-align: center;
                        margin-bottom: 2rem;
                    }
                    
                    .topic-modal-title {
                        font-size: 1.875rem;
                        font-weight: 700;
                        color: #1f2937;
                        margin-bottom: 0.5rem;
                    }
                    
                    .topic-modal-subtitle {
                        font-size: 1.125rem;
                        color: #6b7280;
                    }
                    
                    .topic-buttons-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 1rem;
                        margin-bottom: 1.5rem;
                    }
                    
                    .topic-button {
                        background-color: #3b82f6;
                        color: white;
                        font-weight: 600;
                        padding: 1rem 1.5rem;
                        border-radius: 8px;
                        border: none;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-size: 1rem;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    
                    .topic-button:hover {
                        background-color: #2563eb;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                    }
                    
                    .topic-cancel-button {
                        background-color: #6b7280;
                        color: white;
                        font-weight: 600;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        border: none;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: block;
                        margin: 0 auto;
                    }
                    
                    .topic-cancel-button:hover {
                        background-color: #4b5563;
                    }
                    
                    @media (max-width: 640px) {
                        .topic-modal-content {
                            padding: 1.5rem;
                        }
                        
                        .topic-buttons-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', styles);
        }
        
        // Add event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        if (!this.modalElement) return;
        
        // Topic button clicks
        this.modalElement.querySelectorAll('.topic-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const topic = e.target.dataset.topic;
                console.log('[TopicSelector] Topic selected:', topic);
                this.selectTopic(topic);
            });
        });
        
        // Cancel button
        const cancelButton = this.modalElement.querySelector('.topic-cancel-button');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                console.log('[TopicSelector] Selection cancelled');
                this.selectTopic(null);
            });
        }
        
        // Click outside to close
        this.modalElement.addEventListener('click', (e) => {
            if (e.target === this.modalElement) {
                console.log('[TopicSelector] Clicked outside, cancelling');
                this.selectTopic(null);
            }
        });
        
        // Escape key to close
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') {
                console.log('[TopicSelector] Escape pressed, cancelling');
                this.selectTopic(null);
            }
        };
        document.addEventListener('keydown', this.escapeHandler);
    }
    
    selectTopic(topic) {
        this.cleanup();
        if (this.resolveCallback) {
            this.resolveCallback(topic);
            this.resolveCallback = null;
        }
    }
    
    cleanup() {
        if (this.modalElement) {
            this.modalElement.remove();
            this.modalElement = null;
        }
        
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
            this.escapeHandler = null;
        }
    }
}