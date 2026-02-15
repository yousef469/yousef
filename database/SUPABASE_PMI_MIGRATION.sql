-- Add Personal Meeting ID to users table
-- Run this in Supabase SQL Editor

-- Add personal_meeting_id column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS personal_meeting_id TEXT UNIQUE;

-- Generate PMI for existing users (10-digit number like Zoom)
UPDATE profiles 
SET personal_meeting_id = LPAD(FLOOR(RANDOM() * 10000000000)::TEXT, 10, '0')
WHERE personal_meeting_id IS NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_personal_meeting_id 
ON profiles(personal_meeting_id);

-- Function to generate PMI for new users
CREATE OR REPLACE FUNCTION generate_personal_meeting_id()
RETURNS TEXT AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 10000000000)::TEXT, 10, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate PMI for new users
CREATE OR REPLACE FUNCTION set_personal_meeting_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.personal_meeting_id IS NULL THEN
    NEW.personal_meeting_id := generate_personal_meeting_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_personal_meeting_id ON profiles;
CREATE TRIGGER trigger_set_personal_meeting_id
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_personal_meeting_id();
