@echo off
TITLE Spark Studio Local Server
COLOR 0A

:: Ensure the script runs in the exact folder where the BAT file is located
cd /d "%~dp0"

echo =======================================================
echo          Starting Spark Studio Local Server...
echo =======================================================
echo.
echo Launching server on port 8081...
echo Make sure Python is installed on your system.
echo.

:: Open the default browser to localhost:8081
start http://localhost:8081

:: Start the Python built-in HTTP server on port 8081
python -m http.server 8081

pause
