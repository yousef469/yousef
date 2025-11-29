// Section 4: Maintenance & Safety - 6 Lessons (2 units × 3 lessons)

export const section4Maintenance = {
  id: 'maintenance',
  title: 'Section 4: Maintenance & Safety',
  description: 'Aircraft maintenance, regulations, and safety systems',
  icon: '🔧',
  color: 'from-green-500 to-emerald-500',
  units: [
    {
      id: 'maintenance-ops',
      title: 'Maintenance Operations',
      description: 'How aircraft are maintained and inspected',
      lessons: [
        {
          id: 'maintenance-programs',
          title: 'Maintenance Programs',
          duration: '25 min', xp: 150,
          description: 'Scheduled and unscheduled maintenance',
          introduction: 'Aircraft maintenance ensures continued airworthiness. Understanding maintenance programs is essential for safe operations.',
          sections: [
            { title: 'Maintenance Philosophy', content: '**Hard Time:**\n- Replace at fixed intervals\n- Regardless of condition\n- Conservative approach\n\n**On Condition:**\n- Monitor until limit reached\n- Inspect regularly\n- More efficient\n\n**Condition Monitoring:**\n- Continuous data collection\n- Trend analysis\n- Predictive maintenance' },
            { title: 'Check Intervals', content: '**Line Maintenance:**\n- Daily/transit checks\n- Visual inspections\n- Fluid levels, tire pressure\n\n**A Check:** ~500-800 flight hours\n- Detailed inspection\n- 50-70 man-hours\n- Overnight\n\n**C Check:** ~18-24 months\n- Extensive inspection\n- 6,000+ man-hours\n- 1-2 weeks\n\n**D Check:** ~6-10 years\n- Complete overhaul\n- 50,000+ man-hours\n- 2 months' },
            { title: 'Documentation', content: '**Required Records:**\n- Aircraft logbook\n- Engine logbooks\n- Component records\n- AD compliance\n\n**Airworthiness Directives (AD):**\n- Mandatory modifications\n- Safety-related\n- Must comply by deadline\n\n**Service Bulletins (SB):**\n- Manufacturer recommendations\n- Optional unless mandated\n- Improvements, updates' }
          ],
          keyTakeaways: ['Three maintenance philosophies: hard time, on condition, condition monitoring', 'Check intervals: A (500 hrs), C (2 yrs), D (6-10 yrs)', 'ADs are mandatory, SBs are optional', 'Complete documentation required'],
          quiz: { questions: [
            { id: 'q1', question: 'D Check interval:', options: ['500 hours', '2 years', '6-10 years', '20 years'], correctAnswer: 2, explanation: 'D Check (heavy maintenance) occurs every 6-10 years.' },
            { id: 'q2', question: 'Airworthiness Directives are:', options: ['Optional', 'Mandatory', 'Recommendations', 'Guidelines'], correctAnswer: 1, explanation: 'ADs are mandatory safety modifications that must be complied with.' },
            { id: 'q3', question: 'A Check duration:', options: ['1 hour', 'Overnight', '1 week', '2 months'], correctAnswer: 1, explanation: 'A Checks typically take overnight (50-70 man-hours).' }
          ]}
        },
        {
          id: 'inspection-techniques',
          title: 'Inspection Techniques',
          duration: '25 min', xp: 150,
          description: 'NDT methods and inspection procedures',
          introduction: 'Non-destructive testing allows inspection of aircraft structures without causing damage. These techniques find hidden defects before they cause failures.',
          sections: [
            { title: 'Visual Inspection', content: '**Most Common Method:**\n- 80% of defects found visually\n- Requires good lighting\n- Magnification for detail\n\n**What to Look For:**\n- Cracks\n- Corrosion\n- Dents, scratches\n- Loose fasteners\n- Fluid leaks\n\n**Tools:**\n- Borescopes\n- Mirrors\n- Magnifying glasses' },
            { title: 'NDT Methods', content: '**Dye Penetrant:**\n- Surface cracks\n- Apply dye, wipe, apply developer\n- Cracks show as colored lines\n\n**Magnetic Particle:**\n- Ferrous metals only\n- Magnetize part\n- Iron particles collect at cracks\n\n**Eddy Current:**\n- Subsurface defects\n- Electromagnetic induction\n- Good for aluminum\n\n**Ultrasonic:**\n- Internal defects\n- Sound waves reflect from flaws\n- Measures thickness' },
            { title: 'Advanced Techniques', content: '**X-Ray/Radiography:**\n- Internal structure\n- Composite inspection\n- Expensive, time-consuming\n\n**Thermography:**\n- Heat patterns\n- Delamination in composites\n- Water ingress detection\n\n**Acoustic Emission:**\n- Detects crack growth\n- Real-time monitoring\n- Structural health monitoring' }
          ],
          keyTakeaways: ['Visual inspection finds 80% of defects', 'Dye penetrant for surface cracks', 'Eddy current for subsurface aluminum defects', 'Ultrasonic for internal flaws and thickness'],
          quiz: { questions: [
            { id: 'q1', question: 'Most common inspection method:', options: ['X-ray', 'Ultrasonic', 'Visual', 'Magnetic particle'], correctAnswer: 2, explanation: 'Visual inspection finds approximately 80% of defects.' },
            { id: 'q2', question: 'Eddy current is best for:', options: ['Steel', 'Aluminum', 'Composites', 'Rubber'], correctAnswer: 1, explanation: 'Eddy current testing is particularly effective for aluminum structures.' },
            { id: 'q3', question: 'Dye penetrant detects:', options: ['Internal cracks', 'Surface cracks', 'Corrosion', 'Delamination'], correctAnswer: 1, explanation: 'Dye penetrant testing reveals surface-breaking cracks.' }
          ]}
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting & Repair',
          duration: '25 min', xp: 150,
          description: 'Diagnosing and fixing aircraft problems',
          introduction: 'Effective troubleshooting requires systematic approach and understanding of aircraft systems. Proper repairs ensure continued airworthiness.',
          sections: [
            { title: 'Troubleshooting Process', content: '**Systematic Approach:**\n1. Gather information (pilot reports)\n2. Verify the problem\n3. Isolate the system\n4. Identify possible causes\n5. Test and eliminate\n6. Repair and verify\n\n**Resources:**\n- Fault Isolation Manual (FIM)\n- Troubleshooting Manual (TSM)\n- Wiring diagrams\n- System schematics' },
            { title: 'Common Issues', content: '**Electrical:**\n- Open circuits\n- Short circuits\n- Intermittent connections\n- Chafed wiring\n\n**Hydraulic:**\n- Leaks\n- Contamination\n- Pump failures\n- Actuator problems\n\n**Structural:**\n- Cracks\n- Corrosion\n- Fastener failures\n- Impact damage' },
            { title: 'Repair Standards', content: '**Approved Data:**\n- Structural Repair Manual (SRM)\n- Manufacturer data\n- DER-approved repairs\n\n**Repair Categories:**\n- Minor: Doesnt affect airworthiness\n- Major: Requires approved data\n\n**Documentation:**\n- Work performed\n- Parts used\n- Inspector sign-off\n- Return to service' }
          ],
          keyTakeaways: ['Systematic troubleshooting saves time', 'Use approved manuals and data', 'Major repairs require approved data', 'Document all work performed'],
          quiz: { questions: [
            { id: 'q1', question: 'First troubleshooting step:', options: ['Replace parts', 'Gather information', 'Run tests', 'Call manufacturer'], correctAnswer: 1, explanation: 'Always start by gathering information about the reported problem.' },
            { id: 'q2', question: 'Major repairs require:', options: ['No documentation', 'Approved data', 'Pilot approval', 'Verbal authorization'], correctAnswer: 1, explanation: 'Major repairs must be performed using approved data (SRM, manufacturer data, or DER approval).' },
            { id: 'q3', question: 'SRM stands for:', options: ['Safety Repair Manual', 'Structural Repair Manual', 'System Reference Manual', 'Standard Repair Method'], correctAnswer: 1, explanation: 'SRM = Structural Repair Manual, containing approved repair procedures.' }
          ]}
        }
      ]
    },
    {
      id: 'safety-systems',
      title: 'Safety Systems',
      description: 'Warning systems and emergency equipment',
      lessons: [
        {
          id: 'warning-systems',
          title: 'Warning & Alert Systems',
          duration: '25 min', xp: 150,
          description: 'GPWS, TCAS, and cockpit warnings',
          introduction: 'Warning systems provide critical information to pilots about potential hazards. Understanding these systems can prevent accidents.',
          sections: [
            { title: 'GPWS/EGPWS', content: '**Ground Proximity Warning System:**\n\n**Warnings:**\n- "PULL UP" - Terrain ahead\n- "TERRAIN" - Rising terrain\n- "DON\'T SINK" - Descent after takeoff\n- "TOO LOW GEAR/FLAPS"\n- "GLIDESLOPE"\n\n**EGPWS (Enhanced):**\n- Terrain database\n- Predictive warnings\n- Terrain display' },
            { title: 'TCAS', content: '**Traffic Collision Avoidance System:**\n\n**Levels:**\n- Traffic Advisory (TA): "TRAFFIC"\n- Resolution Advisory (RA): "CLIMB/DESCEND"\n\n**Operation:**\n- Interrogates transponders\n- Calculates collision risk\n- Coordinates with other aircraft\n\n**Pilot Response:**\n- RA takes priority over ATC\n- Follow TCAS commands\n- Report to ATC' },
            { title: 'Cockpit Warnings', content: '**Warning Hierarchy:**\n\n**Level 1 - WARNING (Red):**\n- Immediate action required\n- Master warning light\n- Aural alert\n\n**Level 2 - CAUTION (Amber):**\n- Awareness, possible action\n- Master caution light\n\n**Level 3 - ADVISORY (Blue/Green):**\n- Information only\n- No immediate action\n\n**EICAS/ECAM:**\n- Centralized warning display\n- Checklist guidance' }
          ],
          keyTakeaways: ['EGPWS prevents controlled flight into terrain', 'TCAS RAs take priority over ATC', 'Three warning levels: Warning, Caution, Advisory', 'Always respond to warnings immediately'],
          quiz: { questions: [
            { id: 'q1', question: 'TCAS RA priority:', options: ['Below ATC', 'Equal to ATC', 'Above ATC', 'Pilot discretion'], correctAnswer: 2, explanation: 'TCAS Resolution Advisories take priority over ATC instructions.' },
            { id: 'q2', question: 'Red warnings require:', options: ['No action', 'Awareness only', 'Immediate action', 'Delayed action'], correctAnswer: 2, explanation: 'Red (Level 1) warnings require immediate pilot action.' },
            { id: 'q3', question: 'EGPWS improvement over GPWS:', options: ['Louder alerts', 'Terrain database', 'Faster response', 'Lower cost'], correctAnswer: 1, explanation: 'EGPWS adds a terrain database for predictive warnings.' }
          ]}
        },
        {
          id: 'emergency-equipment',
          title: 'Emergency Equipment',
          duration: '25 min', xp: 150,
          description: 'Fire suppression, evacuation, and survival equipment',
          introduction: 'Emergency equipment provides the last line of defense in aircraft emergencies. Proper equipment and training save lives.',
          sections: [
            { title: 'Fire Protection', content: '**Detection:**\n- Smoke detectors (cargo, lavatory)\n- Heat detectors (engine, APU)\n- Fire loops (overheat detection)\n\n**Suppression:**\n- Engine: Halon bottles\n- Cargo: Halon flooding\n- Cabin: Portable extinguishers\n\n**Types of Extinguishers:**\n- Halon: Electrical, liquid fires\n- Water: Paper, fabric\n- CO2: Electrical' },
            { title: 'Evacuation Equipment', content: '**Emergency Exits:**\n- Type A: 42" wide (110 pax/min)\n- Type I: 24" wide (45 pax/min)\n- Type III: 20" wide (35 pax/min)\n\n**Slides/Rafts:**\n- Automatic deployment\n- Dual-lane slides\n- Slide/raft combinations\n\n**Evacuation Time:**\n- 90 seconds requirement\n- All passengers, half exits\n- Demonstrated in certification' },
            { title: 'Survival Equipment', content: '**Over Water:**\n- Life vests (under seats)\n- Life rafts\n- Emergency locator transmitter (ELT)\n- Survival kits\n\n**General:**\n- First aid kits\n- Flashlights\n- Megaphones\n- Crash axes\n\n**ELT:**\n- 406 MHz beacon\n- GPS position\n- Automatic activation on impact' }
          ],
          keyTakeaways: ['Fire detection and suppression in multiple zones', '90-second evacuation requirement', 'Life vests under seats for over-water flights', 'ELT transmits position automatically'],
          quiz: { questions: [
            { id: 'q1', question: 'Evacuation time requirement:', options: ['60 seconds', '90 seconds', '120 seconds', '180 seconds'], correctAnswer: 1, explanation: 'Aircraft must demonstrate evacuation in 90 seconds using half the exits.' },
            { id: 'q2', question: 'ELT frequency:', options: ['121.5 MHz', '243 MHz', '406 MHz', '500 MHz'], correctAnswer: 2, explanation: 'Modern ELTs transmit on 406 MHz with GPS position.' },
            { id: 'q3', question: 'Engine fire suppression uses:', options: ['Water', 'CO2', 'Halon', 'Foam'], correctAnswer: 2, explanation: 'Engine fire suppression systems use Halon (or Halon replacement) agents.' }
          ]}
        },
        {
          id: 'regulations-safety',
          title: 'Regulations & Safety Culture',
          duration: '25 min', xp: 150,
          description: 'Aviation regulations and safety management',
          introduction: 'Aviation safety is built on regulations, procedures, and a culture of continuous improvement. Understanding this framework is essential.',
          sections: [
            { title: 'Regulatory Framework', content: '**ICAO:**\n- International standards\n- Annexes (18 total)\n- SARPs (Standards and Recommended Practices)\n\n**National Authorities:**\n- FAA (United States)\n- EASA (Europe)\n- CAAC (China)\n\n**Regulations:**\n- Part 25: Transport aircraft\n- Part 121: Air carriers\n- Part 145: Repair stations' },
            { title: 'Safety Management', content: '**SMS (Safety Management System):**\n- Policy\n- Risk management\n- Safety assurance\n- Safety promotion\n\n**Hazard Identification:**\n- Voluntary reporting\n- Incident investigation\n- Trend analysis\n\n**Just Culture:**\n- Report without fear\n- Distinguish error from violation\n- Learn from mistakes' },
            { title: 'Continuous Improvement', content: '**Accident Investigation:**\n- NTSB (US)\n- BEA (France)\n- AAIB (UK)\n- Focus on prevention\n\n**Safety Metrics:**\n- Fatal accident rate\n- Incident rate\n- Audit findings\n\n**Industry Initiatives:**\n- IATA IOSA audits\n- CAST (Commercial Aviation Safety Team)\n- Flight data monitoring' }
          ],
          keyTakeaways: ['ICAO sets international standards', 'SMS has four components', 'Just culture encourages reporting', 'Continuous improvement through data analysis'],
          quiz: { questions: [
            { id: 'q1', question: 'SMS components:', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: 'SMS has 4 components: Policy, Risk Management, Safety Assurance, Safety Promotion.' },
            { id: 'q2', question: 'Just culture means:', options: ['No punishment ever', 'Report without fear of blame for honest errors', 'Ignore violations', 'Blame individuals'], correctAnswer: 1, explanation: 'Just culture encourages reporting by distinguishing honest errors from willful violations.' },
            { id: 'q3', question: 'Part 25 covers:', options: ['Pilots', 'Airlines', 'Transport aircraft', 'Airports'], correctAnswer: 2, explanation: 'Part 25 contains airworthiness standards for transport category aircraft.' }
          ]}
        }
      ]
    }
  ]
};

export default section4Maintenance;
