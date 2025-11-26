# 🧪 Testing Guide - Community & AI Tutor

## Quick Test Checklist

### ✅ AI Tutor - Context Awareness

#### Test 1: Home Page Context
1. Go to home page
2. Click the floating AI button (bottom right)
3. **Expected**: Header shows "Level X • Y XP"
4. Ask: "What can you help me with?"
5. **Expected**: General engineering tutor response

#### Test 2: Lesson Page Context
1. Navigate to any lesson (e.g., `/rockets/lesson/intro-to-rocketry`)
2. Open AI tutor
3. **Expected**: Header shows "📚 rockets lesson"
4. Ask: "Explain this concept"
5. **Expected**: Response specific to rockets engineering

#### Test 3: 3D Viewer Context
1. Navigate to `/explode-view`
2. Open AI tutor
3. **Expected**: Header shows "🧠 3D model analysis"
4. Ask: "What am I looking at?"
5. **Expected**: Response about 3D models and engineering specs

#### Test 4: Quick Help Buttons
1. Open AI tutor (should have no messages)
2. **Expected**: See 4 quick help buttons:
   - 📚 Explain Concept
   - 🧮 Help with Math
   - 📊 Draw Diagram
   - 🌍 Real Examples
3. Click any button
4. **Expected**: Input field fills with prompt

#### Test 5: Context Switching
1. Open AI tutor on home page
2. Navigate to a lesson page
3. **Expected**: Header updates to show lesson context
4. Navigate to 3D viewer
5. **Expected**: Header updates to show 3D context

---

### ✅ Community System

#### Test 1: Database Setup
1. Open Supabase dashboard
2. Go to SQL Editor
3. Copy contents of `COMMUNITY_SCHEMA.sql`
4. Run the SQL
5. **Expected**: No errors, tables created
6. Go to Table Editor
7. **Expected**: See `community_posts`, `community_comments`, `community_votes`

#### Test 2: View Community Page
1. Navigate to `/community`
2. **Expected**: See community page with tabs
3. **Expected**: See "Community Help" and "Community Projects" tabs
4. **Expected**: See search bar and filters
5. **Expected**: See community groups sidebar

#### Test 3: Create a Post
1. Click "Create Post" button
2. **Expected**: Modal opens
3. Fill in:
   - Title: "Test post about rockets"
   - Category: Question
   - Subject: Rockets
   - Content: "This is a test post"
4. Click "Create Post"
5. **Expected**: Modal closes, post appears in feed
6. Check Supabase
7. **Expected**: Post exists in `community_posts` table

#### Test 4: Vote on Post
1. Find a post in the feed
2. Click upvote arrow (↑)
3. **Expected**: Vote count increases by 1
4. Click upvote again
5. **Expected**: Vote count decreases by 1 (vote removed)
6. Click downvote arrow (↓)
7. **Expected**: Vote count decreases
8. Check Supabase `community_votes` table
9. **Expected**: Vote record exists

#### Test 5: Filter Posts
1. Select "Questions" from category dropdown
2. **Expected**: Only question posts shown
3. Select "Rockets" from subject dropdown
4. **Expected**: Only rocket posts shown
5. Type in search box
6. **Expected**: Posts filter as you type

#### Test 6: Switch Tabs
1. Click "Community Projects" tab
2. **Expected**: Shows project posts
3. Click "Community Help" tab
4. **Expected**: Shows question posts

#### Test 7: Join Communities
1. Look at sidebar "Popular Communities"
2. Click "Join" on a community
3. **Expected**: Button changes to "Joined"
4. **Expected**: Community appears in "Your Communities"
5. Click "Joined" again
6. **Expected**: Button changes back to "Join"

---

## 🐛 Common Issues & Solutions

### AI Tutor Issues

**Issue**: Context not showing
- **Check**: Is `useLocation()` imported?
- **Check**: Are you on a valid route?
- **Fix**: Refresh page

**Issue**: AI not responding
- **Check**: Is `VITE_GEMINI_API_KEY` set in `.env`?
- **Check**: Browser console for errors
- **Fix**: Verify API key is valid

**Issue**: Quick buttons not working
- **Check**: Are messages empty?
- **Fix**: Clear messages to see buttons

### Community Issues

**Issue**: Can't create posts
- **Check**: Is user authenticated?
- **Check**: Did you run `COMMUNITY_SCHEMA.sql`?
- **Check**: Supabase connection working?
- **Fix**: Check browser console for errors

**Issue**: Voting not working
- **Check**: Are triggers created in database?
- **Check**: Is user authenticated?
- **Fix**: Re-run SQL schema

**Issue**: Posts not appearing
- **Check**: RLS policies enabled?
- **Check**: Data exists in Supabase?
- **Fix**: Check Supabase logs

**Issue**: "Failed to create post" error
- **Check**: All required fields filled?
- **Check**: User has valid session?
- **Fix**: Try logging out and back in

---

## 📊 Success Metrics

### AI Tutor
- ✅ Context indicator changes based on page
- ✅ Responses mention current subject
- ✅ Quick buttons populate input
- ✅ Messages scroll automatically
- ✅ Can minimize/maximize

### Community
- ✅ Posts persist in database
- ✅ Vote counts update in real-time
- ✅ Filters work correctly
- ✅ Search returns relevant results
- ✅ Modal opens/closes smoothly
- ✅ Timestamps show relative time

---

## 🎯 User Acceptance Testing

### Scenario 1: New User Learning Rockets
1. User signs up
2. Navigates to rockets lesson
3. Opens AI tutor
4. Asks "What is delta-v?"
5. **Expected**: Context-aware explanation about rocket velocity

### Scenario 2: User Needs Help
1. User stuck on a problem
2. Goes to `/community`
3. Creates question post
4. Other users can see and vote
5. **Expected**: Post visible to community

### Scenario 3: User Exploring
1. User browses community
2. Finds interesting post
3. Upvotes it
4. Joins the community
5. **Expected**: Smooth, intuitive experience

---

## 🚀 Performance Testing

### AI Tutor
- Response time: < 3 seconds
- Context detection: Instant
- UI updates: Smooth animations
- Memory usage: Minimal

### Community
- Page load: < 2 seconds
- Post creation: < 1 second
- Vote update: < 500ms
- Search results: < 1 second

---

## ✅ Final Checklist

Before considering complete:
- [ ] AI tutor shows context on all pages
- [ ] AI responses are relevant to context
- [ ] Quick help buttons work
- [ ] Database tables created
- [ ] Can create posts
- [ ] Can vote on posts
- [ ] Filters work
- [ ] Search works
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Data persists in Supabase

---

**If all tests pass, you're ready to launch! 🎉**
