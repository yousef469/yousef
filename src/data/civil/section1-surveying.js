// Section 1: Surveying & Site Planning - 6 Lessons (2 units × 3 lessons)

export const section1Surveying = {
  id: 'surveying',
  title: 'Section 1: Surveying & Site Planning',
  description: 'Land measurement and site development',
  icon: '🗺️',
  color: 'from-green-500 to-teal-500',
  units: [
    {
      id: 'surveying-basics',
      title: 'Surveying Fundamentals',
      description: 'Measuring and mapping land',
      lessons: [
        {
          id: 'surveying-intro',
          title: 'Introduction to Surveying',
          duration: '25 min', xp: 150,
          description: 'Basic surveying concepts and equipment',
          introduction: 'Surveying is the science of measuring land. It provides the foundation for all construction projects.',
          sections: [
            { title: 'Surveying Basics', content: "**Purpose:**\n- Establish property boundaries\n- Create topographic maps\n- Set construction layout\n- Monitor movement/settlement\n\n**Types of Surveys:**\n- Boundary: Property lines\n- Topographic: Elevation contours\n- Construction: Building layout\n- As-built: Final documentation\n\n**Coordinate Systems:**\n- Local (site-specific)\n- State Plane (US)\n- UTM (Universal Transverse Mercator)\n- Latitude/Longitude" },
            { title: 'Surveying Equipment', content: "**Total Station:**\n- Measures angles and distances\n- Electronic distance measurement (EDM)\n- Accuracy: ±2mm + 2ppm\n\n**GPS/GNSS:**\n- Satellite positioning\n- RTK for cm accuracy\n- Works anywhere with sky view\n\n**Level:**\n- Establishes horizontal plane\n- Measures elevation differences\n- Auto-level or digital\n\n**Measuring Tools:**\n- Steel tape\n- Prism/reflector\n- Range pole" },
            { title: 'Measurement Concepts', content: "**Horizontal Distance:**\nDistance on level plane\nSlope distance × cos(angle)\n\n**Vertical Distance:**\nElevation difference\nSlope distance × sin(angle)\n\n**Bearings:**\nDirection from North or South\nN 45° E = Northeast at 45°\n\n**Azimuths:**\nClockwise angle from North\n0° to 360°\n\n**Benchmark:**\nKnown elevation reference point" }
          ],
          keyTakeaways: ['Total stations measure angles and distances', 'GPS provides global positioning', 'Bearings reference North or South', 'Benchmarks establish elevation reference'],
          quiz: { questions: [
            { id: 'q1', question: 'Total station measures:', options: ['Only angles', 'Only distances', 'Angles and distances', 'Only elevation'], correctAnswer: 2, explanation: 'Total stations measure both angles and distances electronically.' },
            { id: 'q2', question: 'RTK GPS accuracy:', options: ['10 meters', '1 meter', 'Centimeters', 'Millimeters'], correctAnswer: 2, explanation: 'RTK (Real-Time Kinematic) GPS achieves centimeter-level accuracy.' },
            { id: 'q3', question: 'Azimuth is measured:', options: ['From East', 'Clockwise from North', 'From South', 'Counterclockwise'], correctAnswer: 1, explanation: 'Azimuth is the clockwise angle from North (0° to 360°).' }
          ]}
        },
        {
          id: 'leveling',
          title: 'Leveling & Elevation',
          duration: '30 min', xp: 175,
          description: 'Determining elevations and grades',
          introduction: 'Leveling determines elevation differences, essential for drainage, foundations, and earthwork.',
          sections: [
            { title: 'Differential Leveling', content: "**Process:**\n1. Set up level between points\n2. Read backsight (BS) on known point\n3. Calculate Height of Instrument (HI)\n4. Read foresight (FS) on unknown point\n5. Calculate new elevation\n\n**Formulas:**\nHI = Known Elev + BS\nNew Elev = HI - FS\n\n**Example:**\nBenchmark = 100.00 m\nBS = 1.52 m → HI = 101.52 m\nFS = 2.31 m → Elev = 99.21 m" },
            { title: 'Profile Leveling', content: "**Purpose:**\nDetermine elevations along a line\nUsed for roads, pipes, channels\n\n**Procedure:**\n1. Establish baseline\n2. Set stations at intervals\n3. Level to each station\n4. Record elevations\n5. Plot profile\n\n**Profile Drawing:**\n- Horizontal: Station numbers\n- Vertical: Elevations\n- Vertical exaggeration common (10:1)\n\n**Grade Line:**\nDesired slope for construction" },
            { title: 'Contour Maps', content: "**Contours:**\nLines connecting equal elevation\n\n**Contour Interval:**\nElevation difference between lines\n- Flat terrain: 1-2 ft\n- Hilly: 5-10 ft\n- Mountainous: 20-50 ft\n\n**Contour Rules:**\n- Never cross (except overhangs)\n- Close on themselves\n- Perpendicular to max slope\n- V upstream in valleys\n\n**Interpolation:**\nEstimate elevations between contours" }
          ],
          keyTakeaways: ['HI = Known elevation + Backsight', 'New elevation = HI - Foresight', 'Contours connect equal elevations', 'Contour interval depends on terrain'],
          quiz: { questions: [
            { id: 'q1', question: 'Height of Instrument equals:', options: ['BS - FS', 'Known Elev + BS', 'Known Elev - BS', 'FS + BS'], correctAnswer: 1, explanation: 'HI = Known Elevation + Backsight reading.' },
            { id: 'q2', question: 'Contour lines:', options: ['Can cross', 'Never cross', 'Always straight', 'Random'], correctAnswer: 1, explanation: 'Contour lines never cross (except for overhangs/caves).' },
            { id: 'q3', question: 'Vertical exaggeration in profiles:', options: ['Never used', 'Always 1:1', 'Common (e.g., 10:1)', 'Illegal'], correctAnswer: 2, explanation: 'Vertical exaggeration (like 10:1) makes elevation changes visible.' }
          ]}
        },
        {
          id: 'construction-layout',
          title: 'Construction Layout',
          duration: '25 min', xp: 150,
          description: 'Setting out buildings and structures',
          introduction: 'Construction layout transfers design drawings to the actual site, establishing building positions and elevations.',
          sections: [
            { title: 'Building Layout', content: "**Control Points:**\nEstablish reference network\nProtect from construction activity\n\n**Baseline:**\nPrimary reference line\nUsually along building edge\n\n**Offset Stakes:**\nSet back from actual position\nProtected during excavation\n\n**Batter Boards:**\n- Horizontal boards on posts\n- String lines mark walls\n- Set at specific elevation\n- Allow excavation below" },
            { title: 'Horizontal Control', content: "**Methods:**\n- Tape and offset\n- Total station\n- GPS/GNSS\n\n**Right Angles:**\n3-4-5 triangle method\n3² + 4² = 5² (9 + 16 = 25)\n\n**Curve Layout:**\n- Deflection angles\n- Chord lengths\n- Offset from tangent\n\n**Accuracy Requirements:**\n- Buildings: ±10mm\n- Bridges: ±5mm\n- Machinery: ±1mm" },
            { title: 'Vertical Control', content: "**Grade Stakes:**\nShow cut or fill amount\nBlue top = finished grade\n\n**Slope Stakes:**\nMark edge of earthwork\nShow slope ratio (2:1, 3:1)\n\n**Laser Levels:**\n- Rotating laser\n- Detector on rod\n- Constant elevation reference\n\n**Grade Checking:**\nVerify during construction\nDocument as-built elevations" }
          ],
          keyTakeaways: ['Batter boards protect layout during excavation', '3-4-5 triangle creates right angles', 'Offset stakes protect reference points', 'Laser levels provide constant elevation'],
          quiz: { questions: [
            { id: 'q1', question: '3-4-5 triangle creates:', options: ['45° angle', '60° angle', '90° angle', '30° angle'], correctAnswer: 2, explanation: '3-4-5 triangle (Pythagorean) creates a perfect 90° angle.' },
            { id: 'q2', question: 'Batter boards are set:', options: ['At ground level', 'At specific elevation', 'Underground', 'On the roof'], correctAnswer: 1, explanation: 'Batter boards are set at a specific elevation for reference.' },
            { id: 'q3', question: 'Blue top stake means:', options: ['Cut required', 'Fill required', 'Finished grade', 'Property corner'], correctAnswer: 2, explanation: 'Blue top indicates the stake is at finished grade elevation.' }
          ]}
        }
      ]
    },
    {
      id: 'site-planning',
      title: 'Site Planning & Development',
      description: 'Planning construction sites',
      lessons: [
        {
          id: 'site-analysis',
          title: 'Site Analysis',
          duration: '25 min', xp: 150,
          description: 'Evaluating sites for development',
          introduction: 'Site analysis evaluates land characteristics to determine suitability for development and identify constraints.',
          sections: [
            { title: 'Physical Analysis', content: "**Topography:**\n- Slope analysis\n- Drainage patterns\n- Buildable areas\n- View corridors\n\n**Soils:**\n- Bearing capacity\n- Drainage characteristics\n- Shrink/swell potential\n- Contamination\n\n**Hydrology:**\n- Flood zones\n- Wetlands\n- Water table depth\n- Stormwater flow\n\n**Vegetation:**\n- Trees to preserve\n- Clearing required\n- Erosion potential" },
            { title: 'Regulatory Analysis', content: "**Zoning:**\n- Permitted uses\n- Density limits\n- Height restrictions\n- Setback requirements\n\n**Building Codes:**\n- Occupancy type\n- Construction type\n- Fire separation\n- Accessibility\n\n**Environmental:**\n- Wetland buffers\n- Endangered species\n- Historic preservation\n- Environmental impact\n\n**Utilities:**\n- Water availability\n- Sewer capacity\n- Power/gas access\n- Telecom infrastructure" },
            { title: 'Site Constraints', content: "**Easements:**\n- Utility easements\n- Access easements\n- Drainage easements\n- Conservation easements\n\n**Setbacks:**\n- Front: Distance from street\n- Side: Distance from neighbors\n- Rear: Distance from back\n\n**Coverage Limits:**\n- Building coverage %\n- Impervious surface %\n- Open space requirements\n\n**Access:**\n- Road frontage\n- Sight distance\n- Turn lanes required" }
          ],
          keyTakeaways: ['Topography affects drainage and buildability', 'Zoning controls land use', 'Easements restrict building areas', 'Setbacks define building envelope'],
          quiz: { questions: [
            { id: 'q1', question: 'Zoning controls:', options: ['Building materials', 'Land use and density', 'Construction methods', 'Worker safety'], correctAnswer: 1, explanation: 'Zoning regulates permitted uses, density, height, and setbacks.' },
            { id: 'q2', question: 'Easement is:', options: ['Building permit', 'Right to use land', 'Property tax', 'Insurance'], correctAnswer: 1, explanation: 'An easement grants rights to use another\'s land for specific purposes.' },
            { id: 'q3', question: 'Impervious surface includes:', options: ['Grass', 'Trees', 'Pavement', 'Gardens'], correctAnswer: 2, explanation: 'Impervious surfaces (pavement, roofs) don\'t allow water infiltration.' }
          ]}
        },
        {
          id: 'grading-design',
          title: 'Grading & Earthwork',
          duration: '30 min', xp: 175,
          description: 'Shaping land for construction',
          introduction: 'Grading reshapes land to provide proper drainage, stable foundations, and usable spaces.',
          sections: [
            { title: 'Grading Principles', content: "**Objectives:**\n- Direct water away from buildings\n- Provide stable slopes\n- Minimize cut and fill\n- Create usable areas\n\n**Minimum Slopes:**\n- Away from buildings: 2% (1/4\"/ft)\n- Parking lots: 1-2%\n- Swales: 1-2%\n- Maximum grass: 3:1 (33%)\n\n**Drainage Patterns:**\n- Sheet flow\n- Swales (shallow channels)\n- Catch basins\n- Storm sewers" },
            { title: 'Cut and Fill', content: "**Cut:**\nExcavation - removing soil\nCreates level areas on slopes\n\n**Fill:**\nAdding soil to raise grade\nMust be compacted properly\n\n**Balance:**\nCut volume = Fill volume (ideal)\nMinimizes hauling costs\n\n**Calculations:**\n- Grid method\n- Cross-section method\n- Contour method\n\n**Shrink/Swell:**\n- Cut soil expands (swell)\n- Fill soil compacts (shrink)\n- Factor: 0.8-1.3 typical" },
            { title: 'Slope Stability', content: "**Slope Ratios:**\nHorizontal : Vertical\n- 2:1 = 50% = 26.5°\n- 3:1 = 33% = 18.4°\n- 4:1 = 25% = 14°\n\n**Factors Affecting Stability:**\n- Soil type\n- Water content\n- Vegetation\n- Surcharge loads\n\n**Retaining Walls:**\nNeeded when slopes too steep\nTypes: Gravity, cantilever, MSE\n\n**Erosion Control:**\n- Silt fence\n- Erosion blankets\n- Seeding/sodding\n- Riprap" }
          ],
          keyTakeaways: ['Grade away from buildings at 2% minimum', 'Balance cut and fill to minimize costs', 'Steeper slopes need retaining walls', 'Erosion control required during construction'],
          quiz: { questions: [
            { id: 'q1', question: 'Minimum slope away from buildings:', options: ['0.5%', '2%', '10%', '25%'], correctAnswer: 1, explanation: 'Minimum 2% slope (1/4" per foot) away from buildings for drainage.' },
            { id: 'q2', question: '3:1 slope equals:', options: ['3%', '33%', '300%', '0.33%'], correctAnswer: 1, explanation: '3:1 (3 horizontal to 1 vertical) = 1/3 = 33% slope.' },
            { id: 'q3', question: 'Balanced earthwork means:', options: ['Level site', 'Cut = Fill', 'No grading', 'Maximum cut'], correctAnswer: 1, explanation: 'Balanced earthwork: cut volume equals fill volume, minimizing hauling.' }
          ]}
        },
        {
          id: 'stormwater-management',
          title: 'Stormwater Management',
          duration: '25 min', xp: 150,
          description: 'Managing runoff from developed sites',
          introduction: 'Development increases runoff. Stormwater management protects downstream areas and water quality.',
          sections: [
            { title: 'Runoff Calculations', content: "**Rational Method:**\n**Q = C × i × A**\n- Q = Peak flow (cfs)\n- C = Runoff coefficient\n- i = Rainfall intensity (in/hr)\n- A = Area (acres)\n\n**Runoff Coefficients:**\n- Pavement: 0.90-0.95\n- Roofs: 0.85-0.95\n- Grass: 0.10-0.35\n- Forest: 0.05-0.25\n\n**Time of Concentration:**\nTime for water to travel from farthest point\nAffects rainfall intensity used" },
            { title: 'Detention & Retention', content: "**Detention:**\nTemporary storage\nSlowly releases water\nReduces peak flow\n\n**Retention:**\nPermanent storage\nWater infiltrates or evaporates\nNo outlet (or minimal)\n\n**Sizing:**\n- Match pre-development peak flow\n- Store difference in volume\n- Outlet controls release rate\n\n**Types:**\n- Ponds (wet or dry)\n- Underground tanks\n- Parking lot storage\n- Green roofs" },
            { title: 'Low Impact Development', content: "**LID Principles:**\n- Minimize impervious area\n- Disconnect impervious surfaces\n- Infiltrate where possible\n- Treat runoff naturally\n\n**LID Practices:**\n- Bioswales\n- Rain gardens\n- Permeable pavement\n- Green roofs\n- Cisterns\n\n**Benefits:**\n- Reduces runoff volume\n- Improves water quality\n- Recharges groundwater\n- Reduces infrastructure costs" }
          ],
          keyTakeaways: ['Q = C × i × A for peak flow', 'Detention reduces peak, retention reduces volume', 'LID minimizes development impact', 'Impervious surfaces increase runoff'],
          quiz: { questions: [
            { id: 'q1', question: 'Pavement runoff coefficient:', options: ['0.10', '0.50', '0.90', '1.50'], correctAnswer: 2, explanation: 'Pavement has high runoff coefficient (0.90-0.95) - most rain runs off.' },
            { id: 'q2', question: 'Detention basin:', options: ['Permanent pond', 'Temporary storage', 'Water treatment', 'Groundwater well'], correctAnswer: 1, explanation: 'Detention temporarily stores water and slowly releases it.' },
            { id: 'q3', question: 'LID stands for:', options: ['Large Infrastructure Design', 'Low Impact Development', 'Land Improvement District', 'Linear Infiltration Drain'], correctAnswer: 1, explanation: 'LID = Low Impact Development, minimizing development effects.' }
          ]}
        }
      ]
    }
  ]
};

export default section1Surveying;
