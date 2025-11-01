// UNIT 4: Basics of Flight - All 6 Quizzes

export const unit4Quizzes = [
  { lessonId: 18, questions: [
    { type: "multiple-choice", question: "What are the four forces of flight?", options: ["Lift, weight, speed, direction", "Lift, weight, thrust, drag", "Thrust, drag, speed, altitude", "Lift, drag, power, weight"], correctAnswer: 1, explanation: "Four forces are lift, weight, thrust, and drag.", points: 10 },
    { type: "multiple-choice", question: "For level flight, lift must equal?", options: ["Thrust", "Drag", "Weight", "Speed"], correctAnswer: 2, explanation: "For level flight, lift must equal weight.", points: 10 },
    { type: "true-false", question: "Thrust must equal drag for steady flight.", correctAnswer: true, explanation: "For steady flight, thrust equals drag (no acceleration).", points: 10 },
    { type: "multiple-choice", question: "Which force opposes motion?", options: ["Lift", "Weight", "Thrust", "Drag"], correctAnswer: 3, explanation: "Drag is air resistance that opposes motion.", points: 10 },
    { type: "true-false", question: "To climb, lift must be greater than weight.", correctAnswer: true, explanation: "Climbing requires lift greater than weight.", points: 10 }
  ]},
  { lessonId: 19, questions: [
    { type: "multiple-choice", question: "According to Bernoulli, faster air has?", options: ["Higher pressure", "Lower pressure", "Same pressure", "No pressure"], correctAnswer: 1, explanation: "Bernoulli's principle: faster air has lower pressure.", points: 10 },
    { type: "multiple-choice", question: "What is an airfoil?", options: ["Type of engine", "Wing cross-section shape", "Landing gear", "Fuel tank"], correctAnswer: 1, explanation: "Airfoil is the cross-sectional shape of a wing.", points: 10 },
    { type: "true-false", question: "Air moves faster over top of wing.", correctAnswer: true, explanation: "Wing shape causes air to move faster over top surface.", points: 10 },
    { type: "multiple-choice", question: "Pressure difference between top and bottom of wing creates?", options: ["Drag", "Weight", "Lift", "Thrust"], correctAnswer: 2, explanation: "Pressure difference creates lift force.", points: 10 },
    { type: "true-false", question: "Wings must be curved to generate lift.", correctAnswer: false, explanation: "Even flat plates at angle can generate lift, but curved is more efficient.", points: 10 }
  ]},
  { lessonId: 20, questions: [
    { type: "multiple-choice", question: "What is angle of attack?", options: ["Angle of wings to fuselage", "Angle between wing and airflow", "Angle of climb", "Angle of bank"], correctAnswer: 1, explanation: "AOA is angle between wing chord and relative wind.", points: 10 },
    { type: "multiple-choice", question: "What happens at too large AOA?", options: ["Maximum lift", "Stall", "Maximum speed", "Best efficiency"], correctAnswer: 1, explanation: "Too large AOA causes stall (loss of lift).", points: 10 },
    { type: "true-false", question: "Increasing AOA always increases lift.", correctAnswer: false, explanation: "Lift increases up to critical AOA, then decreases (stall).", points: 10 },
    { type: "multiple-choice", question: "To recover from stall, pilot must?", options: ["Increase AOA", "Decrease AOA", "Add more power", "Turn sharply"], correctAnswer: 1, explanation: "Must decrease AOA to restore smooth airflow.", points: 10 },
    { type: "true-false", question: "AOA is one of most important factors affecting lift.", correctAnswer: true, explanation: "AOA is critical factor in lift generation.", points: 10 }
  ]},
  { lessonId: 21, questions: [
    { type: "multiple-choice", question: "What force propels aircraft forward?", options: ["Lift", "Weight", "Thrust", "Drag"], correctAnswer: 2, explanation: "Thrust is forward force from engines.", points: 10 },
    { type: "multiple-choice", question: "Which engine type works in space?", options: ["Propeller", "Jet engine", "Rocket", "Turboprop"], correctAnswer: 2, explanation: "Rockets carry own oxygen and work in space.", points: 10 },
    { type: "true-false", question: "All engines use Newton's 3rd Law.", correctAnswer: true, explanation: "All propulsion uses action-reaction principle.", points: 10 },
    { type: "multiple-choice", question: "When is maximum thrust needed?", options: ["Cruise", "Descent", "Takeoff", "Landing"], correctAnswer: 2, explanation: "Takeoff requires maximum thrust to accelerate.", points: 10 },
    { type: "true-false", question: "Thrust must overcome drag for forward motion.", correctAnswer: true, explanation: "Thrust must be greater than drag to accelerate.", points: 10 }
  ]},
  { lessonId: 22, questions: [
    { type: "multiple-choice", question: "What is center of gravity?", options: ["Heaviest point", "Point where aircraft balances", "Center of wing", "Nose of aircraft"], correctAnswer: 1, explanation: "CG is point where aircraft balances.", points: 10 },
    { type: "multiple-choice", question: "CG too far forward causes?", options: ["Tail-heavy", "Nose-heavy", "Perfect balance", "No effect"], correctAnswer: 1, explanation: "Forward CG makes aircraft nose-heavy.", points: 10 },
    { type: "true-false", question: "More weight requires more lift.", correctAnswer: true, explanation: "Heavier aircraft needs more lift to fly.", points: 10 },
    { type: "multiple-choice", question: "What affects total aircraft weight?", options: ["Only empty weight", "Empty weight + fuel + cargo + passengers", "Only fuel", "Only passengers"], correctAnswer: 1, explanation: "Total weight includes everything on aircraft.", points: 10 },
    { type: "true-false", question: "CG must be within limits for safe flight.", correctAnswer: true, explanation: "CG outside limits makes aircraft unsafe to fly.", points: 10 }
  ]},
  { lessonId: 23, questions: [
    { type: "multiple-choice", question: "What is flight envelope?", options: ["Aircraft shape", "Safe operating limits", "Fuel capacity", "Passenger capacity"], correctAnswer: 1, explanation: "Flight envelope defines safe operating limits.", points: 10 },
    { type: "multiple-choice", question: "What is Vne?", options: ["Normal speed", "Never exceed speed", "Takeoff speed", "Landing speed"], correctAnswer: 1, explanation: "Vne is never exceed speed (maximum safe speed).", points: 10 },
    { type: "true-false", question: "Pilots can exceed flight envelope limits if careful.", correctAnswer: false, explanation: "Must never exceed flight envelope limits - structural failure risk.", points: 10 },
    { type: "multiple-choice", question: "What is stall speed called?", options: ["Vne", "Vs", "Vr", "Vy"], correctAnswer: 1, explanation: "Vs is stall speed.", points: 10 },
    { type: "true-false", question: "V-speeds help pilots operate aircraft safely.", correctAnswer: true, explanation: "V-speeds are standard references for safe operation.", points: 10 }
  ]}
];

export default unit4Quizzes;
