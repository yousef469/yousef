from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import sys
import torch
from PIL import Image
import io
import base64
import tempfile
import trimesh

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Add TripoSR and TRELLIS to path
sys.path.append('../TripoSR-main')
sys.path.append('../TRELLIS-main')

# Global variables for models (lazy loading)
triposr_model = None
trellis_model = None

def load_triposr():
    """Load TripoSR model"""
    global triposr_model
    if triposr_model is None:
        print("Loading TripoSR model...")
        try:
            from tsr.system import TSR
            triposr_model = TSR.from_pretrained(
                "stabilityai/TripoSR",
                config_name="config.yaml",
                weight_name="model.ckpt",
            )
            triposr_model.renderer.set_chunk_size(8192)
            triposr_model.to('cuda' if torch.cuda.is_available() else 'cpu')
            print("TripoSR loaded successfully!")
        except Exception as e:
            print(f"Error loading TripoSR: {e}")
            triposr_model = None
    return triposr_model

def load_trellis():
    """Load TRELLIS model"""
    global trellis_model
    if trellis_model is None:
        print("Loading TRELLIS model...")
        try:
            # Import TRELLIS modules
            from trellis.pipelines import TrellisImageTo3DPipeline
            trellis_model = TrellisImageTo3DPipeline.from_pretrained("JeffreyXiang/TRELLIS-image-large")
            trellis_model.to('cuda' if torch.cuda.is_available() else 'cpu')
            print("TRELLIS loaded successfully!")
        except Exception as e:
            print(f"Error loading TRELLIS: {e}")
            trellis_model = None
    return trellis_model

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'cuda_available': torch.cuda.is_available(),
        'device': 'cuda' if torch.cuda.is_available() else 'cpu'
    })

@app.route('/generate-3d', methods=['POST'])
def generate_3d():
    """Generate 3D model from text or image"""
    try:
        data = request.form
        mode = data.get('mode', 'text')  # 'text' or 'image'
        model_type = data.get('model', 'triposr')  # 'triposr' or 'trellis'
        
        output_path = None
        
        if mode == 'text':
            # Text-to-3D: Generate image from text, then convert to 3D
            prompt = data.get('prompt', '')
            if not prompt:
                return jsonify({'error': 'No prompt provided'}), 400
            
            print(f"Generating 3D model from text: {prompt}")
            
            # Step 1: Generate image from text using Replicate API
            try:
                import replicate
                import requests
                from io import BytesIO
                
                # Use Replicate's Stable Diffusion
                print("Generating image from text...")
                output = replicate.run(
                    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
                    input={
                        "prompt": prompt,
                        "negative_prompt": "blurry, low quality, distorted",
                        "width": 1024,
                        "height": 1024
                    }
                )
                
                # Download the generated image
                image_url = output[0] if isinstance(output, list) else output
                response = requests.get(image_url)
                image = Image.open(BytesIO(response.content)).convert('RGB')
                print("Image generated successfully!")
                
            except Exception as e:
                print(f"Error generating image: {e}")
                return jsonify({
                    'error': 'Failed to generate image from text. Make sure REPLICATE_API_TOKEN is set.',
                    'details': str(e)
                }), 500
            
            # Step 2: Convert image to 3D using TripoSR
            print("Converting image to 3D...")
            model = load_triposr()
            if model is None:
                return jsonify({'error': 'Failed to load TripoSR model'}), 500
            
            # Preprocess image
            from tsr.utils import remove_background, resize_foreground
            image = remove_background(image)
            image = resize_foreground(image, 0.85)
            
            # Generate 3D
            with torch.no_grad():
                scene_codes = model([image], device='cuda' if torch.cuda.is_available() else 'cpu')
                meshes = model.extract_mesh(scene_codes)
                mesh = meshes[0]
            
            # Save mesh
            output_path = tempfile.mktemp(suffix='.glb')
            mesh.export(output_path)
            
        elif mode == 'image':
            # Image-to-3D
            if 'image' not in request.files:
                return jsonify({'error': 'No image file provided'}), 400
            
            image_file = request.files['image']
            image = Image.open(image_file.stream).convert('RGB')
            
            print(f"Generating 3D model from image using {model_type}")
            
            if model_type == 'triposr':
                # Use TripoSR
                model = load_triposr()
                if model is None:
                    return jsonify({'error': 'Failed to load TripoSR model'}), 500
                
                # Preprocess image
                from tsr.utils import remove_background, resize_foreground
                image = remove_background(image)
                image = resize_foreground(image, 0.85)
                
                # Generate 3D
                with torch.no_grad():
                    scene_codes = model([image], device='cuda' if torch.cuda.is_available() else 'cpu')
                    meshes = model.extract_mesh(scene_codes)
                    mesh = meshes[0]
                
                # Save mesh
                output_path = tempfile.mktemp(suffix='.glb')
                mesh.export(output_path)
                
            elif model_type == 'trellis':
                # Use TRELLIS
                model = load_trellis()
                if model is None:
                    return jsonify({'error': 'Failed to load TRELLIS model'}), 500
                
                # Generate 3D
                outputs = model.run(image, seed=42)
                
                # Extract mesh
                mesh = outputs['gaussian'][0]
                
                # Save mesh
                output_path = tempfile.mktemp(suffix='.glb')
                mesh.export(output_path)
            
            else:
                return jsonify({'error': f'Unknown model type: {model_type}'}), 400
            
            # Return the generated file
            if output_path and os.path.exists(output_path):
                return send_file(
                    output_path,
                    mimetype='model/gltf-binary',
                    as_attachment=True,
                    download_name='generated_model.glb'
                )
            else:
                return jsonify({'error': 'Failed to generate 3D model'}), 500
                
        else:
            return jsonify({'error': f'Unknown mode: {mode}'}), 400
            
    except Exception as e:
        print(f"Error in generate_3d: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/models/info', methods=['GET'])
def models_info():
    """Get information about available models"""
    return jsonify({
        'models': {
            'triposr': {
                'name': 'TripoSR',
                'description': 'Fast image-to-3D model by Stability AI',
                'input': 'image',
                'speed': 'fast (~10 seconds)',
                'quality': 'good'
            },
            'trellis': {
                'name': 'TRELLIS',
                'description': 'High-quality 3D generation',
                'input': 'image',
                'speed': 'medium (~30 seconds)',
                'quality': 'excellent'
            }
        }
    })

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    
    print("=" * 50)
    print("AI 3D Model Generator Backend")
    print("=" * 50)
    print(f"CUDA Available: {torch.cuda.is_available()}")
    print(f"Device: {'cuda' if torch.cuda.is_available() else 'cpu'}")
    print("=" * 50)
    print(f"\nStarting Flask server on port {port}")
    print("Frontend should connect to this URL")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=port, debug=False)
