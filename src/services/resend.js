// Resend email service integration
// Backend API calls for sending emails

const API_BASE = import.meta.env.VITE_API_URL || 'https://name-ai-3d-backend.onrender.com';

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(userEmail, userName) {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'welcome',
        to: userEmail,
        data: {
          name: userName,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send welcome email');
    }

    return await response.json();
  } catch (error) {
    console.error('Send welcome email error:', error);
    // Don't throw - email failures shouldn't break the app
    return { success: false, error: error.message };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(userEmail, resetLink) {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'password-reset',
        to: userEmail,
        data: {
          resetLink,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send password reset email');
    }

    return await response.json();
  } catch (error) {
    console.error('Send password reset email error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send 3D model generation notification
 */
export async function send3DModelNotification(userEmail, modelName, modelUrl) {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: '3d-model-ready',
        to: userEmail,
        data: {
          modelName,
          modelUrl,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send 3D model notification');
    }

    return await response.json();
  } catch (error) {
    console.error('Send 3D model notification error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmation(userEmail, plan, amount) {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'payment-confirmation',
        to: userEmail,
        data: {
          plan,
          amount,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send payment confirmation');
    }

    return await response.json();
  } catch (error) {
    console.error('Send payment confirmation error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send subscription cancellation email
 */
export async function sendCancellationEmail(userEmail, userName) {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'subscription-cancelled',
        to: userEmail,
        data: {
          name: userName,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send cancellation email');
    }

    return await response.json();
  } catch (error) {
    console.error('Send cancellation email error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send custom email
 */
export async function sendCustomEmail(userEmail, subject, htmlContent) {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'custom',
        to: userEmail,
        data: {
          subject,
          html: htmlContent,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send custom email');
    }

    return await response.json();
  } catch (error) {
    console.error('Send custom email error:', error);
    return { success: false, error: error.message };
  }
}
