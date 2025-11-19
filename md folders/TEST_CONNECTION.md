# 🔍 Test WebRTC Connection

## Issue: Users Can't See Each Other

The problem is that users aren't connecting to the same session. Here's how to debug:

### Step 1: Check Browser Console

When you join a session, open browser console (F12) and look for:

```
🔍 Environment check: {isProd: true, envServer: "https://...", mode: "production"}
🔌 Connecting to signaling server: https://name-ai-3d-backend.onrender.com
✅ Connected to signaling server
```

### Step 2: Verify Signaling Server is Running

Visit: https://name-ai-3d-backend.onrender.com/

Should show:
```json
{
  "status": "ok",
  "service": "Engineerium WebRTC Signaling Server",
  "activeSessions": 0
}
```

### Step 3: Test with Two Users

**User 1:**
1. Go to site
2. Create session
3. Note the Meeting ID (e.g., "abc123xyz")
4. Open console - should see: "User yousef joined session abc123xyz"

**User 2:**
1. Go to: `https://engineeruim.vercel.app/collaborate/session/abc123xyz`
2. Join the SAME session ID
3. Open console - should see: "User joined: [User 2 name]"

**Both users should see:**
- Console log: "👤 User joined: [name]"
- Console log: "📹 Received stream from: [socketId]"
- Video appears in grid

### Step 4: Check Vercel Environment Variable

1. Go to Vercel Dashboard
2. Your project → Settings → Environment Variables
3. Verify `VITE_SIGNALING_SERVER` is set to:
   ```
   https://name-ai-3d-backend.onrender.com
   ```
4. Make sure it's checked for: Production, Preview, Development
5. Redeploy if you just added it

### Common Issues:

**Issue 1: "Connection error" in console**
- Signaling server is down or sleeping (Render free tier)
- Wait 30 seconds for it to wake up
- Refresh the page

**Issue 2: "Users in different sessions"**
- Make sure both users use the EXACT same URL
- Copy the full URL including the session ID
- Don't create two separate sessions

**Issue 3: "No video stream"**
- Check if camera/mic permissions are allowed
- Look for: "Error accessing media devices" in console
- Try toggling camera on/off

### Debug Commands:

Open browser console and run:

```javascript
// Check if socket is connected
console.log('Socket connected:', webrtcService.socket?.connected);

// Check session ID
console.log('Session ID:', window.location.pathname.split('/').pop());

// Check peers
console.log('Connected peers:', webrtcService.peers.size);
```

### Expected Flow:

```
User 1 creates session "ABC123"
↓
User 1 connects to signaling server
↓
User 1 joins room "ABC123"
↓
User 2 goes to /collaborate/session/ABC123
↓
User 2 connects to signaling server
↓
User 2 joins room "ABC123"
↓
Server tells User 1: "User 2 joined"
↓
User 1 creates WebRTC offer
↓
User 2 receives offer, creates answer
↓
WebRTC P2P connection established
↓
Both users see each other! ✅
```

### If Still Not Working:

1. **Check Render logs:**
   - Go to Render dashboard
   - Click your service
   - View logs
   - Look for "User joined session" messages

2. **Verify CORS:**
   - Server should allow your Vercel domain
   - Check server/index.js CORS settings

3. **Test locally:**
   - Run signaling server locally: `cd server && npm start`
   - Run frontend locally: `npm run dev`
   - Test with two browser windows
   - If it works locally, it's a deployment issue

### Quick Fix:

If nothing works, try this:

1. Go to Vercel
2. Deployments → Latest deployment
3. Click "..." → Redeploy
4. Wait 2-3 minutes
5. Test again

The issue is likely that the environment variable wasn't set before deployment, so the frontend is trying to connect to the wrong server.
