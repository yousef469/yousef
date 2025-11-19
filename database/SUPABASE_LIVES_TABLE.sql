-- Create user_lives table for tracking game lives/hearts system
CREATE TABLE IF NOT EXISTS user_lives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lives INTEGER NOT NULL DEFAULT 5,
  max_lives INTEGER NOT NULL DEFAULT 5,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'starter', 'pro', 'master')),
  last_life_lost TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_lives_user_id ON user_lives(user_id);

-- Enable Row Level Security
ALTER TABLE user_lives ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own lives"
  ON user_lives FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own lives"
  ON user_lives FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lives"
  ON user_lives FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_user_lives_updated_at
  BEFORE UPDATE ON user_lives
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON user_lives TO authenticated;
GRANT ALL ON user_lives TO service_role;
