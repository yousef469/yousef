// UNIT 1: Introduction to Engineering - All 6 Quizzes
// Quiz questions only (lessons are in separate file)

export const unit1Quizzes = [
  // Lesson 1: What Engineers Do
  {
    lessonId: 0,
    questions: [
      {
        type: "multiple-choice",
        question: "What is the main difference between engineers and scientists?",
        options: [
          "Engineers discover natural laws, scientists build things",
          "Engineers apply knowledge to build, scientists discover how nature works",
          "Engineers only work with computers, scientists work in labs",
          "There is no difference"
        ],
        correctAnswer: 1,
        explanation: "Engineers apply scientific knowledge to design and build solutions, while scientists focus on discovering natural phenomena.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Which field of engineering focuses on aircraft and spacecraft?",
        options: ["Mechanical Engineering", "Civil Engineering", "Aerospace Engineering", "Electrical Engineering"],
        correctAnswer: 2,
        explanation: "Aerospace Engineering deals with aircraft, spacecraft, and flight systems.",
        points: 10
      },
      {
        type: "true-false",
        question: "Engineers only work in offices and never go to construction sites.",
        correctAnswer: false,
        explanation: "Engineers work in many environments including offices, labs, factories, and construction sites.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What do engineers use to test designs before building the final product?",
        options: ["Prototypes", "Telescopes", "Microscopes", "Calculators"],
        correctAnswer: 0,
        explanation: "Prototypes are early models that engineers build to test and refine designs.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Which is NOT typically part of an engineer's work?",
        options: [
          "Problem solving and design",
          "Testing and analysis",
          "Discovering new laws of physics",
          "Collaboration and documentation"
        ],
        correctAnswer: 2,
        explanation: "Discovering new laws of physics is scientists' work. Engineers apply existing knowledge.",
        points: 10
      }
    ]
  },
  
  // Lesson 2: Engineering Design Process
  {
    lessonId: 1,
    questions: [
      {
        type: "multiple-choice",
        question: "What is the first step in the engineering design process?",
        options: ["Build a prototype", "Define the problem", "Test the solution", "Brainstorm ideas"],
        correctAnswer: 1,
        explanation: "The first step is to clearly define the problem you're trying to solve.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What does 'iteration' mean in engineering?",
        options: [
          "Building the final product",
          "Testing and improving repeatedly",
          "Presenting your design",
          "Gathering information"
        ],
        correctAnswer: 1,
        explanation: "Iteration is testing, learning, making improvements, and testing again.",
        points: 10
      },
      {
        type: "true-false",
        question: "Engineers usually get their designs perfect on the first try.",
        correctAnswer: false,
        explanation: "Engineering rarely works perfectly the first time. Iteration is essential.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Why do engineers build prototypes?",
        options: [
          "To waste materials",
          "To test and refine designs before building final product",
          "To show off skills",
          "Because they have extra time"
        ],
        correctAnswer: 1,
        explanation: "Prototypes allow testing ideas and finding problems before the final product.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What should you do after testing reveals problems?",
        options: [
          "Give up completely",
          "Ignore the problems",
          "Make improvements and test again",
          "Build final product anyway"
        ],
        correctAnswer: 2,
        explanation: "When testing reveals problems, make improvements and test again (iteration).",
        points: 10
      }
    ]
  },
  
  // Lesson 3: Safety & Ethics
  {
    lessonId: 2,
    questions: [
      {
        type: "true-false",
        question: "It's acceptable to compromise safety to meet a deadline.",
        correctAnswer: false,
        explanation: "Safety should never be compromised for any reason. Public safety is always top priority.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What should you do if you notice an unsafe condition?",
        options: [
          "Ignore it if it's not your responsibility",
          "Report it immediately to your supervisor",
          "Wait to see if someone else reports it",
          "Only report if someone gets hurt"
        ],
        correctAnswer: 1,
        explanation: "Engineers have a duty to report unsafe conditions immediately.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What does PPE stand for?",
        options: [
          "Professional Practice Equipment",
          "Personal Protective Equipment",
          "Public Protection Engineering",
          "Primary Prevention Equipment"
        ],
        correctAnswer: 1,
        explanation: "PPE stands for Personal Protective Equipment.",
        points: 10
      },
      {
        type: "true-false",
        question: "Engineers should only work on projects within their expertise.",
        correctAnswer: true,
        explanation: "Professional competence requires working only in areas where you have adequate knowledge.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Your boss asks you to approve an unsafe design. What should you do?",
        options: [
          "Approve it to keep your job",
          "Explain concerns and refuse to approve if unsafe",
          "Approve but document concerns privately",
          "Quit immediately"
        ],
        correctAnswer: 1,
        explanation: "You must explain safety concerns and refuse to approve unsafe designs.",
        points: 10
      }
    ]
  },
  
  // Lesson 4: Aviation History
  {
    lessonId: 3,
    questions: [
      {
        type: "multiple-choice",
        question: "When did the Wright Brothers achieve first powered flight?",
        options: ["1900, Ohio", "1903, North Carolina", "1910, California", "1905, New York"],
        correctAnswer: 1,
        explanation: "Wright Brothers achieved first powered flight on December 17, 1903, at Kitty Hawk, North Carolina.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What was the Wright Brothers' key innovation?",
        options: ["Jet engines", "Three-axis control system", "Autopilot", "Radar"],
        correctAnswer: 1,
        explanation: "Wright Brothers developed three-axis control (pitch, roll, yaw).",
        points: 10
      },
      {
        type: "true-false",
        question: "World War I slowed down aviation development.",
        correctAnswer: false,
        explanation: "WWI actually accelerated aviation development due to military needs.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Who made the first solo transatlantic flight in 1927?",
        options: ["Amelia Earhart", "Chuck Yeager", "Charles Lindbergh", "Wright Brothers"],
        correctAnswer: 2,
        explanation: "Charles Lindbergh made first solo non-stop transatlantic flight in 1927.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What innovation revolutionized aviation in the 1940s?",
        options: ["Propellers", "Jet engines", "Hot air balloons", "Gliders"],
        correctAnswer: 1,
        explanation: "Jet engines revolutionized aviation by providing much more power.",
        points: 10
      }
    ]
  },
  
  // Lesson 5: Aerospace Industry Roles
  {
    lessonId: 4,
    questions: [
      {
        type: "multiple-choice",
        question: "Which engineer designs aircraft and analyzes aerodynamics?",
        options: ["Electrical Engineer", "Aerospace Engineer", "Software Engineer", "Civil Engineer"],
        correctAnswer: 1,
        explanation: "Aerospace Engineers specialize in designing aircraft and spacecraft.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What does AMT stand for?",
        options: [
          "Automated Maintenance Technology",
          "Aircraft Maintenance Technician",
          "Aerospace Management Team",
          "Advanced Manufacturing Tools"
        ],
        correctAnswer: 1,
        explanation: "AMT stands for Aircraft Maintenance Technician.",
        points: 10
      },
      {
        type: "true-false",
        question: "The only career in aerospace is being a pilot.",
        correctAnswer: false,
        explanation: "There are many diverse careers including engineers, technicians, managers, and researchers.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What do avionics technicians work on?",
        options: [
          "Aircraft engines",
          "Electronic and navigation systems",
          "Aircraft painting",
          "Passenger seating"
        ],
        correctAnswer: 1,
        explanation: "Avionics technicians maintain electronic systems including navigation and communication.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Who plans test flights and analyzes aircraft performance?",
        options: ["Sales representatives", "Flight Test Engineers", "Technical writers", "Supply chain managers"],
        correctAnswer: 1,
        explanation: "Flight Test Engineers plan test flights and analyze performance.",
        points: 10
      }
    ]
  },
  
  // Lesson 6: Career Paths
  {
    lessonId: 5,
    questions: [
      {
        type: "multiple-choice",
        question: "What is the typical minimum education for aerospace engineer?",
        options: [
          "High school diploma",
          "Associate's degree (2 years)",
          "Bachelor's degree (4 years)",
          "PhD (8+ years)"
        ],
        correctAnswer: 2,
        explanation: "Bachelor's degree (4 years) is minimum requirement for most aerospace engineering positions.",
        points: 10
      },
      {
        type: "true-false",
        question: "Only technical skills matter; soft skills like communication are not important.",
        correctAnswer: false,
        explanation: "Both technical and soft skills are essential for engineering success.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Which is an important technical skill for aerospace engineers?",
        options: ["Cooking", "Computer programming", "Playing sports", "Painting"],
        correctAnswer: 1,
        explanation: "Computer programming (Python, MATLAB, C++) is essential for aerospace engineers.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "What is an internship?",
        options: [
          "A permanent job",
          "A temporary position where students gain work experience",
          "A type of degree",
          "A certification"
        ],
        correctAnswer: 1,
        explanation: "Internship is a temporary position where students gain practical work experience.",
        points: 10
      },
      {
        type: "true-false",
        question: "High school students interested in aerospace should focus on math and science.",
        correctAnswer: true,
        explanation: "Strong foundations in mathematics and science are essential for aerospace engineering.",
        points: 10
      }
    ]
  }
];

export default unit1Quizzes;
