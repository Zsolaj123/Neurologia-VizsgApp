# Frontend API Contracts

**Feature**: Neurology Exam Preparation Webapp  
**Date**: 2025-09-14  
**Version**: 1.0.0

## Overview
This document defines the internal JavaScript API contracts for the frontend modules. Since this is a vanilla JS application without a backend, these contracts represent the interfaces between different JavaScript modules.

## Module Contracts

### 1. TopicLoader Module

#### Interface: `topicLoader`

**Purpose**: Load and cache topic markdown files from the filesystem.

```javascript
// Load a single topic by ID
async function loadTopic(topicId: number): Promise<Topic>

// Load topic metadata for menu
async function loadTopicMetadata(category: string): Promise<TopicMetadata[]>

// Check if topic file exists
async function topicExists(topicId: number): Promise<boolean>

// Clear topic from cache
function clearCache(topicId?: number): void

// Get cache statistics
function getCacheStats(): CacheStats
```

**Contract Tests**:
```javascript
// Test: Load existing topic
// Given: Topic 15 exists in neuroanat/1-20/
// When: loadTopic(15) is called
// Then: Returns Topic object with all sections

// Test: Load non-existent topic  
// Given: Topic 999 does not exist
// When: loadTopic(999) is called
// Then: Throws TopicNotFoundError

// Test: Cache hit
// Given: Topic 15 is already cached
// When: loadTopic(15) is called twice
// Then: Second call returns from cache without file access
```

### 2. MarkdownParser Module

#### Interface: `markdownParser`

**Purpose**: Parse markdown content and extract sections.

```javascript
// Parse markdown to HTML
function parseMarkdown(markdown: string): ParsedContent

// Extract sections by headers
function extractSections(markdown: string): Sections

// Generate table of contents
function generateToc(markdown: string): TocItem[]

// Parse frontmatter tags
function parseTags(markdown: string): string[]
```

**Contract Tests**:
```javascript
// Test: Parse section headers
// Given: Markdown with # Részletes, # Összefoglalás, # Képek
// When: extractSections(markdown) is called
// Then: Returns object with three named sections

// Test: Handle missing sections
// Given: Markdown with only # Részletes
// When: extractSections(markdown) is called  
// Then: Returns osszefoglalas and kepek as empty sections

// Test: Generate nested TOC
// Given: Markdown with h1, h2, h3 headers
// When: generateToc(markdown) is called
// Then: Returns nested TocItem array
```

### 3. UIManager Module

#### Interface: `uiManager`

**Purpose**: Manage UI state and user interactions.

```javascript
// Initialize UI components
function init(): void

// Display topic content
function displayTopic(topic: Topic): void

// Switch content section
function switchSection(sectionType: string): void

// Toggle sidebar visibility
function toggleSidebar(side: 'left' | 'right'): void

// Update table of contents
function updateToc(tocItems: TocItem[]): void

// Show error message
function showError(message: string, details?: any): void

// Get current UI state
function getState(): UIState
```

**Contract Tests**:
```javascript
// Test: Display topic
// Given: Valid topic object
// When: displayTopic(topic) is called
// Then: Updates DOM with topic content and TOC

// Test: Switch sections
// Given: Topic with all three sections displayed
// When: switchSection('osszefoglalas') is called
// Then: Shows summary content, updates active tab

// Test: Handle empty section
// Given: Topic with empty kepek section
// When: switchSection('kepek') is called
// Then: Shows "Nincs elérhető képek" message
```

### 4. TocGenerator Module

#### Interface: `tocGenerator`

**Purpose**: Generate and manage table of contents.

```javascript
// Generate TOC from headers
function generateFromHeaders(headers: Header[]): TocItem[]

// Create TOC HTML
function renderToc(tocItems: TocItem[]): string

// Handle TOC navigation
function navigateToSection(sectionId: string): void

// Highlight current section
function updateActiveSection(sectionId: string): void
```

**Contract Tests**:
```javascript
// Test: Generate flat TOC
// Given: Headers all at h2 level
// When: generateFromHeaders(headers) is called
// Then: Returns flat array of TocItems

// Test: Navigate to section
// Given: TOC with section "symptoms"
// When: navigateToSection('symptoms') is called
// Then: Scrolls to element with id="symptoms"

// Test: Update active highlight
// Given: Multiple TOC items displayed
// When: updateActiveSection('treatment') is called
// Then: Adds active class to treatment item only
```

## Event Contracts

### Application Events

The application uses a simple event system for module communication:

```javascript
// Topic loaded event
window.dispatchEvent(new CustomEvent('topicLoaded', {
  detail: { topicId: number, topic: Topic }
}));

// Section switched event
window.dispatchEvent(new CustomEvent('sectionSwitched', {
  detail: { sectionType: string }
}));

// Error occurred event
window.dispatchEvent(new CustomEvent('appError', {
  detail: { type: string, message: string, details: any }
}));

// Cache cleared event
window.dispatchEvent(new CustomEvent('cacheCleared', {
  detail: { topicId?: number }
}));
```

## Error Contracts

### Error Types

```javascript
class TopicNotFoundError extends Error {
  constructor(topicId: number) {
    super(`Tétel ${topicId} nem található`);
    this.name = 'TopicNotFoundError';
    this.topicId = topicId;
  }
}

class ParseError extends Error {
  constructor(message: string, line?: number) {
    super(`Feldolgozási hiba: ${message}`);
    this.name = 'ParseError';
    this.line = line;
  }
}

class SectionNotFoundError extends Error {
  constructor(sectionType: string) {
    super(`${sectionType} szakasz nem található`);
    this.name = 'SectionNotFoundError';
    this.sectionType = sectionType;
  }
}
```

## DOM Contracts

### Required DOM Elements

The application expects these elements in index.html:

```html
<!-- Main containers -->
<div id="app-container">
  <aside id="left-sidebar" class="topic-list"></aside>
  <main id="content-area"></main>
  <aside id="right-sidebar" class="toc-sidebar"></aside>
</div>

<!-- Section tabs -->
<nav id="section-tabs">
  <button data-section="reszletes">Részletes</button>
  <button data-section="osszefoglalas">Összefoglalás</button>
  <button data-section="kepek">Képek/Diagrammok</button>
</nav>

<!-- Error display -->
<div id="error-container" class="hidden"></div>
```

### CSS Class Contracts

Expected CSS classes for styling:

```css
.active        /* Active state for tabs/menu items */
.hidden        /* Hide elements */
.loading       /* Loading state */
.error         /* Error styling */
.empty-state   /* Empty content message */
.topic-item    /* Topic menu item */
.toc-item      /* TOC entry */
.toc-level-1   /* TOC nesting levels */
.toc-level-2
.toc-level-3
.section-content /* Content area */
```

## Integration Points

### Module Dependencies

```
app.js
  ├── topicLoader.js
  │     └── uses: markdownParser.js
  ├── uiManager.js  
  │     └── uses: tocGenerator.js
  └── Event listeners connecting modules
```

### Initialization Sequence

```javascript
1. DOMContentLoaded
2. uiManager.init()
3. topicLoader.loadTopicMetadata()
4. Display topic menu
5. Load initial topic (if specified in URL)
6. Set up event listeners
```

## Performance Contracts

### Response Time Targets
- Topic loading: < 100ms (cached), < 500ms (uncached)
- Section switching: < 50ms
- TOC generation: < 50ms
- Markdown parsing: < 100ms for typical topic

### Memory Constraints
- Cache size: Maximum 50 topics
- DOM nodes: Cleanup on topic switch
- Event listeners: Proper removal on destroy