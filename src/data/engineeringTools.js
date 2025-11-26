// Engineering Toolbox - Professional Tools
// Premium subscription value proposition

export const engineeringTools = {
  aerospace: {
    name: 'Aerospace Tools',
    icon: '🚀',
    color: 'from-orange-500 to-red-600',
    tools: [
      {
        id: 'orbital-trajectory',
        name: 'Orbital Trajectory Visualizer',
        description: 'Visualize and calculate orbital paths, transfers, and maneuvers',
        difficulty: 'Advanced',
        premium: true,
        features: ['3D orbit visualization', 'Hohmann transfers', 'Bi-elliptic transfers', 'Gravity assists']
      },
      {
        id: 'rocket-equation',
        name: 'Rocket Equation Calculator',
        description: 'Calculate delta-v using the Tsiolkovsky rocket equation',
        difficulty: 'Easy',
        premium: false,
        features: ['Delta-v calculations', 'Mass ratio', 'Specific impulse', 'Multi-stage support']
      },
      {
        id: 'rocket-nozzle-calc',
        name: 'Rocket Nozzle Calculator',
        description: 'Design and optimize rocket engine nozzles for maximum efficiency',
        difficulty: 'Medium',
        premium: false,
        features: ['Thrust calculations', 'Expansion ratio optimization', 'ISP calculations', 'Temperature analysis']
      },
      {
        id: 'lift-equation',
        name: 'Lift Equation Calculator',
        description: 'Calculate aerodynamic lift force for aircraft',
        difficulty: 'Easy',
        premium: false,
        features: ['Lift force', 'Coefficient of lift', 'Wing area', 'Velocity effects']
      },
      {
        id: 'drag-equation',
        name: 'Drag Equation Calculator',
        description: 'Calculate aerodynamic drag force',
        difficulty: 'Easy',
        premium: false,
        features: ['Drag force', 'Drag coefficient', 'Frontal area', 'Speed analysis']
      },
      {
        id: 'delta-v-budget',
        name: 'Delta-V Budget Estimator',
        description: 'Calculate total delta-v requirements for mission planning',
        difficulty: 'Medium',
        premium: true,
        features: ['Multi-stage rockets', 'Mission planning', 'Fuel optimization', 'Payload calculations']
      },
      {
        id: 'reentry-simulator',
        name: 'Re-entry Simulation Estimator',
        description: 'Estimate heat loads and deceleration during atmospheric re-entry',
        difficulty: 'Advanced',
        premium: true,
        features: ['Heat shield sizing', 'Deceleration profiles', 'Trajectory optimization', 'G-force analysis']
      }
    ]
  },
  automotive: {
    name: 'Automotive Tools',
    icon: '🚗',
    color: 'from-blue-500 to-cyan-600',
    tools: [
      {
        id: 'cfd-drag',
        name: 'CFD Drag Calculator',
        description: 'Calculate aerodynamic drag and optimize vehicle shapes',
        difficulty: 'Advanced',
        premium: true,
        features: ['Drag coefficient estimation', 'Frontal area analysis', 'Speed vs drag curves', 'Fuel economy impact']
      },
      {
        id: 'tire-grip',
        name: 'Tire Grip & Slip Angle Simulator',
        description: 'Analyze tire performance and handling characteristics',
        difficulty: 'Medium',
        premium: true,
        features: ['Slip angle curves', 'Grip limits', 'Temperature effects', 'Tire compound comparison']
      },
      {
        id: 'suspension-tuning',
        name: 'Suspension Tuning Tool',
        description: 'Optimize suspension for comfort, handling, or racing',
        difficulty: 'Medium',
        premium: false,
        features: ['Spring rate calculator', 'Damper tuning', 'Roll center analysis', 'Ride height optimization']
      },
      {
        id: 'brake-distance',
        name: 'Brake Distance Calculator',
        description: 'Calculate stopping distance and deceleration',
        difficulty: 'Easy',
        premium: false,
        features: ['Stopping distance', 'Deceleration rate', 'Friction coefficient', 'Reaction time']
      },
      {
        id: 'gear-ratio',
        name: 'Gear Ratio Calculator',
        description: 'Calculate gear ratios and mechanical advantage',
        difficulty: 'Easy',
        premium: false,
        features: ['Gear ratios', 'Speed calculations', 'Torque multiplication', 'RPM conversion']
      }
    ]
  },
  robotics: {
    name: 'Robotics Tools',
    icon: '🤖',
    color: 'from-purple-500 to-pink-600',
    tools: [
      {
        id: 'robot-path-planning',
        name: 'Robot Path Planning',
        description: 'Plan optimal paths for robots avoiding obstacles',
        difficulty: 'Advanced',
        premium: true,
        features: ['A* pathfinding', 'Obstacle avoidance', '3D visualization', 'Multi-robot coordination']
      },
      {
        id: 'pid-tuning',
        name: 'PID Tuning Tool',
        description: 'Tune PID controllers for optimal system response',
        difficulty: 'Medium',
        premium: true,
        features: ['Real-time response graphs', 'Ziegler-Nichols method', 'Step response analysis', 'Stability testing']
      },
      {
        id: 'kinematics-visualizer',
        name: 'Kinematics Visualizer',
        description: 'Visualize forward and inverse kinematics for robot arms',
        difficulty: 'Medium',
        premium: false,
        features: ['Forward kinematics', 'Inverse kinematics', 'Workspace analysis', 'Joint limit checking']
      }
    ]
  },
  electronics: {
    name: 'Electronics Tools',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-600',
    tools: [
      {
        id: 'ohms-law',
        name: "Ohm's Law Calculator",
        description: 'Calculate voltage, current, and resistance',
        difficulty: 'Easy',
        premium: false,
        features: ['Voltage calculations', 'Current calculations', 'Resistance calculations', 'Power calculations']
      }
    ]
  },
  mechanical: {
    name: 'Mechanical Tools',
    icon: '⚙️',
    color: 'from-gray-500 to-slate-600',
    tools: [
      {
        id: 'motor-torque',
        name: 'Motor Torque Calculator',
        description: 'Calculate motor torque and power',
        difficulty: 'Easy',
        premium: false,
        features: ['Torque calculations', 'Power output', 'RPM analysis', 'Efficiency']
      },
      {
        id: 'stress-strain',
        name: 'Stress/Strain Calculator',
        description: 'Calculate stress, strain, and factor of safety for components',
        difficulty: 'Medium',
        premium: true,
        features: ['Tensile stress', 'Shear stress', 'Bending stress', 'Factor of safety', 'Failure analysis']
      },
      {
        id: 'material-selection',
        name: 'Material Selection AI',
        description: 'AI-powered material selection based on requirements',
        difficulty: 'Advanced',
        premium: true,
        features: ['AI recommendations', 'Cost analysis', 'Property comparison', 'Environmental factors']
      },
      {
        id: 'beam-deflection',
        name: 'Beam Deflection Calculator',
        description: 'Calculate beam deflection under various loading conditions',
        difficulty: 'Easy',
        premium: false,
        features: ['Simply supported', 'Cantilever', 'Fixed-fixed', 'Distributed loads', 'Point loads']
      }
    ]
  },
  physics: {
    name: 'Physics Tools',
    icon: '🔬',
    color: 'from-indigo-500 to-purple-600',
    tools: [
      {
        id: 'projectile-motion',
        name: 'Projectile Motion Calculator',
        description: 'Calculate trajectory, range, and flight time',
        difficulty: 'Easy',
        premium: false,
        features: ['Trajectory calculation', 'Range', 'Flight time', 'Maximum height']
      },
      {
        id: 'heat-transfer',
        name: 'Heat Transfer Calculator',
        description: 'Calculate conduction, convection, and radiation',
        difficulty: 'Medium',
        premium: true,
        features: ['Conduction', 'Convection', 'Radiation', 'Thermal resistance']
      }
    ]
  },
  energy: {
    name: 'Energy Tools',
    icon: '🔋',
    color: 'from-green-500 to-emerald-600',
    tools: [
      {
        id: 'solar-estimator',
        name: 'Solar Panel Estimator',
        description: 'Estimate solar panel system size and energy production',
        difficulty: 'Easy',
        premium: false,
        features: ['Energy production', 'Cost analysis', 'ROI calculator', 'Battery sizing']
      },
      {
        id: 'battery-range',
        name: 'Battery Range Simulator',
        description: 'Calculate EV range based on battery and driving conditions',
        difficulty: 'Medium',
        premium: true,
        features: ['Range estimation', 'Charging time', 'Temperature effects', 'Driving style impact']
      }
    ]
  }
};

// Get all tools
export const getAllTools = () => {
  const allTools = [];
  Object.keys(engineeringTools).forEach(category => {
    engineeringTools[category].tools.forEach(tool => {
      allTools.push({
        ...tool,
        category: category,
        categoryName: engineeringTools[category].name,
        categoryIcon: engineeringTools[category].icon,
        categoryColor: engineeringTools[category].color
      });
    });
  });
  return allTools;
};

// Get free tools
export const getFreeTools = () => {
  return getAllTools().filter(tool => !tool.premium);
};

// Get premium tools
export const getPremiumTools = () => {
  return getAllTools().filter(tool => tool.premium);
};

// Get tools by category
export const getToolsByCategory = (category) => {
  return engineeringTools[category]?.tools || [];
};
