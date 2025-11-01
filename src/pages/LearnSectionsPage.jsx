import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Plane, Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LearnSectionsPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const sections = [
        {
            id: 'rockets',
            icon: Rocket,
            title: t('home.learn.rockets'),
            description: 'Interactive lessons and games about rocket mechanics',
            gradient: 'from-orange-500 to-red-600',
            hoverGradient: 'from-orange-600 to-red-700',
            borderColor: 'border-orange-400/50',
            hoverBorderColor: 'hover:border-orange-300',
            shadowColor: 'shadow-orange-500/30',
            path: '/games/map/rockets'
        },
        {
            id: 'planes',
            icon: Plane,
            title: t('home.learn.planes'),
            description: 'Interactive lessons and games about aircraft mechanics',
            gradient: 'from-blue-500 to-indigo-600',
            hoverGradient: 'from-blue-600 to-indigo-700',
            borderColor: 'border-blue-400/50',
            hoverBorderColor: 'hover:border-blue-300',
            shadowColor: 'shadow-blue-500/30',
            path: '/games/map/planes'
        },
        {
            id: 'cars',
            icon: Car,
            title: t('home.learn.cars'),
            description: 'Interactive lessons and games about automotive mechanics',
            gradient: 'from-purple-500 to-pink-600',
            hoverGradient: 'from-purple-600 to-pink-700',
            borderColor: 'border-purple-400/50',
            hoverBorderColor: 'hover:border-purple-300',
            shadowColor: 'shadow-purple-500/30',
            path: '/games/map/cars'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <button
                        onClick={() => navigate('/learn')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Learn
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Journey</h1>
                    <p className="text-gray-400">Choose a lesson map to start your interactive learning journey</p>
                </div>
            </div>

            {/* Sections Grid */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {sections.map((section) => {
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
                                        <span>Open Lesson Map</span>
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
