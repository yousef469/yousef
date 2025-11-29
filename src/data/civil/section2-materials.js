// Section 2: Materials & Construction Techniques - 6 Lessons (2 units × 3 lessons)

export const section2Materials = {
  id: 'materials',
  title: 'Section 2: Materials & Construction',
  description: 'Construction materials and methods',
  icon: '🧱',
  color: 'from-orange-500 to-red-500',
  units: [
    {
      id: 'construction-materials',
      title: 'Construction Materials',
      description: 'Properties and applications of materials',
      lessons: [
        {
          id: 'concrete',
          title: 'Concrete Technology',
          duration: '30 min', xp: 175,
          description: 'Concrete mix design and properties',
          introduction: 'Concrete is the most widely used construction material. Understanding its properties is essential for structural design.',
          sections: [
            { title: 'Concrete Components', content: "**Portland Cement:**\n- Hydraulic binder\n- Types: I (general), II (moderate), III (high early)\n- Reacts with water (hydration)\n\n**Aggregates:**\n- Fine: Sand (< 4.75mm)\n- Coite: Gravel/stone (> 4.75mm)\n- 60-75% of concrete volume\n\n**Water:**\n- Activates cement\n- Water/cement ratio critical\n- Lower w/c = stronger concrete\n\n**Admixtures:**\n- Air entraining (freeze-thaw)\n- Water reducers\n- Accelerators/retarders\n- Superplasticizers" },
            { title: 'Mix Design', content: "**Strength Classes:**\n- Normal: 3,000-5,000 psi (20-35 MPa)\n- High strength: 6,000-10,000 psi\n- Ultra-high: 15,000+ psi\n\n**Water/Cement Ratio:**\n- 0.40: High strength\n- 0.50: Normal strength\n- 0.60: Lower strength\n\n**Slump Test:**\nMeasures workability\n- 2-4\": Pavements\n- 4-6\": Structural\n- 6-8\": Pumped concrete\n\n**Mix Proportions:**\nTypical 1:2:3 (cement:sand:gravel)" },
            { title: 'Concrete Properties', content: "**Compressive Strength:**\nf'c = design strength at 28 days\nTested with cylinder crush test\n\n**Tensile Strength:**\n~10% of compressive\nWhy we use reinforcement\n\n**Curing:**\n- Keep moist for 7+ days\n- Temperature 50-90°F\n- Critical for strength development\n\n**Durability:**\n- Air entrainment for freeze-thaw\n- Cover over reinforcement\n- Low permeability\n- Proper curing" }
          ],
          keyTakeaways: ['Lower w/c ratio = stronger concrete', 'f\'c is 28-day compressive strength', 'Concrete weak in tension (needs rebar)', 'Proper curing is critical'],
          quiz: { questions: [
            { id: 'q1', question: 'Lower water/cement ratio means:', options: ['Weaker concrete', 'Stronger concrete', 'No difference', 'More workable'], correctAnswer: 1, explanation: 'Lower w/c ratio produces stronger, less permeable concrete.' },
            { id: 'q2', question: 'Concrete tensile strength is:', options: ['Equal to compressive', '50% of compressive', '10% of compressive', 'Higher than compressive'], correctAnswer: 2, explanation: 'Concrete tensile strength is only about 10% of compressive strength.' },
            { id: 'q3', question: 'f\'c is measured at:', options: ['7 days', '14 days', '28 days', '90 days'], correctAnswer: 2, explanation: 'f\'c is the specified compressive strength at 28 days.' }
          ]}
        },
        {
          id: 'steel',
          title: 'Structural Steel',
          duration: '25 min', xp: 150,
          description: 'Steel properties and connections',
          introduction: 'Steel provides high strength and ductility, making it ideal for frames, bridges, and high-rise buildings.',
          sections: [
            { title: 'Steel Properties', content: "**Grades:**\n- A36: Fy = 36 ksi (250 MPa)\n- A572 Gr 50: Fy = 50 ksi (345 MPa)\n- A992: Fy = 50 ksi (beams)\n\n**Properties:**\n- E = 29,000 ksi (200 GPa)\n- Ductile (stretches before breaking)\n- Consistent quality\n- Recyclable\n\n**Yield vs Ultimate:**\n- Yield: Permanent deformation starts\n- Ultimate: Maximum stress\n- Fy/Fu ratio important for ductility" },
            { title: 'Steel Shapes', content: "**Wide Flange (W):**\nW12×26 = 12\" deep, 26 lb/ft\nMost common beam/column\n\n**Channels (C):**\nC-shaped, one flange\n\n**Angles (L):**\nL-shaped, bracing/connections\n\n**Tubes:**\n- HSS: Hollow Structural Section\n- Round, square, rectangular\n- Good for columns\n\n**Plates:**\nFlat stock for connections\nBase plates, gussets" },
            { title: 'Steel Connections', content: "**Bolted Connections:**\n- A325: High-strength (120 ksi)\n- A490: Higher strength (150 ksi)\n- Snug-tight or pretensioned\n- Slip-critical for movement\n\n**Welded Connections:**\n- Fillet welds (most common)\n- Groove welds (full penetration)\n- E70XX electrodes (70 ksi)\n\n**Connection Types:**\n- Shear (simple)\n- Moment (rigid)\n- Braced frame\n- Moment frame" }
          ],
          keyTakeaways: ['A992 is standard beam steel (Fy=50 ksi)', 'W shapes are most common', 'Bolts: A325 and A490 high-strength', 'Fillet welds most common type'],
          quiz: { questions: [
            { id: 'q1', question: 'A992 steel yield strength:', options: ['36 ksi', '50 ksi', '70 ksi', '100 ksi'], correctAnswer: 1, explanation: 'A992 (standard beam steel) has Fy = 50 ksi.' },
            { id: 'q2', question: 'W12×26 means:', options: ['12 ft long, 26 lb', '12" deep, 26 lb/ft', '12 mm thick', 'Width 12, height 26'], correctAnswer: 1, explanation: 'W12×26 = Wide flange, 12" nominal depth, 26 pounds per foot.' },
            { id: 'q3', question: 'Most common weld type:', options: ['Groove', 'Fillet', 'Plug', 'Spot'], correctAnswer: 1, explanation: 'Fillet welds are the most common type in structural steel.' }
          ]}
        },
        {
          id: 'masonry-wood',
          title: 'Masonry & Wood',
          duration: '25 min', xp: 150,
          description: 'Traditional construction materials',
          introduction: 'Masonry and wood have been used for millennia. Modern engineering optimizes their use in construction.',
          sections: [
            { title: 'Masonry', content: "**Concrete Masonry Units (CMU):**\n- Standard: 8×8×16 inches\n- Actual: 7⅝×7⅝×15⅝\n- f'm = 1,500-3,000 psi\n\n**Brick:**\n- Clay fired at high temp\n- Modular: 4×2⅔×8 inches\n- Higher strength than CMU\n\n**Mortar:**\n- Type M: High strength\n- Type S: General structural\n- Type N: Non-structural\n\n**Reinforced Masonry:**\n- Rebar in grouted cells\n- Required in seismic zones" },
            { title: 'Structural Wood', content: "**Lumber Grades:**\n- Select Structural\n- No. 1, No. 2, No. 3\n- Stud grade\n\n**Engineered Wood:**\n- Glulam: Laminated beams\n- LVL: Laminated Veneer Lumber\n- I-joists: Efficient floor framing\n- CLT: Cross-Laminated Timber\n\n**Properties:**\n- Fb = bending stress\n- Fc = compression parallel\n- E = modulus of elasticity\n- Varies with species, grade" },
            { title: 'Wood Connections', content: "**Nails:**\n- Common, box, sinker\n- Penny (d) sizing\n- 16d = 3.5\" common\n\n**Screws:**\n- Better withdrawal resistance\n- Lag screws for heavy loads\n\n**Bolts:**\n- Through-bolts with washers\n- Carriage bolts\n\n**Connectors:**\n- Joist hangers\n- Hurricane ties\n- Hold-downs\n- Simpson Strong-Tie common brand" }
          ],
          keyTakeaways: ['CMU standard is 8×8×16 nominal', 'Type S mortar for structural use', 'Engineered wood stronger than lumber', 'Metal connectors critical for wood'],
          quiz: { questions: [
            { id: 'q1', question: 'Standard CMU size (nominal):', options: ['4×4×8', '6×6×12', '8×8×16', '12×12×24'], correctAnswer: 2, explanation: 'Standard CMU is 8×8×16 inches nominal (7⅝×7⅝×15⅝ actual).' },
            { id: 'q2', question: 'Glulam is:', options: ['Solid timber', 'Laminated beam', 'Plywood', 'Particle board'], correctAnswer: 1, explanation: 'Glulam (glued laminated timber) is made of laminated lumber layers.' },
            { id: 'q3', question: 'Type S mortar is for:', options: ['Non-structural', 'General structural', 'Below grade only', 'Interior only'], correctAnswer: 1, explanation: 'Type S mortar is for general structural masonry applications.' }
          ]}
        }
      ]
    },
    {
      id: 'construction-methods',
      title: 'Construction Methods',
      description: 'Building techniques and processes',
      lessons: [
        {
          id: 'foundations',
          title: 'Foundation Systems',
          duration: '30 min', xp: 175,
          description: 'Types of foundations and design',
          introduction: 'Foundations transfer building loads to the ground. The type depends on soil conditions and building loads.',
          sections: [
            { title: 'Shallow Foundations', content: "**Spread Footings:**\n- Individual column footings\n- Spread load over larger area\n- Sized for soil bearing capacity\n\n**Strip Footings:**\n- Continuous under walls\n- Residential foundation walls\n\n**Mat/Raft Foundation:**\n- Entire building on one slab\n- Poor soils or heavy loads\n- Reduces differential settlement\n\n**Design:**\nFooting area = Load / Allowable bearing\nTypical bearing: 2,000-4,000 psf" },
            { title: 'Deep Foundations', content: "**Driven Piles:**\n- Steel H-piles\n- Concrete piles\n- Timber piles\n- Driven to refusal or depth\n\n**Drilled Shafts (Caissons):**\n- Excavated and filled with concrete\n- Large diameter (2-10 ft)\n- Can be belled at bottom\n\n**When Needed:**\n- Poor surface soils\n- Heavy loads\n- Scour concerns (bridges)\n- Uplift resistance\n\n**Capacity:**\nEnd bearing + Skin friction" },
            { title: 'Foundation Construction', content: "**Excavation:**\n- Shoring for deep excavations\n- Dewatering if below water table\n- Soil protection\n\n**Formwork:**\n- Wood or metal forms\n- Proper bracing\n- Release agents\n\n**Reinforcement:**\n- Rebar placement\n- Cover requirements\n- Lap splices\n\n**Concrete Placement:**\n- Proper consolidation\n- No segregation\n- Curing protection" }
          ],
          keyTakeaways: ['Shallow foundations for good soils', 'Deep foundations for poor soils or heavy loads', 'Bearing capacity determines footing size', 'Pile capacity = end bearing + friction'],
          quiz: { questions: [
            { id: 'q1', question: 'Mat foundation is used for:', options: ['Light loads', 'Poor soils/heavy loads', 'Rock', 'Temporary structures'], correctAnswer: 1, explanation: 'Mat foundations spread load over entire area for poor soils or heavy loads.' },
            { id: 'q2', question: 'Pile capacity comes from:', options: ['End bearing only', 'Skin friction only', 'End bearing + skin friction', 'Pile weight'], correctAnswer: 2, explanation: 'Pile capacity = end bearing (tip) + skin friction (sides).' },
            { id: 'q3', question: 'Typical soil bearing capacity:', options: ['100-500 psf', '2,000-4,000 psf', '10,000-20,000 psf', '50,000+ psf'], correctAnswer: 1, explanation: 'Typical allowable soil bearing is 2,000-4,000 psf for common soils.' }
          ]}
        },
        {
          id: 'concrete-construction',
          title: 'Concrete Construction',
          duration: '25 min', xp: 150,
          description: 'Placing and finishing concrete',
          introduction: 'Proper concrete construction techniques ensure structural integrity and durability.',
          sections: [
            { title: 'Formwork', content: "**Purpose:**\n- Shape concrete\n- Support until cured\n- Provide finish surface\n\n**Materials:**\n- Plywood (most common)\n- Steel (reusable)\n- Aluminum (lightweight)\n- Fiberglass (special shapes)\n\n**Design Considerations:**\n- Concrete pressure (150 pcf × depth)\n- Rate of placement\n- Temperature\n- Vibration loads\n\n**Stripping Time:**\n- Walls: 12-24 hours\n- Slabs: 3-7 days\n- Beams: 7-14 days" },
            { title: 'Reinforcement', content: "**Rebar Sizes:**\n#3 = 3/8\", #4 = 1/2\", #5 = 5/8\"...\n#8 = 1\", #11 = 1-3/8\"\n\n**Placement:**\n- Chairs/spacers for cover\n- Tie wire at intersections\n- Lap splices (40-60 bar diameters)\n\n**Cover Requirements:**\n- Slabs on ground: 3\"\n- Exposed to weather: 1.5-2\"\n- Interior: 3/4-1.5\"\n\n**Inspection:**\n- Before concrete placement\n- Verify size, spacing, cover" },
            { title: 'Placement & Curing', content: "**Placement:**\n- Don't drop > 5 feet\n- Place in layers\n- Consolidate with vibrators\n- Avoid segregation\n\n**Finishing:**\n- Screeding (leveling)\n- Floating (smoothing)\n- Troweling (hard finish)\n- Brooming (texture)\n\n**Curing:**\n- Keep moist 7+ days\n- Curing compounds\n- Wet burlap\n- Plastic sheeting\n\n**Cold/Hot Weather:**\n- Protect from freezing\n- Control temperature rise" }
          ],
          keyTakeaways: ['Formwork must resist concrete pressure', 'Cover protects reinforcement from corrosion', 'Consolidation removes air voids', 'Curing is critical for strength'],
          quiz: { questions: [
            { id: 'q1', question: '#5 rebar diameter:', options: ['3/8"', '1/2"', '5/8"', '1"'], correctAnswer: 2, explanation: '#5 rebar = 5/8" diameter (bar number × 1/8").' },
            { id: 'q2', question: 'Concrete should be cured for:', options: ['1 day', '3 days', '7+ days', '28 days'], correctAnswer: 2, explanation: 'Concrete should be kept moist for at least 7 days for proper curing.' },
            { id: 'q3', question: 'Vibrators are used to:', options: ['Speed curing', 'Remove air voids', 'Add air', 'Heat concrete'], correctAnswer: 1, explanation: 'Vibrators consolidate concrete by removing trapped air voids.' }
          ]}
        },
        {
          id: 'steel-construction',
          title: 'Steel Construction',
          duration: '25 min', xp: 150,
          description: 'Erecting structural steel',
          introduction: 'Steel construction involves fabrication, delivery, and erection of structural members.',
          sections: [
            { title: 'Fabrication', content: "**Shop Drawings:**\n- Detailed fabrication drawings\n- Connection details\n- Piece marks\n- Approved before fabrication\n\n**Fabrication Process:**\n- Cutting to length\n- Drilling/punching holes\n- Welding attachments\n- Surface preparation\n- Painting/coating\n\n**Quality Control:**\n- Material certifications\n- Weld inspection\n- Dimensional checks\n- AISC certification" },
            { title: 'Erection', content: "**Sequence:**\n1. Anchor bolt survey\n2. Column erection\n3. Beam placement\n4. Bracing installation\n5. Decking\n6. Final bolting\n\n**Equipment:**\n- Mobile cranes\n- Tower cranes\n- Forklifts\n- Man lifts\n\n**Safety:**\n- Fall protection\n- Perimeter cables\n- Decking/netting\n- Connector training" },
            { title: 'Field Connections', content: "**Bolting:**\n- Snug-tight: Wrench tight\n- Pretensioned: Specified tension\n- Slip-critical: Friction connection\n\n**Tensioning Methods:**\n- Turn-of-nut\n- Calibrated wrench\n- Tension-control bolts\n- Direct tension indicators\n\n**Field Welding:**\n- Weather protection\n- Preheat if required\n- Qualified welders\n- Inspection (visual, UT, MT)\n\n**Tolerances:**\n- Column plumb: 1:500\n- Beam elevation: ±3/4\"" }
          ],
          keyTakeaways: ['Shop drawings approved before fabrication', 'Erection sequence is critical', 'Pretensioned bolts for important connections', 'Field welds need weather protection'],
          quiz: { questions: [
            { id: 'q1', question: 'Shop drawings are:', options: ['Architectural plans', 'Detailed fabrication drawings', 'Site plans', 'Electrical drawings'], correctAnswer: 1, explanation: 'Shop drawings show detailed fabrication information for each piece.' },
            { id: 'q2', question: 'Slip-critical connection relies on:', options: ['Bolt shear', 'Friction', 'Bearing', 'Weld'], correctAnswer: 1, explanation: 'Slip-critical connections rely on friction between faying surfaces.' },
            { id: 'q3', question: 'Column plumb tolerance:', options: ['1:100', '1:500', '1:1000', 'Exact'], correctAnswer: 1, explanation: 'Typical column plumb tolerance is 1:500 (about 1/4" per 10 feet).' }
          ]}
        }
      ]
    }
  ]
};

export default section2Materials;
