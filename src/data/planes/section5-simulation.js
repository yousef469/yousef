// Section 5: Practical Flight Simulation Project - 4 Lessons

export const section5Simulation = {
  id: 'simulation',
  title: 'Section 5: Flight Simulation Project',
  description: 'Apply your knowledge in practical flight scenarios',
  icon: '🛫',
  color: 'from-indigo-500 to-purple-500',
  units: [
    {
      id: 'flight-project',
      title: 'Capstone Flight Project',
      description: 'Design and simulate a complete flight',
      lessons: [
        {
          id: 'flight-planning',
          title: 'Flight Planning & Preparation',
          duration: '30 min', xp: 200,
          description: 'Plan a complete flight from departure to destination',
          introduction: 'Flight planning integrates everything you have learned. A well-planned flight is safer, more efficient, and more enjoyable.',
          sections: [
            { title: 'Route Planning', content: '**Elements of a Flight Plan:**\n\n**Route Selection:**\n- Airways vs direct\n- Terrain considerations\n- Airspace restrictions\n- Alternate airports\n\n**Distance & Time:**\n- Great circle distance\n- Wind correction\n- Fuel planning\n\n**Example Route:**\nLAX → SFO\n- Distance: 337 nm\n- Cruise: FL350\n- Time: ~1 hour' },
            { title: 'Weight & Balance', content: '**Calculate Before Every Flight:**\n\n**Components:**\n- Operating empty weight\n- Fuel weight\n- Passenger/cargo weight\n\n**CG Calculation:**\nCG = Σ(Weight × Arm) / Total Weight\n\n**Limits:**\n- Max takeoff weight\n- Max landing weight\n- CG envelope\n\n**Example: Boeing 737-800**\n- OEW: 91,300 lb\n- Max fuel: 46,000 lb\n- MTOW: 174,200 lb' },
            { title: 'Performance Planning', content: '**Takeoff Performance:**\n- Runway length required\n- V1, VR, V2 speeds\n- Climb gradient\n\n**Cruise Performance:**\n- Optimal altitude\n- Cost index\n- Step climbs\n\n**Landing Performance:**\n- Approach speed\n- Landing distance\n- Brake energy\n\n**Weather Considerations:**\n- Winds aloft\n- Temperature effects\n- Icing conditions' }
          ],
          keyTakeaways: ['Flight planning integrates all aviation knowledge', 'Weight and balance must be within limits', 'Performance calculations ensure safety margins', 'Weather affects all phases of flight'],
          quiz: { questions: [
            { id: 'q1', question: 'CG must be within:', options: ['Fuel limits', 'CG envelope', 'Speed limits', 'Altitude limits'], correctAnswer: 1, explanation: 'Center of gravity must be within the approved CG envelope for safe flight.' },
            { id: 'q2', question: 'V1 is:', options: ['Rotation speed', 'Decision speed', 'Climb speed', 'Cruise speed'], correctAnswer: 1, explanation: 'V1 is the decision speed - above V1, the takeoff must continue.' },
            { id: 'q3', question: 'Step climbs are used to:', options: ['Save time', 'Optimize fuel efficiency', 'Avoid traffic', 'Reduce noise'], correctAnswer: 1, explanation: 'Step climbs allow the aircraft to climb to more efficient altitudes as fuel burns off.' }
          ]}
        },
        {
          id: 'takeoff-climb',
          title: 'Takeoff & Climb Phase',
          duration: '25 min', xp: 175,
          description: 'Execute takeoff and climb to cruise altitude',
          introduction: 'Takeoff and climb are the most critical phases of flight. Proper technique and procedures ensure a safe departure.',
          sections: [
            { title: 'Takeoff Procedure', content: '**Pre-Takeoff:**\n- Checklist complete\n- Takeoff briefing\n- Clearance received\n\n**Takeoff Roll:**\n- Set takeoff thrust\n- Monitor engine parameters\n- Call out V1, rotate at VR\n\n**Rotation:**\n- Smooth pitch up to 15°\n- Positive rate of climb\n- Gear up\n\n**Initial Climb:**\n- V2 + 10 to 15 knots\n- Flaps retract schedule\n- Noise abatement if required' },
            { title: 'Climb Profile', content: '**Climb Speeds:**\n- V2 + 10: Initial climb\n- 250 kts: Below 10,000 ft\n- 280-300 kts: Above 10,000 ft\n- Mach 0.78-0.82: High altitude\n\n**Climb Thrust:**\n- Max climb or derated\n- Temperature limited\n- Reduces with altitude\n\n**Step Climb:**\n- Initial: FL310-350\n- As fuel burns: FL370-410\n- Optimal altitude increases' },
            { title: 'Departure Procedures', content: '**SID (Standard Instrument Departure):**\n- Published route\n- Altitude/speed restrictions\n- Noise abatement\n\n**Radar Vectors:**\n- ATC provides headings\n- Climb clearances\n- Traffic separation\n\n**Transition:**\n- SID to en route\n- Join airway\n- Set cruise altitude' }
          ],
          keyTakeaways: ['V1 is the decision speed for takeoff', 'Climb speeds change with altitude', 'SIDs provide standard departure routes', 'Step climbs optimize fuel efficiency'],
          quiz: { questions: [
            { id: 'q1', question: 'Below 10,000 ft speed limit:', options: ['200 kts', '250 kts', '300 kts', 'No limit'], correctAnswer: 1, explanation: 'Speed is limited to 250 knots below 10,000 ft in most airspace.' },
            { id: 'q2', question: 'After positive rate of climb:', options: ['Reduce thrust', 'Gear up', 'Flaps up', 'Turn'], correctAnswer: 1, explanation: 'After confirming positive rate, retract the landing gear.' },
            { id: 'q3', question: 'SID stands for:', options: ['Standard Instrument Departure', 'Safe Initial Descent', 'Speed Indicator Display', 'System Integration Data'], correctAnswer: 0, explanation: 'SID = Standard Instrument Departure, a published departure procedure.' }
          ]}
        },
        {
          id: 'cruise-descent',
          title: 'Cruise & Descent Phase',
          duration: '25 min', xp: 175,
          description: 'Manage cruise flight and plan descent',
          introduction: 'Cruise is the longest phase of flight. Efficient cruise management and proper descent planning ensure on-time arrival with optimal fuel.',
          sections: [
            { title: 'Cruise Management', content: '**Cruise Altitude:**\n- Optimal for weight\n- Wind considerations\n- Traffic\n\n**Cost Index:**\n- CI = 0: Min fuel\n- CI = max: Min time\n- Typical: CI 30-50\n\n**Monitoring:**\n- Fuel remaining vs planned\n- Weather ahead\n- ETOPS considerations\n\n**In-Flight Decisions:**\n- Diversion options\n- Step climb timing\n- Route changes' },
            { title: 'Descent Planning', content: '**Top of Descent (TOD):**\n- 3:1 rule: 3 nm per 1000 ft\n- Example: FL350 → sea level = 105 nm\n\n**Descent Profile:**\n- Idle descent preferred\n- Speed: M0.78 → 280 kts → 250 kts\n- Meet altitude restrictions\n\n**STAR (Standard Arrival):**\n- Published route\n- Speed/altitude constraints\n- Transition to approach' },
            { title: 'Approach Preparation', content: '**Briefing:**\n- Approach type (ILS, RNAV, visual)\n- Minimums\n- Missed approach procedure\n\n**Configuration:**\n- Flap schedule\n- Landing weight\n- Approach speed (Vref + wind)\n\n**Checklist:**\n- Approach checklist\n- Landing checklist\n- Crew coordination' }
          ],
          keyTakeaways: ['Cost index balances fuel and time', '3:1 rule for descent planning', 'STARs provide standard arrival routes', 'Approach briefing before descent'],
          quiz: { questions: [
            { id: 'q1', question: '3:1 descent rule means:', options: ['3 nm per 100 ft', '3 nm per 1000 ft', '3 degrees', '3 minutes per 1000 ft'], correctAnswer: 1, explanation: 'The 3:1 rule: plan 3 nautical miles for each 1000 feet of descent.' },
            { id: 'q2', question: 'Cost Index 0 means:', options: ['Maximum speed', 'Minimum fuel', 'Minimum time', 'Standard cruise'], correctAnswer: 1, explanation: 'CI = 0 optimizes for minimum fuel consumption.' },
            { id: 'q3', question: 'STAR stands for:', options: ['Standard Terminal Arrival Route', 'System Terminal Approach Radar', 'Speed/Time Arrival Reference', 'Safe Terminal Area Route'], correctAnswer: 0, explanation: 'STAR = Standard Terminal Arrival Route.' }
          ]}
        },
        {
          id: 'approach-landing',
          title: 'Approach & Landing',
          duration: '30 min', xp: 200,
          description: 'Execute approach and landing safely',
          introduction: 'The approach and landing phase requires precision and good judgment. This is where all your training comes together.',
          sections: [
            { title: 'Approach Types', content: '**Precision Approaches:**\n- ILS: Localizer + glideslope\n- GLS: GPS-based, CAT III capable\n- PAR: Radar (military)\n\n**Non-Precision:**\n- VOR\n- NDB\n- RNAV (GPS)\n- LOC only\n\n**Visual:**\n- See runway\n- Maintain visual reference\n- Often follows instrument approach' },
            { title: 'ILS Approach', content: '**Components:**\n- Localizer: Lateral guidance\n- Glideslope: Vertical guidance (3°)\n- Markers: Distance from runway\n\n**Procedure:**\n1. Intercept localizer\n2. Configure aircraft\n3. Capture glideslope\n4. Descend on glideslope\n5. At minimums: Land or go around\n\n**Decision Height:**\n- CAT I: 200 ft\n- CAT II: 100 ft\n- CAT III: 50 ft or lower' },
            { title: 'Landing', content: '**Final Approach:**\n- Stabilized by 1000 ft (IMC) or 500 ft (VMC)\n- On speed, on path, configured\n\n**Flare:**\n- Begin at ~30 ft\n- Reduce descent rate\n- Idle thrust\n\n**Touchdown:**\n- Main gear first\n- Lower nose\n- Deploy spoilers/reversers\n\n**Rollout:**\n- Braking as required\n- Exit runway\n- Complete after-landing checklist' }
          ],
          keyTakeaways: ['ILS provides precision lateral and vertical guidance', 'Stabilized approach criteria must be met', 'Decision height determines go-around point', 'Proper flare technique ensures smooth landing'],
          quiz: { questions: [
            { id: 'q1', question: 'ILS glideslope angle:', options: ['2°', '3°', '4°', '5°'], correctAnswer: 1, explanation: 'Standard ILS glideslope is 3 degrees.' },
            { id: 'q2', question: 'CAT I decision height:', options: ['50 ft', '100 ft', '200 ft', '500 ft'], correctAnswer: 2, explanation: 'CAT I ILS has a decision height of 200 feet.' },
            { id: 'q3', question: 'Stabilized approach required by:', options: ['500 ft always', '1000 ft IMC, 500 ft VMC', '2000 ft', 'Touchdown'], correctAnswer: 1, explanation: 'Stabilized by 1000 ft in IMC, 500 ft in VMC.' }
          ]}
        }
      ]
    }
  ]
};

export default section5Simulation;
