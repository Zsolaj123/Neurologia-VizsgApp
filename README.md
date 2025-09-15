# Neurológiai Részvizsga Felkészítő App

A comprehensive web application for neurology exam preparation, featuring 259 topics across neuroanatomy and clinical neurology.

## Features

- **259 Comprehensive Topics**: Complete coverage of neurology exam material
  - Neuroanatomy (1-59)
  - Clinical Examination Methods (60-179)
  - Detailed Clinical Topics (180-259)
- **Collapsible Navigation**: Hierarchical topic organization with expand/collapse functionality
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Cyberpunk Theme**: Distinctive neon green aesthetic
- **Markdown Support**: Full Obsidian-style markdown rendering
- **Table of Contents**: Auto-generated navigation for each topic
- **Offline Support**: All content stored locally

## Project Structure

```
frontend/
├── css/
│   ├── main.css          # Core styles, variables, layout
│   ├── topic-menu.css    # Topic navigation styles
│   └── content.css       # Content and markdown styles
├── js/
│   ├── app.js            # Main application entry
│   ├── data/             # Topic metadata
│   ├── models/           # Data models (Topic, AppState, Errors)
│   └── modules/          # Core modules (UI, Markdown, TOC, Loader)
├── content/
│   ├── neuroanat/        # Neuroanatomy topics (1-59)
│   ├── clinical/         # Clinical topics (60-179)
│   └── detailed-clinical/# Detailed clinical topics (180-259)
└── index.html            # Main application file
```

## Technical Stack

- **Frontend**: Vanilla JavaScript with modular architecture
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Content**: Markdown files with LaTeX math support
- **Build**: No build process required - runs directly in browser

## Getting Started

1. Clone the repository
2. Open `frontend/index.html` in a modern web browser
3. Navigate topics using the left sidebar
4. Click any topic to view its content

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari

## Development

The application uses a modular JavaScript architecture:

- **Models**: Define data structures (Topic, AppState)
- **Modules**: Handle specific functionality (UI, Markdown parsing, TOC generation)
- **Data**: Topic metadata mapping IDs to file locations

CSS is organized into three main files for easy maintenance:
- `main.css`: Core application styles
- `topic-menu.css`: Navigation and menu styles
- `content.css`: Content and markdown rendering

## License

This project is for educational purposes.