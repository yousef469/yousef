@echo off
echo ================================================
echo AI 3D Model Generator Backend
echo ================================================
echo.

REM Check if venv exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Starting Flask server...
echo Backend will be available at http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

python app.py
