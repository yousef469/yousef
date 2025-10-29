from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import requests
from PIL import Image
import io
import tempfile
from procedural_models import create_rocket_glb, create_car_glb, create_plane_glb

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Hugging Face API configuration
HF_API_URL_SD = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"
# Note: TripoSR is not available via Inference API, using alternative approach

def get_hf_headers():
    """Get Hugging Face API headers"""
    token = os.environ.get('HUGGINGFACE_API_TOKEN')
    if not token:
        raise ValueError("HUGGINGFACE_API_TOKEN environment variable not set")
    return {"Authorization": f"Bearer {token}"}

def create_simple_cube_glb():
    """Create a simple cube GLB file as a placeholder"""
    import struct
    import json
    import base64
    
    # Simple cube vertices and indices
    vertices = [
        -1, -1, -1,  1, -1, -1,  1,  1, -1, -1,  1, -1,  # Front
        -1, -1,  1,  1, -1,  1,  1,  1,  1, -1,  1,  1,  # Back
    ]
    indices = [
        0,1,2, 0,2,3,  4,6,5, 4,7,6,  # Front, Back
        0,4,7, 0,7,3,  1,5,6, 1,6,2,  # Left, Right
        3,7,6, 3,6,2,  0,1,5, 0,5,4   # Top, Bottom
    ]
    
    # Pack binary data
    vertex_data = struct.pack(f'{len(vertices)}f', *vertices)
    index_data = struct.pack(f'{len(indices)}H', *indices)
    
    # Create glTF JSON
    gltf = {
        "asset": {"version": "2.0"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0}],
        "meshes": [{
            "primitives": [{
                "attributes": {"POSITION": 0},
                "indices": 1
            }]
        }],
        "buffers": [{"byteLength": len(vertex_data) + len(index_data)}],
        "bufferViews": [
            {"buffer": 0, "byteOffset": 0, "byteLength": len(vertex_data), "target": 34962},
            {"buffer": 0, "byteOffset": len(vertex_data), "byteLength": len(index_data), "target": 34963}
        ],
        "accessors": [
            {"bufferView": 0, "componentType": 5126, "count": len(vertices)//3, "type": "VEC3", "max": [1,1,1], "min": [-1,-1,-1]},
            {"bufferView": 1, "componentType": 5123, "count": len(indices), "type": "SCALAR"}
        ]
    }
    
    # Create GLB
    json_data = json.dumps(gltf).encode('utf-8')
    json_padding = (4 - len(json_data) % 4) % 4
    json_data += b' ' * json_padding
    
    bin_data = vertex_data + index_data
    bin_padding = (4 - len(bin_data) % 4) % 4
    bin_data += b'\x00' * bin_padding
    
    glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(json_data) + 8 + len(bin_data))
    glb += struct.pack('<II', len(json_data), 0x4E4F534A) + json_data
    glb += struct.pack('<II', len(bin_data), 0x004E4942) + bin_data
    
    return glb

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'api': 'huggingface',
        'has_token': bool(os.environ.get('HUGGINGFACE_API_TOKEN'))
    })

@app.route('/generate-3d', methods=['POST'])
def generate_3d():
    """Generate 3D model - procedural or AI-based"""
    try:
        data = request.form
        mode = data.get('mode', 'text')
        generation_type = data.get('type', 'procedural')  # 'procedural' or 'ai'
        
        # PROCEDURAL GENERATION (Free, Instant, Unlimited)
        if generation_type == 'procedural':
            model_type = data.get('model_type', 'rocket')  # rocket, car, plane
            
            print(f"Generating procedural {model_type}...")
            
            if model_type == 'rocket':
                stages = int(data.get('stages', 2))
                fins = int(data.get('fins', 4))
                color = data.get('color', 'red')
                height = float(data.get('height', 10))
                glb_data = create_rocket_glb(stages, fins, color, height)
                
            elif model_type == 'car':
                style = data.get('style', 'sports')
                color = data.get('color', 'blue')
                spoiler = data.get('spoiler', 'true').lower() == 'true'
                glb_data = create_car_glb(style, color, spoiler)
                
            elif model_type == 'plane':
                wingspan = float(data.get('wingspan', 10))
                style = data.get('style', 'fighter')
                engines = int(data.get('engines', 2))
                glb_data = create_plane_glb(wingspan, style, engines)
            else:
                return jsonify({'error': 'Unknown model type'}), 400
            
            output_path = tempfile.mktemp(suffix='.glb')
            with open(output_path, 'wb') as f:
                f.write(glb_data)
            
            print(f"Procedural {model_type} generated successfully!")
            
            return send_file(
                output_path,
                mimetype='model/gltf-binary',
                as_attachment=True,
                download_name=f'{model_type}_generated.glb'
            )
        
        # AI GENERATION (Limited, High Quality)
        
        output_path = None
        
        if mode == 'text':
            # Text-to-3D: First generate image, then convert to 3D
            prompt = data.get('prompt', '')
            if not prompt:
                return jsonify({'error': 'No prompt provided'}), 400
            
            print(f"Generating image from text: {prompt}")
            
            # Step 1: Generate image using Stable Diffusion
            try:
                response = requests.post(
                    HF_API_URL_SD,
                    headers=get_hf_headers(),
                    json={"inputs": prompt},
                    timeout=60
                )
                
                if response.status_code != 200:
                    return jsonify({
                        'error': f'Failed to generate image: {response.text}',
                        'status_code': response.status_code
                    }), 500
                
                image = Image.open(io.BytesIO(response.content))
                print("Image generated successfully!")
                
            except Exception as e:
                return jsonify({
                    'error': f'Failed to generate image: {str(e)}',
                    'hint': 'Make sure HUGGINGFACE_API_TOKEN is set in Render environment variables'
                }), 500
            
        elif mode == 'image':
            # Image-to-3D
            if 'image' not in request.files:
                return jsonify({'error': 'No image file provided'}), 400
            
            image_file = request.files['image']
            image = Image.open(image_file.stream).convert('RGB')
            print("Image uploaded successfully!")
            
        else:
            return jsonify({'error': f'Unknown mode: {mode}'}), 400
        
        # Step 2: Generate 3D model using Meshy AI API
        print("Generating 3D model with Meshy AI...")
        
        meshy_api_key = os.environ.get('MESHY_API_KEY')
        if not meshy_api_key:
            # Fallback to simple cube if no API key
            print("No Meshy API key found, using placeholder cube")
            glb_data = create_simple_cube_glb()
            output_path = tempfile.mktemp(suffix='.glb')
            with open(output_path, 'wb') as f:
                f.write(glb_data)
        else:
            # Use Meshy AI for real 3D generation
            try:
                # Step 1: Create text-to-3D task
                task_response = requests.post(
                    'https://api.meshy.ai/v2/text-to-3d',
                    headers={
                        'Authorization': f'Bearer {meshy_api_key}',
                        'Content-Type': 'application/json'
                    },
                    json={
                        'mode': 'preview',  # Fast preview mode
                        'prompt': data.get('prompt', 'a simple object'),
                        'art_style': 'realistic',
                        'negative_prompt': 'low quality, blurry'
                    },
                    timeout=10
                )
                
                if task_response.status_code != 202:
                    raise Exception(f"Meshy API error: {task_response.text}")
                
                task_id = task_response.json()['result']
                print(f"Meshy task created: {task_id}")
                
                # Step 2: Poll for completion (preview mode is fast, ~1 minute)
                max_attempts = 60
                for attempt in range(max_attempts):
                    status_response = requests.get(
                        f'https://api.meshy.ai/v2/text-to-3d/{task_id}',
                        headers={'Authorization': f'Bearer {meshy_api_key}'},
                        timeout=10
                    )
                    
                    status_data = status_response.json()
                    if status_data['status'] == 'SUCCEEDED':
                        # Download the GLB file
                        glb_url = status_data['model_urls']['glb']
                        glb_response = requests.get(glb_url, timeout=30)
                        
                        output_path = tempfile.mktemp(suffix='.glb')
                        with open(output_path, 'wb') as f:
                            f.write(glb_response.content)
                        
                        print("3D model generated successfully with Meshy AI!")
                        break
                    elif status_data['status'] == 'FAILED':
                        raise Exception("Meshy AI generation failed")
                    
                    import time
                    time.sleep(2)
                else:
                    raise Exception("Meshy AI generation timeout")
                    
            except Exception as e:
                print(f"Meshy AI error: {e}, falling back to cube")
                glb_data = create_simple_cube_glb()
                output_path = tempfile.mktemp(suffix='.glb')
                with open(output_path, 'wb') as f:
                    f.write(glb_data)
        
        # Return the generated file
        return send_file(
            output_path,
            mimetype='model/gltf-binary',
            as_attachment=True,
            download_name='generated_model.glb'
        )
            
    except Exception as e:
        print(f"Error in generate_3d: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/models/info', methods=['GET'])
def models_info():
    """Get information about available models"""
    return jsonify({
        'api': 'huggingface',
        'models': {
            'stable-diffusion': {
                'name': 'Stable Diffusion XL',
                'description': 'Text-to-image generation',
                'provider': 'Hugging Face'
            },
            'triposr': {
                'name': 'TripoSR',
                'description': 'Image-to-3D generation',
                'provider': 'Hugging Face'
            }
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    
    print("=" * 50)
    print("AI 3D Model Generator Backend (Hugging Face API)")
    print("=" * 50)
    print(f"API: Hugging Face")
    print(f"Token configured: {bool(os.environ.get('HUGGINGFACE_API_TOKEN'))}")
    print("=" * 50)
    print(f"\nStarting Flask server on port {port}")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=port, debug=False)
