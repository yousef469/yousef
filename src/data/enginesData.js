export const engineModels = [
  {
    id: 'falcon9-engine',
    name: 'Falcon 9 Merlin Engine',
    description: 'Detailed view of SpaceX Merlin 1D rocket engine - the powerhouse behind Falcon 9',
    type: 'glb',
    path: '/falcon9-engine.glb',
    scale: 0.3,
    position: [0, 0, 0],
    specs: [
      { label: 'Thrust', value: '845 kN' },
      { label: 'Type', value: 'LOX/RP-1' },
      { label: 'Cycle', value: 'Gas Generator' },
      { label: 'Reusable', value: 'Yes' }
    ],
    components: [
      { name: 'Combustion Chamber', description: 'Where fuel and oxidizer burn at extreme temperatures' },
      { name: 'Turbopump', description: 'Pumps propellant at high pressure into the chamber' },
      { name: 'Nozzle', description: 'Expands exhaust gases for maximum thrust' },
      { name: 'Gimbal', description: 'Allows thrust vectoring for steering' },
      { name: 'Igniter', description: 'TEA-TEB pyrophoric ignition system' }
    ]
  }
];
