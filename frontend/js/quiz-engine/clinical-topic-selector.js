/**
 * Clinical Topic Selector Module
 * Handles individual topic selection for clinical quizzes
 */

import { clinicalQuizMapping, getQuestionsForClinicalTopic } from '../data/clinical-quiz-mapping.js';

export class ClinicalTopicSelector {
    constructor() {
        this.selectedTopics = new Set();
        this.topicModalElement = null;
    }

    /**
     * Create and show the topic selector modal
     * @param {string} quizPath - Path to the quiz HTML file
     * @returns {Promise} Resolves with selected topics or null if cancelled
     */
    async showTopicSelector(quizPath) {
        return new Promise((resolve) => {
            // Extract filename from path
            const filename = quizPath.split('/').pop();
            
            // Find all topics that use this quiz file
            const availableTopics = Object.entries(clinicalQuizMapping)
                .filter(([_, data]) => data.quizFile.includes(filename))
                .map(([number, data]) => ({
                    number: parseInt(number),
                    title: data.title
                }));

            if (availableTopics.length === 0) {
                // No individual topics available, load entire quiz
                resolve(null);
                return;
            }

            // Create modal
            this.createModal(availableTopics, resolve);
        });
    }

    /**
     * Create the topic selector modal
     * @param {Array} topics - Available topics
     * @param {Function} resolve - Promise resolve function
     */
    createModal(topics, resolve) {
        // Remove existing modal if any
        if (this.topicModalElement) {
            this.topicModalElement.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'topic-selector-modal';
        modal.innerHTML = `
            <div class="topic-selector-overlay"></div>
            <div class="topic-selector-content">
                <h2>Válasszon témakört</h2>
                <p>Válassza ki azokat a témaköröket, amelyekből szeretne kvízt kitölteni:</p>
                <div class="topic-list">
                    ${topics.map(topic => `
                        <label class="topic-item">
                            <input type="checkbox" value="${topic.number}" 
                                   ${this.selectedTopics.has(topic.number) ? 'checked' : ''}>
                            <span class="topic-number">${topic.number}.</span>
                            <span class="topic-title">${topic.title}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="topic-actions">
                    <button class="btn-select-all">Mind kiválaszt</button>
                    <button class="btn-deselect-all">Mind törli</button>
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel">Mégse</button>
                    <button class="btn-start-quiz" disabled>Kvíz indítása</button>
                </div>
            </div>
        `;

        // Add styles
        this.addModalStyles();

        // Add to document
        document.body.appendChild(modal);
        this.topicModalElement = modal;

        // Setup event listeners
        this.setupModalEvents(modal, resolve);

        // Update button state
        this.updateStartButton(modal);
    }

    /**
     * Add modal styles to document
     */
    addModalStyles() {
        if (document.getElementById('clinical-topic-selector-styles')) return;

        const style = document.createElement('style');
        style.id = 'clinical-topic-selector-styles';
        style.textContent = `
            .topic-selector-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .topic-selector-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
            }

            .topic-selector-content {
                position: relative;
                background: var(--quiz-bg-primary, #1a1a1a);
                border: 2px solid var(--quiz-accent, #00ff00);
                border-radius: 8px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                color: var(--quiz-text-primary, #00ff00);
            }

            .topic-selector-content h2 {
                margin: 0 0 1rem;
                font-size: 1.5rem;
            }

            .topic-selector-content p {
                margin: 0 0 1.5rem;
                opacity: 0.9;
            }

            .topic-list {
                margin-bottom: 1.5rem;
                max-height: 400px;
                overflow-y: auto;
                border: 1px solid rgba(0, 255, 0, 0.3);
                border-radius: 4px;
                padding: 0.5rem;
            }

            .topic-item {
                display: flex;
                align-items: center;
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                cursor: pointer;
                border-radius: 4px;
                transition: background 0.2s;
            }

            .topic-item:hover {
                background: rgba(0, 255, 0, 0.1);
            }

            .topic-item input[type="checkbox"] {
                margin-right: 1rem;
                width: 18px;
                height: 18px;
                cursor: pointer;
            }

            .topic-number {
                font-weight: bold;
                margin-right: 0.5rem;
                min-width: 3rem;
            }

            .topic-title {
                flex: 1;
            }

            .topic-actions {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }

            .topic-actions button {
                flex: 1;
                padding: 0.5rem 1rem;
                background: rgba(0, 255, 0, 0.1);
                color: var(--quiz-text-primary);
                border: 1px solid var(--quiz-accent);
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .topic-actions button:hover {
                background: rgba(0, 255, 0, 0.2);
            }

            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }

            .modal-actions button {
                padding: 0.75rem 1.5rem;
                border-radius: 4px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-cancel {
                background: transparent;
                color: var(--quiz-text-primary);
                border: 1px solid rgba(0, 255, 0, 0.3);
            }

            .btn-cancel:hover {
                background: rgba(0, 255, 0, 0.1);
            }

            .btn-start-quiz {
                background: var(--quiz-accent);
                color: var(--quiz-bg-primary);
                border: none;
            }

            .btn-start-quiz:hover:not(:disabled) {
                background: #00dd00;
            }

            .btn-start-quiz:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * Setup event listeners for the modal
     * @param {HTMLElement} modal - Modal element
     * @param {Function} resolve - Promise resolve function
     */
    setupModalEvents(modal, resolve) {
        // Checkbox changes
        modal.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const topicNumber = parseInt(e.target.value);
                if (e.target.checked) {
                    this.selectedTopics.add(topicNumber);
                } else {
                    this.selectedTopics.delete(topicNumber);
                }
                this.updateStartButton(modal);
            }
        });

        // Select all
        modal.querySelector('.btn-select-all').addEventListener('click', () => {
            modal.querySelectorAll('.topic-item input').forEach(checkbox => {
                checkbox.checked = true;
                this.selectedTopics.add(parseInt(checkbox.value));
            });
            this.updateStartButton(modal);
        });

        // Deselect all
        modal.querySelector('.btn-deselect-all').addEventListener('click', () => {
            modal.querySelectorAll('.topic-item input').forEach(checkbox => {
                checkbox.checked = false;
            });
            this.selectedTopics.clear();
            this.updateStartButton(modal);
        });

        // Cancel
        modal.querySelector('.btn-cancel').addEventListener('click', () => {
            this.closeModal();
            resolve(null);
        });

        // Start quiz
        modal.querySelector('.btn-start-quiz').addEventListener('click', () => {
            if (this.selectedTopics.size > 0) {
                const selectedArray = Array.from(this.selectedTopics);
                this.closeModal();
                resolve(selectedArray);
            }
        });

        // Close on overlay click
        modal.querySelector('.topic-selector-overlay').addEventListener('click', () => {
            this.closeModal();
            resolve(null);
        });
    }

    /**
     * Update the start button state
     * @param {HTMLElement} modal - Modal element
     */
    updateStartButton(modal) {
        const startButton = modal.querySelector('.btn-start-quiz');
        const hasSelection = this.selectedTopics.size > 0;
        
        startButton.disabled = !hasSelection;
        
        if (hasSelection) {
            startButton.textContent = `Kvíz indítása (${this.selectedTopics.size} témakör)`;
        } else {
            startButton.textContent = 'Kvíz indítása';
        }
    }

    /**
     * Close and cleanup the modal
     */
    closeModal() {
        if (this.topicModalElement) {
            this.topicModalElement.remove();
            this.topicModalElement = null;
        }
    }

    /**
     * Filter questions for selected topics
     * @param {Array} allQuestions - All questions from the quiz
     * @param {Array} selectedTopics - Selected topic numbers
     * @returns {Array} Filtered questions
     */
    filterQuestionsForTopics(allQuestions, selectedTopics) {
        const filteredQuestions = [];
        console.log(`[ClinicalTopicSelector] Starting to filter ${allQuestions.length} questions for topics:`, selectedTopics);

        selectedTopics.forEach(topicNumber => {
            const topicQuestions = getQuestionsForClinicalTopic(topicNumber, allQuestions);
            console.log(`[ClinicalTopicSelector] Topic ${topicNumber} matched ${topicQuestions.length} questions`);
            filteredQuestions.push(...topicQuestions);
        });

        console.log(`[ClinicalTopicSelector] Total filtered questions before deduplication: ${filteredQuestions.length}`);

        // Remove duplicates (in case some questions match multiple topics)
        const uniqueQuestions = filteredQuestions.filter((question, index) => 
            filteredQuestions.findIndex(q => q.question === question.question) === index
        );

        console.log(`[ClinicalTopicSelector] Final unique questions: ${uniqueQuestions.length}`);
        return uniqueQuestions;
    }
}