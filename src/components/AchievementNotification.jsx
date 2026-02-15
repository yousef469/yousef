import { useEffect, useState } from 'react';
import { Trophy, X, Sparkles } from 'lucide-react';

export default function AchievementNotification({ achievement, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple confetti effect using CSS
    const createConfetti = () => {
      const colors = ['#FFD700', '#FFA500', '#FF6347', '#9333EA', '#3B82F6'];
      const confettiContainer = document.createElement('div');
      confettiContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999';
      document.body.appendChild(confettiContainer);

      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position:absolute;
          width:10px;
          height:10px;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          left:${Math.random() * 100}%;
          top:-10px;
          opacity:1;
          transform:rotate(${Math.random() * 360}deg);
          animation:confettiFall ${2 + Math.random() * 2}s linear forwards;
        `;
        confettiContainer.appendChild(confetti);
      }

      setTimeout(() => document.body.removeChild(confettiContainer), 4000);
    };

    createConfetti();

    // Slide in animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div 
        className={`pointer-events-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 shadow-2xl border-4 border-yellow-300 max-w-md mx-4 transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Content */}
        <div className="text-center text-white">
          {/* Icon */}
          <div className="mb-4 relative">
            <Trophy className="w-20 h-20 mx-auto animate-bounce" />
            <Sparkles className="w-8 h-8 absolute top-0 right-1/4 text-yellow-200 animate-pulse" />
            <Sparkles className="w-6 h-6 absolute bottom-0 left-1/4 text-yellow-200 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-2">Achievement Unlocked!</h2>

          {/* Achievement details */}
          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <div className="text-4xl mb-2">{achievement.title}</div>
            <div className="text-lg">{achievement.description}</div>
          </div>

          {/* Message */}
          <p className="text-sm opacity-90">
            Keep up the great work! 🎉
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes confettiFall {
          to {
            top: 100%;
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
