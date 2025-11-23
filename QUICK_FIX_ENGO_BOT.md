# 🚀 QUICK FIX: Get Engo Bot Working in 10 Minutes

## The Problem
Your Engo Bot isn't working on Vercel because:
1. Your backend server needs to be deployed (Railway/Render)
2. Vercel needs to know where your backend is (`VITE_BACKEND_URL`)

## The Solution (Choose ONE)

### Option A: Deploy to Railway (EASIEST - 5 minutes)

1. **Go to Railway**: https://railway.app
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your `Engineeruim` repository**
5. **Configure the service:**
   - Click on the service → Settings
   - Set **Root Directory**: `server`
   - Click **Variables** tab
   - Add: `GEMINI_API_KEY` = `AIzaSyC1IPBmPKnUg71Rqrh_S4O07PXmEgqiHmw`
6. **Generate Domain:**
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Copy your URL (e.g., `https://engineeruim-production.up.railway.app`)

### Option B: Deploy to Render (Also Easy - 5 minutes)

1. **Go to Render**: https://render.com
2. **Sign up with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure:**
   - Name: `engineeruim-backend`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
6. **Add Environment Variable:**
   - Go to Environment tab
   - Add: `GEMINI_API_KEY` = `AIzaSyC1IPBmPKnUg71Rqrh_S4O07PXmEgqiHmw`
7. **Copy your URL** (e.g., `https://engineeruim-backend.onrender.com`)

## Step 2: Update Vercel (2 minutes)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click on your project** (Engineeruim)
3. **Go to Settings → Environment Variables**
4. **Add new variable:**
   - Name: `VITE_BACKEND_URL`
   - Value: Your Railway/Render URL (from above)
   - Apply to: All environments
5. **Click "Save"**
6. **Go to Deployments tab**
7. **Click "..." on latest deployment → "Redeploy"**

## Step 3: Test (1 minute)

1. Wait 2-3 minutes for Vercel to redeploy
2. Open your site: https://engineeruim.vercel.app
3. Open browser console (F12)
4. Look for these logs:
   ```
   🚀 Gemini API: Using Express Backend Server
   📡 VITE_BACKEND_URL env var: https://your-backend-url.com
   📡 Backend URL: https://your-backend-url.com
   📡 API Base: https://your-backend-url.com/api/gemini
   ```
5. Click the Engo Bot and ask a question!

## Troubleshooting

### If you see "❌ NOT SET!" in console:
- Vercel environment variable wasn't set correctly
- Go back to Vercel → Settings → Environment Variables
- Make sure `VITE_BACKEND_URL` is there
- Redeploy

### If you see "Backend error: 500":
- Backend server isn't running
- Check Railway/Render logs
- Make sure `GEMINI_API_KEY` is set in backend environment

### If you see "Failed to fetch":
- CORS issue or backend URL is wrong
- Double-check the URL you copied
- Make sure it starts with `https://` (no trailing slash)

## Current Status

✅ Backend code is ready (`server/index.js`)
✅ Frontend code is ready (`src/services/gemini.js`)
✅ Git pushed to GitHub

❌ Backend not deployed yet
❌ Vercel doesn't know backend URL

**You're literally 10 minutes away from having a working Engo Bot! 🎉**

## Quick Test Backend Locally (Optional)

If you want to test locally first:

```bash
cd server
npm install
node index.js
```

Then in another terminal:
```bash
curl -X POST http://localhost:3001/api/gemini/text -H "Content-Type: application/json" -d "{\"prompt\": \"Say hello!\", \"maxTokens\": 50}"
```

If you see a response, your backend works! Now just deploy it.
