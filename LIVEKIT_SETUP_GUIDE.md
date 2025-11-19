# LiveKit Setup Guide for Virtual Classroom

## What is LiveKit?

LiveKit is a modern, open-source video/audio platform (like Zoom/Google Meet) that's:
- **Free tier**: 10,000 minutes/month (enough for ~167 hours of classroom time)
- **Easy to integrate**: React components ready to use
- **High quality**: Better than WebRTC DIY solutions
- **Scalable**: Handles 100+ participants per room

## Step 1: Create LiveKit Account

### 1.1 Sign Up (Free)

1. Go to https://livekit.io/
2. Click **"Get Started"** or **"Sign Up"**
3. Create account with email or GitHub
4. Verify your email

### 1.2 Create a Project

1. After login, you'll see the **LiveKit Cloud Dashboard**
2. Click **"Create Project"** or you'll have a default project
3. Name it: `Engineerium Classroom`
4. Select region closest to your users (e.g., US, EU, Asia)

### 1.3 Get Your Credentials

You'll need 3 things:

1. **LiveKit URL** (WebSocket URL)
   - Format: `wss://your-project-xxxxx.livekit.cloud`
   - Find it in: Dashboard → Settings → **WebSocket URL**

2. **API Key**
   - Find it in: Dashboard → Settings → **API Keys**
   - Click **"Create API Key"**
   - Name: `Classroom Backend`
   - Copy the **Key** (starts with `API`)

3. **API Secret**
   - Shown only once when you create the API Key
   - Copy it immediately (you can't see it again!)
   - If you lose it, create a new API Key

## Step 2: Add to Your Project

### 2.1 Install LiveKit Packages

```bash
npm install @livekit/components-react livekit-client livekit-server-sdk
```

### 2.2 Add Environment Variables

Update your `.env` file:

```env
# Existing Supabase vars...
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key

# Add these LiveKit vars
VITE_LIVEKIT_URL=wss://your-project-xxxxx.livekit.cloud
VITE_LIVEKIT_API_KEY=APIxxxxxxxxxxxxxxxxx
VITE_LIVEKIT_API_SECRET=your-secret-key-here
```

⚠️ **Important**: 
- The `VITE_` prefix makes it available in React
- Never commit `.env` to GitHub (it's already in `.gitignore`)
- For production, add these to Vercel Environment Variables

### 2.3 Update `.env.example`

```env
# Supabase
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# LiveKit (for Virtual Classroom video/audio)
VITE_LIVEKIT_URL=wss://your-project.livekit.cloud
VITE_LIVEKIT_API_KEY=your-api-key
VITE_LIVEKIT_API_SECRET=your-api-secret

# Other services...
```

## Step 3: Create LiveKit Service

Create `src/services/livekit.js`:

```javascript
import { AccessToken } from 'livekit-server-sdk';

/**
 * Generate LiveKit access token for a user
 * This should ideally be done on the backend, but for MVP we'll do it client-side
 */
export async function generateToken(roomName, participantName, isTeacher = false) {
  const apiKey = import.meta.env.VITE_LIVEKIT_API_KEY;
  const apiSecret = import.meta.env.VITE_LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('LiveKit credentials not configured');
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    name: participantName,
  });

  // Grant permissions
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    // Teachers can control room settings
    roomAdmin: isTeacher,
  });

  return at.toJwt();
}

export function getLiveKitUrl() {
  return import.meta.env.VITE_LIVEKIT_URL;
}
```

## Step 4: Update VirtualClassroom Component

I'll create an updated version with LiveKit integrated:

```javascript
// Add to imports in VirtualClassroom.jsx
import { LiveKitRoom, VideoConference, RoomAudioRenderer } from '@livekit/components-react';
import '@livekit/components-styles';
import { generateToken, getLiveKitUrl } from '../services/livekit';

// Add state for LiveKit
const [liveKitToken, setLiveKitToken] = useState(null);

// Generate token when joining classroom
useEffect(() => {
  const initLiveKit = async () => {
    try {
      const token = await generateToken(
        roomId,
        user.email?.split('@')[0] || 'Student',
        isTeacher
      );
      setLiveKitToken(token);
    } catch (error) {
      console.error('Failed to generate LiveKit token:', error);
    }
  };

  if (isConnected) {
    initLiveKit();
  }
}, [isConnected, roomId, user, isTeacher]);

// Replace the video controls section with:
{liveKitToken && (
  <LiveKitRoom
    token={liveKitToken}
    serverUrl={getLiveKitUrl()}
    connect={true}
    audio={isMicOn}
    video={isCameraOn}
    className="h-full"
  >
    <VideoConference />
    <RoomAudioRenderer />
  </LiveKitRoom>
)}
```

## Step 5: Test It Out

### 5.1 Start Your Dev Server

```bash
npm run dev
```

### 5.2 Test Video/Audio

1. Open your app: `http://localhost:5173/classroom`
2. Create a classroom
3. You should see your video feed in the sidebar
4. Open another browser/incognito window
5. Join with the room code
6. Both participants should see each other's video!

### 5.3 Troubleshooting

**No video showing?**
- Check browser permissions (camera/mic)
- Open browser console for errors
- Verify `.env` variables are correct
- Make sure you added `VITE_` prefix

**"LiveKit credentials not configured"?**
- Restart dev server after adding `.env` variables
- Check spelling of environment variable names

**Connection failed?**
- Verify LiveKit URL is correct (starts with `wss://`)
- Check API Key and Secret are correct
- Try creating a new API Key in LiveKit Dashboard

## Step 6: Deploy to Production (Vercel)

### 6.1 Add Environment Variables to Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - `VITE_LIVEKIT_URL`
   - `VITE_LIVEKIT_API_KEY`
   - `VITE_LIVEKIT_API_SECRET`
5. Click **Save**
6. Redeploy your app

### 6.2 Security Note

⚠️ **For Production**: Move token generation to backend

Currently, we're generating tokens client-side (not ideal for production).

**Better approach** (future enhancement):
1. Create API endpoint: `/api/livekit-token`
2. Generate token on server
3. Client requests token from your API

Example backend endpoint:
```javascript
// server/routes/livekit.js
import { AccessToken } from 'livekit-server-sdk';

export async function generateLiveKitToken(req, res) {
  const { roomName, participantName, isTeacher } = req.body;
  
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
      name: participantName,
    }
  );

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    roomAdmin: isTeacher,
  });

  res.json({ token: at.toJwt() });
}
```

## Features You Get with LiveKit

### ✅ Included Out of the Box

1. **Video Tiles**
   - Automatic grid layout
   - Active speaker detection
   - Screen sharing support

2. **Audio**
   - Echo cancellation
   - Noise suppression
   - Automatic gain control

3. **Controls**
   - Mute/unmute mic
   - Enable/disable camera
   - Screen share button
   - Leave room button

4. **Quality**
   - Adaptive bitrate
   - Automatic quality adjustment
   - Network resilience

### 🎨 Customization

You can customize the UI:

```javascript
<LiveKitRoom
  token={liveKitToken}
  serverUrl={getLiveKitUrl()}
  connect={true}
  audio={isMicOn}
  video={isCameraOn}
  // Custom styling
  className="livekit-custom"
  // Custom options
  options={{
    adaptiveStream: true,
    dynacast: true,
    videoCaptureDefaults: {
      resolution: {
        width: 1280,
        height: 720,
        frameRate: 30,
      },
    },
  }}
>
  {/* Use pre-built components */}
  <VideoConference />
  
  {/* Or build custom UI */}
  <ParticipantTile />
  <ControlBar />
  <Chat />
</LiveKitRoom>
```

## Pricing & Limits

### Free Tier (Starter)
- ✅ 10,000 participant minutes/month
- ✅ Up to 100 participants per room
- ✅ All features included
- ✅ No credit card required

**Example**: 
- 50 students × 1 hour class = 50 participant minutes
- You can run ~200 classes/month on free tier!

### Paid Plans (if you grow)
- **Pro**: $99/month - 100,000 minutes
- **Enterprise**: Custom pricing

## Advanced Features (Optional)

### 1. Recording Sessions

```javascript
// Enable recording in LiveKit Dashboard
// Or via API:
import { RoomServiceClient } from 'livekit-server-sdk';

const roomService = new RoomServiceClient(
  getLiveKitUrl(),
  apiKey,
  apiSecret
);

await roomService.startRecording(roomName);
```

### 2. Screen Sharing

Already included! Users can click the screen share button.

### 3. Chat Messages

```javascript
import { Chat } from '@livekit/components-react';

<LiveKitRoom ...>
  <VideoConference />
  <Chat />
</LiveKitRoom>
```

### 4. Breakout Rooms

Create multiple LiveKit rooms and move participants between them.

## Support & Resources

- **LiveKit Docs**: https://docs.livekit.io/
- **React Components**: https://docs.livekit.io/guides/room/react/
- **Examples**: https://github.com/livekit/livekit-react
- **Discord**: https://livekit.io/discord

## Quick Reference

### Environment Variables
```env
VITE_LIVEKIT_URL=wss://your-project.livekit.cloud
VITE_LIVEKIT_API_KEY=APIxxxxxxxxx
VITE_LIVEKIT_API_SECRET=your-secret
```

### Install Command
```bash
npm install @livekit/components-react livekit-client livekit-server-sdk
```

### Basic Usage
```javascript
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';

<LiveKitRoom
  token={token}
  serverUrl={url}
  connect={true}
>
  <VideoConference />
</LiveKitRoom>
```

## Next Steps

1. ✅ Sign up for LiveKit
2. ✅ Get credentials (URL, API Key, Secret)
3. ✅ Add to `.env`
4. ✅ Install packages
5. ✅ Test locally
6. ✅ Deploy to Vercel

Your Virtual Classroom will then have:
- 3D model synchronization (Supabase Realtime) ✅
- Video/audio communication (LiveKit) ✅
- Professional, scalable solution ✅

Need help? Let me know which step you're on!
