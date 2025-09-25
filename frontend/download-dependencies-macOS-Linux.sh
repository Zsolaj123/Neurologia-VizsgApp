#!/bin/bash

echo "============================================"
echo "Neurologia VizsgApp - Függőség Telepítő"
echo "============================================"
echo ""

echo "Ez a script segít telepíteni a Python 3-at, ami szükséges az alkalmazás helyi futtatásához."
echo ""
echo "Nyomj meg Enter-t a folytatáshoz, vagy Ctrl+C-t a megszakításhoz..."
read

echo "Python telepítettségének ellenorzése..."

# Check for Python 3
if command -v python3 >/dev/null 2>&1; then
    echo ""
    echo "A Python 3 már telepítve van!"
    python3 --version
    echo ""
    echo "Most már használhatod a './start-app.sh' scriptet az alkalmazás indításához."
    echo ""
    echo "Nyomj meg Enter-t a kilépéshez..."
    read
    exit 0
fi

# Check for Python (might be Python 3)
if command -v python >/dev/null 2>&1; then
    if python -c "import sys; exit(0 if sys.version_info[0] == 3 else 1)" 2>/dev/null; then
        echo ""
        echo "A Python 3 már telepítve van!"
        python --version
        echo ""
        echo "Most már használhatod a './start-app.sh' scriptet az alkalmazás indításához."
        echo ""
        echo "Nyomj meg Enter-t a kilépéshez..."
        read
        exit 0
    fi
fi

echo ""
echo "A Python 3 nincs telepítve. Így telepítheted:"
echo ""

# Detect OS and provide specific instructions
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 macOS Telepítési Lehetőségek:"
    echo ""
    echo "1. opció - Homebrew használatával (ajánlott):"
    echo "1. Telepítsd a Homebrew-t, ha még nincs:"
    echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "2. Telepítsd a Python-t: brew install python"
    echo ""
    echo "2. opció - Letöltés a Python.org-ról:"
    echo "1. Látogasd meg: https://www.python.org/downloads/"
    echo "2. Töltsd le a legújabb Python 3.x verziót macOS-re"
    echo "3. Futtasd a telepítőt"
    echo ""
    echo "Szeretnéd megnyitni a Python letöltési oldalt? (i/n)"
    read -n 1 response
    if [[ "$response" == "i" || "$response" == "I" ]]; then
        open "https://www.python.org/downloads/"
    fi
elif [[ -f /etc/debian_version ]]; then
    echo "🐧 Ubuntu/Debian Telepítés:"
    echo ""
    echo "Futtasd ezeket a parancsokat a terminálban:"
    echo "sudo apt update"
    echo "sudo apt install python3 python3-pip"
    echo ""
    echo "Szeretnéd, hogy most futtassam ezeket a parancsokat? (i/n)"
    read -n 1 response
    if [[ "$response" == "i" || "$response" == "I" ]]; then
        echo ""
        echo "Python 3 telepítése..."
        sudo apt update && sudo apt install -y python3 python3-pip
        echo ""
        echo "Telepítés kész! Most már használhatod a './start-app.sh'-t"
    fi
elif [[ -f /etc/redhat-release ]] || [[ -f /etc/centos-release ]]; then
    echo "🐧 CentOS/RHEL/Fedora Telepítés:"
    echo ""
    echo "Futtasd ezeket a parancsokat a terminálban:"
    echo "sudo yum install python3 python3-pip  # CentOS/RHEL esetén"
    echo "sudo dnf install python3 python3-pip  # Fedora esetén"
    echo ""
    echo "Szeretnéd, hogy most megpróbáljam telepíteni? (i/n)"
    read -n 1 response
    if [[ "$response" == "i" || "$response" == "I" ]]; then
        echo ""
        if command -v dnf >/dev/null 2>&1; then
            sudo dnf install -y python3 python3-pip
        else
            sudo yum install -y python3 python3-pip
        fi
        echo ""
        echo "Telepítés kész! Most már használhatod a './start-app.sh'-t"
    fi
else
    echo "🐧 Linux Telepítés:"
    echo ""
    echo "Kérlek telepítsd a Python 3-at a disztribúciód csomagkezelőjével:"
    echo "- Ubuntu/Debian: sudo apt install python3"
    echo "- CentOS/RHEL: sudo yum install python3"
    echo "- Fedora: sudo dnf install python3"
    echo "- Arch: sudo pacman -S python"
    echo ""
    echo "Vagy látogasd meg: https://www.python.org/downloads/"
fi

echo ""
echo ""
echo "Python telepítés után:"
echo "1. Indítsd újra a terminált"
echo "2. Futtasd újra ezt a scriptet a Python működésének ellenorzéséhez"
echo "3. Ezután használd a './start-app.sh'-t az alkalmazás indításához"
echo ""
echo "Nyomj meg Enter-t a kilépéshez..."
read