/**
 * Topic Selector Module
 * Allows selection of individual topics for quiz practice
 */

import { neuronatQuizMapping, getAvailableTopics } from '../data/neuroanat-quiz-mapping.js';

export class TopicSelector {
    constructor() {
        this.selectedTopics = new Set();
        this.categoryTopics = {
            neuroanat: {
                ranges: [
                    { start: 1, end: 20, title: "Koponya, látórendszer, agyidegek" },
                    { start: 21, end: 40, title: "Agykéreg, gerincvelő, mozgatórendszer" },
                    { start: 41, end: 59, title: "Keringés, plexusok, neurotranszmitterek" }
                ]
            }
        };
    }

    /**
     * Display topic selection interface
     * @param {string} category - Quiz category
     * @param {HTMLElement} container - Container element
     */
    displayTopicSelector(category, container) {
        const topics = this.getCategoryTopics(category);
        
        container.innerHTML = `
            <div class="topic-selector">
                <div class="topic-selector-header">
                    <h3>Válassz témákat a gyakorláshoz</h3>
                    <div class="topic-actions">
                        <button class="select-all-btn">Összes kiválasztása</button>
                        <button class="clear-all-btn">Kiválasztás törlése</button>
                    </div>
                </div>
                <div class="topic-groups">
                    ${this.renderTopicGroups(topics, category)}
                </div>
                <div class="topic-selector-footer">
                    <p class="selected-count">0 téma kiválasztva</p>
                    <button class="start-quiz-btn" disabled>Kvíz indítása</button>
                </div>
            </div>
        `;

        this.attachEventListeners(container);
    }

    /**
     * Get topics for a category
     * @param {string} category - Category name
     * @returns {Array} Array of topics
     */
    getCategoryTopics(category) {
        if (category === 'neuroanat') {
            return getAvailableTopics();
        }
        // Add other categories as needed
        return [];
    }

    /**
     * Render topic groups
     * @param {Array} topics - Array of topics
     * @param {string} category - Category name
     * @returns {string} HTML string
     */
    renderTopicGroups(topics, category) {
        const ranges = this.categoryTopics[category]?.ranges || [];
        let html = '';

        ranges.forEach(range => {
            const rangeTopics = topics.filter(t => t.number >= range.start && t.number <= range.end);
            
            html += `
                <div class="topic-group">
                    <h4 class="group-title">${range.title}</h4>
                    <div class="topic-grid">
                        ${rangeTopics.map(topic => `
                            <label class="topic-item">
                                <input type="checkbox" value="${topic.number}" class="topic-checkbox">
                                <span class="topic-number">${topic.number}.</span>
                                <span class="topic-title">${topic.title}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        return html;
    }

    /**
     * Attach event listeners
     * @param {HTMLElement} container - Container element
     */
    attachEventListeners(container) {
        // Select all button
        container.querySelector('.select-all-btn')?.addEventListener('click', () => {
            container.querySelectorAll('.topic-checkbox').forEach(cb => {
                cb.checked = true;
                this.selectedTopics.add(parseInt(cb.value));
            });
            this.updateSelectedCount(container);
        });

        // Clear all button
        container.querySelector('.clear-all-btn')?.addEventListener('click', () => {
            container.querySelectorAll('.topic-checkbox').forEach(cb => {
                cb.checked = false;
            });
            this.selectedTopics.clear();
            this.updateSelectedCount(container);
        });

        // Individual checkboxes
        container.querySelectorAll('.topic-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const topicNumber = parseInt(e.target.value);
                if (e.target.checked) {
                    this.selectedTopics.add(topicNumber);
                } else {
                    this.selectedTopics.delete(topicNumber);
                }
                this.updateSelectedCount(container);
            });
        });

        // Start quiz button
        container.querySelector('.start-quiz-btn')?.addEventListener('click', () => {
            if (this.selectedTopics.size > 0) {
                this.startTopicQuiz();
            }
        });
    }

    /**
     * Update selected count display
     * @param {HTMLElement} container - Container element
     */
    updateSelectedCount(container) {
        const count = this.selectedTopics.size;
        const countElement = container.querySelector('.selected-count');
        const startButton = container.querySelector('.start-quiz-btn');

        if (countElement) {
            countElement.textContent = `${count} téma kiválasztva`;
        }

        if (startButton) {
            startButton.disabled = count === 0;
        }
    }

    /**
     * Start quiz with selected topics
     */
    startTopicQuiz() {
        const selectedTopicsArray = Array.from(this.selectedTopics);
        
        // Dispatch custom event with selected topics
        const event = new CustomEvent('startTopicQuiz', {
            detail: {
                topics: selectedTopicsArray,
                category: 'neuroanat'
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Get quiz data for selected topics
     * @param {Array} allQuestions - All questions from quiz files
     * @returns {Array} Filtered questions for selected topics
     */
    filterQuestionsForTopics(allQuestions) {
        let filteredQuestions = [];

        this.selectedTopics.forEach(topicNumber => {
            const mapping = neuronatQuizMapping[topicNumber];
            if (mapping && mapping.questionFilter) {
                const topicQuestions = allQuestions.filter(q => 
                    mapping.questionFilter(q.question)
                );
                filteredQuestions = filteredQuestions.concat(topicQuestions);
            }
        });

        // Remove duplicates
        const uniqueQuestions = [];
        const seen = new Set();

        filteredQuestions.forEach(q => {
            const key = q.question + q.correctAnswer;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueQuestions.push(q);
            }
        });

        return uniqueQuestions;
    }
}

// CSS for topic selector
const style = document.createElement('style');
style.textContent = `
.topic-selector {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.topic-selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.topic-actions button {
    margin-left: 10px;
    padding: 8px 16px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.topic-actions button:hover {
    background: #5558e3;
}

.topic-group {
    margin-bottom: 40px;
}

.group-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #1f2937;
}

.topic-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 10px;
}

.topic-item {
    display: flex;
    align-items: center;
    padding: 12px;
    background: #f9fafb;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.topic-item:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
}

.topic-checkbox:checked + .topic-number + .topic-title {
    font-weight: 600;
}

.topic-checkbox:checked ~ * {
    color: #6366f1;
}

.topic-checkbox {
    margin-right: 10px;
}

.topic-number {
    font-weight: 600;
    margin-right: 8px;
    min-width: 30px;
}

.topic-selector-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 2px solid #e5e7eb;
}

.selected-count {
    font-size: 1.1rem;
    font-weight: 600;
    color: #6366f1;
}

.start-quiz-btn {
    padding: 12px 32px;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.start-quiz-btn:hover:not(:disabled) {
    background: #059669;
    transform: scale(1.05);
}

.start-quiz-btn:disabled {
    background: #d1d5db;
    cursor: not-allowed;
}
`;
document.head.appendChild(style);