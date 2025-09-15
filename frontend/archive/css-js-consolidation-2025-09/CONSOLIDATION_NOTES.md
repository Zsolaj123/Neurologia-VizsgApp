# CSS/JS Consolidation Notes - September 2025

## Overview
Consolidated multiple conflicting CSS and JavaScript files into single, maintainable files.

## Previous Structure (Problematic)
- Multiple CSS files with conflicting rules
- Excessive use of !important declarations
- JavaScript with inline style manipulation
- Duplicate implementations of the same features
- CSS specificity battles

## New Structure (Clean)
- `css/app-unified.css` - Single CSS file with all styles
- `js/app-unified.js` - Single JavaScript file for UI enhancements

## Key Fixes
1. **Sticky Sidebars**: Fixed by ensuring parent containers have `overflow: visible`
2. **Toggle Buttons**: Pure CSS visibility control using `:has()` selector
3. **TOC Highlighting**: Single implementation with proper scroll detection
4. **No Conflicts**: Clean cascade without !important abuse

## Archived Files
- main.css
- topic-menu.css
- content.css
- nuclear-override.css
- nuclear-fixes.js
- Various backup files

## Benefits
- Single source of truth
- No conflicts
- Maintainable code
- Predictable behavior
- Clean architecture