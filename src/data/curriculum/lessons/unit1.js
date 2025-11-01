// UNIT 1: Introduction to Engineering - All 6 Lessons
// Lesson content only (quizzes are in separate file)

export const unit1Lessons = [
  {
    id: 0,
    title: "What Engineers Do",
    unitNumber: 1,
    lessonNumber: 1,
    duration: "15 min",
    emoji: "🔧",
    
    introduction: "Engineering is the application of science and mathematics to solve real-world problems. Engineers design, build, and improve everything from bridges to spacecraft.",
    
    sections: [
      {
        title: "What is Engineering?",
        content: "Engineering is about solving problems and making things work better. Engineers use:\n\n• Science and mathematics as their tools\n• Creativity to design new solutions\n• Practical skills to build and test ideas\n• Teamwork to complete large projects"
      },
      {
        title: "Fields of Engineering",
        content: "🏗️ Civil Engineering: Buildings, bridges, roads\n⚡ Electrical Engineering: Circuits, power systems\n⚙️ Mechanical Engineering: Machines, engines\n💻 Computer Engineering: Software, hardware\n✈️ Aerospace Engineering: Aircraft, spacecraft"
      },
      {
        title: "Design vs. Science",
        content: "Science discovers natural laws and asks 'Why?'\nEngineering creates solutions and asks 'How?'\n\nExample: A scientist studies how birds fly. An engineer designs an airplane."
      },
      {
        title: "What Engineers Actually Do",
        content: "1. Problem Solving\n2. Design Work\n3. Testing\n4. Analysis\n5. Collaboration\n6. Documentation\n7. Learning"
      }
    ],
    
    keyTakeaways: [
      "Engineering applies science and math to solve real-world problems",
      "There are many engineering fields, each with different focus areas",
      "Engineers design and build, while scientists discover and understand",
      "Engineering requires creativity, technical skills, and teamwork"
    ],
    
    vocabulary: [
      { term: "Engineering", definition: "The application of science and mathematics to design and build useful things" },
      { term: "Design", definition: "The process of planning and creating a solution to a problem" },
      { term: "Prototype", definition: "An early model built to test a design" }
    ]
  },
  
  {
    id: 1,
    title: "The Engineering Design Process",
    unitNumber: 1,
    lessonNumber: 2,
    duration: "20 min",
    emoji: "📐",
    
    introduction: "The engineering design process is a series of steps that engineers follow to solve problems systematically.",
    
    sections: [
      {
        title: "The Design Process Steps",
        content: "1️⃣ Define the Problem\n2️⃣ Research\n3️⃣ Brainstorm Solutions\n4️⃣ Select Best Solution\n5️⃣ Build Prototype\n6️⃣ Test and Evaluate\n7️⃣ Improve and Iterate\n8️⃣ Communicate Results"
      },
      {
        title: "Why Follow a Process?",
        content: "✓ Stay organized\n✓ Avoid missing steps\n✓ Work efficiently\n✓ Learn from failures\n✓ Create better solutions"
      },
      {
        title: "Iteration is Key",
        content: "Engineering is rarely perfect on the first try. Iteration means testing, learning, improving, and testing again.\n\nExample: Wright brothers tested dozens of designs before achieving flight."
      }
    ],
    
    keyTakeaways: [
      "The design process has 8 main steps from problem to solution",
      "Following a process helps engineers stay organized",
      "Iteration (testing and improving) is essential",
      "Prototypes help test ideas before building final product"
    ],
    
    vocabulary: [
      { term: "Design Process", definition: "Series of steps engineers follow to solve problems" },
      { term: "Prototype", definition: "Preliminary model built to test design" },
      { term: "Iteration", definition: "Process of repeating steps to improve design" }
    ]
  },
  
  {
    id: 2,
    title: "Safety & Ethics in Engineering",
    unitNumber: 1,
    lessonNumber: 3,
    duration: "15 min",
    emoji: "🛡️",
    
    introduction: "Safety and ethics are fundamental to engineering. Engineers have a responsibility to protect public safety and act with integrity.",
    
    sections: [
      {
        title: "Why Safety Matters",
        content: "Engineering failures can cause:\n• Loss of life or injury\n• Property damage\n• Environmental harm\n• Economic losses\n\nEngineers must prioritize safety in every decision."
      },
      {
        title: "Engineering Ethics",
        content: "1. Public Safety First\n2. Honesty and Integrity\n3. Professional Competence\n4. Environmental Responsibility"
      },
      {
        title: "Safety in the Workplace",
        content: "🦺 Personal Protective Equipment (PPE)\n⚠️ Hazard Awareness\n🚨 Emergency Preparedness\n📋 Documentation"
      }
    ],
    
    keyTakeaways: [
      "Safety is the top priority in all engineering work",
      "Engineers must follow ethical principles",
      "Proper safety equipment prevents accidents",
      "Engineers must report unsafe conditions"
    ],
    
    vocabulary: [
      { term: "Ethics", definition: "Moral principles governing professional behavior" },
      { term: "PPE", definition: "Personal Protective Equipment" },
      { term: "Integrity", definition: "Being honest and having strong moral principles" }
    ]
  },
  
  {
    id: 3,
    title: "Aviation History",
    unitNumber: 1,
    lessonNumber: 4,
    duration: "20 min",
    emoji: "🛫",
    
    introduction: "The history of aviation is a story of human ingenuity and engineering innovation, from the Wright Brothers to modern jets.",
    
    sections: [
      {
        title: "The Wright Brothers (1903)",
        content: "📅 December 17, 1903 - First powered flight\n⏱️ 12 seconds, 120 feet\n\nKey Innovations:\n• Three-axis control\n• Wing warping\n• Lightweight engine\n• Wind tunnel testing"
      },
      {
        title: "Early Aviation (1903-1920s)",
        content: "✈️ 1909: First international flight\n🎖️ WWI accelerated development\n📬 1918: First airmail service\n🌊 1919: First transatlantic flight"
      },
      {
        title: "The Golden Age (1920s-1930s)",
        content: "🦅 1927: Lindbergh's solo transatlantic flight\n✈️ Commercial aviation begins\n🚀 All-metal aircraft\n👩‍✈️ Amelia Earhart inspires generations"
      },
      {
        title: "Jets and Modern Era",
        content: "🔥 1939: First jet aircraft\n✈️ 1947: Breaking sound barrier\n🌍 1950s-60s: Jet age begins\n🛫 Modern: Composites, fly-by-wire, GPS"
      }
    ],
    
    keyTakeaways: [
      "Wright Brothers achieved first powered flight in 1903",
      "World Wars accelerated aviation technology",
      "Commercial aviation grew rapidly in 1920s-1930s",
      "Jet engines revolutionized flight in 1940s-1950s"
    ],
    
    vocabulary: [
      { term: "Three-axis control", definition: "Control of pitch, roll, and yaw" },
      { term: "Supersonic", definition: "Faster than speed of sound" },
      { term: "Jet engine", definition: "Engine producing thrust by expelling hot gases" }
    ]
  },
  
  {
    id: 4,
    title: "Aerospace Industry Roles",
    unitNumber: 1,
    lessonNumber: 5,
    duration: "15 min",
    emoji: "👷",
    
    introduction: "The aerospace industry employs millions in diverse roles, from engineers to pilots to managers.",
    
    sections: [
      {
        title: "Engineering Roles",
        content: "🛩️ Aerospace Engineers: Design aircraft\n⚙️ Mechanical Engineers: Design engines\n⚡ Electrical Engineers: Design avionics\n💻 Software Engineers: Write flight software\n🏗️ Structural Engineers: Analyze frames"
      },
      {
        title: "Manufacturing & Production",
        content: "🔧 Manufacturing Engineers\n👷 Technicians & Mechanics\n🔬 Quality Assurance\n📦 Supply Chain Managers"
      },
      {
        title: "Operations & Maintenance",
        content: "✈️ Pilots\n🔧 Aircraft Maintenance Technicians\n📡 Avionics Technicians\n🎯 Flight Test Engineers"
      },
      {
        title: "Support Roles",
        content: "📊 Project Managers\n📝 Technical Writers\n💼 Sales & Marketing\n🎓 Researchers\n🏛️ Regulatory Specialists"
      }
    ],
    
    keyTakeaways: [
      "Aerospace has diverse roles from engineering to operations",
      "Engineers specialize in different areas",
      "Manufacturing and maintenance require skilled technicians",
      "Many career paths exist beyond being a pilot"
    ],
    
    vocabulary: [
      { term: "Avionics", definition: "Electronic systems used in aircraft" },
      { term: "AMT", definition: "Aircraft Maintenance Technician" },
      { term: "Quality Assurance", definition: "Ensuring products meet standards" }
    ]
  },
  
  {
    id: 5,
    title: "Career and Study Paths",
    unitNumber: 1,
    lessonNumber: 6,
    duration: "20 min",
    emoji: "🎓",
    
    introduction: "Becoming an aerospace engineer requires education, skills, and dedication. This lesson explores the path to a successful career.",
    
    sections: [
      {
        title: "Educational Requirements",
        content: "🎓 High School: Focus on math and science\n🏫 Bachelor's Degree: 4 years in Aerospace Engineering\n📚 Master's Degree: 2 years, optional specialization\n🔬 PhD: 4-6 years for research positions"
      },
      {
        title: "Essential Skills",
        content: "🧮 Technical: Math, physics, programming, CAD\n💡 Soft: Communication, teamwork, critical thinking\n🛠️ Practical: Building, testing, technical writing"
      },
      {
        title: "Career Progression",
        content: "1️⃣ Entry Level (0-3 years): $65k-$80k\n2️⃣ Mid-Level (3-7 years): $80k-$110k\n3️⃣ Senior Level (7-15 years): $110k-$150k\n4️⃣ Leadership (15+ years): $150k+"
      },
      {
        title: "Getting Started Today",
        content: "📖 For Students: Excel in math/science, join STEM clubs\n💼 For Career Changers: Online courses, learn CAD\n🌐 Free Resources: NASA, MIT OpenCourseWare\n🎯 Certifications: PE license, FAA certs"
      }
    ],
    
    keyTakeaways: [
      "Bachelor's degree typically required",
      "Strong math, physics, and programming skills essential",
      "Career progression from junior to senior to management",
      "Continuous learning important throughout career"
    ],
    
    vocabulary: [
      { term: "Bachelor's Degree", definition: "4-year undergraduate degree" },
      { term: "Internship", definition: "Temporary position for work experience" },
      { term: "CAD", definition: "Computer-Aided Design software" },
      { term: "PE License", definition: "Professional Engineer license" }
    ]
  }
];

export default unit1Lessons;
