# 🚀 Community System & AI Tutor Setup Guide

## Overview
This guide will help you set up the enhanced AI tutor and community system for Engineerium.

---

## 🤖 AI Tutor (Context-Aware)

### Features Implemented
✅ **Context Detection** - Automatically detects current page (lesson, 3D viewer, game map)
✅ **Subject Awareness** - Knows if user is studying rockets, cars, planes, etc.
✅ **Progress Integration** - Uses user level, XP, and completed lessons
✅ **Smart Prompts** - Builds context-aware prompts for better responses
✅ **Quick Help Buttons** - Pre-made prompts for common questions
✅ **Visual Context Indicators** - Shows current context in header

### How It Works
The AI tutor now:
1. Detects what page the user is on using `useLocation()`
2. Identifies the subject they're studying
3. Accesses their progress data (level, XP, completed lessons)
4. Builds a context-aware prompt that includes all this information
5. Provides more relevant, specific answers

### Example Context Prompts
- **On Lesson Page**: "The user is studying a rockets lesson. They are at level 5 with 1200 XP..."
- **On 3D Viewer**: "The user is viewing a 3D model. Help them understand engineering specifications..."
- **On Game Map**: "The user is choosing lessons. Help them understand the learning path..."

### No Additional Setup Required
The AI tutor is already integrated and will work automatically once users are on different pages!

---

## 👥 Community System

### Features Implemented
✅ **Posts** - Users can create questions, designs, projects, discussions
✅ **Voting** - Upvote/downvote posts
✅ **Categories** - Question, Design, Project, Discussion
✅ **Subjects** - Rockets, Cars, Planes, Electronics, Mathematics, Physics
✅ **Search & Filters** - Advanced filtering
✅ **Real-time Updates** - Live vote counts

### Database Setup (Supabase)

#### Step 1: Run SQL Schema
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `COMMUNITY_SCHEMA.sql`
4. Copy and paste the entire SQL code
5. Click **Run** to create all tables, indexes, and policies

#### Step 2: Verify Tables Created
Check that these tables exist in your database:
- `community_posts`
- `community_comments`
- `community_votes`

#### Step 3: Test the System
1. Navigate to `/community` in your app
2. Try creating a post
3. Try voting on posts
4. Check that data appears in Supabase

### Database Schema Overview

```
community_posts
├── id (UUID)
├── user_id (UUID) → auth.users
├── title (TEXT)
├── content (TEXT)
├── category (TEXT) → question, design, project, discussion
├── subject (TEXT) → rockets, cars, planes, electronics, mathematics, physics
├── upvotes (INTEGER)
├── downvotes (INTEGER)
├── views (INTEGER)
├── is_solved (BOOLEAN)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

community_comments
├── id (UUID)
├── post_id (UUID) → community_posts
├── user_id (UUID) → auth.users
├── parent_id (UUID) → community_comments (for nested replies)
├── content (TEXT)
├── upvotes (INTEGER)
├── downvotes (INTEGER)
├── is_solution (BOOLEAN)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

community_votes
├── id (UUID)
├── user_id (UUID) → auth.users
├── post_id (UUID) → community_posts
├── comment_id (UUID) → community_comments
├── vote_type (TEXT) → up, down
└── created_at (TIMESTAMP)
```

### Security (Row Level Security)
✅ Everyone can read posts and comments
✅ Only authenticated users can create posts/comments
✅ Users can only edit/delete their own content
✅ Users can only manage their own votes

### Automatic Features
✅ Vote counts update automatically via database triggers
✅ Timestamps update automatically
✅ User permissions enforced by RLS policies

---

## 🎨 UI Components

### Community Page (`/community`)
- Reddit-style interface
- Post creation modal
- Voting system
- Subject filtering
- Search functionality
- Community groups sidebar

### AI Tutor (Floating Button)
- Always accessible via floating button
- Context-aware header
- Quick help buttons
- Message history
- Minimize/maximize functionality

---

## 🧪 Testing Checklist

### AI Tutor Testing
- [ ] Open AI tutor on home page
- [ ] Navigate to a lesson page and check context indicator
- [ ] Ask a question and verify context-aware response
- [ ] Try quick help buttons
- [ ] Test on 3D viewer page
- [ ] Test on game map page

### Community Testing
- [ ] Create a new post
- [ ] Upvote a post
- [ ] Downvote a post
- [ ] Filter by category
- [ ] Filter by subject
- [ ] Search for posts
- [ ] Join/leave communities
- [ ] Verify posts appear in Supabase

---

## 🚀 Deployment Notes

### Environment Variables Required
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Files Modified
- `src/components/FloatingAIHelper.jsx` - Enhanced with context awareness
- `src/pages/CommunityPage.jsx` - Full community system
- `src/services/community.js` - Database operations
- `src/App.jsx` - Updated route

### Files Created
- `COMMUNITY_SCHEMA.sql` - Database schema
- `COMMUNITY_SETUP_GUIDE.md` - This guide

---

## 📊 Future Enhancements

### Community System
- [ ] Comments on posts
- [ ] Nested replies
- [ ] User profiles with reputation
- [ ] Badges and achievements
- [ ] Post bookmarking
- [ ] Notifications
- [ ] Image uploads
- [ ] Code syntax highlighting
- [ ] Markdown support

### AI Tutor
- [ ] Voice input/output
- [ ] Image analysis (diagrams, equations)
- [ ] Multi-turn conversations with memory
- [ ] Personalized learning recommendations
- [ ] Quiz generation
- [ ] Code execution for programming lessons

---

## 🐛 Troubleshooting

### AI Tutor Issues
**Problem**: Context not detected
- **Solution**: Check that `useLocation()` is working and routes match patterns

**Problem**: API rate limit errors
- **Solution**: Implement request throttling or upgrade Gemini API tier

### Community Issues
**Problem**: Posts not appearing
- **Solution**: Check Supabase connection and RLS policies

**Problem**: Voting not working
- **Solution**: Verify triggers are created and user is authenticated

**Problem**: Permission errors
- **Solution**: Check RLS policies and user authentication

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify Supabase tables and policies
3. Test API keys in `.env`
4. Check network tab for failed requests

---

## ✅ Success Criteria

You'll know everything is working when:
- ✅ AI tutor shows context-specific information in header
- ✅ AI responses are more relevant to current page
- ✅ Users can create posts in community
- ✅ Voting updates in real-time
- ✅ Posts persist in Supabase database
- ✅ Filters and search work correctly

---

**Ready to launch! 🚀**
