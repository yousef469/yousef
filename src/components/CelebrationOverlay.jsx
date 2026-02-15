import { useState, useEffect } from 'react';
import { Star, Zap, Award, Trophy, Crown, Sparkles } from 'lucide-react';

export default function CelebrationOverlay({ type = 'step', xp, onComplete }) {
    const [active, setActive] = useState(true);
    const [showImpact, setShowImpact] = useState(false);

    useEffect(() => {
        if (type !== 'step') {
            const impactTimer = setTimeout(() => setShowImpact(true), 100);
            return () => clearTimeout(impactTimer);
        }
    }, [type]);

    useEffect(() => {
        const duration = type === 'step' ? 2500 : 4000;
        const timer = setTimeout(() => {
            setActive(false);
            setTimeout(onComplete, 500);
        }, duration);
        return () => clearTimeout(timer);
    }, [onComplete, type]);

    const particleCount = {
        step: 30,
        lesson: 60,
        level: 100,
        mastery: 150
    }[type] || 30;

    const colors = {
        step: ['#06b6d4', '#3b82f6', '#8b5cf6'],
        lesson: ['#eab308', '#f59e0b', '#fbbf24', '#06b6d4'],
        level: ['#ec4899', '#a855f7', '#8b5cf6', '#3b82f6', '#06b6d4'],
        mastery: ['#facc15', '#fbbf24', '#f59e0b', '#ca8a04', '#eab308']
    }[type] || ['#06b6d4', '#3b82f6'];

    const particles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (type === 'step' ? 8 : 15) + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 1.5 + 1.5,
        delay: Math.random() * 2,
        rotation: Math.random() * 360
    }));

    const config = {
        step: {
            icon: Star,
            title: 'STEP COMPLETE!',
            subtitle: 'Keep going!',
            color: 'from-cyan-500 to-blue-600',
            borderColor: 'border-cyan-500/50',
            glow: 'shadow-[0_0_50px_rgba(6,182,212,0.3)]'
        },
        lesson: {
            icon: Trophy,
            title: 'LESSON MASTERED!',
            subtitle: 'Amazing work!',
            color: 'from-yellow-400 to-orange-500',
            borderColor: 'border-yellow-400/50',
            glow: 'shadow-[0_0_70px_rgba(234,179,8,0.4)]'
        },
        level: {
            icon: Crown,
            title: 'LEVEL UP!',
            subtitle: 'New heights reached!',
            color: 'from-purple-500 to-pink-600',
            borderColor: 'border-purple-500/50',
            glow: 'shadow-[0_0_100px_rgba(168,85,247,0.5)]'
        },
        mastery: {
            icon: Award,
            title: 'UNIT COMPLETE!',
            subtitle: 'You are an Engineering Pro!',
            color: 'from-amber-400 via-yellow-500 to-orange-600',
            borderColor: 'border-amber-400/50',
            glow: 'shadow-[0_0_120px_rgba(251,191,36,0.6)]'
        }
    }[type] || config.step;

    const Icon = config.icon;

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
            {/* Background Dim & Blur (Stronger for higher tiers) */}
            <div className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`} />

            {/* Impact Ring */}
            {showImpact && (
                <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none">
                    <div className={`w-0 h-0 border-4 ${config.borderColor} rounded-full animate-ping-impact`} />
                </div>
            )}

            {/* Particle Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="absolute animate-confetti"
                        style={{
                            left: `${p.x}%`,
                            top: `-10px`,
                            width: `${p.size}px`,
                            height: `${p.size * 1.5}px`,
                            backgroundColor: p.color,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                            transform: `rotate(${p.rotation}deg)`,
                            boxShadow: `0 0 15px ${p.color}`,
                            borderRadius: '2px'
                        }}
                    />
                ))}
            </div>

            {/* Main Content Card */}
            <div className={`relative bg-[#0a0c10]/90 border-t-4 ${config.borderColor} rounded-[3rem] p-12 flex flex-col items-center gap-6 transition-all duration-700 transform ${active ? 'scale-100 translate-y-0' : 'scale-75 translate-y-12'} ${config.glow}`}>
                <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.color} rounded-full blur-3xl opacity-40 animate-pulse`} />
                    <div className={`relative w-32 h-32 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center shadow-2xl transform animate-bounce-soft`}>
                        <Icon className="w-16 h-16 text-white" />
                        <div className="absolute -top-2 -right-2">
                            <Sparkles className="w-8 h-8 text-white animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h4 className="text-cyan-400 font-black tracking-[0.3em] uppercase text-sm animate-pulse">
                        {config.subtitle}
                    </h4>
                    <h3 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-lg">
                        {config.title}
                    </h3>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <span className={`text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${config.color}`}>
                            +{xp} XP
                        </span>
                        {type === 'level' && <span className="text-white text-3xl font-bold">REACHED!</span>}
                    </div>
                </div>

                {type === 'mastery' && (
                    <div className="mt-4 px-6 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm animate-pulse">
                        <span className="text-white font-bold tracking-widest text-sm uppercase">Legendary Status Achieved</span>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    50% { opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti linear forwards;
                }
                @keyframes bounce-soft {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-soft {
                    animation: bounce-soft 2s ease-in-out infinite;
                }
                @keyframes ping-impact {
                    0% { width: 0; h: 0; opacity: 1; border-width: 10px; }
                    100% { width: 1000px; height: 1000px; opacity: 0; border-width: 1px; }
                }
                .animate-ping-impact {
                    animation: ping-impact 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
