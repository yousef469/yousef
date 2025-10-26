# 📊 Mixpanel Analytics Setup Guide

## 🎯 What is Mixpanel?

Mixpanel is a powerful product analytics platform that helps you understand:
- **Who** uses your app
- **What** they do
- **When** they do it
- **Why** they convert or churn

## ✅ Step 1: Create Mixpanel Account

1. Go to https://mixpanel.com/
2. Click "Get Started Free"
3. Sign up with your email
4. Choose "Product Analytics"
5. Create a new project called "AeroAI 3D"

## 🔑 Step 2: Get Your Project Token

1. After creating project, go to **Settings** (gear icon)
2. Click **Project Settings**
3. Copy your **Project Token** (looks like: `abc123def456...`)
4. Keep this safe - you'll need it next!

## 📝 Step 3: Add Token to Your Project

### Option A: Local Development
1. Open your `.env` file
2. Replace `YOUR_MIXPANEL_TOKEN_HERE` with your actual token:
```env
VITE_MIXPANEL_TOKEN=your_actual_token_here
```

### Option B: Vercel Production
1. Go to https://vercel.com/dashboard
2. Select your project "yousef"
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `VITE_MIXPANEL_TOKEN`
   - **Value:** Your Mixpanel token
   - **Environment:** Production, Preview, Development
5. Click **Save**
6. Redeploy your app

## 🚀 Step 4: Verify Installation

### Test Locally:
```bash
npm run dev
```

1. Open http://localhost:5173
2. Sign up or log in
3. Navigate around the app
4. Go to Mixpanel dashboard
5. Check **Live View** - you should see events coming in!

### Test on Production:
1. Visit https://yousef.vercel.app
2. Perform some actions
3. Check Mixpanel Live View

## 📊 What We're Tracking

### 🔐 Authentication Events
- ✅ Sign Up (email, Google, Apple)
- ✅ Sign In (email, Google, Apple)
- ✅ Sign Out

### 📚 Learning Events
- ✅ Lesson Started
- ✅ Lesson Completed (with time spent & score)
- ✅ Quiz Attempted (with score & percentage)

### 🚀 3D Model Events
- ✅ Model Viewed
- ✅ Model Interaction (rotate, zoom, pan)
- ✅ Model Comparison

### 🤖 AI Tutor Events
- ✅ AI Question Asked
- ✅ AI Response Received (with response time)
- ✅ Voice Input Used

### 🎮 Gamification Events
- ✅ Level Up
- ✅ Achievement Unlocked
- ✅ Daily Challenge Completed
- ✅ Reward Purchased

### 🎯 Game Events
- ✅ Game Started
- ✅ Game Completed (with score & time)

### 👥 Social Events
- ✅ Social Share (Twitter, LinkedIn, Facebook)
- ✅ Collaboration Started/Joined
- ✅ Community Question Posted
- ✅ Community Answer Posted

### 📦 Content Creation Events
- ✅ Model Uploaded
- ✅ Bookmark Added
- ✅ Note Added

### 💰 Subscription Events
- ✅ Subscription Viewed
- ✅ Subscription Upgraded (with revenue tracking)

### 🔧 Feature Usage Events
- ✅ Feature Used
- ✅ Calculator Used
- ✅ Search Performed

### 📈 Engagement Metrics
- ✅ Session Started/Ended
- ✅ Time Spent per page
- ✅ Page Views

### ❌ Error Tracking
- ✅ Error Occurred (with context)

## 📊 Key Metrics to Monitor

### Daily Active Users (DAU)
- How many unique users per day
- **Goal:** 1,000+ DAU

### Weekly Active Users (WAU)
- How many unique users per week
- **Goal:** 5,000+ WAU

### Monthly Active Users (MAU)
- How many unique users per month
- **Goal:** 20,000+ MAU

### Retention Rate
- % of users who come back
- **Goal:** 40%+ Day 7 retention

### Engagement Rate
- Average sessions per user
- **Goal:** 3+ sessions per week

### Conversion Rate
- % of free users who upgrade
- **Goal:** 5%+ conversion to Pro

### Revenue Per User
- Average revenue per paying user
- **Goal:** $50+ per user per year

## 🎯 Creating Useful Reports

### 1. User Funnel Report
Track conversion from signup to first lesson:
1. Go to **Insights** → **Funnels**
2. Add steps:
   - Sign Up
   - Lesson Started
   - Lesson Completed
3. See where users drop off

### 2. Retention Report
See how many users come back:
1. Go to **Insights** → **Retention**
2. Select "Sign Up" as starting event
3. Select "Session Started" as return event
4. View retention curve

### 3. Feature Usage Report
See which features are most popular:
1. Go to **Insights** → **Insights**
2. Select "Feature Used" event
3. Group by "feature_name"
4. View bar chart

### 4. Revenue Report
Track subscription revenue:
1. Go to **Insights** → **Insights**
2. Select "Subscription Upgraded" event
3. Sum by "price"
4. View over time

### 5. User Cohorts
Group users by behavior:
1. Go to **Users** → **Cohorts**
2. Create cohorts:
   - Power Users (10+ lessons completed)
   - At Risk (no activity in 7 days)
   - High Value (Pro/Master subscribers)

## 🔔 Setting Up Alerts

### 1. Drop in DAU Alert
1. Go to **Alerts**
2. Create new alert
3. Condition: DAU drops by 20%
4. Notify: Your email

### 2. High Error Rate Alert
1. Create alert
2. Condition: "Error Occurred" > 100 per hour
3. Notify: Your email

### 3. Conversion Spike Alert
1. Create alert
2. Condition: "Subscription Upgraded" > 10 per day
3. Notify: Your email (celebrate! 🎉)

## 📱 Mixpanel Mobile App

Download the Mixpanel mobile app to monitor on the go:
- **iOS:** https://apps.apple.com/app/mixpanel/id1440485679
- **Android:** https://play.google.com/store/apps/details?id=com.mixpanel.android.mpmetrics

## 🎨 Custom Dashboards

Create a custom dashboard with key metrics:

### Dashboard: "Daily Overview"
1. DAU (line chart)
2. New Signups (number)
3. Lessons Completed (number)
4. Revenue Today (number)
5. Top Features Used (bar chart)
6. Active Users by Country (map)

### Dashboard: "Learning Metrics"
1. Lessons Started vs Completed (funnel)
2. Average Lesson Completion Time
3. Quiz Scores Distribution
4. Most Popular Lessons
5. Completion Rate by Category

### Dashboard: "Revenue Metrics"
1. MRR (Monthly Recurring Revenue)
2. New Subscriptions
3. Churn Rate
4. LTV (Lifetime Value)
5. Conversion Funnel

## 🔍 Advanced Analytics

### A/B Testing
Test different features:
```javascript
import mixpanel from './services/mixpanel';

// Track which variant user sees
const variant = Math.random() > 0.5 ? 'A' : 'B';
mixpanel.trackFeatureUsed('pricing_page', { variant });

// Later, analyze which variant converts better
```

### User Segmentation
Segment users by behavior:
- **Engaged Users:** 5+ lessons completed
- **Casual Users:** 1-4 lessons completed
- **Inactive Users:** 0 lessons completed

### Predictive Analytics
Use Mixpanel's ML to predict:
- Which users will churn
- Which users will upgrade
- Which features drive retention

## 📊 Sample Queries

### Most Popular Lessons
```
Event: Lesson Completed
Group by: lesson_name
Sort by: Count (descending)
```

### Average Quiz Score by Category
```
Event: Quiz Attempted
Group by: category
Aggregate: Average of score
```

### User Journey Analysis
```
Event: Page View
Group by: page
Visualize: Sankey diagram
```

### Revenue by Subscription Tier
```
Event: Subscription Upgraded
Group by: to_tier
Sum: price
```

## 🎯 Goals & KPIs

### Month 1 Goals:
- [ ] 1,000 signups
- [ ] 500 DAU
- [ ] 40% Day 7 retention
- [ ] 10 Pro subscribers

### Month 3 Goals:
- [ ] 10,000 signups
- [ ] 3,000 DAU
- [ ] 50% Day 7 retention
- [ ] 100 Pro subscribers
- [ ] $1,200 MRR

### Month 6 Goals:
- [ ] 50,000 signups
- [ ] 10,000 DAU
- [ ] 60% Day 7 retention
- [ ] 500 Pro subscribers
- [ ] $6,000 MRR

### Year 1 Goals:
- [ ] 200,000 signups
- [ ] 30,000 DAU
- [ ] 70% Day 7 retention
- [ ] 2,000 Pro subscribers
- [ ] $24,000 MRR

## 🔧 Troubleshooting

### Events Not Showing Up?
1. Check token is correct in `.env`
2. Check browser console for errors
3. Verify Mixpanel is initialized (check Network tab)
4. Try in incognito mode (ad blockers can block Mixpanel)

### Duplicate Events?
1. Make sure you're not calling track functions multiple times
2. Check for React strict mode (causes double renders in dev)

### Wrong User Properties?
1. Verify `identifyUser()` is called after login
2. Check user object has correct properties

## 📚 Resources

- **Mixpanel Docs:** https://docs.mixpanel.com/
- **Best Practices:** https://mixpanel.com/blog/best-practices/
- **Community:** https://community.mixpanel.com/
- **Support:** support@mixpanel.com

## 🎉 Next Steps

1. ✅ Set up Mixpanel account
2. ✅ Add token to `.env` and Vercel
3. ✅ Deploy and test
4. ✅ Create custom dashboards
5. ✅ Set up alerts
6. ✅ Monitor daily
7. ✅ Make data-driven decisions!

## 💡 Pro Tips

1. **Check Mixpanel Daily** - Make it part of your morning routine
2. **Set Up Slack Alerts** - Get notified of important events
3. **Share Dashboards** - Keep your team aligned
4. **Run Experiments** - Test everything
5. **Listen to Data** - Let users guide your roadmap

---

**You're now ready to make data-driven decisions! 📊🚀**

Need help? Check the Mixpanel docs or reach out to their support team.
