# 🗄️ Database Setup for Community System

## ⚠️ IMPORTANT: You must run this SQL before using the community!

### Step-by-Step Instructions

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Open your project

2. **Go to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy the SQL Schema**
   - Open the file `COMMUNITY_SCHEMA.sql` in this project
   - Copy ALL the content (Ctrl+A, Ctrl+C)

4. **Paste and Run**
   - Paste into the Supabase SQL Editor
   - Click "Run" button (or press Ctrl+Enter)
   - Wait for it to complete

5. **Verify Tables Created**
   - Go to "Table Editor" in Supabase
   - You should see these new tables:
     - `community_posts`
     - `community_comments`
     - `community_votes`

### ✅ Test It Works

1. Go to your app at `/community`
2. Click "Create Post"
3. Fill in title and content
4. Click "Create Post"
5. You should see your post appear!

### 🐛 If It Doesn't Work

**Error: "relation does not exist"**
- You haven't run the SQL schema yet
- Go back to step 1 and run it

**Error: "permission denied"**
- Check that you're logged in to your app
- The RLS policies require authentication

**Posts don't appear**
- Check the browser console for errors
- Make sure you ran the SQL schema
- Check Supabase logs for errors

### 📊 What the SQL Creates

- **Tables**: Posts, comments, votes
- **Indexes**: For fast searching
- **RLS Policies**: Security rules
- **Triggers**: Auto-update vote counts
- **Functions**: Helper functions

### 🎉 Once Set Up

The community will work perfectly:
- ✅ Create posts
- ✅ Vote on posts
- ✅ Filter by category/subject
- ✅ Search posts
- ✅ Real-time updates

**You only need to do this once!**


## Feedback Table (for user feedback widget)

```sql
-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  user_id UUID REFERENCES auth.users(id),
  user_email VARCHAR(255),
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (even anonymous)
CREATE POLICY "Anyone can submit feedback" ON feedback
  FOR INSERT WITH CHECK (true);

-- Only admins can read feedback
CREATE POLICY "Admins can read feedback" ON feedback
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
```
