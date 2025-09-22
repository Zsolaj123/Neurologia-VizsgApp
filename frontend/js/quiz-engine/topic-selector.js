/**
 * Topic Selector Module for Neuroanatomy
 * Handles individual topic selection for neuroanatomy quizzes
 */

import { neuronatQuizMapping, getQuestionsForNeuronatTopic } from '../data/neuroanat-quiz-mapping.js';

export class TopicSelector {
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
            const availableTopics = Object.entries(neuronatQuizMapping)
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
        // Check if styles already exist
        if (document.getElementById('topic-selector-matrix-styles')) return;

        // Add link to external CSS file
        const link = document.createElement('link');
        link.id = 'topic-selector-matrix-styles';
        link.rel = 'stylesheet';
        link.href = '/css/topic-selector-matrix.css';
        document.head.appendChild(link);
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

        selectedTopics.forEach(topicNumber => {
            const topicQuestions = getQuestionsForNeuronatTopic(topicNumber, allQuestions);
            filteredQuestions.push(...topicQuestions);
        });

        // Remove duplicates (in case some questions match multiple topics)
        const uniqueQuestions = filteredQuestions.filter((question, index) => 
            filteredQuestions.findIndex(q => q.question === question.question) === index
        );

        console.log(`[TopicSelector] Filtered ${uniqueQuestions.length} questions for topics:`, selectedTopics);
        return uniqueQuestions;
    }
}