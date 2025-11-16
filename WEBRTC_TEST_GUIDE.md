# 🎥 WebRTC Video Call Testing Guide

## ✅ Prerequisites Check
All dependencies are already installed:
- ✅ `simple-peer` (client)
- ✅ `socket.io-client` (client)
- ✅ `socket.io` (server)
- ✅ `express` (server)

## 🚀 Quick Test (2 Steps)

### Step 1: Start Signaling Server
```bash
cd server
npm start
```
**Expected output:**
```
Signaling server running on port 3001
```

### Step 2: Start React App (in new terminal)
```bash
npm run dev
```
**Expected output:**
```
VITE ready in XXXms
Local: http://localhost:5173/
```

## 🧪 Test Scenarios

### Test 1: Single User (Basic Setup)
1. Go to http://localhost:5173
2. Click **"Collaborate"** in sidebar
3. Click **"Create Session"**
4. Browser asks for camera/mic permissions → **Allow**
5. You should see yourself in the video grid ✅

### Test 2: Two Users (Real Video Call)
1. Complete Test 1 first
2. Copy the session URL (or click copy button)
3. Open **Incognito/Private window** (or different browser)
4. Paste the session URL
5. Allow camera/mic permissions
6. **Both users should see each other!** 🎉

### Test 3: Controls
- Click **microphone icon** → Should mute/unmute
- Click **camera icon** → Should turn video on/off
- Click **"Make Host"** (as host) → Should transfer host status
- Click **"Leave"** → Should disconnect properly

### Test 4: Multiple Users
1. Open 3+ browser tabs/windows
2. Join same session from all
3. All should see each other in grid layout

## 🎯 What Should Work

✅ **Real-time video streaming**
✅ **Audio communication**
✅ **Mute/unmute controls**
✅ **Camera on/off**
✅ **Host transfer**
✅ **Session sharing via URL**
✅ **Multiple participants**
✅ **Automatic reconnection**

## 🐛 Common Issues & Fixes

### Issue: "Failed to connect to session"
**Fix:** Make sure signaling server is running on port 3001
```bash
cd server
npm start
```

### Issue: "Camera/Microphone access denied"
**Fix:** 
- Click the lock icon in browser address bar
- Allow camera and microphone
- Refresh the page

### Issue: "Can't see other user's video"
**Possible causes:**
1. Other user didn't allow camera/mic
2. Firewall blocking WebRTC (rare on localhost)
3. Check browser console for errors

### Issue: Port 3001 already in use
**Fix:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Or change port in:
# - server/index.js (line 4)
# - src/services/webrtc.js (line 23)
```

## 📱 Browser Compatibility

✅ **Chrome/Edge** - Full support
✅ **Firefox** - Full support
✅ **Safari** - Full support (macOS/iOS)
⚠️ **Mobile browsers** - Works but may need HTTPS

## 🔒 Security Notes

- **Localhost only** - Current setup is for development
- **Production needs:**
  - HTTPS (required for camera/mic)
  - TURN servers (for strict firewalls)
  - Authentication (currently anyone can join)

## 🎬 Demo Flow

```
User A                          Server                      User B
  |                               |                            |
  |------ Connect Socket -------->|                            |
  |<----- Connected --------------|                            |
  |                               |                            |
  |------ Join Session ---------->|                            |
  |                               |<----- Connect Socket ------|
  |                               |------- Connected --------->|
  |                               |                            |
  |                               |<----- Join Session --------|
  |<----- User Joined ------------|------- User Joined ------->|
  |                               |                            |
  |------ WebRTC Signal --------->|------- WebRTC Signal ----->|
  |<----- WebRTC Signal ----------|<----- WebRTC Signal -------|
  |                               |                            |
  |<========== Direct P2P Video Connection ==================>|
```

## 🎉 Success Criteria

You'll know it's working when:
1. ✅ You see yourself in video grid
2. ✅ Second user joins and appears in grid
3. ✅ You can hear/see each other
4. ✅ Controls (mute/camera) work
5. ✅ No errors in browser console

## 📞 Next Steps After Testing

Once basic video works:
1. **Add file sharing backend** - Upload videos/3D models
2. **Add screen sharing** - Share your screen
3. **Add chat** - Text messages during call
4. **Add recording** - Save sessions
5. **Deploy to production** - With HTTPS and TURN servers

## 🆘 Need Help?

Check browser console (F12) for errors:
- Red errors = Something broke
- Yellow warnings = Usually okay
- Blue logs = Normal operation

**Most common fix:** Restart both server and client!
