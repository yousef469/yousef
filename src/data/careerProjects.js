// Career Projects Data
// Portfolio-worthy engineering projects

export const careerProjects = [
  {
    id: 'rocket-nozzle',
    title: 'Rocket Engine Nozzle Design',
    difficulty: 'Medium',
    category: 'Aerospace',
    icon: '🚀',
    color: 'from-orange-500 to-red-600',
    duration: '45-60 min',
    description: 'Design and optimize a rocket engine nozzle with real-time thrust calculations',
    usedIn: 'SpaceX Falcon 9, Blue Origin New Glenn, NASA SLS',
    learningObjectives: [
      'Understand nozzle geometry and function',
      'Learn the thrust equation',
      'Optimize expansion ratio for different altitudes',
      'Apply thermodynamics principles'
    ],
    skills: ['Thermodynamics', 'Fluid Dynamics', 'CAD', 'Optimization'],
    locked: false,
    comingSoon: false
  },
  {
    id: 'solar-panel-system',
    title: 'Solar Panel System Design',
    difficulty: 'Easy',
    category: 'Electrical',
    icon: '☀️',
    color: 'from-yellow-500 to-orange-500',
    duration: '30-45 min',
    description: 'Design a complete solar power system and calculate energy output',
    usedIn: 'Residential solar, Tesla Powerwall, Grid systems',
    learningObjectives: [
      'Understand solar panel specifications',
      'Calculate daily energy production',
      'Size battery storage systems',
      'Optimize for cost and efficiency'
    ],
    skills: ['Electrical Engineering', 'Energy Systems', 'Economics'],
    locked: false,
    comingSoon: false
  },
  {
    id: 'robotic-arm',
    title: 'Robotic Arm (3 Joints)',
    difficulty: 'Medium',
    category: 'Robotics',
    icon: '🤖',
    color: 'from-purple-500 to-pink-600',
    duration: '60-90 min',
    description: 'Build and control a 3-joint robotic arm with forward kinematics',
    usedIn: 'Industrial robots, Surgical robots, Space station arms',
    learningObjectives: [
      'Understand forward kinematics',
      'Learn joint types and constraints',
      'Calculate end-effector position',
      'Control multiple degrees of freedom'
    ],
    skills: ['Robotics', 'Kinematics', 'Control Systems', '3D Math'],
    locked: false,
    comingSoon: false
  },
  {
    id: 'car-transmission',
    title: 'Car Transmission System',
    difficulty: 'Medium',
    category: 'Automotive',
    icon: '⚙️',
    color: 'from-blue-500 to-cyan-600',
    duration: '45-60 min',
    description: 'Design a multi-gear transmission and simulate acceleration',
    usedIn: 'All vehicles, Racing cars, Heavy machinery',
    learningObjectives: [
      'Understand gear ratios',
      'Calculate torque multiplication',
      'Optimize for different driving styles',
      'Balance acceleration vs top speed'
    ],
    skills: ['Mechanical Engineering', 'Dynamics', 'Optimization'],
    locked: false,
    comingSoon: false
  },
  {
    id: 'electric-car',
    title: 'Electric Car System',
    difficulty: 'Medium',
    category: 'Automotive',
    icon: '🔋',
    color: 'from-green-500 to-emerald-600',
    duration: '45-60 min',
    description: 'Design an electric vehicle powertrain and calculate range',
    usedIn: 'Tesla, Rivian, Lucid Motors',
    learningObjectives: [
      'Understand EV components',
      'Calculate energy consumption',
      'Optimize battery vs motor',
      'Estimate range and performance'
    ],
    skills: ['Electrical Engineering', 'Automotive', 'Energy Systems'],
    locked: false,
    comingSoon: true
  },
  {
    id: 'aircraft-wing',
    title: 'Aircraft Wing Design',
    difficulty: 'Hard',
    category: 'Aviation',
    icon: '✈️',
    color: 'from-sky-500 to-blue-600',
    duration: '60-90 min',
    description: 'Design an aircraft wing and analyze lift characteristics',
    usedIn: 'Boeing 787, Airbus A350, Fighter jets',
    learningObjectives: [
      'Understand airfoil shapes',
      'Calculate lift and drag',
      'Learn about stall angles',
      'Optimize wing geometry'
    ],
    skills: ['Aerodynamics', 'Fluid Dynamics', 'Structural Analysis'],
    locked: false,
    comingSoon: true
  },
  {
    id: 'drone-quadcopter',
    title: 'Drone (Quadcopter) Design',
    difficulty: 'Medium',
    category: 'Robotics',
    icon: '🚁',
    color: 'from-indigo-500 to-purple-600',
    duration: '45-60 min',
    description: 'Build a quadcopter and calculate flight time and stability',
    usedIn: 'DJI drones, Delivery drones, Racing drones',
    learningObjectives: [
      'Understand quadcopter physics',
      'Calculate thrust requirements',
      'Balance weight and power',
      'Optimize for flight time'
    ],
    skills: ['Aerodynamics', 'Electronics', 'Control Systems'],
    locked: false,
    comingSoon: true
  },
  {
    id: 'suspension-system',
    title: 'Car Suspension System',
    difficulty: 'Medium',
    category: 'Automotive',
    icon: '🏎️',
    color: 'from-red-500 to-pink-600',
    duration: '45-60 min',
    description: 'Design a suspension system and balance comfort vs performance',
    usedIn: 'All vehicles, Racing cars, Off-road vehicles',
    learningObjectives: [
      'Understand spring-damper systems',
      'Calculate ride comfort',
      'Balance handling and comfort',
      'Simulate bump response'
    ],
    skills: ['Mechanical Engineering', 'Dynamics', 'Vibrations'],
    locked: false,
    comingSoon: true
  },
  {
    id: 'rocket-staging',
    title: 'Rocket Stage Separation',
    difficulty: 'Medium',
    category: 'Aerospace',
    icon: '🚀',
    color: 'from-orange-500 to-red-600',
    duration: '60-90 min',
    description: 'Design a multi-stage rocket and simulate flight trajectory',
    usedIn: 'Falcon 9, Saturn V, Ariane 5',
    learningObjectives: [
      'Understand staging benefits',
      'Calculate delta-v budget',
      'Optimize stage masses',
      'Simulate trajectory'
    ],
    skills: ['Aerospace', 'Orbital Mechanics', 'Optimization'],
    locked: false,
    comingSoon: true
  },
  {
    id: 'jet-engine',
    title: 'Jet Engine Design',
    difficulty: 'Advanced',
    category: 'Aerospace',
    icon: '🔥',
    color: 'from-yellow-500 to-red-600',
    duration: '90-120 min',
    description: 'Design a jet engine and analyze thermodynamic cycles',
    usedIn: 'Commercial aircraft, Fighter jets, Power generation',
    learningObjectives: [
      'Understand Brayton cycle',
      'Calculate thrust and efficiency',
      'Optimize compression ratio',
      'Analyze temperature limits'
    ],
    skills: ['Thermodynamics', 'Fluid Dynamics', 'Materials'],
    locked: false,
    comingSoon: true
  },
  {
    id: 'aircraft-stability',
    title: 'Aircraft Stability Analysis',
    difficulty: 'Hard',
    category: 'Aviation',
    icon: '🛩️',
    color: 'from-blue-500 to-indigo-600',
    duration: '60-90 min',
    description: 'Analyze aircraft stability and control characteristics',
    usedIn: 'All aircraft design, Flight simulators',
    learningObjectives: [
      'Understand center of gravity',
      'Calculate stability margins',
      'Analyze pitch/roll/yaw',
      'Design for stability'
    ],
    skills: ['Aerodynamics', 'Control Theory', 'Dynamics'],
    locked: false,
    comingSoon: true
  },
  {
    id: 'robotics-vision',
    title: 'Robotics AI Vision',
    difficulty: 'Medium',
    category: 'Robotics',
    icon: '👁️',
    color: 'from-cyan-500 to-blue-600',
    duration: '45-60 min',
    description: 'Build a computer vision system for object detection',
    usedIn: 'Autonomous vehicles, Industrial robots, Drones',
    learningObjectives: [
      'Understand computer vision basics',
      'Learn object detection',
      'Process camera images',
      'Apply AI to robotics'
    ],
    skills: ['AI/ML', 'Computer Vision', 'Robotics', 'Python'],
    locked: false,
    comingSoon: true
  }
];

// Get projects by category
export const getProjectsByCategory = (category) => {
  return careerProjects.filter(p => p.category === category);
};

// Get projects by difficulty
export const getProjectsByDifficulty = (difficulty) => {
  return careerProjects.filter(p => p.difficulty === difficulty);
};

// Get available projects (not coming soon)
export const getAvailableProjects = () => {
  return careerProjects.filter(p => !p.comingSoon);
};
