import React, { useState, useEffect } from 'react';

const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-fadeOut">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-pulse">
          <div className="text-8xl mb-4 animate-bounce">🚀</div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-glow">
            Engineerium
          </h1>
          <p className="text-xl text-gray-400 mt-4 animate-fadeIn">
            Mechanics Redefined
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-loading"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
        }
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fadeOut {
          animation: fadeOut 3s ease-in-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease-in-out;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-loading {
          animation: loading 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
