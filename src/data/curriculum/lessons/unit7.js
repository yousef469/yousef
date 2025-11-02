// UNIT 7: Statics (Intermediate Level) - 7 Lessons

export const unit7Lessons = [
  {
    id: 36,
    title: "Introduction to Statics",
    unitNumber: 7,
    lessonNumber: 1,
    duration: "20 min",
    emoji: "⚖️",
    introduction: "Statics is the study of forces in equilibrium. Understanding statics is essential for analyzing structures and mechanical systems that don't move.",
    sections: [
      {
        title: "What is Statics?",
        content: "Statics deals with bodies at rest or moving at constant velocity. Key principles:\n\n• Sum of forces = 0\n• Sum of moments = 0\n• Free body diagrams\n• Force vectors and components"
      },
      {
        title: "Forces and Equilibrium",
        content: "For a body to be in equilibrium:\n\nΣF = 0 (sum of all forces equals zero)\nΣM = 0 (sum of all moments equals zero)\n\nThis means the body is either at rest or moving with constant velocity."
      },
      {
        title: "Free Body Diagrams",
        content: "A free body diagram (FBD) shows:\n• All external forces\n• Reaction forces\n• Weight/gravity\n• Applied loads\n\nFBDs are essential for solving statics problems."
      }
    ],
    keyTakeaways: [
      "Statics studies forces in equilibrium",
      "Sum of forces and moments must equal zero",
      "Free body diagrams are essential tools",
      "Used to analyze structures and machines"
    ],
    vocabulary: [
      { term: "Equilibrium", definition: "State where sum of forces and moments equals zero" },
      { term: "Free Body Diagram", definition: "Diagram showing all forces acting on a body" },
      { term: "Moment", definition: "Rotational effect of a force about a point" }
    ]
  },
  {
    id: 37,
    title: "Force Vectors",
    unitNumber: 7,
    lessonNumber: 2,
    duration: "20 min",
    emoji: "⚖️",
    introduction: "Forces are vector quantities with magnitude and direction. Learn to work with force vectors in 2D and 3D.",
    sections: [
      {
        title: "Vector Basics",
        content: "Vectors have:\n• Magnitude (size)\n• Direction (angle)\n• Components (x, y, z)\n\nForce vectors can be added, subtracted, and resolved into components."
      },
      {
        title: "Vector Components",
        content: "Breaking a force into components:\n\nFx = F × cos(θ)\nFy = F × sin(θ)\n\nWhere F is magnitude and θ is angle from x-axis."
      },
      {
        title: "Resultant Forces",
        content: "To find the resultant of multiple forces:\n\n1. Resolve each force into components\n2. Sum all x-components\n3. Sum all y-components\n4. Calculate magnitude: R = √(Rx² + Ry²)\n5. Calculate angle: θ = tan⁻¹(Ry/Rx)"
      }
    ],
    keyTakeaways: [
      "Forces are vectors with magnitude and direction",
      "Vectors can be resolved into components",
      "Resultant force is the sum of all forces",
      "Use trigonometry to work with force vectors"
    ],
    vocabulary: [
      { term: "Vector", definition: "Quantity with both magnitude and direction" },
      { term: "Component", definition: "Part of a vector along a coordinate axis" },
      { term: "Resultant", definition: "Single force equivalent to multiple forces" }
    ]
  },
  {
    id: 38,
    title: "Moments and Couples",
    unitNumber: 7,
    lessonNumber: 3,
    duration: "20 min",
    emoji: "⚖️",
    introduction: "Moments create rotation. Understanding moments is crucial for analyzing beams, levers, and rotating systems.",
    sections: [
      {
        title: "What is a Moment?",
        content: "A moment (or torque) is the rotational effect of a force:\n\nM = F × d\n\nWhere:\n• M = moment\n• F = force\n• d = perpendicular distance from pivot point"
      },
      {
        title: "Couples",
        content: "A couple is two equal and opposite forces separated by a distance:\n\n• Creates pure rotation\n• Moment = F × d\n• Independent of reference point\n\nExample: Turning a steering wheel"
      },
      {
        title: "Moment Equilibrium",
        content: "For rotational equilibrium:\n\nΣM = 0\n\nSum of clockwise moments = Sum of counterclockwise moments\n\nThis prevents rotation."
      }
    ],
    keyTakeaways: [
      "Moments create rotational effects",
      "Moment = Force × Distance",
      "Couples create pure rotation",
      "Sum of moments must equal zero for equilibrium"
    ],
    vocabulary: [
      { term: "Moment", definition: "Rotational effect of a force about a point" },
      { term: "Couple", definition: "Two equal opposite forces creating pure rotation" },
      { term: "Lever Arm", definition: "Perpendicular distance from force to pivot" }
    ]
  },
  {
    id: 39,
    title: "Trusses and Frames",
    unitNumber: 7,
    lessonNumber: 4,
    duration: "25 min",
    emoji: "⚖️",
    introduction: "Trusses are structural frameworks made of connected members. They're used in bridges, roofs, and aircraft structures.",
    sections: [
      {
        title: "What is a Truss?",
        content: "A truss is a structure made of:\n• Straight members\n• Connected at joints (pins)\n• Forms triangular patterns\n• Members carry only axial forces (tension or compression)"
      },
      {
        title: "Method of Joints",
        content: "Analyze trusses by examining each joint:\n\n1. Draw free body diagram of joint\n2. Apply equilibrium equations\n3. Solve for unknown forces\n4. Move to next joint\n\nΣFx = 0 and ΣFy = 0 at each joint"
      },
      {
        title: "Tension vs Compression",
        content: "Truss members are either:\n\n• Tension (T): Member is being pulled\n• Compression (C): Member is being pushed\n\nKnowing this helps design proper member sizes."
      }
    ],
    keyTakeaways: [
      "Trusses are frameworks of connected members",
      "Members carry only axial forces",
      "Method of joints analyzes each connection",
      "Members are in tension or compression"
    ],
    vocabulary: [
      { term: "Truss", definition: "Framework of members connected at joints" },
      { term: "Axial Force", definition: "Force along the length of a member" },
      { term: "Tension", definition: "Force pulling a member apart" },
      { term: "Compression", definition: "Force pushing a member together" }
    ]
  },
  {
    id: 40,
    title: "Friction",
    unitNumber: 7,
    lessonNumber: 5,
    duration: "20 min",
    emoji: "⚖️",
    introduction: "Friction opposes motion between surfaces. It's essential for brakes, tires, and many mechanical systems.",
    sections: [
      {
        title: "Types of Friction",
        content: "Two main types:\n\n• Static Friction: Prevents motion from starting\n• Kinetic Friction: Opposes motion in progress\n\nStatic friction is usually greater than kinetic friction."
      },
      {
        title: "Friction Force",
        content: "Friction force equation:\n\nF = μ × N\n\nWhere:\n• F = friction force\n• μ = coefficient of friction\n• N = normal force\n\nμs (static) > μk (kinetic)"
      },
      {
        title: "Applications",
        content: "Friction is important for:\n• Braking systems\n• Tire grip on roads\n• Belt drives\n• Fasteners (bolts, screws)\n\nSometimes we want friction, sometimes we want to minimize it."
      }
    ],
    keyTakeaways: [
      "Friction opposes motion between surfaces",
      "Static friction prevents motion from starting",
      "Kinetic friction opposes ongoing motion",
      "Friction force depends on normal force and coefficient"
    ],
    vocabulary: [
      { term: "Friction", definition: "Force opposing motion between surfaces" },
      { term: "Coefficient of Friction", definition: "Ratio of friction force to normal force" },
      { term: "Normal Force", definition: "Force perpendicular to contact surface" }
    ]
  },
  {
    id: 41,
    title: "Center of Gravity",
    unitNumber: 7,
    lessonNumber: 6,
    duration: "20 min",
    emoji: "⚖️",
    introduction: "The center of gravity is the point where an object's weight acts. It's crucial for stability and balance.",
    sections: [
      {
        title: "What is Center of Gravity?",
        content: "Center of Gravity (CG) is:\n• Point where weight acts\n• Balance point of an object\n• Same as center of mass for uniform gravity\n\nFor aircraft, CG location affects stability and control."
      },
      {
        title: "Finding CG",
        content: "For simple shapes:\n• Rectangle: geometric center\n• Triangle: 1/3 from base\n• Circle: center point\n\nFor complex shapes, use integration or experimental methods."
      },
      {
        title: "CG and Stability",
        content: "CG location affects:\n• Balance and stability\n• Tipping tendency\n• Control requirements\n\nLower CG = more stable\nHigher CG = less stable, easier to tip"
      }
    ],
    keyTakeaways: [
      "Center of gravity is where weight acts",
      "CG location affects stability",
      "Lower CG provides better stability",
      "Critical for aircraft design and loading"
    ],
    vocabulary: [
      { term: "Center of Gravity", definition: "Point where object's weight acts" },
      { term: "Center of Mass", definition: "Average position of mass in an object" },
      { term: "Stability", definition: "Tendency to return to equilibrium" }
    ]
  },
  {
    id: 42,
    title: "Statics Applications in Aircraft",
    unitNumber: 7,
    lessonNumber: 7,
    duration: "25 min",
    emoji: "⚖️",
    introduction: "Apply statics principles to aircraft structures, loading, and ground operations.",
    sections: [
      {
        title: "Aircraft on Ground",
        content: "When parked, aircraft must be in equilibrium:\n• Weight acts at CG\n• Reactions at landing gear\n• ΣF = 0 and ΣM = 0\n\nProper weight distribution prevents tipping."
      },
      {
        title: "Wing Loading",
        content: "Wings support the aircraft weight:\n• Lift distribution along span\n• Bending moments in wing structure\n• Shear forces at wing root\n\nWing structure designed using statics principles."
      },
      {
        title: "Cargo Loading",
        content: "Proper cargo loading ensures:\n• CG within limits\n• No overloading\n• Balanced distribution\n\nImproper loading affects flight characteristics and safety."
      }
    ],
    keyTakeaways: [
      "Statics applies to aircraft on ground and in flight",
      "CG location must be within limits",
      "Wing structure analyzed using statics",
      "Proper loading is critical for safety"
    ],
    vocabulary: [
      { term: "Landing Gear", definition: "Wheels and struts supporting aircraft on ground" },
      { term: "Wing Root", definition: "Where wing attaches to fuselage" },
      { term: "Load Distribution", definition: "How weight is spread across structure" }
    ]
  }
];

export default unit7Lessons;
