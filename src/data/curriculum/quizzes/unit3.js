// UNIT 3: Mathematics for Engineers - All 6 Quizzes

export const unit3Quizzes = [
  { lessonId: 12, questions: [
    { type: "multiple-choice", question: "What is a variable in algebra?", options: ["A number", "Symbol representing unknown value", "An equation", "A formula"], correctAnswer: 1, explanation: "Variable is symbol (like x or y) representing unknown value.", points: 10 },
    { type: "multiple-choice", question: "If F = ma, F = 100N, m = 10kg, what is a?", options: ["1 m/s²", "10 m/s²", "100 m/s²", "1000 m/s²"], correctAnswer: 1, explanation: "a = F/m = 100/10 = 10 m/s²", points: 10 },
    { type: "true-false", question: "Must perform same operation on both sides of equation.", correctAnswer: true, explanation: "To maintain equality, do same operation to both sides.", points: 10 },
    { type: "multiple-choice", question: "If d = vt, d = 50m, t = 5s, what is v?", options: ["5 m/s", "10 m/s", "25 m/s", "250 m/s"], correctAnswer: 1, explanation: "v = d/t = 50/5 = 10 m/s", points: 10 },
    { type: "true-false", question: "Engineering formulas are algebraic equations.", correctAnswer: true, explanation: "Engineering formulas like F=ma are algebraic equations.", points: 10 }
  ]},
  { lessonId: 13, questions: [
    { type: "multiple-choice", question: "What does sine (sin) represent?", options: ["Adjacent/hypotenuse", "Opposite/hypotenuse", "Opposite/adjacent", "Hypotenuse/opposite"], correctAnswer: 1, explanation: "Sine is ratio of opposite side to hypotenuse.", points: 10 },
    { type: "multiple-choice", question: "What is cosine (cos)?", options: ["Opposite/hypotenuse", "Adjacent/hypotenuse", "Opposite/adjacent", "Hypotenuse/adjacent"], correctAnswer: 1, explanation: "Cosine is ratio of adjacent side to hypotenuse.", points: 10 },
    { type: "true-false", question: "Trigonometry only works with right triangles.", correctAnswer: false, explanation: "Trig works with all triangles, but right triangles are simplest.", points: 10 },
    { type: "multiple-choice", question: "Tangent (tan) equals?", options: ["sin/cos", "cos/sin", "sin × cos", "1/sin"], correctAnswer: 0, explanation: "Tangent equals sine divided by cosine (opposite/adjacent).", points: 10 },
    { type: "true-false", question: "Engineers use trigonometry to analyze forces.", correctAnswer: true, explanation: "Trig is essential for breaking forces into components.", points: 10 }
  ]},
  { lessonId: 14, questions: [
    { type: "multiple-choice", question: "What is formula for area of circle?", options: ["πr", "πr²", "2πr", "πd"], correctAnswer: 1, explanation: "Area of circle is πr² (pi times radius squared).", points: 10 },
    { type: "multiple-choice", question: "What is formula for volume of cylinder?", options: ["πr²", "πr²h", "2πrh", "4πr²"], correctAnswer: 1, explanation: "Volume of cylinder is πr²h (area of base times height).", points: 10 },
    { type: "true-false", question: "Area is measured in cubic units.", correctAnswer: false, explanation: "Area is measured in square units. Volume is cubic units.", points: 10 },
    { type: "multiple-choice", question: "Rectangle area formula?", options: ["length + width", "length × width", "2(length + width)", "length²"], correctAnswer: 1, explanation: "Rectangle area equals length times width.", points: 10 },
    { type: "true-false", question: "Geometry is used to calculate wing areas.", correctAnswer: true, explanation: "Engineers use geometry to calculate wing areas and other dimensions.", points: 10 }
  ]},
  { lessonId: 15, questions: [
    { type: "multiple-choice", question: "What is a vector?", options: ["Quantity with magnitude only", "Quantity with magnitude and direction", "A number", "A formula"], correctAnswer: 1, explanation: "Vector has both magnitude (size) and direction.", points: 10 },
    { type: "multiple-choice", question: "Which is a vector quantity?", options: ["Speed", "Mass", "Velocity", "Temperature"], correctAnswer: 2, explanation: "Velocity is vector (has direction). Speed is scalar.", points: 10 },
    { type: "true-false", question: "Scalars have direction.", correctAnswer: false, explanation: "Scalars have magnitude only, no direction.", points: 10 },
    { type: "multiple-choice", question: "How to find x-component of vector?", options: ["V × sin(θ)", "V × cos(θ)", "V × tan(θ)", "V / cos(θ)"], correctAnswer: 1, explanation: "X-component equals V × cos(θ).", points: 10 },
    { type: "true-false", question: "Forces are vector quantities.", correctAnswer: true, explanation: "Forces have both magnitude and direction, making them vectors.", points: 10 }
  ]},
  { lessonId: 16, questions: [
    { type: "multiple-choice", question: "What does a derivative represent?", options: ["Total value", "Rate of change", "Average", "Sum"], correctAnswer: 1, explanation: "Derivative represents rate of change.", points: 10 },
    { type: "multiple-choice", question: "Velocity is derivative of what?", options: ["Acceleration", "Position", "Force", "Time"], correctAnswer: 1, explanation: "Velocity is rate of change of position (derivative of position).", points: 10 },
    { type: "true-false", question: "Calculus is only used in advanced engineering.", correctAnswer: false, explanation: "Calculus is fundamental to all engineering disciplines.", points: 10 },
    { type: "multiple-choice", question: "Acceleration is derivative of?", options: ["Position", "Velocity", "Distance", "Force"], correctAnswer: 1, explanation: "Acceleration is rate of change of velocity.", points: 10 },
    { type: "true-false", question: "Derivatives help optimize designs.", correctAnswer: true, explanation: "Engineers use derivatives to find optimal solutions.", points: 10 }
  ]},
  { lessonId: 17, questions: [
    { type: "multiple-choice", question: "What is SI unit for force?", options: ["Kilogram", "Newton", "Joule", "Watt"], correctAnswer: 1, explanation: "Newton (N) is SI unit for force.", points: 10 },
    { type: "multiple-choice", question: "How many meters in 1 kilometer?", options: ["10", "100", "1000", "10000"], correctAnswer: 2, explanation: "1 kilometer equals 1000 meters.", points: 10 },
    { type: "true-false", question: "Unit conversions are optional in engineering.", correctAnswer: false, explanation: "Unit conversions are critical - errors can cause failures.", points: 10 },
    { type: "multiple-choice", question: "What is SI unit for energy?", options: ["Newton", "Watt", "Joule", "Pascal"], correctAnswer: 2, explanation: "Joule (J) is SI unit for energy.", points: 10 },
    { type: "true-false", question: "Always check units in calculations.", correctAnswer: true, explanation: "Checking units prevents errors and ensures correct answers.", points: 10 }
  ]}
];

export default unit3Quizzes;
