@echo off
cd /d "%~dp0"

echo =========================================
echo Neurologia VizsgApp indítása...
echo =========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    set PYTHON_CMD=python
    goto :start_server
)

python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    set PYTHON_CMD=python3
    goto :start_server
)

REM Python not found
echo HIBA: Python nincs telepítve vagy nem található a PATH-ban.
echo.
echo Kérlek futtasd először a "download-dependencies-windows.bat" scriptet a Python telepítéséhez.
echo.
goto :end

:start_server
echo Használt: %PYTHON_CMD%
%PYTHON_CMD% --version
echo.
echo Helyi szerver indítása itt: %CD%
echo.
echo Az alkalmazás automatikusan megnyilik a böngészőben...
echo.

REM Start server and open browser
start "" %PYTHON_CMD% -m http.server 8000
timeout /t 3 >nul
start "" "http://localhost:8000?v=%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%"

echo.
echo ✅ Neurologia VizsgApp most már fut!
echo.
echo 🌐 URL: http://localhost:8000
echo 🎯 A Matrix nyitóképernyő fog megjelenni
echo.
echo ⚠️  Ha régi verziót látsz:
echo    - Nyomj Ctrl+F5-öt a frissítéshez
echo    - Vagy nyisd meg új privát/inkognitó ablakban
echo.
echo ⚠️  Szerver leállítása:
echo    - Nyomd meg a Ctrl+C-t a megnyilt szerver ablakban
echo    - Vagy zárd be ezt az ablakot és a szerver ablakot is
echo.
echo Nyomj meg egy gombot ennek az ablaknak a bezárásához (a szerver tovább fog futni)...

:end
pause >nul