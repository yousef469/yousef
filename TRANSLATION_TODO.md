# HomePage Translation Update Guide

Replace these hardcoded strings with translation keys using `t()`:

## Hero Section (lines ~129-141)
```jsx
// Line 129: Replace
"Explore Engineering in 3D"
// With:
{t('home.hero.title')}

// Line 133: Replace  
"Choose a category to view detailed 3D models with interactive controls"
// With:
{t('home.hero.subtitle')}

// Line 140: Replace
"NEW: Voice AI • Model Comparison • Leaderboards • PWA Support"
// With:
{t('home.hero.new')}
```

## Feature Cards (lines ~148-180)
```jsx
// Voice AI card
"Voice AI" → {t('home.features.voiceAI')}
"Speak to learn" → {t('home.features.voiceAI.desc')}

// Compare card
"Compare" → {t('home.features.compare')}
"Side-by-side" → {t('home.features.compare.desc')}

// Leaderboard card
"Leaderboard" → {t('home.features.leaderboard')}
"Compete & earn" → {t('home.features.leaderboard.desc')}

// PWA card
"PWA" → {t('home.features.pwa')}
"Install as app" → {t('home.features.pwa.desc')}
```

## Learning Sections
```jsx
// 3D Viewer
"3D Models Viewer" → {t('home.viewer.title')}
"Explore all models in interactive 3D" → {t('home.viewer.desc')}
"Launch Viewer" → {t('home.viewer.button')}

// Rocket Mechanics
"Learn Rocket Mechanics" → {t('home.learn.rockets')}
"Master propulsion, orbital mechanics, staging, and launch systems" → {t('home.learn.rockets.desc')}

// Plane Mechanics
"Learn Plane Mechanics" → {t('home.learn.planes')}
"Understand aerodynamics, flight controls, engines, and aviation systems" → {t('home.learn.planes.desc')}

// Car Mechanics
"Learn Car Mechanics" → {t('home.learn.cars')}
"Explore engines, transmissions, suspension, and automotive engineering" → {t('home.learn.cars.desc')}

"Start Learning" → {t('home.learn.button')}
```

## Interactive Learning Section
```jsx
"Interactive Learning" → {t('home.interactive.title')}
"Master engineering through games and comparisons" → {t('home.interactive.subtitle')}

// Journey
"Engineering Journey" → {t('home.journey.title')}
"Complete challenges and watch your rocket fly to space!" → {t('home.journey.desc')}
"Quiz" → {t('home.journey.quiz')}
"Matching" → {t('home.journey.matching')}
"Simulation" → {t('home.journey.simulation')}
"Building" → {t('home.journey.building')}
"Start Journey" → {t('home.journey.button')}

// Compare
"Compare Models" → {t('home.compare.title')}
"View models side-by-side and learn the differences!" → {t('home.compare.desc')}
"Rocket" → {t('home.compare.rocket')}
"Plane" → {t('home.compare.plane')}
"Car" → {t('home.compare.car')}
"Start Comparing" → {t('home.compare.button')}
```

## AI Assistant Section
Already using translations:
- {t('ai.title')}
- {t('ai.placeholder')}
- {t('ai.ask')}

## Community & Leaderboard
Already using translations:
- {t('community.title')}
- {t('leaderboard.title')}

---

**Note**: All translation keys are already added to `src/i18n/config.js` for EN, ES, AR, and FR languages.
