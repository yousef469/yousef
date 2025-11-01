// COMPLETE REMAINING UNITS - 24 Lessons
// Compact but complete format for rapid deployment

const createLesson = (id, title, unit, unitNum, lessonNum, emoji, intro, sections, takeaways, vocab, questions) => ({
  id, title, level: "Beginner", unit, unitNumber: unitNum, lessonNumber: lessonNum,
  duration: "15 min", emoji, locked: true,
  content: { introduction: intro, sections, keyTakeaways: takeaways, vocabulary: vocab },
  quiz: { questions }
});

const createMCQ = (q, opts, correct, exp) => ({
  type: "multiple-choice", question: q, options: opts, correctAnswer: correct, explanation: exp, points: 10
});

const createTF = (q, correct, exp) => ({
  type: "true-false", question: q, correctAnswer: correct, explanation: exp, points: 10
});

// UNIT 2: PHYSICS BASICS (Lessons 6-11)
export const unit2Complete = [
  createLesson(6, "Forces and Motion", "Physics Basics", 2, 1, "⚡",
    "Forces cause objects to move, stop, or change direction. Newton's laws explain how forces work and are fundamental to aerospace engineering.",
    [
      { title: "What is a Force?", content: "A force is a push or pull measured in Newtons (N). Forces have magnitude and direction. Examples: gravity pulls down, thrust pushes forward, drag slows motion, lift pushes up." },
      { title: "Newton's Laws", content: "1st Law (Inertia): Objects resist changes in motion.\n2nd Law: F = ma (Force = mass × acceleration)\n3rd Law: Every action has equal opposite reaction.\n\nThese laws govern all motion in aerospace." },
      { title: "Forces on Aircraft", content: "Four main forces:\n• Lift (up) - from wings\n• Weight (down) - from gravity\n• Thrust (forward) - from engines\n• Drag (backward) - from air resistance\n\nBalancing these forces enables flight." }
    ],
    ["Forces are pushes or pulls measured in Newtons", "Newton's 3 laws govern all motion", "F = ma relates force, mass, and acceleration", "Aircraft have 4 main forces: lift, weight, thrust, drag", "Understanding forces is essential for flight"],
    [
      { term: "Force", definition: "Push or pull that can cause acceleration" },
      { term: "Newton (N)", definition: "Unit of force" },
      { term: "Inertia", definition: "Resistance to changes in motion" },
      { term: "Acceleration", definition: "Rate of change of velocity" }
    ],
    [
      createMCQ("What is the unit of force?", ["Meter", "Newton", "Kilogram", "Second"], 1, "Force is measured in Newtons (N)."),
      createMCQ("Which law states F = ma?", ["First", "Second", "Third", "Fourth"], 1, "Newton's Second Law: F = ma"),
      createTF("Objects in motion eventually stop on their own.", false, "Newton's 1st Law: objects in motion stay in motion unless acted upon by a force."),
      createMCQ("What does Newton's 3rd Law state?", ["F = ma", "Inertia", "Action-reaction pairs", "Gravity"], 2, "Every action has an equal and opposite reaction."),
      createMCQ("Which force pulls aircraft down?", ["Lift", "Thrust", "Weight", "Drag"], 2, "Weight is the force of gravity pulling down.")
    ]
  ),
  
  createLesson(7, "Speed, Velocity & Acceleration", "Physics Basics", 2, 2, "🏃",
    "Understanding motion is crucial for designing aircraft. Speed tells us how fast, velocity adds direction, and acceleration describes changes in motion.",
    [
      { title: "Speed vs Velocity", content: "Speed: How fast (scalar) - Example: 60 mph\nVelocity: Speed + direction (vector) - Example: 60 mph North\n\nFormula: Speed = Distance / Time\nv = d / t" },
      { title: "Acceleration", content: "Acceleration = change in velocity / time\na = Δv / Δt\n\nPositive: speeding up\nNegative: slowing down\nZero: constant speed\n\nUnits: m/s² or ft/s²" },
      { title: "Motion in Aerospace", content: "Takeoff: Aircraft accelerates to reach takeoff speed\nCruise: Constant velocity\nLanding: Deceleration to stop safely\n\nCalculating these helps design runways and flight paths." }
    ],
    ["Speed is magnitude, velocity includes direction", "Acceleration is rate of change of velocity", "v = d/t calculates speed", "Aircraft go through acceleration, constant velocity, and deceleration phases", "Motion calculations ensure safe flight operations"],
    [
      { term: "Speed", definition: "How fast an object moves" },
      { term: "Velocity", definition: "Speed with direction" },
      { term: "Acceleration", definition: "Rate of change of velocity" },
      { term: "Scalar", definition: "Quantity with magnitude only" }
    ],
    [
      createMCQ("What's the difference between speed and velocity?", ["No difference", "Velocity has direction", "Speed is faster", "Velocity is slower"], 1, "Velocity includes both speed and direction."),
      createMCQ("If a car travels 100m in 5s, what's its speed?", ["10 m/s", "20 m/s", "50 m/s", "500 m/s"], 1, "Speed = 100m / 5s = 20 m/s"),
      createTF("Acceleration can be negative.", true, "Negative acceleration (deceleration) occurs when slowing down."),
      createMCQ("What does acceleration measure?", ["Distance", "Speed", "Change in velocity", "Direction"], 2, "Acceleration is the rate of change of velocity."),
      createTF("Constant velocity means zero acceleration.", true, "If velocity isn't changing, acceleration is zero.")
    ]
  ),
  
  createLesson(8, "Energy and Work", "Physics Basics", 2, 3, "⚡",
    "Energy is the ability to do work. In aerospace, we convert fuel energy into motion energy. Understanding energy helps us design efficient aircraft.",
    [
      { title: "Types of Energy", content: "Kinetic Energy: Energy of motion\nKE = ½mv²\n\nPotential Energy: Stored energy\nPE = mgh (gravitational)\n\nChemical Energy: In fuel\nThermal Energy: Heat\nElectrical Energy: In batteries" },
      { title: "Work", content: "Work = Force × Distance\nW = F × d\n\nWork transfers energy\nUnits: Joules (J)\n\nExample: Lifting a weight does work against gravity, storing potential energy." },
      { title: "Conservation of Energy", content: "Energy cannot be created or destroyed, only converted.\n\nAircraft example:\nChemical (fuel) → Thermal (combustion) → Kinetic (motion) + Potential (altitude)\n\nEfficiency matters: minimize energy lost as heat." }
    ],
    ["Energy is the ability to do work", "Kinetic energy is energy of motion (½mv²)", "Potential energy is stored energy (mgh)", "Work = Force × Distance", "Energy is conserved but can change forms"],
    [
      { term: "Energy", definition: "Ability to do work" },
      { term: "Work", definition: "Force applied over a distance" },
      { term: "Joule", definition: "Unit of energy and work" },
      { term: "Conservation", definition: "Energy cannot be created or destroyed" }
    ],
    [
      createMCQ("What is kinetic energy?", ["Stored energy", "Energy of motion", "Heat energy", "Light energy"], 1, "Kinetic energy is the energy an object has due to its motion."),
      createMCQ("What is the formula for work?", ["W = ma", "W = F × d", "W = ½mv²", "W = mgh"], 1, "Work equals Force times Distance."),
      createTF("Energy can be created from nothing.", false, "Energy cannot be created or destroyed, only converted between forms."),
      createMCQ("What type of energy does fuel contain?", ["Kinetic", "Potential", "Chemical", "Nuclear"], 2, "Fuel contains chemical energy that's released during combustion."),
      createMCQ("What is the unit of energy?", ["Newton", "Watt", "Joule", "Meter"], 2, "Energy is measured in Joules (J).")
    ]
  ),
  
  createLesson(9, "Momentum and Impulse", "Physics Basics", 2, 4, "💥",
    "Momentum describes how hard it is to stop a moving object. Impulse is the change in momentum. These concepts are crucial for understanding collisions and rocket propulsion.",
    [
      { title: "Momentum", content: "Momentum = mass × velocity\np = mv\n\nMore mass or speed = more momentum\nUnits: kg⋅m/s\n\nExample: A heavy truck has more momentum than a car at the same speed." },
      { title: "Conservation of Momentum", content: "In a closed system, total momentum stays constant.\n\nBefore collision = After collision\n\nThis explains:\n• Rocket propulsion (exhaust goes back, rocket goes forward)\n• Collisions\n• Recoil" },
      { title: "Impulse", content: "Impulse = Force × Time\nJ = F × Δt\n\nImpulse = Change in momentum\nJ = Δp\n\nLonger impact time = less force\nThis is why airbags work: they increase impact time, reducing force." }
    ],
    ["Momentum = mass × velocity (p = mv)", "Momentum is conserved in closed systems", "Impulse = Force × Time", "Impulse equals change in momentum", "Rockets work by conservation of momentum"],
    [
      { term: "Momentum", definition: "Mass times velocity (p = mv)" },
      { term: "Impulse", definition: "Force applied over time, equals change in momentum" },
      { term: "Conservation", definition: "Total momentum stays constant in closed system" },
      { term: "Recoil", definition: "Backward motion from forward action" }
    ],
    [
      createMCQ("What is momentum?", ["Force × time", "Mass × velocity", "Mass × acceleration", "Force × distance"], 1, "Momentum equals mass times velocity (p = mv)."),
      createTF("Momentum is conserved in collisions.", true, "In a closed system, total momentum before equals total momentum after."),
      createMCQ("What is impulse?", ["Mass × velocity", "Force × time", "Work done", "Energy transferred"], 1, "Impulse equals force times time (J = F × Δt)."),
      createMCQ("How do rockets work?", ["Magic", "Conservation of momentum", "Gravity", "Air pressure"], 1, "Rockets expel exhaust backward, gaining forward momentum (conservation of momentum)."),
      createTF("Airbags reduce force by increasing impact time.", true, "Impulse = F × t, so longer time means less force for same momentum change.")
    ]
  ),
  
  createLesson(10, "Gravity and Weight", "Physics Basics", 2, 5, "🌍",
    "Gravity is the force that attracts objects to Earth. Weight is the force of gravity on an object. Understanding gravity is essential for flight and space travel.",
    [
      { title: "What is Gravity?", content: "Gravity: Universal force of attraction between masses\n\nOn Earth: g = 9.8 m/s² (acceleration due to gravity)\n\nAll objects fall at same rate (ignoring air resistance)\nGalileo proved this at Leaning Tower of Pisa." },
      { title: "Weight vs Mass", content: "Mass: Amount of matter (kg)\n• Stays same everywhere\n• Measured with balance\n\nWeight: Force of gravity (N)\n• Weight = mass × gravity\n• W = mg\n• Changes with location\n\nOn Moon: weight is 1/6 of Earth weight, but mass stays same." },
      { title: "Gravity in Aerospace", content: "Aircraft must overcome weight with lift\n\nOrbital mechanics:\n• Satellites fall continuously but miss Earth\n• Escape velocity: 11.2 km/s to leave Earth\n• Weightlessness: free fall, not no gravity\n\nGravity assists: use planets' gravity to change spacecraft trajectory." }
    ],
    ["Gravity attracts all masses to each other", "On Earth, g = 9.8 m/s²", "Weight = mass × gravity (W = mg)", "Mass stays constant, weight changes with location", "Aircraft must generate lift to overcome weight"],
    [
      { term: "Gravity", definition: "Force of attraction between masses" },
      { term: "Weight", definition: "Force of gravity on an object (W = mg)" },
      { term: "Mass", definition: "Amount of matter in an object" },
      { term: "g", definition: "Acceleration due to gravity (9.8 m/s² on Earth)" }
    ],
    [
      createMCQ("What is the acceleration due to gravity on Earth?", ["9.8 m/s", "9.8 m/s²", "9.8 m", "9.8 N"], 1, "Gravity accelerates objects at 9.8 m/s² on Earth."),
      createMCQ("What is the formula for weight?", ["W = ma", "W = mg", "W = F/m", "W = mv"], 1, "Weight equals mass times gravitational acceleration (W = mg)."),
      createTF("Mass and weight are the same thing.", false, "Mass is amount of matter (constant), weight is force of gravity (varies with location)."),
      createMCQ("On the Moon, your weight is _____ but your mass is _____.", ["same, same", "less, same", "more, same", "same, less"], 1, "Moon's gravity is weaker so weight is less, but mass doesn't change."),
      createTF("All objects fall at the same rate in a vacuum.", true, "Without air resistance, gravity accelerates all objects equally regardless of mass.")
    ]
  ),
  
  createLesson(11, "Simple Machines", "Physics Basics", 2, 6, "⚙️",
    "Simple machines make work easier by changing the direction or magnitude of forces. Aircraft use many simple machines in their mechanisms.",
    [
      { title: "Six Simple Machines", content: "1. Lever: Bar that pivots on fulcrum\n2. Wheel & Axle: Wheel attached to axle\n3. Pulley: Rope over wheel\n4. Inclined Plane: Ramp\n5. Wedge: Two inclined planes\n6. Screw: Inclined plane wrapped around cylinder\n\nAll complex machines are combinations of these!" },
      { title: "Mechanical Advantage", content: "MA = Output Force / Input Force\n\nMA > 1: Machine multiplies force\nMA < 1: Machine multiplies distance/speed\nMA = 1: Changes direction only\n\nTrade-off: Gain force, lose distance (or vice versa)\n\nWork in = Work out (ignoring friction)" },
      { title: "Simple Machines in Aircraft", content: "Levers: Control surfaces, landing gear\nWheels: Landing gear, pulleys in cable systems\nPulleys: Control cables\nScrews: Fasteners everywhere\nWedges: Wing leading edge\nInclined planes: Flaps, ramps\n\nUnderstanding these helps maintain and design aircraft systems." }
    ],
    ["Six simple machines: lever, wheel/axle, pulley, inclined plane, wedge, screw", "Mechanical advantage = output force / input force", "Simple machines make work easier by trading force for distance", "All complex machines use combinations of simple machines", "Aircraft use simple machines in controls, landing gear, and structures"],
    [
      { term: "Simple Machine", definition: "Basic device that makes work easier" },
      { term: "Mechanical Advantage", definition: "Ratio of output force to input force" },
      { term: "Lever", definition: "Bar that pivots on a fulcrum" },
      { term: "Fulcrum", definition: "Pivot point of a lever" }
    ],
    [
      createMCQ("How many types of simple machines are there?", ["Three", "Four", "Six", "Ten"], 2, "There are six types of simple machines."),
      createMCQ("What does mechanical advantage measure?", ["Speed", "Force multiplication", "Distance", "Time"], 1, "MA measures how much a machine multiplies force."),
      createTF("Simple machines can create energy.", false, "Simple machines don't create energy, they just make work easier by trading force for distance."),
      createMCQ("Which simple machine is a ramp?", ["Lever", "Pulley", "Inclined plane", "Screw"], 2, "An inclined plane is a ramp that makes lifting easier."),
      createMCQ("What is the pivot point of a lever called?", ["Axis", "Fulcrum", "Center", "Base"], 1, "The fulcrum is the pivot point of a lever.")
    ]
  )
];

export default { unit2Complete };

// UNIT 3: MATHEMATICS FOR ENGINEERS (Lessons 12-17)
export const unit3Complete = [
  createLesson(12, "Algebra for Engineering", "Mathematics for Engineers", 3, 1, "📐",
    "Algebra is the language of engineering. Engineers use equations to model systems, solve problems, and predict behavior. Mastering algebra is essential for all engineering work.",
    [
      { title: "Variables and Equations", content: "Variables represent unknown values: x, y, z\n\nEquations show relationships:\nDistance = Speed × Time\nd = v × t\n\nSolving for unknowns:\nIf d = 100m and t = 5s, find v:\nv = d/t = 100/5 = 20 m/s" },
      { title: "Linear Equations", content: "Form: y = mx + b\n• m = slope (rate of change)\n• b = y-intercept (starting value)\n\nExample: Fuel consumption\ny = 50x + 1000\ny = total fuel, x = hours, 50 = rate, 1000 = reserve\n\nGraphs show relationships visually." },
      { title: "Engineering Applications", content: "Stress-strain relationships\nCost calculations\nPerformance curves\nLoad analysis\nEfficiency equations\n\nExample: Lift equation\nL = ½ρv²SC_L\nSolve for any variable given the others." }
    ],
    ["Algebra uses variables to represent unknowns", "Equations model relationships between quantities", "Linear equations: y = mx + b", "Solving equations finds unknown values", "Engineers use algebra daily for calculations and modeling"],
    [
      { term: "Variable", definition: "Symbol representing an unknown or changing value" },
      { term: "Equation", definition: "Mathematical statement that two expressions are equal" },
      { term: "Slope", definition: "Rate of change in a linear relationship" },
      { term: "Solve", definition: "Find the value of unknown variables" }
    ],
    [
      createMCQ("What does a variable represent?", ["A number", "An unknown value", "A constant", "A unit"], 1, "Variables represent unknown or changing values."),
      createMCQ("In y = mx + b, what does m represent?", ["Y-intercept", "Slope", "Variable", "Constant"], 1, "m is the slope (rate of change)."),
      createTF("Equations can have multiple variables.", true, "Engineering equations often have many variables like F = ma or d = vt."),
      createMCQ("If d = vt and d = 100, t = 5, what is v?", ["10", "20", "50", "500"], 1, "v = d/t = 100/5 = 20"),
      createMCQ("What is algebra used for in engineering?", ["Art", "Modeling and solving problems", "History", "Music"], 1, "Engineers use algebra to model systems and solve problems.")
    ]
  ),
  
  createLesson(13, "Trigonometry", "Mathematics for Engineers", 3, 2, "📐",
    "Trigonometry deals with triangles and angles. In aerospace, we use trig to calculate forces, analyze flight paths, and design structures.",
    [
      { title: "Right Triangles", content: "Three sides:\n• Hypotenuse (longest, opposite right angle)\n• Opposite (across from angle)\n• Adjacent (next to angle)\n\nPythagorean theorem:\na² + b² = c²\n\nUsed everywhere in engineering!" },
      { title: "Trig Functions", content: "SOH-CAH-TOA:\n\nsin(θ) = Opposite / Hypotenuse\ncos(θ) = Adjacent / Hypotenuse\ntan(θ) = Opposite / Adjacent\n\nθ = angle\n\nThese ratios are constant for any angle, regardless of triangle size." },
      { title: "Engineering Applications", content: "Force components:\nF_x = F × cos(θ)\nF_y = F × sin(θ)\n\nFlight path angles\nStructural analysis\nVector decomposition\nNavigation\nSlope calculations\n\nExample: Finding lift and drag from total aerodynamic force." }
    ],
    ["Trigonometry studies triangles and angles", "SOH-CAH-TOA: sin, cos, tan ratios", "Pythagorean theorem: a² + b² = c²", "Trig breaks forces into components", "Essential for analyzing angles in aerospace"],
    [
      { term: "Trigonometry", definition: "Study of triangles and angle relationships" },
      { term: "Sine", definition: "Ratio of opposite to hypotenuse" },
      { term: "Cosine", definition: "Ratio of adjacent to hypotenuse" },
      { term: "Hypotenuse", definition: "Longest side of right triangle" }
    ],
    [
      createMCQ("What does SOH stand for?", ["Sin = Opp/Hyp", "Sin = Opp/Hyp", "Sum Of Heights", "Side Over Height"], 1, "SOH: Sine = Opposite / Hypotenuse"),
      createMCQ("In a right triangle, what is the longest side called?", ["Opposite", "Adjacent", "Hypotenuse", "Base"], 2, "The hypotenuse is the longest side, opposite the right angle."),
      createTF("The Pythagorean theorem only works for right triangles.", true, "a² + b² = c² applies specifically to right triangles."),
      createMCQ("What is cos(θ)?", ["Opp/Hyp", "Adj/Hyp", "Opp/Adj", "Hyp/Opp"], 1, "Cosine = Adjacent / Hypotenuse"),
      createMCQ("Engineers use trig to:", ["Draw pictures", "Break forces into components", "Tell time", "Measure temperature"], 1, "Trig helps decompose forces and analyze angles.")
    ]
  ),
  
  createLesson(14, "Geometry", "Mathematics for Engineers", 3, 3, "📏",
    "Geometry is the study of shapes, sizes, and spatial relationships. Engineers use geometry to design structures, calculate areas and volumes, and optimize designs.",
    [
      { title: "Basic Shapes", content: "2D Shapes:\n• Rectangle: A = length × width\n• Triangle: A = ½ × base × height\n• Circle: A = πr², C = 2πr\n\n3D Shapes:\n• Cube: V = s³\n• Cylinder: V = πr²h\n• Sphere: V = (4/3)πr³" },
      { title: "Angles", content: "Types:\n• Acute: < 90°\n• Right: = 90°\n• Obtuse: > 90°\n• Straight: = 180°\n\nAngle relationships:\n• Complementary: sum to 90°\n• Supplementary: sum to 180°\n• Angles in triangle: sum to 180°" },
      { title: "Engineering Applications", content: "Wing area calculations\nFuel tank volumes\nStructural angles\nAerodynamic shapes\nMaterial requirements\n\nExample: Calculate wing area to determine lift capacity\nExample: Find fuel tank volume for range requirements" }
    ],
    ["Geometry studies shapes, sizes, and spatial relationships", "Area formulas: rectangle (l×w), triangle (½bh), circle (πr²)", "Volume formulas: cube (s³), cylinder (πr²h), sphere (4/3πr³)", "Angles in a triangle sum to 180°", "Used to calculate areas, volumes, and optimize designs"],
    [
      { term: "Geometry", definition: "Study of shapes and spatial relationships" },
      { term: "Area", definition: "Amount of surface a 2D shape covers" },
      { term: "Volume", definition: "Amount of space a 3D object occupies" },
      { term: "Pi (π)", definition: "Mathematical constant ≈ 3.14159" }
    ],
    [
      createMCQ("What is the area of a rectangle?", ["l + w", "l × w", "2l + 2w", "l²"], 1, "Area of rectangle = length × width"),
      createMCQ("What is the formula for the area of a circle?", ["2πr", "πr", "πr²", "πd"], 2, "Area of circle = πr²"),
      createTF("Angles in a triangle always sum to 180°.", true, "The three angles in any triangle always add up to 180 degrees."),
      createMCQ("What is the volume of a cube with side length 3?", ["9", "18", "27", "81"], 2, "Volume = s³ = 3³ = 27"),
      createMCQ("Engineers use geometry to:", ["Calculate areas and volumes", "Write poetry", "Cook food", "Play music"], 0, "Geometry helps calculate dimensions, areas, and volumes for design.")
    ]
  ),
  
  createLesson(15, "Vectors & Direction", "Mathematics for Engineers", 3, 4, "➡️",
    "Vectors have both magnitude and direction. In aerospace, forces, velocities, and accelerations are all vectors. Understanding vectors is crucial for analyzing motion and forces.",
    [
      { title: "Scalars vs Vectors", content: "Scalar: Magnitude only\n• Temperature: 25°C\n• Speed: 60 mph\n• Mass: 10 kg\n\nVector: Magnitude + Direction\n• Velocity: 60 mph North\n• Force: 100 N upward\n• Displacement: 5 m East\n\nVectors shown with arrows: length = magnitude, direction = arrow points" },
      { title: "Vector Components", content: "Break vectors into x and y parts:\n\nV_x = V × cos(θ)\nV_y = V × sin(θ)\n\nMagnitude from components:\nV = √(V_x² + V_y²)\n\nDirection from components:\nθ = tan⁻¹(V_y / V_x)\n\nThis is how we analyze forces at angles!" },
      { title: "Vector Addition", content: "Add vectors tip-to-tail:\n1. Draw first vector\n2. Start second from tip of first\n3. Result goes from start to final tip\n\nOr add components:\nR_x = A_x + B_x\nR_y = A_y + B_y\n\nUsed to find net force, total velocity, etc." }
    ],
    ["Vectors have magnitude and direction", "Scalars have magnitude only", "Components: V_x = V cos(θ), V_y = V sin(θ)", "Add vectors tip-to-tail or by components", "Forces and velocities are vectors"],
    [
      { term: "Vector", definition: "Quantity with magnitude and direction" },
      { term: "Scalar", definition: "Quantity with magnitude only" },
      { term: "Component", definition: "Part of vector in x or y direction" },
      { term: "Magnitude", definition: "Size or length of a vector" }
    ],
    [
      createMCQ("Which is a vector?", ["Temperature", "Mass", "Velocity", "Time"], 2, "Velocity has both magnitude (speed) and direction, making it a vector."),
      createMCQ("Which is a scalar?", ["Force", "Velocity", "Displacement", "Speed"], 3, "Speed has magnitude only (no direction), making it a scalar."),
      createTF("Vectors can be broken into x and y components.", true, "Any vector can be decomposed into perpendicular components."),
      createMCQ("How do you add vectors?", ["Multiply them", "Tip-to-tail or add components", "Divide them", "Subtract them"], 1, "Vectors add tip-to-tail or by adding their components."),
      createMCQ("What makes a quantity a vector?", ["It's large", "It has direction", "It's small", "It's fast"], 1, "Vectors must have both magnitude and direction.")
    ]
  ),
  
  createLesson(16, "Intro to Calculus", "Mathematics for Engineers", 3, 5, "∫",
    "Calculus studies change and accumulation. Derivatives measure rates of change (like acceleration from velocity). Integrals measure accumulation (like distance from velocity).",
    [
      { title: "What is Calculus?", content: "Two main branches:\n\n1. Differential Calculus (Derivatives)\n• Measures rate of change\n• Slope of curve\n• Example: velocity is derivative of position\n\n2. Integral Calculus (Integrals)\n• Measures accumulation\n• Area under curve\n• Example: distance is integral of velocity" },
      { title: "Derivatives", content: "Derivative = rate of change\n\nNotation: dy/dx or f'(x)\n\nExamples:\n• Position → Velocity (derivative)\n• Velocity → Acceleration (derivative)\n• Cost → Marginal cost\n\nPower rule: d/dx(x^n) = nx^(n-1)\nExample: d/dx(x²) = 2x" },
      { title: "Engineering Applications", content: "Optimization: Find maximum lift, minimum drag\nRates: How fast temperature changes\nSlopes: Angle of flight path\nVelocity and acceleration from position\nStress analysis\nControl systems\n\nCalculus is the foundation of advanced engineering!" }
    ],
    ["Calculus studies change and accumulation", "Derivatives measure rate of change", "Integrals measure accumulation", "Velocity is derivative of position", "Calculus is essential for advanced engineering"],
    [
      { term: "Calculus", definition: "Mathematics of change and accumulation" },
      { term: "Derivative", definition: "Rate of change, slope of curve" },
      { term: "Integral", definition: "Accumulation, area under curve" },
      { term: "Rate of Change", definition: "How fast something changes" }
    ],
    [
      createMCQ("What does a derivative measure?", ["Area", "Rate of change", "Volume", "Distance"], 1, "Derivatives measure how fast something changes (rate of change)."),
      createMCQ("What is the derivative of position?", ["Acceleration", "Velocity", "Force", "Energy"], 1, "Velocity is the rate of change of position (derivative of position)."),
      createTF("Calculus is only used in mathematics, not engineering.", false, "Calculus is fundamental to engineering for optimization, analysis, and design."),
      createMCQ("What does an integral measure?", ["Rate of change", "Accumulation", "Speed", "Temperature"], 1, "Integrals measure accumulation (like area under a curve)."),
      createMCQ("Engineers use calculus to:", ["Optimize designs", "Draw pictures", "Write stories", "Play games"], 0, "Calculus helps engineers optimize designs and analyze changing systems.")
    ]
  ),
  
  createLesson(17, "Engineering Notation & Units", "Mathematics for Engineers", 3, 6, "📊",
    "Engineers must communicate precisely using standard notation and units. Understanding unit conversions and scientific notation is essential for accurate calculations.",
    [
      { title: "Scientific Notation", content: "Express large/small numbers:\n\n3,000,000 = 3 × 10⁶\n0.000005 = 5 × 10⁻⁶\n\nFormat: a × 10^n\nwhere 1 ≤ a < 10\n\nUseful for:\n• Very large (speed of light)\n• Very small (atomic scale)\n• Calculations" },
      { title: "SI Units", content: "International System (metric):\n\nBase units:\n• Length: meter (m)\n• Mass: kilogram (kg)\n• Time: second (s)\n• Temperature: Kelvin (K)\n• Current: Ampere (A)\n\nPrefixes:\n• kilo (k) = 1000\n• mega (M) = 1,000,000\n• milli (m) = 0.001\n• micro (μ) = 0.000001" },
      { title: "Unit Conversions", content: "Always check units!\n\nExamples:\n• 1 mile = 1.609 km\n• 1 inch = 2.54 cm\n• 1 lb = 4.448 N\n• 1 mph = 0.447 m/s\n\nDimensional analysis:\nMultiply by conversion factors\n\n60 mph × (1.609 km/mile) = 96.5 km/h\n\nWrong units cause disasters (Mars Climate Orbiter)!" }
    ],
    ["Scientific notation: a × 10^n for large/small numbers", "SI units are standard in engineering", "Common prefixes: kilo, mega, milli, micro", "Always convert units correctly", "Unit errors can cause catastrophic failures"],
    [
      { term: "Scientific Notation", definition: "Way to express very large or small numbers" },
      { term: "SI Units", definition: "International System of units (metric)" },
      { term: "Conversion Factor", definition: "Ratio used to convert between units" },
      { term: "Dimensional Analysis", definition: "Method of converting units" }
    ],
    [
      createMCQ("What is 5,000,000 in scientific notation?", ["5 × 10⁵", "5 × 10⁶", "5 × 10⁷", "50 × 10⁵"], 1, "5,000,000 = 5 × 10⁶"),
      createMCQ("What is the SI unit of length?", ["Foot", "Inch", "Meter", "Mile"], 2, "The meter (m) is the SI unit of length."),
      createTF("Unit conversions are not important in engineering.", false, "Unit conversions are critical - errors can cause disasters!"),
      createMCQ("What does 'kilo' mean?", ["100", "1000", "10,000", "1,000,000"], 1, "Kilo means 1000 (like kilometer = 1000 meters)."),
      createMCQ("Why use scientific notation?", ["It looks fancy", "For very large or small numbers", "It's required by law", "To confuse people"], 1, "Scientific notation makes very large or small numbers easier to work with.")
    ]
  )
];

// UNIT 5: AIRCRAFT COMPONENTS (Lessons 18-23)
export const unit5Complete = [
  createLesson(18, "Wings & Airfoils", "Aircraft Components", 5, 1, "🛩️",
    "Wings generate lift that allows aircraft to fly. The wing's shape (airfoil) and design determine how much lift it produces and how efficiently it flies.",
    [
      { title: "Wing Structure", content: "Main parts:\n• Spar: Main structural beam (carries loads)\n• Ribs: Shape the airfoil, transfer loads to spar\n• Skin: Outer covering, carries some loads\n• Stringers: Longitudinal stiffeners\n\nWing types:\n• Straight: Simple, stable\n• Swept: High-speed aircraft\n• Delta: Supersonic fighters\n• Tapered: Efficient, common" },
      { title: "Airfoil Shape", content: "Airfoil = wing cross-section\n\nKey features:\n• Leading edge: Front (rounded)\n• Trailing edge: Back (sharp)\n• Camber: Curvature (affects lift)\n• Thickness: Affects strength and drag\n\nSymmetric: Same top and bottom\nCambered: Curved, more lift\n\nShape determines performance!" },
      { title: "Wing Design Factors", content: "Aspect Ratio = wingspan² / wing area\n• High AR: Efficient, gliders\n• Low AR: Maneuverable, fighters\n\nWing loading = weight / wing area\n• Low: Slow, stable\n• High: Fast, less stable\n\nFlaps and slats increase lift for takeoff/landing\nAilerons control roll" }
    ],
    ["Wings generate lift through their airfoil shape", "Main structure: spars, ribs, skin, stringers", "Airfoil shape determines lift and drag", "Aspect ratio affects efficiency", "Flaps, slats, and ailerons are control surfaces"],
    [
      { term: "Airfoil", definition: "Cross-sectional shape of a wing" },
      { term: "Spar", definition: "Main structural beam in a wing" },
      { term: "Camber", definition: "Curvature of an airfoil" },
      { term: "Aspect Ratio", definition: "Wingspan squared divided by wing area" }
    ],
    [
      createMCQ("What is the main structural beam in a wing?", ["Rib", "Spar", "Skin", "Flap"], 1, "The spar is the main load-bearing beam in a wing."),
      createMCQ("What is an airfoil?", ["Wing tip", "Wing cross-section", "Wing length", "Wing color"], 1, "An airfoil is the cross-sectional shape of a wing."),
      createTF("All wings have the same shape.", false, "Wings come in many shapes (straight, swept, delta, etc.) for different purposes."),
      createMCQ("What do ailerons control?", ["Pitch", "Roll", "Yaw", "Speed"], 1, "Ailerons control roll (banking left or right)."),
      createMCQ("What increases lift for takeoff and landing?", ["Engines", "Flaps and slats", "Landing gear", "Windows"], 1, "Flaps and slats extend to increase lift at low speeds.")
    ]
  ),
  
  createLesson(19, "Fuselage Structure", "Aircraft Components", 5, 2, "✈️",
    "The fuselage is the main body of the aircraft. It holds passengers, cargo, fuel, and systems. It must be strong yet lightweight.",
    [
      { title: "Fuselage Types", content: "Truss: Framework of tubes (early aircraft)\n• Light, simple\n• Fabric covered\n\nMonocoque: Skin carries all loads\n• Strong skin\n• No internal frame\n\nSemi-monocoque: Skin + frames (modern)\n• Skin carries some load\n• Frames and stringers support\n• Most efficient\n• Used in modern aircraft" },
      { title: "Structural Components", content: "Frames (rings): Maintain shape, support skin\nStringers: Run lengthwise, stiffen skin\nBulkheads: Walls, separate sections\nSkin: Outer shell, aerodynamic surface\nFloor beams: Support floor and cargo\n\nPressurized fuselages:\n• Sealed for high altitude\n• Stronger structure needed\n• Circular cross-section best" },
      { title: "Design Considerations", content: "Must withstand:\n• Pressurization (like a balloon)\n• Bending loads (wings attached)\n• Torsion (twisting)\n• Landing impacts\n• Fatigue (repeated cycles)\n\nDoors and windows are weak points\nRequire reinforcement\n\nMaterials: Aluminum alloys, composites" }
    ],
    ["Fuselage is the main body of aircraft", "Semi-monocoque construction is most common", "Structure: frames, stringers, bulkheads, skin", "Must handle pressurization, bending, and impacts", "Circular cross-section best for pressurization"],
    [
      { term: "Fuselage", definition: "Main body of an aircraft" },
      { term: "Semi-monocoque", definition: "Structure where skin and frame share loads" },
      { term: "Frame", definition: "Ring-shaped structure that maintains fuselage shape" },
      { term: "Stringer", definition: "Longitudinal stiffener in fuselage" }
    ],
    [
      createMCQ("What is the fuselage?", ["Wing", "Engine", "Main body", "Tail"], 2, "The fuselage is the main body of the aircraft."),
      createMCQ("What type of construction do modern aircraft use?", ["Truss", "Monocoque", "Semi-monocoque", "Wood"], 2, "Modern aircraft use semi-monocoque construction."),
      createTF("The fuselage skin carries no structural load.", false, "In semi-monocoque construction, the skin carries significant loads."),
      createMCQ("What shape is best for pressurized fuselages?", ["Square", "Circular", "Triangular", "Flat"], 1, "Circular cross-sections handle pressurization stress most efficiently."),
      createMCQ("What are frames in a fuselage?", ["Engines", "Ring-shaped structures", "Windows", "Seats"], 1, "Frames are ring-shaped structures that maintain the fuselage shape.")
    ]
  ),
  
  createLesson(20, "Empennage (Tail)", "Aircraft Components", 5, 3, "🎯",
    "The empennage (tail section) provides stability and control. It consists of vertical and horizontal stabilizers with movable control surfaces.",
    [
      { title: "Tail Components", content: "Vertical Stabilizer (fin):\n• Provides directional stability\n• Keeps nose pointed forward\n• Like feathers on arrow\n\nRudder:\n• Movable part of vertical stabilizer\n• Controls yaw (nose left/right)\n• Used for turns and crosswind landings\n\nHorizontal Stabilizer:\n• Provides pitch stability\n• Keeps nose level\n\nElevator:\n• Movable part of horizontal stabilizer\n• Controls pitch (nose up/down)" },
      { title: "Tail Configurations", content: "Conventional: Horizontal stabilizer at fuselage\n• Most common\n• Simple, effective\n\nT-tail: Horizontal stabilizer on top of vertical\n• Keeps tail out of wing wake\n• Used on jets\n\nCruciform: Cross shape\n• Good for all attitudes\n\nV-tail: Two surfaces at angle\n• Lighter, less drag\n• More complex controls" },
      { title: "Stability Functions", content: "Static Stability: Returns to trim after disturbance\n• Tail provides restoring moment\n• Center of gravity must be forward of center of lift\n\nDynamic Stability: Oscillations dampen over time\n• Tail size and position critical\n\nTrim: Adjusting for hands-off flight\n• Trim tabs on control surfaces\n• Reduce pilot workload" }
    ],
    ["Empennage is the tail section", "Vertical stabilizer and rudder control yaw", "Horizontal stabilizer and elevator control pitch", "Provides stability and control", "Different configurations: conventional, T-tail, V-tail"],
    [
      { term: "Empennage", definition: "Tail section of aircraft" },
      { term: "Rudder", definition: "Movable surface that controls yaw" },
      { term: "Elevator", definition: "Movable surface that controls pitch" },
      { term: "Stability", definition: "Tendency to return to equilibrium" }
    ],
    [
      createMCQ("What is the empennage?", ["Wing", "Engine", "Tail section", "Cockpit"], 2, "The empennage is the tail section of the aircraft."),
      createMCQ("What does the rudder control?", ["Pitch", "Roll", "Yaw", "Speed"], 2, "The rudder controls yaw (nose left/right)."),
      createTF("The elevator controls roll.", false, "The elevator controls pitch (nose up/down). Ailerons control roll."),
      createMCQ("What provides directional stability?", ["Wings", "Vertical stabilizer", "Engines", "Landing gear"], 1, "The vertical stabilizer provides directional stability."),
      createMCQ("What is a T-tail?", ["Tail shaped like T", "Horizontal stabilizer on top of vertical", "Three tails", "Triangular tail"], 1, "A T-tail has the horizontal stabilizer mounted on top of the vertical stabilizer.")
    ]
  ),
  
  createLesson(21, "Landing Gear", "Aircraft Components", 5, 4, "🛬",
    "Landing gear supports the aircraft on the ground, absorbs landing impacts, and allows taxiing. It must be strong, reliable, and retractable on most aircraft.",
    [
      { title: "Landing Gear Types", content: "Tricycle: Nose wheel + 2 main wheels\n• Most common\n• Good visibility\n• Stable on ground\n• Easy to control\n\nTailwheel (Conventional): 2 main + tail wheel\n• Older design\n• Better for rough fields\n• Less stable (can ground loop)\n\nTandem: Wheels in line\n• Used on some military aircraft\n\nMulti-bogey: Multiple wheels per strut\n• Large aircraft\n• Distributes weight" },
      { title: "Landing Gear Components", content: "Strut: Main structural member\n• Supports weight\n• Contains shock absorber\n\nShock Absorber:\n• Oleo strut (oil + air)\n• Absorbs landing impact\n• Smooths taxi\n\nWheels and Tires:\n• High-pressure tires\n• Designed for heavy loads\n• Must handle heat from braking\n\nBrakes:\n• Disc brakes (like cars)\n• Anti-skid systems\n• Reverse thrust helps too" },
      { title: "Retractable Gear", content: "Why retract?\n• Reduces drag\n• Increases speed\n• Improves efficiency\n\nRetraction systems:\n• Hydraulic (most common)\n• Electric\n• Manual (backup)\n\nGear doors cover wells\nIndicators show position\nEmergency extension systems\n\nFixed gear simpler but creates drag" }
    ],
    ["Landing gear supports aircraft on ground", "Tricycle configuration most common", "Components: struts, shock absorbers, wheels, brakes", "Retractable gear reduces drag", "Must absorb landing impacts safely"],
    [
      { term: "Landing Gear", definition: "Wheels and struts that support aircraft on ground" },
      { term: "Tricycle Gear", definition: "Nose wheel plus two main wheels" },
      { term: "Oleo Strut", definition: "Shock absorber using oil and air" },
      { term: "Retractable", definition: "Can be folded up into aircraft" }
    ],
    [
      createMCQ("What is the most common landing gear configuration?", ["Tailwheel", "Tricycle", "Tandem", "Skids"], 1, "Tricycle gear (nose wheel + 2 main wheels) is most common."),
      createMCQ("What absorbs landing impact?", ["Wings", "Shock absorbers", "Engines", "Seats"], 1, "Shock absorbers (oleo struts) absorb landing impacts."),
      createTF("All aircraft have retractable landing gear.", false, "Many small aircraft have fixed gear for simplicity."),
      createMCQ("Why retract landing gear?", ["Looks better", "Reduces drag", "Saves weight", "Required by law"], 1, "Retracting gear reduces drag, increasing speed and efficiency."),
      createMCQ("What type of shock absorber is most common?", ["Spring", "Oleo strut", "Rubber", "Foam"], 1, "Oleo struts (oil and air) are the most common shock absorbers.")
    ]
  ),
  
  createLesson(22, "Control Systems", "Aircraft Components", 5, 5, "🎮",
    "Control systems allow pilots to maneuver the aircraft. They connect pilot inputs to control surfaces through mechanical, hydraulic, or electronic systems.",
    [
      { title: "Primary Flight Controls", content: "Ailerons: Control roll (banking)\n• On outer trailing edge of wings\n• Move opposite: left up, right down\n• Pilot moves control wheel/stick left/right\n\nElevator: Controls pitch (nose up/down)\n• On horizontal stabilizer\n• Pilot pushes/pulls control wheel/stick\n\nRudder: Controls yaw (nose left/right)\n• On vertical stabilizer\n• Pilot pushes rudder pedals\n\nAll three work together for coordinated flight" },
      { title: "Secondary Flight Controls", content: "Flaps: Increase lift and drag\n• Extend for takeoff and landing\n• Allow slower, steeper approaches\n\nSlats: Leading edge devices\n• Increase lift at high angles\n• Prevent stall\n\nSpoilers: Reduce lift, increase drag\n• Help descend\n• Assist braking on ground\n\nTrim tabs: Fine adjustments\n• Reduce pilot workload\n• Maintain attitude hands-off" },
      { title: "Control System Types", content: "Mechanical (Cable):\n• Cables and pulleys\n• Direct connection\n• Simple, reliable\n• Used on small aircraft\n\nHydraulic:\n• Powered by hydraulic fluid\n• Needed for large aircraft\n• Reduces pilot effort\n\nFly-by-Wire:\n• Electronic signals\n• Computer controlled\n• Modern jets\n• Can prevent dangerous maneuvers\n• Backup systems critical" }
    ],
    ["Primary controls: ailerons (roll), elevator (pitch), rudder (yaw)", "Secondary controls: flaps, slats, spoilers, trim", "Control systems: mechanical, hydraulic, fly-by-wire", "Pilot inputs move control surfaces", "Modern aircraft use computer-controlled fly-by-wire"],
    [
      { term: "Aileron", definition: "Control surface that controls roll" },
      { term: "Elevator", definition: "Control surface that controls pitch" },
      { term: "Rudder", definition: "Control surface that controls yaw" },
      { term: "Fly-by-Wire", definition: "Electronic flight control system" }
    ],
    [
      createMCQ("What do ailerons control?", ["Pitch", "Roll", "Yaw", "Speed"], 1, "Ailerons control roll (banking left or right)."),
      createMCQ("What do flaps do?", ["Control roll", "Increase lift and drag", "Control yaw", "Retract gear"], 1, "Flaps increase lift and drag for takeoff and landing."),
      createTF("The rudder controls pitch.", false, "The rudder controls yaw (nose left/right). The elevator controls pitch."),
      createMCQ("What is fly-by-wire?", ["Wire cables", "Electronic control system", "Wireless internet", "Power lines"], 1, "Fly-by-wire uses electronic signals and computers to control the aircraft."),
      createMCQ("Which control surface is on the horizontal stabilizer?", ["Aileron", "Rudder", "Elevator", "Flap"], 2, "The elevator is on the horizontal stabilizer.")
    ]
  ),
  
  createLesson(23, "Flight Instruments", "Aircraft Components", 5, 6, "📊",
    "Flight instruments provide pilots with essential information about the aircraft's attitude, altitude, speed, and direction. Understanding these instruments is crucial for safe flight.",
    [
      { title: "The Six Pack", content: "Traditional six primary instruments:\n\n1. Airspeed Indicator: How fast\n2. Attitude Indicator: Pitch and roll\n3. Altimeter: How high\n4. Turn Coordinator: Rate of turn\n5. Heading Indicator: Direction\n6. Vertical Speed Indicator: Climb/descent rate\n\nArranged in standard T-pattern\nPilots scan continuously" },
      { title: "How They Work", content: "Pitot-Static System:\n• Pitot tube: Measures ram air pressure\n• Static port: Measures ambient pressure\n• Powers: airspeed, altimeter, VSI\n\nGyroscopic Instruments:\n• Spinning gyroscope maintains orientation\n• Powers: attitude indicator, heading indicator\n• Gyros resist changes in orientation\n\nMagnetic Compass:\n• Simple, reliable backup\n• Points to magnetic north\n• Errors in turns and acceleration" },
      { title: "Modern Glass Cockpits", content: "Electronic Flight Displays:\n• LCD screens replace mechanical instruments\n• Primary Flight Display (PFD): Flight info\n• Multi-Function Display (MFD): Navigation, weather\n\nAdvantages:\n• More information\n• Easier to read\n• Integrated systems\n• Customizable\n\nBackup instruments still required\nGPS navigation\nAutopilot integration" }
    ],
    ["Six primary instruments: airspeed, attitude, altimeter, turn, heading, VSI", "Pitot-static system measures air pressure", "Gyroscopic instruments use spinning gyros", "Modern glass cockpits use electronic displays", "Instruments essential for safe flight, especially in clouds"],
    [
      { term: "Airspeed Indicator", definition: "Shows how fast aircraft is moving through air" },
      { term: "Altimeter", definition: "Shows altitude (height above sea level)" },
      { term: "Attitude Indicator", definition: "Shows pitch and roll orientation" },
      { term: "Glass Cockpit", definition: "Electronic displays instead of mechanical instruments" }
    ],
    [
      createMCQ("How many primary flight instruments are in the 'six pack'?", ["Four", "Five", "Six", "Eight"], 2, "The 'six pack' consists of six primary flight instruments."),
      createMCQ("What does the altimeter show?", ["Speed", "Direction", "Altitude", "Temperature"], 2, "The altimeter shows altitude (height above sea level)."),
      createTF("Modern aircraft only use mechanical instruments.", false, "Modern aircraft use glass cockpits with electronic displays."),
      createMCQ("What powers the airspeed indicator?", ["Gyroscope", "Pitot-static system", "GPS", "Compass"], 1, "The pitot-static system powers the airspeed indicator."),
      createMCQ("What does the attitude indicator show?", ["Speed", "Pitch and roll", "Altitude", "Heading"], 1, "The attitude indicator shows the aircraft's pitch and roll orientation.")
    ]
  )
];
