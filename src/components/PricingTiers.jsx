import React from 'react';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';

const PricingTiers = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: '',
      icon: Zap,
      color: 'from-gray-500 to-gray-600',
      borderColor: 'border-gray-500/30',
      features: [
        'Limited lessons',
        'AI chat quota',
        'No comparison tool',
        'Basic 3D models'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: '/month',
      altPrice: '$99/year',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500/50',
      features: [
        'Full lessons',
        'Unlimited AI tutoring',
        'Offline mode',
        'All 3D models',
        'Model comparison tool',
        'Priority support'
      ],
      cta: 'Upgrade to Pro',
      popular: true
    },
    {
      name: 'Master',
      price: '$199',
      period: '/year',
      icon: Crown,
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500/50',
      features: [
        'Everything in Pro',
        'VR/AR support (when ready)',
        'Certificate of completion',
        'Advanced simulations',
        'Exclusive content',
        'Direct mentor access'
      ],
      cta: 'Go Master',
      popular: false
    }
  ];

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Choose Your Learning Path
        </h2>
        <p className="text-gray-300 text-lg">
          Start free, upgrade when you're ready to accelerate
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <div
              key={index}
              className={`relative bg-gray-800/50 backdrop-blur border-2 ${tier.borderColor} rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-2xl ${
                tier.popular ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-gray-900' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-bold text-white">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${tier.color} rounded-xl mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400">{tier.period}</span>
                </div>
                {tier.altPrice && (
                  <p className="text-sm text-gray-400 mt-1">or {tier.altPrice}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12 text-gray-400 text-sm">
        <p>All plans include access to our community and regular content updates</p>
      </div>
    </div>
  );
};

export default PricingTiers;
