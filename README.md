# AeroAI 3D - Interactive Engineering Models

🚀 An immersive 3D engineering education platform featuring realistic rocket fire effects, AI-powered tutoring, and interactive model exploration.

## ✨ Features

- **3D Model Viewer** - Explore rockets, planes, and cars with realistic physics
- **Realistic Fire Effects** - Multi-layer particle systems with shock diamonds
- **AI Tutor** - Powered by Google Gemini for engineering questions
- **Authentication** - Secure user accounts with Supabase
- **Interactive Controls** - Nozzle playground with real-time physics
- **Engineering Lessons** - Comprehensive tutorials and exercises

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **3D Graphics**: Three.js
- **Authentication**: Supabase
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd best-engineering-website
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## 🔑 Getting API Keys

### Supabase Setup
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key from Settings > API

### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create API key in new project
4. Copy your key (starts with `AIza...`)

## 📦 Deployment

### Deploy to Vercel

1. Push to GitHub:
```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`
6. Click "Deploy"

## 🎯 Features Breakdown

### Fire Effects
- 4 particle layers (core, outer, smoke, sparks)
- Shock diamond visualization
- Real-time parameter control
- Multi-engine support (Falcon 9, Saturn V, etc.)

### Authentication
- Email/password signup and login
- Protected routes
- User session management
- Profile data storage

### AI Tutor
- Context-aware responses
- Engineering-focused explanations
- Model-specific information
- Lesson generation

## 📝 License

MIT License - feel free to use for educational purposes

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ for engineering education
