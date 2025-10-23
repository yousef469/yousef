import { useState, useEffect } from 'react';
import { Rocket, Loader2 } from 'lucide-react';

export default function LoadingState({ progress = 0, message = 'Loading...' }) {
  const [factIndex, setFactIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const funFacts = [
    "🚀 The Saturn V rocket was as tall as a 36-story building!",
    "✈️ Modern jet engines can spin at over 10,000 RPM",
    "🏎️ Formula 1 cars can accelerate from 0-100 mph in 4 seconds",
    "🌍 The ISS travels at 17,500 mph around Earth",
    "⚡ SpaceX's Falcon 9 generates 1.7 million pounds of thrust",
    "🛰️ GPS satellites orbit Earth twice per day",
    "🔥 Rocket exhaust can reach temperatures of 3,000°C",
    "💨 The SR-71 Blackbird could fly at Mach 3.3",
    "🎯 Landing a rocket is like balancing a broomstick on your hand",
    "🌙 It takes 3 days to reach the Moon from Earth"
  ];

  useEffect(() => {
    const factTimer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 5000);

    const timeTimer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(factTimer);
      clearInterval(timeTimer);
    };
  }, []);

  const estimatedTime = Math.max(0, Math.ceil((100 - progress) / 10));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-md w-full px-6">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Rocket className="w-16 h-16 text-cyan-400 animate-bounce" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <h3 className="text-2xl font-bold text-center mb-2">{message}</h3>
        <p className="text-gray-400 text-center mb-8">
          {progress < 100 ? `${progress}% complete` : 'Almost there...'}
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{timeElapsed}s elapsed</span>
            {estimatedTime > 0 && <span>~{estimatedTime}s remaining</span>}
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-4">
          <div className="text-sm font-semibold text-cyan-400 mb-2">💡 Did you know?</div>
          <div className="text-sm text-gray-300">{funFacts[factIndex]}</div>
        </div>

        {/* Skeleton Preview (optional) */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-700/50 rounded-lg animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Skeleton Screen Component
export function SkeletonScreen() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="h-8 bg-gray-700 rounded w-1/3" />
      <div className="h-4 bg-gray-700 rounded w-2/3" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-700 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
