# Recurrent CSS Issues in Neuratos VizsgApp

## Issue #1: Sidebars Not Sticky

### Symptoms:
- Sidebars scroll with content instead of staying fixed
- Sticky positioning not working despite `position: sticky`

### Root Causes:
1. **Overflow on parent elements** - Any parent with `overflow: hidden/auto` breaks sticky
2. **Height not defined** - Sticky elements need explicit height
3. **Wrong top calculation** - Misaligned with actual layout

### Solution Applied:
```css
/* Fix in sidebar-fixes.css */
html:root { overflow-y: visible; }
body { overflow: visible; }
#app-container { overflow: visible; }

.topic-list, .toc-sidebar {
    position: sticky;
    top: calc(var(--header-height) + var(--section-tabs-height));
    height: calc(100vh - var(--header-height) - var(--section-tabs-height));
}
```

## Issue #2: Right Sidebar Animation Not Smooth

### Symptoms:
- Left sidebar animates smoothly, right sidebar collapses instantly
- Animation works one way but not the other

### Root Cause:
- Conflicting transition properties between parent and child elements
- Different CSS rules applied to each sidebar

### Solution Applied:
```css
/* Standardize transitions for both sidebars */
.sidebar-container {
    transition: width 1.2s cubic-bezier(0.86, 0, 0.07, 1);
}

/* Remove transitions from sticky children */
.sidebar-container .topic-list,
.sidebar-container .toc-sidebar {
    transition: none;
}
```

## Issue #3: Toggle Buttons Teleporting

### Symptoms:
- Buttons jump to different position when sidebar collapses
- Header content disappears or misaligns

### Root Cause:
- Header trying to fit in 25px width
- No special handling for collapsed state layout

### Solution Applied:
```css
/* Keep header visible in collapsed state */
.sidebar-container.collapsed .sidebar-header {
    padding: var(--spacing-sm) 0;
    justify-content: center;
}

/* Hide title, center button */
.sidebar-container.collapsed .sidebar-title {
    display: none;
}
```

## Issue #4: Sidebar-Content Misalignment

### Symptoms:
- Sidebars don't align with main content top edge
- Different elements have different top positions

### Root Cause:
- Inconsistent top position calculations
- Section tabs not properly accounted for

### Solution Applied:
```css
/* Standardize top position */
:root {
    --sticky-top: calc(var(--header-height) + var(--section-tabs-height));
}

/* Apply consistently */
.topic-list, .toc-sidebar { top: var(--sticky-top); }
.sidebar-toggle-fixed { top: var(--sticky-top); }
```

## Issue #5: CSS Cascade Conflicts

### Symptoms:
- Styles not applying despite being defined
- Need to use !important to make styles work

### Root Causes:
1. **Load order** - CSS files loaded in wrong order
2. **Specificity wars** - Multiple files trying to style same elements
3. **Inline styles** - JavaScript adding styles that override CSS

### Prevention Strategy:
1. Load CSS files in correct order (base → components → fixes)
2. Use consistent naming conventions
3. Avoid inline styles in JavaScript
4. Use CSS custom properties for values that change

## Quick Debugging Checklist

When sidebars aren't working:

1. **Check overflow hierarchy**:
   ```javascript
   // Run in console
   let el = document.querySelector('.topic-list');
   while(el) {
       console.log(el.tagName, getComputedStyle(el).overflow);
       el = el.parentElement;
   }
   ```

2. **Check computed styles**:
   - Is `position: sticky` being applied?
   - What's the actual `top` value?
   - Is height properly calculated?

3. **Check for conflicting CSS**:
   - Multiple files setting same property?
   - JavaScript adding inline styles?
   - Media queries overriding styles?

## Lessons Learned

1. **Always define a clear CSS architecture** before starting
2. **Use CSS variables** for shared values (heights, spacing, colors)
3. **Test sticky positioning** early and often
4. **Document fixes** to prevent regression
5. **Avoid !important** - use specificity instead

## File History

- 2024-09-17: Initial sidebar implementation
- 2024-09-17: Added Matrix-style laser animation
- 2024-09-17: Fixed sticky positioning issues
- 2024-09-17: Created sidebar-fixes.css for consolidated fixes