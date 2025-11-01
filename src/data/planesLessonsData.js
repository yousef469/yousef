// Complete Aircraft Engineering Curriculum - All 211 Lessons

export const planesLessons = {
  // BEGINNER LEVEL - Unit 1: Introduction to Engineering (6 lessons)
  0: {
    id: 0,
    level: 'Beginner',
    unit: 'Introduction to Engineering',
    unitNumber: 1,
    lessonNumber: 1,
    title: 'What is Engineering?',
    emoji: '🎓',
    duration: '10 min',
    content: {
      introduction: 'Welcome to your journey into aircraft engineering! Engineering is the application of science and mathematics to solve real-world problems and create innovative solutions.',
      sections: [
        {
          title: 'What is Engineering?',
          content: `Engineering is the creative application of scientific principles to design, build, and maintain structures, machines, systems, and processes. Engineers use their knowledge of mathematics, science, and technology to solve problems and improve our world.

**Key Characteristics of Engineering:**
- Problem-solving focused
- Applies scientific principles
- Creates practical solutions
- Requires creativity and innovation
- Involves teamwork and collaboration`
        },
        {
          title: 'Types of Engineering',
          content: `There are many branches of engineering, each focusing on different areas:

**Major Engineering Disciplines:**
1. **Mechanical Engineering** - Machines, engines, and mechanical systems
2. **Electrical Engineering** - Electrical systems and electronics
3. **Civil Engineering** - Buildings, bridges, and infrastructure
4. **Aerospace Engineering** - Aircraft, spacecraft, and flight systems
5. **Chemical Engineering** - Chemical processes and materials
6. **Computer Engineering** - Computer systems and software

**Aerospace Engineering** combines many of these disciplines to design and build aircraft!`
        },
        {
          title: 'The Engineering Design Process',
          content: `Engineers follow a systematic process to solve problems:

**Steps in the Engineering Design Process:**
1. **Define the Problem** - Identify what needs to be solved
2. **Research** - Gather information and understand constraints
3. **Brainstorm Solutions** - Generate multiple ideas
4. **Select Best Solution** - Evaluate and choose the best option
5. **Build Prototype** - Create a working model
6. **Test and Evaluate** - See if it works as intended
7. **Improve and Iterate** - Make it better based on results

This process is used in designing everything from small components to entire aircraft!`
        },
        {
          title: 'Why Aircraft Engineering?',
          content: `Aircraft engineering is one of the most exciting and challenging fields:

**What Makes It Special:**
- Combines multiple engineering disciplines
- Requires precision and safety
- Pushes the boundaries of technology
- Enables global travel and exploration
- Constantly evolving with new innovations

**Career Opportunities:**
- Aircraft Designer
- Flight Test Engineer
- Propulsion Engineer
- Avionics Engineer
- Aerospace Researcher
- Manufacturing Engineer

The skills you learn can be applied to aircraft, spacecraft, drones, and more!`
        }
      ],
      keyTakeaways: [
        'Engineering applies science and math to solve real-world problems',
        'There are many types of engineering, each with unique focus areas',
        'The engineering design process is a systematic approach to problem-solving',
        'Aircraft engineering combines multiple disciplines',
        'Engineers must be creative, analytical, and detail-oriented'
      ],
      vocabulary: [
        { term: 'Engineering', definition: 'The application of scientific principles to design and build structures, machines, and systems' },
        { term: 'Aerospace', definition: 'The branch of engineering dealing with aircraft and spacecraft' },
        { term: 'Prototype', definition: 'An early model built to test a concept or process' },
        { term: 'Innovation', definition: 'A new method, idea, or product' },
        { term: 'Design Process', definition: 'A systematic approach to solving engineering problems' }
      ]
    },
    quiz: {
      type: 'beginner',
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'What is the primary purpose of engineering?',
          options: [
            'To memorize scientific facts',
            'To apply science and math to solve real-world problems',
            'To conduct laboratory experiments',
            'To write research papers'
          ],
          correctAnswer: 1,
          explanation: 'Engineering is fundamentally about applying scientific principles to create practical solutions to real-world problems.'
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: 'Which engineering discipline focuses on aircraft and spacecraft?',
          options: [
            'Civil Engineering',
            'Chemical Engineering',
            'Aerospace Engineering',
            'Electrical Engineering'
          ],
          correctAnswer: 2,
          explanation: 'Aerospace Engineering specifically deals with the design and development of aircraft and spacecraft.'
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: 'What is the first step in the engineering design process?',
          options: [
            'Build a prototype',
            'Define the problem',
            'Test the solution',
            'Brainstorm ideas'
          ],
          correctAnswer: 1,
          explanation: 'The first step is always to clearly define and understand the problem you are trying to solve.'
        },
        {
          id: 4,
          type: 'multiple-choice',
          question: 'What is a prototype?',
          options: [
            'A final product ready for sale',
            'A written plan',
            'An early model built to test a concept',
            'A computer simulation'
          ],
          correctAnswer: 2,
          explanation: 'A prototype is an early working model created to test and refine a design concept.'
        },
        {
          id: 5,
          type: 'multiple-choice',
          question: 'Which of these is NOT a characteristic of engineering?',
          options: [
            'Problem-solving focused',
            'Requires creativity',
            'Only uses memorization',
            'Applies scientific principles'
          ],
          correctAnswer: 2,
          explanation: 'Engineering requires critical thinking and creativity, not just memorization. It involves applying knowledge to solve new problems.'
        },
        {
          id: 6,
          type: 'diagram-label',
          question: 'Label the steps of the Engineering Design Process in order:',
          diagram: 'engineering-design-process',
          labels: ['Define Problem', 'Research', 'Brainstorm', 'Select Solution', 'Build Prototype', 'Test', 'Improve'],
          correctOrder: [0, 1, 2, 3, 4, 5, 6],
          explanation: 'The engineering design process follows a logical sequence from problem definition through testing and improvement.'
        },
        {
          id: 7,
          type: 'diagram-label',
          question: 'Match each engineering discipline to its focus area:',
          diagram: 'engineering-disciplines',
          pairs: [
            { discipline: 'Aerospace', focus: 'Aircraft & Spacecraft' },
            { discipline: 'Civil', focus: 'Buildings & Infrastructure' },
            { discipline: 'Mechanical', focus: 'Machines & Engines' },
            { discipline: 'Electrical', focus: 'Electronics & Power Systems' }
          ],
          explanation: 'Each engineering discipline has a specific focus area and set of applications.'
        },
        {
          id: 8,
          type: 'calculation',
          question: 'If an engineering team completes 3 design iterations per week, how many iterations will they complete in 4 weeks?',
          correctAnswer: 12,
          unit: 'iterations',
          tolerance: 0,
          explanation: 'Simple multiplication: 3 iterations/week × 4 weeks = 12 iterations. This shows how engineers track progress over time.',
          hint: 'Multiply the number of iterations per week by the number of weeks'
        }
      ]
    }
  },

  // Placeholder structure for remaining 210 lessons
  // Each lesson will follow the same structure
  ...Array.from({ length: 210 }, (_, i) => {
    const lessonId = i + 1;
    
    // Determine which unit and level this lesson belongs to
    let level, unit, unitNumber, lessonNumber, emoji, quizzesAfter;
    
    if (lessonId < 36) {
      // Beginner (0-35)
      level = 'Beginner';
      unitNumber = Math.floor(lessonId / 6) + 1;
      lessonNumber = (lessonId % 6) + 1;
      quizzesAfter = 1;
      
      const beginnerUnits = [
        { name: 'Introduction to Engineering', emoji: '🎓' },
        { name: 'Physics Fundamentals', emoji: '⚛️' },
        { name: 'Basic Math for Engineers', emoji: '📐' },
        { name: 'Introduction to Aerodynamics', emoji: '💨' },
        { name: 'Aircraft Components & Systems', emoji: '✈️' },
        { name: 'Materials & Tools', emoji: '🔧' }
      ];
      unit = beginnerUnits[unitNumber - 1].name;
      emoji = beginnerUnits[unitNumber - 1].emoji;
      
    } else if (lessonId < 78) {
      // Intermediate (36-77)
      level = 'Intermediate';
      const offset = lessonId - 36;
      unitNumber = Math.floor(offset / 7) + 1;
      lessonNumber = (offset % 7) + 1;
      quizzesAfter = 2;
      
      const intermediateUnits = [
        { name: 'Statics', emoji: '⚖️' },
        { name: 'Dynamics', emoji: '🔄' },
        { name: 'Strength of Materials', emoji: '💪' },
        { name: 'Fluid Mechanics I', emoji: '🌊' },
        { name: 'Thermodynamics', emoji: '🔥' },
        { name: 'Computer-Aided Design (CAD)', emoji: '💻' }
      ];
      unit = intermediateUnits[unitNumber - 1].name;
      emoji = intermediateUnits[unitNumber - 1].emoji;
      
    } else if (lessonId < 126) {
      // Advanced (78-125)
      level = 'Advanced';
      const offset = lessonId - 78;
      unitNumber = Math.floor(offset / 8) + 1;
      lessonNumber = (offset % 8) + 1;
      quizzesAfter = 2;
      
      const advancedUnits = [
        { name: 'Aerodynamics II', emoji: '🌪️' },
        { name: 'Propulsion Systems', emoji: '🚀' },
        { name: 'Aircraft Structures', emoji: '🏗️' },
        { name: 'Flight Mechanics', emoji: '🛫' },
        { name: 'Avionics & Control Systems', emoji: '📡' },
        { name: 'Manufacturing & Assembly', emoji: '🏭' }
      ];
      unit = advancedUnits[unitNumber - 1].name;
      emoji = advancedUnits[unitNumber - 1].emoji;
      
    } else if (lessonId < 166) {
      // Expert (126-165)
      level = 'Expert';
      const offset = lessonId - 126;
      unitNumber = Math.floor(offset / 8) + 1;
      lessonNumber = (offset % 8) + 1;
      quizzesAfter = unitNumber <= 2 ? 3 : 2;
      
      const expertUnits = [
        { name: 'Finite Element Analysis (FEA)', emoji: '📊' },
        { name: 'Computational Fluid Dynamics (CFD)', emoji: '💻' },
        { name: 'Systems Integration', emoji: '🔗' },
        { name: 'Certification & Safety', emoji: '✅' },
        { name: 'Maintenance Engineering', emoji: '🔧' }
      ];
      unit = expertUnits[unitNumber - 1].name;
      emoji = expertUnits[unitNumber - 1].emoji;
      
    } else {
      // Master (166-210)
      level = 'Master';
      const offset = lessonId - 166;
      unitNumber = Math.floor(offset / 9) + 1;
      lessonNumber = (offset % 9) + 1;
      quizzesAfter = [1, 3, 4].includes(unitNumber) ? 3 : 2;
      
      const masterUnits = [
        { name: 'Advanced Propulsion', emoji: '🚀' },
        { name: 'Flight Control Algorithms', emoji: '🎮' },
        { name: 'Unmanned Aerial Systems (Drones)', emoji: '🛸' },
        { name: 'Spacecraft Design & Orbital Mechanics', emoji: '🌌' },
        { name: 'AI & Sustainability in Aerospace', emoji: '🌱' }
      ];
      unit = masterUnits[unitNumber - 1].name;
      emoji = masterUnits[unitNumber - 1].emoji;
    }
    
    return {
      [lessonId]: {
        id: lessonId,
        level,
        unit,
        unitNumber,
        lessonNumber,
        title: `${unit} - Part ${lessonNumber}`,
        emoji,
        duration: '10-15 min',
        quizzesAfter,
        content: {
          introduction: `This lesson covers key concepts in ${unit}.`,
          sections: [
            {
              title: 'Overview',
              content: 'Lesson content will be added here.'
            }
          ],
          keyTakeaways: ['Content coming soon'],
          vocabulary: []
        },
        quiz: {
          type: level.toLowerCase(),
          questions: []
        }
      }
    };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {})
};

export default planesLessons;
