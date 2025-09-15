/**
 * Custom Error Classes
 * Specific error types for the neurology exam app
 */

/**
 * Base error class for the application
 */
class NeurologyAppError extends Error {
    constructor(message, details = null) {
        super(message);
        this.name = this.constructor.name;
        this.details = details;
        this.timestamp = new Date();
        
        // Maintain proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    
    /**
     * Get localized error message
     */
    getLocalizedMessage() {
        return this.message;
    }
    
    /**
     * Convert to plain object for logging
     */
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            details: this.details,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

/**
 * Error thrown when a topic is not found
 */
class TopicNotFoundError extends NeurologyAppError {
    constructor(topicId) {
        super(`Tétel ${topicId} nem található`);
        this.topicId = topicId;
        this.details = { topicId };
    }
    
    getLocalizedMessage() {
        return `A kért tétel (${this.topicId}) nem található. Kérjük, válasszon egy másik tételt.`;
    }
}

/**
 * Error thrown when markdown parsing fails
 */
class ParseError extends NeurologyAppError {
    constructor(message, line = null, markdown = null) {
        super(`Feldolgozási hiba: ${message}`);
        this.line = line;
        this.markdown = markdown;
        this.details = { line, markdownSnippet: markdown?.substring(0, 100) };
    }
    
    getLocalizedMessage() {
        let msg = 'Hiba történt a tartalom feldolgozása során.';
        if (this.line) {
            msg += ` (${this.line}. sor)`;
        }
        return msg;
    }
}

/**
 * Error thrown when a section is not found
 */
class SectionNotFoundError extends NeurologyAppError {
    constructor(sectionType) {
        const sectionNames = {
            'reszletes': 'Részletes',
            'osszefoglalas': 'Összefoglalás',
            'kepek': 'Képek/Diagrammok'
        };
        
        const sectionName = sectionNames[sectionType] || sectionType;
        super(`${sectionName} szakasz nem található`);
        this.sectionType = sectionType;
        this.details = { sectionType };
    }
    
    getLocalizedMessage() {
        const sectionNames = {
            'reszletes': 'részletes leírás',
            'osszefoglalas': 'összefoglalás',
            'kepek': 'képek és diagrammok'
        };
        
        const sectionName = sectionNames[this.sectionType] || this.sectionType;
        return `A ${sectionName} nem érhető el ehhez a tételhez.`;
    }
}

/**
 * Error thrown when file loading fails
 */
class FileLoadError extends NeurologyAppError {
    constructor(filename, originalError = null) {
        super(`Fájl betöltési hiba: ${filename}`);
        this.filename = filename;
        this.originalError = originalError;
        this.details = { 
            filename, 
            originalMessage: originalError?.message,
            statusCode: originalError?.status
        };
    }
    
    getLocalizedMessage() {
        return `Nem sikerült betölteni a kért tartalmat. Kérjük, próbálja újra később.`;
    }
}

/**
 * Error thrown when network request fails
 */
class NetworkError extends NeurologyAppError {
    constructor(url, statusCode = null, originalError = null) {
        super(`Hálózati hiba: ${url}`);
        this.url = url;
        this.statusCode = statusCode;
        this.originalError = originalError;
        this.details = { url, statusCode, originalMessage: originalError?.message };
    }
    
    getLocalizedMessage() {
        if (this.statusCode === 404) {
            return 'A kért tartalom nem található.';
        } else if (this.statusCode >= 500) {
            return 'Szerverhiba történt. Kérjük, próbálja újra később.';
        }
        return 'Hálózati kapcsolat hiba. Kérjük, ellenőrizze az internetkapcsolatot.';
    }
}

/**
 * Error thrown when cache operations fail
 */
class CacheError extends NeurologyAppError {
    constructor(operation, originalError = null) {
        super(`Gyorsítótár hiba: ${operation}`);
        this.operation = operation;
        this.originalError = originalError;
        this.details = { operation, originalMessage: originalError?.message };
    }
    
    getLocalizedMessage() {
        return 'Hiba történt a gyorsítótár kezelése során.';
    }
}

/**
 * Error thrown when validation fails
 */
class ValidationError extends NeurologyAppError {
    constructor(field, value, requirement) {
        super(`Érvényesítési hiba: ${field}`);
        this.field = field;
        this.value = value;
        this.requirement = requirement;
        this.details = { field, value, requirement };
    }
    
    getLocalizedMessage() {
        return `Érvénytelen érték: ${this.field}. ${this.requirement}`;
    }
}

/**
 * Error thrown when initialization fails
 */
class InitializationError extends NeurologyAppError {
    constructor(component, originalError = null) {
        super(`Inicializálási hiba: ${component}`);
        this.component = component;
        this.originalError = originalError;
        this.details = { component, originalMessage: originalError?.message };
    }
    
    getLocalizedMessage() {
        return `Nem sikerült betölteni az alkalmazás egy részét (${this.component}). Kérjük, frissítse az oldalt.`;
    }
}

/**
 * Error thrown when browser feature is not supported
 */
class NotSupportedError extends NeurologyAppError {
    constructor(feature) {
        super(`Nem támogatott funkció: ${feature}`);
        this.feature = feature;
        this.details = { feature };
    }
    
    getLocalizedMessage() {
        return `A böngésző nem támogatja ezt a funkciót: ${this.feature}. Kérjük, használjon modern böngészőt.`;
    }
}

/**
 * Error utility functions
 */
const ErrorUtils = {
    /**
     * Check if error is a specific type
     */
    isTopicNotFound(error) {
        return error instanceof TopicNotFoundError;
    },
    
    /**
     * Check if error is network related
     */
    isNetworkError(error) {
        return error instanceof NetworkError || 
               error instanceof FileLoadError ||
               (error.message && error.message.toLowerCase().includes('network'));
    },
    
    /**
     * Check if error is recoverable
     */
    isRecoverable(error) {
        return error instanceof NetworkError ||
               error instanceof FileLoadError ||
               error instanceof CacheError;
    },
    
    /**
     * Format error for user display
     */
    formatForDisplay(error) {
        if (error instanceof NeurologyAppError) {
            return error.getLocalizedMessage();
        }
        
        // Generic error handling
        if (error.message.includes('Failed to fetch')) {
            return 'Nem sikerült betölteni a tartalmat. Kérjük, ellenőrizze az internetkapcsolatot.';
        }
        
        return 'Váratlan hiba történt. Kérjük, próbálja újra.';
    },
    
    /**
     * Log error with context
     */
    logError(error, context = {}) {
        const errorInfo = {
            timestamp: new Date().toISOString(),
            error: error instanceof NeurologyAppError ? error.toJSON() : {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            context,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.error('Application Error:', errorInfo);
        
        // Could send to error tracking service here
        return errorInfo;
    }
};

// Export classes and utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NeurologyAppError,
        TopicNotFoundError,
        ParseError,
        SectionNotFoundError,
        FileLoadError,
        NetworkError,
        CacheError,
        ValidationError,
        InitializationError,
        NotSupportedError,
        ErrorUtils
    };
}