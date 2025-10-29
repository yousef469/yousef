import { Heart, Crown, Zap } from 'lucide-react';
import { useLives } from '../contexts/LivesContext';
import { useNavigate } from 'react-router-dom';

export default function LivesDisplay() {
  const { lives, maxLives, userTier, nextLifeIn, isUnlimited } = useLives();
  const navigate = useNavigate();

  const getTierIcon = () => {
    switch (userTier) {
      case 'starter': return <Zap className="w-4 h-4 text-blue-400" />;
      case 'pro': return <Crown className="w-4 h-4 text-purple-400" />;
      case 'master': return <Crown className="w-4 h-4 text-yellow-400" />;
      default: return null;
    }
  };

  const getTierColor = () => {
    switch (userTier) {
      case 'starter': return 'from-blue-500 to-cyan-600';
      case 'pro': return 'from-purple-500 to-pink-600';
      case 'master': return 'from-yellow-500 to-orange-600';
      default: return 'from-red-500 to-pink-600';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className={`bg-gradient-to-r ${getTierColor()} rounded-2xl p-4 shadow-2xl border-2 border-white/20`}>
        {/* Tier Badge */}
        <div className="flex items-center gap-2 mb-3">
          {getTierIcon()}
          <span className="text-white font-bold text-sm uppercase">
            {userTier} Tier
          </span>
        </div>

        {/* Lives Display */}
        <div className="flex items-center gap-2 mb-2">
          {isUnlimited ? (
            <>
              <Heart className="w-6 h-6 text-white fill-white" />
              <span className="text-white font-bold text-xl">∞</span>
              <span className="text-white/80 text-sm">Infinite</span>
            </>
          ) : (
            <>
              {Array.from({ length: maxLives }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${
                    i < lives ? 'text-white fill-white' : 'text-white/30'
                  }`}
                />
              ))}
              <span className="text-white font-bold ml-2">{lives}/{maxLives}</span>
            </>
          )}
        </div>

        {/* Regeneration Timer */}
        {!isUnlimited && lives < maxLives && nextLifeIn && (
          <div className="text-white/80 text-xs mt-2">
            Next life in: <span className="font-bold">{nextLifeIn}</span>
          </div>
        )}

        {/* Upgrade Prompt */}
        {!isUnlimited && lives === 0 && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-white text-xs mb-2">Out of lives!</p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full bg-white text-gray-900 px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all"
            >
              Upgrade for More
            </button>
          </div>
        )}

        {/* Tier Benefits */}
        {userTier === 'free' && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-white/80 text-xs mb-2">Want more lives?</p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full bg-white/20 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-white/30 transition-all"
            >
              View Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
