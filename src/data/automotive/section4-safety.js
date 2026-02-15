// Section 4: Safety & Maintenance - 6 Lessons (2 units × 3 lessons)

export const section4Safety = {
  id: 'safety',
  title: 'Section 4: Safety & Maintenance',
  description: 'Vehicle safety systems and maintenance',
  icon: '🛡️',
  color: 'from-green-500 to-emerald-500',
  units: [
    {
      id: 'passive-safety',
      title: 'Passive Safety Systems',
      description: 'Protecting occupants in crashes',
      lessons: [
        {
          id: 'crash-structures',
          title: 'Crash Structures & Materials',
          duration: '25 min', xp: 150,
          description: 'How vehicles absorb crash energy',
          introduction: 'Modern vehicles are designed to protect occupants by managing crash energy through carefully engineered structures.',
          sections: [
            { title: 'Crumple Zones', content: "**Purpose:**\nAbsorb crash energy through deformation\nIncrease stopping distance = lower forces\n\n**Front Structure:**\n- Bumper beam\n- Crash boxes (crush cans)\n- Front rails\n- Subframe\n\n**Rear Structure:**\n- Similar concept\n- Protects fuel tank\n- Rear rail deformation\n\n**Energy = Force × Distance**\nMore crush distance = lower peak force" },
            { title: 'Safety Cell', content: "**Passenger Compartment:**\nRigid cage that doesn't deform\n\n**Components:**\n- A, B, C pillars\n- Roof rails\n- Door beams\n- Floor pan reinforcement\n\n**Materials:**\n- High-strength steel (HSS)\n- Ultra-high-strength steel (UHSS)\n- Hot-stamped boron steel\n- Up to 1500 MPa tensile strength\n\n**Goal:**\nMaintain survival space" },
            { title: 'Material Selection', content: "**Steel Grades:**\n- Mild steel: 200 MPa (outer panels)\n- HSS: 300-600 MPa (structure)\n- UHSS: 600-1000 MPa (pillars)\n- PHS: 1000-1500 MPa (critical areas)\n\n**Aluminum:**\n- Lightweight (40% of steel)\n- Good energy absorption\n- Premium vehicles\n\n**Composites:**\n- Carbon fiber (supercars)\n- Excellent strength-to-weight\n- Expensive, complex repair" }
          ],
          keyTakeaways: ['Crumple zones absorb energy', 'Safety cell maintains survival space', 'Higher strength steel in critical areas', 'More crush distance = lower forces'],
          quiz: { questions: [
            { id: 'q1', question: 'Crumple zones work by:', options: ['Staying rigid', 'Deforming to absorb energy', 'Bouncing back', 'Breaking apart'], correctAnswer: 1, explanation: 'Crumple zones deform progressively to absorb crash energy.' },
            { id: 'q2', question: 'Hot-stamped boron steel strength:', options: ['200 MPa', '500 MPa', '1000-1500 MPa', '3000 MPa'], correctAnswer: 2, explanation: 'Press-hardened steel (PHS) reaches 1000-1500 MPa.' },
            { id: 'q3', question: 'Safety cell should:', options: ['Crumple completely', 'Stay rigid', 'Bounce back', 'Break away'], correctAnswer: 1, explanation: 'The safety cell must stay rigid to maintain survival space.' }
          ]}
        },
        {
          id: 'restraint-systems',
          title: 'Restraint Systems',
          duration: '30 min', xp: 175,
          description: 'Seatbelts and airbags',
          introduction: 'Restraint systems work together to protect occupants by controlling their motion during a crash.',
          sections: [
            { title: 'Seatbelts', content: "**Three-Point Belt:**\n- Lap and shoulder restraint\n- Invented by Volvo (1959)\n- Most important safety device\n\n**Components:**\n- Retractor (locks in crash)\n- Pretensioner (tightens belt)\n- Load limiter (prevents injury)\n- Buckle and tongue\n\n**Pretensioner:**\nPyrotechnic or electric\nRemoves slack in milliseconds\n\n**Load Limiter:**\nAllows controlled belt payout\nReduces chest injury" },
            { title: 'Airbag Systems', content: "**Frontal Airbags:**\n- Driver: In steering wheel\n- Passenger: In dashboard\n- Deploy in 20-30 ms\n\n**Side Airbags:**\n- Thorax: In seat or door\n- Curtain: Along roofline\n- Protect in side impacts\n\n**Other Airbags:**\n- Knee airbag\n- Center airbag\n- Rear seat airbags\n- Pedestrian airbag (hood)\n\n**Deployment:**\nAccelerometers detect crash\nECU decides deployment" },
            { title: 'Airbag Technology', content: "**Inflation:**\nSodium azide igniter\nGenerates nitrogen gas\nFills bag in ~30 ms\n\n**Venting:**\nControlled deflation\nAbsorbs occupant energy\n\n**Smart Airbags:**\n- Occupant detection\n- Weight sensors\n- Position sensors\n- Adjust deployment force\n\n**Dangers:**\n- Too close to airbag\n- Rear-facing child seats\n- Out-of-position occupants" }
          ],
          keyTakeaways: ['Seatbelts are most important safety device', 'Pretensioners remove belt slack', 'Airbags deploy in 20-30 ms', 'Smart airbags adjust to occupant'],
          quiz: { questions: [
            { id: 'q1', question: 'Airbag deployment time:', options: ['1-2 seconds', '100-200 ms', '20-30 ms', '1-2 ms'], correctAnswer: 2, explanation: 'Airbags fully deploy in about 20-30 milliseconds.' },
            { id: 'q2', question: 'Pretensioner function:', options: ['Loosens belt', 'Removes slack', 'Cuts belt', 'Heats belt'], correctAnswer: 1, explanation: 'Pretensioners tighten the belt to remove slack instantly.' },
            { id: 'q3', question: 'Load limiter purpose:', options: ['Increase force', 'Reduce chest injury', 'Lock belt', 'Release belt'], correctAnswer: 1, explanation: 'Load limiters allow controlled belt payout to reduce chest injury.' }
          ]}
        },
        {
          id: 'crash-testing',
          title: 'Crash Testing & Ratings',
          duration: '25 min', xp: 150,
          description: 'NCAP testing and safety ratings',
          introduction: 'Standardized crash tests evaluate vehicle safety, helping consumers make informed choices.',
          sections: [
            { title: 'Frontal Crash Tests', content: "**Full Frontal (NHTSA):**\n- 35 mph into rigid barrier\n- 100% overlap\n- Measures occupant forces\n\n**Offset Frontal (IIHS):**\n- 40 mph, 40% overlap\n- Deformable barrier\n- Tests structure asymmetrically\n\n**Small Overlap (IIHS):**\n- 40 mph, 25% overlap\n- Misses main structure\n- Very challenging test\n\n**Dummies:**\nHybrid III, THOR\nMeasure head, chest, leg forces" },
            { title: 'Side & Rollover Tests', content: "**Side Impact (NHTSA):**\n- Moving barrier hits door\n- 38.5 mph, 90° angle\n- Tests door structure, airbags\n\n**Side Pole (IIHS):**\n- Vehicle slides into pole\n- 20 mph, 75° angle\n- Simulates tree/pole impact\n\n**Rollover Resistance:**\n- Static Stability Factor (SSF)\n- Track width / (2 × CG height)\n- Higher = more resistant\n\n**Roof Crush:**\nPlate pushes on roof\nMust support 3× vehicle weight" },
            { title: 'Safety Ratings', content: "**NHTSA (US):**\n- 1-5 star overall\n- Frontal, side, rollover\n- Government testing\n\n**IIHS (US):**\n- Good, Acceptable, Marginal, Poor\n- Top Safety Pick / Pick+\n- Insurance industry funded\n\n**Euro NCAP:**\n- 0-5 stars\n- Adult, child, pedestrian, safety assist\n- Most comprehensive\n\n**Other:**\n- ANCAP (Australia)\n- JNCAP (Japan)\n- C-NCAP (China)" }
          ],
          keyTakeaways: ['Multiple crash tests evaluate different scenarios', 'Small overlap is most challenging', 'IIHS Top Safety Pick+ is highest rating', 'Euro NCAP includes pedestrian safety'],
          quiz: { questions: [
            { id: 'q1', question: 'IIHS small overlap test overlap:', options: ['100%', '40%', '25%', '10%'], correctAnswer: 2, explanation: 'Small overlap test uses 25% overlap, missing main structure.' },
            { id: 'q2', question: 'Roof must support:', options: ['1× weight', '2× weight', '3× weight', '5× weight'], correctAnswer: 2, explanation: 'Roof crush test requires supporting 3× vehicle weight.' },
            { id: 'q3', question: 'Euro NCAP rates:', options: ['Crash only', 'Crash + pedestrian + ADAS', 'Fuel economy', 'Emissions'], correctAnswer: 1, explanation: 'Euro NCAP rates adult, child, pedestrian protection, and safety assist.' }
          ]}
        }
      ]
    },
    {
      id: 'maintenance',
      title: 'Vehicle Maintenance',
      description: 'Keeping vehicles running safely',
      lessons: [
        {
          id: 'fluid-maintenance',
          title: 'Fluids & Filters',
          duration: '25 min', xp: 150,
          description: 'Essential fluid maintenance',
          introduction: 'Regular fluid maintenance is crucial for vehicle longevity, performance, and safety.',
          sections: [
            { title: 'Engine Oil', content: "**Function:**\nLubrication, cooling, cleaning, sealing\n\n**Viscosity:**\n5W-30: Winter rating - Operating rating\nLower W = better cold flow\n\n**Types:**\n- Conventional: Basic, frequent changes\n- Synthetic: Better protection, longer life\n- Synthetic blend: Compromise\n\n**Change Interval:**\n- Conventional: 3,000-5,000 miles\n- Synthetic: 7,500-15,000 miles\n- Follow manufacturer spec" },
            { title: 'Other Fluids', content: "**Coolant:**\n- 50/50 antifreeze/water\n- Change every 30,000-50,000 miles\n- Check concentration\n\n**Transmission Fluid:**\n- ATF or MTF\n- Often \"lifetime\" but should check\n- Change if discolored/burnt smell\n\n**Brake Fluid:**\n- DOT 3, 4, or 5.1\n- Hygroscopic (absorbs water)\n- Change every 2-3 years\n\n**Power Steering:**\n- Check level regularly\n- Flush if contaminated" },
            { title: 'Filters', content: "**Engine Air Filter:**\n- Prevents debris entering engine\n- Change every 15,000-30,000 miles\n- Check more often in dusty conditions\n\n**Cabin Air Filter:**\n- Filters interior air\n- Change every 15,000-25,000 miles\n- Affects HVAC performance\n\n**Oil Filter:**\n- Change with every oil change\n- Traps contaminants\n\n**Fuel Filter:**\n- Often in-tank (lifetime)\n- External: Change every 30,000 miles" }
          ],
          keyTakeaways: ['Synthetic oil lasts longer', 'Brake fluid absorbs water over time', 'Air filters affect performance', 'Follow manufacturer intervals'],
          quiz: { questions: [
            { id: 'q1', question: '5W-30 oil - what does W mean?', options: ['Weight', 'Winter', 'Width', 'Warranty'], correctAnswer: 1, explanation: 'W stands for Winter - the cold viscosity rating.' },
            { id: 'q2', question: 'Brake fluid should be changed:', options: ['Never', 'Every oil change', 'Every 2-3 years', 'Every 10 years'], correctAnswer: 2, explanation: 'Brake fluid absorbs water and should be changed every 2-3 years.' },
            { id: 'q3', question: 'Synthetic oil change interval:', options: ['1,000 miles', '3,000 miles', '7,500-15,000 miles', '50,000 miles'], correctAnswer: 2, explanation: 'Synthetic oil typically lasts 7,500-15,000 miles.' }
          ]}
        },
        {
          id: 'brake-maintenance',
          title: 'Brake System Maintenance',
          duration: '30 min', xp: 175,
          description: 'Pads, rotors, and brake service',
          introduction: 'Brakes are the most critical safety system. Proper maintenance ensures reliable stopping power.',
          sections: [
            { title: 'Brake Components', content: "**Disc Brakes:**\n- Rotor (disc)\n- Caliper (clamps pads)\n- Pads (friction material)\n- Most common type\n\n**Drum Brakes:**\n- Drum (rotating)\n- Shoes (friction material)\n- Wheel cylinder (actuator)\n- Rear axle, economy cars\n\n**Hydraulic System:**\n- Master cylinder\n- Brake lines\n- Calipers/wheel cylinders\n- ABS modulator" },
            { title: 'Pad & Rotor Service', content: "**Pad Wear:**\n- Minimum thickness: 2-3mm\n- Wear indicators squeal\n- Replace in pairs (axle)\n\n**Pad Materials:**\n- Organic: Quiet, dusty\n- Semi-metallic: Durable, noisy\n- Ceramic: Best all-around\n\n**Rotor Service:**\n- Minimum thickness stamped on rotor\n- Resurface if grooved (if thick enough)\n- Replace if below minimum\n- Replace if cracked\n\n**Bedding In:**\nNew pads need break-in\n30 moderate stops from 30 mph" },
            { title: 'Brake System Service', content: "**Brake Fluid Flush:**\n- Every 2-3 years\n- Removes moisture\n- Prevents corrosion\n- Maintains boiling point\n\n**Caliper Service:**\n- Slide pins need lubrication\n- Piston boots inspection\n- Rebuild or replace if seized\n\n**Brake Lines:**\n- Inspect for rust, damage\n- Rubber hoses crack with age\n- Replace if bulging\n\n**Warning Signs:**\n- Squealing, grinding\n- Pulling to one side\n- Soft pedal\n- Vibration when braking" }
          ],
          keyTakeaways: ['Replace pads in pairs per axle', 'Ceramic pads are best all-around', 'Flush brake fluid every 2-3 years', 'Grinding means metal-on-metal'],
          quiz: { questions: [
            { id: 'q1', question: 'Minimum brake pad thickness:', options: ['0.5mm', '2-3mm', '10mm', '20mm'], correctAnswer: 1, explanation: 'Brake pads should be replaced when they reach 2-3mm thickness.' },
            { id: 'q2', question: 'Brake pads should be replaced:', options: ['One at a time', 'In pairs per axle', 'All four together', 'Only when grinding'], correctAnswer: 1, explanation: 'Replace brake pads in pairs (both front or both rear) for even braking.' },
            { id: 'q3', question: 'Soft brake pedal indicates:', options: ['Normal operation', 'Air in system', 'New pads', 'Cold weather'], correctAnswer: 1, explanation: 'A soft/spongy pedal usually indicates air in the brake lines.' }
          ]}
        },
        {
          id: 'tire-maintenance',
          title: 'Tire Care & Replacement',
          duration: '25 min', xp: 150,
          description: 'Tire pressure, rotation, and replacement',
          introduction: 'Tires are the only contact with the road. Proper maintenance ensures safety and longevity.',
          sections: [
            { title: 'Tire Pressure', content: "**Importance:**\n- Safety (handling, braking)\n- Fuel economy\n- Tire life\n- Ride comfort\n\n**Checking:**\n- When cold (driven <1 mile)\n- Monthly minimum\n- Before long trips\n\n**Correct Pressure:**\n- Door jamb sticker (not tire sidewall)\n- Sidewall is MAX pressure\n- Typically 30-35 PSI\n\n**TPMS:**\nTire Pressure Monitoring System\nWarns when 25% below spec" },
            { title: 'Tire Rotation', content: "**Purpose:**\nEven out wear patterns\nExtend tire life\n\n**Interval:**\nEvery 5,000-7,500 miles\nOr with every oil change\n\n**Patterns:**\n- Front-to-rear (directional tires)\n- Cross pattern (non-directional)\n- Side-to-side (staggered sizes)\n\n**AWD Vehicles:**\nMore critical - uneven wear affects drivetrain\nKeep within 2/32\" difference" },
            { title: 'Tire Replacement', content: "**Tread Depth:**\n- New: 10/32\" - 11/32\"\n- Replace at: 2/32\" (legal minimum)\n- Recommended: 4/32\" (wet traction)\n\n**Penny Test:**\nInsert penny head-down\nIf you see Lincoln's head = replace\n\n**Age:**\n- Replace after 6-10 years\n- DOT code shows manufacture date\n- Last 4 digits: Week/Year (2521 = week 25, 2021)\n\n**Matching:**\n- Same size all around\n- Same brand/model per axle minimum\n- AWD: All four should match" }
          ],
          keyTakeaways: ['Check pressure monthly when cold', 'Rotate every 5,000-7,500 miles', 'Replace at 4/32" for wet safety', 'Tires expire after 6-10 years'],
          quiz: { questions: [
            { id: 'q1', question: 'Correct tire pressure is found:', options: ['On tire sidewall', 'On door jamb sticker', 'In owners manual only', 'On wheel'], correctAnswer: 1, explanation: 'Correct pressure is on the door jamb sticker; sidewall shows MAX pressure.' },
            { id: 'q2', question: 'Legal minimum tread depth:', options: ['1/32"', '2/32"', '4/32"', '6/32"'], correctAnswer: 1, explanation: 'Legal minimum is 2/32", but 4/32" is recommended for wet traction.' },
            { id: 'q3', question: 'Tire rotation interval:', options: ['Every 1,000 miles', 'Every 5,000-7,500 miles', 'Every 20,000 miles', 'Never'], correctAnswer: 1, explanation: 'Rotate tires every 5,000-7,500 miles for even wear.' }
          ]}
        }
      ]
    }
  ]
};

export default section4Safety;
