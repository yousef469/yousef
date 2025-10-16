export const rocketModels = [
  {
    id: 'falcon9-spacex',
    name: 'Falcon 9 - SpaceX',
    description: 'Official SpaceX Falcon 9 rocket with high-detail modeling',
    type: 'glb',
    path: '/falcon9-spacex.glb',
    scale: 0.003,
    position: [0, 0, 0],
    specs: [
      { label: 'Height', value: '70m' },
      { label: 'Diameter', value: '3.7m' },
      { label: 'Stages', value: '2' },
      { label: 'Engines', value: '9 Merlin 1D' }
    ],
    components: [
      { name: 'Payload Fairing', description: 'Composite fairing protects satellites' },
      { name: 'Second Stage', description: 'Single Merlin Vacuum engine' },
      { name: 'First Stage', description: 'Nine Merlin 1D engines' },
      { name: 'Landing Legs', description: 'Four carbon fiber/aluminum legs' },
      { name: 'Grid Fins', description: 'Titanium hypersonic grid fins' }
    ]
  },
  {
    id: 'falcon-heavy',
    name: 'Falcon Heavy - SpaceX',
    description: 'Most powerful operational rocket with three Falcon 9 cores',
    type: 'glb',
    path: '/falcon-heavy.glb',
    scale: 0.04,
    position: [0, 0, 0],
    specs: [
      { label: 'Height', value: '70m' },
      { label: 'Cores', value: '3 Boosters' },
      { label: 'Engines', value: '27 Merlin' },
      { label: 'Payload', value: '63.8 tons' }
    ],
    components: [
      { name: 'Payload Fairing', description: 'Large composite fairing' },
      { name: 'Center Core', description: 'Main booster with 9 engines' },
      { name: 'Side Boosters', description: 'Two reusable side cores' },
      { name: 'Landing Legs', description: 'All three cores can land' },
      { name: 'Grid Fins', description: 'Titanium fins on all cores' }
    ]
  },
  {
    id: 'saturn-v',
    name: 'Saturn V - NASA',
    description: 'Legendary Apollo program moon rocket',
    type: 'glb',
    path: '/saturn-v.glb',
    scale: 0.15,
    position: [0, 0, 0],
    specs: [
      { label: 'Height', value: '110.6m' },
      { label: 'Stages', value: '3' },
      { label: 'Engines', value: '5 F-1' },
      { label: 'Missions', value: 'Apollo 11-17' }
    ],
    components: [
      { name: 'Command Module', description: 'Crew capsule for three astronauts' },
      { name: 'Lunar Module', description: 'Moon landing spacecraft' },
      { name: 'Second Stage (S-II)', description: 'Five J-2 engines' },
      { name: 'First Stage (S-IC)', description: 'Five F-1 engines' }
    ]
  },
  {
    id: 'space-shuttle',
    name: 'Space Shuttle Discovery',
    description: 'NASA\'s reusable orbital spacecraft',
    type: 'glb',
    path: '/space-shuttle.glb',
    scale: 0.25,
    position: [0, 0, 0],
    specs: [
      { label: 'Length', value: '37.2m' },
      { label: 'Wingspan', value: '23.8m' },
      { label: 'Missions', value: '39 Flights' },
      { label: 'Crew', value: 'Up to 8' }
    ],
    components: [
      { name: 'Orbiter', description: 'Reusable spacecraft with crew cabin' },
      { name: 'Payload Bay', description: '18m cargo bay for satellites' },
      { name: 'Solid Boosters', description: 'Two reusable rocket boosters' },
      { name: 'Thermal Tiles', description: 'Heat shield for reentry' }
    ]
  }
];
