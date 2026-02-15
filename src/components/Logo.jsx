import { Sparkles, Zap, Rocket } from 'lucide-react';

export default function Logo({ size = 'md', showText = true }) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-xl', container: 'gap-2' },
    md: { icon: 'w-8 h-8', text: 'text-3xl', container: 'gap-3' },
    lg: { icon: 'w-12 h-12', text: 'text-5xl', container: 'gap-4' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center ${currentSize.container}`}>
      {/* Logo Icon - Hexagon with Engineering Symbol */}
      <div className="relative">
        {/* Hexagon Background */}
        <div className="relative">
          <svg 
            className={currentSize.icon} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Hexagon - Gradient */}
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            
            {/* Hexagon Shape */}
            <path 
              d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" 
              fill="url(#hexGradient)"
              stroke="url(#innerGlow)"
              strokeWidth="2"
            />
            
            {/* Inner Gear/Engineering Symbol */}
            <circle cx="50" cy="50" r="20" fill="#1f2937" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="url(#innerGlow)" strokeWidth="2" />
            
            {/* Gear Teeth */}
            <path d="M50 30 L52 35 L48 35 Z" fill="url(#innerGlow)" />
            <path d="M50 70 L52 65 L48 65 Z" fill="url(#innerGlow)" />
            <path d="M30 50 L35 52 L35 48 Z" fill="url(#innerGlow)" />
            <path d="M70 50 L65 52 L65 48 Z" fill="url(#innerGlow)" />
            
            {/* Center Bolt */}
            <circle cx="50" cy="50" r="5" fill="url(#innerGlow)" />
            
            {/* Sparkle Effect */}
            <circle cx="75" cy="25" r="3" fill="#fbbf24" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div>
          <h1 className={`${currentSize.text} font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent`}>
            Engineerium
          </h1>
        </div>
      )}
    </div>
  );
}
