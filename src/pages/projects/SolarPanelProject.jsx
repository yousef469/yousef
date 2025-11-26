import { useState, useEffect } from 'react';
import ProjectTemplate from '../../components/projects/ProjectTemplate';
import { careerProjects } from '../../data/careerProjects';
import { Sun, Battery, Zap, Home } from 'lucide-react';

export default function SolarPanelProject() {
  const project = careerProjects.find(p => p.id === 'solar-panel-system');
  
  const [numPanels, setNumPanels] = useState(10);
  const [panelWattage, setPanelWattage] = useState(300); // watts per panel
  const [sunlightHours, setSunlightHours] = useState(5);
  const [batteryCapacity, setBatteryCapacity] = useState(10); // kWh
  
  const [dailyEnergy, setDailyEnergy] = useState(0);
  const [monthlyEnergy, setMonthlyEnergy] = useState(0);
  const [devicesSupported, setDevicesSupported] = useState([]);
  const [costSavings, setCostSavings] = useState(0);

  const devices = [
    { name: 'LED Lights (10W)', power: 10, hours: 5 },
    { name: 'Laptop (50W)', power: 50, hours: 8 },
    { name: 'Refrigerator (150W)', power: 150, hours: 24 },
    { name: 'TV (100W)', power: 100, hours: 4 },
    { name: 'AC Unit (1500W)', power: 1500, hours: 8 },
    { name: 'Water Heater (3000W)', power: 3000, hours: 2 }
  ];

  useEffect(() => {
    const totalWattage = numPanels * panelWattage;
    const daily = (totalWattage * sunlightHours) / 1000; // kWh
    const monthly = daily * 30;
    
    setDailyEnergy(daily);
    setMonthlyEnergy(monthly);
    
    // Calculate which devices can be powered
    const supported = devices.filter(device => {
      const deviceDailyEnergy = (device.power * device.hours) / 1000;
      return deviceDailyEnergy <= daily;
    });
    setDevicesSupported(supported);
    
    // Cost savings (assuming $0.12 per kWh)
    setCostSavings(monthly * 0.12);
  }, [numPanels, panelWattage, sunlightHours, batteryCapacity]);

  const handleGenerateReport = () => {
    alert(`Solar Panel System Report\n\nSystem: ${numPanels}x ${panelWattage}W panels\nDaily Energy: ${dailyEnergy.toFixed(1)} kWh\nMonthly Savings: $${costSavings.toFixed(2)}`);
  };

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Number of Panels: {numPanels}
        </label>
        <input
          type="range"
          min="1"
          max="30"
          value={numPanels}
          onChange={(e) => setNumPanels(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Panel Wattage: {panelWattage}W
        </label>
        <select
          value={panelWattage}
          onChange={(e) => setPanelWattage(Number(e.target.value))}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
        >
          <option value="250">250W (Standard)</option>
          <option value="300">300W (Common)</option>
          <option value="350">350W (High Efficiency)</option>
          <option value="400">400W (Premium)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Sunlight Hours: {sunlightHours}h/day
        </label>
        <input
          type="range"
          min="2"
          max="10"
          step="0.5"
          value={sunlightHours}
          onChange={(e) => setSunlightHours(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Battery Storage: {batteryCapacity} kWh
        </label>
        <input
          type="range"
          min="5"
          max="50"
          step="5"
          value={batteryCapacity}
          onChange={(e) => setBatteryCapacity(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  );

  const simulation = (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 rounded-lg p-4 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-300">Daily Energy</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {dailyEnergy.toFixed(1)} kWh
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-300">Monthly Savings</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            ${costSavings.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Home className="w-4 h-4" />
          Devices You Can Power
        </h3>
        <div className="space-y-2">
          {devices.map((device, idx) => {
            const canPower = devicesSupported.includes(device);
            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-2 rounded ${
                  canPower ? 'bg-green-900/20 text-green-300' : 'bg-gray-800 text-gray-500'
                }`}
              >
                <span className="text-sm">{device.name}</span>
                <span className="text-xs">{canPower ? '✓' : '✗'}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-semibold mb-3">Energy Production</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total System Power:</span>
            <span className="text-white font-semibold">{(numPanels * panelWattage / 1000).toFixed(1)} kW</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Monthly Production:</span>
            <span className="text-white font-semibold">{monthlyEnergy.toFixed(0)} kWh</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Battery Backup:</span>
            <span className="text-white font-semibold">{(batteryCapacity / dailyEnergy).toFixed(1)} days</span>
          </div>
        </div>
      </div>
    </div>
  );

  const insights = (
    <div className="space-y-3">
      <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-300">
        Your system produces {dailyEnergy.toFixed(1)} kWh per day, enough to power {devicesSupported.length} of {devices.length} common household devices.
      </div>
      {monthlyEnergy > 900 && (
        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-300">
          Excellent! Your system produces enough energy for a typical household (900 kWh/month average).
        </div>
      )}
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
