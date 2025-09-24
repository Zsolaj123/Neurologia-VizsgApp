/**
 * Main Application Entry Point
 * Initializes and coordinates all modules
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Neurológiai Részvizsga App indítása...');
    
    try {
        // Initialize the UI Manager
        uiManager.initialize();
        
        // Make uiManager globally accessible for onclick handlers
        window.uiManager = uiManager;
        
        // Debug: Verify uiManager methods are accessible
        console.log('✓ UI Manager inicializálva and exposed globally');
        console.log('🔧 Available uiManager methods:', {
            toggleCategory: typeof uiManager.toggleCategory,
            toggleRange: typeof uiManager.toggleRange,
            toggleAllTopics: typeof uiManager.toggleAllTopics
        });
        
        // Show welcome message initially
        showWelcomeMessage();
        
        // Set up global error handling
        setupErrorHandling();
        
        // Set up keyboard shortcuts help
        setupKeyboardHelp();
        
        // Log app state
        console.log('App State:', appState.getSummary());
        
        // Emit app ready event
        window.dispatchEvent(new CustomEvent('appReady', {
            detail: { 
                version: '1.0.0',
                modules: {
                    topicLoader: !!window.topicLoader,
                    markdownParser: !!window.markdownParser,
                    uiManager: !!window.uiManager,
                    tocGenerator: !!window.tocGenerator
                }
            }
        }));
        
        console.log('✓ Alkalmazás sikeresen elindult');
        
    } catch (error) {
        console.error('Hiba az alkalmazás inicializálása során:', error);
        showCriticalError(error);
    }
});

/**
 * Show welcome message
 */
function showWelcomeMessage() {
    const contentDisplay = document.getElementById('content-display');
    if (!contentDisplay) return;
    
    contentDisplay.innerHTML = `
        <div class="welcome-message fade-in">
            <h1 class="glow">Neurológiai Részvizsga App</h1>
            <p>Üdvözöljük a neurológiai részvizsga felkészülő alkalmazásban!</p>
            
            <div class="features">
                <div class="feature">
                    <span class="feature-icon">📚</span>
                    <span class="feature-text">60 tétel neuroanatómiából</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">📝</span>
                    <span class="feature-text">Részletes leírások és összefoglalók</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">🖼️</span>
                    <span class="feature-text">Képek és diagrammok</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">🔍</span>
                    <span class="feature-text">Tartalomjegyzék navigáció</span>
                </div>
            </div>
            
            <div class="keyboard-shortcuts mt-4">
                <h3>Billentyűparancsok</h3>
                <ul class="text-left">
                    <li><kbd>Ctrl/Cmd + 1</kbd> - Bal oldalsáv ki/be</li>
                    <li><kbd>Ctrl/Cmd + 2</kbd> - Jobb oldalsáv ki/be</li>
                    <li><kbd>Alt + ←/→</kbd> - Előző/Következő tétel</li>
                    <li><kbd>R</kbd> - Részletes nézet</li>
                    <li><kbd>O</kbd> - Összefoglalás</li>
                    <li><kbd>K</kbd> - Képek</li>
                </ul>
            </div>
            
            <p class="mt-4 text-muted">Válasszon egy tételt a bal oldali menüből a kezdéshez!</p>
        </div>
    `;
}

/**
 * Set up global error handling
 */
function setupErrorHandling() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Kezeletlen promise hiba:', event.reason);
        appState.logError(event.reason, 'unhandled-promise');
        
        if (uiManager && uiManager.showError) {
            uiManager.showError('Váratlan hiba történt. Kérjük, próbálja újra.');
        }
        
        event.preventDefault();
    });
    
    // Handle general errors
    window.addEventListener('error', (event) => {
        console.error('Általános hiba:', event.error);
        appState.logError(event.error, 'window-error');
        
        if (uiManager && uiManager.showError) {
            uiManager.showError('Hiba történt az alkalmazásban.');
        }
        
        event.preventDefault();
    });
    
    // Listen for app errors
    window.addEventListener('appError', (event) => {
        const { type, message, error } = event.detail;
        console.error(`App hiba [${type}]:`, message, error);
        appState.logError(error || new Error(message), type);
    });
}

/**
 * Show critical error (when app can't start)
 */
function showCriticalError(error) {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #0A0A0A;
            color: #FF4444;
            font-family: 'JetBrains Mono', monospace;
            text-align: center;
            padding: 2rem;
        ">
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">❌ Kritikus Hiba</h1>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">
                Az alkalmazás nem tudott elindulni
            </p>
            <pre style="
                background: rgba(255, 0, 0, 0.1);
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid #FF4444;
                max-width: 600px;
                overflow-x: auto;
            ">${error.message}</pre>
            <p style="margin-top: 2rem; color: #999;">
                Kérjük, frissítse az oldalt (F5) vagy ellenőrizze a konzolt további információkért.
            </p>
        </div>
    `;
}

/**
 * Set up keyboard shortcuts help
 */
function setupKeyboardHelp() {
    // Show help with ? key
    document.addEventListener('keydown', (event) => {
        if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
            // Don't trigger if in input field
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }
            
            toggleKeyboardHelp();
        }
    });
}

/**
 * Toggle keyboard shortcuts help overlay
 */
function toggleKeyboardHelp() {
    let helpOverlay = document.getElementById('keyboard-help-overlay');
    
    if (helpOverlay) {
        helpOverlay.remove();
        return;
    }
    
    helpOverlay = document.createElement('div');
    helpOverlay.id = 'keyboard-help-overlay';
    helpOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 10, 10, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    helpOverlay.innerHTML = `
        <div style="
            background: var(--bg-secondary);
            border: 1px solid var(--primary-green);
            border-radius: 8px;
            padding: 2rem;
            max-width: 600px;
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
        ">
            <h2 style="color: var(--primary-green); margin-bottom: 1rem;">
                ⌨️ Billentyűparancsok
            </h2>
            
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 0.5rem;">
                <div><kbd>Ctrl/Cmd + 1</kbd></div>
                <div>Bal oldalsáv ki/be kapcsolása</div>
                
                <div><kbd>Ctrl/Cmd + 2</kbd></div>
                <div>Jobb oldalsáv ki/be kapcsolása</div>
                
                <div><kbd>Alt + ←</kbd></div>
                <div>Előző tétel</div>
                
                <div><kbd>Alt + →</kbd></div>
                <div>Következő tétel</div>
                
                <div><kbd>R</kbd></div>
                <div>Részletes nézet</div>
                
                <div><kbd>O</kbd></div>
                <div>Összefoglalás nézet</div>
                
                <div><kbd>K</kbd></div>
                <div>Képek nézet</div>
                
                <div><kbd>?</kbd></div>
                <div>Ez a súgó</div>
                
                <div><kbd>ESC</kbd></div>
                <div>Súgó bezárása</div>
            </div>
            
            <p style="margin-top: 1rem; color: var(--text-secondary); text-align: center;">
                Kattintson bárhova vagy nyomja meg az ESC-et a bezáráshoz
            </p>
        </div>
    `;
    
    // Close on click or ESC
    helpOverlay.addEventListener('click', () => helpOverlay.remove());
    
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            helpOverlay.remove();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    document.body.appendChild(helpOverlay);
}

// Export app info for debugging
window.neurologyApp = {
    version: '1.0.0',
    modules: {
        topicLoader,
        markdownParser,
        uiManager,
        tocGenerator,
        appState
    },
    getState: () => ({
        app: appState.getSummary(),
        ui: uiManager.getState(),
        loader: topicLoader.getStats(),
        toc: tocGenerator.getStats()
    }),
    debug: {
        clearCache: () => {
            topicLoader.clearCache();
            console.log('Cache törölve');
        },
        showErrors: () => {
            console.table(appState.getRecentErrors(20));
        },
        exportState: () => {
            const state = window.neurologyApp.getState();
            const blob = new Blob([JSON.stringify(state, null, 2)], 
                { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `neurology-app-state-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }
};