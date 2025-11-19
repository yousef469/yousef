# 🚀 Deployment Guide

## Step-by-Step Deployment to Vercel

### 1️⃣ Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it: `aeroai-3d` (or your preferred name)
4. Keep it **Public** or **Private**
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 2️⃣ Push Code to GitHub

Copy the commands from GitHub and run them:

```bash
git remote add origin https://github.com/YOUR_USERNAME/aeroai-3d.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3️⃣ Deploy to Vercel

#### Option A: Using Vercel Website (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login" (use GitHub account)
3. Click "Add New..." → "Project"
4. Import your GitHub repository (`aeroai-3d`)
5. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Add Environment Variables** (IMPORTANT!):
   Click "Environment Variables" and add:
   
   ```
   VITE_SUPABASE_URL = https://ptwjvfuwwjpfcivlqjxo.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0d2p2ZnV3d2pwZmNpdmxxanhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjg5OTUsImV4cCI6MjA3NjY0NDk5NX0.XZMuH_2Vb7bqlpTT7AF0gi3aaf2Whs0On-QDaV8vBL0
   VITE_GEMINI_API_KEY = YOUR_GEMINI_API_KEY
   ```

7. Click "Deploy"
8. Wait 2-3 minutes for deployment
9. Your site will be live at: `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

### 4️⃣ Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 5️⃣ Set Up Supabase Database (If not done)

1. Go to your Supabase project
2. Go to "SQL Editor"
3. Run this SQL to create tables:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  model_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, model_id)
);

-- Progress table
CREATE TABLE progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  course_id TEXT NOT NULL,
  progress_percent INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Chat history table
CREATE TABLE chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  model_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own progress" ON progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own chat history" ON chat_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat history" ON chat_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own achievements" ON achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 6️⃣ Test Your Deployment

1. Visit your Vercel URL
2. Try signing up with a test account
3. Test the 3D models and fire effects
4. Check that AI tutor works (requires Gemini API key)

### 🔧 Troubleshooting

**Build fails?**
- Check that all environment variables are set
- Verify Node.js version (should be 18+)
- Check build logs in Vercel dashboard

**Authentication not working?**
- Verify Supabase URL and key are correct
- Check Supabase project is active
- Ensure database tables are created

**AI tutor not responding?**
- Verify Gemini API key is valid
- Check API key has proper permissions
- Look at browser console for errors

**3D models not loading?**
- Check that GLB files are in `/public` folder
- Verify file paths in model data
- Check browser console for 404 errors

### 📊 Monitoring

- **Vercel Analytics**: Automatically enabled
- **Error Tracking**: Check Vercel logs
- **Performance**: Use Vercel Speed Insights

### 🔄 Continuous Deployment

Every time you push to `main` branch, Vercel will automatically:
1. Build your project
2. Run tests (if configured)
3. Deploy to production
4. Update your live site

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel automatically deploys!
```

### 🎉 You're Live!

Your AeroAI 3D app is now deployed and accessible worldwide!

Share your URL: `https://your-project.vercel.app`

---

Need help? Check [Vercel Documentation](https://vercel.com/docs) or open an issue on GitHub.
