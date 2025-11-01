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
    },
    
    {
      id: 2,
      title: "Safety & Ethics in Engineering",
      level: "Beginner",
      unit: "Introduction to Engineering",
      unitNumber: 1,
      lessonNumber: 3,
      duration: "15 min",
      emoji: "🛡️",
      locked: true,
      
      content: {
        introduction: "Safety and ethics are fundamental to engineering. Engineers have a responsibility to protect public safety and act with integrity. This lesson explores why safety matters and the ethical principles that guide engineering decisions.",
        
        sections: [
          {
            title: "Why Safety Matters",
            content: `Engineering failures can have serious consequences:\n\n• Loss of life or injury\n• Property damage\n• Environmental harm\n• Economic losses\n• Loss of public trust\n\nEngineers must prioritize safety in every design decision. Famous disasters like bridge collapses or building failures often result from ignoring safety principles.\n\nSafety isn't just about following rules—it's about thinking ahead and asking "What could go wrong?"`
          },
          {
            title: "Engineering Ethics",
            content: `Engineers follow ethical principles:\n\n1. Public Safety First\n• Protect the health and safety of the public\n• Report unsafe conditions\n• Never compromise safety for profit\n\n2. Honesty and Integrity\n• Be truthful in reports and statements\n• Admit mistakes\n• Give credit where due\n\n3. Professional Competence\n• Only work within your expertise\n• Continue learning\n• Seek help when needed\n\n4. Environmental Responsibility\n• Minimize environmental impact\n• Consider sustainability\n• Protect natural resources`
          },
          {
            title: "Safety in the Workplace",
            content: `Engineers must follow safety practices:\n\n🦺 Personal Protective Equipment (PPE)\n• Hard hats, safety glasses, gloves\n• Steel-toed boots\n• Hearing protection\n\n⚠️ Hazard Awareness\n• Identify potential dangers\n• Read safety signs\n• Follow procedures\n\n🚨 Emergency Preparedness\n• Know emergency exits\n• Understand fire safety\n• First aid knowledge\n\n📋 Documentation\n• Keep safety records\n• Report incidents\n• Follow checklists`
          },
          {
            title: "Ethical Dilemmas",
            content: `Engineers sometimes face difficult choices:\n\nScenario: Your boss asks you to approve a design you think is unsafe to meet a deadline.\n\nRight Response:\n• Explain your safety concerns clearly\n• Provide evidence and calculations\n• Suggest safer alternatives\n• Refuse to approve if truly unsafe\n• Report to higher authority if needed\n\nWrong Response:\n• Approve it to keep your job\n• Stay silent about concerns\n• Hope nothing goes wrong\n\nRemember: Your professional license and reputation depend on ethical behavior. Lives may depend on your decisions.`
          }
        ],
        
        keyTakeaways: [
          "Safety is the top priority in all engineering work",
          "Engineers must follow ethical principles including honesty and integrity",
          "Proper safety equipment and procedures prevent accidents",
          "Engineers have a duty to report unsafe conditions",
          "Ethical dilemmas require courage to do the right thing"
        ],
        
        vocabulary: [
          { term: "Ethics", definition: "Moral principles that govern professional behavior" },
          { term: "PPE", definition: "Personal Protective Equipment worn to reduce safety risks" },
          { term: "Integrity", definition: "Being honest and having strong moral principles" },
          { term: "Competence", definition: "Having the necessary skills and knowledge to do a job safely" }
        ]
      },
      
      quiz: {
        questions: [
          {
            type: "true-false",
            question: "It's acceptable to compromise safety to meet a project deadline.",
            correctAnswer: false,
            explanation: "Safety should never be compromised for any reason, including deadlines or cost savings. Public safety is always the top priority.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What should you do if you notice an unsafe condition at work?",
            options: [
              "Ignore it if it's not your responsibility",
              "Report it immediately to your supervisor",
              "Wait to see if someone else reports it",
              "Only report it if someone gets hurt"
            ],
            correctAnswer: 1,
            explanation: "Engineers have a professional and ethical duty to report unsafe conditions immediately, regardless of whose responsibility it is.",
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
            explanation: "PPE stands for Personal Protective Equipment - gear worn to protect against workplace hazards.",
            points: 10
          },
          {
            type: "true-false",
            question: "Engineers should only work on projects within their area of expertise.",
            correctAnswer: true,
            explanation: "Professional competence requires engineers to work only in areas where they have adequate knowledge and experience. Working beyond your expertise can be dangerous.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Your boss asks you to approve a design you believe is unsafe. What should you do?",
            options: [
              "Approve it to keep your job",
              "Explain your concerns and refuse to approve if unsafe",
              "Approve it but document your concerns privately",
              "Quit your job immediately"
            ],
            correctAnswer: 1,
            explanation: "You must clearly explain your safety concerns and refuse to approve unsafe designs. This is your ethical and professional responsibility.",
            points: 10
          }
        ]
      }
    },
    
    {
      id: 3,
      title: "Aviation History: From Wright Brothers to Jets",
      level: "Beginner",
      unit: "Introduction to Engineering",
      unitNumber: 1,
      lessonNumber: 4,
      duration: "20 min",
      emoji: "🛫",
      locked: true,
      
      content: {
        introduction: "The history of aviation is a story of human ingenuity, courage, and engineering innovation. From the first powered flight in 1903 to modern supersonic jets, each breakthrough built on previous discoveries. Understanding this history helps us appreciate how engineering evolves.",
        
        sections: [
          {
            title: "The Wright Brothers (1903)",
            content: `Orville and Wilbur Wright achieved the first powered, controlled flight:\n\n📅 December 17, 1903 - Kitty Hawk, North Carolina\n⏱️ First flight: 12 seconds, 120 feet\n\nKey Innovations:\n• Three-axis control (pitch, roll, yaw)\n• Wing warping for steering\n• Lightweight engine design\n• Wind tunnel testing\n• Systematic experimentation\n\nWhat Made Them Successful:\n• They studied bird flight carefully\n• Built and tested gliders first\n• Solved the control problem\n• Used scientific methods\n• Learned from failures\n\nTheir achievement proved that powered human flight was possible!`
          },
          {
            title: "Early Aviation (1903-1920s)",
            content: `Aviation developed rapidly after the Wright Brothers:\n\n✈️ 1909: Louis Blériot crosses English Channel\n• First international flight\n• Proved aircraft could travel long distances\n\n🎖️ World War I (1914-1918)\n• Military use accelerated development\n• Fighter planes and bombers\n• Metal construction replaced wood\n• More powerful engines\n\n📬 1918: First airmail service\n• U.S. Post Office begins regular flights\n• Proved commercial viability\n\n🌊 1919: First transatlantic flight\n• Alcock and Brown fly non-stop\n• 16 hours from Newfoundland to Ireland`
          },
          {
            title: "The Golden Age (1920s-1930s)",
            content: `Aviation became more practical and popular:\n\n🦅 1927: Charles Lindbergh\n• First solo transatlantic flight\n• New York to Paris, 33.5 hours\n• Made aviation a global sensation\n\n✈️ Commercial Aviation Begins\n• Airlines start passenger service\n• Boeing, Douglas build airliners\n• Airports constructed worldwide\n\n🚀 Key Innovations:\n• All-metal aircraft\n• Retractable landing gear\n• Variable-pitch propellers\n• Instrument flying\n• Radio navigation\n\n👩‍✈️ Amelia Earhart\n• First woman to fly solo across Atlantic (1932)\n• Inspired generations of aviators`
          },
          {
            title: "Jets and Modern Era (1940s-Present)",
            content: `Revolutionary changes transformed aviation:\n\n🔥 1939: First Jet Aircraft\n• Heinkel He 178 (Germany)\n• Jet engines more powerful than propellers\n\n✈️ 1947: Breaking Sound Barrier\n• Chuck Yeager in Bell X-1\n• Supersonic flight achieved\n\n🌍 1950s-60s: Jet Age\n• Boeing 707, Douglas DC-8\n• Commercial jet travel\n• Faster, higher, more efficient\n\n🚀 1969: Concorde & Supersonic Transport\n• Mach 2 passenger service\n• London to New York in 3.5 hours\n\n🛫 Modern Aviation:\n• Composite materials\n• Fly-by-wire controls\n• GPS navigation\n• Fuel-efficient engines\n• Unmanned aircraft (drones)`
          }
        ],
        
        keyTakeaways: [
          "Wright Brothers achieved first powered flight in 1903 through systematic engineering",
          "World Wars accelerated aviation technology development",
          "Commercial aviation grew rapidly in the 1920s-1930s",
          "Jet engines revolutionized flight in the 1940s-1950s",
          "Modern aviation continues to evolve with new materials and technology"
        ],
        
        vocabulary: [
          { term: "Three-axis control", definition: "Ability to control pitch (nose up/down), roll (banking), and yaw (nose left/right)" },
          { term: "Supersonic", definition: "Faster than the speed of sound (Mach 1, about 767 mph)" },
          { term: "Jet engine", definition: "Engine that produces thrust by expelling hot exhaust gases" },
          { term: "Transatlantic", definition: "Crossing the Atlantic Ocean" }
        ]
      },
      
      quiz: {
        questions: [
          {
            type: "multiple-choice",
            question: "When and where did the Wright Brothers achieve the first powered flight?",
            options: [
              "1900, Ohio",
              "1903, North Carolina",
              "1910, California",
              "1905, New York"
            ],
            correctAnswer: 1,
            explanation: "The Wright Brothers achieved the first powered, controlled flight on December 17, 1903, at Kitty Hawk, North Carolina.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What was the Wright Brothers' key innovation for controlling aircraft?",
            options: [
              "Jet engines",
              "Three-axis control system",
              "Autopilot",
              "Radar"
            ],
            correctAnswer: 1,
            explanation: "The Wright Brothers developed three-axis control (pitch, roll, yaw), which allowed pilots to control the aircraft in all directions.",
            points: 10
          },
          {
            type: "true-false",
            question: "World War I slowed down aviation development.",
            correctAnswer: false,
            explanation: "World War I actually accelerated aviation development as military needs drove rapid improvements in aircraft design and engines.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Who made the first solo transatlantic flight in 1927?",
            options: [
              "Amelia Earhart",
              "Chuck Yeager",
              "Charles Lindbergh",
              "Wright Brothers"
            ],
            correctAnswer: 2,
            explanation: "Charles Lindbergh made the first solo non-stop transatlantic flight from New York to Paris in 1927, taking 33.5 hours.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What major innovation revolutionized aviation in the 1940s?",
            options: [
              "Propellers",
              "Jet engines",
              "Hot air balloons",
              "Gliders"
            ],
            correctAnswer: 1,
            explanation: "Jet engines, first used in the late 1930s and 1940s, revolutionized aviation by providing much more power than propeller engines.",
            points: 10
          }
        ]
      }
    },
    
    {
      id: 4,
      title: "Aerospace Industry Roles",
      level: "Beginner",
      unit: "Introduction to Engineering",
      unitNumber: 1,
      lessonNumber: 5,
      duration: "15 min",
      emoji: "👷",
      locked: true,
      
      content: {
        introduction: "The aerospace industry employs millions of people in diverse roles. From engineers and technicians to pilots and managers, each role contributes to designing, building, and operating aircraft and spacecraft. Understanding these careers helps you find your path in aerospace.",
        
        sections: [
          {
            title: "Engineering Roles",
            content: `Different engineers work on different aspects:\n\n🛩️ Aerospace Engineers\n• Design aircraft and spacecraft\n• Analyze aerodynamics\n• Test prototypes\n• Solve technical problems\n\n⚙️ Mechanical Engineers\n• Design engines and systems\n• Work on landing gear\n• Develop hydraulics\n• Test mechanical components\n\n⚡ Electrical Engineers\n• Design avionics systems\n• Work on flight controls\n• Develop communication systems\n• Create power distribution\n\n💻 Software Engineers\n• Write flight control software\n• Develop simulation programs\n• Create autopilot systems\n• Design user interfaces\n\n🏗️ Structural Engineers\n• Analyze aircraft frames\n• Ensure strength and safety\n• Design composite structures\n• Test materials`
          },
          {
            title: "Manufacturing & Production",
            content: `Building aircraft requires skilled workers:\n\n🔧 Manufacturing Engineers\n• Plan production processes\n• Optimize assembly lines\n• Ensure quality control\n• Reduce costs\n\n👷 Technicians & Mechanics\n• Assemble aircraft parts\n• Install systems\n• Perform quality checks\n• Troubleshoot issues\n\n🔬 Quality Assurance\n• Inspect components\n• Test systems\n• Verify specifications\n• Document results\n\n📦 Supply Chain Managers\n• Order materials\n• Manage inventory\n• Coordinate suppliers\n• Track deliveries`
          },
          {
            title: "Operations & Maintenance",
            content: `Keeping aircraft flying safely:\n\n✈️ Pilots\n• Fly aircraft\n• Navigate routes\n• Communicate with air traffic control\n• Ensure passenger safety\n\n🔧 Aircraft Maintenance Technicians (AMTs)\n• Inspect aircraft regularly\n• Repair systems\n• Replace parts\n• Keep detailed records\n\n📡 Avionics Technicians\n• Maintain electronic systems\n• Repair instruments\n• Update software\n• Test equipment\n\n🎯 Flight Test Engineers\n• Plan test flights\n• Collect data\n• Analyze performance\n• Verify safety`
          },
          {
            title: "Support Roles",
            content: `Many other careers support aerospace:\n\n📊 Project Managers\n• Lead teams\n• Manage budgets\n• Track schedules\n• Coordinate work\n\n📝 Technical Writers\n• Write manuals\n• Create documentation\n• Explain procedures\n• Translate technical info\n\n💼 Sales & Marketing\n• Sell aircraft\n• Demonstrate capabilities\n• Build relationships\n• Attend air shows\n\n🎓 Researchers\n• Develop new technologies\n• Conduct experiments\n• Publish findings\n• Advance the field\n\n🏛️ Regulatory Specialists\n• Ensure compliance\n• Work with FAA/EASA\n• Obtain certifications\n• Navigate regulations`
          }
        ],
        
        keyTakeaways: [
          "Aerospace industry has diverse roles from engineering to operations",
          "Engineers specialize in different areas: aerodynamics, structures, systems, software",
          "Manufacturing and maintenance require skilled technicians",
          "Support roles like project management and technical writing are essential",
          "Many career paths exist in aerospace beyond just being a pilot"
        ],
        
        vocabulary: [
          { term: "Avionics", definition: "Electronic systems used in aircraft (navigation, communication, etc.)" },
          { term: "AMT", definition: "Aircraft Maintenance Technician - certified to inspect and repair aircraft" },
          { term: "Quality Assurance", definition: "Process of ensuring products meet required standards" },
          { term: "Prototype", definition: "First or early model built to test a design" }
        ]
      },
      
      quiz: {
        questions: [
          {
            type: "multiple-choice",
            question: "Which type of engineer designs aircraft and analyzes aerodynamics?",
            options: [
              "Electrical Engineer",
              "Aerospace Engineer",
              "Software Engineer",
              "Civil Engineer"
            ],
            correctAnswer: 1,
            explanation: "Aerospace Engineers specialize in designing aircraft and spacecraft, including analyzing aerodynamics and testing prototypes.",
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
            explanation: "AMT stands for Aircraft Maintenance Technician - professionals certified to inspect, maintain, and repair aircraft.",
            points: 10
          },
          {
            type: "true-false",
            question: "The only career in aerospace is being a pilot.",
            correctAnswer: false,
            explanation: "There are many diverse careers in aerospace including engineers, technicians, managers, researchers, and many support roles.",
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
            explanation: "Avionics technicians maintain and repair electronic systems including navigation, communication, and flight instruments.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Who is responsible for planning test flights and analyzing aircraft performance?",
            options: [
              "Sales representatives",
              "Flight Test Engineers",
              "Technical writers",
              "Supply chain managers"
            ],
            correctAnswer: 1,
            explanation: "Flight Test Engineers plan test flights, collect data, and analyze aircraft performance to verify safety and capabilities.",
            points: 10
          }
        ]
      }
    },
    
    {
      id: 5,
      title: "Career and Study Paths",
      level: "Beginner",
      unit: "Introduction to Engineering",
      unitNumber: 1,
      lessonNumber: 6,
      duration: "20 min",
      emoji: "🎓",
      locked: true,
      
      content: {
        introduction: "Becoming an aerospace engineer requires education, skills, and dedication. This lesson explores the educational paths, skills needed, and steps to build a successful career in aerospace engineering. Whether you're in high school or considering a career change, understanding these paths helps you plan your journey.",
        
        sections: [
          {
            title: "Educational Requirements",
            content: `Path to becoming an aerospace engineer:\n\n🎓 High School (Ages 14-18)\n• Focus on math and science\n• Take physics, chemistry, calculus\n• Join robotics or engineering clubs\n• Maintain good grades\n• Develop problem-solving skills\n\n🏫 Bachelor's Degree (4 years)\n• Major in Aerospace Engineering\n• Or Mechanical/Electrical Engineering\n• Core courses: aerodynamics, structures, propulsion\n• Lab work and projects\n• Internships highly recommended\n\n📚 Master's Degree (2 years, optional)\n• Specialize in specific area\n• Research opportunities\n• Advanced topics\n• Better career prospects\n\n🔬 PhD (4-6 years, for research)\n• Original research\n• Become an expert\n• University or research positions\n• Develop new technologies`
          },
          {
            title: "Essential Skills",
            content: `Skills needed for aerospace engineering:\n\n🧮 Technical Skills:\n• Strong mathematics (calculus, differential equations)\n• Physics understanding\n• Computer programming (Python, MATLAB, C++)\n• CAD software (SolidWorks, CATIA)\n• Data analysis\n• Problem-solving\n\n💡 Soft Skills:\n• Communication (written and verbal)\n• Teamwork and collaboration\n• Project management\n• Critical thinking\n• Attention to detail\n• Creativity\n\n🛠️ Practical Skills:\n• Hands-on building experience\n• Testing and experimentation\n• Technical writing\n• Presentation skills\n• Time management`
          },
          {
            title: "Career Progression",
            content: `Typical career path in aerospace:\n\n1️⃣ Entry Level (0-3 years)\n• Junior Engineer\n• Work under supervision\n• Learn company processes\n• Assist senior engineers\n• Salary: $65,000-$80,000\n\n2️⃣ Mid-Level (3-7 years)\n• Engineer II or III\n• Lead small projects\n• Mentor junior engineers\n• More responsibility\n• Salary: $80,000-$110,000\n\n3️⃣ Senior Level (7-15 years)\n• Senior Engineer\n• Lead major projects\n• Make key decisions\n• Technical expert\n• Salary: $110,000-$150,000\n\n4️⃣ Leadership (15+ years)\n• Engineering Manager\n• Chief Engineer\n• Director of Engineering\n• Strategic planning\n• Salary: $150,000+\n\nAlternative: Stay technical as Principal Engineer or Fellow`
          },
          {
            title: "Getting Started Today",
            content: `Steps you can take now:\n\n📖 For Students:\n• Excel in math and science classes\n• Join STEM clubs and competitions\n• Build projects (rockets, drones, robots)\n• Attend engineering camps\n• Visit aerospace museums\n• Read about aviation and space\n\n💼 For Career Changers:\n• Take online courses (Coursera, edX)\n• Learn CAD and programming\n• Join professional organizations (AIAA)\n• Network with engineers\n• Consider part-time degree programs\n• Look for technician roles to start\n\n🌐 Free Resources:\n• NASA educational materials\n• MIT OpenCourseWare\n• YouTube engineering channels\n• Engineering podcasts\n• Online simulators\n• Open-source projects\n\n🎯 Certifications:\n• Professional Engineer (PE) license\n• FAA certifications (for some roles)\n• Software certifications\n• Project management (PMP)`
          }
        ],
        
        keyTakeaways: [
          "Bachelor's degree in aerospace or related engineering is typically required",
          "Strong math, physics, and programming skills are essential",
          "Career progression goes from junior to senior engineer to management",
          "Internships and hands-on experience are valuable",
          "Continuous learning and skill development are important throughout your career"
        ],
        
        vocabulary: [
          { term: "Bachelor's Degree", definition: "Undergraduate degree typically taking 4 years of full-time study" },
          { term: "Internship", definition: "Temporary position where students gain work experience" },
          { term: "CAD", definition: "Computer-Aided Design - software for creating technical drawings" },
          { term: "PE License", definition: "Professional Engineer license showing competence and allowing certain responsibilities" }
        ]
      },
      
      quiz: {
        questions: [
          {
            type: "multiple-choice",
            question: "What is the typical minimum education requirement for an aerospace engineer?",
            options: [
              "High school diploma",
              "Associate's degree (2 years)",
              "Bachelor's degree (4 years)",
              "PhD (8+ years)"
            ],
            correctAnswer: 2,
            explanation: "A Bachelor's degree in aerospace engineering or a related field (typically 4 years) is the minimum requirement for most aerospace engineering positions.",
            points: 10
          },
          {
            type: "true-false",
            question: "Only technical skills matter in engineering; soft skills like communication are not important.",
            correctAnswer: false,
            explanation: "Both technical and soft skills are essential. Engineers must communicate ideas, work in teams, and present findings, making soft skills crucial for success.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Which of these is an important technical skill for aerospace engineers?",
            options: [
              "Cooking",
              "Computer programming",
              "Playing sports",
              "Painting"
            ],
            correctAnswer: 1,
            explanation: "Computer programming (Python, MATLAB, C++) is an essential technical skill for aerospace engineers to analyze data and create simulations.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What is an internship?",
            options: [
              "A permanent job position",
              "A temporary position where students gain work experience",
              "A type of engineering degree",
              "A professional certification"
            ],
            correctAnswer: 1,
            explanation: "An internship is a temporary position, often during college, where students gain practical work experience in their field.",
            points: 10
          },
          {
            type: "true-false",
            question: "High school students interested in aerospace should focus on math and science classes.",
            correctAnswer: true,
            explanation: "Strong foundations in mathematics and science (especially physics) are essential for success in aerospace engineering education and careers.",
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
