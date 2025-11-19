# Free Tier Setup Guide - 7-Day Trial System

## Overview
The free tier now offers a **7-day trial** with **3 AI generations per day** (21 total for the week). After the trial ends, users must upgrade or wait until next month for a new trial period.

## Database Setup

### 1. Create the Generations Table

Run the SQL in `SUPABASE_GENERATIONS_TABLE.sql` in your Supabase SQL Editor:

```bash
# The file contains:
- user_generations table schema
- Row Level Security policies
- Daily reset function
- Monthly reset function
```

### 2. Enable pg_cron Extension

In Supabase Dashboard:
1. Go to **Database** → **Extensions**
2. Search for `pg_cron`
3. Click **Enable**

### 3. Set Up Cron Jobs

Run these SQL commands in Supabase SQL Editor:

```sql
-- Reset daily generations at midnight (UTC)
SELECT cron.schedule(
  'reset-daily-generations',
  '0 0 * * *',
  'SELECT reset_daily_generations();'
);

-- Reset monthly trials on 1st of each month
SELECT cron.schedule(
  'reset-monthly-generations',
  '0 0 1 * *',
  'SELECT reset_monthly_generations();'
);
```

### 4. Verify Cron Jobs

```sql
-- Check scheduled jobs
SELECT * FROM cron.job;

-- Check job run history
SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;
```

## Frontend Integration

### Files Created/Updated:

1. **src/contexts/GenerationsContext.jsx** - Manages generation limits
2. **src/components/GenerationsDisplay.jsx** - Shows remaining generations
3. **src/components/AI3DGenerator.jsx** - Updated to check limits
4. **src/main.jsx** - Added GenerationsProvider
5. **src/services/stripe.js** - Already has correct pricing

## How It Works

### Free Tier Flow:

1. **New User Signs Up**
   - Gets 3 generations/day for 7 days
   - Trial starts immediately
   - `trial_end_date` set to 7 days from now

2. **During Trial (Days 1-7)**
   - Can generate 3 models per day
   - Daily counter resets at midnight UTC
   - Total: 21 generations over 7 days

3. **After Trial Ends (Day 8+)**
   - No more generations until next month
   - Must upgrade to Starter/Pro/Master
   - Or wait until 1st of next month

4. **Monthly Reset (1st of Month)**
   - Free users get a new 7-day trial
   - Trial dates reset
   - Generation counters reset to 0

### Paid Tier Flow:

- **Starter**: 50 generations/month (no daily limit)
- **Pro**: 100 generations/month (no daily limit)
- **Master**: 200 generations/month (no daily limit)

## Testing

### Test Free Tier:

```javascript
// In browser console after logging in:
const { data } = await supabase
  .from('user_generations')
  .select('*')
  .eq('user_id', 'YOUR_USER_ID')
  .single();

console.log('Generations:', data);
```

### Manually Reset Daily Generations:

```sql
-- In Supabase SQL Editor
SELECT reset_daily_generations();
```

### Manually Reset Monthly Trial:

```sql
-- In Supabase SQL Editor
SELECT reset_monthly_generations();
```

### Simulate Trial End:

```sql
-- Set trial end date to past
UPDATE user_generations
SET trial_end_date = NOW() - INTERVAL '1 day'
WHERE user_id = 'YOUR_USER_ID';
```

## UI Components

### GenerationsDisplay Component

Shows:
- Remaining generations (daily for free, monthly for paid)
- Progress bar (green → yellow → red)
- Trial countdown (free tier only)
- Upgrade button (free tier only)

### AI3DGenerator Integration

- Checks `canGenerate` before allowing generation
- Calls `useGeneration()` to deduct credit
- Shows error if limit reached
- Displays GenerationsDisplay at top

## Pricing Plans Summary

| Plan | Price | Generations | Daily Limit | Trial |
|------|-------|-------------|-------------|-------|
| Free | $0 | 21 total | 3/day | 7 days |
| Starter | $9.99 | 50/month | None | N/A |
| Pro | $29.99 | 100/month | None | N/A |
| Master | $99.99 | 200/month | None | N/A |

## Environment Variables

No new environment variables needed! The system uses existing Supabase connection.

## Deployment Checklist

- [ ] Run SUPABASE_GENERATIONS_TABLE.sql
- [ ] Enable pg_cron extension
- [ ] Set up cron jobs
- [ ] Deploy frontend with new code
- [ ] Test free tier signup
- [ ] Test daily limit
- [ ] Test trial expiration
- [ ] Test upgrade flow

## Monitoring

### Check Active Trials:

```sql
SELECT 
  user_id,
  tier,
  daily_generations_used,
  max_daily_generations,
  trial_end_date,
  CASE 
    WHEN trial_end_date > NOW() THEN 'Active'
    ELSE 'Expired'
  END as trial_status
FROM user_generations
WHERE tier = 'free'
ORDER BY trial_end_date DESC;
```

### Check Daily Usage:

```sql
SELECT 
  DATE(last_generation_date) as date,
  COUNT(*) as users,
  SUM(daily_generations_used) as total_generations,
  AVG(daily_generations_used) as avg_per_user
FROM user_generations
WHERE tier = 'free'
GROUP BY DATE(last_generation_date)
ORDER BY date DESC;
```

## Troubleshooting

### Issue: Daily generations not resetting

**Solution**: Check cron job is running:
```sql
SELECT * FROM cron.job_run_details 
WHERE jobname = 'reset-daily-generations' 
ORDER BY start_time DESC LIMIT 5;
```

### Issue: Trial not expiring

**Solution**: Manually run monthly reset:
```sql
SELECT reset_monthly_generations();
```

### Issue: User stuck at 0 generations

**Solution**: Check their record:
```sql
SELECT * FROM user_generations WHERE user_id = 'USER_ID';
```

If trial_end_date is in past, they need to upgrade or wait for monthly reset.

## Next Steps

1. Deploy to production
2. Monitor user behavior
3. Adjust limits based on usage patterns
4. Consider adding email notifications for trial expiration
5. Add analytics tracking for conversion rates

## Support

If users have issues:
1. Check their `user_generations` record
2. Verify trial dates
3. Check daily/monthly counters
4. Manually reset if needed (rare cases)
