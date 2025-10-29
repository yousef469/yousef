"""
Resend email service for sending transactional emails
"""
import os
import requests

RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
RESEND_API_URL = 'https://api.resend.com/emails'
FROM_EMAIL = 'noreply@yousef.engineering'  # Update with your domain

def send_email(to_email, subject, html_content):
    """Send email using Resend API"""
    if not RESEND_API_KEY:
        print("Warning: RESEND_API_KEY not set")
        return {'success': False, 'error': 'API key not configured'}
    
    try:
        response = requests.post(
            RESEND_API_URL,
            headers={
                'Authorization': f'Bearer {RESEND_API_KEY}',
                'Content-Type': 'application/json'
            },
            json={
                'from': FROM_EMAIL,
                'to': [to_email],
                'subject': subject,
                'html': html_content
            },
            timeout=10
        )
        
        if response.status_code == 200:
            return {'success': True, 'data': response.json()}
        else:
            return {'success': False, 'error': response.text}
            
    except Exception as e:
        print(f"Email send error: {str(e)}")
        return {'success': False, 'error': str(e)}

def send_welcome_email(to_email, name):
    """Send welcome email to new user"""
    subject = "Welcome to Yousef Engineering! 🚀"
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to Yousef Engineering!</h1>
        </div>
        <div style="padding: 40px; background: #f9fafb;">
          <h2>Hi {name}! 👋</h2>
          <p>Thanks for joining our engineering education platform!</p>
          <p>Here's what you can do:</p>
          <ul>
            <li>🚀 Learn about rockets, cars, and planes</li>
            <li>🎮 Play interactive engineering games</li>
            <li>🤖 Generate 3D models with AI</li>
            <li>📊 Use physics calculators</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://yousef-one.vercel.app" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Start Learning
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Need help? Reply to this email or visit our support page.
          </p>
        </div>
      </body>
    </html>
    """
    return send_email(to_email, subject, html)

def send_password_reset_email(to_email, reset_link):
    """Send password reset email"""
    subject = "Reset Your Password"
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="padding: 40px; background: #f9fafb;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{reset_link}" style="background: #ef4444; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <p style="color: #6b7280; font-size: 12px;">
            This link expires in 1 hour.
          </p>
        </div>
      </body>
    </html>
    """
    return send_email(to_email, subject, html)

def send_3d_model_notification(to_email, model_name, model_url):
    """Send notification when 3D model is ready"""
    subject = f"Your 3D Model '{model_name}' is Ready! 🎉"
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="padding: 40px; background: #f9fafb;">
          <h2>Your 3D Model is Ready!</h2>
          <p>Great news! Your AI-generated 3D model <strong>{model_name}</strong> is ready to download.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{model_url}" style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Download Model
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            You can also view and download your model from your dashboard.
          </p>
        </div>
      </body>
    </html>
    """
    return send_email(to_email, subject, html)

def send_payment_confirmation(to_email, plan, amount):
    """Send payment confirmation email"""
    subject = f"Payment Confirmed - {plan} Plan"
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="padding: 40px; background: #f9fafb;">
          <h2>Payment Confirmed! ✅</h2>
          <p>Thank you for subscribing to the <strong>{plan}</strong> plan!</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Plan:</strong> {plan}</p>
            <p style="margin: 5px 0;"><strong>Amount:</strong> ${amount}/month</p>
          </div>
          <p>Your subscription is now active and you have full access to all features!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://yousef-one.vercel.app/dashboard" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
        </div>
      </body>
    </html>
    """
    return send_email(to_email, subject, html)

def send_cancellation_email(to_email, name):
    """Send subscription cancellation email"""
    subject = "Subscription Cancelled"
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="padding: 40px; background: #f9fafb;">
          <h2>Subscription Cancelled</h2>
          <p>Hi {name},</p>
          <p>Your subscription has been cancelled as requested.</p>
          <p>You'll continue to have access until the end of your billing period.</p>
          <p>We're sorry to see you go! If you have any feedback, we'd love to hear it.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://yousef-one.vercel.app/pricing" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Resubscribe
            </a>
          </div>
        </div>
      </body>
    </html>
    """
    return send_email(to_email, subject, html)
