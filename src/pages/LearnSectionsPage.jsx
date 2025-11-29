import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LearnSectionsPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pb-20 md:pb-0">
            {/* Header - Mobile Optimized */}
            <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2 md:mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm md:text-base">Back to Home</span>
                    </button>
                    <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Journey</h1>
                    <p className="text-sm md:text-base text-gray-400">Choose a lesson map to start learning</p>
                </div>
            </div>



            {/* Engineering Sections */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Engineering Journeys</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: 'Rockets', icon: '🚀', color: 'from-orange-500 to-red-600', path: '/games/map/rockets', description: '27 lessons on rocket engineering' },
                        { title: 'Planes', icon: '✈️', color: 'from-blue-500 to-indigo-600', path: '/games/map/planes', description: '20 lessons on aircraft design' },
                        { title: 'Cars', icon: '🚗', color: 'from-purple-500 to-pink-600', path: '/games/map/cars', description: '11 lessons on automotive engineering' },
                        { title: 'Electronics', icon: '⚡', color: 'from-teal-500 to-cyan-600', path: '/learn/electronics', description: 'Circuit design & embedded systems' },
                        { title: 'Civil & Structural', icon: '🏗️', color: 'from-amber-500 to-orange-600', path: '/learn/civil', description: 'Structures, materials & construction', comingSoon: true }
                    ].map((item) => (
                        <button
                            key={item.title}
                            onClick={() => !item.comingSoon && navigate(item.path)}
                            className={`group relative bg-gradient-to-br ${item.color} rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-white/20 hover:border-white/40 transition-all ${item.comingSoon ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer active:scale-95 md:hover:scale-105 hover:shadow-2xl'}`}
                        >
                            {item.comingSoon && (
                                <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                                    Coming Soon
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl md:rounded-3xl transition-opacity" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform">
                                    <span className="text-4xl md:text-5xl">{item.icon}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white text-center">{item.title}</h3>
                                <p className="text-white/90 text-center text-xs md:text-sm">{item.description}</p>
                                
                                <div className="flex items-center justify-center gap-2 text-white font-semibold mt-3 md:mt-4 text-sm">
                                    <span>{item.comingSoon ? 'Coming Soon' : 'Start Journey'}</span>
                                    {!item.comingSoon && <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 rotate-180 group-hover:translate-x-1 transition-transform" />}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
