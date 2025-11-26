import { useState, useEffect } from 'react';
import ProjectTemplate from '../../components/projects/ProjectTemplate';
import { careerProjects } from '../../data/careerProjects';
import { Gauge, TrendingUp, Zap } from 'lucide-react';

export default function CarTransmissionProject() {
  const project = careerProjects.find(p => p.id === 'car-transmission');
  
  const [numGears, setNumGears] = useState(5);
  const [finalDrive, setFinalDrive] = useState(3.5);
  const [carType, setCarType] = useState('sport');
  const [enginePower, setEnginePower] = useState(200); // HP
  
  const [topSpeed, setTopSpeed] = useState(0);
  const [acceleration, setAcceleration] = useState(0);
  const [gearRatios, setGearRatios] = useState([]);

  const carProfiles = {
    comfort: { ratios: [3.5, 2.0, 1.4, 1.0, 0.8], name: 'Comfort Car' },
    sport: { ratios: [3.8, 2.4, 1.7, 1.3, 1.0], name: 'Sports Car' },
    offroad: { ratios: [4.5, 2.8, 1.9, 1.4, 1.1], name: 'Off-Road' }
  };

  useEffect(() => {
    const profile = carProfiles[carType];
    const ratios = profile.ratios.slice(0, numGears);
    setGearRatios(ratios);
    
    // Calculate performance
    const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    const speed = (enginePower * 2.5) / (finalDrive * avgRatio);
    const accel = (enginePower / 100) * (finalDrive * ratios[0]) / 2;
    
    setTopSpeed(speed);
    setAcceleration(accel);
  }, [numGears, finalDrive, carType, enginePower]);

  const handleGenerateReport = () => {
    alert(`Transmission Report\n\nGears: ${numGears}\nTop Speed: ${topSpeed.toFixed(0)} mph\n0-60: ${acceleration.toFixed(1)}s`);
  };

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Number of Gears: {numGears}</label>
        <input type="range" min="3" max="8" value={numGears} onChange={(e) => setNumGears(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Car Type</label>
        <select value={carType} onChange={(e) => setCarType(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg">
          <option value="comfort">Comfort Car</option>
          <option value="sport">Sports Car</option>
          <option value="offroad">Off-Road Vehicle</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Final Drive Ratio: {finalDrive}</label>
        <input type="range" min="2.5" max="5" step="0.1" value={finalDrive} onChange={(e) => setFinalDrive(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Engine Power: {enginePower} HP</label>
        <input type="range" min="100" max="500" step="10" value={enginePower} onChange={(e) => setEnginePower(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500" />
      </div>
    </div>
  );

  const simulation = (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2"><Gauge className="w-5 h-5 text-blue-400" /><span className="text-sm text-gray-300">Top Speed</span></div>
          <div className="text-2xl font-bold text-blue-400">{topSpeed.toFixed(0)} mph</div>
        </div>
        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2"><Zap className="w-5 h-5 text-green-400" /><span className="text-sm text-gray-300">0-60 mph</span></div>
          <div className="text-2xl font-bold text-green-400">{acceleration.toFixed(1)}s</div>
        </div>
      </div>
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-semibold mb-3">Gear Ratios</h3>
        <div className="space-y-2">
          {gearRatios.map((ratio, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Gear {idx + 1}:</span>
              <span className="text-white font-semibold">{ratio.toFixed(2)}:1</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const insights = (
    <div className="space-y-3">
      <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-300">
        Your {carProfiles[carType].name} transmission is optimized for {carType === 'sport' ? 'acceleration' : carType === 'comfort' ? 'fuel efficiency' : 'torque'}.
      </div>
    </div>
  );

  return <ProjectTemplate project={project} controls={controls} simulation={simulation} insights={insights} onGenerateReport={handleGenerateReport} />;
}
