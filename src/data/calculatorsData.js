// Comprehensive Engineering Calculators - 25+ Calculators

export const calculators = [
  // MECHANICS
  {
    id: 'stress',
    name: 'Stress Calculator',
    category: 'Mechanics',
    icon: '🔧',
    color: 'from-blue-500 to-cyan-500',
    inputs: [
      { id: 'force', label: 'Force (N)', default: 1000 },
      { id: 'area', label: 'Area (m²)', default: 0.01 }
    ],
    calculate: (inputs) => {
      const stress = inputs.force / inputs.area;
      return [
        { label: 'Stress (σ)', value: stress.toFixed(2), unit: 'Pa' },
        { label: 'Stress', value: (stress / 1e6).toFixed(4), unit: 'MPa' }
      ];
    },
    formula: 'σ = F / A'
  },
  {
    id: 'force',
    name: 'Force Calculator (F=ma)',
    category: 'Mechanics',
    icon: '💪',
    color: 'from-orange-500 to-red-500',
    inputs: [
      { id: 'mass', label: 'Mass (kg)', default: 10 },
      { id: 'acceleration', label: 'Acceleration (m/s²)', default: 9.81 }
    ],
    calculate: (inputs) => {
      const force = inputs.mass * inputs.acceleration;
      return [
        { label: 'Force', value: force.toFixed(2), unit: 'N' },
        { label: 'Force', value: (force / 1000).toFixed(4), unit: 'kN' }
      ];
    },
    formula: 'F = m × a'
  },
  {
    id: 'kinetic-energy',
    name: 'Kinetic Energy',
    category: 'Mechanics',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500',
    inputs: [
      { id: 'mass', label: 'Mass (kg)', default: 1000 },
      { id: 'velocity', label: 'Velocity (m/s)', default: 20 }
    ],
    calculate: (inputs) => {
      const ke = 0.5 * inputs.mass * inputs.velocity * inputs.velocity;
      return [
        { label: 'Kinetic Energy', value: ke.toFixed(2), unit: 'J' },
        { label: 'Kinetic Energy', value: (ke / 1000).toFixed(4), unit: 'kJ' }
      ];
    },
    formula: 'KE = ½mv²'
  },
  {
    id: 'momentum',
    name: 'Momentum Calculator',
    category: 'Mechanics',
    icon: '🎯',
    color: 'from-purple-500 to-pink-500',
    inputs: [
      { id: 'mass', label: 'Mass (kg)', default: 5 },
      { id: 'velocity', label: 'Velocity (m/s)', default: 10 }
    ],
    calculate: (inputs) => {
      const momentum = inputs.mass * inputs.velocity;
      return [
        { label: 'Momentum', value: momentum.toFixed(2), unit: 'kg·m/s' },
        { label: 'Impulse needed to stop', value: momentum.toFixed(2), unit: 'N·s' }
      ];
    },
    formula: 'p = mv'
  },
  {
    id: 'torque',
    name: 'Torque Calculator',
    category: 'Mechanics',
    icon: '🔄',
    color: 'from-indigo-500 to-purple-500',
    inputs: [
      { id: 'force', label: 'Force (N)', default: 100 },
      { id: 'radius', label: 'Lever Arm (m)', default: 0.5 },
      { id: 'angle', label: 'Angle (degrees)', default: 90 }
    ],
    calculate: (inputs) => {
      const angleRad = inputs.angle * Math.PI / 180;
      const torque = inputs.force * inputs.radius * Math.sin(angleRad);
      return [
        { label: 'Torque', value: torque.toFixed(2), unit: 'N·m' },
        { label: 'Torque', value: (torque * 0.7376).toFixed(2), unit: 'lb·ft' }
      ];
    },
    formula: 'τ = rF sin(θ)'
  },
  {
    id: 'spring',
    name: 'Spring Force (Hooke\'s Law)',
    category: 'Mechanics',
    icon: '🔩',
    color: 'from-green-500 to-teal-500',
    inputs: [
      { id: 'k', label: 'Spring Constant (N/m)', default: 500 },
      { id: 'x', label: 'Displacement (m)', default: 0.1 }
    ],
    calculate: (inputs) => {
      const force = inputs.k * inputs.x;
      const energy = 0.5 * inputs.k * inputs.x * inputs.x;
      return [
        { label: 'Spring Force', value: force.toFixed(2), unit: 'N' },
        { label: 'Potential Energy', value: energy.toFixed(4), unit: 'J' }
      ];
    },
    formula: 'F = kx'
  },
  // AUTOMOTIVE
  {
    id: 'gear-ratio',
    name: 'Gear Ratio Calculator',
    category: 'Automotive',
    icon: '⚙️',
    color: 'from-green-500 to-emerald-500',
    inputs: [
      { id: 'drivingTeeth', label: 'Driving Gear Teeth', default: 20 },
      { id: 'drivenTeeth', label: 'Driven Gear Teeth', default: 40 },
      { id: 'inputRPM', label: 'Input RPM', default: 1000 },
      { id: 'inputTorque', label: 'Input Torque (Nm)', default: 10 }
    ],
    calculate: (inputs) => {
      const ratio = inputs.drivenTeeth / inputs.drivingTeeth;
      const outputRPM = inputs.inputRPM / ratio;
      const outputTorque = inputs.inputTorque * ratio;
      return [
        { label: 'Gear Ratio', value: ratio.toFixed(2), unit: ':1' },
        { label: 'Output RPM', value: outputRPM.toFixed(1), unit: 'RPM' },
        { label: 'Output Torque', value: outputTorque.toFixed(2), unit: 'Nm' }
      ];
    },
    formula: 'GR = N₂/N₁'
  },
  {
    id: 'brake-distance',
    name: 'Braking Distance',
    category: 'Automotive',
    icon: '🚗',
    color: 'from-red-500 to-rose-500',
    inputs: [
      { id: 'velocity', label: 'Initial Speed (km/h)', default: 100 },
      { id: 'friction', label: 'Friction Coefficient', default: 0.7 },
      { id: 'reaction', label: 'Reaction Time (s)', default: 1.5 }
    ],
    calculate: (inputs) => {
      const vMs = inputs.velocity / 3.6;
      const reactionDist = vMs * inputs.reaction;
      const brakeDist = (vMs * vMs) / (2 * inputs.friction * 9.81);
      const totalDist = reactionDist + brakeDist;
      return [
        { label: 'Reaction Distance', value: reactionDist.toFixed(1), unit: 'm' },
        { label: 'Braking Distance', value: brakeDist.toFixed(1), unit: 'm' },
        { label: 'Total Stopping Distance', value: totalDist.toFixed(1), unit: 'm' }
      ];
    },
    formula: 'd = v²/(2μg)'
  },
  {
    id: 'engine-power',
    name: 'Engine Power Calculator',
    category: 'Automotive',
    icon: '🏎️',
    color: 'from-yellow-500 to-amber-500',
    inputs: [
      { id: 'torque', label: 'Torque (Nm)', default: 300 },
      { id: 'rpm', label: 'RPM', default: 5000 }
    ],
    calculate: (inputs) => {
      const powerW = (inputs.torque * inputs.rpm * 2 * Math.PI) / 60;
      const powerHP = powerW / 745.7;
      const powerKW = powerW / 1000;
      return [
        { label: 'Power', value: powerW.toFixed(0), unit: 'W' },
        { label: 'Power', value: powerKW.toFixed(2), unit: 'kW' },
        { label: 'Power', value: powerHP.toFixed(1), unit: 'HP' }
      ];
    },
    formula: 'P = (T × RPM × 2π) / 60'
  },
  {
    id: 'tire-speed',
    name: 'Tire Speed Calculator',
    category: 'Automotive',
    icon: '🛞',
    color: 'from-gray-500 to-slate-600',
    inputs: [
      { id: 'diameter', label: 'Tire Diameter (inches)', default: 26 },
      { id: 'rpm', label: 'Wheel RPM', default: 1000 }
    ],
    calculate: (inputs) => {
      const circumference = inputs.diameter * 0.0254 * Math.PI;
      const speedMs = circumference * inputs.rpm / 60;
      const speedKmh = speedMs * 3.6;
      const speedMph = speedMs * 2.237;
      return [
        { label: 'Speed', value: speedMs.toFixed(2), unit: 'm/s' },
        { label: 'Speed', value: speedKmh.toFixed(1), unit: 'km/h' },
        { label: 'Speed', value: speedMph.toFixed(1), unit: 'mph' }
      ];
    },
    formula: 'v = π × d × RPM / 60'
  },

  // AEROSPACE
  {
    id: 'delta-v',
    name: 'Rocket Delta-V',
    category: 'Aerospace',
    icon: '🚀',
    color: 'from-orange-500 to-amber-500',
    inputs: [
      { id: 'isp', label: 'Specific Impulse (s)', default: 300 },
      { id: 'wetMass', label: 'Wet Mass (kg)', default: 10000 },
      { id: 'dryMass', label: 'Dry Mass (kg)', default: 3000 }
    ],
    calculate: (inputs) => {
      const g0 = 9.81;
      const massRatio = inputs.wetMass / inputs.dryMass;
      const deltaV = inputs.isp * g0 * Math.log(massRatio);
      return [
        { label: 'Delta-V', value: deltaV.toFixed(1), unit: 'm/s' },
        { label: 'Delta-V', value: (deltaV / 1000).toFixed(3), unit: 'km/s' },
        { label: 'Mass Ratio', value: massRatio.toFixed(2), unit: '' },
        { label: 'Propellant Mass', value: (inputs.wetMass - inputs.dryMass).toFixed(0), unit: 'kg' }
      ];
    },
    formula: 'Δv = Isp × g₀ × ln(m₀/mf)'
  },
  {
    id: 'lift',
    name: 'Lift Force Calculator',
    category: 'Aerospace',
    icon: '✈️',
    color: 'from-cyan-500 to-blue-500',
    inputs: [
      { id: 'density', label: 'Air Density (kg/m³)', default: 1.225 },
      { id: 'velocity', label: 'Velocity (m/s)', default: 50 },
      { id: 'area', label: 'Wing Area (m²)', default: 20 },
      { id: 'cl', label: 'Lift Coefficient', default: 1.2 }
    ],
    calculate: (inputs) => {
      const lift = 0.5 * inputs.density * inputs.velocity * inputs.velocity * inputs.area * inputs.cl;
      return [
        { label: 'Lift Force', value: lift.toFixed(1), unit: 'N' },
        { label: 'Lift Force', value: (lift / 1000).toFixed(3), unit: 'kN' },
        { label: 'Equivalent Mass', value: (lift / 9.81).toFixed(1), unit: 'kg' }
      ];
    },
    formula: 'L = ½ρv²SC_L'
  },
  {
    id: 'drag',
    name: 'Drag Force Calculator',
    category: 'Aerospace',
    icon: '💨',
    color: 'from-blue-400 to-indigo-500',
    inputs: [
      { id: 'density', label: 'Air Density (kg/m³)', default: 1.225 },
      { id: 'velocity', label: 'Velocity (m/s)', default: 50 },
      { id: 'area', label: 'Reference Area (m²)', default: 5 },
      { id: 'cd', label: 'Drag Coefficient', default: 0.3 }
    ],
    calculate: (inputs) => {
      const drag = 0.5 * inputs.density * inputs.velocity * inputs.velocity * inputs.area * inputs.cd;
      const power = drag * inputs.velocity;
      return [
        { label: 'Drag Force', value: drag.toFixed(1), unit: 'N' },
        { label: 'Power to overcome', value: (power / 1000).toFixed(2), unit: 'kW' }
      ];
    },
    formula: 'D = ½ρv²SC_D'
  },
  {
    id: 'orbital-velocity',
    name: 'Orbital Velocity',
    category: 'Aerospace',
    icon: '🛰️',
    color: 'from-purple-500 to-indigo-500',
    inputs: [
      { id: 'altitude', label: 'Altitude (km)', default: 400 },
      { id: 'bodyMass', label: 'Central Body Mass (×10²⁴ kg)', default: 5.972 }
    ],
    calculate: (inputs) => {
      const G = 6.674e-11;
      const M = inputs.bodyMass * 1e24;
      const r = (inputs.altitude * 1000) + 6371000;
      const v = Math.sqrt(G * M / r);
      const period = 2 * Math.PI * r / v;
      return [
        { label: 'Orbital Velocity', value: v.toFixed(1), unit: 'm/s' },
        { label: 'Orbital Velocity', value: (v / 1000).toFixed(3), unit: 'km/s' },
        { label: 'Orbital Period', value: (period / 60).toFixed(1), unit: 'min' }
      ];
    },
    formula: 'v = √(GM/r)'
  },
  {
    id: 'thrust',
    name: 'Rocket Thrust',
    category: 'Aerospace',
    icon: '🔥',
    color: 'from-red-500 to-orange-500',
    inputs: [
      { id: 'massFlow', label: 'Mass Flow Rate (kg/s)', default: 100 },
      { id: 'exhaustVel', label: 'Exhaust Velocity (m/s)', default: 3000 }
    ],
    calculate: (inputs) => {
      const thrust = inputs.massFlow * inputs.exhaustVel;
      const isp = inputs.exhaustVel / 9.81;
      return [
        { label: 'Thrust', value: thrust.toFixed(0), unit: 'N' },
        { label: 'Thrust', value: (thrust / 1000).toFixed(2), unit: 'kN' },
        { label: 'Specific Impulse', value: isp.toFixed(1), unit: 's' }
      ];
    },
    formula: 'F = ṁ × Ve'
  },
  // ELECTRICAL
  {
    id: 'ohms-law',
    name: "Ohm's Law Calculator",
    category: 'Electrical',
    icon: '🔌',
    color: 'from-purple-500 to-pink-500',
    inputs: [
      { id: 'voltage', label: 'Voltage (V)', default: 12 },
      { id: 'resistance', label: 'Resistance (Ω)', default: 100 }
    ],
    calculate: (inputs) => {
      const current = inputs.voltage / inputs.resistance;
      const power = inputs.voltage * current;
      return [
        { label: 'Current', value: (current * 1000).toFixed(2), unit: 'mA' },
        { label: 'Current', value: current.toFixed(4), unit: 'A' },
        { label: 'Power', value: power.toFixed(3), unit: 'W' }
      ];
    },
    formula: 'V = I × R'
  },
  {
    id: 'capacitor',
    name: 'Capacitor Calculator',
    category: 'Electrical',
    icon: '🔋',
    color: 'from-teal-500 to-cyan-500',
    inputs: [
      { id: 'capacitance', label: 'Capacitance (μF)', default: 100 },
      { id: 'voltage', label: 'Voltage (V)', default: 12 }
    ],
    calculate: (inputs) => {
      const C = inputs.capacitance * 1e-6;
      const energy = 0.5 * C * inputs.voltage * inputs.voltage;
      const charge = C * inputs.voltage;
      return [
        { label: 'Stored Energy', value: (energy * 1000).toFixed(4), unit: 'mJ' },
        { label: 'Stored Charge', value: (charge * 1e6).toFixed(2), unit: 'μC' }
      ];
    },
    formula: 'E = ½CV²'
  },
  {
    id: 'rc-time',
    name: 'RC Time Constant',
    category: 'Electrical',
    icon: '⏱️',
    color: 'from-amber-500 to-yellow-500',
    inputs: [
      { id: 'resistance', label: 'Resistance (kΩ)', default: 10 },
      { id: 'capacitance', label: 'Capacitance (μF)', default: 100 }
    ],
    calculate: (inputs) => {
      const R = inputs.resistance * 1000;
      const C = inputs.capacitance * 1e-6;
      const tau = R * C;
      const freq = 1 / (2 * Math.PI * tau);
      return [
        { label: 'Time Constant (τ)', value: (tau * 1000).toFixed(2), unit: 'ms' },
        { label: 'Cutoff Frequency', value: freq.toFixed(2), unit: 'Hz' },
        { label: '5τ (99% charge)', value: (tau * 5 * 1000).toFixed(1), unit: 'ms' }
      ];
    },
    formula: 'τ = RC'
  },
  {
    id: 'voltage-divider',
    name: 'Voltage Divider',
    category: 'Electrical',
    icon: '➗',
    color: 'from-green-500 to-emerald-500',
    inputs: [
      { id: 'vin', label: 'Input Voltage (V)', default: 12 },
      { id: 'r1', label: 'R1 (kΩ)', default: 10 },
      { id: 'r2', label: 'R2 (kΩ)', default: 10 }
    ],
    calculate: (inputs) => {
      const vout = inputs.vin * inputs.r2 / (inputs.r1 + inputs.r2);
      const current = inputs.vin / ((inputs.r1 + inputs.r2) * 1000);
      return [
        { label: 'Output Voltage', value: vout.toFixed(3), unit: 'V' },
        { label: 'Current', value: (current * 1000).toFixed(3), unit: 'mA' },
        { label: 'Ratio', value: (inputs.r2 / (inputs.r1 + inputs.r2)).toFixed(4), unit: '' }
      ];
    },
    formula: 'Vout = Vin × R2/(R1+R2)'
  },
  {
    id: 'led-resistor',
    name: 'LED Resistor Calculator',
    category: 'Electrical',
    icon: '💡',
    color: 'from-red-400 to-pink-500',
    inputs: [
      { id: 'supply', label: 'Supply Voltage (V)', default: 5 },
      { id: 'forward', label: 'LED Forward Voltage (V)', default: 2 },
      { id: 'current', label: 'LED Current (mA)', default: 20 }
    ],
    calculate: (inputs) => {
      const resistance = (inputs.supply - inputs.forward) / (inputs.current / 1000);
      const power = (inputs.supply - inputs.forward) * (inputs.current / 1000);
      return [
        { label: 'Resistor Value', value: resistance.toFixed(0), unit: 'Ω' },
        { label: 'Power Dissipation', value: (power * 1000).toFixed(1), unit: 'mW' },
        { label: 'Nearest Standard', value: Math.round(resistance / 10) * 10, unit: 'Ω' }
      ];
    },
    formula: 'R = (Vs - Vf) / I'
  },

  // THERMODYNAMICS
  {
    id: 'ideal-gas',
    name: 'Ideal Gas Law',
    category: 'Thermodynamics',
    icon: '🌡️',
    color: 'from-red-500 to-orange-500',
    inputs: [
      { id: 'pressure', label: 'Pressure (kPa)', default: 101.325 },
      { id: 'volume', label: 'Volume (L)', default: 22.4 },
      { id: 'temperature', label: 'Temperature (°C)', default: 25 }
    ],
    calculate: (inputs) => {
      const R = 8.314;
      const P = inputs.pressure * 1000;
      const V = inputs.volume / 1000;
      const T = inputs.temperature + 273.15;
      const n = (P * V) / (R * T);
      return [
        { label: 'Moles of Gas', value: n.toFixed(4), unit: 'mol' },
        { label: 'Mass (if air)', value: (n * 28.97).toFixed(2), unit: 'g' },
        { label: 'Density', value: ((n * 28.97) / inputs.volume).toFixed(4), unit: 'g/L' }
      ];
    },
    formula: 'PV = nRT'
  },
  {
    id: 'heat-transfer',
    name: 'Heat Transfer',
    category: 'Thermodynamics',
    icon: '🔥',
    color: 'from-orange-500 to-red-500',
    inputs: [
      { id: 'mass', label: 'Mass (kg)', default: 1 },
      { id: 'specificHeat', label: 'Specific Heat (J/kg·K)', default: 4186 },
      { id: 'deltaT', label: 'Temperature Change (°C)', default: 50 }
    ],
    calculate: (inputs) => {
      const Q = inputs.mass * inputs.specificHeat * inputs.deltaT;
      return [
        { label: 'Heat Required', value: Q.toFixed(0), unit: 'J' },
        { label: 'Heat Required', value: (Q / 1000).toFixed(3), unit: 'kJ' },
        { label: 'Heat Required', value: (Q / 4184).toFixed(3), unit: 'kcal' }
      ];
    },
    formula: 'Q = mcΔT'
  },
  {
    id: 'carnot',
    name: 'Carnot Efficiency',
    category: 'Thermodynamics',
    icon: '♨️',
    color: 'from-yellow-500 to-red-500',
    inputs: [
      { id: 'hotTemp', label: 'Hot Temperature (°C)', default: 500 },
      { id: 'coldTemp', label: 'Cold Temperature (°C)', default: 25 }
    ],
    calculate: (inputs) => {
      const Th = inputs.hotTemp + 273.15;
      const Tc = inputs.coldTemp + 273.15;
      const efficiency = 1 - (Tc / Th);
      return [
        { label: 'Carnot Efficiency', value: (efficiency * 100).toFixed(2), unit: '%' },
        { label: 'Heat Rejected Ratio', value: ((1 - efficiency) * 100).toFixed(2), unit: '%' }
      ];
    },
    formula: 'η = 1 - Tc/Th'
  },
  // FLUIDS
  {
    id: 'bernoulli',
    name: 'Bernoulli Pressure',
    category: 'Fluids',
    icon: '💧',
    color: 'from-blue-400 to-cyan-500',
    inputs: [
      { id: 'density', label: 'Fluid Density (kg/m³)', default: 1000 },
      { id: 'v1', label: 'Velocity 1 (m/s)', default: 2 },
      { id: 'v2', label: 'Velocity 2 (m/s)', default: 5 },
      { id: 'p1', label: 'Pressure 1 (kPa)', default: 200 }
    ],
    calculate: (inputs) => {
      const p2 = inputs.p1 * 1000 + 0.5 * inputs.density * (inputs.v1 * inputs.v1 - inputs.v2 * inputs.v2);
      return [
        { label: 'Pressure 2', value: (p2 / 1000).toFixed(2), unit: 'kPa' },
        { label: 'Pressure Change', value: ((p2 / 1000) - inputs.p1).toFixed(2), unit: 'kPa' }
      ];
    },
    formula: 'P₁ + ½ρv₁² = P₂ + ½ρv₂²'
  },
  {
    id: 'flow-rate',
    name: 'Flow Rate Calculator',
    category: 'Fluids',
    icon: '🚿',
    color: 'from-cyan-500 to-blue-500',
    inputs: [
      { id: 'diameter', label: 'Pipe Diameter (mm)', default: 50 },
      { id: 'velocity', label: 'Flow Velocity (m/s)', default: 2 }
    ],
    calculate: (inputs) => {
      const area = Math.PI * Math.pow(inputs.diameter / 2000, 2);
      const flowRate = area * inputs.velocity;
      return [
        { label: 'Flow Rate', value: (flowRate * 1000).toFixed(3), unit: 'L/s' },
        { label: 'Flow Rate', value: (flowRate * 3600).toFixed(1), unit: 'm³/h' },
        { label: 'Cross-sectional Area', value: (area * 10000).toFixed(4), unit: 'cm²' }
      ];
    },
    formula: 'Q = A × v'
  },
  {
    id: 'reynolds',
    name: 'Reynolds Number',
    category: 'Fluids',
    icon: '🌊',
    color: 'from-indigo-500 to-purple-500',
    inputs: [
      { id: 'density', label: 'Density (kg/m³)', default: 1000 },
      { id: 'velocity', label: 'Velocity (m/s)', default: 1 },
      { id: 'diameter', label: 'Diameter (mm)', default: 50 },
      { id: 'viscosity', label: 'Dynamic Viscosity (Pa·s)', default: 0.001 }
    ],
    calculate: (inputs) => {
      const Re = (inputs.density * inputs.velocity * (inputs.diameter / 1000)) / inputs.viscosity;
      let flowType = Re < 2300 ? 'Laminar' : Re > 4000 ? 'Turbulent' : 'Transitional';
      return [
        { label: 'Reynolds Number', value: Re.toFixed(0), unit: '' },
        { label: 'Flow Regime', value: flowType, unit: '' }
      ];
    },
    formula: 'Re = ρvD/μ'
  },
  // MATERIALS
  {
    id: 'beam-deflection',
    name: 'Beam Deflection',
    category: 'Materials',
    icon: '📏',
    color: 'from-gray-500 to-slate-600',
    inputs: [
      { id: 'force', label: 'Force (N)', default: 1000 },
      { id: 'length', label: 'Length (m)', default: 2 },
      { id: 'E', label: "Young's Modulus (GPa)", default: 200 },
      { id: 'I', label: 'Moment of Inertia (cm⁴)', default: 100 }
    ],
    calculate: (inputs) => {
      const E = inputs.E * 1e9;
      const I = inputs.I * 1e-8;
      const deflection = (inputs.force * Math.pow(inputs.length, 3)) / (3 * E * I);
      return [
        { label: 'Max Deflection', value: (deflection * 1000).toFixed(3), unit: 'mm' },
        { label: 'Deflection Ratio', value: (inputs.length / deflection).toFixed(0), unit: 'L/' }
      ];
    },
    formula: 'δ = FL³/(3EI)'
  },
  {
    id: 'thermal-expansion',
    name: 'Thermal Expansion',
    category: 'Materials',
    icon: '📐',
    color: 'from-orange-400 to-red-500',
    inputs: [
      { id: 'length', label: 'Original Length (m)', default: 1 },
      { id: 'alpha', label: 'Expansion Coeff (×10⁻⁶/°C)', default: 12 },
      { id: 'deltaT', label: 'Temperature Change (°C)', default: 100 }
    ],
    calculate: (inputs) => {
      const alpha = inputs.alpha * 1e-6;
      const deltaL = alpha * inputs.length * inputs.deltaT;
      return [
        { label: 'Length Change', value: (deltaL * 1000).toFixed(4), unit: 'mm' },
        { label: 'New Length', value: (inputs.length + deltaL).toFixed(6), unit: 'm' },
        { label: 'Strain', value: (deltaL / inputs.length * 100).toFixed(4), unit: '%' }
      ];
    },
    formula: 'ΔL = αL₀ΔT'
  },
  {
    id: 'factor-safety',
    name: 'Factor of Safety',
    category: 'Materials',
    icon: '🛡️',
    color: 'from-green-500 to-teal-500',
    inputs: [
      { id: 'yieldStrength', label: 'Yield Strength (MPa)', default: 250 },
      { id: 'appliedStress', label: 'Applied Stress (MPa)', default: 100 }
    ],
    calculate: (inputs) => {
      const fos = inputs.yieldStrength / inputs.appliedStress;
      let status = fos >= 2 ? 'Safe' : fos >= 1.5 ? 'Marginal' : 'Unsafe';
      return [
        { label: 'Factor of Safety', value: fos.toFixed(2), unit: '' },
        { label: 'Status', value: status, unit: '' },
        { label: 'Margin', value: ((fos - 1) * 100).toFixed(1), unit: '%' }
      ];
    },
    formula: 'FoS = σᵧ/σ'
  }
];

export default calculators;
