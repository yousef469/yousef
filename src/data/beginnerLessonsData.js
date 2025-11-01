// LEVEL 1 - BEGINNER: Complete Curriculum Data

const beginnerLessons = {
  // UNIT 1: Introduction to Engineering
  unit1: [
    {
      id: 0,
      title: "What Engineers Do",
      level: "Beginner",
      unit: "Introduction to Engineering",
      unitNumber: 1,
      lessonNumber: 1,
      duration: "15 min",
      emoji: "🔧",
      locked: false,
      
      content: {
        introduction: "Engineering is the application of science and mathematics to solve real-world problems. Engineers design, build, and improve everything from bridges to spacecraft. In this lesson, you'll discover what engineers do and explore the different fields of engineering.",
        
        sections: [
          {
            title: "What is Engineering?",
            content: `Engineering is about solving problems and making things work better. Engineers use:\n\n• Science and mathematics as their tools\n• Creativity to design new solutions\n• Practical skills to build and test ideas\n• Teamwork to complete large projects\n\nUnlike scientists who discover how nature works, engineers apply that knowledge to create useful things. They ask "How can we make this?" instead of "Why does this happen?"`
          },
          {
            title: "Fields of Engineering",
            content: `There are many types of engineering, each focusing on different problems:\n\n🏗️ Civil Engineering: Buildings, bridges, roads, and infrastructure\n⚡ Electrical Engineering: Circuits, power systems, and electronics\n⚙️ Mechanical Engineering: Machines, engines, and moving parts\n💻 Computer Engineering: Software, hardware, and digital systems\n🧪 Chemical Engineering: Materials, processes, and reactions\n✈️ Aerospace Engineering: Aircraft, spacecraft, and flight systems\n🏥 Biomedical Engineering: Medical devices and healthcare technology\n🌍 Environmental Engineering: Clean water, air, and sustainability`
          },
          {
            title: "Design vs. Science",
            content: `Engineering and science are related but different:\n\nScience:\n• Discovers natural laws\n• Asks "Why?"\n• Focuses on understanding\n• Uses experiments to test theories\n\nEngineering:\n• Creates solutions\n• Asks "How?"\n• Focuses on building\n• Uses designs to solve problems\n\nExample: A scientist studies how birds fly. An engineer designs an airplane based on that knowledge.`
          },
          {
            title: "What Engineers Actually Do",
            content: `A typical engineer's day might include:\n\n1. Problem Solving: Identifying issues and finding solutions\n2. Design Work: Creating plans, drawings, and models\n3. Testing: Building prototypes and running experiments\n4. Analysis: Using math and computers to predict performance\n5. Collaboration: Working with teams and clients\n6. Documentation: Writing reports and specifications\n7. Learning: Staying updated with new technology\n\nEngineers work in offices, labs, factories, construction sites, and even outdoors!`
          }
        ],
        
        keyTakeaways: [
          "Engineering applies science and math to solve real-world problems",
          "There are many engineering fields, each with different focus areas",
          "Engineers design and build, while scientists discover and understand",
          "Engineering requires creativity, technical skills, and teamwork",
          "Engineers work in diverse environments solving important challenges"
        ],
        
        vocabulary: [
          { term: "Engineering", definition: "The application of science and mathematics to design and build useful things" },
          { term: "Design", definition: "The process of planning and creating a solution to a problem" },
          { term: "Prototype", definition: "An early model built to test a design" },
          { term: "Infrastructure", definition: "Basic physical systems like roads, bridges, and utilities" }
        ]
      },
      
      quiz: {
        questions: [
          {
            type: "multiple-choice",
            question: "What is the main difference between engineers and scientists?",
            options: [
              "Engineers discover natural laws, scientists build things",
              "Engineers apply knowledge to build, scientists discover how nature works",
              "Engineers only work with computers, scientists work in labs",
              "There is no difference between them"
            ],
            correctAnswer: 1,
            explanation: "Engineers apply scientific knowledge to design and build solutions, while scientists focus on discovering and understanding natural phenomena.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Which field of engineering focuses on aircraft and spacecraft?",
            options: [
              "Mechanical Engineering",
              "Civil Engineering",
              "Aerospace Engineering",
              "Electrical Engineering"
            ],
            correctAnswer: 2,
            explanation: "Aerospace Engineering specifically deals with the design and development of aircraft, spacecraft, and flight systems.",
            points: 10
          },
          {
            type: "true-false",
            question: "Engineers only work in offices and never go to construction sites or factories.",
            correctAnswer: false,
            explanation: "Engineers work in many different environments including offices, labs, factories, construction sites, and even outdoors depending on their field.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What do engineers use to test their designs before building the final product?",
            options: [
              "Prototypes",
              "Telescopes",
              "Microscopes",
              "Calculators"
            ],
            correctAnswer: 0,
            explanation: "Prototypes are early models that engineers build to test and refine their designs before creating the final product.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Which of these is NOT typically part of an engineer's work?",
            options: [
              "Problem solving and design",
              "Testing and analysis",
              "Discovering new laws of physics",
              "Collaboration and documentation"
            ],
            correctAnswer: 2,
            explanation: "Discovering new laws of physics is the work of scientists. Engineers apply existing scientific knowledge to create solutions.",
            points: 10
          }
        ]
      }
    },
    
    {
      id: 1,
      title: "The Engineering Design Process",
      level: "Beginner",
      unit: "Introduction to Engineering",
      unitNumber: 1,
      lessonNumber: 2,
      duration: "20 min",
      emoji: "📐",
      locked: true,
      
      content: {
        introduction: "The engineering design process is a series of steps that engineers follow to solve problems. It's a systematic approach that helps turn ideas into reality. This process is used to design everything from smartphones to skyscrapers.",
        
        sections: [
          {
            title: "The Design Process Steps",
            content: `Engineers follow these key steps:\n\n1️⃣ Define the Problem\n• What needs to be solved?\n• Who is affected?\n• What are the constraints?\n\n2️⃣ Research and Gather Information\n• What solutions already exist?\n• What materials are available?\n• What do experts say?\n\n3️⃣ Brainstorm Solutions\n• Generate many ideas\n• Think creatively\n• Don't judge ideas yet\n\n4️⃣ Select the Best Solution\n• Compare options\n• Consider costs and feasibility\n• Choose the most promising design\n\n5️⃣ Build a Prototype\n• Create a working model\n• Use available materials\n• Keep it simple at first\n\n6️⃣ Test and Evaluate\n• Does it work?\n• Does it solve the problem?\n• What can be improved?\n\n7️⃣ Improve and Iterate\n• Make changes based on testing\n• Repeat the process\n• Refine until it works well\n\n8️⃣ Communicate Results\n• Share your design\n• Document the process\n• Present to stakeholders`
          },
          {
            title: "Why Follow a Process?",
            content: `The design process helps engineers:\n\n✓ Stay organized and focused\n✓ Avoid missing important steps\n✓ Work efficiently as a team\n✓ Learn from failures\n✓ Create better solutions\n✓ Save time and money\n\nWithout a process, projects can become chaotic and waste resources. The process provides a roadmap from problem to solution.`
          },
          {
            title: "Iteration is Key",
            content: `Engineering is rarely perfect on the first try. Iteration means:\n\n• Testing your design\n• Finding what doesn't work\n• Making improvements\n• Testing again\n• Repeating until it's right\n\nExample: The Wright brothers built and tested dozens of glider designs before achieving powered flight. Each failure taught them something new.\n\nFamous Quote: "I have not failed. I've just found 10,000 ways that won't work." - Thomas Edison`
          },
          {
            title: "Real-World Example: Designing a Bridge",
            content: `Let's see the process in action:\n\n1. Problem: A river separates two towns\n2. Research: Study existing bridges, soil conditions, traffic needs\n3. Brainstorm: Suspension bridge? Arch bridge? Beam bridge?\n4. Select: Choose suspension bridge for long span\n5. Prototype: Build scale model, run computer simulations\n6. Test: Check strength, wind resistance, earthquake safety\n7. Improve: Adjust cable thickness, add supports\n8. Communicate: Present plans to city council and public\n\nThe actual bridge construction follows the refined design!`
          }
        ],
        
        keyTakeaways: [
          "The engineering design process has 8 main steps from problem to solution",
          "Following a process helps engineers stay organized and efficient",
          "Iteration (testing and improving) is essential to good engineering",
          "Prototypes help test ideas before building the final product",
          "Communication is important throughout the design process"
        ],
        
        vocabulary: [
          { term: "Design Process", definition: "A series of steps engineers follow to solve problems systematically" },
          { term: "Prototype", definition: "A preliminary model built to test and refine a design" },
          { term: "Iteration", definition: "The process of repeating steps to improve a design" },
          { term: "Constraints", definition: "Limitations or requirements that affect the design (cost, time, materials)" },
          { term: "Stakeholder", definition: "A person or group affected by or interested in the project" }
        ]
      },
      
      quiz: {
        questions: [
          {
            type: "multiple-choice",
            question: "What is the first step in the engineering design process?",
            options: [
              "Build a prototype",
              "Define the problem",
              "Test the solution",
              "Brainstorm ideas"
            ],
            correctAnswer: 1,
            explanation: "The first step is to clearly define the problem you're trying to solve. You need to understand the problem before you can solve it.",
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
            explanation: "Iteration is the process of testing, learning from results, making improvements, and testing again until the design works well.",
            points: 10
          },
          {
            type: "true-false",
            question: "Engineers usually get their designs perfect on the first try.",
            correctAnswer: false,
            explanation: "Engineering rarely works perfectly the first time. Iteration and improvement are essential parts of the process.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Why do engineers build prototypes?",
            options: [
              "To waste materials",
              "To test and refine designs before building the final product",
              "To show off their skills",
              "Because they have extra time"
            ],
            correctAnswer: 1,
            explanation: "Prototypes allow engineers to test their ideas, find problems, and make improvements before investing in the final product.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What should you do after testing reveals problems with your design?",
            options: [
              "Give up and start over completely",
              "Ignore the problems",
              "Make improvements and test again",
              "Build the final product anyway"
            ],
            correctAnswer: 2,
            explanation: "When testing reveals problems, engineers make improvements and test again. This iteration process leads to better designs.",
            points: 10
          }
        ]
      }
    }
  ],
  
  // UNIT 2: Physics Basics (Placeholder - to be expanded)
  unit2: [],
  
  // UNIT 3: Mathematics for Engineers (Placeholder)
  unit3: [],
  
  // UNIT 4: Basics of Flight (Already exists in planesLessonsData.js)
  unit4: [], // Will reference existing data
  
  // UNIT 5: Aircraft Components (Placeholder)
  unit5: [],
  
  // UNIT 6: Materials & Tools (Placeholder)
  unit6: []
};

export default beginnerLessons;
