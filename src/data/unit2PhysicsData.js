// UNIT 2: Physics Basics - 6 Lessons

const unit2Physics = [
  {
    id: 6,
    title: "Forces and Motion",
    level: "Beginner",
    unit: "Physics Basics",
    unitNumber: 2,
    lessonNumber: 1,
    duration: "20 min",
    emoji: "⚡",
    locked: true,
    
    content: {
      introduction: "Forces are pushes or pulls that cause objects to move, stop, or change direction. Understanding forces and motion is fundamental to engineering, especially in aerospace where we must calculate how forces affect aircraft. Newton's laws of motion explain how forces work.",
      
      sections: [
        {
          title: "What is a Force?",
          content: `A force is a push or pull on an object:\n\n• Measured in Newtons (N)\n• Has magnitude (strength) and direction\n• Can cause acceleration\n• Can change shape\n\nExamples of Forces:\n🏃 Push: Pushing a cart\n🎣 Pull: Pulling a rope\n🌍 Gravity: Earth pulling objects down\n🧲 Magnetic: Magnets attracting/repelling\n✈️ Thrust: Engine pushing aircraft forward\n💨 Drag: Air resistance slowing motion`
        },
        {
          title: "Newton's First Law (Inertia)",
          content: `"An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by a force."\n\nThis means:\n• Objects resist changes in motion\n• Need force to start moving\n• Need force to stop moving\n• Need force to change direction\n\nInertia = resistance to change in motion\n\nExample: In a car, you lurch forward when brakes are applied because your body wants to keep moving forward (inertia).`
        },
        {
          title: "Newton's Second Law (F = ma)",
          content: `"Force equals mass times acceleration"\n\nF = m × a\n\nWhere:\n• F = Force (Newtons)\n• m = mass (kilograms)\n• a = acceleration (m/s²)\n\nKey Points:\n• More force = more acceleration\n• More mass = less acceleration (for same force)\n• Heavier objects need more force to accelerate\n\nExample: A small car accelerates faster than a truck with the same engine because it has less mass.`
        },
        {
          title: "Newton's Third Law (Action-Reaction)",
          content: `"For every action, there is an equal and opposite reaction."\n\nMeaning:\n• Forces always come in pairs\n• Equal strength, opposite direction\n• Act on different objects\n\nExamples:\n🚀 Rocket: Exhaust pushes down, rocket pushes up\n🏊 Swimming: Push water back, water pushes you forward\n🚶 Walking: Push ground back, ground pushes you forward\n✈️ Jet Engine: Push air back, air pushes plane forward\n\nThis is how rockets work in space!`
        }
      ],
      
      keyTakeaways: [
        "Forces are pushes or pulls measured in Newtons",
        "Newton's First Law: Objects resist changes in motion (inertia)",
        "Newton's Second Law: F = ma (force equals mass times acceleration)",
        "Newton's Third Law: Every action has an equal and opposite reaction",
        "Understanding forces is essential for designing aircraft and spacecraft"
      ],
      
      vocabulary: [
        { term: "Force", definition: "A push or pull that can cause an object to accelerate" },
        { term: "Newton (N)", definition: "Unit of force in the metric system" },
        { term: "Inertia", definition: "Tendency of an object to resist changes in motion" },
        { term: "Acceleration", definition: "Rate of change of velocity" }
      ]
    },
    
    quiz: {
      questions: [
        {
          type: "multiple-choice",
          question: "What is the unit of force?",
          options: ["Meter", "Newton", "Kilogram", "Second"],
          correctAnswer: 1,
          explanation: "Force is measured in Newtons (N), named after Sir Isaac Newton.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Which of Newton's laws states that F = ma?",
          options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
          correctAnswer: 1,
          explanation: "Newton's Second Law states that Force equals mass times acceleration (F = ma).",
          points: 10
        },
        {
          type: "true-false",
          question: "An object in motion will eventually stop on its own without any force.",
          correctAnswer: false,
          explanation: "According to Newton's First Law, an object in motion stays in motion unless acted upon by a force (like friction or air resistance).",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "What does Newton's Third Law state?",
          options: [
            "Objects at rest stay at rest",
            "F = ma",
            "For every action, there is an equal and opposite reaction",
            "Energy cannot be created or destroyed"
          ],
          correctAnswer: 2,
          explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "If you double the force on an object while keeping mass constant, what happens to acceleration?",
          options: [
            "Stays the same",
            "Doubles",
            "Halves",
            "Quadruples"
          ],
          correctAnswer: 1,
          explanation: "From F = ma, if force doubles and mass stays constant, acceleration must double.",
          points: 10
        }
      ]
    }
  }
];

export default unit2Physics;
