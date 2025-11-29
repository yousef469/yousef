# XP & Leveling System Guide

## Overview
The XP system automatically tracks user progress and updates the leaderboard in real-time.

## XP Rewards

### Lessons & Quizzes
- **Complete Lesson**: 100 XP (base)
- **Quiz Score 60-79%**: +10 XP bonus
- **Quiz Score 80-99%**: +30 XP bonus  
- **Quiz Score 100%**: +50 XP bonus (Perfect!)

### Projects
- **Complete Career Project**: 200 XP
- Use: `awardProjectXP(projectId)`

### Community
- **Ask Question**: 10 XP
- **Helpful Answer**: 50 XP
- Use: `awardCommunityQuestionXP(questionId)` or `awardCommunityAnswerXP(answerId)`

### Daily Activity
- **Daily Streak**: 25 XP per day
- Use: `awardDailyStreakXP()`

## Leveling System
- **1000 XP = 1 Level**
- Level formula: `Math.floor(totalXP / 1000) + 1`
- Examples:
  - 0-999 XP = Level 1
  - 1000-1999 XP = Level 2
  - 2000-2999 XP = Level 3
  - 10,000 XP = Level 11

## How It Works

### 1. User Completes Activity
When a user completes a lesson, project, or community action, XP is awarded.

### 2. Database Updates
The `user_profiles` table in Supabase is updated with:
- `total_xp`: New total XP
- `level`: Calculated level
- `completed_lessons`: Array of completed lesson IDs
- `updated_at`: Timestamp

### 3. Leaderboard Updates
The leaderboard automatically fetches from Supabase and ranks users by `total_xp`.

## Usage Examples

### In a Lesson Component
```javascript
import { useProgress } from '../contexts/ProgressContext';

const { completeLesson } = useProgress();

// When lesson is completed
await completeLesson('rockets', lessonId, quizScore);
// XP is automatically awarded and profile updated
```

### In a Project Component
```javascript
import { useProgress } from '../contexts/ProgressContext';

const { awardProjectXP } = useProgress();

// When project is completed
await awardProjectXP('rocket-nozzle');
// Awards 200 XP
```

### In Community Features
```javascript
import { useProgress } from '../contexts/ProgressContext';

const { awardCommunityQuestionXP, awardCommunityAnswerXP } = useProgress();

// When user asks a question
await awardCommunityQuestionXP(questionId);

// When user provides helpful answer
await awardCommunityAnswerXP(answerId);
```

### Custom XP Award
```javascript
import { useProgress } from '../contexts/ProgressContext';

const { awardXP } = useProgress();

// Award custom XP for any activity
await awardXP(150, 'custom_activity', activityId);
```

## Database Schema

### user_profiles table
```sql
- user_id (uuid, primary key)
- total_xp (integer, default 0)
- level (integer, default 1)
- completed_lessons (text[], array of lesson IDs)
- streak (integer, default 0)
- created_at (timestamp)
- updated_at (timestamp)
```

## Leaderboard
- Fetches top 50 users by `total_xp`
- Updates in real-time when users gain XP
- Shows user's rank even if outside top 50
- Filters by timeframe (week, month, all-time)
- Filters by category (rockets, planes, cars, all)

## Testing
1. Complete a lesson → Check console for XP award
2. Check your profile → Should show updated XP and level
3. Open leaderboard → Should see your rank and XP
4. Complete more lessons → Watch your rank change

## Console Logs
The system logs XP awards:
```
✅ Awarded 100 XP for general. Total: 1250 XP, Level: 2
```

Check browser console (F12) to see XP updates in real-time.
