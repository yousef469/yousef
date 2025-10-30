import { useState } from 'react';
import { Car, Zap, Gauge, Cog, Fuel, Wind, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DragCalculator from '../components/DragCalculator';
import GearRatioCalculator from '../components/GearRatioCalculator';

export default function CarMechanicsPage() {
  const [activeTab, setActiveTab] = useState('engine');
  const navigate = useNavigate();

  const tabs = [
    { id: 'engine', label: 'Engine Systems', icon: Cog },
    { id: 'electric', label: 'Electric Vehicles', icon: Zap },
    { id: 'aerodynamics', label: 'Aerodynamics', icon: Wind },
    { id: 'performance', label: 'Performance', icon: Gauge },
  ];

  const content = {
    engine: {
      title: 'Internal Combustion Engine',
      sections: [
        {
          title: '4-Stroke Engine Cycle',
          content: `The four-stroke cycle is the foundation of most car engines:

1. Intake Stroke: Piston moves down, intake valve opens, air-fuel mixture enters
2. Compression Stroke: Both valves close, piston moves up, compressing the mixture
3. Power Stroke: Spark plug ignites mixture, explosion pushes piston down
4. Exhaust Stroke: Exhaust valve opens, piston moves up, pushing out burnt gases

This cycle repeats thousands of times per minute in your engine!`,
        },
        {
          title: 'Engine Components',
          content: `Key components that make your engine work:

• Pistons: Convert combustion pressure into mechanical motion
• Crankshaft: Converts piston motion into rotational motion
• Camshaft: Controls valve timing for optimal performance
• Valves: Control air intake and exhaust flow
• Spark Plugs: Ignite the air-fuel mixture
• Fuel Injectors: Precisely deliver fuel to cylinders

Modern engines use advanced materials and computer control for efficiency.`,
        },
        {
          title: 'Turbochargers & Superchargers',
          content: `Forced induction increases engine power:

Turbocharger:
• Uses exhaust gases to spin a turbine
• Compresses intake air for more oxygen
• Increases power without increasing engine size
• Can suffer from "turbo lag"

Supercharger:
• Belt-driven by the engine
• Provides instant boost with no lag
• Uses some engine power to operate
• Common in high-performance vehicles`,
        },
      ],
    },
    electric: {
      title: 'Electric Vehicle Technology',
      sections: [
        {
          title: 'How Electric Motors Work',
          content: `Electric vehicles use electromagnetic principles:

Basic Operation:
• Battery provides DC electricity
• Inverter converts DC to AC
• AC powers the electric motor
• Magnetic fields create rotation
• Direct drive to wheels (no transmission needed)

Advantages:
• Instant torque delivery
• 90%+ efficiency (vs 30% for gas engines)
• Fewer moving parts
• Regenerative braking recovers energy`,
        },
        {
          title: 'Battery Technology',
          content: `Lithium-ion batteries power modern EVs:

Battery Pack Components:
• Individual cells (similar to laptop batteries)
• Battery Management System (BMS)
• Thermal management system
• Safety systems and fuses

Key Specifications:
• Capacity: Measured in kWh (kilowatt-hours)
• Voltage: Typically 400V or 800V systems
• Charging: Level 1 (slow), Level 2 (medium), DC Fast (quick)
• Range: 200-400+ miles per charge

Battery degradation is typically 2-3% per year.`,
        },
        {
          title: 'Regenerative Braking',
          content: `EVs recover energy when slowing down:

How It Works:
1. Driver releases accelerator or brakes
2. Motor becomes a generator
3. Kinetic energy converts to electricity
4. Battery stores recovered energy
5. Can recover 60-70% of braking energy

Benefits:
• Extended range (10-25% improvement)
• Reduced brake wear
• Smoother driving experience
• One-pedal driving capability`,
        },
      ],
    },
    aerodynamics: {
      title: 'Automotive Aerodynamics',
      sections: [
        {
          title: 'Drag Coefficient (Cd)',
          content: `Aerodynamic efficiency is crucial for performance and efficiency:

Drag Force Formula: Fd = ½ × ρ × v² × Cd × A

Where:
• ρ (rho) = air density
• v = velocity
• Cd = drag coefficient
• A = frontal area

Typical Cd Values:
• Modern sedan: 0.25-0.30
• SUV: 0.30-0.35
• Sports car: 0.28-0.32
• Hypercar: 0.25-0.28

Lower Cd = better fuel economy and higher top speed.`,
        },
        {
          title: 'Downforce & Spoilers',
          content: `Managing airflow for better grip:

Downforce Generation:
• Front splitter: Reduces air under car
• Rear wing/spoiler: Creates downward pressure
• Diffuser: Accelerates air under car
• Side skirts: Manages airflow along sides

Trade-offs:
• More downforce = better cornering
• More downforce = higher drag
• Active aero adjusts for conditions
• F1 cars generate 3-5x their weight in downforce!`,
        },
        {
          title: 'Cooling & Airflow',
          content: `Managing heat is critical for performance:

Cooling Systems:
• Radiator: Cools engine coolant
• Intercooler: Cools compressed air (turbos)
• Brake cooling ducts: Prevents brake fade
• Oil coolers: Maintains oil temperature

Airflow Management:
• Grille shutters: Close at speed for efficiency
• Hood vents: Extract hot air from engine bay
• Wheel well vents: Reduce turbulence
• Underbody panels: Smooth airflow underneath`,
        },
      ],
    },
    performance: {
      title: 'Performance & Tuning',
      sections: [
        {
          title: 'Power & Torque',
          content: `Understanding engine output:

Horsepower (HP):
• Measures rate of work
• HP = (Torque × RPM) / 5,252
• Determines top speed
• Peak HP usually at high RPM

Torque (lb-ft or Nm):
• Measures rotational force
• Determines acceleration
• Peak torque at lower RPM
• More important for daily driving

Power Band:
• Range where engine produces good power
• Wider band = more flexible engine
• Turbo engines have flatter torque curves`,
        },
        {
          title: 'Transmission Types',
          content: `Getting power to the wheels:

Manual Transmission:
• Driver controls gear selection
• Most engaging driving experience
• Typically more efficient
• Becoming rare in new cars

Automatic Transmission:
• Torque converter or dual-clutch
• Smooth, convenient operation
• Modern autos are very efficient
• Can shift faster than humans

CVT (Continuously Variable):
• No fixed gears, infinite ratios
• Optimal efficiency
• Can feel unusual to drive
• Common in hybrid vehicles`,
        },
        {
          title: 'Suspension & Handling',
          content: `How cars corner and ride:

Suspension Components:
• Springs: Support weight, absorb bumps
• Dampers (shocks): Control spring motion
• Anti-roll bars: Reduce body roll
• Control arms: Guide wheel movement

Handling Characteristics:
• Understeer: Front loses grip first (safer)
• Oversteer: Rear loses grip first (fun but tricky)
• Neutral: Balanced grip front and rear

Adjustments:
• Stiffer springs = less body roll, harsher ride
• Adjustable dampers = tune for comfort or sport
• Lower ride height = lower center of gravity
• Wider tires = more grip but more drag`,
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Car className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">Car Mechanics & Engineering</h1>
                <p className="text-sm text-gray-400">Learn how cars work from engine to wheels</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/games/map/cars')}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-semibold transition-all"
            >
              Lesson Map
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700 bg-gray-900/30 sticky top-[73px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{content[activeTab].title}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>

          {content[activeTab].sections.map((section, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{section.title}</h3>
              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}

          {/* Fun Facts */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Fuel className="w-5 h-5 text-blue-400" />
              Did You Know?
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• A typical car engine has over 200 moving parts</li>
              <li>• Electric motors are 3x more efficient than gas engines</li>
              <li>• Formula 1 engines can rev to 15,000+ RPM</li>
              <li>• The Bugatti Chiron has 1,500 horsepower from a W16 engine</li>
              <li>• Modern cars have more computing power than the Apollo 11 spacecraft</li>
            </ul>
          </div>

          {/* Interactive Calculators */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Gauge className="w-8 h-8 text-blue-400" />
              Interactive Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <DragCalculator />
              <GearRatioCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
