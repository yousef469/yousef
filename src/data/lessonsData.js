export const LESSONS = [
  {
    id: 'propulsion-basics',
    title: 'Rocket Propulsion Fundamentals',
    teaser: 'Understand Newton\'s laws and basic rocket physics',
    bullets: [
      'Thrust is reaction — engine pushes mass backward to move forward (Newton\'s 3rd Law)',
      'F = ma links force, mass, and acceleration; mass drop changes acceleration during burn',
      'ISP is a measure of engine efficiency (higher is better for fuel usage)'
    ],
    exercise: 'Tune thrust and mass to reach a target velocity in a short-time challenge'
  },
  {
    id: 'engine-types',
    title: 'Engine Types',
    teaser: 'Compare solid, liquid, hybrid, and ion propulsion',
    bullets: [
      'Solid motors are simple and robust, once lit they cannot be throttled',
      'Liquid engines allow throttle, restart, and higher control but are complex',
      'Electric/ion engines have low thrust but very high ISP — good for long missions'
    ],
    exercise: 'Pick an engine for a 1000 kg probe to transfer to Mars—justify your choice'
  },
  {
    id: 'nozzles',
    title: 'Nozzle Design',
    teaser: 'Explore how nozzle geometry affects performance',
    bullets: [
      'Expansion ratio is exit area / throat area and affects exhaust velocity',
      'At sea level, too-high expansion causes flow separation and loss of thrust',
      'Optimal nozzle depends on ambient pressure (altitude) and mission profile'
    ],
    exercise: 'Design a nozzle for max sea-level thrust under area constraints'
  },
  {
    id: 'staging',
    title: 'Multi-Stage Rockets',
    teaser: 'Learn why rockets use stages and trajectory mechanics',
    bullets: [
      'Staging drops dead mass to increase final velocity (delta-v advantage)',
      'Trajectory pitch programs and gravity losses matter for orbital insertion',
      'Delta-v budget planning is the central part of mission design'
    ],
    exercise: 'Create a two-stage rocket that puts 200 kg into LEO'
  },
  {
    id: 'aerodynamics',
    title: 'Aerodynamics & Thermal Protection',
    teaser: 'Understand airflow and heat management',
    bullets: [
      'Drag increases with velocity squared; streamlining reduces drag coefficient',
      'Re-entry heating requires thermal protection systems (TPS)',
      'Angle of attack and control surfaces enable precise trajectory control'
    ],
    exercise: 'Optimize a heat shield design for Mars EDL mission'
  },
  {
    id: 'orbital-mechanics',
    title: 'Orbital Mechanics',
    teaser: 'Master the physics of orbits and transfers',
    bullets: [
      'Orbits are governed by gravity and initial velocity conditions',
      'Hohmann transfers are fuel-efficient paths between circular orbits',
      'Delta-v requirements determine mission feasibility and fuel needs'
    ],
    exercise: 'Calculate delta-v for Earth to Mars transfer orbit'
  }
];
