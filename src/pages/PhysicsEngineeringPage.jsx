import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Atom } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function PhysicsEngineeringPage() {
  const navigate = useNavigate();
  const { isLessonCompleted } = useProgress();
  
  // If user has completed lesson 1, redirect to map immediately
  useEffect(() => {
    if (isLessonCompleted('physics', 1)) {
      navigate('/learn/physics/engineering/map', { replace: true });
    }
  }, [isLessonCompleted, navigate]);

  // Don't render anything if redirecting
  if (isLessonCompleted('physics', 1)) {
    return null;
  }

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
          <Atom className="w-12 h-12 text-blue-400" />
          <div>
            <h1 className="text-4xl font-bold">Physics Engineering</h1>
            <p className="text-gray-400">Master fundamental physics principles for engineering</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-8 border border-blue-500/30">
          <h2 className="text-3xl font-bold mb-4">33 MIT-Quality Lessons Available!</h2>
          <p className="text-gray-300 mb-6">
            Complete physics engineering curriculum covering:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-blue-300 mb-3">🚀 Mechanics & Motion (8 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Understanding Motion</li>
                <li>• Newton's Laws of Motion</li>
                <li>• Forces & Free-Body Diagrams</li>
                <li>• Friction, Normal Force & Tension</li>
                <li>• Circular Motion</li>
                <li>• Momentum & Collisions</li>
                <li>• Gravity & Weight</li>
                <li>• Projectile Motion</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-yellow-300 mb-3">⚡ Work, Energy & Power (5 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• What is Energy?</li>
                <li>• Work & Power</li>
                <li>• Conservation of Energy</li>
                <li>• Efficiency</li>
                <li>• Power Systems</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-3">🌊 Fluids & Pressure (5 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Pressure: Force Per Area</li>
                <li>• Buoyancy & Density</li>
                <li>• Bernoulli's Principle</li>
                <li>• Fluid Resistance & Drag</li>
                <li>• Compressible Flow</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-red-300 mb-3">🔥 Thermodynamics (5 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Temperature & Heat Transfer</li>
                <li>• Heat Transfer Methods</li>
                <li>• Laws of Thermodynamics</li>
                <li>• Internal Combustion Engines</li>
                <li>• Efficiency Limits & Carnot Cycle</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-300 mb-3">📡 Waves & Electricity (5 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Wave Properties</li>
                <li>• Frequency & Amplitude</li>
                <li>• Electricity Basics</li>
                <li>• Circuits & Ohm's Law</li>
                <li>• Magnetism & Electromagnetism</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-300 mb-3">🏗️ Materials & Structures (5 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• What Are Materials?</li>
                <li>• Stress & Strain</li>
                <li>• Elastic & Plastic Deformation</li>
                <li>• Failure & Fatigue</li>
                <li>• Material Selection</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => navigate('/learn/physics/engineering/map')}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Start Learning Physics Engineering →
          </button>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            33 lessons • 132 quiz questions • MIT-quality content
          </div>
        </div>
      </div>
    </div>
  );
}
