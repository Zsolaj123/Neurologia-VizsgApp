# Matrix Terminal Quiz Interface

## Overview
The quiz system has been updated to use a Matrix-style terminal interface that loads quiz HTML files directly in an iframe. This approach eliminates parsing issues and ensures compatibility with all quiz formats.

## How It Works

1. **Terminal Activation**: When a user selects a quiz, the Matrix terminal appears with a boot sequence animation
2. **Direct Loading**: The original quiz HTML file is loaded in an iframe within the terminal
3. **Styled Integration**: The terminal injects Matrix-themed styling into the quiz for visual consistency
4. **Easy Exit**: Users can close the terminal using the × button to return to the quiz list

## Components

### matrix-terminal.js
- Main terminal component with boot sequence animation
- Handles iframe loading and styling injection
- Manages terminal show/hide states

### matrix-terminal.css
- Retrofuturistic terminal styling
- CRT effects (scanlines, glow, flicker)
- Green phosphor color scheme

### Integration in quiz-app.js
- Terminal is initialized on app startup
- `handleQuizSelect()` now loads quizzes in the terminal instead of parsing
- `onTerminalClose()` returns users to the quiz list

## Testing
Use `test-matrix-terminal.html` to test individual quizzes in the terminal interface.

## Benefits
- **No Parsing Errors**: Loads original HTML directly
- **Format Agnostic**: Works with all quiz formats (A, B, C)
- **Visual Consistency**: Matrix theme throughout
- **Better UX**: Cool boot sequence and terminal aesthetics

## Future Improvements
- Add quiz progress tracking within the terminal
- Implement quiz results capture from iframe
- Add terminal commands for navigation