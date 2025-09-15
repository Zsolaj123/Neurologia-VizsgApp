# Quickstart Guide: Neurology Exam Preparation Webapp

**Version**: 1.0.0  
**Date**: 2025-09-14

## Overview
This guide helps you quickly set up and verify the neurology exam preparation webapp. Follow these steps to get the application running and test its core functionality.

## Prerequisites

- Modern web browser (Chrome 60+, Firefox 60+, Safari 12+, or Edge 79+)
- Web server to serve static files (or use Python's built-in server)
- Topic markdown files in the correct directory structure

## Quick Setup

### 1. File Structure Setup

Ensure your project has this structure:

```
reszvizsga_app2/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── app.css
│   │   ├── cyberpunk.css
│   │   └── components.css
│   ├── js/
│   │   ├── app.js
│   │   └── modules/
│   │       ├── markdown-parser.js
│   │       ├── topic-loader.js
│   │       ├── toc-generator.js
│   │       └── ui-manager.js
│   └── content/
│       └── neuroanat/
│           ├── 1-20/
│           │   ├── tetel_01.md
│           │   ├── tetel_02.md
│           │   └── ...
│           ├── 21-40/
│           └── 41-59/
```

### 2. Copy Template Content

Copy the neuroanatomy markdown files from the template:

```bash
# Copy markdown files from template
cp -r template_reszvizsga_app/Neuroanat/* frontend/content/neuroanat/

# Copy CSS styles from template  
cp template_reszvizsga_app/css/app.css frontend/css/
```

### 3. Start Web Server

```bash
# Navigate to frontend directory
cd frontend/

# Python 3
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Or use any other static file server
```

### 4. Open Application

Open your browser and navigate to: `http://localhost:8000`

## Verification Steps

### Test 1: Initial Load
**Expected**: 
- Green neon cyberpunk theme visible
- Left sidebar shows topic list (Tétel 1-60)
- Main content area displays welcome message
- Right sidebar is empty (no TOC yet)

### Test 2: Load a Topic
**Steps**:
1. Click on "Tétel 15" in the left sidebar
2. **Expected**:
   - Topic content loads in main area
   - "Részletes" tab is active
   - Table of contents appears in right sidebar
   - Content has proper formatting

### Test 3: Section Navigation
**Steps**:
1. With a topic loaded, click "Összefoglalás" tab
2. **Expected**:
   - Summary content displays (or "Nincs elérhető összefoglalás" if empty)
   - Tab becomes active (green highlight)
3. Click "Képek/Diagrammok" tab
4. **Expected**:
   - Images section displays (or empty message)

### Test 4: Table of Contents
**Steps**:
1. Click on a heading in the right sidebar TOC
2. **Expected**:
   - Page scrolls smoothly to that section
   - TOC item highlights briefly

### Test 5: Topic Switching
**Steps**:
1. Load "Tétel 20"
2. Quickly switch to "Tétel 25"
3. **Expected**:
   - Content updates without delay
   - No loading flicker (if cached)
   - TOC updates to new topic

### Test 6: Error Handling
**Steps**:
1. Try to manually navigate to topic 999 (modify URL)
2. **Expected**:
   - Error message: "Tétel 999 nem található"
   - Can still navigate to valid topics

### Test 7: Responsive Layout
**Steps**:
1. Resize browser window
2. **Expected**:
   - Sidebars collapse at < 768px width
   - Content remains readable
   - Mobile menu appears

## Common Issues & Solutions

### Issue: Topics not loading
**Solution**: 
- Check browser console for errors
- Verify markdown files are in correct directories
- Ensure file permissions allow reading

### Issue: Styling looks wrong
**Solution**:
- Clear browser cache
- Check all CSS files are loaded
- Verify app.css has the cyberpunk variables

### Issue: TOC not generating
**Solution**:
- Check markdown has proper headers (# ## ###)
- Look for JavaScript errors in console
- Verify toc-generator.js is loaded

### Issue: Sections not switching
**Solution**:
- Check section headers in markdown (# Részletes, etc.)
- Verify event listeners are attached
- Look for JavaScript errors

## Development Verification

### Running Contract Tests

Open `test.html` in your browser to run the contract tests:

```bash
# Navigate to test file
http://localhost:8000/test.html
```

**Expected**: All tests pass (green checkmarks)

### Performance Check

1. Open browser DevTools
2. Go to Network tab
3. Load a topic
4. **Expected**:
   - Topic loads in < 500ms
   - Cached topics load in < 100ms

### Memory Check

1. Open browser DevTools
2. Go to Memory tab
3. Load 10-15 different topics
4. **Expected**:
   - Memory usage stays stable
   - No memory leaks detected

## Next Steps

Once all verification steps pass:

1. **Customize Content**: Add more topics beyond neuroanatomy
2. **Enhance Features**: Add search, bookmarks, progress tracking
3. **Optimize Performance**: Implement service worker for offline use
4. **Add Analytics**: Track which topics are most viewed

## Support

If you encounter issues:

1. Check browser console for detailed error messages
2. Verify all files are in correct locations
3. Ensure markdown files use UTF-8 encoding
4. Test in different browsers

## Success Criteria

The application is ready when:
- ✅ All topics (1-60) load correctly
- ✅ Section navigation works smoothly
- ✅ TOC generates and navigates properly
- ✅ Error messages display in Hungarian
- ✅ Cyberpunk theme displays correctly
- ✅ Performance meets targets (< 500ms load)