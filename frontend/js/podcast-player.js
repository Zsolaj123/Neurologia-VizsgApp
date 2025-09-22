/**
 * Podcast Player Module
 * Handles audio playback and player controls
 */

export class PodcastPlayer {
    constructor() {
        this.audio = document.getElementById('audio-element');
        this.playlist = [];
        this.currentIndex = -1;
        this.isPlaying = false;
        this.isSeeking = false;
        
        // Player elements
        this.player = document.getElementById('audio-player');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressHandle = document.querySelector('.progress-handle');
        this.currentTime = document.querySelector('.time-current');
        this.totalTime = document.querySelector('.time-total');
        this.volumeBtn = document.getElementById('volume-btn');
        this.volumeSlider = document.querySelector('.volume-slider');
        this.volumeFill = document.querySelector('.volume-fill');
        this.volumeHandle = document.querySelector('.volume-handle');
        this.trackNumber = document.querySelector('.track-number');
        this.trackTitle = document.querySelector('.track-title');
        this.trackCategory = document.querySelector('.track-category');
        this.minimizeBtn = document.getElementById('minimize-btn');
        this.playlistToggle = document.getElementById('playlist-toggle');
        this.playlistPanel = document.getElementById('playlist-panel');
        this.playlistItems = document.getElementById('playlist-items');
        
        // Waveform canvas
        this.canvas = document.getElementById('waveform');
        this.canvasCtx = this.canvas.getContext('2d');
        this.animationId = null;
        
        this.initializePlayer();
        this.setupEventListeners();
        this.loadSavedState();
    }

    /**
     * Initialize player settings
     */
    initializePlayer() {
        // Set initial volume
        this.audio.volume = 0.8;
        this.updateVolumeDisplay(0.8);
        
        // Setup canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Audio events
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.handleTrackEnd());
        this.audio.addEventListener('play', () => this.handlePlay());
        this.audio.addEventListener('pause', () => this.handlePause());
        this.audio.addEventListener('error', (e) => this.handleError(e));

        // Player controls
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.playPrevious());
        this.nextBtn.addEventListener('click', () => this.playNext());

        // Progress bar
        this.progressBar.addEventListener('mousedown', (e) => this.startSeek(e));
        this.progressBar.addEventListener('touchstart', (e) => this.startSeek(e.touches[0]));

        // Volume control
        this.volumeBtn.addEventListener('click', () => this.toggleMute());
        this.volumeSlider.addEventListener('mousedown', (e) => this.startVolumeChange(e));
        this.volumeSlider.addEventListener('touchstart', (e) => this.startVolumeChange(e.touches[0]));

        // UI controls
        this.minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        this.playlistToggle.addEventListener('click', () => this.togglePlaylist());
        
        // Playlist clear button
        document.querySelector('.playlist-clear')?.addEventListener('click', () => this.clearPlaylist());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    /**
     * Load saved player state from localStorage
     */
    loadSavedState() {
        const savedState = localStorage.getItem('podcastPlayerState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.audio.volume = state.volume || 0.8;
            this.updateVolumeDisplay(this.audio.volume);
        }
    }

    /**
     * Save player state to localStorage
     */
    saveState() {
        const state = {
            volume: this.audio.volume,
            currentPodcast: this.playlist[this.currentIndex]?.id,
            currentTime: this.audio.currentTime
        };
        localStorage.setItem('podcastPlayerState', JSON.stringify(state));
    }

    /**
     * Load a podcast into the player
     * @param {Object} podcast - Podcast object
     * @param {string} url - Podcast URL
     * @param {Object} categoryInfo - Category information
     */
    loadPodcast(podcast, url, categoryInfo) {
        this.audio.src = url;
        this.updateTrackInfo(podcast, categoryInfo);
        this.player.classList.remove('minimized');
        this.saveState();
    }

    /**
     * Play a podcast
     * @param {Object} podcast - Podcast object
     * @param {string} url - Podcast URL
     * @param {Object} categoryInfo - Category information
     */
    async playPodcast(podcast, url, categoryInfo) {
        this.loadPodcast(podcast, url, categoryInfo);
        try {
            await this.audio.play();
        } catch (error) {
            console.error('Error playing podcast:', error);
        }
    }

    /**
     * Add podcast to playlist
     * @param {Object} podcast - Podcast object
     * @param {string} url - Podcast URL
     * @param {Object} categoryInfo - Category information
     */
    addToPlaylist(podcast, url, categoryInfo) {
        const playlistItem = {
            podcast,
            url,
            categoryInfo
        };
        
        // Check if already in playlist
        const existingIndex = this.playlist.findIndex(item => item.podcast.id === podcast.id);
        if (existingIndex === -1) {
            this.playlist.push(playlistItem);
            this.updatePlaylistDisplay();
        }
    }

    /**
     * Play podcast at index
     * @param {number} index - Playlist index
     */
    playAtIndex(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentIndex = index;
            const item = this.playlist[index];
            this.playPodcast(item.podcast, item.url, item.categoryInfo);
            this.updatePlaylistDisplay();
        }
    }

    /**
     * Toggle play/pause
     */
    togglePlayPause() {
        if (this.audio.paused) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
    }

    /**
     * Play previous track
     */
    playPrevious() {
        if (this.currentIndex > 0) {
            this.playAtIndex(this.currentIndex - 1);
        }
    }

    /**
     * Play next track
     */
    playNext() {
        if (this.currentIndex < this.playlist.length - 1) {
            this.playAtIndex(this.currentIndex + 1);
        }
    }

    /**
     * Handle play event
     */
    handlePlay() {
        this.isPlaying = true;
        this.playPauseBtn.querySelector('.control-icon').textContent = '⏸';
        this.startWaveformAnimation();
        
        // Update playing indicators
        document.querySelectorAll('.podcast-item').forEach(item => {
            item.classList.remove('playing');
        });
        
        const currentPodcast = this.playlist[this.currentIndex]?.podcast;
        if (currentPodcast) {
            const playingItem = document.querySelector(`[data-podcast-id="${currentPodcast.id}"]`);
            if (playingItem) {
                playingItem.classList.add('playing');
            }
        }
    }

    /**
     * Handle pause event
     */
    handlePause() {
        this.isPlaying = false;
        this.playPauseBtn.querySelector('.control-icon').textContent = '▶';
        this.stopWaveformAnimation();
        this.saveState();
    }

    /**
     * Handle track end
     */
    handleTrackEnd() {
        if (this.currentIndex < this.playlist.length - 1) {
            this.playNext();
        } else {
            this.handlePause();
        }
    }

    /**
     * Handle playback error
     * @param {Event} error - Error event
     */
    handleError(error) {
        console.error('Playback error:', error);
        alert('Hiba történt a podcast lejátszása közben.');
    }

    /**
     * Update progress display
     */
    updateProgress() {
        if (!this.isSeeking && this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressFill.style.width = `${progress}%`;
            this.progressHandle.style.left = `${progress}%`;
            this.currentTime.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    /**
     * Update duration display
     */
    updateDuration() {
        this.totalTime.textContent = this.formatTime(this.audio.duration);
    }

    /**
     * Start seeking
     * @param {MouseEvent|Touch} e - Mouse or touch event
     */
    startSeek(e) {
        this.isSeeking = true;
        this.seek(e);
        
        const moveHandler = (e) => this.seek(e.touches ? e.touches[0] : e);
        const upHandler = () => {
            this.isSeeking = false;
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            document.removeEventListener('touchend', upHandler);
        };
        
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('mouseup', upHandler);
        document.addEventListener('touchend', upHandler);
    }

    /**
     * Seek to position
     * @param {MouseEvent|Touch} e - Mouse or touch event
     */
    seek(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        
        if (this.audio.duration) {
            this.audio.currentTime = percent * this.audio.duration;
            this.progressFill.style.width = `${percent * 100}%`;
            this.progressHandle.style.left = `${percent * 100}%`;
        }
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        if (this.audio.volume > 0) {
            this.lastVolume = this.audio.volume;
            this.audio.volume = 0;
            this.volumeBtn.querySelector('.control-icon').textContent = '🔇';
        } else {
            this.audio.volume = this.lastVolume || 0.8;
            this.volumeBtn.querySelector('.control-icon').textContent = '🔊';
        }
        this.updateVolumeDisplay(this.audio.volume);
    }

    /**
     * Start volume change
     * @param {MouseEvent|Touch} e - Mouse or touch event
     */
    startVolumeChange(e) {
        this.changeVolume(e);
        
        const moveHandler = (e) => this.changeVolume(e.touches ? e.touches[0] : e);
        const upHandler = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            document.removeEventListener('touchend', upHandler);
            this.saveState();
        };
        
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('mouseup', upHandler);
        document.addEventListener('touchend', upHandler);
    }

    /**
     * Change volume
     * @param {MouseEvent|Touch} e - Mouse or touch event
     */
    changeVolume(e) {
        const rect = this.volumeSlider.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.audio.volume = percent;
        this.updateVolumeDisplay(percent);
    }

    /**
     * Update volume display
     * @param {number} volume - Volume level (0-1)
     */
    updateVolumeDisplay(volume) {
        const percent = volume * 100;
        this.volumeFill.style.width = `${percent}%`;
        this.volumeHandle.style.left = `${percent}%`;
        
        if (volume === 0) {
            this.volumeBtn.querySelector('.control-icon').textContent = '🔇';
        } else if (volume < 0.5) {
            this.volumeBtn.querySelector('.control-icon').textContent = '🔉';
        } else {
            this.volumeBtn.querySelector('.control-icon').textContent = '🔊';
        }
    }

    /**
     * Update track info display
     * @param {Object} podcast - Podcast object
     * @param {Object} categoryInfo - Category information
     */
    updateTrackInfo(podcast, categoryInfo) {
        this.trackNumber.textContent = podcast.topicNumbers || '-';
        this.trackTitle.textContent = podcast.title;
        this.trackCategory.textContent = categoryInfo.name;
    }

    /**
     * Toggle minimize state
     */
    toggleMinimize() {
        this.player.classList.toggle('minimized');
    }

    /**
     * Toggle playlist display
     */
    togglePlaylist() {
        this.playlistPanel.classList.toggle('active');
    }

    /**
     * Update playlist display
     */
    updatePlaylistDisplay() {
        this.playlistItems.innerHTML = '';
        
        this.playlist.forEach((item, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            if (index === this.currentIndex) {
                playlistItem.classList.add('active');
            }
            
            playlistItem.innerHTML = `
                <div class="playlist-item-info">
                    <div class="playlist-item-number">${item.podcast.topicNumbers}</div>
                    <div class="playlist-item-title">${item.podcast.title}</div>
                </div>
                <span class="playlist-remove" data-index="${index}">✕</span>
            `;
            
            playlistItem.addEventListener('click', (e) => {
                if (e.target.classList.contains('playlist-remove')) {
                    this.removeFromPlaylist(index);
                } else {
                    this.playAtIndex(index);
                }
            });
            
            this.playlistItems.appendChild(playlistItem);
        });
    }

    /**
     * Remove item from playlist
     * @param {number} index - Playlist index
     */
    removeFromPlaylist(index) {
        this.playlist.splice(index, 1);
        if (index < this.currentIndex) {
            this.currentIndex--;
        } else if (index === this.currentIndex) {
            if (this.isPlaying) {
                this.audio.pause();
            }
            this.currentIndex = -1;
        }
        this.updatePlaylistDisplay();
    }

    /**
     * Clear playlist
     */
    clearPlaylist() {
        this.playlist = [];
        this.currentIndex = -1;
        if (this.isPlaying) {
            this.audio.pause();
        }
        this.updatePlaylistDisplay();
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyboard(e) {
        // Ignore if typing in input
        if (e.target.tagName === 'INPUT') return;
        
        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.audio.volume = Math.min(1, this.audio.volume + 0.1);
                this.updateVolumeDisplay(this.audio.volume);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.audio.volume = Math.max(0, this.audio.volume - 0.1);
                this.updateVolumeDisplay(this.audio.volume);
                break;
        }
    }

    /**
     * Format time for display
     * @param {number} seconds - Time in seconds
     * @returns {string} Formatted time
     */
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Resize canvas
     */
    resizeCanvas() {
        const rect = this.player.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    /**
     * Start waveform animation
     */
    startWaveformAnimation() {
        const animate = () => {
            this.drawWaveform();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }

    /**
     * Stop waveform animation
     */
    stopWaveformAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        // Clear canvas
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draw waveform visualization
     */
    drawWaveform() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        this.canvasCtx.clearRect(0, 0, width, height);
        
        // Simple waveform effect
        const barCount = 50;
        const barWidth = width / barCount;
        const barSpacing = 2;
        
        this.canvasCtx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        
        for (let i = 0; i < barCount; i++) {
            const barHeight = Math.random() * height * 0.8 + height * 0.1;
            const x = i * barWidth + barSpacing;
            const y = (height - barHeight) / 2;
            
            this.canvasCtx.fillRect(x, y, barWidth - barSpacing * 2, barHeight);
        }
    }
}

// Export singleton instance
export const podcastPlayer = new PodcastPlayer();