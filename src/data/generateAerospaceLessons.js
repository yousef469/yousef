// Aerospace (Airplane) Engineering Lesson Generator - 83 Lessons in 10 Units
// Comprehensive aerospace engineering curriculum from beginner to master

const aerospaceLessonTemplates = {
  units: [
    {
      name: "Introduction to Flight",
      emoji: "✈️",
      level: "Beginner",
      lessons: [
        "What Makes an Airplane Fly",
        "Four Forces of Flight",
        "Lift and Airfoils",
        "Drag and Streamlining",
        "Aircraft Types (Propeller, Jet, Glider)",
        "Basic Flight Instruments",
        "Control Surfaces (Ailerons, Rudder, Elevator)"
      ]
    },
    {
      name: "Aerodynamics Basics",
      emoji: "💨",
      level: "Beginner",
      lessons: [
        "Bernoulli's Principle and Pressure",
        "Angle of Attack and Stall",
        "Boundary Layers",
        "Reynolds Number",
        "Drag Types (Parasite, Induced, Wave)",
        "Lift Coefficient and Performance Curves",
        "Wind Tunnels and Testing",
        "Real Flight Data Analysis"
      ]
    },
    {
      name: "Aircraft Structures",
      emoji: "🏗️",
      level: "Intermediate",
      lessons: [
        "Fuselage and Wings",
        "Spars, Ribs, and Stringers",
        "Materials: Aluminum, Composites",
        "Stress and Strain in Wings",
        "Riveting and Fastening",
        "Fatigue and Failure",
        "Crashworthiness and Safety Design"
      ]
    },
    {
      name: "Propulsion Systems",
      emoji: "🚀",
      level: "Intermediate",
      lessons: [
        "Basics of Aircraft Propulsion",
        "Piston Engines",
        "Jet Engines Overview",
        "Turbofan vs Turbojet",
        "Propeller Design",
        "Combustion and Fuel Efficiency",
        "Afterburners and Supersonic Flight",
        "Electric and Hybrid Propulsion"
      ]
    },
    {
      name: "Flight Mechanics",
      emoji: "🛫",
      level: "Intermediate",
      lessons: [
        "Stability and Control",
        "Longitudinal, Lateral, Directional Stability",
        "Trim and Control Surfaces",
        "Performance: Climb, Cruise, Glide",
        "Range and Endurance",
        "Turning and Maneuvering Flight",
        "Flight Envelope and Limits",
        "Flight Testing Procedures"
      ]
    },
    {
      name: "Avionics & Flight Control Systems",
      emoji: "📡",
      level: "Advanced",
      lessons: [
        "What Are Avionics",
        "Flight Management Systems",
        "Sensors and Data Handling",
        "Autopilot Systems",
        "Instrumentation and HUDs",
        "Navigation (GPS, INS, ILS)",
        "Fly-by-Wire Systems",
        "Fault Detection and Safety"
      ]
    },
    {
      name: "Aircraft Design & Simulation",
      emoji: "🎨",
      level: "Advanced",
      lessons: [
        "Design Process Overview",
        "Mission Requirements",
        "Sizing and Weight Estimation",
        "Aerodynamic Optimization",
        "Performance Simulations",
        "Stability and Control Testing",
        "CFD and Wind Tunnel Modeling",
        "Concept Review and Optimization"
      ]
    },
    {
      name: "Flight Operations & Systems",
      emoji: "⚙️",
      level: "Advanced",
      lessons: [
        "Hydraulic Systems",
        "Pneumatic Systems",
        "Electrical Systems",
        "Environmental Control",
        "Landing Gear Operation",
        "Fuel Systems",
        "Maintenance and Ground Handling",
        "Emergency Systems"
      ]
    },
    {
      name: "Aerodynamics of High-Speed Flight",
      emoji: "⚡",
      level: "Master",
      lessons: [
        "Transonic and Supersonic Regions",
        "Shock Waves and Drag Rise",
        "Area Rule",
        "Thermal Loads and Materials",
        "Hypersonic Vehicle Design",
        "Real Projects (Concorde, SR-71, X-59)"
      ]
    },
    {
      name: "Future of Aerospace",
      emoji: "🌟",
      level: "Master",
      lessons: [
        "Sustainable Aviation (Biofuels, Electric)",
        "Urban Air Mobility and Drones",
        "AI in Flight Systems",
        "Composite Manufacturing",
        "Reusable Launch Aircraft",
        "Spaceplanes and Orbit-Flight Transition",
        "Future Career Paths in Aerospace"
      ]
    }
  ]
};

export function generateAerospaceLesson(id, unitIndex, lessonIndex) {
  const unit = aerospaceLessonTemplates.units[unitIndex];
  const lessonTitle = unit.lessons[lessonIndex];
  
  return {
    id,
    title: lessonTitle,
    unitNumber: unitIndex + 1,
    lessonNumber: lessonIndex + 1,
    duration: "15-25 min",
    emoji: unit.emoji,
    level: unit.level,
    introduction: `This lesson covers ${lessonTitle} in aerospace engineering. You'll learn essential concepts for understanding and designing aircraft systems.`,
    sections: [
      {
        title: `Understanding ${lessonTitle}`,
        content: `${lessonTitle} is a fundamental concept in ${unit.name}. This knowledge is essential for aerospace engineers.\n\nKey aspects:\n• Core principles and theory\n• Mathematical foundations\n• Practical applications in aviation\n• Real-world examples from aircraft`
      },
      {
        title: "Technical Deep Dive",
        content: `The technical foundation of ${lessonTitle} includes:\n\n• Fundamental equations and physics\n• Engineering principles and laws\n• Design methodologies\n• Analysis techniques\n\nThese concepts guide aircraft design, flight operations, and aerospace innovation.`
      },
      {
        title: "Real-World Applications",
        content: `${lessonTitle} is applied in:\n\n• Modern aircraft (Boeing 787, Airbus A350, F-35)\n• Flight operations and safety\n• Aircraft design and optimization\n• Aerospace innovation\n\nExamples from actual aircraft demonstrate these principles in action.`
      },
      {
        title: "Problem Solving & Analysis",
        content: `Engineers analyze ${lessonTitle} using:\n\n• Mathematical modeling and calculations\n• Computer simulations (CFD, FEA)\n• Wind tunnel testing\n• Flight test data analysis\n\nEach method provides critical insights for successful aircraft design and operation.`
      }
    ],
    keyTakeaways: [
      `${lessonTitle} is fundamental to aerospace engineering`,
      "Understanding theory enables practical aircraft design",
      "Multiple analysis methods validate aircraft systems",
      "Applications span from general aviation to supersonic flight"
    ],
    vocabulary: [
      { term: lessonTitle.split(' ')[0], definition: `Key concept in ${unit.name}` },
      { term: "Lift", definition: "Upward force that opposes weight and enables flight" },
      { term: "Drag", definition: "Resistance force opposing aircraft motion through air" }
    ]
  };
}

export function generateAllAerospaceLessons() {
  const lessons = {};
  let lessonId = 0;
  
  aerospaceLessonTemplates.units.forEach((unit, unitIdx) => {
    unit.lessons.forEach((lesson, lessonIdx) => {
      lessons[lessonId] = generateAerospaceLesson(lessonId, unitIdx, lessonIdx);
      lessonId++;
    });
  });
  
  return lessons;
}

export default generateAllAerospaceLessons;
