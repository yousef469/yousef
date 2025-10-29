import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Atom, Zap, Wind, Thermometer } from 'lucide-react';

export default function PhysicsPage() {
    const navigate = useNavigate();

    const topics = [
        {
            icon: Zap,
            title: 'Motion & Forces',
            description: 'Newton\'s laws, velocity, acceleration, momentum',
            color: 'from-yellow-500 to-orange-600'
        },
        {
            icon: Atom,
            title: 'Energy & Work',
            description: 'Kinetic energy, potential energy, conservation laws',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: Wind,
            title: 'Fluid Dynamics',
            description: 'Bernoulli\'s principle, drag, lift, pressure',
            color: 'from-purple-500 to-pink-600'
        },
        {
            icon: Thermometer,
            title: 'Thermodynamics',
            description: 'Heat, temperature, entropy, gas laws',
            color: 'from-red-500 to-orange-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/learn')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Learn
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <Atom className="w-12 h-12 text-green-400" />
                    <div>
                        <h1 className="text-4xl font-bold">Physics Fundamentals</h1>
                        <p className="text-gray-400">Master the core principles of physics</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {topics.map((topic, index) => {
                        const Icon = topic.icon;
                        return (
                            <div
                                key={index}
                                className={`bg-gradient-to-br ${topic.color} rounded-xl p-6 border border-white/10 hover:scale-105 transition-transform cursor-pointer`}
                            >
                                <Icon className="w-10 h-10 text-white mb-4" />
                                <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                                <p className="text-white/80">{topic.description}</p>
                                <div className="mt-4 text-sm text-white/60">Coming Soon</div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">Why Learn Physics?</h2>
                    <div className="space-y-3 text-gray-300">
                        <p>• Understand how rockets, planes, and cars actually work</p>
                        <p>• Learn the math behind engineering calculations</p>
                        <p>• Build intuition for real-world mechanics</p>
                        <p>• Foundation for advanced engineering topics</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
