# Development Guide

## Architecture Overview

The application follows a Model-View-Controller (MVC) pattern with modular JavaScript.

### JavaScript Modules

1. **app.js** - Application entry point
   - Initializes all modules
   - Sets up global error handling
   - Manages application lifecycle

2. **models/**
   - `topic.js` - Topic data model and section management
   - `app-state.js` - Global state management and caching
   - `errors.js` - Custom error classes

3. **modules/**
   - `ui-manager.js` - Handles all UI interactions and updates
   - `topic-loader.js` - Loads and caches topic content
   - `markdown-parser.js` - Parses markdown with Obsidian features
   - `toc-generator.js` - Generates table of contents

4. **data/**
   - `topic-metadata.js` - Maps topic IDs to file locations

### CSS Architecture

The CSS is organized into three main files:

1. **main.css** - Core application styles
   - CSS variables and theme
   - Base reset and typography
   - Layout structure
   - Component basics
   - Utilities and responsive styles

2. **topic-menu.css** - Topic navigation
   - Collapsible menu system
   - Category and range styling
   - Topic item interactions
   - Badges and indicators

3. **content.css** - Content rendering
   - Markdown typography
   - Table styling
   - Image handling
   - Table of contents

### Adding New Topics

1. Add the topic file to the appropriate content directory:
   - `content/neuroanat/` for topics 1-59
   - `content/clinical/` for topics 60-179
   - `content/detailed-clinical/` for topics 180-259

2. Update `topic-metadata.js` with the new topic:
   ```javascript
   260: { 
     title: "New Topic Title", 
     folder: "240-259", 
     category: "detailed-clinical" 
   }
   ```

3. If the topic shares a file with another topic, update `getTopicFilename()` in `topic-loader.js`

### Styling Guidelines

- Use CSS variables for all colors and spacing
- Follow the established naming conventions
- Maintain the cyberpunk theme consistency
- Test on multiple screen sizes

### Code Style

- Use ES6+ features (const/let, arrow functions, template literals)
- Follow modular architecture patterns
- Add JSDoc comments for public methods
- Handle errors gracefully with custom error classes

### Testing

1. Test all topic navigation functionality
2. Verify markdown rendering for complex content
3. Check responsive behavior on different devices
4. Test collapsed state persistence
5. Verify all 259 topics load correctly

### Performance Considerations

- Topics are cached after first load
- Images are lazy-loaded
- CSS animations use GPU-accelerated properties
- Collapsed states are stored in localStorage

### Browser Support

Ensure compatibility with:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Common Issues

1. **Topic not loading**: Check file path in topic-metadata.js
2. **Styling issues**: Clear browser cache, check CSS load order
3. **JavaScript errors**: Check browser console, verify module dependencies
4. **Performance**: Check for memory leaks in topic caching