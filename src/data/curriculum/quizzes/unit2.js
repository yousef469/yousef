// UNIT 2: Physics Basics - All 6 Quizzes

export const unit2Quizzes = [
  { lessonId: 6, questions: [
    { type: "multiple-choice", question: "What is the unit of force?", options: ["Meter", "Newton", "Kilogram", "Second"], correctAnswer: 1, explanation: "Force is measured in Newtons (N).", points: 10 },
    { type: "multiple-choice", question: "Which law states F = ma?", options: ["First Law", "Second Law", "Third Law", "Law of Gravity"], correctAnswer: 1, explanation: "Newton's Second Law states F = ma.", points: 10 },
    { type: "true-false", question: "An object in motion will stop on its own without force.", correctAnswer: false, explanation: "Newton's First Law: objects in motion stay in motion unless acted upon by force.", points: 10 },
    { type: "multiple-choice", question: "What does Newton's Third Law state?", options: ["Objects at rest stay at rest", "F = ma", "For every action, equal and opposite reaction", "Gravity pulls down"], correctAnswer: 2, explanation: "Newton's Third Law: For every action, equal and opposite reaction.", points: 10 },
    { type: "true-false", question: "Heavier objects need more force to accelerate at same rate.", correctAnswer: true, explanation: "From F = ma, more mass requires more force for same acceleration.", points: 10 }
  ]},
  { lessonId: 7, questions: [
    { type: "multiple-choice", question: "What is the difference between speed and velocity?", options: ["No difference", "Velocity includes direction", "Speed is faster", "Velocity measured differently"], correctAnswer: 1, explanation: "Velocity includes both speed and direction.", points: 10 },
    { type: "multiple-choice", question: "What is acceleration?", options: ["How fast something moves", "Direction of motion", "Rate of change of velocity", "Distance traveled"], correctAnswer: 2, explanation: "Acceleration is rate of change of velocity.", points: 10 },
    { type: "true-false", question: "Acceleration can be negative (slowing down).", correctAnswer: true, explanation: "Negative acceleration means slowing down (deceleration).", points: 10 },
    { type: "multiple-choice", question: "If car goes from 0 to 20 m/s in 5 seconds, what is acceleration?", options: ["2 m/s²", "4 m/s²", "10 m/s²", "100 m/s²"], correctAnswer: 1, explanation: "a = (20 - 0) / 5 = 4 m/s²", points: 10 },
    { type: "true-false", question: "Speed is a vector quantity.", correctAnswer: false, explanation: "Speed is scalar (magnitude only). Velocity is vector.", points: 10 }
  ]},
  { lessonId: 8, questions: [
    { type: "multiple-choice", question: "What is kinetic energy?", options: ["Stored energy", "Energy of motion", "Heat energy", "Light energy"], correctAnswer: 1, explanation: "Kinetic energy is energy of motion.", points: 10 },
    { type: "true-false", question: "Energy can be created and destroyed.", correctAnswer: false, explanation: "Energy is conserved - it can only change forms.", points: 10 },
    { type: "multiple-choice", question: "What is the formula for work?", options: ["W = F × d", "W = m × a", "W = ½mv²", "W = mgh"], correctAnswer: 0, explanation: "Work equals force times distance (W = F × d).", points: 10 },
    { type: "multiple-choice", question: "What is power?", options: ["Force times distance", "Rate of doing work", "Energy stored", "Mass times velocity"], correctAnswer: 1, explanation: "Power is rate of doing work.", points: 10 },
    { type: "true-false", question: "Aircraft at high altitude has potential energy.", correctAnswer: true, explanation: "Gravitational potential energy increases with height.", points: 10 }
  ]},
  { lessonId: 9, questions: [
    { type: "multiple-choice", question: "What is momentum?", options: ["Force times distance", "Mass times velocity", "Energy of motion", "Rate of acceleration"], correctAnswer: 1, explanation: "Momentum equals mass times velocity (p = mv).", points: 10 },
    { type: "true-false", question: "Momentum is conserved in collisions.", correctAnswer: true, explanation: "Total momentum before equals total momentum after collision.", points: 10 },
    { type: "multiple-choice", question: "What is impulse?", options: ["Mass times velocity", "Force times time", "Energy stored", "Speed times distance"], correctAnswer: 1, explanation: "Impulse equals force times time.", points: 10 },
    { type: "true-false", question: "Increasing collision time reduces force experienced.", correctAnswer: true, explanation: "For same impulse, longer time means less force.", points: 10 },
    { type: "multiple-choice", question: "Why do airbags make cars safer?", options: ["Add weight", "Increase collision time, reducing force", "Increase momentum", "Make car faster"], correctAnswer: 1, explanation: "Airbags increase collision time, reducing force on passengers.", points: 10 }
  ]},
  { lessonId: 10, questions: [
    { type: "multiple-choice", question: "What is acceleration due to gravity on Earth?", options: ["1 m/s²", "9.8 m/s²", "32 m/s²", "100 m/s²"], correctAnswer: 1, explanation: "Earth's gravitational acceleration is 9.8 m/s².", points: 10 },
    { type: "multiple-choice", question: "What is difference between mass and weight?", options: ["No difference", "Mass is matter, weight is gravity force", "Weight measured in kg", "Mass changes with location"], correctAnswer: 1, explanation: "Mass is amount of matter (constant), weight is gravitational force (varies).", points: 10 },
    { type: "true-false", question: "Your weight would be same on Moon as Earth.", correctAnswer: false, explanation: "Weight depends on gravity. Moon's gravity is weaker.", points: 10 },
    { type: "multiple-choice", question: "What is formula for weight?", options: ["W = m × v", "W = m × g", "W = F × d", "W = ½mv²"], correctAnswer: 1, explanation: "Weight equals mass times gravitational acceleration (W = mg).", points: 10 },
    { type: "true-false", question: "Gravity only works on Earth.", correctAnswer: false, explanation: "Gravity is universal - works everywhere between all masses.", points: 10 }
  ]},
  { lessonId: 11, questions: [
    { type: "multiple-choice", question: "How many simple machines are there?", options: ["Three", "Six", "Ten", "Twelve"], correctAnswer: 1, explanation: "There are six simple machines.", points: 10 },
    { type: "multiple-choice", question: "What is mechanical advantage?", options: ["Speed of machine", "Ratio of output to input force", "Weight of machine", "Energy efficiency"], correctAnswer: 1, explanation: "Mechanical advantage is ratio of output force to input force.", points: 10 },
    { type: "true-false", question: "A lever is a type of simple machine.", correctAnswer: true, explanation: "Lever is one of six simple machines.", points: 10 },
    { type: "multiple-choice", question: "What is pivot point of lever called?", options: ["Axle", "Fulcrum", "Wedge", "Pulley"], correctAnswer: 1, explanation: "Pivot point of lever is called fulcrum.", points: 10 },
    { type: "true-false", question: "Simple machines can reduce total work needed.", correctAnswer: false, explanation: "Simple machines make work easier but don't reduce total work.", points: 10 }
  ]}
];

export default unit2Quizzes;
