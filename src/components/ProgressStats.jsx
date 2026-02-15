import { BarChart3, Target, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function ProgressStats() {
    const { progress } = useProgress();

    // Calculate micro-step stats
    const completedStepsCount = Object.keys(progress.completedMicroSteps || {}).length;
    // Assumption: Each lesson has ~10 micro-steps. Total lessons ~80. Total ~800 steps.
    const totalPossibleSteps = 800;
    const masteryPercentage = Math.round((completedStepsCount / totalPossibleSteps) * 100);

    // Group XP by day for the last 7 days
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toDateString();
    }).reverse();

    const xpByDay = last7Days.map(date => {
        let dayXp = 0;
        Object.values(progress.completedMicroSteps || {}).forEach(step => {
            if (new Date(step.completedAt).toDateString() === date) {
                dayXp += step.xpEarned || 20;
            }
        });
        // Add some random baseline if empty for visuals? No, stay real but graceful
        return { date: date.split(' ')[0], xp: dayXp };
    });

    const maxXP = Math.max(...xpByDay.map(d => d.xp), 100);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mastery Card */}
                <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Target className="w-16 h-16" />
                    </div>
                    <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-1">Micro-Mastery</div>
                    <div className="text-3xl font-black text-white mb-4">{masteryPercentage}%</div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                            style={{ width: `${masteryPercentage}%` }}
                        />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{completedStepsCount} of {totalPossibleSteps} steps completed</div>
                </div>

                {/* Weekly Activity */}
                <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 md:col-span-2 relative">
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-sm font-bold text-purple-400 uppercase tracking-wider">Weekly XP Trend</div>
                        <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                            <ArrowUpRight className="w-3 h-3" />
                            Active Week
                        </div>
                    </div>
                    <div className="flex items-end justify-between gap-2 h-24">
                        {xpByDay.map((day, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full relative flex items-end justify-center min-h-[4px]">
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-500 ${day.xp > 0 ? 'bg-gradient-to-t from-purple-600 to-pink-500' : 'bg-gray-700/50'
                                            }`}
                                        style={{ height: `${(day.xp / maxXP) * 100}%` }}
                                    >
                                        {day.xp > 0 && (
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 border border-gray-700 px-2 py-1 rounded text-[10px] font-bold text-white z-10">
                                                {day.xp} XP
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-[10px] text-gray-500 font-bold">{day.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Achievements / Milestones */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-400" />
                    Recent Milestones
                </h3>
                <div className="space-y-4">
                    {Object.entries(progress.completedLessons).slice(-3).reverse().map(([key, lesson]) => (
                        <div key={key} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-white uppercase">{lesson.subject}</div>
                                <div className="text-xs text-gray-400">Lesson {lesson.lessonId} Mastered</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-indigo-400">+{lesson.xpEarned} XP</div>
                                <div className="text-[10px] text-gray-500">{new Date(lesson.completedAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    ))}
                    {Object.keys(progress.completedLessons).length === 0 && (
                        <div className="text-center py-4 text-gray-500 text-sm">No lessons completed yet. Start your first lesson!</div>
                    )}
                </div>
            </div>
        </div>
    );
}
