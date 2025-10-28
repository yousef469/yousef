#!/bin/bash

echo "================================================"
echo "AI 3D Model Generator Backend"
echo "================================================"
echo ""

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo ""
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo ""
echo "Starting Flask server..."
echo "Backend will be available at http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""

python app.py
