@echo off
TITLE Spark Studio ^| Creative Digital Agency Platform
COLOR 0A

:: Ensure the script runs in the exact folder where the BAT file is located
cd /d "%~dp0"

echo ======================================================================
echo          Spark Studio: Creative Digital Agency Platform
echo ======================================================================
echo.
echo Launching Local Development Server on port 8081...
echo.
echo [INFO] Optimized for Branding, Design, and Immersive Tech.
echo [INFO] LinkedIn Project Info available in: Linkden_info.md
echo.
echo Make sure Python is installed on your system.
echo.

:: Open the default browser to localhost:8081
start http://localhost:8081

:: Start the Python built-in HTTP server on port 8081
python -m http.server 8081

pause
