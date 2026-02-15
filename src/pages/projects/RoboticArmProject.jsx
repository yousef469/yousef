import { useState, useEffect } from 'react';
import ProjectTemplate from '../../components/projects/ProjectTemplate';
import { careerProjects } from '../../data/careerProjects';
import { Move, Target, Ruler } from 'lucide-react';

export default function RoboticArmProject() {
  const project = careerProjects.find(p => p.id === 'robotic-arm');
  
  const [joint1Angle, setJoint1Angle] = useState(0); // Base rotation
  const [joint2Angle, setJoint2Angle] = useState(45); // Shoulder
  const [joint3Angle, setJoint3Angle] = useState(-45); // Elbow
  
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [reach, setReach] = useState(0);

  const link1Length = 100; // mm
  const link2Length = 100; // mm

  // Forward kinematics calculation
  useEffect(() => {
    const j1Rad = (joint1Angle * Math.PI) / 180;
    const j2Rad = (joint2Angle * Math.PI) / 180;
    const j3Rad = (joint3Angle * Math.PI) / 180;
    
    // Calculate end effector position (simplified 2D)
    const x1 = link1Length * Math.cos(j2Rad);
    const y1 = link1Length * Math.sin(j2Rad);
    
    const x2 = x1 + link2Length * Math.cos(j2Rad + j3Rad);
    const y2 = y1 + link2Length * Math.sin(j2Rad + j3Rad);
    
    setEndX(x2);
    setEndY(y2);
    setReach(Math.sqrt(x2 * x2 + y2 * y2));
  }, [joint1Angle, joint2Angle, joint3Angle]);

  const handleGenerateReport = () => {
    alert(`Robotic Arm Report\n\nEnd Position: (${endX.toFixed(1)}, ${endY.toFixed(1)}) mm\nReach: ${reach.toFixed(1)} mm`);
  };

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Joint 1 (Base): {joint1Angle}°
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          value={joint1Angle}
          onChange={(e) => setJoint1Angle(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Joint 2 (Shoulder): {joint2Angle}°
        </label>
        <input
          type="range"
          min="-90"
          max="90"
          value={joint2Angle}
          onChange={(e) => setJoint2Angle(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Joint 3 (Elbow): {joint3Angle}°
        </label>
        <input
          type="range"
          min="-135"
          max="135"
          value={joint3Angle}
          onChange={(e) => setJoint3Angle(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
        <h3 className="text-sm font-semibold mb-2">Quick Positions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => { setJoint1Angle(0); setJoint2Angle(0); setJoint3Angle(0); }}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Home
          </button>
          <button
            onClick={() => { setJoint1Angle(0); setJoint2Angle(90); setJoint3Angle(0); }}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Up
          </button>
          <button
            onClick={() => { setJoint1Angle(0); setJoint2Angle(0); setJoint3Angle(-90); }}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Reach
          </button>
          <button
            onClick={() => { setJoint1Angle(90); setJoint2Angle(45); setJoint3Angle(-45); }}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Side
          </button>
        </div>
      </div>
    </div>
  );

  const simulation = (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Move className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-300">X Position</span>
          </div>
          <div className="text-xl font-bold text-blue-400">
            {endX.toFixed(1)} mm
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Move className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-300">Y Position</span>
          </div>
          <div className="text-xl font-bold text-purple-400">
            {endY.toFixed(1)} mm
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/50 rounded-lg p-4 border border-pink-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-5 h-5 text-pink-400" />
            <span className="text-sm text-gray-300">Reach</span>
          </div>
          <div className="text-xl font-bold text-pink-400">
            {reach.toFixed(1)} mm
          </div>
        </div>
      </div>

      {/* Arm Visualization */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-sm font-semibold mb-4 text-center">Arm Position (Top View)</h3>
        <svg viewBox="-150 -150 300 300" className="w-full h-64">
          {/* Grid */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="0" cy="0" r="100" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="0" cy="0" r="150" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" />
          
          {/* Base */}
          <circle cx="0" cy="0" r="10" fill="#3b82f6" />
          
          {/* Link 1 */}
          <line
            x1="0"
            y1="0"
            x2={link1Length * Math.cos((joint2Angle * Math.PI) / 180)}
            y2={-link1Length * Math.sin((joint2Angle * Math.PI) / 180)}
            stroke="#8b5cf6"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Joint 2 */}
          <circle
            cx={link1Length * Math.cos((joint2Angle * Math.PI) / 180)}
            cy={-link1Length * Math.sin((joint2Angle * Math.PI) / 180)}
            r="8"
            fill="#a855f7"
          />
          
          {/* Link 2 */}
          <line
            x1={link1Length * Math.cos((joint2Angle * Math.PI) / 180)}
            y1={-link1Length * Math.sin((joint2Angle * Math.PI) / 180)}
            x2={endX}
            y2={-endY}
            stroke="#ec4899"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* End Effector */}
          <circle cx={endX} cy={-endY} r="6" fill="#f43f5e" />
          <Target className="w-4 h-4" x={endX - 8} y={-endY - 8} stroke="#f43f5e" />
          
          {/* Axes */}
          <line x1="-150" y1="0" x2="150" y2="0" stroke="#4b5563" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="0" y1="-150" x2="0" y2="150" stroke="#4b5563" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-semibold mb-2">Workspace Analysis</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Maximum Reach:</span>
            <span className="text-white font-semibold">{link1Length + link2Length} mm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Current Reach:</span>
            <span className="text-white font-semibold">{reach.toFixed(1)} mm ({((reach / (link1Length + link2Length)) * 100).toFixed(0)}%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Degrees of Freedom:</span>
            <span className="text-white font-semibold">3 DOF</span>
          </div>
        </div>
      </div>
    </div>
  );

  const insights = (
    <div className="space-y-3">
      <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-300">
        <strong>Forward Kinematics:</strong> You're controlling joint angles and calculating the end effector position. This is how industrial robots are programmed!
      </div>
      {reach > 180 && (
        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-300">
          Great reach! Your arm is extended to {((reach / 200) * 100).toFixed(0)}% of its maximum capability.
        </div>
      )}
      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-300">
          <strong>Real-World Application:</strong> Industrial robots like those used in car manufacturing have 6+ joints for full 3D positioning and orientation. Your 3-joint arm demonstrates the fundamental principles!
        </p>
      </div>
    </div>
  );

  return (
    <ProjectTemplate
      project={project}
      controls={controls}
      simulation={simulation}
      insights={insights}
      onGenerateReport={handleGenerateReport}
    />
  );
}
