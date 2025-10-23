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
  }
};
