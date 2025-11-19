-- Create table for tracking AI 3D generations
CREATE TABLE IF NOT EXISTS user_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL DEFAULT 'free',
  generations_used INTEGER NOT NULL DEFAULT 0,
  daily_generations_used INTEGER NOT NULL DEFAULT 0,
  max_generations INTEGER NOT NULL DEFAULT 21,
  max_daily_generations INTEGER NOT NULL DEFAULT 3,
  trial_start_date TIMESTAMP WITH TIME ZONE,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  last_generation_date DATE,
  last_reset_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_generations_user_id ON user_generations(user_id);

-- Enable Row Level Security
ALTER TABLE user_generations ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own data
CREATE POLICY "Users can view own generations"
  ON user_generations FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to update their own data
CREATE POLICY "Users can update own generations"
  ON user_generations FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own data
CREATE POLICY "Users can insert own generations"
  ON user_generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to reset daily generations at midnight
CREATE OR REPLACE FUNCTION reset_daily_generations()
RETURNS void AS $$
BEGIN
  UPDATE user_generations
  SET 
    daily_generations_used = 0,
    last_generation_date = CURRENT_DATE
  WHERE last_generation_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Function to reset monthly generations (for free tier after trial)
CREATE OR REPLACE FUNCTION reset_monthly_generations()
RETURNS void AS $$
BEGIN
  UPDATE user_generations
  SET 
    generations_used = 0,
    daily_generations_used = 0,
    trial_start_date = CURRENT_TIMESTAMP,
    trial_end_date = CURRENT_TIMESTAMP + INTERVAL '7 days',
    last_reset_date = CURRENT_DATE
  WHERE 
    tier = 'free' 
    AND trial_end_date < CURRENT_TIMESTAMP
    AND (last_reset_date IS NULL OR last_reset_date < DATE_TRUNC('month', CURRENT_DATE));
END;
$$ LANGUAGE plpgsql;

-- Instructions:
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Set up a cron job to run reset_daily_generations() daily at midnight
-- 3. Set up a cron job to run reset_monthly_generations() on the 1st of each month
-- 
-- To set up cron jobs in Supabase:
-- Go to Database > Extensions > Enable pg_cron
-- Then run:
-- 
-- SELECT cron.schedule(
--   'reset-daily-generations',
--   '0 0 * * *',  -- Every day at midnight
--   'SELECT reset_daily_generations();'
-- );
-- 
-- SELECT cron.schedule(
--   'reset-monthly-generations',
--   '0 0 1 * *',  -- First day of each month at midnight
--   'SELECT reset_monthly_generations();'
-- );
