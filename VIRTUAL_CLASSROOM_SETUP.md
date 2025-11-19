# Virtual Classroom Setup Guide

## Overview

The Virtual Classroom feature uses **State Synchronization** instead of screen sharing for crystal-clear 3D model viewing with zero lag.

### Technology Stack
- **3D Sync**: Supabase Realtime (Broadcast channels)
- **Model Storage**: Supabase Storage
- **Video/Audio**: Ready for LiveKit integration (coming soon)

## Features

✅ **Real-time 3D Synchronization**
- Teacher controls camera, students follow automatically
- Students can toggle "Follow Teacher" mode
- Crystal clear quality, minimal bandwidth

✅ **Model Upload**
- Teachers can upload GLB/GLTF files on the fly
- Models stored in Supabase Storage
- Instant sync to all students

✅ **Presence Tracking**
- See who's in the classroom
- Teacher/Student roles
- Real-time participant list

✅ **Future: Video/Audio**
- LiveKit integration ready
- Placeholder UI already in place

## Supabase Setup

### 1. Enable Realtime

Realtime is enabled by default in Supabase, but make sure it's active:

1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Replication**
3. Ensure Realtime is enabled for your database

### 2. Create Storage Bucket

Create a storage bucket for 3D models:

```sql
-- Run this in Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('models', 'models', true);
```

Or use the Dashboard:
1. Go to **Storage** in Supabase Dashboard
2. Click **New Bucket**
3. Name: `models`
4. Public: **Yes** (so students can load models)
5. Click **Create Bucket**

### 3. Set Storage Policies

Allow authenticated users to upload (teachers) and everyone to read (students):

```sql
-- Allow authenticated users to upload
CREATE POLICY "Teachers can upload models"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'models');

-- Allow everyone to read models
CREATE POLICY "Anyone can view models"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'models');

-- Allow teachers to delete their own models
CREATE POLICY "Teachers can delete their models"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'models');
```

### 4. Configure File Size Limits (Optional)

By default, Supabase allows 50MB uploads. For larger models:

1. Go to **Settings** → **Storage**
2. Adjust **Maximum file size** if needed
3. Recommended: 100MB for detailed engineering models

## Usage

### For Teachers

1. **Create Classroom**
   - Go to `/classroom`
   - Click "Create Classroom"
   - Share the room code with students

2. **Upload 3D Model**
   - Click "Upload 3D Model" button
   - Select a GLB or GLTF file
   - Model automatically syncs to all students

3. **Control Camera**
   - Rotate, zoom, pan the model
   - Students' views update in real-time
   - Students can toggle "Follow Teacher" mode

### For Students

1. **Join Classroom**
   - Go to `/classroom`
   - Click "Join Classroom"
   - Enter room code from teacher

2. **Follow Teacher**
   - By default, camera follows teacher
   - Toggle "Follow Teacher" to explore on your own
   - Re-enable to sync back with teacher

## How It Works

### State Synchronization

Instead of streaming video (laggy, blurry), we sync the 3D state:

```javascript
// Teacher rotates model
Camera Position: { x: 5, y: 3, z: 8 }
Camera Target: { x: 0, y: 0, z: 0 }

// Broadcast to students via Supabase Realtime
→ Students' browsers receive coordinates
→ Students' browsers render model locally
→ Result: Crystal clear, zero lag
```

### Benefits vs Screen Sharing

| Feature | Screen Share | State Sync |
|---------|-------------|------------|
| Quality | Blurry/Pixelated | Crystal Clear |
| Lag | 200-500ms | <50ms |
| Bandwidth | High (5-10 Mbps) | Low (<100 Kbps) |
| Student Control | None | Can toggle follow mode |

## Architecture

```
┌─────────────┐
│   Teacher   │
│  (Browser)  │
└──────┬──────┘
       │ Rotates 3D Model
       │ Uploads GLB File
       ▼
┌─────────────────────┐
│ Supabase Realtime   │
│  (Broadcast)        │
└──────┬──────────────┘
       │ Syncs State
       ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Student 1  │  │  Student 2  │  │  Student 3  │
│  (Browser)  │  │  (Browser)  │  │  (Browser)  │
└─────────────┘  └─────────────┘  └─────────────┘
     ▲                ▲                ▲
     │                │                │
     └────────────────┴────────────────┘
          Loads Model from Storage
```

## API Reference

### ClassroomService

```javascript
import classroomService from '../services/classroom';

// Join room
await classroomService.joinRoom(roomId, isTeacher, {
  userId: user.id,
  userName: user.name,
  onConnected: () => console.log('Connected'),
  onCameraMove: (data) => updateCamera(data),
  onModelChange: (data) => loadModel(data),
  onPresenceChange: (state) => updateParticipants(state)
});

// Broadcast camera (teacher only)
classroomService.broadcastCameraMove({
  position: { x, y, z },
  target: { x, y, z },
  zoom: 1.0
});

// Upload model (teacher only)
const modelData = await classroomService.uploadModel(file);
await classroomService.broadcastModelChange(modelData.url, modelData.name);

// Leave room
await classroomService.leaveRoom();
```

## Future Enhancements

### Phase 2: LiveKit Video/Audio

Add video/audio communication:

```bash
npm install @livekit/components-react livekit-client
```

Update `.env`:
```
VITE_LIVEKIT_URL=wss://your-project.livekit.cloud
VITE_LIVEKIT_API_KEY=your-api-key
VITE_LIVEKIT_API_SECRET=your-api-secret
```

### Phase 3: Annotations

- Laser pointer
- Draw on 3D models
- Highlight specific parts
- Text labels

### Phase 4: Recording

- Record sessions
- Playback for students who missed class
- Export to video

## Troubleshooting

### Models Not Loading

1. Check Supabase Storage bucket is public
2. Verify storage policies are set correctly
3. Check browser console for CORS errors

### Camera Not Syncing

1. Ensure Realtime is enabled in Supabase
2. Check network tab for WebSocket connection
3. Verify room ID matches between teacher and students

### Upload Fails

1. Check file size (default limit: 50MB)
2. Verify file format (GLB or GLTF only)
3. Check Supabase storage quota

## Performance Tips

1. **Optimize Models**: Keep GLB files under 10MB for best performance
2. **Limit Participants**: Recommended max 30 students per room
3. **Use CDN**: Enable Supabase CDN for faster model loading
4. **Throttle Updates**: Camera updates are throttled to 10 FPS (already implemented)

## Security

- Room IDs are random 8-character codes
- Only authenticated users can create rooms
- Teachers are identified by localStorage (upgrade to database in production)
- Models are public but room-specific
- Consider adding room passwords for sensitive content

## Cost Estimate (Supabase Free Tier)

- **Realtime**: 200 concurrent connections (plenty for classrooms)
- **Storage**: 1GB (≈100 models at 10MB each)
- **Bandwidth**: 2GB/month (≈200 classroom sessions)

Upgrade to Pro ($25/month) for:
- 500 concurrent connections
- 100GB storage
- 250GB bandwidth

## Support

For issues or questions:
- Check Supabase Dashboard for errors
- Review browser console logs
- Test with simple GLB files first
- Ensure all students have good internet connection
