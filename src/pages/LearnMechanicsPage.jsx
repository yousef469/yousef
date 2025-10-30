import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Info, Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LearnMechanicsPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const mainOptions = [
        {
            id: 'sections',
            icon: Gamepad2,
            title: 'Engineering Sections',
            description: 'Interactive lessons and games for Rockets, Planes, and Cars',
            gradient: 'from-purple-500 via-blue-600 to-cyan-500',
            hoverGradient: 'from-purple-600 via-blue-700 to-cyan-600',
            borderColor: 'border-cyan-400/50',
            hoverBorderColor: 'hover:border-cyan-300',
            shadowColor: 'shadow-cyan-500/30',
            path: '/learn/sections'
        },
        {
            id: 'information',
            icon: Info,
            title: 'Information',
            description: 'Detailed mechanics pages, physics, mathematics, electronics, and books',
            gradient: 'from-orange-500 to-red-600',
            hoverGradient: 'from-orange-600 to-red-700',
            borderColor: 'border-orange-400/50',
            hoverBorderColor: 'hover:border-orange-300',
            shadowColor: 'shadow-orange-500/30',
            path: '/learn/information'
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
                    <h1 className="text-4xl font-bold mb-2">Learn Mechanics</h1>
                    <p className="text-gray-400">Choose how you want to learn</p>
                </div>
            </div>

            {/* Main Options */}
            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {mainOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.id}
                                onClick={() => navigate(option.path)}
                                className={`group relative bg-gradient-to-br ${option.gradient} hover:${option.hoverGradient} rounded-3xl p-12 border-2 ${option.borderColor} ${option.hoverBorderColor} transition-all cursor-pointer hover:scale-105 hover:shadow-2xl ${option.shadowColor}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />

                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                                        <Icon className="w-12 h-12 text-white" />
                                    </div>

                                    <h3 className="text-3xl font-bold mb-4 text-white text-center">{option.title}</h3>

                                    <p className="text-white/90 text-center text-lg mb-6">
                                        {option.description}
                                    </p>

                                    <div className="flex items-center justify-center gap-2 text-white font-semibold text-lg">
                                        <span>Explore</span>
                                        <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
