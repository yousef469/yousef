# 🔐 API Key Security Issue - URGENT

## ⚠️ CRITICAL SECURITY PROBLEM

Your Gemini API key is currently **exposed in the frontend code**. This is a major security vulnerability.

### What Happened

1. **Old API Key Leaked:** `AIzaSyBnhkRzMRAtedkpKO3dFxke-W6rJc6V6-Q`
   - Someone found it in your frontend JavaScript
   - They abused it (made unauthorized requests)
   - Google detected the abuse and **permanently blocked** the key
   - Error: `403 PERMISSION_DENIED - Your API key was reported as leaked`

2. **New API Key Installed:** `AIzaSyAivJTVh9dfu8d5Tun0sD4fYgMLVANl6S4`
   - This is a temporary fix
   - **Still exposed in frontend** (same vulnerability)
   - Will likely be leaked again if not moved to backend

## Why Frontend API Keys Are Dangerous

When you make API calls directly from the browser:

```javascript
// ❌ INSECURE - Key visible to everyone
fetch(`https://generativelanguage.googleapis.com/v1/models/...?key=${API_KEY}`)
```

**Anyone can:**
- View your API key in browser DevTools (Network tab)
- Copy it from your bundled JavaScript
- Use it for their own projects
- Rack up charges on your account
- Get your key banned by Google

## ✅ PROPER SOLUTION: Backend Proxy

### Current Architecture (INSECURE)
```
Frontend → Gemini API (key exposed)
```

### Correct Architecture (SECURE)
```
Frontend → Your Backend → Gemini API (key hidden)
```

## Implementation Steps

### 1. Create Backend Endpoint

**File:** `server/gemini-proxy.js`

```javascript
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Store API key in environment variable (server-side only)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Proxy endpoint for Gemini Vision
router.post('/api/gemini/vision', async (req, res) => {
  try {
    const { prompt, images, maxTokens } = req.body;
    
    // Make request to Gemini (key never exposed to client)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] },
            { parts: images.map(img => ({ inline_data: img })) }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: maxTokens || 400,
            topK: 40,
            topP: 0.95
          }
        })
      }
    );
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

### 2. Update Frontend to Use Backend

**File:** `src/services/gemini.js`

```javascript
// ✅ SECURE - Call your backend instead of Gemini directly
export async function callGeminiVision(prompt, images, retries = 5, maxTokens = 400) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Call YOUR backend (not Gemini directly)
      const res = await fetch('/api/gemini/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, images, maxTokens })
      });
      
      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }
      
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn(`⚠️ Retry ${attempt} failed:`, err.message);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, attempt * 1000));
      }
    }
  }
  
  throw new Error("❌ Backend failed after all retries");
}
```

### 3. Set Environment Variable

**File:** `.env` (server-side, never commit to git)

```bash
GEMINI_API_KEY=AIzaSyAivJTVh9dfu8d5Tun0sD4fYgMLVANl6S4
```

**File:** `.gitignore`

```
.env
.env.local
.env.production
```

### 4. Deploy Backend

Make sure your backend server is running and accessible:

```bash
# Development
npm run dev

# Production (Vercel, Railway, etc.)
# Set GEMINI_API_KEY in platform environment variables
```

## Temporary Workaround (Current State)

For now, the new API key is hardcoded in `src/services/gemini.js`:

```javascript
const API_KEY = 'AIzaSyAivJTVh9dfu8d5Tun0sD4fYgMLVANl6S4';
```

**This works but is NOT secure.** Anyone can still steal this key.

## Action Items

- [ ] Create backend proxy endpoint
- [ ] Move API key to server environment variable
- [ ] Update frontend to call backend instead of Gemini
- [ ] Test the new flow
- [ ] Remove hardcoded API key from frontend
- [ ] Add `.env` to `.gitignore`
- [ ] Regenerate API key one more time (current one is already exposed)

## Monitoring

Watch for these signs of abuse:
- Unexpected API usage spikes
- 403 errors about leaked keys
- High costs on Google Cloud Console
- Rate limit errors

Check your usage at:
https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com

## Additional Security

1. **API Key Restrictions** (Google Cloud Console)
   - Restrict to specific domains
   - Restrict to specific APIs
   - Set usage quotas

2. **Rate Limiting** (Your Backend)
   - Limit requests per user
   - Implement authentication
   - Log all requests

3. **Monitoring**
   - Set up alerts for unusual usage
   - Review logs regularly
   - Rotate keys periodically

---

**Status:** ⚠️ TEMPORARY FIX APPLIED - Backend migration needed
**Priority:** 🔴 HIGH - Security vulnerability
**Date:** November 21, 2025
