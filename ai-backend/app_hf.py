from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import requests
from PIL import Image
import io
import tempfile

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Hugging Face API configuration
HF_API_URL_SD = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
HF_API_URL_TRIPOSR = "https://api-inference.huggingface.co/models/stabilityai/TripoSR"

def get_hf_headers():
    """Get Hugging Face API headers"""
    token = os.environ.get('HUGGINGFACE_API_TOKEN')
    if not token:
        raise ValueError("HUGGINGFACE_API_TOKEN environment variable not set")
    return {"Authorization": f"Bearer {token}"}

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
    """Generate 3D model from text or image using Hugging Face API"""
    try:
        data = request.form
        mode = data.get('mode', 'text')
        
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
        
        # Step 2: Convert image to 3D using TripoSR API
        print("Converting image to 3D...")
        
        # Convert image to bytes
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        try:
            response = requests.post(
                HF_API_URL_TRIPOSR,
                headers=get_hf_headers(),
                files={"file": img_byte_arr},
                timeout=120
            )
            
            if response.status_code != 200:
                return jsonify({
                    'error': f'Failed to generate 3D model: {response.text}',
                    'status_code': response.status_code,
                    'hint': 'TripoSR API might be loading (first request takes longer)'
                }), 500
            
            # Save the GLB file
            output_path = tempfile.mktemp(suffix='.glb')
            with open(output_path, 'wb') as f:
                f.write(response.content)
            
            print("3D model generated successfully!")
            
            # Return the generated file
            return send_file(
                output_path,
                mimetype='model/gltf-binary',
                as_attachment=True,
                download_name='generated_model.glb'
            )
            
        except Exception as e:
            return jsonify({
                'error': f'Failed to generate 3D model: {str(e)}',
                'hint': 'The model might be loading. Try again in 30 seconds.'
            }), 500
            
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
