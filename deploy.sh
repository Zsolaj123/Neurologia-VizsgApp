#!/bin/bash
# Simple deployment script for the Neurology Exam App

echo "🚀 Deploying Neurology Exam App..."

# Check if we're in the right directory
if [ ! -f "frontend/index.html" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

# Create deployment directory
DEPLOY_DIR="dist"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

echo "📦 Copying files..."

# Copy all necessary files
cp -r frontend/* $DEPLOY_DIR/

# Remove development files
rm -rf $DEPLOY_DIR/css/archive
rm -rf $DEPLOY_DIR/css/theme
rm -rf $DEPLOY_DIR/css/base
rm -rf $DEPLOY_DIR/css/layout

# Optional: Minify CSS (requires cssmin)
if command -v cssmin &> /dev/null; then
    echo "🔧 Minifying CSS..."
    for css in $DEPLOY_DIR/css/*.css; do
        cssmin < "$css" > "$css.min"
        mv "$css.min" "$css"
    done
fi

# Optional: Minify JS (requires uglifyjs)
if command -v uglifyjs &> /dev/null; then
    echo "🔧 Minifying JavaScript..."
    find $DEPLOY_DIR/js -name "*.js" -exec uglifyjs {} -o {} -c -m \;
fi

echo "✅ Deployment ready in $DEPLOY_DIR/"
echo ""
echo "To deploy to a web server:"
echo "  - Upload contents of $DEPLOY_DIR/ to your web server"
echo "  - No server-side configuration needed"
echo "  - Works with any static file hosting (GitHub Pages, Netlify, etc.)"