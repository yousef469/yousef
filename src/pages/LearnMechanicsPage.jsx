import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Plane, Car, Atom } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LearnMechanicsPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const categories = [
        {
            id: 'rockets',
            icon: Rocket,
            title: t('home.learn.rockets'),
            description: t('home.learn.rocketsDesc'),
            gradient: 'from-orange-500 to-red-600',
            hoverGradient: 'from-orange-600 to-red-700',
            borderColor: 'border-orange-400/50',
            hoverBorderColor: 'hover:border-orange-300',
            shadowColor: 'shadow-orange-500/30',
            path: '/learn/rockets'
        },
        {
            id: 'planes',
            icon: Plane,
            title: t('home.learn.planes'),
            description: t('home.learn.planesDesc'),
            gradient: 'from-blue-500 to-indigo-600',
            hoverGradient: 'from-blue-600 to-indigo-700',
            borderColor: 'border-blue-400/50',
            hoverBorderColor: 'hover:border-blue-300',
            shadowColor: 'shadow-blue-500/30',
            path: '/learn/planes'
        },
        {
            id: 'cars',
            icon: Car,
            title: t('home.learn.cars'),
            description: t('home.learn.carsDesc'),
            gradient: 'from-purple-500 to-pink-600',
            hoverGradient: 'from-purple-600 to-pink-700',
            borderColor: 'border-purple-400/50',
            hoverBorderColor: 'hover:border-purple-300',
            shadowColor: 'shadow-purple-500/30',
            path: '/learn/cars'
        },
        {
            id: 'physics',
            icon: Atom,
            title: 'Physics Fundamentals',
            description: 'Learn core physics: motion, forces, energy, and thermodynamics',
            gradient: 'from-green-500 to-emerald-600',
            hoverGradient: 'from-green-600 to-emerald-700',
            borderColor: 'border-green-400/50',
            hoverBorderColor: 'hover:border-green-300',
            shadowColor: 'shadow-green-500/30',
            path: '/learn/physics'
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
                    <p className="text-gray-400">Choose a category to start learning</p>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => navigate(category.path)}
                                className={`group relative bg-gradient-to-br ${category.gradient} hover:${category.hoverGradient} rounded-2xl p-8 border-2 ${category.borderColor} ${category.hoverBorderColor} transition-all cursor-pointer hover:scale-105 hover:shadow-xl ${category.shadowColor}`}
                            >
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-white text-center">{category.title}</h3>

                                    <p className="text-white/90 text-center text-sm mb-4">
                                        {category.description}
                                    </p>

                                    <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                                        <span>Start Learning</span>
                                        <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
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
