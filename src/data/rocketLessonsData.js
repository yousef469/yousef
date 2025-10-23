// Complete Rocket Engineering Curriculum
// 4 Modules × 6 Lessons = 24 Lessons

export const rocketLessons = {
  // MODULE 1: Rocket Flight Dynamics
  1: {
    module: 1,
    title: "What Makes Rockets Fly?",
    concept: "Introduce thrust, gravity, drag — the 3 main forces",
    questions: [
      { q: "What is the upward force that moves a rocket?", a: "Thrust", options: ["Thrust", "Lift", "Pressure", "Wind"] },
      { q: "What pulls the rocket back toward Earth?", a: "Gravity", options: ["Gravity", "Drag", "Weight", "Friction"] },
      { q: "What is the air resistance that slows it down called?", a: "Drag", options: ["Friction", "Drag", "Resistance", "Pull"] },
      { q: "When thrust > gravity, what happens?", a: "Rocket accelerates upward", options: ["Rocket accelerates upward", "Rocket falls", "Rocket hovers", "Nothing"] },
      { q: "When thrust = gravity, what happens?", a: "Rocket hovers", options: ["Rocket falls", "Rocket hovers", "Rocket accelerates", "Rocket explodes"] },
      { q: "When thrust < gravity, what happens?", a: "Rocket falls", options: ["Rocket rises", "Rocket falls", "Rocket hovers", "Rocket spins"] }
    ]
  },
  2: {
    module: 1,
    title: "Newton's Third Law in Rockets",
    concept: "For every action, there's an equal and opposite reaction",
    questions: [
      { q: "What pushes the rocket upward?", a: "Exhaust gases pushing down", options: ["Exhaust gases pushing down", "Air pressure", "Gravity", "Wind"] },
      { q: "What direction do exhaust gases move?", a: "Downward", options: ["Upward", "Downward", "Sideways", "All directions"] },
      { q: "What happens if a rocket has no exhaust gas?", a: "No thrust", options: ["Still flies", "No thrust", "Goes faster", "Explodes"] },
      { q: "Why does air not matter in space for thrust?", a: "Rockets push against exhaust, not air", options: ["No gravity", "Rockets push against exhaust, not air", "Space is cold", "No friction"] },
      { q: "If exhaust speed increases, what happens to thrust?", a: "Thrust increases", options: ["Thrust decreases", "Thrust increases", "No change", "Rocket stops"] },
      { q: "What everyday object shows Newton's third law?", a: "Balloon flying when released", options: ["Falling ball", "Balloon flying when released", "Rolling wheel", "Floating boat"] }
    ]
  },
  3: {
    module: 1,
    title: "Changing Mass & Fuel Burn",
    concept: "As fuel burns, mass decreases → acceleration increases",
    questions: [
      { q: "When a rocket burns fuel, does its mass increase or decrease?", a: "Decrease", options: ["Increase", "Decrease", "Stay same", "Double"] },
      { q: "If mass gets smaller but thrust stays the same, what happens to acceleration?", a: "Acceleration increases", options: ["Decreases", "Acceleration increases", "Stays same", "Stops"] },
      { q: "Why does the rocket speed up faster later in flight?", a: "Less mass to push", options: ["More fuel", "Less mass to push", "More thrust", "Less drag"] },
      { q: "What's the tradeoff between carrying more fuel and more mass?", a: "More fuel = more mass to lift", options: ["No tradeoff", "More fuel = more mass to lift", "More fuel = less mass", "Fuel has no mass"] },
      { q: "What happens if you burn fuel too fast?", a: "Run out early", options: ["Go faster forever", "Run out early", "Get more thrust", "Nothing"] },
      { q: "What's one reason multi-stage rockets exist?", a: "Drop empty mass", options: ["Look cool", "Drop empty mass", "Carry more crew", "Go slower"] }
    ]
  },
  4: {
    module: 1,
    title: "The Rocket Equation (Simplified)",
    concept: "Tsiolkovsky rocket equation without heavy math",
    questions: [
      { q: "What does Δv (delta-v) measure?", a: "Change in velocity", options: ["Weight", "Change in velocity", "Fuel amount", "Distance"] },
      { q: "What two main things affect delta-v?", a: "Fuel ratio and exhaust speed", options: ["Color and size", "Fuel ratio and exhaust speed", "Weight and height", "Cost and time"] },
      { q: "If you increase exhaust speed, what happens to delta-v?", a: "Delta-v increases", options: ["Delta-v decreases", "Delta-v increases", "No change", "Rocket explodes"] },
      { q: "If your rocket is heavy, what happens to delta-v?", a: "Delta-v decreases", options: ["Delta-v increases", "Delta-v decreases", "No change", "Goes faster"] },
      { q: "Can adding more fuel always increase delta-v forever?", a: "No, diminishing returns", options: ["Yes, always", "No, diminishing returns", "Only in space", "Only on Earth"] },
      { q: "Why do rockets need multiple stages?", a: "Drop dead weight", options: ["Look impressive", "Drop dead weight", "Carry more people", "Go slower"] }
    ]
  },
  5: {
    module: 1,
    title: "Staging and Efficiency",
    concept: "Why we drop empty parts to go farther",
    questions: [
      { q: "What is a rocket stage?", a: "A section with engines and fuel", options: ["A platform", "A section with engines and fuel", "A ladder", "A window"] },
      { q: "Why do we drop empty stages?", a: "Reduce mass", options: ["Save money", "Reduce mass", "Look cool", "Make noise"] },
      { q: "What happens to total mass when a stage is dropped?", a: "Decreases", options: ["Increases", "Decreases", "Stays same", "Doubles"] },
      { q: "How does staging improve delta-v?", a: "Less mass to accelerate", options: ["More fuel", "Less mass to accelerate", "More engines", "Better shape"] },
      { q: "Which stage usually burns first: biggest or smallest?", a: "Biggest", options: ["Smallest", "Biggest", "Middle", "All at once"] },
      { q: "What would happen if we didn't drop any stages?", a: "Carry dead weight", options: ["Go faster", "Carry dead weight", "Save fuel", "Fly higher"] }
    ]
  },
  6: {
    module: 1,
    title: "Reusable Rockets",
    concept: "Modern innovation — reuse vs throwaway",
    questions: [
      { q: "What company made rockets land again after launch?", a: "SpaceX", options: ["NASA", "SpaceX", "Boeing", "Blue Origin"] },
      { q: "Why is reusability important?", a: "Reduces cost", options: ["Looks cool", "Reduces cost", "Goes faster", "Carries more"] },
      { q: "What part of the rocket is reused?", a: "First stage booster", options: ["Payload", "First stage booster", "Fuel tank", "Nose cone"] },
      { q: "How do landing rockets slow down?", a: "Reverse thrust", options: ["Parachutes only", "Reverse thrust", "Air brakes", "Bounce"] },
      { q: "What's one problem with reusing rockets?", a: "Needs refurbishment", options: ["Too easy", "Needs refurbishment", "Too fast", "Too cheap"] },
      { q: "What's the benefit for cost and sustainability?", a: "Less waste, lower cost", options: ["More waste", "Less waste, lower cost", "Same cost", "Slower launches"] }
    ]
  },

  // MODULE 2: Aerodynamics
  7: {
    module: 2,
    title: "What is Drag?",
    concept: "Drag is air resistance that opposes motion",
    questions: [
      { q: "What direction does drag act?", a: "Opposite to motion", options: ["Forward", "Opposite to motion", "Upward", "Downward"] },
      { q: "When does drag increase — faster or slower speeds?", a: "Faster speeds", options: ["Slower speeds", "Faster speeds", "Same always", "Never changes"] },
      { q: "What shape has less drag: sphere or cone?", a: "Cone", options: ["Sphere", "Cone", "Cube", "Flat plate"] },
      { q: "What happens if a rocket is blunt-shaped?", a: "More drag", options: ["Less drag", "More drag", "No change", "Goes faster"] },
      { q: "Why does drag heat the rocket during ascent?", a: "Air friction", options: ["Sun", "Air friction", "Engine heat", "Lightning"] },
      { q: "What can reduce drag?", a: "Streamlined shape", options: ["Rough surface", "Streamlined shape", "Bigger size", "More weight"] }
    ]
  },
  8: {
    module: 2,
    title: "Pressure and Streamlines",
    concept: "Visualize how air flows around rocket shapes",
    questions: [
      { q: "What is a streamline?", a: "Path of airflow", options: ["Rocket part", "Path of airflow", "Type of fuel", "Engine nozzle"] },
      { q: "Where is pressure higher — front or sides?", a: "Front", options: ["Sides", "Front", "Back", "Top"] },
      { q: "What happens when streamlines separate from the rocket body?", a: "Turbulence and drag", options: ["Nothing", "Turbulence and drag", "Goes faster", "Less drag"] },
      { q: "Does smooth airflow create more or less drag?", a: "Less drag", options: ["More drag", "Less drag", "Same drag", "No drag"] },
      { q: "Why do rockets have pointed noses?", a: "Reduce pressure buildup", options: ["Look cool", "Reduce pressure buildup", "Carry payload", "Save weight"] },
      { q: "What part of the rocket mostly controls drag?", a: "Nose cone shape", options: ["Fins", "Nose cone shape", "Engine", "Paint"] }
    ]
  },
  9: {
    module: 2,
    title: "Lift & Angle of Attack",
    concept: "Some rockets experience lift — small but important",
    questions: [
      { q: "What is angle of attack?", a: "Angle between rocket and airflow", options: ["Launch angle", "Angle between rocket and airflow", "Fin angle", "Nose angle"] },
      { q: "What happens when the nose tilts into the wind?", a: "Creates lift force", options: ["Nothing", "Creates lift force", "Reduces thrust", "Increases drag only"] },
      { q: "Does lift always help rockets?", a: "No, can cause instability", options: ["Yes, always", "No, can cause instability", "Only in space", "Only at launch"] },
      { q: "Why do rockets usually fly straight up at first?", a: "Minimize drag and lift", options: ["Look impressive", "Minimize drag and lift", "Save fuel", "Avoid clouds"] },
      { q: "What happens if the angle of attack is too high?", a: "Risk of tumbling", options: ["Goes faster", "Risk of tumbling", "More efficient", "Nothing"] },
      { q: "What flight surface helps adjust direction?", a: "Fins and control surfaces", options: ["Paint", "Fins and control surfaces", "Windows", "Fuel tanks"] }
    ]
  },
  10: {
    module: 2,
    title: "Mach Speed & Shock Waves",
    concept: "Subsonic, supersonic, and transonic flight basics",
    questions: [
      { q: "What does 'Mach 1' mean?", a: "Speed of sound", options: ["100 mph", "Speed of sound", "Orbital velocity", "Escape velocity"] },
      { q: "What happens to airflow near Mach 1?", a: "Becomes chaotic", options: ["Stays smooth", "Becomes chaotic", "Stops moving", "Reverses"] },
      { q: "What is a shock wave?", a: "Sudden pressure change", options: ["Sound wave", "Sudden pressure change", "Light wave", "Radio wave"] },
      { q: "Why does drag spike around Mach 1?", a: "Shock wave formation", options: ["More air", "Shock wave formation", "Engine power", "Gravity"] },
      { q: "What shape helps reduce shock drag?", a: "Sharp, pointed nose", options: ["Flat nose", "Sharp, pointed nose", "Round nose", "Square nose"] },
      { q: "What happens to sound at supersonic speeds?", a: "Rocket outruns sound", options: ["Gets louder", "Rocket outruns sound", "Disappears", "Echoes"] }
    ]
  },
  11: {
    module: 2,
    title: "Heating During Ascent",
    concept: "Air friction and shock heating at high speed",
    questions: [
      { q: "What causes the rocket to heat up?", a: "Air friction and compression", options: ["Engine heat", "Air friction and compression", "Sun", "Fuel burning"] },
      { q: "What layer protects rockets from heat?", a: "Heat shield or coating", options: ["Paint", "Heat shield or coating", "Metal skin", "Insulation"] },
      { q: "Why is heat worse at low altitude?", a: "Denser air", options: ["More gravity", "Denser air", "Less speed", "More clouds"] },
      { q: "How can engineers reduce heat damage?", a: "Ablative materials", options: ["Go slower", "Ablative materials", "More fuel", "Bigger engines"] },
      { q: "What's a heat shield made of?", a: "Ceramic or ablative material", options: ["Steel", "Ceramic or ablative material", "Plastic", "Wood"] },
      { q: "What happens if cooling fails?", a: "Structural damage", options: ["Nothing", "Structural damage", "Goes faster", "Saves fuel"] }
    ]
  },
  12: {
    module: 2,
    title: "Streamlining Design",
    concept: "Combine drag, shape, and heating knowledge",
    questions: [
      { q: "What shape gives lowest drag?", a: "Streamlined teardrop", options: ["Cube", "Streamlined teardrop", "Sphere", "Flat plate"] },
      { q: "What's the best nose shape for high speed?", a: "Sharp cone", options: ["Flat", "Sharp cone", "Round", "Square"] },
      { q: "How does smoothness affect drag?", a: "Smoother = less drag", options: ["No effect", "Smoother = less drag", "Rougher is better", "Same drag"] },
      { q: "Why do fins need thin edges?", a: "Reduce drag", options: ["Look cool", "Reduce drag", "More strength", "Easier to build"] },
      { q: "What happens if fins are too large?", a: "Excessive drag", options: ["Better control", "Excessive drag", "More lift", "Faster flight"] },
      { q: "What happens if rocket is rough or dented?", a: "Increased drag", options: ["No change", "Increased drag", "Less drag", "More speed"] }
    ]
  },

  // MODULE 3: Stability & Control
  13: {
    module: 3,
    title: "Center of Mass",
    concept: "Weight distribution affects stability",
    questions: [
      { q: "What is the center of mass?", a: "Balance point of weight", options: ["Top of rocket", "Balance point of weight", "Engine location", "Nose tip"] },
      { q: "Where should CoM be for stability?", a: "Forward of CoP", options: ["At the back", "Forward of CoP", "At the top", "Doesn't matter"] },
      { q: "What happens if CoM is too far back?", a: "Unstable flight", options: ["Perfect flight", "Unstable flight", "Goes faster", "Saves fuel"] },
      { q: "What makes a rocket tumble?", a: "CoM behind CoP", options: ["Too much thrust", "CoM behind CoP", "Too much fuel", "Wind"] },
      { q: "How can moving fuel affect CoM?", a: "Shifts balance point", options: ["No effect", "Shifts balance point", "Increases speed", "Reduces drag"] },
      { q: "Why test balance before launch?", a: "Ensure stability", options: ["Check weight", "Ensure stability", "Measure fuel", "Test paint"] }
    ]
  },
  14: {
    module: 3,
    title: "Center of Pressure",
    concept: "Aerodynamic balance point — where air pushes",
    questions: [
      { q: "What is center of pressure (CoP)?", a: "Where aerodynamic forces act", options: ["Engine thrust point", "Where aerodynamic forces act", "Fuel tank center", "Nose tip"] },
      { q: "Should CoP be in front or behind CoM?", a: "Behind CoM", options: ["In front of CoM", "Behind CoM", "Same location", "Doesn't matter"] },
      { q: "What happens if CoP moves ahead of CoM?", a: "Rocket becomes unstable", options: ["Better stability", "Rocket becomes unstable", "Goes faster", "Saves fuel"] },
      { q: "How do fins affect CoP?", a: "Move it backward", options: ["Move it forward", "Move it backward", "No effect", "Remove it"] },
      { q: "How to move CoM forward?", a: "Add weight to nose", options: ["Add fins", "Add weight to nose", "Remove fuel", "Paint it"] },
      { q: "How do model rocket builders test stability?", a: "Swing test or calculation", options: ["Guess", "Swing test or calculation", "Paint test", "Weight test"] }
    ]
  },
  15: {
    module: 3,
    title: "Fins & Control Surfaces",
    concept: "Fins stabilize rockets like feathers stabilize arrows",
    questions: [
      { q: "What do fins do?", a: "Stabilize and steer", options: ["Look cool", "Stabilize and steer", "Hold fuel", "Generate thrust"] },
      { q: "Where are fins placed on rockets?", a: "Near the bottom", options: ["At the top", "Near the bottom", "In the middle", "Anywhere"] },
      { q: "What happens if you remove the fins?", a: "Unstable flight", options: ["Flies better", "Unstable flight", "Goes faster", "Saves weight"] },
      { q: "How do fins steer airflow?", a: "Create pressure differences", options: ["Block air", "Create pressure differences", "Heat air", "Cool air"] },
      { q: "Do larger fins always mean better control?", a: "No, more drag too", options: ["Yes, always", "No, more drag too", "Only in space", "Only at launch"] },
      { q: "What's a problem with very large fins?", a: "Excessive drag and weight", options: ["Too stable", "Excessive drag and weight", "Too expensive", "Too colorful"] }
    ]
  },
  16: {
    module: 3,
    title: "Thrust Vectoring",
    concept: "Engines can swivel to steer the rocket",
    questions: [
      { q: "What is thrust vectoring?", a: "Tilting engine nozzle", options: ["Adding more engines", "Tilting engine nozzle", "Changing fuel", "Spinning rocket"] },
      { q: "How does changing thrust direction control flight?", a: "Creates turning moment", options: ["Changes speed", "Creates turning moment", "Reduces drag", "Adds lift"] },
      { q: "What moves the nozzle to steer?", a: "Gimbal mechanism", options: ["Pilot", "Gimbal mechanism", "Fins", "Wind"] },
      { q: "Why do modern rockets use gimbals?", a: "Precise control", options: ["Cheaper", "Precise control", "Lighter", "Faster"] },
      { q: "What happens if thrust points off center?", a: "Rocket rotates", options: ["Nothing", "Rocket rotates", "Goes faster", "Stops"] },
      { q: "Is thrust vectoring used during landing?", a: "Yes, for precision", options: ["No, never", "Yes, for precision", "Only in space", "Only at launch"] }
    ]
  },
  17: {
    module: 3,
    title: "Gyros & Sensors",
    concept: "Rockets use sensors to stay stable automatically",
    questions: [
      { q: "What does a gyroscope measure?", a: "Rotation rate", options: ["Speed", "Rotation rate", "Temperature", "Pressure"] },
      { q: "What does an accelerometer measure?", a: "Acceleration", options: ["Speed", "Acceleration", "Distance", "Time"] },
      { q: "How do sensors help autopilot?", a: "Detect and correct errors", options: ["Save fuel", "Detect and correct errors", "Increase speed", "Reduce weight"] },
      { q: "What happens if sensors fail?", a: "Loss of control", options: ["Nothing", "Loss of control", "Goes faster", "Lands safely"] },
      { q: "Why do rockets spin slightly?", a: "Stabilization technique", options: ["Fun", "Stabilization technique", "Save fuel", "Look cool"] },
      { q: "What's the benefit of onboard computers?", a: "Fast, precise control", options: ["Cheaper", "Fast, precise control", "Lighter", "Simpler"] }
    ]
  },
  18: {
    module: 3,
    title: "Autopilot & Stability",
    concept: "Combine fins, sensors, and thrust control",
    questions: [
      { q: "What keeps a rocket pointed upright?", a: "Autopilot feedback system", options: ["Gravity", "Autopilot feedback system", "Wind", "Luck"] },
      { q: "What's a feedback system?", a: "Measure, compare, correct", options: ["Random control", "Measure, compare, correct", "Ignore errors", "Manual only"] },
      { q: "What does PID control do?", a: "Smooth, stable corrections", options: ["Nothing", "Smooth, stable corrections", "Random changes", "Maximum power"] },
      { q: "How can fins and thrust work together?", a: "Complementary control", options: ["They can't", "Complementary control", "Fight each other", "Cancel out"] },
      { q: "What happens if control reacts too slowly?", a: "Errors grow", options: ["Perfect flight", "Errors grow", "Saves fuel", "Goes faster"] },
      { q: "How can over-correction make a rocket unstable?", a: "Oscillations increase", options: ["It can't", "Oscillations increase", "Improves stability", "Saves fuel"] }
    ]
  },

  // MODULE 4: Orbital Mechanics
  19: {
    module: 4,
    title: "Suborbital vs Orbital",
    concept: "Why most rockets fall back while satellites stay up",
    questions: [
      { q: "What is a suborbital flight?", a: "Goes up but falls back", options: ["Stays in orbit", "Goes up but falls back", "Escapes Earth", "Lands on Moon"] },
      { q: "What is required to stay in orbit?", a: "Sufficient horizontal velocity", options: ["Just altitude", "Sufficient horizontal velocity", "More fuel", "Bigger engines"] },
      { q: "What does 'orbital velocity' mean?", a: "Speed to stay in orbit", options: ["Launch speed", "Speed to stay in orbit", "Escape velocity", "Sound speed"] },
      { q: "What happens if you go slower than orbital speed?", a: "Fall back to Earth", options: ["Stay in orbit", "Fall back to Earth", "Go to Moon", "Escape Earth"] },
      { q: "Why do rockets tilt sideways after launch?", a: "Gain horizontal velocity", options: ["Avoid clouds", "Gain horizontal velocity", "Save fuel", "Look cool"] },
      { q: "Is space the same as orbit?", a: "No, orbit needs speed", options: ["Yes, same thing", "No, orbit needs speed", "Space is higher", "Orbit is lower"] }
    ]
  },
  20: {
    module: 4,
    title: "Gravity and Orbits",
    concept: "Orbits are falling paths that never hit the ground",
    questions: [
      { q: "Why doesn't a satellite fall back to Earth?", a: "Falls but misses Earth", options: ["No gravity", "Falls but misses Earth", "Thrust keeps it up", "Magic"] },
      { q: "What two forces balance in orbit?", a: "Gravity and centrifugal", options: ["Thrust and drag", "Gravity and centrifugal", "Lift and weight", "Push and pull"] },
      { q: "What happens if you go faster in orbit?", a: "Orbit gets higher", options: ["Fall down", "Orbit gets higher", "Slow down", "Nothing"] },
      { q: "What shape is most stable: circle or ellipse?", a: "Both are stable", options: ["Circle only", "Both are stable", "Ellipse only", "Neither"] },
      { q: "What keeps the Moon in orbit?", a: "Earth's gravity", options: ["Thrust", "Earth's gravity", "Sun's gravity", "Magnetism"] },
      { q: "What would happen if Earth's gravity disappeared?", a: "Fly off in straight line", options: ["Stay in orbit", "Fly off in straight line", "Fall to Sun", "Stop moving"] }
    ]
  },
  21: {
    module: 4,
    title: "Types of Orbits",
    concept: "LEO, MEO, GEO, polar — different purposes",
    questions: [
      { q: "What does LEO stand for?", a: "Low Earth Orbit", options: ["Low Earth Orbit", "Large Earth Orbit", "Long Earth Orbit", "Light Earth Orbit"] },
      { q: "What's GEO used for?", a: "Communication satellites", options: ["Weather", "Communication satellites", "Spy satellites", "Space stations"] },
      { q: "Which orbit is best for weather satellites?", a: "Polar orbit", options: ["LEO", "Polar orbit", "GEO", "MEO"] },
      { q: "Which orbit stays above one place on Earth?", a: "Geostationary (GEO)", options: ["LEO", "Geostationary (GEO)", "Polar", "MEO"] },
      { q: "Which orbit crosses poles?", a: "Polar orbit", options: ["Equatorial", "Polar orbit", "GEO", "Random"] },
      { q: "Why do we need different orbits?", a: "Different mission needs", options: ["Fun", "Different mission needs", "Cheaper", "Faster"] }
    ]
  },
  22: {
    module: 4,
    title: "Transfers & Delta-v",
    concept: "Changing orbits costs fuel (delta-v)",
    questions: [
      { q: "What does delta-v mean?", a: "Change in velocity", options: ["Distance", "Change in velocity", "Time", "Weight"] },
      { q: "What maneuvers change orbit altitude?", a: "Prograde and retrograde burns", options: ["Spinning", "Prograde and retrograde burns", "Waiting", "Turning"] },
      { q: "Which transfer is most fuel efficient?", a: "Hohmann transfer", options: ["Direct", "Hohmann transfer", "Spiral", "Random"] },
      { q: "What happens if you burn opposite your motion?", a: "Orbit gets lower", options: ["Go faster", "Orbit gets lower", "Escape", "Nothing"] },
      { q: "What increases delta-v requirement?", a: "Larger orbit changes", options: ["Smaller changes", "Larger orbit changes", "Waiting", "Spinning"] },
      { q: "What's a gravity assist?", a: "Use planet's gravity to gain speed", options: ["Extra engines", "Use planet's gravity to gain speed", "More fuel", "Solar power"] }
    ]
  },
  23: {
    module: 4,
    title: "Space Mission Planning",
    concept: "How engineers plan launch windows and payload",
    questions: [
      { q: "What's a launch window?", a: "Time period for optimal launch", options: ["Window on rocket", "Time period for optimal launch", "Launch pad", "Mission duration"] },
      { q: "What limits rocket payload size?", a: "Rocket capacity and orbit", options: ["Nothing", "Rocket capacity and orbit", "Time", "Weather"] },
      { q: "What does mission profile mean?", a: "Flight plan and objectives", options: ["Rocket shape", "Flight plan and objectives", "Crew size", "Cost"] },
      { q: "Why is launch angle important?", a: "Affects orbit inclination", options: ["Looks cool", "Affects orbit inclination", "Saves time", "Reduces cost"] },
      { q: "Why do we launch eastward often?", a: "Earth's rotation helps", options: ["Tradition", "Earth's rotation helps", "Cheaper", "Safer"] },
      { q: "What makes interplanetary missions hard?", a: "Huge delta-v needed", options: ["Too easy", "Huge delta-v needed", "Too fast", "Too cheap"] }
    ]
  },
  24: {
    module: 4,
    title: "Design Your Mission",
    concept: "Integrate all knowledge — design an orbital mission",
    questions: [
      { q: "What's your target orbit altitude for LEO?", a: "200-2000 km", options: ["10 km", "200-2000 km", "50,000 km", "1 million km"] },
      { q: "What total delta-v do you need for LEO?", a: "~9-10 km/s", options: ["1 km/s", "~9-10 km/s", "100 km/s", "1000 km/s"] },
      { q: "What launch site would you choose?", a: "Near equator for efficiency", options: ["North Pole", "Near equator for efficiency", "Random location", "Mountain top"] },
      { q: "How many stages for small satellite?", a: "2-3 stages", options: ["1 stage", "2-3 stages", "10 stages", "No stages"] },
      { q: "How will you control the rocket?", a: "Autopilot with sensors", options: ["Manual only", "Autopilot with sensors", "No control", "Remote control"] },
      { q: "What's one risk and mitigation?", a: "Engine failure - redundancy", options: ["No risks", "Engine failure - redundancy", "Too easy", "Perfect flight"] }
    ]
  }
};
