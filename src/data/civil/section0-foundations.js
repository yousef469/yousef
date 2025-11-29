// Section 0: Foundations - Statics & Materials (3 Lessons)

export const section0Foundations = {
  id: 'foundations',
  title: 'Unit 0: Foundations',
  description: 'Essential physics for civil engineering',
  icon: '📐',
  color: 'from-gray-500 to-slate-600',
  units: [
    {
      id: 'statics-basics',
      title: 'Statics & Materials Fundamentals',
      description: 'Core concepts for structural analysis',
      lessons: [
        {
          id: 'statics-forces',
          title: 'Statics & Forces',
          duration: '30 min', xp: 175,
          description: 'Equilibrium and force analysis',
          introduction: 'Statics is the foundation of structural engineering. Understanding how forces balance is essential for designing safe structures.',
          sections: [
            { title: 'Force Fundamentals', content: "**Force:**\nPush or pull with magnitude and direction\nUnits: Newtons (N) or pounds (lb)\n\n**Vector Representation:**\n- Magnitude (size)\n- Direction (angle)\n- Point of application\n\n**Force Components:**\nFx = F × cos(θ)\nFy = F × sin(θ)\n\n**Resultant Force:**\nR = √(ΣFx² + ΣFy²)\nθ = tan⁻¹(ΣFy/ΣFx)" },
            { title: 'Equilibrium', content: "**Static Equilibrium:**\nObject at rest, no acceleration\n\n**Conditions:**\n**ΣFx = 0** (horizontal forces balance)\n**ΣFy = 0** (vertical forces balance)\n**ΣM = 0** (moments balance)\n\n**Free Body Diagram (FBD):**\n1. Isolate the body\n2. Show all external forces\n3. Include reactions at supports\n4. Apply equilibrium equations" },
            { title: 'Moments & Couples', content: "**Moment (Torque):**\n**M = F × d**\n- F = force\n- d = perpendicular distance to pivot\n\n**Sign Convention:**\n- Counterclockwise: Positive (+)\n- Clockwise: Negative (-)\n\n**Couple:**\nTwo equal, opposite, parallel forces\nPure rotation, no translation\nM = F × distance between forces\n\n**Moment Arm:**\nPerpendicular distance from force line to pivot" }
          ],
          keyTakeaways: ['Equilibrium requires ΣF=0 and ΣM=0', 'Free body diagrams isolate forces', 'Moment = Force × perpendicular distance', 'Vector components simplify analysis'],
          quiz: { questions: [
            { id: 'q1', question: 'For equilibrium, sum of forces equals:', options: ['Maximum', 'Minimum', 'Zero', 'One'], correctAnswer: 2, explanation: 'Static equilibrium requires ΣF = 0 in all directions.' },
            { id: 'q2', question: 'Moment is calculated as:', options: ['F + d', 'F × d', 'F / d', 'F - d'], correctAnswer: 1, explanation: 'Moment M = Force × perpendicular distance.' },
            { id: 'q3', question: 'A couple produces:', options: ['Translation only', 'Rotation only', 'Both', 'Neither'], correctAnswer: 1, explanation: 'A couple (two equal opposite forces) produces pure rotation.' }
          ]}
        },
        {
          id: 'materials-physics',
          title: 'Materials Physics',
          duration: '30 min', xp: 175,
          description: 'Stress, strain, and material properties',
          introduction: 'Understanding how materials respond to forces is crucial for selecting appropriate materials and designing safe structures.',
          sections: [
            { title: 'Stress & Strain', content: "**Stress (σ):**\nForce per unit area\n**σ = F/A**\nUnits: Pa (N/m²) or psi\n\n**Types:**\n- Tensile: Pulling apart\n- Compressive: Pushing together\n- Shear: Sliding parallel\n\n**Strain (ε):**\nDeformation per unit length\n**ε = ΔL/L**\nDimensionless (or %)\n\n**Shear Strain:**\nγ = tan(θ) ≈ θ for small angles" },
            { title: "Young's Modulus", content: "**Elastic Modulus (E):**\nStiffness of material\n**E = σ/ε** (stress/strain)\n\n**Typical Values:**\n- Steel: 200 GPa\n- Aluminum: 70 GPa\n- Concrete: 30 GPa\n- Wood: 10-15 GPa\n\n**Hooke's Law:**\nσ = E × ε (linear elastic region)\n\n**Deformation:**\n**δ = FL/(AE)**\n- F = force\n- L = length\n- A = area\n- E = modulus" },
            { title: 'Material Behavior', content: "**Stress-Strain Curve:**\n1. Elastic region (returns to original)\n2. Yield point (permanent deformation starts)\n3. Plastic region (permanent deformation)\n4. Ultimate strength (maximum stress)\n5. Fracture (failure)\n\n**Yield Strength:**\nStress at which plastic deformation begins\n\n**Factor of Safety:**\n**FoS = Allowable Stress / Working Stress**\nTypical: 1.5 - 3.0 for structures" }
          ],
          keyTakeaways: ['Stress = Force/Area', 'Strain = Change in length/Original length', "Young's modulus measures stiffness", 'Factor of safety prevents failure'],
          quiz: { questions: [
            { id: 'q1', question: 'Stress is measured in:', options: ['Meters', 'Newtons', 'Pascals', 'Joules'], correctAnswer: 2, explanation: 'Stress (force/area) is measured in Pascals (N/m²) or psi.' },
            { id: 'q2', question: "Steel's Young's modulus is approximately:", options: ['30 GPa', '70 GPa', '200 GPa', '500 GPa'], correctAnswer: 2, explanation: "Steel has a Young's modulus of about 200 GPa." },
            { id: 'q3', question: 'Yield strength is when:', options: ['Material breaks', 'Elastic limit reached', 'Maximum stress', 'Zero strain'], correctAnswer: 1, explanation: 'Yield strength is where permanent (plastic) deformation begins.' }
          ]}
        },
        {
          id: 'construction-calculations',
          title: 'Basic Construction Calculations',
          duration: '25 min', xp: 150,
          description: 'Area, volume, and load calculations',
          introduction: 'Civil engineers constantly calculate areas, volumes, and loads. These fundamental skills are used daily in construction.',
          sections: [
            { title: 'Area Calculations', content: "**Basic Shapes:**\n- Rectangle: A = L × W\n- Triangle: A = ½ × b × h\n- Circle: A = π × r²\n- Trapezoid: A = ½(a + b) × h\n\n**Composite Areas:**\nBreak into simple shapes\nAdd or subtract as needed\n\n**Cross-Sectional Area:**\nImportant for:\n- Beam strength\n- Column capacity\n- Pipe flow" },
            { title: 'Volume Calculations', content: "**Basic Volumes:**\n- Rectangular: V = L × W × H\n- Cylinder: V = π × r² × h\n- Cone: V = ⅓ × π × r² × h\n- Sphere: V = ⁴⁄₃ × π × r³\n\n**Concrete Volume:**\nSlabs: Length × Width × Thickness\nFootings: Base area × Depth\nColumns: Cross-section × Height\n\n**Earthwork:**\nCut and fill calculations\nAverage end area method" },
            { title: 'Load Calculations', content: "**Dead Load:**\nPermanent, stationary loads\n- Structure self-weight\n- Fixed equipment\n- Finishes\n\n**Live Load:**\nVariable, movable loads\n- People, furniture\n- Vehicles\n- Snow, rain\n\n**Load per Area:**\n- Residential: 40 psf (2 kPa)\n- Office: 50 psf (2.4 kPa)\n- Storage: 125+ psf (6+ kPa)\n\n**Total Load:**\nDead + Live + Environmental" }
          ],
          keyTakeaways: ['Break complex shapes into simple ones', 'Volume calculations essential for materials', 'Dead loads are permanent, live loads vary', 'Always include safety factors'],
          quiz: { questions: [
            { id: 'q1', question: 'Circle area formula:', options: ['πr', '2πr', 'πr²', 'πd'], correctAnswer: 2, explanation: 'Circle area A = πr².' },
            { id: 'q2', question: 'Dead load includes:', options: ['People', 'Furniture', 'Structure weight', 'Vehicles'], correctAnswer: 2, explanation: 'Dead load is permanent weight like the structure itself.' },
            { id: 'q3', question: 'Typical office live load:', options: ['20 psf', '50 psf', '100 psf', '200 psf'], correctAnswer: 1, explanation: 'Office buildings typically use 50 psf (2.4 kPa) live load.' }
          ]}
        }
      ]
    }
  ]
};

export default section0Foundations;
