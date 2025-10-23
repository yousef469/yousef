import { useState } from 'react';
import { Wind, Calculator } from 'lucide-react';

export default function DragCalculator() {
  const [velocity, setVelocity] = useState(100);
  const [dragCoefficient, setDragCoefficient] = useState(0.3);
  const [frontalArea, setFrontalArea] = useState(2.5);
  const [altitude, setAltitude] = useState(0);

  // Air density at different altitudes (kg/m³)
  const getAirDensity = (alt) => {
    if (alt === 0) return 1.225;
    if (alt <= 5000) return 1.225 * Math.exp(-alt / 8500);
    return 1.225 * Math.exp(-alt / 8500);
  };

  // Drag Force: Fd = 0.5 × ρ × v² × Cd × A
  const calculateDrag = () => {
    const rho = getAirDensity(altitude);
    const v = velocity / 3.6; // Convert km/h to m/s
    const drag = 0.5 * rho * v * v * dragCoefficient * frontalArea;
    return drag.toFixed(2);
  };

  const calculatePower = () => {
    const drag = parseFloat(calculateDrag());
    const v = velocity / 3.6;
    const power = (drag * v) / 1000; // Convert to kW
    return power.toFixed(2);
  };

  const getVehicleType = () => {
    if (dragCoefficient < 0.25) return 'Hypercar';
    if (dragCoefficient < 0.30) return 'Sports Car';
    if (dragCoefficient < 0.35) return 'Sedan';
    if (dragCoefficient < 0.40) return 'SUV';
    return 'Truck/Van';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Wind className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Drag Force Calculator</h3>
          <p className="text-sm text-gray-400">Calculate aerodynamic drag</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Velocity */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Velocity (km/h): {velocity}
          </label>
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={velocity}
            onChange={(e) => setVelocity(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Drag Coefficient */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Drag Coefficient (Cd): {dragCoefficient} - {getVehicleType()}
          </label>
          <input
            type="range"
            min="0.15"
            max="0.50"
            step="0.01"
            value={dragCoefficient}
            onChange={(e) => setDragCoefficient(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Frontal Area */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Frontal Area (m²): {frontalArea}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={frontalArea}
            onChange={(e) => setFrontalArea(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Altitude */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Altitude (m): {altitude}
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={altitude}
            onChange={(e) => setAltitude(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-xs text-gray-400 mt-1">
            Air density: {getAirDensity(altitude).toFixed(3)} kg/m³
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-5 h-5 text-blue-400" />
            <h4 className="font-semibold text-white">Results</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Drag Force</div>
              <div className="text-2xl font-bold text-blue-400">{calculateDrag()} N</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Power Required</div>
              <div className="text-2xl font-bold text-cyan-400">{calculatePower()} kW</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Formula: Fd = ½ × ρ × v² × Cd × A
          </div>
        </div>
      </div>
    </div>
  );
}
