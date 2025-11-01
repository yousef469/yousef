// UNIT 5: Aircraft Components - All 6 Lessons

export const unit5Lessons = [
  { id: 24, title: "Wings & Airfoils", unitNumber: 5, lessonNumber: 1, duration: "20 min", emoji: "🦅",
    introduction: "Wings are the most important component for generating lift. Understanding wing structure and airfoil design is fundamental.",
    sections: [
      { title: "Wing Structure", content: "Main Parts:\n• Spars: Main structural beams\n• Ribs: Shape airfoil\n• Skin: Outer covering\n• Stringers: Reinforcement\n\nWings must be strong yet lightweight!" },
      { title: "Airfoil Design", content: "Leading Edge: Front of wing\nTrailing Edge: Back of wing\nChord Line: Straight line from leading to trailing edge\nCamber: Curvature of airfoil" }
    ],
    keyTakeaways: ["Wings generate lift through airfoil shape", "Structure balances strength and weight", "Different airfoils for different purposes"],
    vocabulary: [{ term: "Spar", definition: "Main structural beam in wing" }, { term: "Airfoil", definition: "Wing cross-section shape" }]
  },
  { id: 25, title: "Fuselage Structure", unitNumber: 5, lessonNumber: 2, duration: "18 min", emoji: "🛩️",
    introduction: "The fuselage is the main body of the aircraft, housing crew, passengers, and cargo.",
    sections: [
      { title: "Fuselage Types", content: "Truss: Framework of tubes\nMonocoque: Skin carries loads\nSemi-monocoque: Skin + frames (most common)" },
      { title: "Components", content: "Frames: Circular supports\nBulkheads: Dividing walls\nStringers: Longitudinal reinforcement\nSkin: Outer shell" }
    ],
    keyTakeaways: ["Fuselage is main aircraft body", "Semi-monocoque most common design", "Must withstand pressurization and loads"],
    vocabulary: [{ term: "Fuselage", definition: "Main body of aircraft" }, { term: "Bulkhead", definition: "Structural dividing wall" }]
  },
  { id: 26, title: "Empennage (Tail)", unitNumber: 5, lessonNumber: 3, duration: "18 min", emoji: "📐",
    introduction: "The empennage (tail section) provides stability and control. It includes horizontal and vertical stabilizers.",
    sections: [
      { title: "Tail Components", content: "Vertical Stabilizer: Prevents yaw\nHorizontal Stabilizer: Prevents pitch\nRudder: Controls yaw\nElevator: Controls pitch" },
      { title: "Stability", content: "Tail provides:\n• Directional stability (vertical)\n• Longitudinal stability (horizontal)\n• Control authority" }
    ],
    keyTakeaways: ["Empennage is tail section", "Provides stability and control", "Includes rudder and elevator"],
    vocabulary: [{ term: "Empennage", definition: "Tail section of aircraft" }, { term: "Stabilizer", definition: "Fixed surface providing stability" }]
  },
  { id: 27, title: "Landing Gear", unitNumber: 5, lessonNumber: 4, duration: "18 min", emoji: "🛬",
    introduction: "Landing gear supports the aircraft on ground and absorbs landing impact. Different configurations suit different aircraft.",
    sections: [
      { title: "Gear Types", content: "Tricycle: Nose wheel + 2 main (most common)\nTailwheel: 2 main + tail wheel\nTandem: Front and rear on centerline" },
      { title: "Components", content: "Struts: Support structure\nShock Absorbers: Cushion landing\nWheels & Brakes: Ground control\nRetraction System: Stow in flight" }
    ],
    keyTakeaways: ["Landing gear supports aircraft on ground", "Tricycle configuration most common", "Retractable gear reduces drag"],
    vocabulary: [{ term: "Landing Gear", definition: "Wheels and support structure" }, { term: "Strut", definition: "Support leg of landing gear" }]
  },
  { id: 28, title: "Control Systems", unitNumber: 5, lessonNumber: 5, duration: "20 min", emoji: "🎮",
    introduction: "Control surfaces allow pilots to maneuver the aircraft. Understanding these systems is essential for flight.",
    sections: [
      { title: "Primary Controls", content: "Ailerons: Roll control (on wings)\nElevator: Pitch control (on tail)\nRudder: Yaw control (on vertical stabilizer)" },
      { title: "Secondary Controls", content: "Flaps: Increase lift for takeoff/landing\nSlats: Leading edge devices\nSpoilers: Reduce lift, increase drag\nTrim: Reduce control forces" }
    ],
    keyTakeaways: ["Three primary control surfaces", "Ailerons control roll, elevator pitch, rudder yaw", "Secondary controls enhance performance"],
    vocabulary: [{ term: "Aileron", definition: "Wing surface controlling roll" }, { term: "Elevator", definition: "Tail surface controlling pitch" }]
  },
  { id: 29, title: "Flight Instruments", unitNumber: 5, lessonNumber: 6, duration: "20 min", emoji: "📊",
    introduction: "Flight instruments provide pilots with critical information about aircraft state and performance.",
    sections: [
      { title: "Six Pack", content: "Airspeed Indicator: How fast\nAttitude Indicator: Pitch and roll\nAltimeter: How high\nTurn Coordinator: Rate of turn\nHeading Indicator: Direction\nVertical Speed: Climb/descent rate" },
      { title: "Engine Instruments", content: "Tachometer: Engine RPM\nFuel Gauges: Fuel quantity\nOil Pressure: Engine health\nTemperature Gauges: Engine temp" }
    ],
    keyTakeaways: ["Six pack are primary flight instruments", "Provide speed, attitude, altitude info", "Engine instruments monitor powerplant"],
    vocabulary: [{ term: "Airspeed Indicator", definition: "Shows aircraft speed" }, { term: "Altimeter", definition: "Shows altitude above sea level" }]
  }
];

export default unit5Lessons;
