# 🚀 Deploy WebRTC to Production (Make it Work Like Zoom!)

## 🎯 Goal
Make your video calls work **anywhere on the internet**, not just localhost!

---

## 📋 Quick Deploy (5 Minutes)

### Option A: Railway (Easiest - Recommended)

#### Step 1: Deploy Signaling Server

1. **Go to [Railway.app](https://railway.app)**
2. Click **"Login"** → Sign in with GitHub
3. Click **"New Project"**
4. Click **"Deploy from GitHub repo"**
5. Select **"Engineeruim"** (or your repo name)
6. Railway will auto-detect and deploy! ✅

#### Step 2: Configure Railway

1. Click on your deployed service
2. Go to **"Settings"** tab
3. Under **"Root Directory"**, enter: `server`
4. Under **"Start Command"**, enter: `npm start`
5. Click **"Deploy"**

#### Step 3: Get Your Production URL

1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. Copy the URL (looks like: `https://engineerium-production-xxxx.up.railway.app`)

#### Step 4: Update Your Frontend

1. Create `.env` file in your project root:
```env
VITE_SIGNALING_SERVER=https://your-railway-url.up.railway.app
```

2. Deploy to Vercel:
```bash
git add .
git commit -m "Add production WebRTC server"
git push
```

Vercel will auto-deploy! ✅

---

### Option B: Render (Also Free)

#### Step 1: Deploy to Render

1. **Go to [Render.com](https://render.com)**
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your **Engineeruim** repo
5. Configure:
   - **Name:** `engineerium-signaling`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Click **"Create Web Service"**

#### Step 2: Get Your URL

Render gives you: `https://engineerium-signaling.onrender.com`

#### Step 3: Update Frontend

Create `.env`:
```env
VITE_SIGNALING_SERVER=https://engineerium-signaling.onrender.com
```

Push to GitHub → Vercel auto-deploys!

---

## ✅ Verify It's Working

### Test Production Deployment:

1. Go to your live site: `https://engineeruim.vercel.app`
2. Click **"Collaborate"**
3. Click **"Create Session"**
4. Allow camera/mic
5. **Share the link with a friend!** 🎉
6. They can join from **anywhere in the world**!

### Check Server Status:

Visit your signaling server URL:
```
https://your-server.up.railway.app/
```

Should show:
```json
{
  "status": "ok",
  "service": "Engineerium WebRTC Signaling Server",
  "activeSessions": 0
}
```

---

## 🌍 How It Works Now

### Before (Localhost Only):
```
Your Computer → localhost:3001 → Your Computer
❌ Can't share with others
```

### After (Production):
```
User A (USA) → Railway Server → User B (Europe)
✅ Works anywhere in the world!
```

---

## 🔧 Advanced: Add Your Own TURN Servers

For better reliability (users behind strict firewalls):

### Option 1: Metered (Free 50GB/month)

1. Sign up: https://www.metered.ca/tools/openrelay/
2. Get your credentials
3. Update `src/services/webrtc.js`:

```javascript
const iceServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  {
    urls: 'turn:a.relay.metered.ca:80',
    username: 'YOUR_USERNAME',
    credential: 'YOUR_CREDENTIAL'
  }
];
```

### Option 2: Twilio (Free $15 credit)

1. Sign up: https://www.twilio.com/stun-turn
2. Get credentials
3. Add to `webrtc.js`

---

## 💰 Cost Breakdown

| Service | Free Tier | What You Get |
|---------|-----------|--------------|
| **Railway** | 500 hours/month | ~20 days of uptime |
| **Render** | 750 hours/month | ~31 days of uptime |
| **Metered TURN** | 50GB/month | ~100 hours of calls |
| **Vercel** | Unlimited | Unlimited |

**Total Cost: $0** for moderate usage!

After free tier:
- Railway: $5/month
- Render: $7/month
- Metered: $0.50/GB

---

## 🐛 Troubleshooting

### "Can't connect to signaling server"

**Check:**
1. Is your Railway/Render service running?
2. Did you add the URL to `.env`?
3. Did you push to GitHub?
4. Check browser console (F12) for errors

**Fix:**
```bash
# Make sure .env has correct URL
cat .env

# Push changes
git add .
git commit -m "Update signaling server URL"
git push
```

### "Video works locally but not in production"

**Likely cause:** CORS issue

**Fix:** Update `server/index.js` CORS settings:
```javascript
origin: ['https://engineeruim.vercel.app', 'https://your-custom-domain.com']
```

### "Connection works but no video"

**Likely cause:** Need TURN servers

**Fix:** Add Metered TURN servers (see Advanced section above)

---

## 📊 Monitor Your Server

### Railway Dashboard:
- View logs in real-time
- See CPU/memory usage
- Monitor active connections

### Render Dashboard:
- Check deployment status
- View server logs
- Monitor uptime

---

## 🎉 Success Checklist

- [ ] Signaling server deployed to Railway/Render
- [ ] Got production URL
- [ ] Added URL to `.env`
- [ ] Pushed to GitHub
- [ ] Vercel auto-deployed
- [ ] Tested on live site
- [ ] Shared link with friend
- [ ] Friend can join from anywhere! 🌍

---

## 🚀 Next Steps

Once working in production:

1. **Custom Domain** - Add your own domain
2. **Analytics** - Track usage with Mixpanel
3. **Recording** - Save sessions
4. **Screen Sharing** - Share screens
5. **Chat** - Add text chat
6. **Breakout Rooms** - Split into groups

---

## 📞 Support

If you get stuck:

1. Check Railway/Render logs
2. Check browser console (F12)
3. Verify `.env` file exists
4. Make sure you pushed to GitHub

---

## 🎓 What You Learned

- ✅ Deploy Node.js servers to cloud
- ✅ Use environment variables
- ✅ Configure CORS for production
- ✅ Set up WebRTC with TURN servers
- ✅ Make real-time apps work globally

**Your video calls now work like Zoom!** 🎉
