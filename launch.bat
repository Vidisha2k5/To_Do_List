@echo off
echo.
echo ======================================
echo      My Days - Task Manager
echo ======================================
echo.
echo Starting development server...
echo.
echo Server will run at: http://localhost:8000
echo Your browser will open automatically
echo.
echo Press Ctrl+C to stop the server
echo.

start "" "http://localhost:8000"
python -m http.server 8000