# 🧪 Test Curriculum Loading

## Issue
Lessons appear empty or locked even though code is correct.

## Root Cause
Your dev server (`npm run dev`) is running with old cached code. The new curriculum files haven't been loaded yet.

## Solution

### Step 1: Stop Dev Server
In your terminal where `npm run dev` is running:
- Press `Ctrl + C` to stop the server

### Step 2: Clear Cache (Optional but Recommended)
```bash
# Delete node_modules/.vite folder
rm -rf node_modules/.vite

# Or on Windows:
rmdir /s /q node_modules\.vite
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

### Step 4: Hard Refresh Browser
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

## Verify It Works

1. Go to `http://localhost:5173/learn/hub`
2. You should see all 6 units
3. Click "Introduction to Engineering" (Unit 1)
4. You should see 6 lessons, ALL UNLOCKED
5. Click "What Engineers Do" (Lesson 1)
6. You should see full content with sections
7. Click "Take Quiz" at the end
8. You should see 5 questions

## What You Should See

### Learning Hub (`/learn/hub`)
- 6 colorful unit cards
- All marked as unlocked
- Each shows "6 Lessons"

### Unit Overview (`/learn/unit/1`)
- 6 lesson cards
- All unlocked (no lock icons)
- Each shows duration and quiz count
- "Start Lesson" button on each

### Lesson Page (`/learn/beginner/lesson/0`)
- Lesson title and emoji
- Introduction paragraph
- Multiple content sections
- Key takeaways
- Vocabulary
- "Take Quiz" button

### Quiz Page (`/learn/beginner/quiz/0`)
- 5 questions
- Multiple choice and true/false
- Progress bar
- Results screen with XP earned

## If Still Not Working

### Check Console
Open browser console (F12) and look for errors:
- Import errors?
- Module not found?
- Syntax errors?

### Verify Files Exist
```bash
ls src/data/curriculum/lessons/
# Should show: unit1.js unit2.js unit3.js unit4.js unit5.js unit6.js

ls src/data/curriculum/quizzes/
# Should show: unit1.js unit2.js unit3.js unit4.js unit5.js unit6.js
```

### Test Import
Create a test file:
```javascript
// test.js
import curriculum from './src/data/curriculum/index.js';
console.log('Unit 1 lessons:', curriculum.unit1.length);
console.log('First lesson:', curriculum.unit1[0].title);
```

Run: `node test.js`

Should output:
```
Unit 1 lessons: 6
First lesson: What Engineers Do
```

## Current Status

✅ All files created and committed
✅ All 36 lessons with content
✅ All 36 quizzes with questions
✅ All lessons set to unlocked
✅ Code pushed to GitHub

❌ Dev server needs restart to load new code

## Quick Fix

**Just restart your dev server!**

```bash
# Stop: Ctrl+C
# Start: npm run dev
# Refresh browser: Ctrl+Shift+R
```

That's it! 🚀
