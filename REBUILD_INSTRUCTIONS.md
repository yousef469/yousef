# 🔄 Rebuild Required - Cached Old API Key

## Problem

Your browser is loading **old cached JavaScript** with the blocked API key.

**Evidence:**
```
POST ...?key=AIzaSyBnhkRzMRAtedkpKO3dFxke-W6rJc6V6-Q 403 (Forbidden)
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    This is the OLD BLOCKED key
```

**Source code has CORRECT key:**
```javascript
const API_KEY = 'AIzaSyAivJTVh9dfu8d5Tun0sD4fYgMLVANl6S4';
                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 This is the NEW ACTIVE key
```

## Solution: Rebuild Application

### Step 1: Stop Dev Server
Press `Ctrl+C` in the terminal running your dev server

### Step 2: Clear Cache (Optional but Recommended)
```bash
# Delete build artifacts
rm -rf dist/
rm -rf node_modules/.vite/

# Or on Windows PowerShell:
Remove-Item -Recurse -Force dist/
Remove-Item -Recurse -Force node_modules/.vite/
```

### Step 3: Rebuild
```bash
npm run build
```

### Step 4: Restart Dev Server
```bash
npm run dev
```

### Step 5: Hard Refresh Browser
- **Windows:** `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`
- **Or:** Open DevTools → Right-click refresh button → "Empty Cache and Hard Reload"

## Verification

After rebuild, check the browser console. You should see:

✅ **CORRECT (New Key):**
```javascript
🔑 API Key Status [✅ NEW KEY ACTIVE - Nov 21, 2025]: {
  exists: true,
  length: 39,
  startsWithAIza: true,
  firstChars: 'AIzaSyAivJ...',
  lastChars: '...l6S4',
  isNewKey: true  // ← Should be true
}
```

❌ **WRONG (Old Key - Still Cached):**
```javascript
🔑 API Key Status: {
  firstChars: 'AIzaSyBnhk...',
  lastChars: '...V6-Q',
  isNewKey: false  // ← Would be false
}
```

## Test API Call

After rebuild, try uploading a 3D model to the Explode View page.

**Expected:**
- ✅ No 403 errors
- ✅ Model identification works
- ✅ Part analysis works
- ✅ AI vision responds

**If still getting 403:**
- Check Network tab in DevTools
- Look at the `?key=` parameter in the request URL
- Should end with `...l6S4` (new key), not `...V6-Q` (old key)

## Alternative: Check Deployed Version

If you're testing a deployed version (Vercel, Netlify, etc.):

1. Trigger a new deployment
2. Wait for build to complete
3. Clear browser cache
4. Visit the new deployment URL

The deployment will use the latest code from git (which has the new key).

## Why This Happens

**Build Process:**
```
Source Code (gemini.js) → Bundler (Vite) → Bundled JS (index-XXX.js) → Browser Cache
```

When you update source code, the bundler needs to:
1. Re-read the source files
2. Re-bundle everything
3. Generate new output files
4. Browser needs to fetch new files (not use cache)

**Your situation:**
- ✅ Source code updated (new key in gemini.js)
- ❌ Bundle not regenerated (still has old key)
- ❌ Browser using old cached bundle

## Quick Check

Run this to see what's in your current build:

```bash
# Check if dist/ folder exists and when it was last modified
ls -la dist/

# Search for the API key in built files (if dist/ exists)
grep -r "AIzaSyBnhk" dist/  # Should find nothing after rebuild
grep -r "AIzaSyAivJ" dist/  # Should find the new key after rebuild
```

---

**Status:** Source code is correct, rebuild required
**Priority:** 🔴 HIGH - Cannot use app until rebuilt
**Date:** November 21, 2025
