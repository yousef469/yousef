// Section 3: Structural Engineering - 6 Lessons (2 units × 3 lessons)

export const section3Structural = {
  id: 'structural',
  title: 'Section 3: Structural Engineering',
  description: 'Analysis and design of structures',
  icon: '🏗️',
  color: 'from-blue-500 to-indigo-500',
  units: [
    {
      id: 'structural-analysis',
      title: 'Structural Analysis',
      description: 'Understanding how structures behave',
      lessons: [
        {
          id: 'loads-analysis',
          title: 'Structural Loads',
          duration: '30 min', xp: 175,
          description: 'Types of loads on structures',
          introduction: 'Structures must resist various loads throughout their lifetime. Understanding load types is fundamental to structural design.',
          sections: [
            { title: 'Dead & Live Loads', content: "**Dead Loads (D):**\nPermanent, stationary\n- Structure self-weight\n- Finishes, MEP\n- Fixed equipment\n\n**Typical Dead Loads:**\n- Concrete: 150 pcf\n- Steel: 490 pcf\n- Wood: 35 pcf\n- Roofing: 5-15 psf\n\n**Live Loads (L):**\nVariable, movable\n- People, furniture\n- Movable equipment\n\n**Typical Live Loads:**\n- Residential: 40 psf\n- Office: 50 psf\n- Assembly: 100 psf\n- Storage: 125-250 psf" },
            { title: 'Environmental Loads', content: "**Wind Load (W):**\n- Based on wind speed\n- Building height and shape\n- Exposure category\n- ASCE 7 procedures\n\n**Snow Load (S):**\n- Ground snow load\n- Roof slope factor\n- Exposure factor\n- Drift loads at changes\n\n**Seismic Load (E):**\n- Site seismicity\n- Soil type\n- Building period\n- Ductility factor\n\n**Rain Load (R):**\n- Ponding on flat roofs\n- Blocked drains scenario" },
            { title: 'Load Combinations', content: "**LRFD (Strength Design):**\n1.4D\n1.2D + 1.6L\n1.2D + 1.6L + 0.5S\n1.2D + 1.0W + L + 0.5S\n1.2D + 1.0E + L + 0.2S\n0.9D + 1.0W\n0.9D + 1.0E\n\n**ASD (Allowable Stress):**\nD + L\nD + L + S\nD + L + W\n0.6D + W\n\n**Factored vs Service:**\n- LRFD uses factored loads\n- ASD uses service loads\n- Both achieve similar safety" }
          ],
          keyTakeaways: ['Dead loads are permanent, live loads vary', 'Environmental loads from wind, snow, seismic', 'Load combinations ensure safety', 'LRFD uses load factors'],
          quiz: { questions: [
            { id: 'q1', question: 'Typical office live load:', options: ['20 psf', '50 psf', '100 psf', '200 psf'], correctAnswer: 1, explanation: 'Office buildings typically use 50 psf live load.' },
            { id: 'q2', question: 'Concrete unit weight:', options: ['35 pcf', '100 pcf', '150 pcf', '490 pcf'], correctAnswer: 2, explanation: 'Normal weight concrete is approximately 150 pcf.' },
            { id: 'q3', question: 'LRFD uses:', options: ['Service loads', 'Factored loads', 'Reduced loads', 'No factors'], correctAnswer: 1, explanation: 'LRFD (Load and Resistance Factor Design) uses factored loads.' }
          ]}
        },
        {
          id: 'beam-analysis',
          title: 'Beam Analysis',
          duration: '30 min', xp: 175,
          description: 'Shear and moment diagrams',
          introduction: 'Beams are fundamental structural elements. Understanding internal forces is essential for design.',
          sections: [
            { title: 'Support Reactions', content: "**Support Types:**\n- Pin: Vertical + Horizontal reaction\n- Roller: Vertical reaction only\n- Fixed: V + H + Moment\n\n**Equilibrium:**\nΣFx = 0\nΣFy = 0\nΣM = 0\n\n**Simply Supported Beam:**\nUniform load w:\n- R = wL/2 at each support\n\nPoint load P at center:\n- R = P/2 at each support" },
            { title: 'Shear Diagrams', content: "**Shear Force (V):**\nInternal force perpendicular to beam\n\n**Rules:**\n- Point load: Jump in diagram\n- Uniform load: Linear slope\n- V = dM/dx (slope of moment)\n\n**Simply Supported, Uniform Load:**\n- V = wL/2 at supports\n- V = 0 at center\n- Linear variation\n\n**Maximum Shear:**\nUsually at supports" },
            { title: 'Moment Diagrams', content: "**Bending Moment (M):**\nInternal moment causing bending\n\n**Rules:**\n- Point load: Linear change\n- Uniform load: Parabolic curve\n- M = ∫V dx (area under shear)\n\n**Simply Supported, Uniform Load:**\n**Mmax = wL²/8** (at center)\n\n**Point Load at Center:**\n**Mmax = PL/4** (at center)\n\n**Cantilever, Point Load at End:**\n**Mmax = PL** (at support)" }
          ],
          keyTakeaways: ['Pin supports resist V and H', 'Shear is slope of moment diagram', 'Mmax = wL²/8 for uniform load', 'Maximum moment usually at zero shear'],
          quiz: { questions: [
            { id: 'q1', question: 'Simply supported beam, uniform load, Mmax:', options: ['wL/2', 'wL²/8', 'wL²/2', 'PL/4'], correctAnswer: 1, explanation: 'Maximum moment for uniform load on simple span: Mmax = wL²/8.' },
            { id: 'q2', question: 'Roller support provides:', options: ['V only', 'H only', 'V + H', 'V + H + M'], correctAnswer: 0, explanation: 'Roller support provides only vertical reaction (can roll horizontally).' },
            { id: 'q3', question: 'Under uniform load, moment diagram is:', options: ['Linear', 'Parabolic', 'Constant', 'Cubic'], correctAnswer: 1, explanation: 'Uniform load produces parabolic moment diagram.' }
          ]}
        },
        {
          id: 'deflection',
          title: 'Deflection & Serviceability',
          duration: '25 min', xp: 150,
          description: 'Controlling structural movement',
          introduction: 'Structures must not only be strong but also stiff enough to limit deflections for serviceability.',
          sections: [
            { title: 'Deflection Formulas', content: "**Simply Supported, Uniform Load:**\n**δmax = 5wL⁴/(384EI)**\n\n**Simply Supported, Point Load Center:**\n**δmax = PL³/(48EI)**\n\n**Cantilever, Point Load End:**\n**δmax = PL³/(3EI)**\n\n**Cantilever, Uniform Load:**\n**δmax = wL⁴/(8EI)**\n\n**Variables:**\n- E = Modulus of elasticity\n- I = Moment of inertia\n- L = Span length" },
            { title: 'Deflection Limits', content: "**Floor Beams:**\n- L/360 for live load\n- L/240 for total load\n\n**Roof Beams:**\n- L/180 for live load\n- L/120 for total load\n\n**Cantilevers:**\n- L/180 to L/120\n\n**Example:**\n20 ft span = 240 inches\nL/360 = 240/360 = 0.67 inches max\n\n**Why Limits?**\n- Prevent cracking\n- Occupant comfort\n- Equipment function" },
            { title: 'Moment of Inertia', content: "**Definition:**\nResistance to bending\nI = ∫y²dA\n\n**Rectangle:**\nI = bh³/12\n\n**Circle:**\nI = πd⁴/64\n\n**Parallel Axis Theorem:**\nI = Io + Ad²\n\n**Section Modulus:**\nS = I/c\nc = distance to extreme fiber\n\n**Increasing Stiffness:**\n- Deeper section (h³ effect)\n- Higher E material\n- Shorter span" }
          ],
          keyTakeaways: ['Deflection ∝ L⁴ for uniform loads', 'L/360 typical floor live load limit', 'Moment of inertia I = bh³/12 for rectangle', 'Deeper sections much stiffer (h³)'],
          quiz: { questions: [
            { id: 'q1', question: 'Floor beam live load deflection limit:', options: ['L/120', 'L/180', 'L/240', 'L/360'], correctAnswer: 3, explanation: 'L/360 is typical live load deflection limit for floor beams.' },
            { id: 'q2', question: 'Rectangle moment of inertia:', options: ['bh/12', 'bh²/12', 'bh³/12', 'bh⁴/12'], correctAnswer: 2, explanation: 'Rectangle I = bh³/12 (width × height cubed / 12).' },
            { id: 'q3', question: 'Doubling beam depth increases I by:', options: ['2×', '4×', '8×', '16×'], correctAnswer: 2, explanation: 'I ∝ h³, so doubling h increases I by 2³ = 8 times.' }
          ]}
        }
      ]
    },
    {
      id: 'structural-design',
      title: 'Structural Design',
      description: 'Designing structural members',
      lessons: [
        {
          id: 'beam-design',
          title: 'Beam Design',
          duration: '30 min', xp: 175,
          description: 'Designing beams for strength',
          introduction: 'Beam design ensures members can safely resist applied loads without failure.',
          sections: [
            { title: 'Flexural Design', content: "**Bending Stress:**\n**fb = M/S = Mc/I**\n\n**Design Requirement:**\nfb ≤ Fb (allowable)\nor\nMu ≤ φMn (LRFD)\n\n**Steel Beam:**\nMn = Fy × Z (plastic)\nMn = Fy × S (elastic)\nφ = 0.90\n\n**Concrete Beam:**\nMn = As × fy × (d - a/2)\na = As×fy/(0.85×f'c×b)\nφ = 0.90" },
            { title: 'Shear Design', content: "**Shear Stress:**\n**fv = VQ/(Ib)** (general)\n**fv = V/Aw** (steel web)\n\n**Steel Beam:**\nVn = 0.6 × Fy × Aw\nφ = 1.00\n\n**Concrete Beam:**\nVc = 2√f'c × b × d\nVs = Av × fy × d / s\nφ = 0.75\n\n**Stirrup Spacing:**\nMaximum s = d/2\nCloser near supports" },
            { title: 'Beam Selection', content: "**Steel Beam Selection:**\n1. Calculate Mu from loads\n2. Required Zx = Mu/(φFy)\n3. Select beam from tables\n4. Check shear\n5. Check deflection\n\n**Concrete Beam Sizing:**\n- Depth ≈ L/16 to L/12\n- Width ≈ 0.5 × depth\n- Cover: 1.5\" typical\n\n**Efficiency:**\n- Deeper = more efficient\n- Compact sections preferred\n- Consider lateral bracing" }
          ],
          keyTakeaways: ['fb = M/S for bending stress', 'Steel Mn = Fy × Z for plastic moment', 'Concrete needs stirrups for shear', 'Deeper beams more efficient'],
          quiz: { questions: [
            { id: 'q1', question: 'Bending stress formula:', options: ['M×S', 'M/S', 'M+S', 'M-S'], correctAnswer: 1, explanation: 'Bending stress fb = M/S (moment / section modulus).' },
            { id: 'q2', question: 'Steel flexure φ factor:', options: ['0.75', '0.85', '0.90', '1.00'], correctAnswer: 2, explanation: 'LRFD φ = 0.90 for steel flexure.' },
            { id: 'q3', question: 'Concrete beam depth rule of thumb:', options: ['L/4', 'L/8', 'L/16', 'L/32'], correctAnswer: 2, explanation: 'Concrete beam depth typically L/16 to L/12 of span.' }
          ]}
        },
        {
          id: 'column-design',
          title: 'Column Design',
          duration: '25 min', xp: 150,
          description: 'Designing compression members',
          introduction: 'Columns carry vertical loads and must resist buckling as well as crushing.',
          sections: [
            { title: 'Column Behavior', content: "**Short Columns:**\nFail by crushing\nStrength = Fy × A\n\n**Long Columns:**\nFail by buckling\nStrength < Fy × A\n\n**Slenderness Ratio:**\n**KL/r**\n- K = effective length factor\n- L = unbraced length\n- r = radius of gyration\n\n**Effective Length (K):**\n- Pinned-pinned: K = 1.0\n- Fixed-fixed: K = 0.5\n- Fixed-pinned: K = 0.7\n- Fixed-free: K = 2.0" },
            { title: 'Steel Column Design', content: "**Critical Stress:**\nFor KL/r ≤ 4.71√(E/Fy):\nFcr = [0.658^(Fy/Fe)] × Fy\n\nFor KL/r > 4.71√(E/Fy):\nFcr = 0.877 × Fe\n\n**Euler Buckling:**\nFe = π²E/(KL/r)²\n\n**Design Strength:**\nφPn = φ × Fcr × Ag\nφ = 0.90\n\n**Column Tables:**\nAISC provides φPn directly" },
            { title: 'Concrete Column Design', content: "**Tied Columns:**\nφPn = 0.80φ[0.85f'c(Ag-Ast) + fyAst]\nφ = 0.65\n\n**Spiral Columns:**\nφPn = 0.85φ[0.85f'c(Ag-Ast) + fyAst]\nφ = 0.75\n\n**Minimum Steel:**\n1% ≤ ρ ≤ 8%\nTypical: 1-3%\n\n**Tie Spacing:**\n- 16 × bar diameter\n- 48 × tie diameter\n- Least column dimension" }
          ],
          keyTakeaways: ['Slenderness KL/r determines buckling', 'K depends on end conditions', 'Long columns fail by buckling', 'Concrete columns need minimum 1% steel'],
          quiz: { questions: [
            { id: 'q1', question: 'Fixed-fixed column K factor:', options: ['0.5', '0.7', '1.0', '2.0'], correctAnswer: 0, explanation: 'Fixed-fixed end conditions give K = 0.5 (most restrained).' },
            { id: 'q2', question: 'Long columns fail by:', options: ['Crushing', 'Buckling', 'Shear', 'Torsion'], correctAnswer: 1, explanation: 'Long (slender) columns fail by buckling before crushing.' },
            { id: 'q3', question: 'Concrete column minimum steel:', options: ['0.5%', '1%', '4%', '8%'], correctAnswer: 1, explanation: 'Minimum longitudinal steel in concrete columns is 1%.' }
          ]}
        },
        {
          id: 'connections',
          title: 'Structural Connections',
          duration: '25 min', xp: 150,
          description: 'Joining structural members',
          introduction: 'Connections transfer forces between members. Their design is critical for structural integrity.',
          sections: [
            { title: 'Bolted Connections', content: "**Bolt Strength:**\n- Shear: Fv × Ab\n- Tension: Ft × Ab\n- Bearing: 2.4Fu × d × t\n\n**Bolt Grades:**\n- A325: Fv = 54 ksi (threads excluded)\n- A490: Fv = 68 ksi\n\n**Spacing Requirements:**\n- Minimum: 2⅔ × d\n- Preferred: 3 × d\n- Edge distance: 1.5 × d minimum\n\n**Slip-Critical:**\nFriction connection\nNo slip under service loads" },
            { title: 'Welded Connections', content: "**Fillet Welds:**\n- Most common type\n- Throat = 0.707 × leg size\n- Strength: 0.6 × FEXX × throat\n\n**Weld Sizes:**\n- Minimum based on thicker plate\n- Maximum = plate thickness - 1/16\"\n\n**E70XX Electrodes:**\nFEXX = 70 ksi\nφ = 0.75\n\n**Weld Length:**\nMinimum 4 × weld size\nReturns at corners" },
            { title: 'Connection Types', content: "**Simple Connections:**\n- Transfer shear only\n- Allow rotation\n- Single plate, angles\n\n**Moment Connections:**\n- Transfer shear + moment\n- Rigid (no rotation)\n- Flange plates, direct weld\n\n**Bracing Connections:**\n- Gusset plates\n- Work point at centroid\n- Whitmore section for capacity\n\n**Base Plates:**\n- Distribute column load\n- Anchor bolts for uplift/moment" }
          ],
          keyTakeaways: ['Bolt shear strength depends on grade', 'Fillet weld throat = 0.707 × leg', 'Simple connections allow rotation', 'Moment connections are rigid'],
          quiz: { questions: [
            { id: 'q1', question: 'Fillet weld throat size:', options: ['Leg size', '0.5 × leg', '0.707 × leg', '2 × leg'], correctAnswer: 2, explanation: 'Fillet weld effective throat = 0.707 × leg size (45° triangle).' },
            { id: 'q2', question: 'Simple connection transfers:', options: ['Moment only', 'Shear only', 'Shear + moment', 'Axial only'], correctAnswer: 1, explanation: 'Simple (shear) connections transfer shear and allow rotation.' },
            { id: 'q3', question: 'Minimum bolt spacing:', options: ['1 × d', '2⅔ × d', '5 × d', '10 × d'], correctAnswer: 1, explanation: 'Minimum bolt spacing is 2⅔ times bolt diameter.' }
          ]}
        }
      ]
    }
  ]
};

export default section3Structural;
