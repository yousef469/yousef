// UNIT 5: Aircraft Components - All 6 Quizzes

export const unit5Quizzes = [
  { lessonId: 24, questions: [
    { type: "multiple-choice", question: "What is main structural beam in wing?", options: ["Rib", "Spar", "Skin", "Stringer"], correctAnswer: 1, explanation: "Spars are main structural beams running length of wing.", points: 10 },
    { type: "multiple-choice", question: "What gives wing its aerodynamic shape?", options: ["Spars", "Ribs", "Skin", "Flaps"], correctAnswer: 1, explanation: "Ribs give wing its airfoil shape.", points: 10 },
    { type: "true-false", question: "Wings must be both strong and lightweight.", correctAnswer: true, explanation: "Wings must support loads while minimizing weight.", points: 10 },
    { type: "multiple-choice", question: "What is airfoil?", options: ["Wing tip", "Wing cross-section shape", "Wing material", "Wing size"], correctAnswer: 1, explanation: "Airfoil is cross-sectional shape of wing.", points: 10 },
    { type: "true-false", question: "All wings have same airfoil shape.", correctAnswer: false, explanation: "Different airfoils for different purposes (speed, lift, etc).", points: 10 }
  ]},
  { lessonId: 25, questions: [
    { type: "multiple-choice", question: "What is fuselage?", options: ["Wing", "Main body of aircraft", "Tail", "Engine"], correctAnswer: 1, explanation: "Fuselage is main body housing crew and passengers.", points: 10 },
    { type: "multiple-choice", question: "Most common fuselage type?", options: ["Truss", "Monocoque", "Semi-monocoque", "Composite"], correctAnswer: 2, explanation: "Semi-monocoque (skin + frames) is most common.", points: 10 },
    { type: "true-false", question: "Fuselage skin carries structural loads.", correctAnswer: true, explanation: "In semi-monocoque, skin shares load with frames.", points: 10 },
    { type: "multiple-choice", question: "What are frames in fuselage?", options: ["Windows", "Circular supports", "Doors", "Seats"], correctAnswer: 1, explanation: "Frames are circular supports maintaining fuselage shape.", points: 10 },
    { type: "true-false", question: "Fuselage must withstand pressurization.", correctAnswer: true, explanation: "Pressurized aircraft fuselage must contain cabin pressure.", points: 10 }
  ]},
  { lessonId: 26, questions: [
    { type: "multiple-choice", question: "What is empennage?", options: ["Wing", "Engine", "Tail section", "Cockpit"], correctAnswer: 2, explanation: "Empennage is tail section of aircraft.", points: 10 },
    { type: "multiple-choice", question: "Which control surface is on vertical stabilizer?", options: ["Aileron", "Elevator", "Rudder", "Flap"], correctAnswer: 2, explanation: "Rudder is on vertical stabilizer, controls yaw.", points: 10 },
    { type: "true-false", question: "Horizontal stabilizer prevents pitch oscillations.", correctAnswer: true, explanation: "Horizontal stabilizer provides longitudinal stability.", points: 10 },
    { type: "multiple-choice", question: "What does elevator control?", options: ["Roll", "Pitch", "Yaw", "Speed"], correctAnswer: 1, explanation: "Elevator controls pitch (nose up/down).", points: 10 },
    { type: "true-false", question: "Tail provides stability and control.", correctAnswer: true, explanation: "Empennage provides both stability and control authority.", points: 10 }
  ]},
  { lessonId: 27, questions: [
    { type: "multiple-choice", question: "Most common landing gear configuration?", options: ["Tailwheel", "Tricycle", "Tandem", "Bicycle"], correctAnswer: 1, explanation: "Tricycle (nose wheel + 2 main) is most common.", points: 10 },
    { type: "multiple-choice", question: "What absorbs landing impact?", options: ["Wheels", "Shock absorbers", "Brakes", "Tires"], correctAnswer: 1, explanation: "Shock absorbers cushion landing impact.", points: 10 },
    { type: "true-false", question: "Retractable gear reduces drag in flight.", correctAnswer: true, explanation: "Retracting gear reduces drag, improving efficiency.", points: 10 },
    { type: "multiple-choice", question: "What is strut?", options: ["Wheel", "Support leg", "Brake", "Tire"], correctAnswer: 1, explanation: "Strut is support leg of landing gear.", points: 10 },
    { type: "true-false", question: "All aircraft have retractable landing gear.", correctAnswer: false, explanation: "Many small aircraft have fixed gear.", points: 10 }
  ]},
  { lessonId: 28, questions: [
    { type: "multiple-choice", question: "Which control surface controls roll?", options: ["Elevator", "Rudder", "Ailerons", "Flaps"], correctAnswer: 2, explanation: "Ailerons on wings control roll.", points: 10 },
    { type: "multiple-choice", question: "What do flaps do?", options: ["Control roll", "Increase lift", "Control yaw", "Reduce speed"], correctAnswer: 1, explanation: "Flaps increase lift for takeoff and landing.", points: 10 },
    { type: "true-false", question: "Rudder controls pitch.", correctAnswer: false, explanation: "Rudder controls yaw. Elevator controls pitch.", points: 10 },
    { type: "multiple-choice", question: "Where are ailerons located?", options: ["Tail", "Wings", "Fuselage", "Nose"], correctAnswer: 1, explanation: "Ailerons are on trailing edge of wings.", points: 10 },
    { type: "true-false", question: "Trim reduces control forces for pilot.", correctAnswer: true, explanation: "Trim adjusts control surfaces to reduce pilot workload.", points: 10 }
  ]},
  { lessonId: 29, questions: [
    { type: "multiple-choice", question: "What does airspeed indicator show?", options: ["Altitude", "Speed", "Direction", "Fuel"], correctAnswer: 1, explanation: "Airspeed indicator shows aircraft speed.", points: 10 },
    { type: "multiple-choice", question: "Which instrument shows altitude?", options: ["Airspeed indicator", "Altimeter", "Attitude indicator", "Turn coordinator"], correctAnswer: 1, explanation: "Altimeter shows altitude above sea level.", points: 10 },
    { type: "true-false", question: "Six pack refers to primary flight instruments.", correctAnswer: true, explanation: "Six pack is standard arrangement of six primary instruments.", points: 10 },
    { type: "multiple-choice", question: "What does attitude indicator show?", options: ["Speed", "Altitude", "Pitch and roll", "Direction"], correctAnswer: 2, explanation: "Attitude indicator shows aircraft pitch and roll.", points: 10 },
    { type: "true-false", question: "Engine instruments monitor powerplant health.", correctAnswer: true, explanation: "Engine instruments show RPM, temperature, pressure, etc.", points: 10 }
  ]}
];

export default unit5Quizzes;
