# Current Issues Summary - For ChatGPT Help

## Project: Engineerium - Engineering Education Platform
**Tech Stack:** React, Three.js, WebRTC, Supabase, Vercel

---

## ✅ WHAT WE COMPLETED

### 1. 3D Annotation System (Partially Working)
**Files Created:**
- `src/components/AnnotationCanvas.jsx` - Canvas overlay with drawing tools
- `src/components/ThreeJSViewerSynced.jsx` - Wrapper for synced 3D viewer
- Updated `src/pages/CollaborateSessionPage.jsx` - Integrated annotations

**What Works:**
- ✅ Annotation canvas component created
- ✅ Drawing toolbar UI (pen, arrow, circle, eraser, color picker)
- ✅ WebRTC message handlers for annotation sync
- ✅ Z-index fixed so toolbar is visible

**What's NOT Working:**
- ❌ Drawing tools don't actually draw on the canvas when clicked
- ❌ Annotations don't sync between host and joiners
- ❌ Camera synchronization not working (tries to access non-existent Three.js refs)

### 2. Gemini AI Chat (Fixed API Key, Still Testing)
**Files:**
- `src/services/gemini.js`
- `src/components/FloatingAIHelper.jsx`

**What We Did:**
- ✅ Updated API key to new one: `AIzaSyBnhkRzMRAtedkpKO3dFxke-W6rJc6V6-Q`
- ✅ Changed model from `gemini-1.5-flash` to `gemini-2.5-flash`
- ✅ Using v1 API endpoint

**Status:** Waiting for Vercel deployment to test if new API key works

---

## ❌ MAIN PROBLEMS TO FIX

### Problem 1: Annotation Drawing Not Working
**Issue:** User clicks pen/arrow/circle tools but nothing draws on the canvas

**Possible Causes:**
1. Mouse event handlers in `AnnotationCanvas.jsx` might not be triggering
2. Canvas context might not be initialized properly
3. Drawing logic might have bugs

**What to Check:**
- Are `handleMouseDown`, `handleMouseMove`, `handleMouseUp` functions working?
- Is the canvas ref properly initialized?
- Are the drawing functions (`drawArrow`, `drawCircle`) being called?

**Files to Debug:**
- `src/components/AnnotationCanvas.jsx` (lines 120-170 - mouse handlers)

### Problem 2: 3D Model Loading Slow / "Disappearing"
**Issue:** 3D models take time to load and user thinks they disappeared

**Solution Needed:**
- Add a loading spinner/indicator while model loads
- Show "Loading 3D model..." text

**File to Modify:**
- `src/components/ThreeJSViewer.jsx` (around line 494 where `loader.load()` is called)

**What to Add:**
```jsx
// Add loading state
const [isLoading, setIsLoading] = useState(true);

// In loader.load():
loader.load(
  modelInfo.path,
  (gltf) => {
    setIsLoading(false); // Model loaded
    // ... rest of code
  },
  (progress) => {
    // Show progress
  },
  (error) => {
    setIsLoading(false);
    console.error('Model load error:', error);
  }
);

// In return:
{isLoading && (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
    <div className="text-white">Loading 3D model...</div>
  </div>
)}
```

### Problem 3: Camera Sync Not Working
**Issue:** Code tries to access `canvas.__camera` and `canvas.__controls` which don't exist

**Current Code (BROKEN):**
```javascript
const camera = viewer.querySelector('canvas')?.__camera;
const controls = viewer.querySelector('canvas')?.__controls;
```

**Solution Needed:**
- Expose camera and controls refs from `ThreeJSViewer.jsx`
- Pass them up to `ThreeJSViewerSynced.jsx`
- Use proper React refs instead of DOM queries

**Files to Modify:**
- `src/components/ThreeJSViewer.jsx` - Expose refs
- `src/components/ThreeJSViewerSynced.jsx` - Use exposed refs

---

## 🎯 PRIORITY FIXES (In Order)

### 1. **HIGH PRIORITY: Make Drawing Work**
The annotation toolbar is visible but clicking tools doesn't draw anything.

**Debug Steps:**
1. Add `console.log()` in `handleMouseDown` to see if it's called
2. Check if `isDrawing` state changes
3. Verify canvas context is valid
4. Test if drawing functions are called

### 2. **MEDIUM PRIORITY: Add Loading Indicator**
Users think model disappeared when it's just loading.

**Implementation:**
- Add loading state to ThreeJSViewer
- Show spinner while model loads
- Hide spinner when model renders

### 3. **LOW PRIORITY: Fix Camera Sync**
Camera sync is nice-to-have but not critical for basic annotation functionality.

**Implementation:**
- Expose camera/controls refs from ThreeJSViewer
- Update ThreeJSViewerSynced to use refs properly

---

## 📁 KEY FILES TO FOCUS ON

1. **`src/components/AnnotationCanvas.jsx`** (Main issue)
   - Lines 120-170: Mouse event handlers
   - Lines 80-120: Drawing functions
   - Need to debug why drawing doesn't work

2. **`src/components/ThreeJSViewer.jsx`**
   - Line 494: Model loading (add loading state here)
   - Need to expose camera/controls refs

3. **`src/components/ThreeJSViewerSynced.jsx`**
   - Lines 30-70: Camera sync code (currently broken)
   - Need to fix ref access

4. **`src/pages/CollaborateSessionPage.jsx`**
   - Lines 150-200: WebRTC annotation handlers
   - Should be working once drawing works

---

## 🔍 DEBUGGING QUESTIONS FOR CHATGPT

1. **Why aren't the mouse events triggering drawing in AnnotationCanvas.jsx?**
   - The toolbar is visible and clickable
   - But clicking pen/arrow/circle and trying to draw does nothing
   - Need to debug the mouse event handlers

2. **How to properly expose Three.js camera and controls refs from a child component?**
   - ThreeJSViewer creates camera and controls
   - ThreeJSViewerSynced needs to access them
   - Current approach using DOM queries doesn't work

3. **Best way to add loading state to Three.js GLTFLoader?**
   - Need to show loading indicator while model loads
   - Should hide when model is rendered
   - How to handle loading errors?

---

## 💡 WHAT USER EXPECTS

**User wants to:**
1. Start a collaboration session as host
2. Upload a 3D model (rocket, car, plane)
3. See drawing tools at bottom of screen ✅ (This works now!)
4. Click pen tool and draw on the 3D model ❌ (This doesn't work)
5. Draw arrows pointing to parts ❌ (This doesn't work)
6. Draw circles around areas ❌ (This doesn't work)
7. Joiners see the drawings in real-time ❌ (Can't test until drawing works)

**Current Status:**
- Toolbar visible ✅
- Tools clickable ✅
- Drawing functionality broken ❌
- Real-time sync not tested yet ❌

---

## 🚀 NEXT STEPS

1. **Debug AnnotationCanvas mouse handlers** - Add console.logs to see what's happening
2. **Fix drawing logic** - Make sure canvas context is working
3. **Test drawing locally** - Verify pen/arrow/circle tools work
4. **Add loading indicator** - Show spinner while 3D model loads
5. **Test WebRTC sync** - Once drawing works, test between host and joiner
6. **Fix camera sync** - Expose refs properly (optional, lower priority)

---

## 📝 NOTES

- The annotation system architecture is correct
- The UI is properly structured
- The WebRTC messages are set up
- The main issue is the drawing logic not executing
- Once drawing works, everything else should fall into place

**Deployment:** Changes are automatically deployed to Vercel when pushed to GitHub main branch.
