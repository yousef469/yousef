import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket } from 'lucide-react';
import ThrustSliderDemo from '../components/lessons/ThrustSliderDemo';
import DragVisualization from '../components/lessons/DragVisualization';
import StabilityDemo from '../components/lessons/StabilityDemo';
import OrbitalDemo from '../components/lessons/OrbitalDemo';

export default function LessonsDemoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/games/map/rockets')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Rocket className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold">Interactive Lessons Demo</h1>
              <p className="text-sm text-gray-400">All rocket engineering lessons in one place</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Unit 1: Flight Dynamics */}
        <section>
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg mb-2">
              <span className="text-cyan-400 font-semibold">Unit 1: Rocket Flight Dynamics</span>
            </div>
            <h2 className="text-3xl font-bold">Understanding Forces & Motion</h2>
          </div>
          <ThrustSliderDemo />
        </section>

        {/* Unit 2: Aerodynamics */}
        <section>
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg mb-2">
              <span className="text-blue-400 font-semibold">Unit 2: Aerodynamics</span>
            </div>
            <h2 className="text-3xl font-bold">Airflow & Drag Forces</h2>
          </div>
          <DragVisualization />
        </section>

        {/* Unit 3: Stability & Control */}
        <section>
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg mb-2">
              <span className="text-purple-400 font-semibold">Unit 3: Stability & Control</span>
            </div>
            <h2 className="text-3xl font-bold">Balance & Steering</h2>
          </div>
          <StabilityDemo />
        </section>

        {/* Unit 4: Orbital Mechanics */}
        <section>
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg mb-2">
              <span className="text-green-400 font-semibold">Unit 4: Orbital Mechanics</span>
            </div>
            <h2 className="text-3xl font-bold">Getting to Orbit</h2>
          </div>
          <OrbitalDemo />
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">🎓 What You've Learned</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Flight Dynamics</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Thrust vs gravity vs drag</li>
                <li>• F = ma with changing mass</li>
                <li>• Why rockets accelerate faster as they climb</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Aerodynamics</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Drag coefficient and shape</li>
                <li>• Streamlines and pressure zones</li>
                <li>• Why nose cones are pointy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Stability</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Center of Mass vs Center of Pressure</li>
                <li>• Self-correcting vs tumbling</li>
                <li>• Why fins are at the bottom</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Orbital Mechanics</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Orbit = continuous free fall</li>
                <li>• Orbital velocity (~7.8 km/s)</li>
                <li>• Balance of gravity and speed</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
