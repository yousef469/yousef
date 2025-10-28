# AI 3D Model Generator Backend Setup

This guide will help you set up the Python backend for AI-powered 3D model generation using TripoSR and TRELLIS.

## Prerequisites

- Python 3.10 or higher
- CUDA-capable GPU (recommended, but CPU works too)
- At least 8GB RAM (16GB+ recommended)
- 10GB free disk space

## Installation Steps

### 1. Create Python Virtual Environment

```bash
# Navigate to the ai-backend folder
cd ai-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
# Install PyTorch (with CUDA support if you have a GPU)
# For CUDA 11.8:
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118

# For CPU only:
pip install torch torchvision

# Install other requirements
pip install -r requirements.txt
```

### 3. Install TripoSR

```bash
cd ../TripoSR-main
pip install -e .
cd ../ai-backend
```

### 4. Install TRELLIS

```bash
cd ../TRELLIS-main
pip install -e .
cd ../ai-backend
```

### 5. Download Model Weights

The models will automatically download on first use, but you can pre-download them:

```python
# Run this Python script to pre-download models
python -c "
from huggingface_hub import snapshot_download
snapshot_download('stabilityai/TripoSR')
snapshot_download('JeffreyXiang/TRELLIS-image-large')
"
```

## Running the Backend

### Start the Flask Server

```bash
# Make sure you're in the ai-backend folder with venv activated
python app.py
```

You should see:
```
==================================================
AI 3D Model Generator Backend
==================================================
CUDA Available: True
Device: cuda
==================================================

Starting Flask server on http://localhost:5000
Frontend should connect to this URL
==================================================
```

### Test the Backend

Open a new terminal and test:

```bash
# Health check
curl http://localhost:5000/health

# Get models info
curl http://localhost:5000/models/info
```

## Frontend Integration

The React frontend is already configured to connect to `http://localhost:5000`.

### Update AI3DGenerator Component

The component at `src/components/AI3DGenerator.jsx` needs to be updated to use the real backend instead of demo mode.

## Usage

1. **Start the backend**: `python app.py` (in ai-backend folder)
2. **Start the frontend**: `npm run dev` (in main folder)
3. **Navigate to**: http://localhost:5173/ai-generator
4. **Upload an image** and click "Generate 3D Model"

## Troubleshooting

### CUDA Out of Memory

If you get CUDA out of memory errors:
- Close other GPU-intensive applications
- Reduce batch size in the code
- Use CPU mode instead

### Model Download Fails

If model downloads fail:
- Check your internet connection
- Try using a VPN if Hugging Face is blocked
- Manually download models from Hugging Face

### Import Errors

If you get import errors:
```bash
# Reinstall the packages
cd ../TripoSR-main
pip install -e . --force-reinstall
cd ../TRELLIS-main
pip install -e . --force-reinstall
```

## Performance Tips

1. **Use GPU**: Much faster than CPU (10s vs 2-3 minutes)
2. **Image Size**: Smaller images (512x512) process faster
3. **Model Choice**:
   - TripoSR: Faster, good quality
   - TRELLIS: Slower, excellent quality

## API Endpoints

### POST /generate-3d

Generate a 3D model from an image.

**Request:**
```
Content-Type: multipart/form-data

mode: "image"
model: "triposr" or "trellis"
image: <image file>
```

**Response:**
```
Content-Type: model/gltf-binary
<GLB file data>
```

### GET /health

Check if the server is running.

**Response:**
```json
{
  "status": "healthy",
  "cuda_available": true,
  "device": "cuda"
}
```

### GET /models/info

Get information about available models.

**Response:**
```json
{
  "models": {
    "triposr": {
      "name": "TripoSR",
      "description": "Fast image-to-3D model by Stability AI",
      "input": "image",
      "speed": "fast (~10 seconds)",
      "quality": "good"
    },
    "trellis": {
      "name": "TRELLIS",
      "description": "High-quality 3D generation",
      "input": "image",
      "speed": "medium (~30 seconds)",
      "quality": "excellent"
    }
  }
}
```

## Next Steps

1. Set up the backend following this guide
2. Test with sample images
3. Integrate with your React frontend
4. Deploy to a server for production use

## Production Deployment

For production, consider:
- Using Gunicorn instead of Flask dev server
- Setting up NGINX as reverse proxy
- Using a GPU cloud service (AWS, GCP, RunPod)
- Implementing rate limiting and authentication
- Caching generated models

## Support

If you encounter issues:
1. Check the console output for error messages
2. Verify all dependencies are installed
3. Ensure models are downloaded correctly
4. Check GPU memory usage
