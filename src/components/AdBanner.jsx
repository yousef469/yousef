import { X, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGenerations } from '../contexts/GenerationsContext';

export default function AdBanner() {
  const { userTier } = useGenerations();
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  // Don't show ads for paid users
  if (userTier !== 'free' || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6 relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded transition-colors"
        aria-label="Close ad"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>

      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-white font-bold mb-1">
            🚀 Upgrade to Remove Ads
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            Get ad-free experience + unlimited features with Starter, Pro, or Master plans
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white text-sm font-semibold transition-all"
          >
            <TrendingUp className="w-4 h-4" />
            View Plans
          </button>
        </div>

        {/* Ad Space - You can replace this with actual ads */}
        <div className="hidden md:block w-48 h-24 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
          <span className="text-gray-500 text-xs">Ad Space</span>
        </div>
      </div>
    </div>
  );
}
