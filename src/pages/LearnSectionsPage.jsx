import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, AlertCircle, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LearnSectionsPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const prerequisiteSections = [
        {
            id: 'physics',
            icon: Rocket,
            title: 'Physics for Engineering',
            description: 'Core physics principles: Mechanics, Energy, Fluids, Thermodynamics, Waves & Materials',
            gradient: 'from-blue-500 to-cyan-600',
            hoverGradient: 'from-blue-600 to-cyan-700',
            borderColor: 'border-blue-400/50',
            hoverBorderColor: 'hover:border-blue-300',
            shadowColor: 'shadow-blue-500/30',
            path: '/learn/physics/engineering',
            recommended: true
        },
        {
            id: 'mathematics',
            icon: Rocket,
            title: 'Mathematics for Engineering',
            description: 'Essential math foundation: Algebra, Calculus, Geometry, Linear Algebra & Statistics',
            gradient: 'from-green-500 to-emerald-600',
            hoverGradient: 'from-green-600 to-emerald-700',
            borderColor: 'border-green-400/50',
            hoverBorderColor: 'hover:border-green-300',
            shadowColor: 'shadow-green-500/30',
            path: '/learn/mathematics/engineering',
            recommended: true
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Journey</h1>
                    <p className="text-gray-400">Choose a lesson map to start your interactive learning journey</p>
                </div>
            </div>

            {/* Prerequisites Notice */}
            <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
                <div className="bg-blue-900/30 border-2 border-blue-500/50 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-3">Build Your Foundation</h2>
                            <p className="text-blue-200 text-lg mb-4">
                                Start with Mathematics and Physics to build a strong foundation, or jump directly into engineering journeys (Rockets, Planes, Cars, Electronics).
                            </p>
                            <p className="text-blue-300 mt-4 text-sm italic">
                                💡 All sections are now unlocked! Choose your path and start learning.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Sections */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Start Here</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {prerequisiteSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => navigate(section.path)}
                                className={`group relative bg-gradient-to-br ${section.gradient} hover:${section.hoverGradient} rounded-3xl p-10 border-2 ${section.borderColor} ${section.hoverBorderColor} transition-all cursor-pointer hover:scale-105 hover:shadow-2xl ${section.shadowColor}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />

                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                                        <Icon className="w-12 h-12 text-white" />
                                    </div>

                                    <h3 className="text-3xl font-bold mb-4 text-white text-center">{section.title}</h3>

                                    <p className="text-white/90 text-center mb-6">
                                        {section.description}
                                    </p>

                                    <div className="flex items-center justify-center gap-2 text-white font-semibold">
                                        <span>Start Learning</span>
                                        <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Engineering Sections */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Engineering Journeys</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Rockets', icon: '🚀', color: 'from-orange-500 to-red-600', path: '/games/map/rockets', description: '27 lessons on rocket engineering' },
                        { title: 'Planes', icon: '✈️', color: 'from-blue-500 to-indigo-600', path: '/games/map/planes', description: '20 lessons on aircraft design' },
                        { title: 'Cars', icon: '🚗', color: 'from-purple-500 to-pink-600', path: '/games/map/cars', description: '11 lessons on automotive engineering' },
                        { title: 'Electronics', icon: '⚡', color: 'from-teal-500 to-cyan-600', path: '/learn/electronics', description: 'Circuit design & embedded systems' }
                    ].map((item) => (
                        <button
                            key={item.title}
                            onClick={() => navigate(item.path)}
                            className={`group relative bg-gradient-to-br ${item.color} rounded-3xl p-10 border-2 border-white/20 hover:border-white/40 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                                    <span className="text-5xl">{item.icon}</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-white text-center">{item.title}</h3>
                                <p className="text-white/90 text-center text-sm">{item.description}</p>
                                
                                <div className="flex items-center justify-center gap-2 text-white font-semibold mt-4">
                                    <span>Start Journey</span>
                                    <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
