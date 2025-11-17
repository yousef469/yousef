# Collaborate Session Improvements Needed

## Issues to Fix:

### 1. Participant Count Glitch
- **Problem**: Shows 3 participants when only 2 are in the call
- **Cause**: Likely duplicate participant entries or not cleaning up properly
- **Fix**: Deduplicate participants by socketId, ensure proper cleanup on disconnect

### 2. Layout Restructure
- **Current**: Videos in grid layout across the screen
- **Needed**: 
  - Videos stacked vertically on RIGHT sidebar (like Zoom)
  - Main content area on LEFT for whiteboard/screen share
  - Whiteboard takes full left area when active

### 3. Host-Only Controls
- **Needed**:
  - Only host can share screen
  - Only host can open whiteboard
  - Only host can remove participants
  - Waiting room: Host approves new joiners
  - Other participants see "Waiting for host..." when host shares

### 4. Working Whiteboard
- **Current**: Canvas exists but no drawing functionality
- **Needed**:
  - Pen tool that actually draws
  - Eraser tool
  - Color picker
  - Clear button
  - Sync drawings to all participants via WebRTC data channels

### 5. Participant Management
- **Needed**:
  - Remove participant button (host only)
  - Waiting room queue
  - Approve/Deny buttons for waiting participants

## Implementation Priority:

1. **Fix participant duplication** (Critical - breaks UX)
2. **Layout restructure** (High - better UX)
3. **Working whiteboard** (High - core feature)
4. **Host-only controls** (Medium - security/control)
5. **Waiting room** (Low - nice to have)

## Next Steps:

Start with #1 and #2 as they're foundational, then add #3 (whiteboard), then #4 (permissions).
