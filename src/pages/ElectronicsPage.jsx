import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function ElectronicsPage() {
    const navigate = useNavigate();
    const { isLessonCompleted } = useProgress();
    
    // If user has completed lesson 1, redirect to map
    useEffect(() => {
        if (isLessonCompleted('electronics', 0)) {
            navigate('/games/map/electronics', { replace: true });
        }
    }, [isLessonCompleted, navigate]);

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

                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-500/30">
                    <h2 className="text-3xl font-bold mb-4">20 MIT-Quality Lessons Available!</h2>
                    <p className="text-gray-300 mb-6">
                        Complete electronics and robotics engineering curriculum covering:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-purple-300 mb-3">🎓 Foundations (6 lessons)</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>• AC Circuits & Complex Numbers</li>
                                <li>• Filter Design & Frequency Response</li>
                                <li>• Transistor Circuits & Amplifiers</li>
                                <li>• Digital Logic & Timing</li>
                                <li>• Microcontroller Math</li>
                                <li>• Signal Processing Basics</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-yellow-300 mb-3">⚡ Power Electronics (4 lessons)</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>• DC-DC Converters & Switching</li>
                                <li>• Motor Control & PWM</li>
                                <li>• Power MOSFETs & Gate Drivers</li>
                                <li>• Battery Management Systems</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-blue-300 mb-3">🤖 Embedded Systems (5 lessons)</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>• Microcontroller Architecture</li>
                                <li>• Real-Time Operating Systems</li>
                                <li>• PID Control Implementation</li>
                                <li>• Sensor Interfacing (I2C, SPI, UART)</li>
                                <li>• Wireless (WiFi, BLE, LoRa)</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-pink-300 mb-3">🦾 Robotics (5 lessons)</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>• Robot Kinematics & Motion</li>
                                <li>• Computer Vision & Image Processing</li>
                                <li>• SLAM & Navigation</li>
                                <li>• Machine Learning for Robotics</li>
                                <li>• Autonomous Systems Integration</li>
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/games/map/electronics')}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        Start Learning Electronics & Robotics →
                    </button>
                    
                    <div className="mt-6 text-center text-sm text-gray-400">
                        20 lessons • 80 quiz questions • MIT-quality content
                    </div>
                </div>
            </div>
        </div>
    );
}
