import { useState, useEffect } from 'react';
import { X, MessageSquare, ChevronRight, Zap, Heart, Award, Sparkles, User, Settings } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { useLives } from '../contexts/LivesContext';
import CelebrationOverlay from './CelebrationOverlay';

export default function StoryPlayer({ storyData, onComplete }) {
    const [currentNodeId, setCurrentNodeId] = useState('start');
    const [history, setHistory] = useState([]);
    const [celebration, setCelebration] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const { awardXP } = useProgress();
    const { loseLife } = useLives();

    const currentNode = storyData.nodes[currentNodeId];

    const handleChoice = async (choice) => {
        setIsTransitioning(true);

        // Add to history for "back" or review
        setHistory(prev => [...prev, { node: currentNodeId, choice: choice.text }]);

        // Resolve effects
        if (choice.effect === 'lose_life') loseLife();
        if (choice.xp) {
            setCelebration({ type: 'step', xp: choice.xp });
            await awardXP(choice.xp, 'story_choice', `${storyData.id}_${currentNodeId}`);
        }

        setTimeout(() => {
            if (choice.next === 'end') {
                onComplete();
            } else {
                setCurrentNodeId(choice.next);
                setIsTransitioning(false);
            }
        }, 600);
    };

    if (!currentNode) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center p-4">
            {celebration && (
                <CelebrationOverlay
                    type={celebration.type}
                    xp={celebration.xp}
                    onComplete={() => setCelebration(null)}
                />
            )}

            <div className="max-w-2xl w-full bg-gray-800 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[80vh]">
                {/* Header */}
                <div className="p-6 border-b border-white/5 bg-gray-900/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-xl">
                            <MessageSquare className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold leading-none mb-1">{storyData.title}</h3>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Story Mode</p>
                        </div>
                    </div>
                    <button onClick={onComplete} className="text-gray-500 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        {/* Speaker Indicator */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl border-2 border-white/5">
                                {currentNode.speakerEmoji || '👤'}
                            </div>
                            <div>
                                <h4 className="text-cyan-400 font-black text-xs uppercase tracking-widest">{currentNode.speaker || 'SYSTEM'}</h4>
                                <div className="h-0.5 w-8 bg-cyan-500/30 mt-1" />
                            </div>
                        </div>

                        {/* Dialogue Text */}
                        <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                            {currentNode.text}
                        </p>

                        {/* Optional Visual */}
                        {currentNode.image && (
                            <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                <img src={currentNode.image} alt="Scene" className="w-full h-auto" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Choices */}
                <div className="p-6 bg-gray-900/80 backdrop-blur-md border-t border-white/5 space-y-3">
                    {!isTransitioning && currentNode.choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChoice(choice)}
                            className={`w-full group p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between shadow-lg ${choice.color === 'danger'
                                    ? 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500'
                                    : 'border-gray-700 bg-gray-800/50 hover:border-cyan-500 hover:bg-cyan-500/5'
                                }`}
                        >
                            <span className="text-gray-200 group-hover:text-white font-bold text-lg">{choice.text}</span>
                            <ChevronRight className={`w-6 h-6 ${choice.color === 'danger' ? 'text-red-500' : 'text-cyan-500'} group-hover:translate-x-1 transition-transform`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
