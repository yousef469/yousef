import { useNavigate } from 'react-router-dom';
import { Calendar, RefreshCw, ChevronRight, Brain } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function SRSReviewCard() {
    const navigate = useNavigate();
    const { getLessonsToReview, reviewCount } = useProgress();

    const lessonsToReview = getLessonsToReview();

    if (reviewCount === 0) {
        return (
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">All Caught Up!</h3>
                </div>
                <p className="text-gray-300">You've reviewed everything scheduled for today. Great job keeping your memory fresh!</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-500/30 rounded-xl p-6 shadow-premium-lg card-hover">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin-slow" />
                    <h3 className="text-xl font-bold text-white">Daily Review</h3>
                </div>
                <div className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full">
                    {reviewCount} DUE
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {lessonsToReview.slice(0, 2).map((lesson, idx) => (
                    <div key={idx} className="bg-black/20 rounded-lg p-3 border border-white/5 flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-300">
                                <Brain className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider">{lesson.subject}</div>
                                <div className="text-sm font-medium text-white truncate max-w-[150px]">Lesson {lesson.lessonId}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate(`/games/play/${lesson.subject}/lesson/${lesson.lessonId}`)}
                            className="p-1.5 hover:bg-indigo-500/20 rounded-full transition-colors text-indigo-400"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                ))}
                {reviewCount > 2 && (
                    <div className="text-center text-xs text-gray-400 pt-1">
                        + {reviewCount - 2} more lessons scheduled
                    </div>
                )}
            </div>

            <button
                onClick={() => {
                    const first = lessonsToReview[0];
                    navigate(`/games/play/${first.subject}/lesson/${first.lessonId}`);
                }}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
            >
                Start Review Session
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
}

const ArrowRight = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);
