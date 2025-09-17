# Neurológia VizsgApp - Architecture Documentation

## Overview
This document describes the architecture and organization of the Neurológia VizsgApp, a web application for studying neurology topics with a cyberpunk-themed UI.

## Application Structure

### Layout Components
1. **Fixed Header** (60px height)
   - App title with glowing text effect
   - Author credit positioned on the right

2. **Three-Column Grid Layout**
   - Left Sidebar: Topic navigation (320px width)
   - Main Content: Topic display area (flexible width)
   - Right Sidebar: Table of contents (280px width)

3. **Sticky Sidebars**
   - Both sidebars use `position: sticky` to remain visible while scrolling
   - Positioned 60px from top (below fixed header)
   - Internal scrolling for long content

## CSS Architecture

### File Structure
```
css/
├── app-unified.css          # Base styles, layout, components
├── sidebar-styles.css       # All sidebar-related styles (consolidated)
├── sidebar-fixes.css        # Final fixes and overrides (load last)
├── notes/                   # CSS documentation
│   ├── CSS_BEST_PRACTICES_NEURATOS.md
│   └── RECURRENT_CSS_ISSUES.md
└── archive/                 # Old/deprecated CSS files
```

### CSS Cascade Order
1. `app-unified.css` - Base styles and main layout
2. `sidebar-styles.css` - Sidebar overrides and sticky positioning fixes
3. `sidebar-fixes.css` - Final fixes to resolve all conflicts (MUST load last)

### Key CSS Variables
```css
:root {
    --header-height: 60px;
    --sidebar-width: 320px;
    --toc-width: 280px;
    --section-tabs-height: 60px;
    --sticky-top: calc(var(--header-height) + var(--section-tabs-height));
    --primary-green: #00ff41;
    --bg-primary: #0a0a0a;
    --bg-secondary: #121212;
    --bg-tertiary: #1a1a1a;
}
```

### Sticky Positioning Requirements
For sticky sidebars to work properly:
1. `html` must have `overflow-y: visible` (NOT `auto`)
2. `body` must have `overflow: visible`
3. `#app-container` must have `overflow: visible`
4. `#content-area` must have `overflow: visible`
5. Only `#content-display` should have `overflow-y: auto`

**IMPORTANT**: The sidebars are positioned to align with the section tabs:
- Sticky top position: `calc(var(--header-height) + var(--section-tabs-height))` = 120px
- This ensures sidebars start at the same level as the content, below the section tabs

### Z-Index Hierarchy
Consistent z-index values prevent layering conflicts:
- Header: `1000` (highest)
- Fixed toggle buttons: `900`
- Toggle buttons in headers: `120`
- Sidebar headers: `110`
- Sidebar content: `100`
- Section tabs: `80`
- Regular content: `1` (lowest)

### Hidden State Handling
The generic `.hidden` class uses `display: none !important` which conflicts with sidebar animations.
Sidebars override this with:
```css
#left-sidebar.hidden,
#right-sidebar.hidden {
    display: block !important; /* Override global .hidden */
    width: 0;
    visibility: hidden;
}
```

## JavaScript Architecture

### Module Structure
```
js/
├── models/              # Data models
│   ├── topic.js        # Topic data structure
│   ├── app-state.js    # Global state management
│   └── errors.js       # Error handling classes
├── modules/            # Core functionality
│   ├── ui-manager.js   # Main UI controller
│   ├── topic-loader.js # Topic loading logic
│   ├── markdown-parser.js # Markdown to HTML
│   └── toc-generator.js # Table of contents
├── app.js              # App initialization
├── app-unified.js      # Additional UI logic
└── sidebar-manager-consolidated.js # Sidebar toggle management
```

### Event Flow - Sidebar Toggle
1. **User clicks toggle button** → `sidebar-manager-consolidated.js`
2. **SidebarManager.toggleSidebar()** is called
3. **Calls uiManager.toggleSidebar()** if available (for state persistence)
4. **Updates DOM**: Adds/removes `.hidden` class on sidebar
5. **Updates body classes**: For CSS fallbacks (browsers without :has() support)
6. **Updates button icons**: Triangles change direction based on state
7. **Saves state**: Via `appState.saveUIState()`

### State Management Pattern
- **Global State**: Managed by `app-state.js`
- **UI State**: Includes sidebar visibility, current topic, active section
- **Persistence**: LocalStorage for UI preferences
- **State Flow**: User Action → UI Manager → App State → LocalStorage

## Component Details

### Toggle Buttons
Two types of toggle buttons:
1. **Header Buttons** (inside sidebar headers)
   - Glowing triangles with pulse animation
   - Left sidebar: Button on right (◀ when open, ▶ when closed)
   - Right sidebar: Button on left (▶ when open, ◀ when closed)

2. **Fixed Buttons** (appear when sidebars are hidden)
   - Positioned at screen edges
   - Same glowing triangle style
   - Only visible when corresponding sidebar is hidden

### Sidebar Behavior
- **Collapsible**: Click triangle to hide/show
- **Sticky**: Remains visible while scrolling main content
- **Responsive**: On mobile, sidebars overlay content instead of pushing

### Content Area
- **Section Tabs**: Switch between Részletes, Összefoglalás, Képek
- **Scrollable Content**: Only the content area scrolls, not the entire page
- **Markdown Rendering**: Content is parsed from markdown files

## Browser Compatibility

### CSS Features Used
- CSS Grid (with fallbacks)
- CSS Custom Properties
- `:has()` selector (with class-based fallbacks)
- `position: sticky` (with -webkit- prefix)

### Fallback Strategies
1. **For :has() selector**: Body classes track sidebar states
2. **For sticky positioning**: Included webkit prefixes
3. **For grid layout**: Mobile media queries switch to overlay mode

## Performance Considerations

1. **CSS Consolidation**: Reduced from 12+ files to 2 main files
2. **Event Delegation**: Single event listener for topic menu clicks
3. **Debounced Scrolling**: TOC sync uses debounced scroll handler
4. **Lazy Loading**: Topics loaded on demand, not all at once

## Maintenance Guidelines

### Adding New Features
1. Keep sidebar-related CSS in `sidebar-styles.css`
2. Use CSS variables for consistency
3. Test sticky positioning after any overflow changes
4. Maintain the event flow pattern for new interactions

### Common Issues & Solutions
1. **Sticky sidebars not working**
   - Check parent element overflow values (must be `visible`)
   - Verify `html` has `overflow-y: visible` NOT `auto`
   - Use consistent `--sticky-top` variable: `calc(var(--header-height) + var(--section-tabs-height))`
   - Ensure `sidebar-fixes.css` loads last in cascade

2. **Right sidebar animation not smooth**
   - Ensure both sidebars have identical transition properties
   - Remove transitions from child sticky elements
   - Check for conflicting width calculations in collapsed state

3. **Toggle buttons teleporting**
   - Add special collapsed state handling for headers
   - Hide sidebar title in collapsed state
   - Center button with proper padding adjustments

4. **Sidebars misaligned with content**
   - Use standardized `--sticky-top` variable everywhere
   - Section tabs must be `position: sticky` at `top: var(--header-height)`
   - Content display height must match sidebar height calculation

5. **CSS cascade conflicts**
   - Load order: `app-unified.css` → `sidebar-styles.css` → `sidebar-fixes.css`
   - Avoid `!important` - use higher specificity selectors instead
   - Use `:not()` pseudo-class for exceptions
   - Document all fixes in `/css/notes/` directory

## File Dependencies

### HTML Load Order
1. `app-unified.css` - Base styles
2. `sidebar-styles.css` - Sidebar overrides
3. All JS models and modules
4. `app.js` - Initialization
5. `app-unified.js` - Additional UI
6. `sidebar-manager-consolidated.js` - Sidebar management

### Critical Dependencies
- `ui-manager.js` must load before `sidebar-manager-consolidated.js`
- CSS files must load in correct order for proper cascade
- Font files load asynchronously (non-blocking)