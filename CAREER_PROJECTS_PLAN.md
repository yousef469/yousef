# 🚀 Career Projects Implementation Plan

## Overview
Interactive, portfolio-worthy engineering projects that teach real-world skills.

---

## 🎯 Project Structure (Standard Template)

Every project follows this structure:

### 1. Project Page Layout
```
┌─────────────────────────────────────┐
│  Project Title + Difficulty Badge   │
│  "Used in: Aerospace Engineering"   │
├─────────────────────────────────────┤
│  📚 Intro Lesson (Collapsible)      │
│  - Why it matters                   │
│  - Real-world examples              │
│  - Learning objectives              │
├─────────────────────────────────────┤
│  🎮 Interactive Controls (Left)     │
│  - Sliders                          │
│  - Input fields                     │
│  - Switches/toggles                 │
│                                     │
│  📊 Live Simulation (Right)         │
│  - 3D Model                         │
│  - Graphs                           │
│  - Output values                    │
├─────────────────────────────────────┤
│  🤖 AI Tutor Insights               │
│  - Real-time explanations           │
│  - "Why this matters"               │
│  - Optimization tips                │
├─────────────────────────────────────┤
│  📄 Generate Report Button          │
│  - AI-generated summary             │
│  - Score + improvements             │
│  - Download PDF                     │
└─────────────────────────────────────┘
```

---

## 📋 12 Projects - Implementation Priority

### Phase 1: Foundation (3 Projects) ✅ START HERE
1. **Rocket Engine Nozzle** - Medium
2. **Solar Panel System** - Easy
3. **Robotic Arm (3 Joints)** - Medium

### Phase 2: Automotive (3 Projects)
4. **Car Transmission System** - Medium
5. **Electric Car System** - Medium
6. **Suspension System** - Medium

### Phase 3: Aviation (3 Projects)
7. **Aircraft Wing Design** - Hard
8. **Drone (Quadcopter)** - Medium
9. **Aircraft Stability** - Hard

### Phase 4: Advanced (3 Projects)
10. **Rocket Stage Separation** - Medium
11. **Jet Engine** - Advanced
12. **Robotics AI Vision** - Medium

---

## 🛠️ Technical Implementation

### Database Schema (Supabase)
```sql
-- Career Projects Table
CREATE TABLE career_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  project_type TEXT NOT NULL, -- 'rocket_nozzle', 'solar_panel', etc.
  project_data JSONB NOT NULL, -- All slider values, choices
  score INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Project Reports Table
CREATE TABLE project_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES career_projects(id),
  user_id UUID REFERENCES auth.users(id),
  report_content TEXT, -- AI-generated report
  pdf_url TEXT, -- Link to generated PDF
  created_at TIMESTAMP DEFAULT NOW()
);
```

### File Structure
```
src/
├── pages/
│   ├── CareerProjectsPage.jsx          # Main projects gallery
│   └── projects/
│       ├── RocketNozzleProject.jsx
│       ├── SolarPanelProject.jsx
│       ├── RoboticArmProject.jsx
│       └── ... (more projects)
├── components/
│   └── projects/
│       ├── ProjectTemplate.jsx         # Reusable layout
│       ├── ProjectControls.jsx         # Slider/input panel
│       ├── ProjectSimulation.jsx       # 3D + graphs
│       ├── ProjectIntro.jsx            # Intro lesson
│       ├── AIInsights.jsx              # AI explanations
│       └── ReportGenerator.jsx         # PDF generation
├── data/
│   └── careerProjects.js               # Project metadata
└── services/
    ├── projectService.js               # Save/load projects
    └── reportGenerator.js              # AI report + PDF
```

---

## 🎨 UI Components

### 1. Project Card (Gallery View)
```jsx
<ProjectCard
  title="Rocket Engine Nozzle"
  difficulty="Medium"
  category="Aerospace"
  icon="🚀"
  description="Design and optimize a rocket nozzle"
  progress={65} // If user started
  locked={false}
/>
```

### 2. Project Controls Panel
```jsx
<ProjectControls>
  <Slider
    label="Throat Diameter"
    min={10}
    max={100}
    value={throatDiameter}
    onChange={setThroatDiameter}
    unit="mm"
  />
  <Slider
    label="Expansion Ratio"
    min={1}
    max={20}
    value={expansionRatio}
    onChange={setExpansionRatio}
  />
</ProjectControls>
```

### 3. Live Simulation Display
```jsx
<SimulationDisplay>
  <Canvas3D model={nozzleModel} />
  <OutputMetrics>
    <Metric label="Thrust" value={thrust} unit="N" />
    <Metric label="Efficiency" value={efficiency} unit="%" />
  </OutputMetrics>
  <Graph data={thrustVsRatio} />
</SimulationDisplay>
```

### 4. AI Insights Panel
```jsx
<AIInsights>
  <Insight type="explanation">
    "Increasing the expansion ratio improves efficiency 
    because the exhaust gases expand more completely..."
  </Insight>
  <Insight type="warning">
    "Your nozzle is approaching the optimal ratio for 
    sea-level operation."
  </Insight>
</AIInsights>
```

---

## 📊 Project #1: Rocket Engine Nozzle (Detailed Spec)

### Learning Objectives
- Understand nozzle geometry
- Learn thrust equation
- Optimize expansion ratio
- Real-world application (Falcon 9)

### Interactive Controls
1. **Throat Diameter** (10-100mm)
2. **Expansion Ratio** (1-20)
3. **Chamber Pressure** (10-100 bar)
4. **Fuel Type** (RP-1, LH2, Methane)

### Calculations
```javascript
// Thrust calculation (simplified)
const thrust = chamberPressure * throatArea * expansionRatio * efficiency;

// Efficiency based on expansion ratio
const efficiency = calculateEfficiency(expansionRatio, altitude);

// Specific impulse
const isp = calculateIsp(fuelType, expansionRatio);
```

### 3D Model
- Parametric nozzle that updates in real-time
- Color-coded for temperature/pressure
- Cutaway view option

### Graphs
1. **Thrust vs Expansion Ratio**
2. **Efficiency vs Altitude**
3. **Temperature Distribution**

### AI Insights
- Explains why changes affect performance
- Suggests optimal values
- Compares to real rockets (Falcon 9, Starship)

### Report Generation
```
ROCKET NOZZLE DESIGN REPORT
Student: [Name]
Date: [Date]

DESIGN PARAMETERS:
- Throat Diameter: 45mm
- Expansion Ratio: 12.5
- Chamber Pressure: 60 bar
- Fuel: RP-1

PERFORMANCE:
- Thrust: 2,450 N
- Specific Impulse: 285s
- Efficiency: 87%

ANALYSIS:
Your design shows good optimization for sea-level 
operation. The expansion ratio of 12.5 is close to 
optimal for atmospheric flight...

IMPROVEMENTS:
1. Consider increasing chamber pressure to 70 bar
2. For vacuum operation, increase expansion ratio to 18

SCORE: 85/100
```

---

## 🎯 Implementation Phases

### Week 1: Foundation
- [ ] Create CareerProjectsPage
- [ ] Build ProjectTemplate component
- [ ] Set up database schema
- [ ] Create project service

### Week 2: First Project
- [ ] Implement Rocket Nozzle project
- [ ] Add 3D nozzle model
- [ ] Create calculation engine
- [ ] Add AI insights

### Week 3: Report System
- [ ] Build report generator
- [ ] Integrate AI for report writing
- [ ] Add PDF export
- [ ] Create portfolio page

### Week 4: More Projects
- [ ] Solar Panel System
- [ ] Robotic Arm
- [ ] Polish and test

---

## 🚀 Quick Start Implementation

I'll create:
1. Career Projects gallery page
2. Project template component
3. First project: Rocket Nozzle (simplified)
4. Database schema

Ready to start building?
