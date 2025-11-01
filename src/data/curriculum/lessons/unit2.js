// UNIT 2: Physics Basics - All 6 Lessons

export const unit2Lessons = [
  {
    id: 6,
    title: "Forces and Motion",
    unitNumber: 2,
    lessonNumber: 1,
    duration: "20 min",
    emoji: "⚡",
    introduction: "Forces are pushes or pulls that cause objects to move, stop, or change direction. Understanding forces and motion is fundamental to engineering.",
    sections: [
      { title: "What is a Force?", content: "A force is a push or pull on an object. Forces are measured in Newtons (N) and have both magnitude and direction.\n\nExamples:\n• Gravity pulls objects down\n• Thrust pushes aircraft forward\n• Drag slows aircraft down\n• Lift pushes aircraft up" },
      { title: "Newton's Laws", content: "1st Law (Inertia): Objects at rest stay at rest unless acted upon by a force.\n\n2nd Law (F=ma): Force equals mass times acceleration.\n\n3rd Law: For every action, there is an equal and opposite reaction." }
    ],
    keyTakeaways: ["Forces are pushes or pulls measured in Newtons", "Newton's laws explain how forces affect motion", "F = ma is fundamental to engineering"],
    vocabulary: [
      { term: "Force", definition: "A push or pull that can cause acceleration" },
      { term: "Newton", definition: "Unit of force (N)" }
    ]
  },
  {
    id: 7,
    title: "Speed, Velocity & Acceleration",
    unitNumber: 2,
    lessonNumber: 2,
    duration: "18 min",
    emoji: "🏃",
    introduction: "Speed, velocity, and acceleration describe how objects move. These concepts are crucial for calculating aircraft performance.",
    sections: [
      { title: "Speed vs Velocity", content: "Speed: How fast (scalar)\nVelocity: Speed with direction (vector)\n\nExample: Car going 60 mph north" },
      { title: "Acceleration", content: "Acceleration: Rate of change of velocity\n• Measured in m/s²\n• Formula: a = (v_final - v_initial) / time" }
    ],
    keyTakeaways: ["Speed is how fast, velocity includes direction", "Acceleration is rate of change of velocity"],
    vocabulary: [
      { term: "Velocity", definition: "Speed with direction" },
      { term: "Acceleration", definition: "Rate of change of velocity" }
    ]
  },
  {
    id: 8,
    title: "Energy and Work",
    unitNumber: 2,
    lessonNumber: 3,
    duration: "18 min",
    emoji: "⚡",
    introduction: "Energy is the ability to do work. Understanding energy helps engineers design efficient aircraft.",
    sections: [
      { title: "Types of Energy", content: "Kinetic Energy: Energy of motion (KE = ½mv²)\nPotential Energy: Stored energy (PE = mgh)\n\nEnergy is conserved - it changes form but isn't destroyed" },
      { title: "Work and Power", content: "Work: Force applied over distance (W = F × d)\nPower: Rate of doing work (P = W / t)" }
    ],
    keyTakeaways: ["Energy is the ability to do work", "Kinetic energy is motion, potential is stored", "Work equals force times distance"],
    vocabulary: [
      { term: "Energy", definition: "Ability to do work" },
      { term: "Work", definition: "Force applied over distance" }
    ]
  },
  {
    id: 9,
    title: "Momentum and Impulse",
    unitNumber: 2,
    lessonNumber: 4,
    duration: "15 min",
    emoji: "💥",
    introduction: "Momentum describes how hard it is to stop a moving object. Understanding momentum is crucial for safety systems.",
    sections: [
      { title: "Momentum", content: "Momentum: Mass times velocity (p = m × v)\n• Measured in kg⋅m/s\n• Momentum is conserved in collisions" },
      { title: "Impulse", content: "Impulse: Change in momentum\n• Impulse = Force × time\n• Longer time = less force (airbag principle)" }
    ],
    keyTakeaways: ["Momentum equals mass times velocity", "Momentum is conserved", "Increasing time reduces force"],
    vocabulary: [
      { term: "Momentum", definition: "Mass times velocity (p = mv)" },
      { term: "Impulse", definition: "Change in momentum" }
    ]
  },
  {
    id: 10,
    title: "Gravity and Weight",
    unitNumber: 2,
    lessonNumber: 5,
    duration: "15 min",
    emoji: "🌍",
    introduction: "Gravity is the force that pulls objects toward Earth. Understanding gravity is essential for aerospace engineering.",
    sections: [
      { title: "Gravity", content: "Gravity: Force of attraction between masses\n• On Earth: g = 9.8 m/s²\n• Universal - works everywhere" },
      { title: "Weight vs Mass", content: "Mass: Amount of matter (kg) - constant\nWeight: Force of gravity (W = mg) - varies with location" }
    ],
    keyTakeaways: ["Gravity pulls objects at 9.8 m/s² on Earth", "Weight equals mass times gravity", "Mass is constant, weight varies"],
    vocabulary: [
      { term: "Gravity", definition: "Force of attraction between masses" },
      { term: "Weight", definition: "Force of gravity on object (W = mg)" }
    ]
  },
  {
    id: 11,
    title: "Simple Machines",
    unitNumber: 2,
    lessonNumber: 6,
    duration: "18 min",
    emoji: "⚙️",
    introduction: "Simple machines make work easier by changing force direction or magnitude. Understanding these is fundamental to engineering.",
    sections: [
      { title: "Six Simple Machines", content: "1. Lever\n2. Wheel and Axle\n3. Pulley\n4. Inclined Plane\n5. Wedge\n6. Screw\n\nAll complex machines are combinations of these!" },
      { title: "Mechanical Advantage", content: "MA = Output Force / Input Force\n• MA > 1: Machine multiplies force\n• Trade-off: Gain force, lose distance" }
    ],
    keyTakeaways: ["Six simple machines form basis of all machines", "Mechanical advantage shows force multiplication", "Simple machines make work easier"],
    vocabulary: [
      { term: "Simple Machine", definition: "Basic device that changes force" },
      { term: "Mechanical Advantage", definition: "Ratio of output to input force" }
    ]
  }
];

export default unit2Lessons;
