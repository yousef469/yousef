# Collaborate Session - Remaining Issues

## Critical Issues to Fix:

### 1. Screen Sharing Not Synced ❌
**Problem**: When host opens whiteboard or uploads content, other participants don't see it.

**Why**: Currently each client has its own local state. No synchronization via WebRTC data channels or signaling server.

**Solution Needed**:
- Add WebRTC data channels to sync state
- When host opens whiteboard: broadcast "whiteboard-opened" event
- When host uploads file: broadcast file data or URL
- Participants listen for these events and update their UI accordingly

**Implementation**:
```javascript
// In webrtc.js - add data channel support
peer.on('data', (data) => {
  const message = JSON.parse(data);
  if (message.type === 'whiteboard-opened') {
    setShowWhiteboard(true);
  }
  if (message.type === 'content-uploaded') {
    setUploadedContent(message.content);
  }
});

// When host opens whiteboard
const openWhiteboard = () => {
  setShowWhiteboard(true);
  // Broadcast to all peers
  peers.forEach(peer => {
    peer.send(JSON.stringify({ type: 'whiteboard-opened' }));
  });
};
```

### 2. Passcode Regenerates ❌
**Problem**: Each participant generates their own random passcode instead of using the same one.

**Why**: Line 23 in CollaborateSessionPage.jsx:
```javascript
const [sessionPasscode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
```
This runs for EVERY participant, generating different codes.

**Solution**:
- Host generates passcode and stores it in signaling server
- Participants fetch the passcode from server when joining
- OR: Derive passcode from sessionId (deterministic)

**Quick Fix**:
```javascript
// Use sessionId to generate consistent passcode
const [sessionPasscode] = useState(() => {
  const hash = sessionId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return Math.abs(hash % 1000000).toString().padStart(6, '0');
});
```

### 3. Participant Names Show "You" ❌
**Problem**: In the participants list, everyone sees "You" for themselves instead of their actual name.

**Why**: The local participant is hardcoded as "You" in the video sidebar.

**Solution**: Show actual username for local participant too.

**Fix**: In video sidebar, change:
```javascript
// Instead of
name: 'You'

// Use
name: user?.email?.split('@')[0] || 'You'
```

### 4. 3D Model Viewer ❌
**Problem**: 3D models just show a placeholder instead of actual 3D viewer.

**Solution**: 
- Reuse the existing 3D viewer component from your app
- Load the uploaded .glb/.gltf file into Three.js
- Add orbit controls for rotation

**Implementation**: Create a simple Three.js viewer component or reuse existing one.

## Priority Order:

1. **Fix passcode** (5 min) - Quick fix, important for UX
2. **Fix participant names** (5 min) - Quick fix
3. **Add 3D viewer** (30 min) - Reuse existing component
4. **Add screen sharing sync** (2-3 hours) - Complex, requires WebRTC data channels

## Current Status:

✅ Video calls working
✅ Whiteboard drawing works (locally)
✅ File upload works (locally)
✅ Host-only controls
✅ Layout correct (videos on right)

❌ No synchronization between participants
❌ Passcode inconsistent
❌ Naming issues
❌ No real 3D viewer

## Next Steps:

Start with the quick fixes (#1 and #2), then tackle 3D viewer, then the complex synchronization.
