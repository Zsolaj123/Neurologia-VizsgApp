#!/bin/bash

# Change to script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "========================================="
echo "Neurologia VizsgApp indítása..."
echo "========================================="
echo ""

# Check if Python is installed
PYTHON_CMD=""

if command -v python3 >/dev/null 2>&1; then
    PYTHON_CMD="python3"
elif command -v python >/dev/null 2>&1; then
    if python -c "import sys; exit(0 if sys.version_info[0] == 3 else 1)" 2>/dev/null; then
        PYTHON_CMD="python"
    fi
fi

if [ -z "$PYTHON_CMD" ]; then
    echo "❌ HIBA: Python 3 nincs telepítve vagy nem található."
    echo ""
    echo "Kérlek futtasd először a './download-dependencies-macOS-Linux.sh' scriptet a Python telepítéséhez."
    echo ""
    echo "Nyomj meg Enter-t a kilépéshez..."
    read
    exit 1
fi

echo "Használt: $PYTHON_CMD"
$PYTHON_CMD --version
echo ""
echo "Helyi szerver indítása itt: $PWD"
echo ""

# Function to open browser
open_browser() {
    sleep 3
    TIMESTAMP=$(date +%H%M%S)
    if command -v xdg-open >/dev/null 2>&1; then
        # Linux
        xdg-open "http://localhost:8000?v=$TIMESTAMP" >/dev/null 2>&1 &
    elif command -v open >/dev/null 2>&1; then
        # macOS
        open "http://localhost:8000?v=$TIMESTAMP"
    else
        echo "Kérlek nyisd meg a http://localhost:8000 oldalt a böngészőben"
    fi
}

echo "Az alkalmazás automatikusan megnyilik a böngészőben..."
echo ""

# Start browser opener in background
open_browser &

echo "✅ Neurologia VizsgApp szerver indítása..."
echo ""
echo "🌐 URL: http://localhost:8000"
echo "🎯 A Matrix nyitóképernyő fog megjelenni"
echo ""
echo "⚠️  Ha régi verziót látsz:"
echo "   - Nyomj Ctrl+F5-öt a frissítéshez"
echo "   - Vagy nyisd meg új privát/inkognitó ablakban"
echo ""
echo "⚠️  Szerver leállítása: Nyomd meg a Ctrl+C-t"
echo ""

# Start the Python HTTP server
$PYTHON_CMD -m http.server 8000