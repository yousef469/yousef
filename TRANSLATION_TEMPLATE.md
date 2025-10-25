# Translation Template

## File to Translate: `src/i18n/config.js`

You only need to translate this ONE file. Copy the English translations below and translate them to your 8 languages.

---

## English (EN) - Complete List

```javascript
{
  "app.title": "AeroAI 3D",
  "app.subtitle": "Interactive 3D Engineering Models",
  "app.footer": "Interactive Engineering Education",
  
  // Navigation
  "nav.language": "Language",
  "nav.login": "Login",
  "nav.signUp": "Sign Up",
  "nav.signOut": "Sign Out",
  "nav.welcome": "Welcome",
  
  // Auth Page
  "auth.welcomeBack": "Welcome back!",
  "auth.startJourney": "Start your engineering journey",
  "auth.fullName": "Full Name",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.createAccount": "Create Account",
  "auth.continueWith": "Or continue with",
  "auth.continueGoogle": "Continue with Google",
  "auth.dontHaveAccount": "Don't have an account?",
  "auth.alreadyHaveAccount": "Already have an account?",
  "auth.pleaseWait": "Please wait...",
  
  // AI Assistant
  "ai.title": "Quick AI Assistant",
  "ai.placeholder": "Ask anything about rockets, planes, or cars...",
  "ai.ask": "Ask",
  "ai.loading": "Thinking...",
  
  // Home Page - Hero
  "home.hero.title": "Explore Engineering in 3D",
  "home.hero.subtitle": "Choose a category to view detailed 3D models with interactive controls",
  "home.hero.new": "NEW: Voice AI • Model Comparison • Leaderboards • PWA Support",
  
  // Home Page - Features
  "home.features.voiceAI": "Voice AI",
  "home.features.voiceAI.desc": "Speak to learn",
  "home.features.compare": "Compare",
  "home.features.compare.desc": "Side-by-side",
  "home.features.leaderboard": "Leaderboard",
  "home.features.leaderboard.desc": "Compete & earn",
  "home.features.pwa": "PWA",
  "home.features.pwa.desc": "Install as app",
  
  // Home Page - Viewer
  "home.viewer.title": "3D Models Viewer",
  "home.viewer.desc": "Explore all models in interactive 3D",
  "home.viewer.button": "Launch Viewer",
  
  // Home Page - Learning
  "home.learn.rockets": "Learn Rocket Mechanics",
  "home.learn.rockets.desc": "Master propulsion, orbital mechanics, staging, and launch systems",
  "home.learn.planes": "Learn Plane Mechanics",
  "home.learn.planes.desc": "Understand aerodynamics, flight controls, engines, and aviation systems",
  "home.learn.cars": "Learn Car Mechanics",
  "home.learn.cars.desc": "Explore engines, transmissions, suspension, and automotive engineering",
  "home.learn.button": "Start Learning",
  
  // Home Page - Interactive
  "home.interactive.title": "Interactive Learning",
  "home.interactive.subtitle": "Master engineering through games and comparisons",
  
  // Home Page - Journey
  "home.journey.title": "Engineering Journey",
  "home.journey.desc": "Complete challenges and watch your rocket fly to space!",
  "home.journey.quiz": "Quiz",
  "home.journey.matching": "Matching",
  "home.journey.simulation": "Simulation",
  "home.journey.building": "Building",
  "home.journey.button": "Start Journey",
  
  // Home Page - Compare
  "home.compare.title": "Compare Models",
  "home.compare.desc": "View models side-by-side and learn the differences!",
  "home.compare.rocket": "Rocket",
  "home.compare.plane": "Plane",
  "home.compare.car": "Car",
  "home.compare.button": "Start Comparing",
  
  // Categories
  "categories.title": "Engineering Categories",
  "categories.rockets": "Rockets",
  "categories.rockets.desc": "Space Launch Vehicles",
  "categories.planes": "Aircraft",
  "categories.planes.desc": "Aviation Engineering",
  "categories.cars": "Vehicles",
  "categories.cars.desc": "Automotive Engineering",
  
  // Community
  "community.title": "Community Q&A",
  "leaderboard.title": "Leaderboard"
}
```

---

## How to Add Translations

### Step 1: Open `src/i18n/config.js`

### Step 2: Find the language section (e.g., `zh:` for Chinese)

### Step 3: Copy the English keys and translate the VALUES only

Example for Chinese:
```javascript
zh: {
  translation: {
    "app.title": "AeroAI 3D",  // Keep brand name
    "app.subtitle": "交互式3D工程模型",  // Translate this
    "nav.login": "登录",  // Translate this
    // ... etc
  }
}
```

---

## Languages to Complete

You need to add translations for these 4 remaining languages:

### ✅ Already Done:
- English (en)
- Arabic (ar)
- Spanish (es)
- French (fr)

### ❌ Need Translation:
- **Chinese (zh)** - 中文
- **Hindi (hi)** - हिन्दी  
- **Portuguese (pt)** - Português
- **Russian (ru)** - Русский

---

## Quick Translation Tips

1. **Use ChatGPT/Claude**: 
   - Copy the English section
   - Ask: "Translate these to Chinese/Hindi/Portuguese/Russian, keep the keys, only translate values"

2. **Use Google Translate** (less accurate):
   - Translate each value
   - Review for technical terms

3. **Hire on Fiverr** ($5-20):
   - Native speakers
   - Better quality
   - Fast turnaround

---

## After Translation

Once you add the translations to `src/i18n/config.js`:
1. Save the file
2. Run `npm run build`
3. Test by changing language in the app
4. All pages will automatically use the translations!

---

## Need Help?

If you want me to generate the translations using AI, just say:
"Generate Chinese translations" or "Generate all 4 remaining languages"
