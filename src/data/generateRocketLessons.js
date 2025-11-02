// Rocket Engineering Lesson Generator - 74 Lessons in 10 Units
// Comprehensive rocket science and engineering curriculum

const rocketLessonTemplates = {
  units: [
    {
      name: "Introduction to Rockets",
      emoji: "🚀",
      level: "Beginner",
      lessons: [
        "What Makes a Rocket Different from an Airplane",
        "How Rockets Generate Thrust",
        "Types of Rockets (Solid, Liquid, Hybrid)",
        "Rocket Staging and Why It's Needed",
        "The History of Spaceflight (Short and Meaningful)",
        "Inside a Modern Rocket (Falcon 9, Ariane, Saturn V Overview)"
      ]
    },
    {
      name: "Rocket Physics & Forces",
      emoji: "🔥",
      level: "Beginner",
      lessons: [
        "Newton's Laws and Rocket Motion",
        "Thrust, Mass, and the Rocket Equation",
        "Delta-V and Specific Impulse",
        "Gravity and Escape Velocity",
        "Air Resistance and Drag in Ascent",
        "Center of Mass and Stability",
        "Flight Phases: Launch, Stage, Orbit, Reentry",
        "Real Rocket Data Analysis (Simple Falcon 9 Example)"
      ]
    },
    {
      name: "Rocket Propulsion Systems",
      emoji: "⚙️",
      level: "Intermediate",
      lessons: [
        "Overview of Rocket Engines",
        "Solid Propellant Engines",
        "Liquid Propellant Engines",
        "Bipropellant and Cryogenic Systems",
        "Turbopumps and Feed Systems",
        "Combustion Chambers and Nozzles",
        "Expansion Ratio and Thrust Optimization",
        "Cooling and Material Challenges",
        "Electric and Ion Propulsion",
        "Future Propulsion: Nuclear, Air-breathing, etc."
      ]
    },
    {
      name: "Rocket Structures & Materials",
      emoji: "🧱",
      level: "Intermediate",
      lessons: [
        "Rocket Body and Structural Loads",
        "Materials: Aluminum, Titanium, Composites",
        "Tank Design and Pressure Management",
        "Aerodynamics and Fairings",
        "Thermal Protection (Reentry Shields)",
        "Vibration and Fatigue Testing"
      ]
    },
    {
      name: "Guidance, Navigation & Control",
      emoji: "🧭",
      level: "Intermediate",
      lessons: [
        "Introduction to GNC Systems",
        "Sensors: Gyros, Accelerometers, GPS",
        "Control Surfaces: Fins, Thrust Vectoring",
        "PID Controllers Simplified",
        "Inertial Navigation Systems",
        "Launch Trajectory Optimization",
        "Orbital Insertion Control",
        "Reentry and Landing Control (Falcon 9 Case)"
      ]
    },
    {
      name: "Orbital Mechanics",
      emoji: "🌌",
      level: "Advanced",
      lessons: [
        "What is an Orbit",
        "Circular, Elliptical, and Escape Orbits",
        "Orbital Parameters (Apogee, Perigee, Inclination)",
        "Kepler's Laws",
        "Launch Windows and Inclination Matching",
        "Hohmann Transfers and Plane Changes",
        "Gravity Assist (Slingshot)",
        "Reentry Trajectories",
        "Orbital Decay and Drag",
        "Interplanetary Travel (Simple Models)"
      ]
    },
    {
      name: "Rocket Design & Simulation",
      emoji: "🧮",
      level: "Advanced",
      lessons: [
        "Rocket Design Workflow Overview",
        "Choosing Propellant and Engine Type",
        "Mass Budget and Structural Ratios",
        "Delta-V Budget for Mission Goals",
        "Using Simulation Tools (RocketPy / OpenRocket)",
        "Stability Testing and Adjustments",
        "Stage Separation & Recovery Planning",
        "Reviewing Real Rocket Simulations"
      ]
    },
    {
      name: "Avionics & Communication",
      emoji: "🛰️",
      level: "Advanced",
      lessons: [
        "What Is Rocket Avionics",
        "Flight Computers and Software",
        "Telemetry and Ground Communication",
        "Power Systems and Redundancy",
        "Fault Detection and Safety Systems",
        "Data Handling and Visualization"
      ]
    },
    {
      name: "Mission Design & Operations",
      emoji: "🌕",
      level: "Master",
      lessons: [
        "Launch Site and Vehicle Integration",
        "Countdown and Launch Operations",
        "Staging and Flight Events",
        "Payload Deployment and Satellites",
        "Recovery and Reuse Procedures",
        "Case Study: SpaceX Launch Sequence"
      ]
    },
    {
      name: "Advanced Rocketry & Innovation",
      emoji: "🚀",
      level: "Master",
      lessons: [
        "Reusable Rockets (Falcon, Starship)",
        "Hybrid Propulsion Designs",
        "Additive Manufacturing in Rocketry",
        "AI & Automation in Launch Systems",
        "Next-Gen Fuels (Methalox, Green Propellants)",
        "Space Tourism & Future of Rockets"
      ]
    }
  ]
};

export function generateRocketLesson(id, unitIndex, lessonIndex) {
  const unit = rocketLessonTemplates.units[unitIndex];
  const lessonTitle = unit.lessons[lessonIndex];
  
  return {
    id,
    title: lessonTitle,
    unitNumber: unitIndex + 1,
    lessonNumber: lessonIndex + 1,
    duration: "15-25 min",
    emoji: unit.emoji,
    level: unit.level,
    introduction: `This lesson covers ${lessonTitle} in rocket engineering. You'll learn essential concepts for understanding and designing rocket systems.`,
    sections: [
      {
        title: `Understanding ${lessonTitle}`,
        content: `${lessonTitle} is a fundamental concept in ${unit.name}. This knowledge is essential for rocket engineers and space mission planners.\n\nKey aspects:\n• Core principles and theory\n• Mathematical foundations\n• Practical applications in rocketry\n• Real-world examples from space missions`
      },
      {
        title: "Technical Deep Dive",
        content: `The technical foundation of ${lessonTitle} includes:\n\n• Fundamental equations and physics\n• Engineering principles and laws\n• Design methodologies\n• Analysis techniques\n\nThese concepts guide rocket design, mission planning, and space exploration.`
      },
      {
        title: "Real-World Applications",
        content: `${lessonTitle} is applied in:\n\n• Modern rocket systems (Falcon 9, Starship, SLS, Ariane)\n• Space missions (ISS, Moon, Mars, deep space)\n• Satellite launches and orbital operations\n• Commercial spaceflight and exploration\n\nExamples from actual missions demonstrate these principles in action.`
      },
      {
        title: "Problem Solving & Analysis",
        content: `Engineers analyze ${lessonTitle} using:\n\n• Mathematical modeling and calculations\n• Computer simulations (CFD, FEA)\n• Physical testing and validation\n• Mission data analysis\n\nEach method provides critical insights for successful rocket design and space missions.`
      }
    ],
    keyTakeaways: [
      `${lessonTitle} is fundamental to rocket engineering`,
      "Understanding theory enables practical mission design",
      "Multiple analysis methods validate rocket systems",
      "Applications span from launch to deep space exploration"
    ],
    vocabulary: [
      { term: lessonTitle.split(' ')[0], definition: `Key concept in ${unit.name}` },
      { term: "Delta-V", definition: "Change in velocity needed for orbital maneuvers" },
      { term: "Specific Impulse (Isp)", definition: "Measure of rocket engine efficiency in seconds" }
    ]
  };
}

export function generateAllRocketLessons() {
  const lessons = {};
  let lessonId = 0;
  
  rocketLessonTemplates.units.forEach((unit, unitIdx) => {
    unit.lessons.forEach((lesson, lessonIdx) => {
      lessons[lessonId] = generateRocketLesson(lessonId, unitIdx, lessonIdx);
      lessonId++;
    });
  });
  
  return lessons;
}

export default generateAllRocketLessons;
