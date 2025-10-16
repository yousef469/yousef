export const planeModels = [
  {
    id: 'f22-raptor',
    name: 'F-22 Raptor',
    description: 'Lockheed Martin F-22 Raptor - 5th generation stealth fighter',
    type: 'glb',
    path: '/f22-raptor.glb',
    scale: 2.0,
    position: [0, 0, 0],
    specs: [
      { label: 'Top Speed', value: 'Mach 2.25' },
      { label: 'Range', value: '2,960 km' },
      { label: 'Service Ceiling', value: '65,000 ft' },
      { label: 'Engines', value: '2x F119-PW-100' }
    ],
    components: [
      { name: 'Stealth Design', description: 'Radar-absorbent materials and angular surfaces' },
      { name: 'Thrust Vectoring', description: '2D thrust vectoring for extreme maneuverability' },
      { name: 'Advanced Avionics', description: 'AN/APG-77 AESA radar system' },
      { name: 'Internal Weapons Bay', description: 'Maintains stealth profile' }
    ]
  },
  {
    id: 'f16-falcon',
    name: 'F-16 Fighting Falcon',
    description: 'Legendary multi-role fighter with exceptional maneuverability',
    type: 'glb',
    path: '/f16.glb',
    scale: 0.15,
    position: [0, 0, 0],
    specs: [
      { label: 'Top Speed', value: 'Mach 2.0' },
      { label: 'Range', value: '4,220 km' },
      { label: 'Service Ceiling', value: '50,000 ft' },
      { label: 'Engine', value: 'F110-GE-129' }
    ],
    components: [
      { name: 'Fly-by-Wire', description: 'Electronic flight control system' },
      { name: 'Bubble Canopy', description: '360-degree visibility' },
      { name: 'Multi-role Capability', description: 'Air-to-air and air-to-ground missions' },
      { name: 'Hardpoints', description: '11 weapon stations' }
    ]
  },
  {
    id: 'mig29-fulcrum',
    name: 'MiG-29 Fulcrum',
    description: 'Russian twin-engine air superiority fighter',
    type: 'glb',
    path: '/mig29.glb',
    scale: 0.12,
    position: [0, 0, 0],
    specs: [
      { label: 'Top Speed', value: 'Mach 2.25' },
      { label: 'Range', value: '1,430 km' },
      { label: 'Service Ceiling', value: '59,000 ft' },
      { label: 'Engines', value: '2x RD-33' }
    ],
    components: [
      { name: 'Twin Engines', description: 'Two Klimov RD-33 turbofans' },
      { name: 'Helmet-Mounted Sight', description: 'Advanced targeting system' },
      { name: 'High Maneuverability', description: 'Excellent dogfighting capability' },
      { name: 'Infrared Search', description: 'IRST tracking system' }
    ]
  }
];
