# ⚡ Quick Deploy Guide

## 🎯 Deploy in 5 Minutes

### Step 1: Create GitHub Repo
```bash
# Go to github.com and create a new repository named "aeroai-3d"
# Then run these commands:

git remote add origin https://github.com/YOUR_USERNAME/aeroai-3d.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to **vercel.com** and sign in with GitHub
2. Click **"Add New Project"**
3. Select your **aeroai-3d** repository
4. Add these environment variables:

```
VITE_SUPABASE_URL = https://ptwjvfuwwjpfcivlqjxo.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0d2p2ZnV3d2pwZmNpdmxxanhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjg5OTUsImV4cCI6MjA3NjY0NDk5NX0.XZMuH_2Vb7bqlpTT7AF0gi3aaf2Whs0On-QDaV8vBL0
VITE_GEMINI_API_KEY = YOUR_KEY_HERE
```

5. Click **"Deploy"**
6. Wait 2-3 minutes
7. **Done!** 🎉

### Step 3: Get Gemini API Key (if you haven't)
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Get API Key"
3. Copy your key
4. Add it to Vercel environment variables
5. Redeploy (Vercel dashboard → Deployments → Redeploy)

## 📝 Your URLs
- **GitHub**: https://github.com/YOUR_USERNAME/aeroai-3d
- **Vercel**: https://your-project.vercel.app

## 🔄 Update Your Site
```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main

# Vercel automatically deploys! ✨
```

## ✅ Checklist
- [ ] GitHub repo created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Site deployed successfully
- [ ] Gemini API key added
- [ ] Test signup/login works
- [ ] Test 3D models load
- [ ] Test fire effects work

## 🆘 Need Help?
- Check DEPLOYMENT.md for detailed guide
- Check Vercel logs for errors
- Verify all environment variables are set

---

**That's it! Your site is live! 🚀**
