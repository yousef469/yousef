-- Initialize user data for existing users
-- Replace YOUR_USER_ID with your actual user ID: 44d662b5-aad3-460b-ba60-17207c7336fb

-- Insert into user_generations (if not exists)
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
)
ON CONFLICT (user_id) DO NOTHING;

-- Insert into user_streaks (if not exists)
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
)
ON CONFLICT (user_id) DO NOTHING;

-- Insert into user_stats (if not exists)
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
)
ON CONFLICT (user_id) DO NOTHING;

-- Insert into user_xp (if not exists)
INSERT INTO user_xp (
  user_id,
  total_xp,
  current_rank,
  rank_level,
  lessons_completed,
  quizzes_completed,
  perfect_quizzes,
  units_completed,
  levels_completed
)
VALUES (
  '44d662b5-aad3-460b-ba60-17207c7336fb',
  0,
  'Student',
  1,
  0,
  0,
  0,
  0,
  0
)
ON CONFLICT (user_id) DO NOTHING;
