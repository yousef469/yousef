// Section 4: Water & Environmental Engineering - 6 Lessons (2 units × 3 lessons)

export const section4Water = {
  id: 'water',
  title: 'Section 4: Water & Environmental',
  description: 'Water resources and environmental systems',
  icon: '💧',
  color: 'from-cyan-500 to-blue-500',
  units: [
    {
      id: 'water-resources',
      title: 'Water Resources',
      description: 'Managing water supply and flow',
      lessons: [
        {
          id: 'hydraulics',
          title: 'Hydraulics Fundamentals',
          duration: '30 min', xp: 175,
          description: 'Fluid mechanics for civil engineers',
          introduction: 'Hydraulics is the study of water in motion. Understanding fluid behavior is essential for water system design.',
          sections: [
            { title: 'Fluid Properties', content: "**Density (ρ):**\nWater: 1000 kg/m³ = 62.4 lb/ft³\n\n**Specific Weight (γ):**\nγ = ρg\nWater: 9810 N/m³ = 62.4 lb/ft³\n\n**Viscosity:**\nResistance to flow\nWater at 20°C: 1.0 cP\n\n**Pressure:**\n**P = γh** (hydrostatic)\nPressure increases with depth\n1 ft water = 0.433 psi" },
            { title: 'Bernoulli Equation', content: "**Energy Equation:**\n**P/γ + v²/2g + z = constant**\n\n**Terms:**\n- P/γ = Pressure head\n- v²/2g = Velocity head\n- z = Elevation head\n\n**Applications:**\n- Pipe flow\n- Open channels\n- Pumps and turbines\n\n**With Losses:**\nP₁/γ + v₁²/2g + z₁ = P₂/γ + v₂²/2g + z₂ + hL" },
            { title: 'Pipe Flow', content: "**Continuity:**\n**Q = A × v** (flow rate)\nA₁v₁ = A₂v₂\n\n**Darcy-Weisbach:**\n**hf = f(L/D)(v²/2g)**\n- f = friction factor\n- L = pipe length\n- D = diameter\n\n**Hazen-Williams:**\n**V = 1.318 C R^0.63 S^0.54**\n- C = roughness coefficient\n- R = hydraulic radius\n- S = slope\n\n**Common C values:**\n- PVC: 150\n- New steel: 140\n- Old cast iron: 100" }
          ],
          keyTakeaways: ['P = γh for hydrostatic pressure', 'Bernoulli: pressure + velocity + elevation = constant', 'Q = Av for continuity', 'Hazen-Williams common for water pipes'],
          quiz: { questions: [
            { id: 'q1', question: 'Water density:', options: ['100 kg/m³', '500 kg/m³', '1000 kg/m³', '2000 kg/m³'], correctAnswer: 2, explanation: 'Water density is 1000 kg/m³ (or 62.4 lb/ft³).' },
            { id: 'q2', question: 'Continuity equation:', options: ['P = γh', 'Q = Av', 'F = ma', 'E = mc²'], correctAnswer: 1, explanation: 'Continuity: Q (flow) = A (area) × v (velocity).' },
            { id: 'q3', question: 'Hazen-Williams C for PVC:', options: ['100', '120', '140', '150'], correctAnswer: 3, explanation: 'PVC pipe has Hazen-Williams C ≈ 150 (very smooth).' }
          ]}
        },
        {
          id: 'water-supply',
          title: 'Water Supply Systems',
          duration: '25 min', xp: 150,
          description: 'Designing water distribution',
          introduction: 'Water supply systems deliver safe drinking water from source to consumer. Proper design ensures adequate pressure and flow.',
          sections: [
            { title: 'Water Demand', content: "**Average Daily Demand:**\n- Residential: 80-100 gpcd\n- Commercial: varies widely\n- Industrial: process-specific\n\n**Peak Factors:**\n- Max day: 1.5-2.0 × average\n- Peak hour: 2.5-3.5 × average\n\n**Fire Flow:**\n- Residential: 500-1500 gpm\n- Commercial: 2000-4000 gpm\n- Duration: 2-4 hours\n\n**Design Flow:**\nMax day + fire flow (usually governs)" },
            { title: 'Distribution System', content: "**System Components:**\n- Source (wells, surface water)\n- Treatment plant\n- Storage tanks\n- Pumping stations\n- Distribution mains\n- Service connections\n\n**Pipe Sizing:**\n- Minimum: 6\" for fire flow\n- Mains: 8-12\" typical\n- Transmission: 16\"+ \n\n**Pressure Requirements:**\n- Minimum: 20 psi at fixture\n- Normal: 40-80 psi\n- Maximum: 100 psi (PRV needed)" },
            { title: 'Storage & Pumping', content: "**Storage Functions:**\n- Equalization (daily variation)\n- Fire reserve\n- Emergency reserve\n\n**Storage Volume:**\n- Equalization: 25% of max day\n- Fire: Flow × duration\n- Emergency: 1-2 days average\n\n**Elevated Storage:**\n- Provides pressure by gravity\n- Height = pressure needed\n- 2.31 ft = 1 psi\n\n**Pumping:**\n- Match system curve\n- Variable speed for efficiency\n- Redundancy required" }
          ],
          keyTakeaways: ['Peak hour = 2.5-3.5 × average demand', 'Minimum 6" pipe for fire flow', 'Normal pressure 40-80 psi', '2.31 ft of head = 1 psi'],
          quiz: { questions: [
            { id: 'q1', question: 'Residential water demand:', options: ['20-40 gpcd', '80-100 gpcd', '200-300 gpcd', '500+ gpcd'], correctAnswer: 1, explanation: 'Residential water demand is typically 80-100 gallons per capita per day.' },
            { id: 'q2', question: 'Minimum pipe size for fire flow:', options: ['2"', '4"', '6"', '12"'], correctAnswer: 2, explanation: 'Minimum 6" diameter pipe required for adequate fire flow.' },
            { id: 'q3', question: '1 psi equals how many feet of water:', options: ['1.0 ft', '2.31 ft', '10 ft', '33.9 ft'], correctAnswer: 1, explanation: '2.31 feet of water head = 1 psi pressure.' }
          ]}
        },
        {
          id: 'open-channel',
          title: 'Open Channel Flow',
          duration: '25 min', xp: 150,
          description: 'Rivers, streams, and drainage channels',
          introduction: 'Open channel flow has a free surface exposed to atmosphere. It governs rivers, streams, and drainage systems.',
          sections: [
            { title: 'Channel Geometry', content: "**Hydraulic Radius:**\n**R = A/P**\n- A = cross-sectional area\n- P = wetted perimeter\n\n**Common Shapes:**\n- Rectangular: R = by/(b+2y)\n- Trapezoidal: R = (b+zy)y/(b+2y√(1+z²))\n- Circular: R = D/4 (full)\n\n**Most Efficient Section:**\n- Rectangular: y = b/2\n- Trapezoidal: half hexagon\n- Circular: semicircle" },
            { title: "Manning's Equation", content: "**Velocity:**\n**V = (1.49/n) R^(2/3) S^(1/2)** (US)\n**V = (1/n) R^(2/3) S^(1/2)** (SI)\n\n**Flow Rate:**\n**Q = VA = (1.49/n) A R^(2/3) S^(1/2)**\n\n**Manning's n values:**\n- Concrete: 0.013\n- Earth channel: 0.025\n- Natural stream: 0.030-0.050\n- Grass: 0.030-0.050\n\n**Slope (S):**\nChannel bed slope (ft/ft or m/m)" },
            { title: 'Flow Classification', content: "**Froude Number:**\n**Fr = v/√(gy)**\n\n**Flow Types:**\n- Fr < 1: Subcritical (tranquil)\n- Fr = 1: Critical\n- Fr > 1: Supercritical (rapid)\n\n**Critical Depth:**\n**yc = (q²/g)^(1/3)**\nq = Q/b (unit discharge)\n\n**Hydraulic Jump:**\nTransition from supercritical to subcritical\nEnergy dissipation\nUsed in spillways" }
          ],
          keyTakeaways: ['R = A/P (hydraulic radius)', 'Manning\'s equation for open channel velocity', 'Fr < 1 subcritical, Fr > 1 supercritical', 'Hydraulic jump dissipates energy'],
          quiz: { questions: [
            { id: 'q1', question: 'Hydraulic radius R =:', options: ['A + P', 'A × P', 'A / P', 'P / A'], correctAnswer: 2, explanation: 'Hydraulic radius R = Area / Wetted Perimeter.' },
            { id: 'q2', question: 'Manning\'s n for concrete:', options: ['0.005', '0.013', '0.030', '0.050'], correctAnswer: 1, explanation: 'Concrete channel Manning\'s n ≈ 0.013.' },
            { id: 'q3', question: 'Froude number < 1 means:', options: ['Supercritical', 'Critical', 'Subcritical', 'No flow'], correctAnswer: 2, explanation: 'Fr < 1 indicates subcritical (tranquil) flow.' }
          ]}
        }
      ]
    },
    {
      id: 'environmental',
      title: 'Environmental Engineering',
      description: 'Water quality and treatment',
      lessons: [
        {
          id: 'water-quality',
          title: 'Water Quality',
          duration: '25 min', xp: 150,
          description: 'Parameters and standards',
          introduction: 'Water quality determines suitability for various uses. Understanding parameters is essential for treatment design.',
          sections: [
            { title: 'Physical Parameters', content: "**Turbidity:**\nCloudiness from suspended particles\nUnits: NTU (Nephelometric Turbidity Units)\nDrinking water: < 1 NTU\n\n**Color:**\nFrom dissolved organics\nUnits: Color units (CU)\n\n**Temperature:**\nAffects dissolved oxygen, reactions\nCold water holds more oxygen\n\n**Taste & Odor:**\nSubjective but important\nThreshold odor number (TON)" },
            { title: 'Chemical Parameters', content: "**pH:**\nAcidity/alkalinity\nDrinking water: 6.5-8.5\n\n**Dissolved Oxygen (DO):**\nEssential for aquatic life\nSaturation: ~9 mg/L at 20°C\n\n**BOD (Biochemical Oxygen Demand):**\nOxygen needed to decompose organics\nBOD₅: 5-day test at 20°C\n\n**Hardness:**\nCalcium + Magnesium\nSoft: < 75 mg/L as CaCO₃\nHard: > 150 mg/L" },
            { title: 'Biological Parameters', content: "**Coliform Bacteria:**\nIndicator of fecal contamination\n- Total coliform\n- Fecal coliform\n- E. coli\n\n**Standards:**\nDrinking water: 0 coliforms/100mL\n\n**Pathogens:**\n- Bacteria (cholera, typhoid)\n- Viruses (hepatitis, polio)\n- Protozoa (giardia, cryptosporidium)\n\n**Disinfection:**\nChlorine, UV, ozone\nCT concept (concentration × time)" }
          ],
          keyTakeaways: ['Turbidity < 1 NTU for drinking water', 'pH 6.5-8.5 for drinking water', 'BOD measures organic pollution', 'Zero coliforms required in drinking water'],
          quiz: { questions: [
            { id: 'q1', question: 'Drinking water turbidity limit:', options: ['< 1 NTU', '< 10 NTU', '< 100 NTU', 'No limit'], correctAnswer: 0, explanation: 'Drinking water turbidity must be < 1 NTU.' },
            { id: 'q2', question: 'BOD measures:', options: ['Bacteria count', 'Organic pollution', 'pH level', 'Hardness'], correctAnswer: 1, explanation: 'BOD (Biochemical Oxygen Demand) measures organic pollution.' },
            { id: 'q3', question: 'Coliform limit in drinking water:', options: ['10/100mL', '1/100mL', '0/100mL', '100/100mL'], correctAnswer: 2, explanation: 'Drinking water must have zero coliforms per 100 mL.' }
          ]}
        },
        {
          id: 'water-treatment',
          title: 'Water Treatment',
          duration: '30 min', xp: 175,
          description: 'Treating water for drinking',
          introduction: 'Water treatment removes contaminants to produce safe drinking water. The process depends on source water quality.',
          sections: [
            { title: 'Conventional Treatment', content: "**Process Sequence:**\n1. Screening (remove debris)\n2. Coagulation (add chemicals)\n3. Flocculation (gentle mixing)\n4. Sedimentation (settle floc)\n5. Filtration (remove remaining)\n6. Disinfection (kill pathogens)\n\n**Coagulants:**\n- Alum (aluminum sulfate)\n- Ferric chloride\n- Polymers\n\n**Detention Times:**\n- Flocculation: 20-30 min\n- Sedimentation: 2-4 hours" },
            { title: 'Filtration', content: "**Rapid Sand Filters:**\n- Rate: 2-6 gpm/ft²\n- Media: Sand, anthracite\n- Backwash to clean\n\n**Slow Sand Filters:**\n- Rate: 0.05-0.15 gpm/ft²\n- Biological layer (schmutzdecke)\n- Simple, effective\n\n**Membrane Filtration:**\n- Microfiltration (MF)\n- Ultrafiltration (UF)\n- Nanofiltration (NF)\n- Reverse Osmosis (RO)\n\n**Filter Performance:**\nRemoves turbidity, pathogens\n2-3 log removal typical" },
            { title: 'Disinfection', content: "**Chlorination:**\n- Most common method\n- Residual protection\n- Forms DBPs (disinfection byproducts)\n- Free chlorine vs chloramines\n\n**CT Concept:**\n**CT = C × T**\n- C = concentration (mg/L)\n- T = contact time (min)\n- Required CT varies by pathogen\n\n**Alternative Methods:**\n- UV: No residual, effective\n- Ozone: Strong oxidant, no residual\n- Chlorine dioxide: Less DBPs" }
          ],
          keyTakeaways: ['Coagulation-flocculation-sedimentation-filtration-disinfection', 'Rapid sand filters: 2-6 gpm/ft²', 'CT = concentration × time for disinfection', 'Chlorine provides residual protection'],
          quiz: { questions: [
            { id: 'q1', question: 'Correct treatment sequence:', options: ['Filter-coagulate-disinfect', 'Coagulate-settle-filter-disinfect', 'Disinfect-filter-settle', 'Filter-disinfect-settle'], correctAnswer: 1, explanation: 'Correct: Coagulation → Sedimentation → Filtration → Disinfection.' },
            { id: 'q2', question: 'Rapid sand filter rate:', options: ['0.1 gpm/ft²', '2-6 gpm/ft²', '20-30 gpm/ft²', '100 gpm/ft²'], correctAnswer: 1, explanation: 'Rapid sand filters operate at 2-6 gpm/ft².' },
            { id: 'q3', question: 'CT in disinfection means:', options: ['Chlorine type', 'Concentration × Time', 'Contact temperature', 'Chemical treatment'], correctAnswer: 1, explanation: 'CT = Concentration × Contact Time for disinfection.' }
          ]}
        },
        {
          id: 'wastewater',
          title: 'Wastewater Treatment',
          duration: '25 min', xp: 150,
          description: 'Treating sewage and wastewater',
          introduction: 'Wastewater treatment protects public health and the environment by removing pollutants before discharge.',
          sections: [
            { title: 'Primary Treatment', content: "**Screening:**\nRemove large debris\nBar screens: 1-3\" spacing\n\n**Grit Removal:**\nRemove sand, gravel\nProtects equipment\n\n**Primary Clarifier:**\n- Settles suspended solids\n- Detention: 1.5-2.5 hours\n- Removes 50-70% TSS\n- Removes 25-40% BOD\n\n**Primary Sludge:**\nSettled solids\nPumped to sludge processing" },
            { title: 'Secondary Treatment', content: "**Biological Treatment:**\nMicroorganisms consume organics\n\n**Activated Sludge:**\n- Aeration tank (4-8 hours)\n- Return activated sludge (RAS)\n- Waste activated sludge (WAS)\n- 85-95% BOD removal\n\n**Trickling Filter:**\n- Fixed media with biofilm\n- Wastewater trickles over\n- Lower energy than activated sludge\n\n**Secondary Clarifier:**\nSettles biological floc\nReturns sludge to aeration" },
            { title: 'Advanced Treatment', content: "**Nutrient Removal:**\n- Nitrogen: Nitrification/denitrification\n- Phosphorus: Chemical precipitation\n\n**Tertiary Filtration:**\nPolishing after secondary\nRemoves remaining TSS\n\n**Disinfection:**\n- Chlorine (dechlorinate before discharge)\n- UV (common for effluent)\n\n**Effluent Standards:**\n- BOD: < 30 mg/L\n- TSS: < 30 mg/L\n- Varies by permit" }
          ],
          keyTakeaways: ['Primary removes 50-70% solids', 'Activated sludge removes 85-95% BOD', 'Nutrient removal for N and P', 'Typical effluent: BOD < 30, TSS < 30'],
          quiz: { questions: [
            { id: 'q1', question: 'Primary treatment removes:', options: ['25-40% BOD', '85-95% BOD', '99% BOD', '0% BOD'], correctAnswer: 0, explanation: 'Primary treatment (settling) removes only 25-40% of BOD.' },
            { id: 'q2', question: 'Activated sludge BOD removal:', options: ['25-40%', '50-70%', '85-95%', '99%'], correctAnswer: 2, explanation: 'Activated sludge (secondary) removes 85-95% of BOD.' },
            { id: 'q3', question: 'RAS stands for:', options: ['Rapid Aeration System', 'Return Activated Sludge', 'Recycle And Settle', 'Remove All Solids'], correctAnswer: 1, explanation: 'RAS = Return Activated Sludge (recycled to aeration tank).' }
          ]}
        }
      ]
    }
  ]
};

export default section4Water;
