# 🚀 Mixpanel Quick Start (5 Minutes)

## Step 1: Get Your Token (2 min)

1. Go to https://mixpanel.com/register
2. Sign up (free forever for up to 100K events/month)
3. Create project: "AeroAI 3D"
4. Copy your **Project Token** from Settings

## Step 2: Add Token Locally (1 min)

Open `.env` and replace:
```env
VITE_MIXPANEL_TOKEN=YOUR_MIXPANEL_TOKEN_HERE
```

With your actual token:
```env
VITE_MIXPANEL_TOKEN=abc123def456...
```

## Step 3: Add Token to Vercel (1 min)

1. Go to https://vercel.com/dashboard
2. Select project → Settings → Environment Variables
3. Add:
   - Name: `VITE_MIXPANEL_TOKEN`
   - Value: Your token
   - Environments: All
4. Save & Redeploy

## Step 4: Test (1 min)

```bash
npm run dev
```

1. Open http://localhost:5173
2. Sign up or log in
3. Click around
4. Go to Mixpanel → Live View
5. See events! 🎉

## That's It!

You now have:
- ✅ 40+ events tracked automatically
- ✅ User identification
- ✅ Revenue tracking
- ✅ Error monitoring
- ✅ Real-time analytics

## What's Being Tracked?

Everything important:
- User signups & logins
- Lesson completions
- Quiz scores
- 3D model views
- AI questions
- Game plays
- Social shares
- Subscriptions
- And 30+ more events!

## View Your Data

Go to Mixpanel dashboard:
- **Live View** - See events in real-time
- **Insights** - Analyze trends
- **Funnels** - Track conversions
- **Retention** - See who comes back
- **Users** - View individual profiles

## Need More Help?

- Full Guide: `MIXPANEL_SETUP_GUIDE.md`
- Code Examples: `MIXPANEL_USAGE_EXAMPLES.md`
- Summary: `MIXPANEL_INTEGRATION_SUMMARY.md`

---

**You're done! Start making data-driven decisions! 📊**
