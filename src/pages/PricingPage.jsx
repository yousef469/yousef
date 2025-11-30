import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, Bell } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = (e) => {
    e.preventDefault();
    // In production, you'd send this to your backend
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 mb-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors backdrop-blur"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Main Content */}
        <div className="text-center">
          {/* Beta Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">🎉 Currently 100% Free During Beta!</span>
          </div>

          {/* Clock Icon */}
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
            <Clock className="w-12 h-12 text-cyan-400" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Pricing Coming Soon
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            We're still in beta and everything is completely free! Premium plans with advanced features will be available once we're out of beta.
          </p>

          {/* What's Free Now */}
          <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-green-400">✨ What You Get Free Right Now:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {[
                'All 150+ Lessons',
                'AI Tutor (EnGo)',
                'Homework Solver',
                '3D Model Viewer',
                'JARVIS Mode',
                'All Calculators',
                'Career Projects',
                'Community Access',
                'Progress Tracking'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notify Form */}
          <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl p-8 border border-purple-500/30">
            <Bell className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Get Notified When Pricing Launches</h3>
            <p className="text-gray-400 mb-6">Be the first to know about our premium plans and early-bird discounts.</p>
            
            {subscribed ? (
              <div className="text-green-400 font-medium">
                ✓ You're on the list! We'll notify you when pricing is available.
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:opacity-90 transition-all whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <p className="text-gray-400 mb-4">In the meantime, enjoy all features for free!</p>
            <button
              onClick={() => navigate('/learn')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:opacity-90 transition-all"
            >
              Start Learning Free →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
