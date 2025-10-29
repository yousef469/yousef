import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu } from 'lucide-react';

export default function ElectronicsPage() {
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
                    <Cpu className="w-12 h-12 text-cyan-400" />
                    <div>
                        <h1 className="text-4xl font-bold">Electronics & Circuits</h1>
                        <p className="text-gray-400">Build and understand electronic systems</p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
                    <p className="text-gray-300 mb-4">
                        We're building electronics lessons covering:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                        <li>• Basic Circuits (resistors, capacitors, inductors)</li>
                        <li>• Digital Electronics (logic gates, flip-flops)</li>
                        <li>• Microcontrollers (Arduino, ESP32, Raspberry Pi)</li>
                        <li>• Sensors & Actuators</li>
                        <li>• PCB Design & Embedded Systems</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
