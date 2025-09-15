# Data Model Specification

**Feature**: Neurology Exam Preparation Webapp  
**Date**: 2025-09-14  
**Version**: 1.0.0

## Overview
This document defines the data structures and models used in the neurology exam preparation webapp. Since this is a frontend-only application, these models represent the in-memory data structures used by the JavaScript application.

## Core Entities

### 1. Topic (Tétel)
Represents a single exam topic with its content sections.

```javascript
{
  id: number,              // Topic ID (1-259)
  title: string,           // Topic title in Hungarian
  category: string,        // Category (e.g., "neuroanat")
  range: string,          // Range grouping (e.g., "1-20")
  tags: string[],         // Tags from markdown (e.g., ["részvizsga", "neuroanat"])
  sections: {
    reszletes: Section,     // Detailed content section
    osszefoglalas: Section, // Summary section (optional)
    kepek: Section         // Images section (optional)
  },
  tableOfContents: TocItem[], // Generated TOC
  lastModified: Date,     // For cache invalidation
  isBundled: boolean      // True if part of a bundled topic
}
```

### 2. Section
Represents a content section within a topic.

```javascript
{
  type: string,           // "reszletes" | "osszefoglalas" | "kepek"
  title: string,          // Section title from markdown
  content: string,        // Parsed HTML content
  rawMarkdown: string,    // Original markdown
  isEmpty: boolean        // True if section not found
}
```

### 3. TocItem
Represents a table of contents entry.

```javascript
{
  id: string,             // Unique ID for anchoring
  text: string,           // Header text
  level: number,          // Header level (1-4)
  children: TocItem[]     // Nested items
}
```

### 4. AppState
Global application state.

```javascript
{
  currentTopic: Topic | null,     // Currently loaded topic
  activeSection: string,          // "reszletes" | "osszefoglalas" | "kepek"
  ui: {
    leftSidebarVisible: boolean,  // Topic list sidebar
    rightSidebarVisible: boolean, // TOC sidebar
    contentZoom: number,          // Content zoom level (%)
    theme: string                 // "cyberpunk" (future: allow themes)
  },
  cache: {
    topics: Map<number, Topic>,   // Cached parsed topics
    maxSize: number,              // Maximum cache size
    hits: number,                 // Cache statistics
    misses: number
  },
  errors: ErrorLog[]              // Error tracking
}
```

### 5. ErrorLog
Tracks errors for debugging.

```javascript
{
  timestamp: Date,
  type: string,           // "load" | "parse" | "render"
  message: string,        // Error message in Hungarian
  details: any,           // Additional error details
  topicId: number | null  // Related topic if applicable
}
```

### 6. TopicMetadata
Lightweight topic information for menu display.

```javascript
{
  id: number,
  title: string,
  category: string,
  hasOsszefoglalas: boolean,
  hasKepek: boolean
}
```

## Relationships

1. **Topic Bundling**: Some topics (especially near the end) are bundled together in single markdown files. The system must handle:
   - Multiple topic IDs pointing to the same file
   - Extracting specific topic content from bundled files

2. **Category Grouping**: Topics are organized by category and range:
   - neuroanat: Topics 1-59 (ranges: 1-20, 21-40, 41-59)
   - Future: Additional categories for topics 60-259

3. **Content Hierarchy**: 
   - Topic → Sections → Content
   - Topic → Table of Contents → Nested headers

## Validation Rules

### Topic Validation
- `id`: Must be between 1-259
- `title`: Required, non-empty string
- `category`: Must match known categories
- `sections.reszletes`: Always required
- `sections.osszefoglalas`: Optional but marked as empty if missing
- `sections.kepek`: Optional but marked as empty if missing

### Section Validation
- `type`: Must be one of allowed types
- `content`: Can be empty but not null
- `rawMarkdown`: Preserved for future features

### State Validation
- `currentTopic`: Can be null (no topic loaded)
- `activeSection`: Must match a section type in current topic
- `cache.maxSize`: Default 50 topics
- `ui.contentZoom`: Between 50-200%

## State Transitions

### Topic Loading Flow
```
1. User selects topic from menu
2. Check cache for existing topic
3. If not cached:
   - Load markdown file
   - Parse markdown
   - Extract sections
   - Generate TOC
   - Store in cache
4. Update currentTopic
5. Reset activeSection to "reszletes"
6. Update UI
```

### Section Switching Flow
```
1. User clicks section tab
2. Validate section exists
3. Update activeSection
4. Render new content
5. Preserve scroll position if same topic
```

### Error Handling States
```
- FileNotFound → Show "Tétel nem található" message
- ParseError → Show "Hiba a tétel betöltésekor" message
- SectionEmpty → Show "Nincs elérhető [section]" message
```

## Cache Management

### Cache Policy
- **Size limit**: 50 topics maximum
- **Eviction**: Least Recently Used (LRU)
- **Invalidation**: Based on file modification time
- **Persistence**: None in v1.0.0 (memory only)

### Cache Key Structure
```javascript
// Cache key format
`topic_${categoryId}_${topicId}`

// Example
"topic_neuroanat_15"
```

## Future Considerations

1. **Search Index**: Pre-built index for topic search
2. **Bookmarks**: User's favorite topics
3. **Progress Tracking**: Which topics have been studied
4. **Notes**: User annotations on topics
5. **Offline Support**: Service worker caching

These features are documented here for future reference but are NOT part of v1.0.0 implementation.