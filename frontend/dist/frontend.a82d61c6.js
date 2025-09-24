/**
 * Custom Error Classes
 * Specific error types for the neurology exam app
 */ /**
 * Base error class for the application
 */ class NeurologyAppError extends Error {
    constructor(message, details = null){
        super(message);
        this.name = this.constructor.name;
        this.details = details;
        this.timestamp = new Date();
        // Maintain proper stack trace for where our error was thrown
        if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    }
    /**
     * Get localized error message
     */ getLocalizedMessage() {
        return this.message;
    }
    /**
     * Convert to plain object for logging
     */ toJSON() {
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
 */ class TopicNotFoundError extends NeurologyAppError {
    constructor(topicId){
        super(`T\xe9tel ${topicId} nem tal\xe1lhat\xf3`);
        this.topicId = topicId;
        this.details = {
            topicId
        };
    }
    getLocalizedMessage() {
        return `A k\xe9rt t\xe9tel (${this.topicId}) nem tal\xe1lhat\xf3. K\xe9rj\xfck, v\xe1lasszon egy m\xe1sik t\xe9telt.`;
    }
}
/**
 * Error thrown when markdown parsing fails
 */ class ParseError extends NeurologyAppError {
    constructor(message, line = null, markdown = null){
        super(`Feldolgoz\xe1si hiba: ${message}`);
        this.line = line;
        this.markdown = markdown;
        this.details = {
            line,
            markdownSnippet: markdown?.substring(0, 100)
        };
    }
    getLocalizedMessage() {
        let msg = "Hiba t\xf6rt\xe9nt a tartalom feldolgoz\xe1sa sor\xe1n.";
        if (this.line) msg += ` (${this.line}. sor)`;
        return msg;
    }
}
/**
 * Error thrown when a section is not found
 */ class SectionNotFoundError extends NeurologyAppError {
    constructor(sectionType){
        const sectionNames = {
            'reszletes': "R\xe9szletes",
            'osszefoglalas': "\xd6sszefoglal\xe1s",
            'kepek': "K\xe9pek/Diagrammok"
        };
        const sectionName = sectionNames[sectionType] || sectionType;
        super(`${sectionName} szakasz nem tal\xe1lhat\xf3`);
        this.sectionType = sectionType;
        this.details = {
            sectionType
        };
    }
    getLocalizedMessage() {
        const sectionNames = {
            'reszletes': "r\xe9szletes le\xedr\xe1s",
            'osszefoglalas': "\xf6sszefoglal\xe1s",
            'kepek': "k\xe9pek \xe9s diagrammok"
        };
        const sectionName = sectionNames[this.sectionType] || this.sectionType;
        return `A ${sectionName} nem \xe9rhet\u{151} el ehhez a t\xe9telhez.`;
    }
}
/**
 * Error thrown when file loading fails
 */ class FileLoadError extends NeurologyAppError {
    constructor(filename, originalError = null){
        super(`F\xe1jl bet\xf6lt\xe9si hiba: ${filename}`);
        this.filename = filename;
        this.originalError = originalError;
        this.details = {
            filename,
            originalMessage: originalError?.message,
            statusCode: originalError?.status
        };
    }
    getLocalizedMessage() {
        return `Nem siker\xfclt bet\xf6lteni a k\xe9rt tartalmat. K\xe9rj\xfck, pr\xf3b\xe1lja \xfajra k\xe9s\u{151}bb.`;
    }
}
/**
 * Error thrown when network request fails
 */ class NetworkError extends NeurologyAppError {
    constructor(url, statusCode = null, originalError = null){
        super(`H\xe1l\xf3zati hiba: ${url}`);
        this.url = url;
        this.statusCode = statusCode;
        this.originalError = originalError;
        this.details = {
            url,
            statusCode,
            originalMessage: originalError?.message
        };
    }
    getLocalizedMessage() {
        if (this.statusCode === 404) return "A k\xe9rt tartalom nem tal\xe1lhat\xf3.";
        else if (this.statusCode >= 500) return "Szerverhiba t\xf6rt\xe9nt. K\xe9rj\xfck, pr\xf3b\xe1lja \xfajra k\xe9s\u0151bb.";
        return "H\xe1l\xf3zati kapcsolat hiba. K\xe9rj\xfck, ellen\u0151rizze az internetkapcsolatot.";
    }
}
/**
 * Error thrown when cache operations fail
 */ class CacheError extends NeurologyAppError {
    constructor(operation, originalError = null){
        super(`Gyors\xedt\xf3t\xe1r hiba: ${operation}`);
        this.operation = operation;
        this.originalError = originalError;
        this.details = {
            operation,
            originalMessage: originalError?.message
        };
    }
    getLocalizedMessage() {
        return "Hiba t\xf6rt\xe9nt a gyors\xedt\xf3t\xe1r kezel\xe9se sor\xe1n.";
    }
}
/**
 * Error thrown when validation fails
 */ class ValidationError extends NeurologyAppError {
    constructor(field, value, requirement){
        super(`\xc9rv\xe9nyes\xedt\xe9si hiba: ${field}`);
        this.field = field;
        this.value = value;
        this.requirement = requirement;
        this.details = {
            field,
            value,
            requirement
        };
    }
    getLocalizedMessage() {
        return `\xc9rv\xe9nytelen \xe9rt\xe9k: ${this.field}. ${this.requirement}`;
    }
}
/**
 * Error thrown when initialization fails
 */ class InitializationError extends NeurologyAppError {
    constructor(component, originalError = null){
        super(`Inicializ\xe1l\xe1si hiba: ${component}`);
        this.component = component;
        this.originalError = originalError;
        this.details = {
            component,
            originalMessage: originalError?.message
        };
    }
    getLocalizedMessage() {
        return `Nem siker\xfclt bet\xf6lteni az alkalmaz\xe1s egy r\xe9sz\xe9t (${this.component}). K\xe9rj\xfck, friss\xedtse az oldalt.`;
    }
}
/**
 * Error thrown when browser feature is not supported
 */ class NotSupportedError extends NeurologyAppError {
    constructor(feature){
        super(`Nem t\xe1mogatott funkci\xf3: ${feature}`);
        this.feature = feature;
        this.details = {
            feature
        };
    }
    getLocalizedMessage() {
        return `A b\xf6ng\xe9sz\u{151} nem t\xe1mogatja ezt a funkci\xf3t: ${this.feature}. K\xe9rj\xfck, haszn\xe1ljon modern b\xf6ng\xe9sz\u{151}t.`;
    }
}
/**
 * Error utility functions
 */ const ErrorUtils = {
    /**
     * Check if error is a specific type
     */ isTopicNotFound (error) {
        return error instanceof TopicNotFoundError;
    },
    /**
     * Check if error is network related
     */ isNetworkError (error) {
        return error instanceof NetworkError || error instanceof FileLoadError || error.message && error.message.toLowerCase().includes('network');
    },
    /**
     * Check if error is recoverable
     */ isRecoverable (error) {
        return error instanceof NetworkError || error instanceof FileLoadError || error instanceof CacheError;
    },
    /**
     * Format error for user display
     */ formatForDisplay (error) {
        if (error instanceof NeurologyAppError) return error.getLocalizedMessage();
        // Generic error handling
        if (error.message.includes('Failed to fetch')) return "Nem siker\xfclt bet\xf6lteni a tartalmat. K\xe9rj\xfck, ellen\u0151rizze az internetkapcsolatot.";
        return "V\xe1ratlan hiba t\xf6rt\xe9nt. K\xe9rj\xfck, pr\xf3b\xe1lja \xfajra.";
    },
    /**
     * Log error with context
     */ logError (error, context = {}) {
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
if (typeof module !== 'undefined' && module.exports) module.exports = {
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

//# sourceMappingURL=frontend.a82d61c6.js.map
