from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import requests
import tempfile
import time
import base64

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

REPLICATE_API_BASE = "https://api.replicate.com/v1"

def get_replicate_headers():
    """Get Replicate API headers"""
    token = os.environ.get('REPLICATE_API_TOKEN')
    if not token:
        raise ValueError("REPLICATE_API_TOKEN environment variable not set")
    return {
        "Authorization": f"Token {token}",
        "Content-Type": "application/json"
    }

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'api': 'replicate',
        'model': 'TripoSR',
        'has_token': bool(os.environ.get('REPLICATE_API_TOKEN'))
    })

@app.route('/generate-3d', methods=['POST'])
def generate_3d():
    """Generate 3D model using Replicate's TripoSR"""
    try:
        data = request.form
        mode = data.get('mode', 'text')
        
        replicate_token = os.environ.get('REPLICATE_API_TOKEN')
        if not replicate_token:
            return jsonify({
                'error': 'Replicate API token not configured',
                'hint': 'Please contact administrator'
            }), 500
        
        headers = get_replicate_headers()
        
        # TripoSR only supports image-to-3D
        # For text mode, we'll use Stable Diffusion first, then TripoSR
        
        if mode == 'text':
            # Step 1: Generate image from text using Stable Diffusion
            prompt = data.get('prompt', '')
            if not prompt:
                return jsonify({'error': 'No prompt provided'}), 400
            
            print(f"Generating image from text: {prompt}")
            
            sd_response = requests.post(
                f'{REPLICATE_API_BASE}/predictions',
                headers=headers,
                json={
                    "version": "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",  # SDXL
                    "input": {
                        "prompt": prompt,
                        "negative_prompt": "low quality, blurry, distorted",
                        "num_outputs": 1
                    }
                },
                timeout=15
            )
            
            if sd_response.status_code != 201:
                return jsonify({
                    'error': 'Failed to create image generation task',
                    'details': sd_response.text
                }), 500
            
            sd_prediction_id = sd_response.json()['id']
            print(f"Image generation task created: {sd_prediction_id}")
            
            # Poll for image completion
            image_url = None
            for _ in range(60):  # 2 minutes max
                time.sleep(2)
                
                status_response = requests.get(
                    f'{REPLICATE_API_BASE}/predictions/{sd_prediction_id}',
                    headers=headers,
                    timeout=10
                )
                
                if status_response.status_code == 200:
                    status_data = status_response.json()
                    status = status_data.get('status')
                    
                    if status == 'succeeded':
                        output = status_data.get('output', [])
                        if output and len(output) > 0:
                            image_url = output[0]
                            print(f"Image generated: {image_url}")
                            break
                    elif status == 'failed':
                        return jsonify({'error': 'Image generation failed'}), 500
            
            if not image_url:
                return jsonify({'error': 'Image generation timeout'}), 504
            
        elif mode == 'image':
            # User uploaded image
            if 'image' not in request.files:
                return jsonify({'error': 'No image file provided'}), 400
            
            image_file = request.files['image']
            
            # Convert to base64 data URI for Replicate
            image_data = image_file.read()
            image_base64 = base64.b64encode(image_data).decode('utf-8')
            image_url = f"data:{image_file.content_type};base64,{image_base64}"
            
            print("Image uploaded successfully!")
            
        else:
            return jsonify({'error': f'Unknown mode: {mode}'}), 400
        
        # Step 2: Generate 3D model using TripoSR or TRELLIS
        model_choice = data.get('model', 'triposr')  # 'triposr' or 'trellis'
        
        if model_choice == 'trellis':
            print("Generating 3D model with TRELLIS (high quality)...")
            
            model_response = requests.post(
                f'{REPLICATE_API_BASE}/predictions',
                headers=headers,
                json={
                    "version": "5e569c4e8c4f3e0e0e0e0e0e0e0e0e0e",  # TRELLIS version
                    "input": {
                        "image": image_url,
                        "seed": 42,
                        "slat_sampler_params": {
                            "steps": 12,
                            "cfg_strength": 7.5
                        }
                    }
                },
                timeout=15
            )
        else:
            print("Generating 3D model with TripoSR (fast)...")
            
            model_response = requests.post(
                f'{REPLICATE_API_BASE}/predictions',
                headers=headers,
                json={
                    "version": "b3e37e8f2e204d8440e6f26e9e0a9e0e0e0a9e0e",  # TripoSR version
                    "input": {
                        "image": image_url,
                        "foreground_ratio": 0.85,
                        "mc_resolution": 256
                    }
                },
                timeout=15
            )
        
        triposr_response = model_response
        
        if triposr_response.status_code != 201:
            return jsonify({
                'error': 'Failed to create 3D generation task',
                'details': triposr_response.text
            }), 500
        
        prediction_id = triposr_response.json()['id']
        print(f"3D generation task created: {prediction_id}")
        
        # Poll for completion
        for _ in range(90):  # 3 minutes max
            time.sleep(2)
            
            status_response = requests.get(
                f'{REPLICATE_API_BASE}/predictions/{prediction_id}',
                headers=headers,
                timeout=10
            )
            
            if status_response.status_code == 200:
                status_data = status_response.json()
                status = status_data.get('status')
                
                print(f"Status: {status}")
                
                if status == 'succeeded':
                    output = status_data.get('output')
                    
                    if not output:
                        return jsonify({'error': 'No output from TripoSR'}), 500
                    
                    # Download the GLB file
                    glb_url = output if isinstance(output, str) else output.get('glb')
                    
                    if not glb_url:
                        return jsonify({'error': 'No GLB file in response'}), 500
                    
                    print(f"Downloading model from: {glb_url}")
                    
                    glb_response = requests.get(glb_url, timeout=60)
                    
                    if glb_response.status_code != 200:
                        return jsonify({'error': 'Failed to download model'}), 500
                    
                    # Save to temp file
                    output_path = tempfile.mktemp(suffix='.glb')
                    with open(output_path, 'wb') as f:
                        f.write(glb_response.content)
                    
                    print("3D model generated successfully!")
                    
                    return send_file(
                        output_path,
                        mimetype='model/gltf-binary',
                        as_attachment=True,
                        download_name='triposr_generated.glb'
                    )
                    
                elif status == 'failed':
                    error_msg = status_data.get('error', 'Unknown error')
                    return jsonify({'error': f'Generation failed: {error_msg}'}), 500
        
        # Timeout
        return jsonify({
            'error': 'Generation timeout',
            'hint': 'The model is taking longer than expected'
        }), 504
        
    except Exception as e:
        print(f"Error in generate_3d: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/models/info', methods=['GET'])
def models_info():
    """Get information about available models"""
    return jsonify({
        'api': 'replicate',
        'model': 'TripoSR',
        'modes': ['text-to-3d', 'image-to-3d'],
        'provider': 'Replicate',
        'cost': '~$0.01 per generation',
        'quality': 'Good',
        'speed': '30-60 seconds'
    })

@app.route('/api/send-email', methods=['POST'])
def send_email_endpoint():
    """Send email using Resend"""
    try:
        from email_service import (
            send_welcome_email,
            send_password_reset_email,
            send_3d_model_notification,
            send_payment_confirmation,
            send_cancellation_email,
            send_email
        )
        
        data = request.json
        email_type = data.get('type')
        to_email = data.get('to')
        email_data = data.get('data', {})
        
        if not to_email:
            return jsonify({'error': 'Email address required'}), 400
        
        result = None
        
        if email_type == 'welcome':
            result = send_welcome_email(to_email, email_data.get('name', 'User'))
        elif email_type == 'password-reset':
            result = send_password_reset_email(to_email, email_data.get('resetLink'))
        elif email_type == '3d-model-ready':
            result = send_3d_model_notification(
                to_email,
                email_data.get('modelName'),
                email_data.get('modelUrl')
            )
        elif email_type == 'payment-confirmation':
            result = send_payment_confirmation(
                to_email,
                email_data.get('plan'),
                email_data.get('amount')
            )
        elif email_type == 'subscription-cancelled':
            result = send_cancellation_email(to_email, email_data.get('name', 'User'))
        elif email_type == 'custom':
            result = send_email(
                to_email,
                email_data.get('subject'),
                email_data.get('html')
            )
        else:
            return jsonify({'error': f'Unknown email type: {email_type}'}), 400
        
        if result and result.get('success'):
            return jsonify({'success': True, 'message': 'Email sent successfully'})
        else:
            return jsonify({'success': False, 'error': result.get('error', 'Unknown error')}), 500
            
    except Exception as e:
        print(f"Email endpoint error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    
    print("=" * 50)
    print("AI 3D Model Generator Backend (Replicate/TripoSR)")
    print("=" * 50)
    print(f"API: Replicate")
    print(f"Model: TripoSR")
    print(f"Token configured: {bool(os.environ.get('REPLICATE_API_TOKEN'))}")
    print("=" * 50)
    print(f"\nStarting Flask server on port {port}")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=port, debug=False)
