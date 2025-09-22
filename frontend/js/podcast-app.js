/**
 * Podcast Application
 * Main controller for the podcast player interface
 */

import { podcastData } from './podcast-data.js';
import { podcastPlayer } from './podcast-player.js';
import { MatrixRain } from './quiz-engine/matrix-rain.js';

class PodcastApp {
    constructor() {
        this.currentCategory = null;
        this.currentScreen = 'category-screen';
        this.matrixRain = null;
        
        // Screen elements
        this.screens = {
            category: document.getElementById('category-screen'),
            list: document.getElementById('podcast-list-screen')
        };
        
        // UI elements
        this.categoryCards = document.querySelectorAll('.category-card');
        this.backButtons = document.querySelectorAll('.back-btn');
        this.searchInput = document.querySelector('.search-input');
        this.searchBtn = document.querySelector('.search-btn');
        this.podcastList = document.getElementById('podcast-list');
        this.categoryTitle = document.getElementById('category-title');
        
        this.initialize();
    }

    /**
     * Initialize the application
     */
    async initialize() {
        console.log('Initializing Podcast App...');
        
        // Initialize matrix rain effect
        this.initMatrixRain();
        
        // Load podcast data
        await this.loadPodcastData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update category counts
        this.updateCategoryCounts();
        
        console.log('Podcast App initialized successfully');
    }

    /**
     * Initialize matrix rain effect with enhanced visibility
     */
    initMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        if (canvas) {
            this.matrixRain = new MatrixRain(canvas);
            // Configure for better visibility
            this.matrixRain.setConfig({
                fadeColor: 'rgba(10, 10, 10, 0.03)', // Slower fade for stronger trails
                speed: 30, // Slightly faster animation
                density: 0.97 // More characters
            });
            this.matrixRain.start();
        }
    }

    /**
     * Load podcast data
     */
    async loadPodcastData() {
        try {
            await podcastData.loadPodcasts();
            console.log('Podcast data loaded successfully');
        } catch (error) {
            console.error('Error loading podcast data:', error);
            this.showError('Hiba történt a podcastok betöltése során');
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Category card clicks
        this.categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const categoryId = card.dataset.category;
                this.selectCategory(categoryId);
            });
        });
        
        // Back button clicks
        this.backButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                this.navigateToScreen(target);
            });
        });
        
        // Search functionality
        this.searchBtn?.addEventListener('click', () => this.performSearch());
        this.searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }

    /**
     * Update category counts in the UI
     */
    updateCategoryCounts() {
        const countElements = document.querySelectorAll('.podcast-count');
        countElements.forEach(element => {
            const categoryId = element.dataset.category;
            const count = podcastData.getPodcastCount(categoryId);
            element.textContent = count;
        });
    }

    /**
     * Select a category and show its podcasts
     * @param {string} categoryId - Category identifier
     */
    selectCategory(categoryId) {
        this.currentCategory = categoryId;
        const categoryInfo = podcastData.getCategoryInfo(categoryId);
        
        if (!categoryInfo) {
            console.error('Invalid category:', categoryId);
            return;
        }
        
        // Update title
        this.categoryTitle.textContent = categoryInfo.name;
        
        // Load podcasts for this category
        const podcasts = podcastData.getPodcastsByCategory(categoryId);
        this.displayPodcasts(podcasts);
        
        // Navigate to list screen
        this.navigateToScreen('podcast-list-screen');
    }

    /**
     * Display podcast list
     * @param {Array} podcasts - Array of podcast objects
     */
    displayPodcasts(podcasts) {
        this.podcastList.innerHTML = '';
        
        if (podcasts.length === 0) {
            this.podcastList.innerHTML = `
                <div class="no-results">
                    <p>Nincsenek elérhető podcastok ebben a kategóriában.</p>
                </div>
            `;
            return;
        }
        
        podcasts.forEach(podcast => {
            const podcastItem = this.createPodcastElement(podcast);
            this.podcastList.appendChild(podcastItem);
        });
    }

    /**
     * Create a podcast list item element
     * @param {Object} podcast - Podcast object
     * @returns {HTMLElement} Podcast element
     */
    createPodcastElement(podcast) {
        const item = document.createElement('div');
        item.className = 'podcast-item';
        item.dataset.podcastId = podcast.id;
        
        const categoryInfo = podcastData.getCategoryInfo(podcast.categoryId);
        const podcastUrl = podcastData.getPodcastUrl(podcast);
        
        item.innerHTML = `
            <div class="podcast-number">${podcast.topicNumbers || '-'}</div>
            <div class="podcast-info">
                <div class="podcast-title">${podcast.title}</div>
                <div class="podcast-duration">${podcast.duration || 'Időtartam ismeretlen'}</div>
            </div>
            <button class="podcast-play-btn" title="Lejátszás">▶</button>
        `;
        
        // Add click handlers
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('podcast-play-btn')) {
                this.playPodcast(podcast, podcastUrl, categoryInfo);
            }
        });
        
        item.querySelector('.podcast-play-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.playPodcast(podcast, podcastUrl, categoryInfo);
        });
        
        // Add to playlist on right-click
        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            podcastPlayer.addToPlaylist(podcast, podcastUrl, categoryInfo);
            this.showToast('Hozzáadva a lejátszási listához');
        });
        
        return item;
    }

    /**
     * Play a podcast
     * @param {Object} podcast - Podcast object
     * @param {string} url - Podcast URL
     * @param {Object} categoryInfo - Category information
     */
    playPodcast(podcast, url, categoryInfo) {
        // Remove playing class from all items
        document.querySelectorAll('.podcast-item').forEach(item => {
            item.classList.remove('playing');
        });
        
        // Add playing class to current item
        const currentItem = document.querySelector(`[data-podcast-id="${podcast.id}"]`);
        if (currentItem) {
            currentItem.classList.add('playing');
        }
        
        // Play the podcast
        podcastPlayer.playPodcast(podcast, url, categoryInfo);
    }

    /**
     * Perform search
     */
    performSearch() {
        const query = this.searchInput.value.trim();
        
        if (!query) {
            // If no query, show all podcasts for current category
            if (this.currentCategory) {
                const podcasts = podcastData.getPodcastsByCategory(this.currentCategory);
                this.displayPodcasts(podcasts);
            }
            return;
        }
        
        // Search across all categories or within current category
        let results;
        if (this.currentCategory) {
            // Search within current category
            const categoryPodcasts = podcastData.getPodcastsByCategory(this.currentCategory);
            results = categoryPodcasts.filter(podcast => {
                const lowercaseQuery = query.toLowerCase();
                return podcast.title.toLowerCase().includes(lowercaseQuery) ||
                       podcast.topicNumbers.includes(query);
            });
        } else {
            // Search across all categories
            results = podcastData.searchPodcasts(query);
        }
        
        this.displayPodcasts(results);
    }

    /**
     * Navigate to a screen
     * @param {string} screenId - Screen identifier
     */
    navigateToScreen(screenId) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            
            // Clear search when going back to categories
            if (screenId === 'category-screen') {
                this.currentCategory = null;
                if (this.searchInput) {
                    this.searchInput.value = '';
                }
            }
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    /**
     * Show toast notification
     * @param {string} message - Toast message
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.podcastApp = new PodcastApp();
});

// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
    .error-message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff0000;
        color: #000;
        padding: 1rem 2rem;
        border-radius: 5px;
        font-family: 'JetBrains Mono', monospace;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }

    .toast-notification {
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: var(--podcast-bg-secondary);
        border: 2px solid var(--podcast-accent);
        color: var(--podcast-accent);
        padding: 1rem 1.5rem;
        border-radius: 5px;
        font-family: 'JetBrains Mono', monospace;
        box-shadow: var(--podcast-glow);
        z-index: 2000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }

    .toast-notification.show {
        opacity: 1;
        transform: translateY(0);
    }

    .no-results {
        text-align: center;
        padding: 3rem;
        color: var(--podcast-text-secondary);
        font-family: 'JetBrains Mono', monospace;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);