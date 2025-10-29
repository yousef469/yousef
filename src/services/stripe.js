// Stripe integration for payments
// Note: This uses Stripe Checkout for simplicity

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Pricing plans
export const PRICING_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    credits: 5,
    features: [
      '5 AI 3D generations per month',
      'TripoSR model only',
      'Basic support',
      'Community access'
    ]
  },
  starter: {
    id: 'price_starter',
    name: 'Starter',
    price: 9.99,
    credits: 50,
    features: [
      '50 AI 3D generations per month',
      'TripoSR + TRELLIS models',
      'Priority support',
      'Download all models',
      'Commercial use license'
    ]
  },
  pro: {
    id: 'price_pro',
    name: 'Pro',
    price: 29.99,
    credits: 200,
    features: [
      '200 AI 3D generations per month',
      'All models (TripoSR + TRELLIS)',
      'Priority support',
      'API access',
      'Commercial use license',
      'Custom branding'
    ]
  },
  unlimited: {
    id: 'price_unlimited',
    name: 'Unlimited',
    price: 99.99,
    credits: -1, // Unlimited
    features: [
      'Unlimited AI 3D generations',
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
    const response = await fetch('/api/create-checkout-session', {
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
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    
    // Redirect to Stripe Checkout
    const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw error;
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
