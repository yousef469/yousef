# Deploy Backend Server to Railway

Your Express server with Gemini API is now ready to deploy! Railway is the easiest option.

## Option 1: Railway (Recommended - Free Tier Available)

### Step 1: Sign Up
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `Engineeruim` repository
4. Railway will auto-detect the Express app

### Step 3: Configure
1. Go to your project → Variables
2. Add environment variable:
   ```
   GEMINI_API_KEY=AIzaSyC1IPBmPKnUg71Rqrh_S4O07PXmEgqiHmw
   ```

### Step 4: Set Root Directory
1. Go to Settings → Service
2. Set "Root Directory" to: `server`
3. Railway will now use `server/package.json`

### Step 5: Get Your URL
1. Go to Settings → Networking
2. Click "Generate Domain"
3. Copy your URL (e.g., `https://your-app.up.railway.app`)

### Step 6: Update Frontend
1. Update `.env`:
   ```
   VITE_BACKEND_URL=https://your-app.up.railway.app
   ```
2. Update Vercel environment variables:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add `VITE_BACKEND_URL` with your Railway URL
3. Redeploy Vercel

## Option 2: Render (Also Free)

### Step 1: Sign Up
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Deploy
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: engineeruim-backend
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

### Step 3: Add Environment Variable
1. Go to Environment
2. Add:
   ```
   GEMINI_API_KEY=AIzaSyC1IPBmPKnUg71Rqrh_S4O07PXmEgqiHmw
   ```

### Step 4: Get Your URL
1. Copy your Render URL (e.g., `https://engineeruim-backend.onrender.com`)
2. Update `.env` and Vercel as described above

## Option 3: Fly.io (More Control)

### Step 1: Install Fly CLI
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# Mac/Linux
curl -L https://fly.io/install.sh | sh
```

### Step 2: Login and Deploy
```bash
cd server
fly auth login
fly launch
```

### Step 3: Set Environment Variable
```bash
fly secrets set GEMINI_API_KEY=AIzaSyC1IPBmPKnUg71Rqrh_S4O07PXmEgqiHmw
```

## Testing Your Backend

Once deployed, test it:

```bash
# Test health endpoint
curl https://your-backend-url.com/health

# Test Gemini text endpoint
curl -X POST https://your-backend-url.com/api/gemini/text \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Say hello!", "maxTokens": 50}'
```

## Why This is Better Than Vercel Serverless

✅ **Always Running** - No cold starts
✅ **Easier Debugging** - Real-time logs
✅ **No Build Issues** - Simple Node.js deployment
✅ **Better for APIs** - Designed for backend services
✅ **Free Tier** - Railway and Render both have generous free tiers

## Current Status

Your backend server (`server/index.js`) now includes:
- ✅ WebRTC signaling (existing)
- ✅ Gemini Vision API (`/api/gemini/vision`)
- ✅ Gemini Text API (`/api/gemini/text`)
- ✅ Health check endpoints
- ✅ CORS configured for your Vercel frontend

Your frontend is already configured to use `/api/gemini/*` endpoints, so once you deploy the backend and update `VITE_BACKEND_URL`, everything will work!

## Next Steps

1. Deploy to Railway (5 minutes)
2. Update `VITE_BACKEND_URL` in Vercel
3. Test your explode view - AI vision will work! 🎉
