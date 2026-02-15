import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, Star, Clock, Trophy } from 'lucide-react';
import { units } from '../data/curriculum/index.js';
import { useProgress } from '../contexts/ProgressContext';

export default function BeginnerLessonsPage() {
    const navigate = useNavigate();
    const { userProfile, getSubjectProgress } = useProgress();

    const unitList = Object.values(units);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white pb-12">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Header */}
            <div className="relative z-10 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl sticky top-0">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/learn')}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Learning</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <span className="font-bold text-sm tracking-widest uppercase">Beginner Path</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-wider mb-4">
                        Beginner <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Engineering</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Start your journey here. Master the foundations of engineering through 6 comprehensive units and 36 interactive lessons.
                    </p>
                </div>

                {/* Units Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unitList.map((unit) => {
                        // Simplified progress tracking for beginner units
                        const isCompleted = false; // Placeholder

                        return (
                            <button
                                key={unit.id}
                                onClick={() => navigate(`/learn/unit/${unit.id}`)}
                                className="group relative bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-left overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10"
                            >
                                {/* Unit Icon & Number */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${unit.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {unit.emoji}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Unit</div>
                                        <div className="text-2xl font-black text-white/20 group-hover:text-white/40 transition-colors">0{unit.id}</div>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                                    {unit.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                    {unit.description}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                        <BookOpen className="w-3.5 h-3.5" />
                                        <span>{unit.totalLessons} Lessons</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>~90m</span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-sm font-black uppercase tracking-widest text-cyan-500 group-hover:text-cyan-400">
                                        Explore Unit
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
