# CSS Best Practices for Neuratos VizsgApp

## Overview
This document outlines CSS best practices and common issues encountered in the Neuratos VizsgApp project, with solutions and preventive measures.

## Common Issues and Solutions

### 1. Sticky Positioning Not Working

**Common Causes:**
- Parent elements have `overflow: hidden` or `overflow: auto`
- Missing `position: relative` on the parent container
- Conflicting height calculations
- Z-index stacking issues

**Solution:**
```css
/* Ensure all parent elements have visible overflow */
html { overflow-y: visible; }
body { overflow: visible; }
#app-container { overflow: visible; }

/* Only the scrollable content area should have overflow */
#content-display {
    overflow-y: auto;
    height: calc(100vh - var(--header-height) - var(--section-tabs-height));
}
```

### 2. CSS Animation Conflicts

**Issue:** Animations not smooth or instant transitions

**Common Causes:**
- Multiple transition properties on the same element
- Conflicting transition durations
- Transitions on child elements interfering with parent

**Best Practice:**
```css
/* Define transitions clearly on the animating element */
.sidebar-container {
    transition: width 1.2s cubic-bezier(0.86, 0, 0.07, 1);
}

/* Remove transitions from child elements */
.sidebar-container .sticky-element {
    transition: none;
}
```

### 3. Avoiding !important Overuse

**Why to Avoid:**
- Creates specificity wars
- Makes CSS hard to maintain
- Difficult to override when needed

**Better Alternatives:**
1. **Use higher specificity selectors:**
   ```css
   /* Instead of: */
   .hidden { display: none !important; }
   
   /* Use: */
   .container .hidden { display: none; }
   /* Or: */
   div.hidden { display: none; }
   ```

2. **Use :not() pseudo-class for exceptions:**
   ```css
   .hidden:not(.sidebar-container) { display: none; }
   ```

3. **Use CSS custom properties for consistency:**
   ```css
   :root { --sticky-top: calc(var(--header-height) + var(--section-tabs-height)); }
   .sticky-element { top: var(--sticky-top); }
   ```

### 4. Grid Layout with Dynamic Columns

**Issue:** Grid columns not adjusting smoothly when sidebars collapse

**Solution:** Use CSS :has() with fallbacks
```css
/* Modern browsers */
#app-container:has(.sidebar.collapsed) {
    grid-template-columns: 25px 1fr var(--sidebar-width);
}

/* Fallback for older browsers */
@supports not selector(:has(*)) {
    .sidebar-collapsed #app-container {
        grid-template-columns: 25px 1fr var(--sidebar-width);
    }
}
```

### 5. Z-Index Management

**Best Practice:** Define z-index hierarchy in variables
```css
:root {
    --z-header: 1000;
    --z-toggle-fixed: 900;
    --z-sidebar-header: 110;
    --z-sidebar-content: 100;
    --z-section-tabs: 80;
    --z-content: 1;
}
```

## File Organization

### Recommended Structure:
```
css/
├── app-unified.css      # Base styles, resets, layout
├── sidebar-styles.css   # All sidebar-specific styles
├── sidebar-fixes.css    # Override conflicts, fixes
└── notes/              # Documentation
    └── CSS_BEST_PRACTICES_NEURATOS.md
```

### CSS Load Order:
1. `app-unified.css` - Foundation styles
2. `sidebar-styles.css` - Component styles
3. `sidebar-fixes.css` - Fixes and overrides (load last)

## Debugging Tips

### 1. Sticky Not Working?
```javascript
// Check in browser console
const element = document.querySelector('.sticky-element');
let parent = element.parentElement;
while (parent) {
    const overflow = getComputedStyle(parent).overflow;
    if (overflow !== 'visible') {
        console.log('Problem parent:', parent, 'overflow:', overflow);
    }
    parent = parent.parentElement;
}
```

### 2. Animation Issues?
- Use browser DevTools Animation inspector
- Check for conflicting transitions in Computed styles
- Look for `will-change` properties that might affect performance

### 3. Layout Shifts?
- Check for elements without defined dimensions
- Look for margin collapse issues
- Verify box-sizing is consistent

## Performance Considerations

1. **Use CSS transforms for animations** instead of width/height when possible
2. **Minimize reflows** by batching DOM changes
3. **Use will-change sparingly** and remove after animation
4. **Prefer CSS animations** over JavaScript for simple effects

## Testing Checklist

- [ ] Test in Chrome, Firefox, Safari
- [ ] Check with DevTools device emulation
- [ ] Verify animations at different speeds (slow 3G)
- [ ] Test with CSS disabled to ensure functionality
- [ ] Check print styles if applicable
- [ ] Validate CSS with W3C validator

## Recent Fixes (2024-09)

1. **Sidebar Animation Fix**: Standardized transition timing to 1.2s with cubic-bezier
2. **Sticky Positioning**: Fixed overflow hierarchy from html down to content
3. **Toggle Button Positioning**: Used CSS custom properties for consistent positioning
4. **Grid Layout**: Implemented proper collapsed state with 25px width
5. **Z-index Conflicts**: Established clear hierarchy with CSS variables

## References

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks Sticky Guide](https://css-tricks.com/position-sticky-2/)
- [Can I Use](https://caniuse.com/) for browser compatibility