import { useState, useEffect } from 'react';
import { X, Rocket, Target, Trophy, ArrowRight, Brain, Clock, Star, Zap, Award, BookOpen, AlertCircle, Heart, CheckCircle, ChevronRight, Sparkles, Flame } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { useLives } from '../contexts/LivesContext';
import CelebrationOverlay from './CelebrationOverlay';
import { useNavigate } from 'react-router-dom';

export default function MicroLessonPlayer({ subject, lessonData, onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [celebration, setCelebration] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [showBonus, setShowBonus] = useState(false);
    const [pickedChest, setPickedChest] = useState(null);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const { completeMicroStep, awardXP } = useProgress();
    const { lives, loseLife, isUnlimited } = useLives();
    const navigate = useNavigate();

    const sections = lessonData.sections || lessonData.content?.sections || [];
    const mainQuiz = lessonData.quiz?.questions || [];
    const totalSteps = sections.length;
    const currentSection = sections[currentStep];

    const sectionQuiz = currentSection?.quiz || (mainQuiz[currentStep] ? {
        question: mainQuiz[currentStep].question || mainQuiz[currentStep].q,
        options: mainQuiz[currentStep].options,
        correctAnswer: typeof mainQuiz[currentStep].correctAnswer === 'number'
            ? mainQuiz[currentStep].correctAnswer
            : mainQuiz[currentStep].options.indexOf(mainQuiz[currentStep].a)
    } : null);

    const progress = ((currentStep) / totalSteps) * 100;

    const handleContinue = async () => {
        if (showQuiz) {
            if (isCorrect) {
                const xpResult = await completeMicroStep(subject, lessonData.id, currentStep);
                setCelebration({ type: 'step', xp: xpResult.xpEarned });
                setIsCorrect(null);
                setSelectedAnswer(null);
                setShowQuiz(false);
                setShowHint(false);
                setWrongAttempts(0);
                setConsecutiveCorrect(prev => prev + 1);
                setCorrectCount(prev => prev + 1);

                if (currentStep < sections.length - 1) {
                    setIsTransitioning(true);
                    setTimeout(() => {
                        setCurrentStep(prev => prev + 1);
                        setIsTransitioning(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 500);
                } else {
                    setShowBonus(true);
                }
            } else {
                setSelectedAnswer(null);
                setIsCorrect(null);
            }
        } else {
            setShowQuiz(true);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    const handleAnswerSelect = (optionIdx) => {
        if (isCorrect !== null) return;

        setSelectedAnswer(optionIdx);
        const correctIdx = sectionQuiz?.correctAnswer ?? 0;
        const correct = optionIdx === correctIdx;
        setIsCorrect(correct);

        if (!correct) {
            setWrongAttempts(prev => prev + 1);
            setConsecutiveCorrect(0);
            loseLife();
        }
    };

    const handleBonusPick = async (bonusXp) => {
        if (pickedChest !== null) return;
        setPickedChest(bonusXp);

        setCelebration({ type: 'lucky', xp: bonusXp });
        await awardXP(bonusXp, 'lucky_bonus', `lesson_finish_${lessonData.id}`);

        setTimeout(() => {
            onComplete(subject, lessonData.id, { score: correctCount, totalQuestions: sections.length });
        }, 2500);
    };

    const renderBonusStage = () => {
        return (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                <h2 className="text-4xl font-black text-white mb-2">LESSON COMPLETE!</h2>
                <p className="text-cyan-400 font-bold mb-12 uppercase tracking-widest">Pick a lucky chest for a bonus prize</p>

                <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                    {[0, 1, 2].map((i) => {
                        return (
                            <button
                                key={i}
                                onClick={() => handleBonusPick([10, 25, 50][Math.floor(Math.random() * 3)])}
                                disabled={pickedChest !== null}
                                className={`group relative aspect-square bg-gray-800 rounded-3xl border-2 transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-4 ${pickedChest !== null ? 'opacity-50' : 'border-gray-700 hover:border-cyan-500 shadow-lg shadow-cyan-500/10'
                                    }`}
                            >
                                <div className="text-5xl group-hover:rotate-12 transition-transform">🎁</div>
                                <span className="font-bold text-gray-400 group-hover:text-white uppercase text-xs tracking-tighter">Lucky Chest</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderOutOfLives = () => {
        return (
            <div className="text-center py-20 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                    <Heart className="w-12 h-12 fill-current" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4">OUT OF FUEL!</h2>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">You've run out of lives. Wait for them to regenerate or upgrade to Pro for infinite learning!</p>
                <div className="flex flex-col gap-4 max-w-xs mx-auto">
                    <button
                        onClick={() => navigate('/pricing')}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20"
                    >
                        Get Infinite Lives
                    </button>
                    <button
                        onClick={() => navigate('/home')}
                        className="text-gray-400 hover:text-white font-medium py-2"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    };

    if (lives <= 0 && !isUnlimited) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                {renderOutOfLives()}
            </div>
        );
    }

    if (showBonus) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                {renderBonusStage()}
                {celebration && (
                    <CelebrationOverlay
                        type={celebration.type}
                        xp={celebration.xp}
                        onComplete={() => setCelebration(null)}
                    />
                )}
            </div>
        );
    }

    if (!currentSection) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {celebration && (
                <CelebrationOverlay
                    type={celebration.type}
                    xp={celebration.xp}
                    onComplete={() => setCelebration(null)}
                />
            )}

            <div className="sticky top-20 z-20 bg-gray-900/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 mb-8 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                        {Math.round(progress)}% Complete
                    </span>
                </div>
                <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className={`transition-all duration-400 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 mb-8 shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Rocket className="w-8 h-8 text-cyan-400" />
                        {currentSection.title}
                    </h2>

                    <div className="prose prose-invert max-w-none">
                        {currentSection.content?.split('\n').map((para, i) => (
                            <p key={i} className="text-gray-300 text-lg leading-relaxed mb-4">
                                {para}
                            </p>
                        ))}
                    </div>

                    {currentSection.image && (
                        <div className="mt-8 rounded-xl overflow-hidden border border-gray-700">
                            <img src={currentSection.image} alt={currentSection.title} className="w-full h-auto" />
                        </div>
                    )}
                </div>

                {showQuiz && (
                    <div className="bg-gray-800/60 border-2 border-purple-500/30 rounded-2xl p-6 md:p-8 mb-24 animate-in slide-in-from-bottom-8 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <Brain className="w-6 h-6 text-purple-400" />
                            <h3 className="text-xl font-bold text-white">Check your understanding</h3>
                        </div>

                        <p className="text-lg text-gray-200 mb-6 font-medium">
                            {sectionQuiz?.question || "Based on the text above, which of the following is true?"}
                        </p>

                        <div className="space-y-3">
                            {(sectionQuiz?.options || ['True', 'False']).map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerSelect(idx)}
                                    disabled={isCorrect !== null}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${selectedAnswer === idx
                                            ? isCorrect
                                                ? 'border-green-500 bg-green-500/10'
                                                : 'border-red-500 bg-red-500/10 animate-shake'
                                            : isCorrect !== null && idx === (sectionQuiz?.correctAnswer ?? 0)
                                                ? 'border-green-500/50 bg-green-500/5'
                                                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
                                        }`}
                                >
                                    <span className={`text-lg ${selectedAnswer === idx ? 'text-white' : 'text-gray-300'}`}>
                                        {option}
                                    </span>
                                    {selectedAnswer === idx && (
                                        isCorrect ? <CheckCircle className="w-6 h-6 text-green-500" /> : <div className="text-red-500 font-bold">✕</div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {isCorrect === false && (
                            <div className="mt-4 space-y-3">
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-start gap-3">
                                    <div className="mt-1">⚠️</div>
                                    <p>Not quite! Review the section above and try again. You lost 1 life.</p>
                                </div>

                                {wrongAttempts >= 2 && !showHint && (
                                    <button
                                        onClick={() => setShowHint(true)}
                                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-sm uppercase tracking-widest pl-1"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Need a hint?
                                    </button>
                                )}

                                {showHint && (
                                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-100 italic text-sm animate-in fade-in slide-in-from-top-2">
                                        <span className="font-bold uppercase text-cyan-400 not-italic mr-2">Hint:</span>
                                        {sectionQuiz?.hint || "Look closely at the key points in the text above. The answer is usually explicitly stated!"}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 z-30">
                <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm font-bold text-gray-300">+20 XP per step</span>
                        </div>
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={showQuiz && isCorrect === null}
                        className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${showQuiz && isCorrect === null
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : isCorrect === false
                                    ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white hover:shadow-cyan-500/25'
                            }`}
                    >
                        {showQuiz
                            ? isCorrect === false
                                ? 'Try Again'
                                : currentStep === totalSteps - 1 ? 'Finish Lesson' : 'Next Step'
                            : 'Got it!'}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {consecutiveCorrect >= 3 && (
                <div className="fixed top-24 right-4 z-30 animate-in slide-in-from-right-8 fade-in">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 rounded-2xl shadow-lg border border-orange-400/50 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-white animate-pulse" />
                        <span className="text-white font-black italic">{consecutiveCorrect} STREAK!</span>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.2s ease-in-out 0s 2;
                }
            `}</style>
        </div>
    );
}
