from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import requests
import tempfile
import time

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Stripe-Signature"],
        "expose_headers": ["Content-Type"]
    }
})

MESHY_API_BASE = "https://api.meshy.ai"

def get_meshy_headers():
    """Get Meshy API headers"""
    token = os.environ.get('MESHY_API_KEY')
    if not token:
        raise ValueError("MESHY_API_KEY environment variable not set")
    return {"Authorization": f"Bearer {token}"}

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'api': 'meshy',
        'has_token': bool(os.environ.get('MESHY_API_KEY')),
        'stripe_enabled': bool(os.environ.get('STRIPE_SECRET_KEY')),
        'version': '2.0-stripe'
    })

@app.route('/generate-3d', methods=['POST'])
def generate_3d():
    """Generate 3D model using Meshy AI"""
    try:
        data = request.form
        mode = data.get('mode', 'text')  # 'text' or 'image'
        
        meshy_api_key = os.environ.get('MESHY_API_KEY')
        if not meshy_api_key:
            return jsonify({
                'error': 'Meshy API key not configured',
                'hint': 'Please contact administrator'
            }), 500
        
        headers = get_meshy_headers()
        
        if mode == 'text':
            # Text-to-3D
            prompt = data.get('prompt', '')
            if not prompt:
                return jsonify({'error': 'No prompt provided'}), 400
            
            print(f"Creating text-to-3D task: {prompt}")
            
            # Create task
            task_response = requests.post(
                f'{MESHY_API_BASE}/v2/text-to-3d',
                headers={**headers, 'Content-Type': 'application/json'},
                json={
                    'mode': 'preview',  # Fast preview mode (~1 min)
                    'prompt': prompt,
                    'art_style': 'realistic',
                    'negative_prompt': 'low quality, blurry, distorted'
                },
                timeout=15
            )
            
            if task_response.status_code != 202:
                error_msg = task_response.text
                print(f"Meshy API error: {error_msg}")
                return jsonify({
                    'error': f'Failed to create generation task',
                    'details': error_msg
                }), 500
            
            task_id = task_response.json()['result']
            print(f"Task created: {task_id}")
            
        elif mode == 'image':
            # Image-to-3D
            if 'image' not in request.files:
                return jsonify({'error': 'No image file provided'}), 400
            
            image_file = request.files['image']
            print(f"Creating image-to-3D task")
            
            # Upload image and create task
            files = {'file': (image_file.filename, image_file.stream, image_file.content_type)}
            
            task_response = requests.post(
                f'{MESHY_API_BASE}/v2/image-to-3d',
                headers=headers,
                files=files,
                data={
                    'mode': 'preview',
                    'enable_pbr': 'true'
                },
                timeout=30
            )
            
            if task_response.status_code != 202:
                error_msg = task_response.text
                print(f"Meshy API error: {error_msg}")
                return jsonify({
                    'error': f'Failed to create generation task',
                    'details': error_msg
                }), 500
            
            task_id = task_response.json()['result']
            print(f"Task created: {task_id}")
            
        else:
            return jsonify({'error': f'Unknown mode: {mode}'}), 400
        
        # Poll for completion
        print("Waiting for generation to complete...")
        max_attempts = 90  # 3 minutes max
        
        for attempt in range(max_attempts):
            time.sleep(2)
            
            status_response = requests.get(
                f'{MESHY_API_BASE}/v2/text-to-3d/{task_id}' if mode == 'text' else f'{MESHY_API_BASE}/v2/image-to-3d/{task_id}',
                headers=headers,
                timeout=10
            )
            
            if status_response.status_code != 200:
                continue
            
            status_data = status_response.json()
            status = status_data.get('status')
            
            print(f"Status: {status} (attempt {attempt + 1}/{max_attempts})")
            
            if status == 'SUCCEEDED':
                # Download the GLB file
                model_urls = status_data.get('model_urls', {})
                glb_url = model_urls.get('glb')
                
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
                    download_name='meshy_generated.glb'
                )
                
            elif status == 'FAILED':
                error_msg = status_data.get('error', 'Unknown error')
                return jsonify({
                    'error': f'Generation failed: {error_msg}'
                }), 500
            
            elif status in ['PENDING', 'IN_PROGRESS']:
                # Continue polling
                continue
            else:
                return jsonify({
                    'error': f'Unknown status: {status}'
                }), 500
        
        # Timeout
        return jsonify({
            'error': 'Generation timeout. Please try again.',
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
        'api': 'meshy',
        'modes': ['text-to-3d', 'image-to-3d'],
        'provider': 'Meshy AI',
        'quality': 'High',
        'speed': '1-2 minutes'
    })

@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session_endpoint():
    """Create Stripe checkout session"""
    try:
        from stripe_handler import create_checkout_session
        
        data = request.json
        price_id = data.get('priceId')
        user_id = data.get('userId')
        success_url = data.get('successUrl')
        cancel_url = data.get('cancelUrl')
        
        if not all([price_id, user_id, success_url, cancel_url]):
            return jsonify({'error': 'Missing required parameters'}), 400
        
        result = create_checkout_session(price_id, user_id, success_url, cancel_url)
        
        if result.get('success'):
            return jsonify({'sessionId': result['session_id'], 'url': result['url']})
        else:
            return jsonify({'error': result.get('error', 'Failed to create checkout session')}), 500
            
    except Exception as e:
        print(f"Checkout session error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/subscription-status', methods=['GET'])
def subscription_status_endpoint():
    """Get user's subscription status"""
    try:
        from stripe_handler import get_subscription_status
        
        user_id = request.args.get('userId')
        
        if not user_id:
            return jsonify({'error': 'User ID required'}), 400
        
        status = get_subscription_status(user_id)
        return jsonify(status)
        
    except Exception as e:
        print(f"Subscription status error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/cancel-subscription', methods=['POST'])
def cancel_subscription_endpoint():
    """Cancel user's subscription"""
    try:
        from stripe_handler import cancel_subscription
        
        data = request.json
        user_id = data.get('userId')
        
        if not user_id:
            return jsonify({'error': 'User ID required'}), 400
        
        result = cancel_subscription(user_id)
        
        if result.get('success'):
            return jsonify({'message': result['message']})
        else:
            return jsonify({'error': result.get('error', 'Failed to cancel subscription')}), 500
            
    except Exception as e:
        print(f"Cancel subscription error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/stripe-webhook', methods=['POST'])
def stripe_webhook_endpoint():
    """Handle Stripe webhook events"""
    try:
        from stripe_handler import handle_webhook
        
        payload = request.data
        sig_header = request.headers.get('Stripe-Signature')
        
        result = handle_webhook(payload, sig_header)
        
        if result.get('success'):
            return jsonify({'status': 'success'})
        else:
            return jsonify({'error': result.get('error', 'Webhook failed')}), 400
            
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        return jsonify({'error': str(e)}), 400

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
    print("AI 3D Model Generator Backend (Meshy AI)")
    print("=" * 50)
    print(f"API: Meshy AI")
    print(f"Token configured: {bool(os.environ.get('MESHY_API_KEY'))}")
    print("=" * 50)
    print(f"\nStarting Flask server on port {port}")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=port, debug=False)
