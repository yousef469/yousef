// Stripe integration for payments
// Note: This uses Stripe Checkout for simplicity

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Pricing plans
// Replace these with your actual Stripe Price IDs from dashboard
const STRIPE_PRICE_STARTER = import.meta.env.VITE_STRIPE_PRICE_STARTER || 'price_starter';
const STRIPE_PRICE_PRO = import.meta.env.VITE_STRIPE_PRICE_PRO || 'price_pro';
const STRIPE_PRICE_MASTER = import.meta.env.VITE_STRIPE_PRICE_MASTER || 'price_master';

export const PRICING_PLANS = {
  free: {
    id: 'free',
    priceId: null,
    name: 'Free',
    price: 0,
    credits: 21,
    creditsPerDay: 3,
    trialDays: 7,
    aiModel: 'Meshy',
    lives: 5,
    modelUploads: 0,
    bookDownloads: 1,
    features: [
      '5 Game Lives (regenerate every 5h)',
      '3 AI 3D generations per day (7-day trial)',
      'Meshy model only',
      '21 total generations for first week',
      'Resets monthly after trial',
      '1 book download per month',
      'No model comparison uploads',
      'Basic support',
      'Community access'
    ]
  },
  starter: {
    id: 'starter',
    priceId: STRIPE_PRICE_STARTER,
    name: 'Starter',
    price: 9.99,
    credits: 50,
    aiModel: 'TripoSR',
    lives: 10,
    modelUploads: 5,
    bookDownloads: -1,
    features: [
      '10 Game Lives (regenerate every 5h)',
      '50 AI 3D generations per month',
      'TripoSR model (fast & quality)',
      'Unlimited book downloads per month',
      '5 model uploads per week for comparison',
      'Priority support',
      'Download all models',
      'Commercial use license'
    ]
  },
  pro: {
    id: 'pro',
    priceId: STRIPE_PRICE_PRO,
    name: 'Pro',
    price: 29.99,
    credits: 100,
    aiModel: 'TRELLIS',
    lives: -1,
    modelUploads: 25,
    bookDownloads: -1,
    features: [
      'Infinite Game Lives per month',
      '100 AI 3D generations per month',
      'TRELLIS model (highest quality)',
      'Unlimited book downloads per month',
      '25 model uploads per week for comparison',
      'Priority support',
      'API access',
      'Commercial use license',
      'Custom branding'
    ]
  },
  master: {
    id: 'master',
    priceId: STRIPE_PRICE_MASTER,
    name: 'Master',
    price: 99.99,
    credits: 200,
    aiModel: 'TRELLIS',
    lives: -1,
    modelUploads: -1,
    bookDownloads: -1,
    features: [
      'Infinite Game Lives per month',
      '200 AI 3D generations per month',
      'TRELLIS model (highest quality)',
      'Unlimited book downloads per month',
      'Unlimited model uploads per month',
      'All models + early access',
      'Dedicated support',
      'API access',
      'Commercial use license',
      'Custom branding',
      'White-label option'
    ]
  }
};

/**
 * Create Stripe checkout session
 */
export async function createCheckoutSession(priceId, userId) {
  try {
    const API_BASE = import.meta.env.VITE_API_URL || 'https://name-ai-3d-backend.onrender.com';

    const response = await fetch(`${API_BASE}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        successUrl: `${window.location.origin}/dashboard?payment=success`,
        cancelUrl: `${window.location.origin}/pricing?payment=cancelled`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId, url } = await response.json();

    // Redirect directly to Stripe Checkout URL
    if (url) {
      window.location.href = url;
    } else {
      // Fallback: use Stripe.js
      const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
}

/**
 * Get user's subscription status
 */
export async function getSubscriptionStatus(userId) {
  try {
    const response = await fetch(`/api/subscription-status?userId=${userId}`);

    if (!response.ok) {
      throw new Error('Failed to get subscription status');
    }

    return await response.json();
  } catch (error) {
    console.error('Get subscription error:', error);
    return { plan: 'free', credits: 5 };
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(userId) {
  try {
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Cancel subscription error:', error);
    throw error;
  }
}

/**
 * Check if user has credits
 */
export async function hasCredits(userId) {
  const status = await getSubscriptionStatus(userId);
  return status.credits === -1 || status.credits > 0;
}

/**
 * Deduct credit after generation
 */
export async function deductCredit(userId) {
  try {
    const response = await fetch('/api/deduct-credit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to deduct credit');
    }

    return await response.json();
  } catch (error) {
    console.error('Deduct credit error:', error);
    throw error;
  }
}
