-- Complete fix for 406 errors
-- This will drop and recreate tables with proper structure

-- Drop existing tables
DROP TABLE IF EXISTS user_generations CASCADE;
DROP TABLE IF EXISTS user_streaks CASCADE;
DROP TABLE IF EXISTS user_stats CASCADE;

-- Create user_generations table with correct structure
CREATE TABLE user_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT DEFAULT 'free',
  generations_used INTEGER DEFAULT 0,
  daily_generations_used INTEGER DEFAULT 0,
  max_generations INTEGER DEFAULT 21,
  max_daily_generations INTEGER DEFAULT 3,
  trial_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  trial_end_date TIMESTAMP WITH TIME ZONE,
  last_generation_date DATE DEFAULT CURRENT_DATE,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_streaks table with correct structure
CREATE TABLE user_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_stats table with correct structure
CREATE TABLE user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_time_spent INTEGER DEFAULT 0,
  average_quiz_score DECIMAL(5,2) DEFAULT 0.0,
  total_stars INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for user_generations
CREATE POLICY "Users can view own generations" ON user_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations" ON user_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generations" ON user_generations
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for user_streaks
CREATE POLICY "Users can view own streaks" ON user_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks" ON user_streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON user_streaks
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for user_stats
CREATE POLICY "Users can view own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON user_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- Initialize data for current user (replace with your user ID)
INSERT INTO user_generations (
  user_id,
  tier,
  generations_used,
  daily_generations_used,
  max_generations,
  max_daily_generations,
  trial_start_date,
  trial_end_date,
  last_generation_date,
  last_reset_date
)
VALUES (
  '44d662b5-aad3-460b-ba60-17207c7336fb',
  'free',
  0,
  0,
  21,
  3,
  NOW(),
  NOW() + INTERVAL '7 days',
  CURRENT_DATE,
  CURRENT_DATE
);

INSERT INTO user_streaks (
  user_id,
  current_streak,
  longest_streak,
  last_activity_date
)
VALUES (
  '44d662b5-aad3-460b-ba60-17207c7336fb',
  0,
  0,
  CURRENT_DATE
);

INSERT INTO user_stats (
  user_id,
  total_time_spent,
  average_quiz_score,
  total_stars,
  coins
)
VALUES (
  '44d662b5-aad3-460b-ba60-17207c7336fb',
  0,
  0.0,
  0,
  0
);
