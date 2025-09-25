@echo off
echo ============================================
echo Neurologia VizsgApp - Fuggoseg Telepito
echo ============================================
echo.

echo Ez a script segit telepiteni a Python 3-at, ami szukseges az alkalmazas helyi futtatásához.
echo.
echo Nyomj meg egy gombot a folytatáshoz, vagy zárd be az ablakot a megszakitáshoz...
pause >nul
echo.

REM Check if Python is already installed
echo Python telepitettségének ellenorzése...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo A Python már telepitve van!
    python --version
    echo.
    echo Most már használhatod a "start-app.bat" scriptet az alkalmazás inditásához.
    echo.
    goto :end
)

python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo A Python 3 már telepitve van!
    python3 --version
    echo.
    echo Most már használhatod a "start-app.bat" scriptet az alkalmazás inditásához.
    echo.
    goto :end
)

echo A Python nincs telepitve. Python letöltési oldal megnyitása...
echo.
echo Utasitások:
echo 1. Töltsd le a Python 3.x verziót a megnyiló weboldalról
echo 2. Telepités során JELÖLD BE az "Add Python to PATH" opciót
echo 3. Fejezd be a telepitést
echo 4. Ha kéri, inditsd újra a számitógépet
echo 5. Futtasd újra ezt a scriptet a telepités ellenorzéséhez
echo.
echo Nyomj meg egy gombot a Python letöltési oldal megnyitásához...
pause >nul

REM Open Python download page
start "" "https://www.python.org/downloads/"

echo.
echo Python telepités után:
echo 1. Inditsd újra a számitógépet, ha kéri
echo 2. Futtasd újra ezt a scriptet a Python működésének ellenorzéséhez
echo 3. Ezután használd a "start-app.bat" scriptet az alkalmazás inditásához
echo.

:end
echo Nyomj meg egy gombot a kilépéshez...
pause >nul