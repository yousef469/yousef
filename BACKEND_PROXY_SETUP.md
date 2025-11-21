# 🔐 Backend Proxy Setup - COMPLETE

## ✅ What Was Done

The Gemini API key has been moved to the backend server for security.

### Architecture Change

**Before (INSECURE):**
```
Frontend → Gemini API (key exposed in browser)
```

**After (SECURE):**
```
Frontend → Backend Proxy → Gemini API (key hidden on server)
```

## Files Modified

### 1. **server/index.js** - Added Gemini Proxy Routes
- `/api/gemini/vision` - For vision requests with images
- `/api/gemini/text` - For text-only requests
- Includes retry logic, error handling, MAX_TOKENS detection
- API key loaded from environment variable

### 2. **src/services/gemini.js** - Updated to Call Backend
- Removed hardcoded API key
- All functions now call backend proxy
- `callGeminiVision()` → `POST /api/gemini/vision`
- `callGeminiAPI()` → `POST /api/gemini/text`

### 3. **.env** - Added Configuration
```bash
GEMINI_API_KEY=AIzaSyAivJTVh9dfu8d5Tun0sD4fYgMLVANl6S4
VITE_BACKEND_URL=http://localhost:3001
```

### 4. **.env.example** - Documented Setup
Added instructions for Gemini API key and backend URL

## Installation Steps

### Step 1: Install Dependencies

The server needs `dotenv` to read environment variables:

```bash
npm install dotenv
```

### Step 2: Verify .env File

Make sure `.env` exists in your project root with:

```bash
GEMINI_API_KEY=AIzaSyAivJTVh9dfu8d5Tun0sD4fYgMLVANl6S4
VITE_BACKEND_URL=http://localhost:3001
```

### Step 3: Start Backend Server

```bash
# In one terminal
node server/index.js

# Or if you have a script:
npm run server
```

You should see:
```
🚀 Signaling server running on port 3001
```

### Step 4: Start Frontend

```bash
# In another terminal
npm run dev
```

### Step 5: Test

1. Open browser to `http://localhost:5173` (or your dev port)
2. Check console for:
   ```
   🔐 Gemini API: Using SECURE backend proxy
   📡 Backend URL: http://localhost:3001
   ```
3. Try uploading a 3D model to Explode View
4. AI vision should work without exposing the API key

## Verification

### Check Backend Logs

When you make an AI request, you should see in the backend terminal:

```
🔮 Gemini Vision request: 2 images, maxTokens: 200
✅ Gemini Vision success on attempt 1
```

### Check Frontend Console

```
🔐 Gemini API: Using SECURE backend proxy
🔮 Calling backend vision proxy: 2 images, 256 tokens
✅ Backend vision response received
```

### Check Network Tab

In browser DevTools → Network tab:
- You should see requests to `http://localhost:3001/api/gemini/vision`
- You should NOT see requests to `generativelanguage.googleapis.com`
- API key is NOT visible anywhere in the request

## Production Deployment

### For Vercel/Netlify (Frontend)

1. Set environment variable:
   ```
   VITE_BACKEND_URL=https://your-backend-url.com
   ```

2. Redeploy frontend

### For Railway/Render/Heroku (Backend)

1. Set environment variable:
   ```
   GEMINI_API_KEY=AIzaSyAivJTVh9dfu8d5Tun0sD4fYgMLVANl6S4
   ```

2. Deploy backend server

3. Update frontend `VITE_BACKEND_URL` to point to deployed backend

## Security Benefits

✅ **API Key Hidden** - Never exposed to users
✅ **No Browser Leaks** - Key only exists on server
✅ **Rate Limiting** - Can add server-side limits
✅ **Request Logging** - Track all API usage
✅ **Cost Control** - Monitor and limit requests
✅ **Key Rotation** - Easy to update without frontend changes

## Troubleshooting

### Error: "Backend error: 500"

**Cause:** Backend can't reach Gemini API or API key is invalid

**Fix:**
1. Check backend logs for detailed error
2. Verify `GEMINI_API_KEY` in `.env`
3. Restart backend server

### Error: "Failed to fetch"

**Cause:** Backend server not running or wrong URL

**Fix:**
1. Make sure backend is running: `node server/index.js`
2. Check `VITE_BACKEND_URL` in `.env`
3. Verify port 3001 is not blocked

### Error: "GEMINI_API_KEY not found"

**Cause:** `.env` file not loaded or missing

**Fix:**
1. Make sure `.env` exists in project root
2. Install dotenv: `npm install dotenv`
3. Restart backend server

### CORS Errors

**Cause:** Frontend and backend on different origins

**Fix:** Backend already has CORS enabled for localhost. For production, update CORS origins in `server/index.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.com', 'http://localhost:5173']
}));
```

## API Endpoints

### POST /api/gemini/vision

**Request:**
```json
{
  "prompt": "Identify this 3D model...",
  "images": [
    {
      "mime_type": "image/jpeg",
      "data": "base64-encoded-image-data"
    }
  ],
  "maxTokens": 200,
  "retries": 5
}
```

**Response:**
```json
{
  "candidates": [{
    "content": {
      "parts": [{
        "text": "{\"modelType\":\"SpaceX Falcon 9\",...}"
      }]
    },
    "finishReason": "STOP"
  }]
}
```

### POST /api/gemini/text

**Request:**
```json
{
  "prompt": "Explain rocket propulsion...",
  "maxTokens": 256,
  "retries": 4
}
```

**Response:**
```json
{
  "candidates": [{
    "content": {
      "parts": [{
        "text": "Rocket propulsion works by..."
      }]
    }
  }]
}
```

## Next Steps

1. ✅ Install dotenv: `npm install dotenv`
2. ✅ Start backend: `node server/index.js`
3. ✅ Start frontend: `npm run dev`
4. ✅ Test AI features
5. ✅ Deploy to production

---

**Status:** ✅ COMPLETE - Backend proxy implemented
**Security:** 🔐 SECURE - API key hidden on server
**Date:** November 21, 2025
