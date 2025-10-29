# Lives/Hearts System Setup Guide

## ✅ What's Implemented

### Lives System Features:
- **Free Tier**: 5 lives, regenerate 1 every 5 hours
- **Starter Tier**: 10 lives, regenerate 1 every 5 hours  
- **Pro Tier**: Unlimited lives per month
- **Master Tier**: Unlimited lives forever

### How It Works:
1. User starts with 5 lives (free tier)
2. Each wrong answer in quiz/journey games costs 1 life
3. After 5 wrong answers, user loses all lives and must wait or upgrade
4. Lives regenerate automatically: 1 life every 5 hours
5. Full regeneration takes 20 hours (4 lives × 5 hours)

## 🔧 Setup Steps

### 1. Create Supabase Table

Go to your Supabase dashboard → SQL Editor and run:

```sql
-- Copy and paste the contents of SUPABASE_LIVES_TABLE.sql
```

Or manually:
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy contents from `SUPABASE_LIVES_TABLE.sql`
4. Click "Run"

### 2. Configure Stripe Products

Go to https://dashboard.stripe.com/test/products and create:

**Product 1: Starter Plan**
- Name: `Starter Plan`
- Price: `$9.99/month` (recurring)
- Description: `10 game lives + 50 AI generations`
- Copy the **Price ID** (starts with `price_...`)

**Product 2: Pro Plan**
- Name: `Pro Plan`
- Price: `$29.99/month` (recurring)
- Description: `Unlimited lives per month + 200 AI generations`
- Copy the **Price ID**

**Product 3: Master Plan**
- Name: `Master Plan`
- Price: `$99.99/month` (recurring)
- Description: `Unlimited lives forever + unlimited AI generations`
- Copy the **Price ID**

### 3. Add Environment Variables

**Render Backend:**
```
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_PRICE_STARTER=price_1ABC...
STRIPE_PRICE_PRO=price_1DEF...
STRIPE_PRICE_UNLIMITED=price_1GHI...
```

**Vercel Frontend:**
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
VITE_STRIPE_PRICE_STARTER=price_1ABC...
VITE_STRIPE_PRICE_PRO=price_1DEF...
VITE_STRIPE_PRICE_UNLIMITED=price_1GHI...
```

### 4. Test the System

1. Go to your site
2. Play a quiz game
3. Answer 5 questions wrong
4. You should see "Out of lives!" message
5. Click "Upgrade" to see pricing plans
6. Purchase a plan (use Stripe test card: `4242 4242 4242 4242`)
7. After payment, lives should increase based on tier

## 🎮 User Experience

### Free User (5 Lives):
- Plays quiz game
- Gets 5 wrong answers
- Loses all lives
- Sees: "Out of lives! Wait 20 hours or upgrade"
- Can upgrade to Starter (10 lives), Pro (unlimited/month), or Master (unlimited forever)

### Starter User (10 Lives):
- Has 10 lives
- Gets 10 wrong answers
- Loses all lives
- Sees upgrade prompt for Pro or Master

### Pro User (Unlimited per month):
- Unlimited lives for the month
- Lives reset monthly
- No waiting time

### Master User (Unlimited forever):
- Unlimited lives forever
- Never runs out
- Premium experience

## 🔄 Lives Regeneration

- **Regeneration Rate**: 1 life every 5 hours
- **Full Regeneration**: 20 hours (for 4 lives)
- **Display**: Shows countdown timer "Next life in: 4h 32m 15s"
- **Auto-Update**: Timer updates every second

## 💰 Monetization Strategy

1. **Free users** hit the 5-life limit quickly → encourages upgrades
2. **Starter tier** ($9.99) gives breathing room with 10 lives
3. **Pro tier** ($29.99) removes the hassle with unlimited monthly lives
4. **Master tier** ($99.99) is for power users who want unlimited forever

## 🎨 UI Components

- **LivesDisplay**: Shows hearts/lives in top-right corner
- **Tier Badge**: Shows current tier (Free/Starter/Pro/Master)
- **Countdown Timer**: Shows time until next life regenerates
- **Upgrade Button**: Quick access to pricing page

## 📊 Analytics to Track

- Lives lost per user
- Conversion rate from "out of lives" to upgrade
- Average time between life loss and upgrade
- Most common tier upgrades

## 🚀 Next Steps

1. Run the SQL script in Supabase
2. Create Stripe products
3. Add environment variables
4. Test with Stripe test mode
5. Monitor user behavior
6. Adjust pricing/lives based on data

---

**Note**: The system is already deployed! Just need to:
1. Create the Supabase table
2. Add Stripe Price IDs to environment variables
3. Test and launch! 🎉
