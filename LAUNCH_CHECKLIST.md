# 🚀 Engineerium Launch Checklist

## ✅ DONE (Code Ready)

| Item | Status | Notes |
|------|--------|-------|
| Analytics | ✅ | Mixpanel enabled + Vercel Analytics |
| Error Monitoring | ✅ | Error tracking service added |
| Feedback System | ✅ | Feedback widget added (bottom-right) |
| Beta Banner | ✅ | Shows at top, dismissible |
| Landing Page | ✅ | Already complete |
| 3D Models | ✅ | 10+ GLB models in /public |
| Auth System | ✅ | Supabase + Google OAuth |
| Database | ✅ | Supabase with RLS |

## 🔧 YOU NEED TO DO (Manual Steps)

### 1. Get Mixpanel Token (5 min)
1. Go to https://mixpanel.com and sign up (free)
2. Create a new project "Engineerium"
3. Copy your Project Token
4. Replace `YOUR_MIXPANEL_TOKEN_HERE` in `.env`
5. Add `VITE_MIXPANEL_TOKEN` to Vercel env vars

### 2. Connect Domain in Vercel (10 min)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., engineerium.com)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### 3. Add Env Variables to Vercel (5 min)
Go to Vercel → Settings → Environment Variables and add:
```
VITE_SUPABASE_URL=https://ptwjvfuwwjpfcivlqjxo.supabase.co
VITE_SUPABASE_ANON_KEY=your-key
VITE_GEMINI_API_KEY=your-key
VITE_MIXPANEL_TOKEN=your-token
VITE_SERVER_URL=https://engineeruim.onrender.com
```

### 4. Create Feedback Table in Supabase (2 min)
Run this SQL in Supabase SQL Editor:
```sql
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  user_id UUID REFERENCES auth.users(id),
  user_email VARCHAR(255),
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback" ON feedback
  FOR INSERT WITH CHECK (true);
```

### 5. Test Auth on All Devices (15 min)
- [ ] Desktop Chrome
- [ ] Desktop Safari
- [ ] Mobile Safari (iPhone)
- [ ] Mobile Chrome (Android)
- [ ] Google Sign-In works

### 6. Test Key Lessons (20 min)
- [ ] Rockets Lesson 1
- [ ] Cars Lesson 1
- [ ] Planes Lesson 1
- [ ] Electronics Lesson 1
- [ ] Quiz completion works
- [ ] XP awards correctly

### 7. Database Backup (5 min)
1. Go to Supabase Dashboard → Settings → Database
2. Click "Download backup" or set up automatic backups

### 8. Update OG Image URLs (2 min)
In `index.html`, update these to your actual domain:
```html
<meta property="og:url" content="https://YOUR-DOMAIN.com/" />
<meta property="og:image" content="https://YOUR-DOMAIN.com/logo.png" />
```

## 🎯 Quick Deploy Commands

```bash
# Build and test locally
npm run build
npm run preview

# Deploy to Vercel
git add .
git commit -m "🚀 Launch ready - v1.0"
git push origin main
```

## 📊 Post-Launch Monitoring

After launch, check:
- Vercel Analytics dashboard
- Mixpanel dashboard for user events
- Supabase dashboard for database usage
- Feedback table for user feedback

Good luck with the launch! 🎉
