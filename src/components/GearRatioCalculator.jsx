import { useState } from 'react';
import { Cog, Gauge } from 'lucide-react';

export default function GearRatioCalculator() {
  const [engineRPM, setEngineRPM] = useState(3000);
  const [gearRatio, setGearRatio] = useState(3.5);
  const [finalDrive, setFinalDrive] = useState(3.7);
  const [tireSize, setTireSize] = useState(26); // inches diameter

  const calculateWheelRPM = () => {
    const wheelRPM = engineRPM / (gearRatio * finalDrive);
    return wheelRPM.toFixed(0);
  };

  const calculateSpeed = () => {
    const wheelRPM = parseFloat(calculateWheelRPM());
    const circumference = Math.PI * tireSize * 0.0254; // Convert inches to meters
    const speedMS = (wheelRPM * circumference) / 60;
    const speedKMH = speedMS * 3.6;
    return speedKMH.toFixed(1);
  };

  const getGearName = () => {
    if (gearRatio >= 4.0) return '1st Gear';
    if (gearRatio >= 2.5) return '2nd Gear';
    if (gearRatio >= 1.5) return '3rd Gear';
    if (gearRatio >= 1.0) return '4th Gear';
    if (gearRatio >= 0.7) return '5th Gear';
    return '6th Gear';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Cog className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Gear Ratio Calculator</h3>
          <p className="text-sm text-gray-400">Calculate speed from RPM and gearing</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Engine RPM */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Engine RPM: {engineRPM}
          </label>
          <input
            type="range"
            min="1000"
            max="8000"
            step="100"
            value={engineRPM}
            onChange={(e) => setEngineRPM(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Gear Ratio */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Gear Ratio: {gearRatio} - {getGearName()}
          </label>
          <input
            type="range"
            min="0.5"
            max="4.5"
            step="0.1"
            value={gearRatio}
            onChange={(e) => setGearRatio(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Final Drive */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Final Drive Ratio: {finalDrive}
          </label>
          <input
            type="range"
            min="2.5"
            max="5.0"
            step="0.1"
            value={finalDrive}
            onChange={(e) => setFinalDrive(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Tire Size */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tire Diameter (inches): {tireSize}
          </label>
          <input
            type="range"
            min="20"
            max="32"
            step="1"
            value={tireSize}
            onChange={(e) => setTireSize(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Results */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-5 h-5 text-orange-400" />
            <h4 className="font-semibold text-white">Results</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Wheel RPM</div>
              <div className="text-2xl font-bold text-orange-400">{calculateWheelRPM()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Vehicle Speed</div>
              <div className="text-2xl font-bold text-red-400">{calculateSpeed()} km/h</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Total Ratio: {(gearRatio * finalDrive).toFixed(2)}:1
          </div>
        </div>

        {/* Visual Gear Indicator */}
        <div className="flex gap-2 justify-center mt-4">
          {[4.5, 3.5, 2.0, 1.3, 0.9, 0.6].map((ratio, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                Math.abs(gearRatio - ratio) < 0.5
                  ? 'bg-orange-500 text-white scale-110'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
