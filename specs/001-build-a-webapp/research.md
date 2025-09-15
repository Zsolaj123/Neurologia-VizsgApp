# Phase 0: Research & Technical Decisions

**Feature**: Neurology Exam Preparation Webapp  
**Date**: 2025-09-14  
**Status**: Complete

## Overview
This document captures research findings and technical decisions for building the neurology exam preparation webapp. All NEEDS CLARIFICATION items from the specification have been resolved through analysis of the template project and technical requirements.

## Key Research Findings

### 1. Markdown Processing Strategy
**Decision**: Implement custom lightweight markdown parser  
**Rationale**: 
- No external dependencies requirement
- Need to handle specific Obsidian-style markdown headers
- Must differentiate between section types (Részletes, Összefoglalás, Képek)
**Alternatives considered**: 
- Using marked.js or similar library - rejected due to vanilla JS requirement
- Server-side rendering - rejected as no backend needed

### 2. File Organization & Topic Structure
**Decision**: Mirror template's folder structure with topics grouped by ranges  
**Rationale**:
- Template uses `/Neuroanat/1-20/`, `/Neuroanat/21-40/`, `/Neuroanat/41-59/`
- Easier to manage and locate files
- Natural grouping for navigation
**Alternatives considered**:
- Single flat directory - rejected as harder to manage
- Database storage - rejected as adds unnecessary complexity

### 3. UI/UX Architecture
**Decision**: Three-panel layout with dynamic content switching  
**Rationale**:
- Main content area for selected section
- Left sidebar for topic selection
- Right sidebar for table of contents
- Separate viewing modes for Részletes, Összefoglalás, Képek sections
**Alternatives considered**:
- Single page with all content - rejected as overwhelming
- Multiple browser windows - rejected as harder to manage state

### 4. Styling Approach
**Decision**: Adopt template's green neon cyberpunk theme directly  
**Rationale**:
- Requirement to preserve existing template styling
- Already tested and visually appealing
- Includes all necessary CSS variables and effects
**Key elements**:
- Primary green: `#00FF41`
- Neon glow effects
- Glass morphism backgrounds
- Orbitron and JetBrains Mono fonts

### 5. State Management
**Decision**: Simple JavaScript object-based state  
**Rationale**:
- No complex state requirements
- Easy to implement and debug
- Sufficient for current scope
**Alternatives considered**:
- Local storage persistence - deferred to future iteration
- URL-based state - deferred to future iteration

### 6. Error Handling Approach
**Decision**: Graceful degradation with user-friendly messages  
**Rationale**:
- Show empty state for missing summaries/images
- Display error message for missing topics
- Log detailed errors to console for debugging
**Implementation**:
- Try-catch blocks around file loading
- Fallback content for missing sections
- Hungarian error messages for consistency

### 7. Performance Optimization
**Decision**: Implement basic caching for loaded topics  
**Rationale**:
- Avoid re-parsing markdown on topic switches
- Improve perceived performance
- Simple Map-based cache implementation
**Alternatives considered**:
- Service Worker caching - over-engineered for current needs
- No caching - would impact user experience

### 8. Browser Compatibility
**Decision**: Target modern browsers with ES6+ support  
**Rationale**:
- Medical students likely use updated browsers
- Allows use of modern JavaScript features
- Simplifies development
**Minimum versions**:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Resolved Clarifications

### FR-009: Handling Missing Content
**Resolution**: Show section buttons but display "Nincs elérhető [section type]" message when clicked

### FR-010: Simultaneous Panels
**Resolution**: Maximum 3 panels (main content + 2 sidebars), with ability to hide sidebars

### FR-011: Session Persistence
**Resolution**: Deferred to future iteration - no persistence in v1.0.0

## Technical Dependencies

### Frontend Structure
```
frontend/
├── index.html              # Main application page
├── css/
│   ├── app.css            # Main styles (from template)
│   ├── cyberpunk.css      # Theme-specific styles
│   └── components.css     # UI component styles
├── js/
│   ├── modules/
│   │   ├── markdown-parser.js
│   │   ├── topic-loader.js
│   │   ├── toc-generator.js
│   │   └── ui-manager.js
│   └── app.js             # Main application entry
└── content/
    └── neuroanat/
        ├── 1-20/
        ├── 21-40/
        └── 41-59/
```

### Key Implementation Notes

1. **Markdown Headers Recognition**:
   - `# Részletes` - Main detailed content
   - `# Összefoglalás` or `# Összefoglaló` - Summary section  
   - `# Képek` or `# Diagrammok` - Images section
   - Other headers used for TOC generation

2. **Dynamic Content Loading**:
   ```javascript
   // Pseudo-code for topic loading
   async function loadTopic(topicId) {
     const cached = topicCache.get(topicId);
     if (cached) return cached;
     
     const markdown = await fetchTopicMarkdown(topicId);
     const parsed = parseMarkdown(markdown);
     const sections = extractSections(parsed);
     
     topicCache.set(topicId, sections);
     return sections;
   }
   ```

3. **UI State Management**:
   ```javascript
   const appState = {
     currentTopic: null,
     activeSection: 'részletes',
     sidebarVisible: { left: true, right: true },
     tocItems: []
   };
   ```

## Next Steps

With all technical decisions made and clarifications resolved, we can proceed to Phase 1 to create the data model, contracts, and quickstart guide for the implementation.