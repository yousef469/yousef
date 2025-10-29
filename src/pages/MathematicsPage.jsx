import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';

export default function MathematicsPage() {
    const navigate = useNavigate();

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
                    <Calculator className="w-12 h-12 text-yellow-400" />
                    <div>
                        <h1 className="text-4xl font-bold">Mathematics</h1>
                        <p className="text-gray-400">Master the math behind engineering</p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
                    <p className="text-gray-300 mb-4">
                        We're building comprehensive math lessons covering:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                        <li>• Calculus (derivatives, integrals, differential equations)</li>
                        <li>• Linear Algebra (matrices, vectors, transformations)</li>
                        <li>• Trigonometry (angles, waves, oscillations)</li>
                        <li>• Statistics & Probability</li>
                        <li>• Engineering Mathematics</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
