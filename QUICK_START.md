# 🚀 Quick Start - Community & AI Tutor

## ⚡ 2-Minute Setup

### AI Tutor (Already Working! ✅)
No setup needed - just use it!

1. Navigate to any page
2. Click floating AI button (bottom right)
3. Ask questions!

**Context-aware on:**
- Lesson pages → Shows subject context
- 3D viewer → Shows model analysis mode
- Game maps → Shows learning path mode

---

### Community System (5-Minute Setup)

#### Step 1: Database Setup
```bash
1. Open Supabase dashboard
2. Go to SQL Editor
3. Copy all content from COMMUNITY_SCHEMA.sql
4. Click "Run"
5. Done! ✅
```

#### Step 2: Test It
```bash
1. Navigate to /community
2. Click "Create Post"
3. Fill in title and content
4. Click "Create Post"
5. Try voting on your post
6. Done! ✅
```

---

## 🎯 What You Get

### AI Tutor Features
✅ Knows what page you're on
✅ Understands what subject you're studying
✅ Uses your progress (level, XP)
✅ Gives better, more relevant answers
✅ Quick help buttons for common questions

### Community Features
✅ Create posts (questions, projects, designs)
✅ Vote on posts (upvote/downvote)
✅ Filter by category and subject
✅ Search posts
✅ Join communities
✅ Real-time updates

---

## 📁 Key Files

```
src/components/FloatingAIHelper.jsx  → AI Tutor
src/pages/CommunityPage.jsx          → Community UI
src/services/community.js            → Database operations
COMMUNITY_SCHEMA.sql                 → Run this in Supabase!
```

---

## 🧪 Quick Test

### Test AI Tutor (30 seconds)
1. Go to any rockets lesson
2. Open AI tutor
3. Check header says "🚀 rockets lesson"
4. Ask "Explain delta-v"
5. Should get rocket-specific answer ✅

### Test Community (1 minute)
1. Go to `/community`
2. Create a test post
3. Upvote it
4. Check Supabase → see post in database ✅

---

## 🐛 Troubleshooting

**AI not responding?**
→ Check `.env` has `VITE_GEMINI_API_KEY`

**Can't create posts?**
→ Run `COMMUNITY_SCHEMA.sql` in Supabase

**Voting not working?**
→ Check you're logged in

---

## 📚 Full Documentation

- `COMMUNITY_SETUP_GUIDE.md` - Detailed setup
- `TESTING_GUIDE.md` - Complete testing checklist
- `FEATURES_SUMMARY.md` - Feature overview
- `IMPLEMENTATION_COMPLETE.md` - Technical details

---

## ✅ Done!

Both features are ready to use. Just run the SQL schema and you're good to go! 🎉

**Questions?** Check the documentation files above.
