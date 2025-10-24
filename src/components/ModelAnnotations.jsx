import { useState } from 'react';
import { Info, X, Sparkles } from 'lucide-react';

export default function ModelAnnotations({ modelType, onHotspotClick }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Define hotspots for each model type
  const hotspots = {
    rocket: [
      {
        id: 1,
        position: { x: '50%', y: '15%' },
        title: 'Nose Cone',
        description: 'Aerodynamic fairing that protects the payload during ascent. Made of composite materials to withstand extreme temperatures.',
        details: 'The nose cone uses an ablative heat shield that chars and erodes during reentry, dissipating heat away from the spacecraft.',
        specs: ['Material: Carbon composite', 'Max temp: 1,650°C', 'Weight: ~500 kg']
      },
      {
        id: 2,
        position: { x: '50%', y: '30%' },
        title: 'Second Stage',
        description: 'Contains the Merlin Vacuum engine optimized for space. Carries the payload to final orbit.',
        details: 'The second stage uses a single Merlin engine with a larger nozzle optimized for the vacuum of space, providing higher efficiency.',
        specs: ['Fuel: RP-1 + LOX', 'Burn time: ~6 minutes', 'Thrust: 934 kN']
      },
      {
        id: 3,
        position: { x: '50%', y: '45%' },
        title: 'Interstage',
        description: 'Structural connection between stages. Contains pneumatic pushers for stage separation.',
        details: 'The interstage uses a composite structure with separation mechanisms that push the stages apart using compressed helium.',
        specs: ['Material: Aluminum-lithium', 'Separation speed: 2 m/s', 'Weight: ~1,000 kg']
      },
      {
        id: 4,
        position: { x: '50%', y: '60%' },
        title: 'First Stage',
        description: 'Main booster with 9 Merlin engines. Provides most of the thrust during launch and is reusable.',
        details: 'The first stage returns to Earth and lands vertically using grid fins for steering and engine thrust for final descent.',
        specs: ['Engines: 9x Merlin 1D', 'Total thrust: 7,607 kN', 'Reusable: Yes']
      },
      {
        id: 5,
        position: { x: '30%', y: '55%' },
        title: 'Grid Fins',
        description: 'Titanium lattice fins that provide aerodynamic control during descent.',
        details: 'Grid fins work at supersonic speeds by creating a lattice of vortices. Made from titanium to withstand reentry heat.',
        specs: ['Material: Titanium', 'Control range: ±15°', 'Max temp: 1,200°C']
      },
      {
        id: 6,
        position: { x: '50%', y: '85%' },
        title: 'Landing Legs',
        description: 'Four carbon fiber legs that deploy for landing. Can support the full weight of the booster.',
        details: 'The legs use a pneumatic deployment system and crush cores to absorb landing impact energy.',
        specs: ['Material: Carbon fiber', 'Deployment time: 2 seconds', 'Load capacity: 25 tons']
      },
      {
        id: 7,
        position: { x: '50%', y: '95%' },
        title: 'Merlin Engines',
        description: '9 Merlin 1D engines in octaweb configuration. Use RP-1 kerosene and liquid oxygen.',
        details: 'Each engine can gimbal (tilt) for steering. The center engine is used for landing burns.',
        specs: ['Thrust per engine: 845 kN', 'Gimbal range: ±5°', 'Restart capable: Yes']
      }
    ],
    plane: [
      {
        id: 1,
        position: { x: '70%', y: '40%' },
        title: 'Nose Cone',
        description: 'Houses radar and avionics systems. Aerodynamically shaped for minimal drag.',
        details: 'Contains advanced radar systems for target tracking and terrain mapping.',
        specs: ['Radar range: 200+ km', 'Material: Composite', 'Weight: ~150 kg']
      },
      {
        id: 2,
        position: { x: '50%', y: '50%' },
        title: 'Wings',
        description: 'Generate lift using airfoil shape. Contain fuel tanks and control surfaces.',
        details: 'The wing uses a supercritical airfoil design to delay shock wave formation at high speeds.',
        specs: ['Wingspan: 13.1 m', 'Area: 27.9 m²', 'Fuel capacity: 3,200 L']
      },
      {
        id: 3,
        position: { x: '40%', y: '55%' },
        title: 'Jet Engines',
        description: 'Twin turbofan engines provide thrust. Use bypass air for efficiency.',
        details: 'Modern turbofans compress air, mix with fuel, ignite, and expel hot gases for thrust.',
        specs: ['Thrust: 2x 80 kN', 'Bypass ratio: 0.87:1', 'Max speed: Mach 2.0']
      },
      {
        id: 4,
        position: { x: '20%', y: '45%' },
        title: 'Tail Stabilizers',
        description: 'Vertical and horizontal stabilizers control pitch and yaw.',
        details: 'The tail surfaces use hydraulic actuators to move control surfaces for precise maneuvering.',
        specs: ['Material: Aluminum alloy', 'Control authority: ±30°', 'Response time: 0.1s']
      }
    ],
    car: [
      {
        id: 1,
        position: { x: '70%', y: '55%' },
        title: 'Engine',
        description: 'High-performance engine with turbocharging. Converts fuel to mechanical power.',
        details: 'Modern engines use direct injection and variable valve timing for optimal performance and efficiency.',
        specs: ['Power: 450 HP', 'Torque: 530 Nm', 'Redline: 7,500 RPM']
      },
      {
        id: 2,
        position: { x: '50%', y: '75%' },
        title: 'Wheels & Tires',
        description: 'High-performance tires provide grip. Wheels are lightweight alloy.',
        details: 'Performance tires use soft rubber compounds and wide contact patches for maximum grip.',
        specs: ['Size: 20 inch', 'Material: Forged aluminum', 'Grip: 1.2g lateral']
      },
      {
        id: 3,
        position: { x: '30%', y: '40%' },
        title: 'Aerodynamics',
        description: 'Spoilers and diffusers create downforce for better handling.',
        details: 'Active aerodynamics adjust wing angles based on speed to balance downforce and drag.',
        specs: ['Downforce: 200 kg @ 200 km/h', 'Drag coefficient: 0.29', 'Active: Yes']
      },
      {
        id: 4,
        position: { x: '50%', y: '60%' },
        title: 'Transmission',
        description: 'Dual-clutch automatic transmission for fast gear changes.',
        details: 'DCT uses two clutches - one for odd gears, one for even - allowing seamless shifts in milliseconds.',
        specs: ['Gears: 7-speed DCT', 'Shift time: 100ms', 'Type: Dual-clutch']
      }
    ]
  };

  const currentHotspots = hotspots[modelType] || [];

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
    if (onHotspotClick) {
      onHotspotClick(hotspot);
    }
  };

  return (
    <>
      {/* Hotspot Markers */}
      {currentHotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          onClick={() => handleHotspotClick(hotspot)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: hotspot.position.x, top: hotspot.position.y }}
        >
          {/* Pulsing Ring */}
          <div className="absolute inset-0 w-8 h-8 bg-cyan-400 rounded-full opacity-30 animate-ping" />
          
          {/* Main Dot */}
          <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
            <Info className="w-4 h-4 text-white" />
          </div>

          {/* Hover Label */}
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap border border-cyan-400 shadow-lg">
              {hotspot.title}
            </div>
          </div>
        </button>
      ))}

      {/* Detail Panel */}
      {selectedHotspot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-cyan-400 rounded-2xl max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedHotspot.title}</h3>
                  <p className="text-sm text-gray-400">Component Details</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                  Overview
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedHotspot.description}
                </p>
              </div>

              {/* Technical Details */}
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                  How It Works
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedHotspot.details}
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">
                  Key Specifications
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedHotspot.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="text-gray-300">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedHotspot(null)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-white transition-all"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
