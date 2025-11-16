# 🚀 5-Minute Production Deploy

## Make Your Video Calls Work on the Internet (Like Zoom!)

---

## 🎯 What We're Doing

Right now: ❌ Only works on localhost
After this: ✅ Works anywhere in the world!

---

## 📋 Step-by-Step (Choose One)

### 🟢 Option 1: Railway (Recommended)

#### 1. Deploy Server (2 minutes)

```
1. Go to: https://railway.app
2. Click "Login" → Sign in with GitHub
3. Click "New Project"
4. Click "Deploy from GitHub repo"
5. Select "Engineeruim"
6. Wait 2 minutes... ✅ Done!
```

#### 2. Configure (1 minute)

```
1. Click your service
2. Settings → Root Directory: server
3. Settings → Start Command: npm start
4. Click "Deploy"
```

#### 3. Get URL (30 seconds)

```
1. Settings → Networking
2. Click "Generate Domain"
3. Copy URL (like: https://engineerium-production-xxxx.up.railway.app)
```

#### 4. Update Frontend (1 minute)

Create `.env` file in your project:
```env
VITE_SIGNALING_SERVER=https://your-railway-url.up.railway.app
```

Push to GitHub:
```bash
git add .
git commit -m "Add production server"
git push
```

**Done!** Vercel auto-deploys ✅

---

### 🔵 Option 2: Render (Also Free)

#### 1. Deploy (3 minutes)

```
1. Go to: https://render.com
2. Sign up with GitHub
3. New + → Web Service
4. Connect "Engineeruim" repo
5. Fill in:
   - Name: engineerium-signaling
   - Root Directory: server
   - Build: npm install
   - Start: npm start
   - Plan: Free
6. Create Web Service
```

#### 2. Get URL

Copy: `https://engineerium-signaling.onrender.com`

#### 3. Update Frontend

Create `.env`:
```env
VITE_SIGNALING_SERVER=https://engineerium-signaling.onrender.com
```

Push:
```bash
git add .
git commit -m "Add production server"
git push
```

**Done!** ✅

---

## ✅ Test It!

### 1. Check Server is Running

Visit your server URL in browser:
```
https://your-server-url.up.railway.app/
```

Should see:
```json
{
  "status": "ok",
  "service": "Engineerium WebRTC Signaling Server"
}
```

### 2. Test Video Calls

1. Go to: `https://engineeruim.vercel.app`
2. Click **"Collaborate"**
3. Click **"Create Session"**
4. Allow camera/mic
5. **Copy the link**
6. Send to a friend (or open in incognito)
7. **They can join from anywhere!** 🌍

---

## 🎉 Success!

Your video calls now work like Zoom:
- ✅ Works on the internet
- ✅ Anyone can join with a link
- ✅ No localhost needed
- ✅ Free hosting!

---

## 🐛 Not Working?

### Check 1: Is server running?
Visit: `https://your-server-url/health`

Should show: `{"status":"healthy"}`

### Check 2: Did you add .env?
```bash
cat .env
# Should show: VITE_SIGNALING_SERVER=https://...
```

### Check 3: Did you push to GitHub?
```bash
git status
# Should show: nothing to commit, working tree clean
```

### Check 4: Browser console
Press F12 → Console tab
Look for: "✅ Connected to signaling server"

---

## 💰 Cost

**$0** for moderate usage!

Free tiers:
- Railway: 500 hours/month
- Render: 750 hours/month
- Vercel: Unlimited

After free tier: ~$5-7/month

---

## 📞 What's Next?

Your video calls work! Now you can:
- Share links with real users
- Test with friends worldwide
- Add more features (screen share, recording, etc.)

---

## 🎓 What You Built

You now have:
- ✅ Production WebRTC server
- ✅ Real-time video calls
- ✅ Works globally
- ✅ Free hosting
- ✅ Auto-scaling
- ✅ Like Zoom, but yours!

**Congratulations!** 🎉
