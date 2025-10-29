import { useState } from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { PRICING_PLANS, createCheckoutSession } from '../services/stripe';
import { useAuth } from '../contexts/AuthContext';

export default function PricingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(null);

  const handleSubscribe = async (priceId, planName) => {
    if (!user) {
      if (confirm('Please sign in to subscribe. Go to login page?')) {
        window.location.href = '/auth';
      }
      return;
    }

    setLoading(planName);
    
    try {
      // Check if Stripe is configured
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      
      if (!stripeKey) {
        // Fallback: show contact info
        alert(`🎉 You selected the ${planName} plan!\n\n💰 Price: $${PRICING_PLANS[priceId]?.price || 'N/A'}/month\n\n📧 Contact: support@yousef.engineering\n💬 Or use the chat widget!\n\n(Stripe payment will be available soon)`);
        setLoading(null);
        return;
      }
      
      // Create Stripe checkout session
      await createCheckoutSession(priceId, user.id);
      
    } catch (error) {
      console.error('Payment error:', error);
      
      // Better error message
      if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
        alert(`⏳ Backend is starting up...\n\nThe payment server is waking up (this takes ~30 seconds on first request).\n\nPlease try again in a moment!\n\n💬 Or contact: support@yousef.engineering`);
      } else {
        alert(`Payment Error: ${error.message}\n\nPlease try again or contact support.`);
      }
    } finally {
      setLoading(null);
    }
  };

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 'free': return <Zap className="w-8 h-8" />;
      case 'starter': return <Rocket className="w-8 h-8" />;
      case 'pro': return <Crown className="w-8 h-8" />;
      case 'master': return <Crown className="w-8 h-8" />;
      default: return <Zap className="w-8 h-8" />;
    }
  };

  const getPlanColor = (planId) => {
    switch (planId) {
      case 'free': return 'from-gray-500 to-gray-600';
      case 'starter': return 'from-blue-500 to-cyan-600';
      case 'pro': return 'from-purple-500 to-pink-600';
      case 'master': return 'from-yellow-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Plan</span>
          </h1>
          <p className="text-xl text-gray-400">
            Start free, upgrade when you need more power
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.values(PRICING_PLANS).map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-800 rounded-2xl border-2 ${
                plan.id === 'pro' ? 'border-purple-500 scale-105' : 'border-gray-700'
              } p-8 hover:border-purple-500 transition-all`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    POPULAR
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getPlanColor(plan.id)} flex items-center justify-center mb-6`}>
                {getPlanIcon(plan.id)}
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>

              {/* Credits */}
              <div className="mb-6 p-3 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-300">
                  {plan.credits === -1 ? 'Infinite' : plan.credits} AI Generations
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => {
                  if (plan.id === 'free') {
                    return;
                  }
                  handleSubscribe(plan.priceId, plan.name);
                }}
                disabled={loading === plan.name || plan.id === 'free'}
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  plan.id === 'free'
                    ? 'bg-gray-700 text-gray-400 cursor-default'
                    : loading === plan.name
                    ? 'bg-gray-600 cursor-wait'
                    : 'bg-gradient-to-r ' + getPlanColor(plan.id) + ' hover:opacity-90'
                }`}
              >
                {loading === plan.name ? 'Loading...' : plan.id === 'free' ? 'Current Plan' : 'Get Started'}
              </button>
              
              {/* Payment Methods Info */}
              {plan.id !== 'free' && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <span>💳 Credit/Debit Card</span>
                  <span>•</span>
                  <span>Apple Pay</span>
                  <span>•</span>
                  <span>Google Pay</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-400">Yes! Cancel anytime from your dashboard. No questions asked.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">What happens to my credits?</h3>
              <p className="text-gray-400">Credits reset monthly. Unused credits don't roll over.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Can I upgrade/downgrade?</h3>
              <p className="text-gray-400">Yes! Change plans anytime. Prorated billing applies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
