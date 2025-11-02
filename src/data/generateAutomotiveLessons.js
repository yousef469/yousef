// Automotive Engineering Lesson Generator
// Generates 211 lessons for automotive engineering journey

const automotiveLessonTemplates = {
  beginner: {
    units: [
      {
        name: "Intro to Mechanics",
        emoji: "⚙️",
        topics: ["Basic Mechanics", "Forces & Motion", "Simple Machines", "Mechanical Advantage", "Energy & Work", "Power Transmission"]
      },
      {
        name: "Vehicle Systems",
        emoji: "🚗",
        topics: ["Vehicle Components", "Chassis & Frame", "Suspension Basics", "Steering Systems", "Braking Fundamentals", "Wheels & Tires"]
      },
      {
        name: "Basic Physics",
        emoji: "⚛️",
        topics: ["Newton's Laws", "Friction", "Momentum", "Energy Conservation", "Rotational Motion", "Collisions"]
      },
      {
        name: "Simple Circuits",
        emoji: "🔌",
        topics: ["Electricity Basics", "Voltage & Current", "Resistance", "Series & Parallel", "Automotive Batteries", "Basic Wiring"]
      },
      {
        name: "Materials & Tools",
        emoji: "🔧",
        topics: ["Metals & Alloys", "Plastics & Composites", "Hand Tools", "Power Tools", "Measurement Tools", "Safety Equipment"]
      },
      {
        name: "Vehicle Maintenance",
        emoji: "🛠️",
        topics: ["Oil Changes", "Tire Rotation", "Brake Inspection", "Fluid Checks", "Filter Replacement", "Basic Diagnostics"]
      }
    ]
  },
  intermediate: {
    units: [
      {
        name: "Thermodynamics",
        emoji: "🔥",
        topics: ["Heat & Temperature", "Laws of Thermodynamics", "Heat Transfer", "Thermal Efficiency", "Cooling Systems", "HVAC Systems", "Engine Cooling"]
      },
      {
        name: "Internal Combustion Engines",
        emoji: "🏎️",
        topics: ["Engine Cycles", "4-Stroke vs 2-Stroke", "Fuel Injection", "Ignition Systems", "Turbocharging", "Engine Performance", "Emissions Control"]
      },
      {
        name: "Vehicle Dynamics",
        emoji: "🏁",
        topics: ["Acceleration & Braking", "Cornering Forces", "Weight Transfer", "Traction Control", "Stability Systems", "Handling Characteristics", "Performance Tuning"]
      },
      {
        name: "Fluid Mechanics",
        emoji: "🌊",
        topics: ["Fluid Properties", "Flow Dynamics", "Hydraulic Systems", "Pneumatic Systems", "Lubrication", "Fuel Systems", "Transmission Fluids"]
      },
      {
        name: "Design Principles",
        emoji: "📐",
        topics: ["Design Process", "Requirements Analysis", "Concept Development", "Prototyping", "Testing & Validation", "Manufacturing Considerations", "Cost Analysis"]
      },
      {
        name: "CAD for Automotive",
        emoji: "💻",
        topics: ["CAD Basics", "3D Modeling", "Assembly Design", "Tolerance Analysis", "Simulation Tools", "Manufacturing Drawings", "Digital Prototyping"]
      }
    ]
  },
  advanced: {
    units: [
      {
        name: "Hybrid & Electric Vehicles",
        emoji: "⚡",
        topics: ["EV Architecture", "Battery Technology", "Electric Motors", "Power Electronics", "Charging Systems", "Regenerative Braking", "Range Optimization", "Thermal Management"]
      },
      {
        name: "Powertrain Systems",
        emoji: "⚙️",
        topics: ["Transmission Types", "Clutch Systems", "Differential", "Driveshafts", "CVT Technology", "DCT Systems", "Hybrid Powertrains", "All-Wheel Drive"]
      },
      {
        name: "Vehicle Structures",
        emoji: "🏗️",
        topics: ["Body-on-Frame", "Unibody Construction", "Crash Safety", "Structural Analysis", "Material Selection", "Weight Reduction", "Composite Structures", "Rollover Protection"]
      },
      {
        name: "Suspension & Braking",
        emoji: "🛞",
        topics: ["Suspension Types", "Spring & Damper Design", "Anti-Roll Bars", "Brake Systems", "ABS Technology", "Electronic Stability", "Active Suspension", "Performance Braking"]
      },
      {
        name: "Control Systems",
        emoji: "🎮",
        topics: ["ECU Basics", "Sensor Technology", "Actuators", "Control Algorithms", "Drive-by-Wire", "Adaptive Systems", "Diagnostics", "CAN Bus"]
      },
      {
        name: "Automotive Aerodynamics",
        emoji: "💨",
        topics: ["Drag Reduction", "Downforce", "Cooling Airflow", "Wind Tunnel Testing", "CFD Analysis", "Underbody Aero", "Active Aero", "Noise Reduction"]
      }
    ]
  },
  expert: {
    units: [
      {
        name: "Autonomous Driving",
        emoji: "🤖",
        topics: ["Sensor Fusion", "Computer Vision", "LIDAR & RADAR", "Path Planning", "Decision Making", "V2X Communication", "Safety Systems", "Testing & Validation"]
      },
      {
        name: "FEA for Automotive",
        emoji: "📊",
        topics: ["Structural FEA", "Crash Simulation", "Fatigue Analysis", "Vibration Analysis", "Thermal FEA", "Optimization", "Validation Methods", "Advanced Meshing"]
      },
      {
        name: "Advanced Manufacturing",
        emoji: "🏭",
        topics: ["Stamping & Forming", "Welding Technologies", "Casting Processes", "Machining", "Assembly Automation", "Quality Control", "Lean Manufacturing", "Industry 4.0"]
      },
      {
        name: "Diagnostics & Safety",
        emoji: "✅",
        topics: ["OBD Systems", "Fault Diagnosis", "Safety Standards", "Crash Testing", "Occupant Protection", "ADAS Systems", "Cybersecurity", "Functional Safety"]
      },
      {
        name: "Performance Tuning",
        emoji: "🏎️",
        topics: ["Engine Tuning", "ECU Remapping", "Forced Induction", "Exhaust Systems", "Suspension Tuning", "Brake Upgrades", "Weight Reduction", "Track Setup"]
      }
    ]
  },
  master: {
    units: [
      {
        name: "Smart Mobility",
        emoji: "🌐",
        topics: ["Connected Vehicles", "Mobility Services", "Fleet Management", "Smart Cities", "Traffic Optimization", "Shared Mobility", "MaaS Platforms", "Urban Planning", "Future Trends"]
      },
      {
        name: "Sustainable Design",
        emoji: "🌱",
        topics: ["Life Cycle Assessment", "Circular Economy", "Recyclable Materials", "Carbon Footprint", "Sustainable Manufacturing", "Green Supply Chain", "End-of-Life", "Regulations", "Future Materials"]
      },
      {
        name: "AI in Automotive",
        emoji: "🧠",
        topics: ["Machine Learning", "Neural Networks", "Predictive Maintenance", "Driver Behavior", "Design Optimization", "Manufacturing AI", "Quality Prediction", "Customer Analytics", "AI Ethics"]
      },
      {
        name: "Simulation-Based Design",
        emoji: "💻",
        topics: ["Virtual Prototyping", "Multi-Physics Simulation", "Real-Time Simulation", "Hardware-in-Loop", "Digital Twins", "Co-Simulation", "Optimization Algorithms", "Validation", "Industry Applications"]
      },
      {
        name: "Future Technologies",
        emoji: "🚀",
        topics: ["Hydrogen Fuel Cells", "Advanced Batteries", "Wireless Charging", "Flying Cars", "Hyperloop", "Nano Materials", "Quantum Computing", "Bio-Inspired Design", "Space Mobility"]
      }
    ]
  }
};

export function generateAutomotiveLesson(id, level, unitIndex, lessonIndex, unitData) {
  const topic = unitData.topics[lessonIndex];
  
  return {
    id,
    title: topic,
    unitNumber: unitIndex + (level === 'beginner' ? 1 : level === 'intermediate' ? 7 : level === 'advanced' ? 13 : level === 'expert' ? 19 : 24),
    lessonNumber: lessonIndex + 1,
    duration: "15-20 min",
    emoji: unitData.emoji,
    introduction: `This lesson covers ${topic} in ${unitData.name}. You'll learn essential concepts for automotive engineering.`,
    sections: [
      {
        title: `Understanding ${topic}`,
        content: `${topic} is a crucial concept in ${unitData.name}. This knowledge is fundamental for automotive engineers.\n\nKey aspects:\n• Core principles and theory\n• Mathematical foundations\n• Practical applications in vehicles\n• Industry best practices`
      },
      {
        title: "Technical Details",
        content: `The technical foundation of ${topic} includes:\n\n• Fundamental equations and formulas\n• Physical laws and principles\n• Engineering models and simulations\n• Design considerations\n\nThese concepts guide automotive design and analysis.`
      },
      {
        title: "Real-World Applications",
        content: `${topic} is applied in:\n\n• Modern vehicle design\n• Performance optimization\n• Safety systems\n• Manufacturing processes\n\nExamples from production vehicles demonstrate practical implementation.`
      },
      {
        title: "Hands-On Analysis",
        content: `Engineers analyze ${topic} using:\n\n• Analytical calculations\n• Computer simulations\n• Physical testing\n• Data analysis\n\nEach method provides unique insights for vehicle development.`
      }
    ],
    keyTakeaways: [
      `${topic} is essential in ${unitData.name}`,
      "Theory enables practical automotive applications",
      "Multiple analysis methods complement each other",
      "Applications span design, testing, and production"
    ],
    vocabulary: [
      { term: topic, definition: `Key concept in ${unitData.name} for automotive engineering` },
      { term: "Vehicle Dynamics", definition: "Study of forces and motion in vehicles" },
      { term: "Powertrain", definition: "System that generates and delivers power to the wheels" }
    ]
  };
}

export function generateAllAutomotiveLessons() {
  const lessons = {};
  let lessonId = 0;
  
  // Beginner (0-35): 6 units × 6 lessons = 36 lessons
  automotiveLessonTemplates.beginner.units.forEach((unit, unitIdx) => {
    for (let i = 0; i < 6; i++) {
      lessons[lessonId] = generateAutomotiveLesson(lessonId, 'beginner', unitIdx, i, unit);
      lessonId++;
    }
  });
  
  // Intermediate (36-77): 6 units × 7 lessons = 42 lessons
  automotiveLessonTemplates.intermediate.units.forEach((unit, unitIdx) => {
    for (let i = 0; i < 7; i++) {
      lessons[lessonId] = generateAutomotiveLesson(lessonId, 'intermediate', unitIdx, i, unit);
      lessonId++;
    }
  });
  
  // Advanced (78-125): 6 units × 8 lessons = 48 lessons
  automotiveLessonTemplates.advanced.units.forEach((unit, unitIdx) => {
    for (let i = 0; i < 8; i++) {
      lessons[lessonId] = generateAutomotiveLesson(lessonId, 'advanced', unitIdx, i, unit);
      lessonId++;
    }
  });
  
  // Expert (126-165): 5 units × 8 lessons = 40 lessons
  automotiveLessonTemplates.expert.units.forEach((unit, unitIdx) => {
    for (let i = 0; i < 8; i++) {
      lessons[lessonId] = generateAutomotiveLesson(lessonId, 'expert', unitIdx, i, unit);
      lessonId++;
    }
  });
  
  // Master (166-210): 5 units × 9 lessons = 45 lessons
  automotiveLessonTemplates.master.units.forEach((unit, unitIdx) => {
    for (let i = 0; i < 9; i++) {
      lessons[lessonId] = generateAutomotiveLesson(lessonId, 'master', unitIdx, i, unit);
      lessonId++;
    }
  });
  
  return lessons;
}

export default generateAllAutomotiveLessons;
