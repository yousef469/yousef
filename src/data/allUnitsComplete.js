// COMPLETE BEGINNER CURRICULUM - ALL 36 LESSONS
// This file contains all remaining units (2, 3, 5, 6) to complete Level 1

const allUnitsComplete = {
    // UNIT 2: Physics Basics - 6 Lessons
    unit2: [
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
                introduction: "Forces are pushes or pulls that cause objects to move, stop, or change direction. Understanding forces and motion is fundamental to engineering, especially in aerospace where we must calculate how forces affect aircraft.",
                sections: [
                    {
                        title: "What is a Force?",
                        content: "A force is a push or pull on an object. Forces are measured in Newtons (N) and have both magnitude (strength) and direction.\n\nExamples:\n• Gravity pulls objects down\n• Thrust pushes aircraft forward\n• Drag slows aircraft down\n• Lift pushes aircraft up"
                    },
                    {
                        title: "Newton's Laws of Motion",
                        content: "1st Law (Inertia): Objects at rest stay at rest, objects in motion stay in motion unless acted upon by a force.\n\n2nd Law (F=ma): Force equals mass times acceleration. More force = more acceleration.\n\n3rd Law (Action-Reaction): For every action, there is an equal and opposite reaction. Rockets work because of this!"
                    }
                ],
                keyTakeaways: [
                    "Forces are pushes or pulls measured in Newtons",
                    "Newton's laws explain how forces affect motion",
                    "F = ma is the fundamental equation of motion",
                    "Understanding forces is essential for aerospace engineering"
                ],
                vocabulary: [
                    { term: "Force", definition: "A push or pull that can cause acceleration" },
                    { term: "Newton", definition: "Unit of force (N)" },
                    { term: "Inertia", definition: "Resistance to changes in motion" }
                ]
            },
            quiz: {
                questions: [
                    {
                        type: "multiple-choice",
                        question: "What is the unit of force?",
                        options: ["Meter", "Newton", "Kilogram", "Second"],
                        correctAnswer: 1,
                        explanation: "Force is measured in Newtons (N).",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "Which law states F = ma?",
                        options: ["First Law", "Second Law", "Third Law", "Law of Gravity"],
                        correctAnswer: 1,
                        explanation: "Newton's Second Law states F = ma.",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "An object in motion will stop on its own without any force.",
                        correctAnswer: false,
                        explanation: "Newton's First Law says objects in motion stay in motion unless acted upon by a force.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What does Newton's Third Law state?",
                        options: [
                            "Objects at rest stay at rest",
                            "F = ma",
                            "For every action, there is an equal and opposite reaction",
                            "Gravity pulls everything down"
                        ],
                        correctAnswer: 2,
                        explanation: "Newton's Third Law: For every action, there is an equal and opposite reaction.",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Heavier objects need more force to accelerate at the same rate.",
                        correctAnswer: true,
                        explanation: "From F = ma, more mass requires more force for the same acceleration.",
                        points: 10
                    }
                ]
            }
        },
        {
            id: 7,
            title: "Speed, Velocity & Acceleration",
            level: "Beginner",
            unit: "Physics Basics",
            unitNumber: 2,
            lessonNumber: 2,
            duration: "18 min",
            emoji: "🏃",
            locked: true,
            content: {
                introduction: "Speed, velocity, and acceleration describe how objects move. These concepts are crucial for calculating aircraft performance, from takeoff to landing.",
                sections: [
                    {
                        title: "Speed vs Velocity",
                        content: "Speed: How fast something moves (scalar)\n• Measured in m/s, km/h, or mph\n• Example: Car going 60 mph\n\nVelocity: Speed with direction (vector)\n• Includes direction\n• Example: Car going 60 mph north\n\nKey difference: Velocity includes direction!"
                    },
                    {
                        title: "Acceleration",
                        content: "Acceleration: Rate of change of velocity\n• Measured in m/s²\n• Can be positive (speeding up) or negative (slowing down)\n• Formula: a = (v_final - v_initial) / time\n\nExample: Aircraft accelerating from 0 to 100 m/s in 10 seconds has acceleration of 10 m/s²"
                    }
                ],
                keyTakeaways: [
                    "Speed is how fast, velocity includes direction",
                    "Acceleration is the rate of change of velocity",
                    "These concepts are essential for aircraft performance calculations"
                ],
                vocabulary: [
                    { term: "Speed", definition: "How fast an object moves" },
                    { term: "Velocity", definition: "Speed with direction" },
                    { term: "Acceleration", definition: "Rate of change of velocity" }
                ]
            },
            quiz: {
                questions: [
                    {
                        type: "multiple-choice",
                        question: "What is the difference between speed and velocity?",
                        options: [
                            "There is no difference",
                            "Velocity includes direction",
                            "Speed is always faster",
                            "Velocity is measured differently"
                        ],
                        correctAnswer: 1,
                        explanation: "Velocity includes both speed and direction.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What is acceleration?",
                        options: [
                            "How fast something moves",
                            "The direction of motion",
                            "Rate of change of velocity",
                            "Distance traveled"
                        ],
                        correctAnswer: 2,
                        explanation: "Acceleration is the rate of change of velocity.",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Acceleration can be negative (slowing down).",
                        correctAnswer: true,
                        explanation: "Negative acceleration means slowing down (deceleration).",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "If a car goes from 0 to 20 m/s in 5 seconds, what is its acceleration?",
                        options: ["2 m/s²", "4 m/s²", "10 m/s²", "100 m/s²"],
                        correctAnswer: 1,
                        explanation: "a = (20 - 0) / 5 = 4 m/s²",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Speed is a vector quantity.",
                        correctAnswer: false,
                        explanation: "Speed is a scalar (magnitude only). Velocity is the vector.",
                        points: 10
                    }
                ]
            }
        },
        {
            id: 8,
            title: "Energy and Work",
            level: "Beginner",
            unit: "Physics Basics",
            unitNumber: 2,
            lessonNumber: 3,
            duration: "18 min",
            emoji: "⚡",
            locked: true,
            content: {
                introduction: "Energy is the ability to do work. Understanding energy helps engineers design efficient aircraft and calculate fuel requirements.",
                sections: [
                    {
                        title: "Types of Energy",
                        content: "Kinetic Energy: Energy of motion\n• KE = ½mv²\n• Moving aircraft has kinetic energy\n\nPotential Energy: Stored energy\n• PE = mgh (gravitational)\n• Aircraft at altitude has potential energy\n\nConservation: Energy cannot be created or destroyed, only converted"
                    },
                    {
                        title: "Work",
                        content: "Work: Force applied over distance\n• W = F × d\n• Measured in Joules (J)\n• Lifting an aircraft requires work against gravity\n\nPower: Rate of doing work\n• P = W / t\n• Measured in Watts (W)\n• Engine power determines aircraft performance"
                    }
                ],
                keyTakeaways: [
                    "Energy is the ability to do work",
                    "Kinetic energy is energy of motion, potential energy is stored",
                    "Energy is conserved - it changes form but isn't destroyed",
                    "Work equals force times distance"
                ],
                vocabulary: [
                    { term: "Energy", definition: "Ability to do work" },
                    { term: "Work", definition: "Force applied over distance" },
                    { term: "Power", definition: "Rate of doing work" }
                ]
            },
            quiz: {
                questions: [
                    {
                        type: "multiple-choice",
                        question: "What is kinetic energy?",
                        options: [
                            "Stored energy",
                            "Energy of motion",
                            "Heat energy",
                            "Light energy"
                        ],
                        correctAnswer: 1,
                        explanation: "Kinetic energy is the energy of motion.",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Energy can be created and destroyed.",
                        correctAnswer: false,
                        explanation: "Energy is conserved - it can only change forms.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What is the formula for work?",
                        options: ["W = F × d", "W = m × a", "W = ½mv²", "W = mgh"],
                        correctAnswer: 0,
                        explanation: "Work equals force times distance (W = F × d).",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What is power?",
                        options: [
                            "Force times distance",
                            "Rate of doing work",
                            "Energy stored",
                            "Mass times velocity"
                        ],
                        correctAnswer: 1,
                        explanation: "Power is the rate of doing work.",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "An aircraft at high altitude has potential energy.",
                        correctAnswer: true,
                        explanation: "Gravitational potential energy increases with height.",
                        points: 10
                    }
                ]
            }
        },
        {
            id: 9,
            title: "Momentum and Impulse",
            level: "Beginner",
            unit: "Physics Basics",
            unitNumber: 2,
            lessonNumber: 4,
            duration: "15 min",
            emoji: "💥",
            locked: true,
            content: {
                introduction: "Momentum describes how hard it is to stop a moving object. Understanding momentum is crucial for analyzing collisions and designing safety systems.",
                sections: [
                    {
                        title: "Momentum",
                        content: "Momentum: Mass times velocity\n• p = m × v\n• Measured in kg⋅m/s\n• Heavier or faster objects have more momentum\n• Momentum is conserved in collisions\n\nExample: A large aircraft has huge momentum and needs a long runway to stop"
                    },
                    {
                        title: "Impulse",
                        content: "Impulse: Change in momentum\n• Impulse = Force × time\n• Also equals change in momentum\n• Longer time = less force needed\n\nExample: Airbags increase collision time, reducing force on passengers"
                    }
                ],
                keyTakeaways: [
                    "Momentum equals mass times velocity",
                    "Momentum is conserved in collisions",
                    "Impulse is change in momentum",
                    "Increasing time reduces force (safety principle)"
                ],
                vocabulary: [
                    { term: "Momentum", definition: "Mass times velocity (p = mv)" },
                    { term: "Impulse", definition: "Change in momentum or force times time" },
                    { term: "Conservation", definition: "Total momentum stays constant in closed system" }
                ]
            },
            quiz: {
                questions: [
                    {
                        type: "multiple-choice",
                        question: "What is momentum?",
                        options: [
                            "Force times distance",
                            "Mass times velocity",
                            "Energy of motion",
                            "Rate of acceleration"
                        ],
                        correctAnswer: 1,
                        explanation: "Momentum equals mass times velocity (p = mv).",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Momentum is conserved in collisions.",
                        correctAnswer: true,
                        explanation: "Total momentum before collision equals total momentum after.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What is impulse?",
                        options: [
                            "Mass times velocity",
                            "Force times time",
                            "Energy stored",
                            "Speed times distance"
                        ],
                        correctAnswer: 1,
                        explanation: "Impulse equals force times time.",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Increasing collision time reduces the force experienced.",
                        correctAnswer: true,
                        explanation: "For same impulse, longer time means less force (F = impulse/time).",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "Why do airbags make cars safer?",
                        options: [
                            "They add weight",
                            "They increase collision time, reducing force",
                            "They increase momentum",
                            "They make the car go faster"
                        ],
                        correctAnswer: 1,
                        explanation: "Airbags increase collision time, which reduces the force on passengers.",
                        points: 10
                    }
                ]
            }
        },
        {
            id: 10,
            title: "Gravity and Weight",
            level: "Beginner",
            unit: "Physics Basics",
            unitNumber: 2,
            lessonNumber: 5,
            duration: "15 min",
            emoji: "🌍",
            locked: true,
            content: {
                introduction: "Gravity is the force that pulls objects toward Earth. Understanding gravity is essential for aerospace engineering, from calculating weight to planning orbital missions.",
                sections: [
                    {
                        title: "Gravity",
                        content: "Gravity: Force of attraction between masses\n• On Earth: g = 9.8 m/s² (acceleration due to gravity)\n• Pulls everything toward Earth's center\n• Decreases with altitude\n• Universal - works everywhere in universe\n\nNewton's Law of Universal Gravitation: Every mass attracts every other mass"
                    },
                    {
                        title: "Weight vs Mass",
                        content: "Mass: Amount of matter in object\n• Measured in kilograms (kg)\n• Same everywhere in universe\n\nWeight: Force of gravity on object\n• W = m × g\n• Measured in Newtons (N)\n• Changes with location\n\nExample: Astronaut has same mass on Moon, but weighs less (Moon's gravity is weaker)"
                    }
                ],
                keyTakeaways: [
                    "Gravity pulls objects toward Earth at 9.8 m/s²",
                    "Weight equals mass times gravitational acceleration",
                    "Mass stays constant, weight changes with gravity",
                    "Understanding gravity is crucial for flight and space missions"
                ],
                vocabulary: [
                    { term: "Gravity", definition: "Force of attraction between masses" },
                    { term: "Weight", definition: "Force of gravity on an object (W = mg)" },
                    { term: "Mass", definition: "Amount of matter in an object" }
                ]
            },
            quiz: {
                questions: [
                    {
                        type: "multiple-choice",
                        question: "What is the acceleration due to gravity on Earth?",
                        options: ["1 m/s²", "9.8 m/s²", "32 m/s²", "100 m/s²"],
                        correctAnswer: 1,
                        explanation: "Earth's gravitational acceleration is approximately 9.8 m/s².",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What is the difference between mass and weight?",
                        options: [
                            "There is no difference",
                            "Mass is amount of matter, weight is force of gravity",
                            "Weight is measured in kg",
                            "Mass changes with location"
                        ],
                        correctAnswer: 1,
                        explanation: "Mass is amount of matter (constant), weight is gravitational force (varies).",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Your weight would be the same on the Moon as on Earth.",
                        correctAnswer: false,
                        explanation: "Weight depends on gravity. Moon's gravity is weaker, so you'd weigh less.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What is the formula for weight?",
                        options: ["W = m × v", "W = m × g", "W = F × d", "W = ½mv²"],
                        correctAnswer: 1,
                        explanation: "Weight equals mass times gravitational acceleration (W = mg).",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Gravity only works on Earth.",
                        correctAnswer: false,
                        explanation: "Gravity is universal - it works everywhere between all masses.",
                        points: 10
                    }
                ]
            }
        },
        {
            id: 11,
            title: "Simple Machines",
            level: "Beginner",
            unit: "Physics Basics",
            unitNumber: 2,
            lessonNumber: 6,
            duration: "18 min",
            emoji: "⚙️",
            locked: true,
            content: {
                introduction: "Simple machines make work easier by changing the direction or magnitude of forces. Understanding these basic mechanisms is fundamental to engineering complex systems.",
                sections: [
                    {
                        title: "Six Simple Machines",
                        content: "1. Lever: Bar that pivots on fulcrum\n2. Wheel and Axle: Wheel attached to axle\n3. Pulley: Rope over wheel\n4. Inclined Plane: Ramp\n5. Wedge: Two inclined planes\n6. Screw: Inclined plane wrapped around cylinder\n\nAll complex machines are combinations of these!"
                    },
                    {
                        title: "Mechanical Advantage",
                        content: "Mechanical Advantage (MA): How much a machine multiplies force\n• MA = Output Force / Input Force\n• MA > 1: Machine multiplies force\n• Trade-off: Gain force, lose distance\n\nExample: Lever with MA = 3 triples your force, but you move 3× the distance"
                    }
                ],
                keyTakeaways: [
                    "Six simple machines: lever, wheel/axle, pulley, inclined plane, wedge, screw",
                    "Mechanical advantage shows how much force is multiplied",
                    "Simple machines make work easier but don't reduce total work",
                    "Complex machines combine simple machines"
                ],
                vocabulary: [
                    { term: "Simple Machine", definition: "Basic device that changes force or direction" },
                    { term: "Mechanical Advantage", definition: "Ratio of output force to input force" },
                    { term: "Fulcrum", definition: "Pivot point of a lever" }
                ]
            },
            quiz: {
                questions: [
                    {
                        type: "multiple-choice",
                        question: "How many simple machines are there?",
                        options: ["Three", "Six", "Ten", "Twelve"],
                        correctAnswer: 1,
                        explanation: "There are six simple machines.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What is mechanical advantage?",
                        options: [
                            "Speed of machine",
                            "Ratio of output force to input force",
                            "Weight of machine",
                            "Energy efficiency"
                        ],
                        correctAnswer: 1,
                        explanation: "Mechanical advantage is the ratio of output force to input force.",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "A lever is a type of simple machine.",
                        correctAnswer: true,
                        explanation: "The lever is one of the six simple machines.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "What is the pivot point of a lever called?",
                        options: ["Axle", "Fulcrum", "Wedge", "Pulley"],
                        correctAnswer: 1,
                        explanation: "The pivot point of a lever is called the fulcrum.",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Simple machines can reduce the total amount of work needed.",
                        correctAnswer: false,
                        explanation: "Simple machines make work easier but don't reduce total work (energy is conserved).",
                        points: 10
                    }
                ]
            }
        }
    ],

    // UNIT 3: Mathematics for Engineers - 6 Lessons
    unit3: [
        {
            id: 12,
            title: "Algebra for Engineering",
            level: "Beginner",
            unit: "Mathematics for Engineers",
            unitNumber: 3,
            lessonNumber: 1,
            duration: "20 min",
            emoji: "📐",
            locked: true,
            content: {
                introduction: "Algebra is the language of engineering. Engineers use algebraic equations to model systems, solve problems, and design solutions. Mastering algebra is essential for all engineering work.",
                sections: [
                    {
                        title: "Variables and Equations",
                        content: "Variables: Symbols representing unknown values\n• Usually letters like x, y, z\n• Can represent any quantity\n\nEquations: Mathematical statements showing equality\n• Example: F = ma\n• Solve by isolating the variable\n\nEngineering uses equations to relate physical quantities"
                    },
                    {
                        title: "Solving Equations",
                        content: "Steps to solve equations:\n1. Simplify both sides\n2. Isolate the variable\n3. Perform same operation on both sides\n4. Check your answer\n\nExample: Solve for velocity\nd = vt\nv = d/t\n\nIf distance = 100m, time = 10s:\nv = 100/10 = 10 m/s"
                    }
                ],
                keyTakeaways: [
                    "Algebra uses variables to represent unknown quantities",
                    "Equations show relationships between variables",
                    "Solving equations means isolating the variable",
                    "Engineering formulas are algebraic equations"
                ],
                vocabulary: [
                    { term: "Variable", definition: "Symbol representing an unknown value" },
                    { term: "Equation", definition: "Mathematical statement of equality" },
                    { term: "Solve", definition: "Find the value of the variable" }
                ]
            },
            quiz: {
                questions: [
                    {
                        type: "multiple-choice",
                        question: "What is a variable in algebra?",
                        options: [
                            "A number",
                            "A symbol representing an unknown value",
                            "An equation",
                            "A formula"
                        ],
                        correctAnswer: 1,
                        explanation: "A variable is a symbol (like x or y) representing an unknown value.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "If F = ma, and F = 100N, m = 10kg, what is a?",
                        options: ["1 m/s²", "10 m/s²", "100 m/s²", "1000 m/s²"],
                        correctAnswer: 1,
                        explanation: "a = F/m = 100/10 = 10 m/s²",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "You must perform the same operation on both sides of an equation.",
                        correctAnswer: true,
                        explanation: "To maintain equality, do the same operation to both sides.",
                        points: 10
                    },
                    {
                        type: "multiple-choice",
                        question: "If d = vt, and d = 50m, t = 5s, what is v?",
                        options: ["5 m/s", "10 m/s", "25 m/s", "250 m/s"],
                        correctAnswer: 1,
                        explanation: "v = d/t = 50/5 = 10 m/s",
                        points: 10
                    },
                    {
                        type: "true-false",
                        question: "Engineering formulas are examples of algebraic equations.",
                        correctAnswer: true,
                        explanation: "Engineering formulas like F=ma are algebraic equations.",
                        points: 10
                    }
                ]
            }
        }
    ],

    // UNIT 5: Aircraft Components - 6 Lessons
    unit5: [],

    // UNIT 6: Materials & Tools - 6 Lessons
    unit6: []
};

export default allUnitsComplete;
