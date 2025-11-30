import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Zap, Crown, Rocket, ArrowLeft, Star, Shield, Sparkles, Users, BookOpen, Bot, Calculator, Award, Glasses } from 'lucide-react';
import { PRICING_PLANS, createCheckoutSession } from '../services/stripe';
import { useAuth } from '../contexts/AuthContext';

export default function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleSubscribe = async (priceId, planName) => {
    if (!user) {
      if (confirm('Please sign in to subscribe. Go to login page?')) {
        window.location.href = '/auth';
      }
      return;
    }

    setLoading(planName);
    
    try {
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      
      if (!stripeKey) {
        alert(`🎉 You selected the ${planName} plan!\n\n📧 Contact: support@engineerium.com\n\n(Stripe payment coming soon)`);
        setLoading(null);
        return;
      }
      
      await createCheckoutSession(priceId, user.id);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment Error: ${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setLoading(null);
    }
  };

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 'free': return <Zap className="w-6 h-6" />;
      case 'starter': return <Rocket className="w-6 h-6" />;
      case 'pro': return <Crown className="w-6 h-6" />;
      case 'master': return <Star className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const getPlanGradient = (planId) => {
    switch (planId) {
      case 'free': return 'from-gray-600 to-gray-700';
      case 'starter': return 'from-blue-500 to-cyan-500';
      case 'pro': return 'from-purple-500 to-pink-500';
      case 'master': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPlanBorder = (planId) => {
    switch (planId) {
      case 'free': return 'border-gray-600 hover:border-gray-500';
      case 'starter': return 'border-blue-500/50 hover:border-blue-400';
      case 'pro': return 'border-purple-500 hover:border-purple-400';
      case 'master': return 'border-yellow-500/50 hover:border-yellow-400';
      default: return 'border-gray-600';
    }
  };

  // Feature comparison data
  const featureComparison = [
    { feature: 'Lessons Access', free: 'Beginner', starter: 'Advanced', pro: 'All', master: 'All + Early' },
    { feature: 'AI Tutor Chats', free: '20/mo', starter: '50/mo', pro: 'Unlimited', master: 'Unlimited' },
    { feature: 'Homework Solver', free: '3/mo', starter: '50/mo', pro: 'Unlimited', master: 'Unlimited' },
    { feature: 'Model Comparison', free: '1/wk', starter: '10/wk', pro: '50/wk', master: 'Unlimited' },
    { feature: 'JARVIS Explode', free: '3/wk', starter: '10/wk', pro: '150/mo', master: 'Unlimited' },
    { feature: 'Calculators', free: '25%', starter: '60%', pro: '100%', master: '100%' },
    { feature: 'Career Projects', free: false, starter: false, pro: true, master: true },
    { feature: 'Certificates', free: false, starter: true, pro: true, master: true },
    { feature: 'VR Support', free: false, starter: false, pro: false, master: true },
    { feature: 'Priority Support', free: false, starter: true, pro: true, master: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 mb-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors backdrop-blur"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">🎉 BETA: Everything Free!</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
              100% Free During Beta
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            All premium features are unlocked for free during our beta period. Help us improve by sharing your feedback!
          </p>
          
          {/* Beta Banner */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-green-400 mb-2">🚀 What You Get For Free:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Unlimited AI Chats</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> All 150+ Lessons</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Homework Solver</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Model Comparison</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> JARVIS Mode</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> All Calculators</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Career Projects</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Certificates</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Community Access</div>
            </div>
            <p className="text-xs text-gray-400 mt-4">* Paid tiers will be introduced after we reach 500+ daily active users</p>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.values(PRICING_PLANS).map((plan) => {
            const yearlyPrice = (plan.price * 12 * 0.8).toFixed(0);
            const displayPrice = billingCycle === 'yearly' && plan.price > 0 
              ? (yearlyPrice / 12).toFixed(2) 
              : plan.price;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-gray-800/50 backdrop-blur rounded-2xl border-2 ${getPlanBorder(plan.id)} p-6 transition-all hover:scale-[1.02] ${
                  plan.id === 'pro' ? 'lg:scale-105 lg:hover:scale-[1.07]' : ''
                }`}
              >
                {plan.id === 'pro' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-purple-500/50">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}

                {plan.id === 'master' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                      👑 BEST VALUE
                    </span>
                  </div>
                )}

                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPlanGradient(plan.id)} flex items-center justify-center`}>
                    {getPlanIcon(plan.id)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs text-gray-400">
                      {plan.id === 'free' && 'Get started'}
                      {plan.id === 'starter' && 'For learners'}
                      {plan.id === 'pro' && 'For serious students'}
                      {plan.id === 'master' && 'For professionals'}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${displayPrice}</span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                  {billingCycle === 'yearly' && plan.price > 0 && (
                    <p className="text-sm text-green-400 mt-1">
                      ${yearlyPrice}/year (save ${(plan.price * 12 * 0.2).toFixed(0)})
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
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
                      navigate('/auth');
                      return;
                    }
                    handleSubscribe(plan.priceId, plan.name);
                  }}
                  disabled={loading === plan.name}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    plan.id === 'free'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : loading === plan.name
                      ? 'bg-gray-600 cursor-wait'
                      : `bg-gradient-to-r ${getPlanGradient(plan.id)} hover:opacity-90 shadow-lg`
                  }`}
                >
                  {loading === plan.name ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : plan.id === 'free' ? (
                    'Start Free'
                  ) : (
                    'Get Started'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Compare All Features</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800/50 backdrop-blur rounded-2xl overflow-hidden">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold text-gray-400">Free</th>
                  <th className="p-4 text-center font-semibold text-blue-400">Starter</th>
                  <th className="p-4 text-center font-semibold text-purple-400">Pro</th>
                  <th className="p-4 text-center font-semibold text-yellow-400">Master</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                      ) : (
                        <span className="text-gray-400">{row.free}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                      ) : (
                        <span className="text-blue-400">{row.starter}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                      ) : (
                        <span className="text-purple-400">{row.pro}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.master === 'boolean' ? (
                        row.master ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" />
                      ) : (
                        <span className="text-yellow-400">{row.master}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 text-center">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-sm font-medium">Secure Payments</p>
            <p className="text-xs text-gray-400">256-bit SSL</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium">10,000+ Students</p>
            <p className="text-xs text-gray-400">Trust us</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 text-center">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm font-medium">30-Day Guarantee</p>
            <p className="text-xs text-gray-400">Money back</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 text-center">
            <Bot className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium">24/7 AI Support</p>
            <p className="text-xs text-gray-400">Always available</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes! Cancel anytime from your dashboard. No questions asked, no hidden fees.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, Apple Pay, Google Pay, and PayPal through Stripe.' },
              { q: 'Can I upgrade or downgrade?', a: 'Absolutely! Change plans anytime. Prorated billing applies automatically.' },
              { q: 'Is there a student discount?', a: 'Yes! Students with a valid .edu email get 50% off all paid plans. Contact support.' },
              { q: 'What happens when I reach my limit?', a: 'You\'ll be notified and can upgrade or wait for the reset. Limits reset monthly/weekly.' },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6">Our team is here to help you choose the right plan.</p>
          <button
            onClick={() => navigate('/help')}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:opacity-90 transition-all"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
