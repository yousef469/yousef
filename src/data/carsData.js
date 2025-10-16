export const carModels = [
  {
    id: 'porsche-911',
    name: 'Porsche 911 Carrera 4S',
    description: 'Iconic sports car with detailed exterior and interior',
    type: 'glb',
    path: '/porsche.glb',
    scale: 2.5,
    position: [0, 0, 0],
    specs: [
      { label: 'Engine', value: '3.0L Twin-Turbo' },
      { label: 'Power', value: '443 HP' },
      { label: '0-60 mph', value: '3.2 seconds' },
      { label: 'Top Speed', value: '191 mph' }
    ],
    components: [
      { name: 'Flat-Six Engine', description: 'Twin-turbocharged boxer engine' },
      { name: 'All-Wheel Drive', description: 'Advanced AWD system' },
      { name: 'Active Suspension', description: 'PASM adaptive dampers' },
      { name: 'Sport Chrono', description: 'Performance timing package' }
    ]
  },
  {
    id: 'bmw-m4',
    name: 'BMW M4 F82',
    description: 'High-performance sports coupe with aggressive styling',
    type: 'glb',
    path: '/bmw.glb',
    scale: 2.5,
    position: [0, 0, 0],
    specs: [
      { label: 'Engine', value: '3.0L Twin-Turbo I6' },
      { label: 'Power', value: '425 HP' },
      { label: '0-60 mph', value: '3.9 seconds' },
      { label: 'Top Speed', value: '155 mph' }
    ],
    components: [
      { name: 'S55 Engine', description: 'Twin-turbo inline-6 powerplant' },
      { name: 'M Differential', description: 'Active M rear differential' },
      { name: 'Carbon Fiber Roof', description: 'Lightweight construction' },
      { name: 'Adaptive M Suspension', description: 'Electronically controlled dampers' }
    ]
  },
  {
    id: 'ford-raptor',
    name: 'Ford F-150 Raptor',
    description: 'High-performance off-road pickup truck',
    type: 'glb',
    path: '/ford.glb',
    scale: 2.5,
    position: [0, 0, 0],
    specs: [
      { label: 'Engine', value: '3.5L EcoBoost V6' },
      { label: 'Power', value: '450 HP' },
      { label: 'Torque', value: '510 lb-ft' },
      { label: 'Suspension', value: 'FOX Racing Shocks' }
    ],
    components: [
      { name: 'Twin-Turbo V6', description: 'High-output EcoBoost engine' },
      { name: 'FOX Shocks', description: 'Live Valve suspension system' },
      { name: 'Terrain Modes', description: 'Multiple drive modes for off-road' },
      { name: 'Skid Plates', description: 'Heavy-duty underbody protection' }
    ]
  }
];
