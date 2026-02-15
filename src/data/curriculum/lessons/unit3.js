// UNIT 3: Mathematics for Engineers - All 6 Lessons

export const unit3Lessons = [
  { id: 12, title: "Algebra for Engineering", unitNumber: 3, lessonNumber: 1, duration: "20 min", emoji: "📐",
    introduction: "Algebra is the language of engineering. Engineers use algebraic equations to model systems and solve problems.",
    sections: [
      { title: "Variables and Equations", content: "Variables: Symbols representing unknown values (x, y, z)\nEquations: Mathematical statements showing equality\n\nExample: F = ma" },
      { title: "Solving Equations", content: "Steps:\n1. Simplify both sides\n2. Isolate variable\n3. Perform same operation on both sides\n4. Check answer" }
    ],
    keyTakeaways: ["Algebra uses variables for unknowns", "Equations show relationships", "Solving means isolating variable"],
    vocabulary: [{ term: "Variable", definition: "Symbol representing unknown value" }, { term: "Equation", definition: "Mathematical statement of equality" }]
  },
  { id: 13, title: "Trigonometry", unitNumber: 3, lessonNumber: 2, duration: "20 min", emoji: "📐",
    introduction: "Trigonometry studies relationships between angles and sides of triangles. Essential for analyzing forces and vectors.",
    sections: [
      { title: "Basic Functions", content: "Sine (sin): opposite / hypotenuse\nCosine (cos): adjacent / hypotenuse\nTangent (tan): opposite / adjacent" },
      { title: "Applications", content: "• Calculating force components\n• Analyzing angles of attack\n• Navigation and positioning" }
    ],
    keyTakeaways: ["Trig relates angles to triangle sides", "Sin, cos, tan are fundamental functions", "Used for force analysis"],
    vocabulary: [{ term: "Sine", definition: "Ratio of opposite to hypotenuse" }, { term: "Cosine", definition: "Ratio of adjacent to hypotenuse" }]
  },
  { id: 14, title: "Geometry", unitNumber: 3, lessonNumber: 3, duration: "18 min", emoji: "📐",
    introduction: "Geometry studies shapes, sizes, and spatial relationships. Engineers use geometry to design structures and calculate dimensions.",
    sections: [
      { title: "Areas and Volumes", content: "Rectangle: A = length × width\nCircle: A = πr²\nCylinder: V = πr²h\nSphere: V = (4/3)πr³" },
      { title: "Engineering Applications", content: "• Wing area calculations\n• Fuel tank volumes\n• Structural dimensions" }
    ],
    keyTakeaways: ["Geometry calculates areas and volumes", "Essential for design work", "Used in all engineering fields"],
    vocabulary: [{ term: "Area", definition: "Amount of surface space" }, { term: "Volume", definition: "Amount of 3D space" }]
  },
  { id: 15, title: "Vectors & Direction", unitNumber: 3, lessonNumber: 4, duration: "20 min", emoji: "➡️",
    introduction: "Vectors have both magnitude and direction. Understanding vectors is crucial for analyzing forces and motion.",
    sections: [
      { title: "Vector Basics", content: "Vector: Quantity with magnitude AND direction\nScalar: Quantity with magnitude only\n\nExamples:\nVector: Velocity, force\nScalar: Speed, mass" },
      { title: "Vector Components", content: "Breaking vectors into x and y components:\nVx = V × cos(θ)\nVy = V × sin(θ)" }
    ],
    keyTakeaways: ["Vectors have magnitude and direction", "Can be broken into components", "Essential for force analysis"],
    vocabulary: [{ term: "Vector", definition: "Quantity with magnitude and direction" }, { term: "Component", definition: "Part of vector in specific direction" }]
  },
  { id: 16, title: "Intro to Calculus", unitNumber: 3, lessonNumber: 5, duration: "20 min", emoji: "📈",
    introduction: "Calculus studies rates of change and accumulation. Engineers use calculus to analyze motion, optimize designs, and model systems.",
    sections: [
      { title: "Derivatives", content: "Derivative: Rate of change\n• Velocity is derivative of position\n• Acceleration is derivative of velocity\n\nSymbol: dy/dx" },
      { title: "Applications", content: "• Analyzing acceleration\n• Optimizing fuel efficiency\n• Modeling aerodynamic forces" }
    ],
    keyTakeaways: ["Calculus studies rates of change", "Derivatives show how things change", "Essential for advanced engineering"],
    vocabulary: [{ term: "Derivative", definition: "Rate of change of a function" }, { term: "Rate of Change", definition: "How fast something changes" }]
  },
  { id: 17, title: "Engineering Notation", unitNumber: 3, lessonNumber: 6, duration: "18 min", emoji: "🔢",
    introduction: "Engineers use standard notation and units to communicate precisely. Understanding units and conversions is essential.",
    sections: [
      { title: "SI Units", content: "Length: meter (m)\nMass: kilogram (kg)\nTime: second (s)\nForce: Newton (N)\nEnergy: Joule (J)" },
      { title: "Unit Conversions", content: "1 km = 1000 m\n1 hour = 3600 s\n1 mph = 0.447 m/s\n\nAlways check units in calculations!" }
    ],
    keyTakeaways: ["SI units are standard in engineering", "Unit conversions are critical", "Always check units in calculations"],
    vocabulary: [{ term: "SI Units", definition: "International System of Units" }, { term: "Conversion", definition: "Changing from one unit to another" }]
  }
];

export default unit3Lessons;
