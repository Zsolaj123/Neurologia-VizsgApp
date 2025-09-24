/**
 * Main Application Entry Point
 * Initializes and coordinates all modules
 */ // Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async ()=>{
    console.log("Neurol\xf3giai R\xe9szvizsga App ind\xedt\xe1sa...");
    try {
        // Initialize the UI Manager
        uiManager.initialize();
        console.log("\u2713 UI Manager inicializ\xe1lva");
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
        console.log("\u2713 Alkalmaz\xe1s sikeresen elindult");
    } catch (error) {
        console.error("Hiba az alkalmaz\xe1s inicializ\xe1l\xe1sa sor\xe1n:", error);
        showCriticalError(error);
    }
});
/**
 * Show welcome message
 */ function showWelcomeMessage() {
    const contentDisplay = document.getElementById('content-display');
    if (!contentDisplay) return;
    contentDisplay.innerHTML = `
        <div class="welcome-message fade-in">
            <h1 class="glow">Neurol\xf3giai R\xe9szvizsga App</h1>
            <p>\xdcdv\xf6z\xf6lj\xfck a neurol\xf3giai r\xe9szvizsga felk\xe9sz\xfcl\u{151} alkalmaz\xe1sban!</p>
            
            <div class="features">
                <div class="feature">
                    <span class="feature-icon">\u{1F4DA}</span>
                    <span class="feature-text">60 t\xe9tel neuroanat\xf3mi\xe1b\xf3l</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">\u{1F4DD}</span>
                    <span class="feature-text">R\xe9szletes le\xedr\xe1sok \xe9s \xf6sszefoglal\xf3k</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">\u{1F5BC}\u{FE0F}</span>
                    <span class="feature-text">K\xe9pek \xe9s diagrammok</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">\u{1F50D}</span>
                    <span class="feature-text">Tartalomjegyz\xe9k navig\xe1ci\xf3</span>
                </div>
            </div>
            
            <div class="keyboard-shortcuts mt-4">
                <h3>Billenty\u{171}parancsok</h3>
                <ul class="text-left">
                    <li><kbd>Ctrl/Cmd + 1</kbd> - Bal oldals\xe1v ki/be</li>
                    <li><kbd>Ctrl/Cmd + 2</kbd> - Jobb oldals\xe1v ki/be</li>
                    <li><kbd>Alt + \u{2190}/\u{2192}</kbd> - El\u{151}z\u{151}/K\xf6vetkez\u{151} t\xe9tel</li>
                    <li><kbd>R</kbd> - R\xe9szletes n\xe9zet</li>
                    <li><kbd>O</kbd> - \xd6sszefoglal\xe1s</li>
                    <li><kbd>K</kbd> - K\xe9pek</li>
                </ul>
            </div>
            
            <p class="mt-4 text-muted">V\xe1lasszon egy t\xe9telt a bal oldali men\xfcb\u{151}l a kezd\xe9shez!</p>
        </div>
    `;
}
/**
 * Set up global error handling
 */ function setupErrorHandling() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event)=>{
        console.error('Kezeletlen promise hiba:', event.reason);
        appState.logError(event.reason, 'unhandled-promise');
        if (uiManager && uiManager.showError) uiManager.showError("V\xe1ratlan hiba t\xf6rt\xe9nt. K\xe9rj\xfck, pr\xf3b\xe1lja \xfajra.");
        event.preventDefault();
    });
    // Handle general errors
    window.addEventListener('error', (event)=>{
        console.error("\xc1ltal\xe1nos hiba:", event.error);
        appState.logError(event.error, 'window-error');
        if (uiManager && uiManager.showError) uiManager.showError("Hiba t\xf6rt\xe9nt az alkalmaz\xe1sban.");
        event.preventDefault();
    });
    // Listen for app errors
    window.addEventListener('appError', (event)=>{
        const { type, message, error } = event.detail;
        console.error(`App hiba [${type}]:`, message, error);
        appState.logError(error || new Error(message), type);
    });
}
/**
 * Show critical error (when app can't start)
 */ function showCriticalError(error) {
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
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">\u{274C} Kritikus Hiba</h1>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">
                Az alkalmaz\xe1s nem tudott elindulni
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
                K\xe9rj\xfck, friss\xedtse az oldalt (F5) vagy ellen\u{151}rizze a konzolt tov\xe1bbi inform\xe1ci\xf3k\xe9rt.
            </p>
        </div>
    `;
}
/**
 * Set up keyboard shortcuts help
 */ function setupKeyboardHelp() {
    // Show help with ? key
    document.addEventListener('keydown', (event)=>{
        if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
            // Don't trigger if in input field
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
            toggleKeyboardHelp();
        }
    });
}
/**
 * Toggle keyboard shortcuts help overlay
 */ function toggleKeyboardHelp() {
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
                \u{2328}\u{FE0F} Billenty\u{171}parancsok
            </h2>
            
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 0.5rem;">
                <div><kbd>Ctrl/Cmd + 1</kbd></div>
                <div>Bal oldals\xe1v ki/be kapcsol\xe1sa</div>
                
                <div><kbd>Ctrl/Cmd + 2</kbd></div>
                <div>Jobb oldals\xe1v ki/be kapcsol\xe1sa</div>
                
                <div><kbd>Alt + \u{2190}</kbd></div>
                <div>El\u{151}z\u{151} t\xe9tel</div>
                
                <div><kbd>Alt + \u{2192}</kbd></div>
                <div>K\xf6vetkez\u{151} t\xe9tel</div>
                
                <div><kbd>R</kbd></div>
                <div>R\xe9szletes n\xe9zet</div>
                
                <div><kbd>O</kbd></div>
                <div>\xd6sszefoglal\xe1s n\xe9zet</div>
                
                <div><kbd>K</kbd></div>
                <div>K\xe9pek n\xe9zet</div>
                
                <div><kbd>?</kbd></div>
                <div>Ez a s\xfag\xf3</div>
                
                <div><kbd>ESC</kbd></div>
                <div>S\xfag\xf3 bez\xe1r\xe1sa</div>
            </div>
            
            <p style="margin-top: 1rem; color: var(--text-secondary); text-align: center;">
                Kattintson b\xe1rhova vagy nyomja meg az ESC-et a bez\xe1r\xe1shoz
            </p>
        </div>
    `;
    // Close on click or ESC
    helpOverlay.addEventListener('click', ()=>helpOverlay.remove());
    const escHandler = (e)=>{
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
    getState: ()=>({
            app: appState.getSummary(),
            ui: uiManager.getState(),
            loader: topicLoader.getStats(),
            toc: tocGenerator.getStats()
        }),
    debug: {
        clearCache: ()=>{
            topicLoader.clearCache();
            console.log("Cache t\xf6r\xf6lve");
        },
        showErrors: ()=>{
            console.table(appState.getRecentErrors(20));
        },
        exportState: ()=>{
            const state = window.neurologyApp.getState();
            const blob = new Blob([
                JSON.stringify(state, null, 2)
            ], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `neurology-app-state-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }
};

//# sourceMappingURL=frontend.cea00a9b.js.map
