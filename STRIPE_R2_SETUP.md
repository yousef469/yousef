# Stripe + Cloudflare R2 Setup Guide

## ✅ What's Already Done

- Stripe integration code (frontend)
- Pricing page with 4 tiers
- Payment flow logic

## 🔧 What You Need To Do

### 1. Stripe Setup

**A. Add Keys to `.env`:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**B. Add Secret Key to Render:**
- Go to Render dashboard → Your backend service → Environment
- Add: `STRIPE_SECRET_KEY=sk_test_...`

**C. Create Products in Stripe Dashboard:**
1. Go to https://dashboard.stripe.com/products
2. Create 3 products:
   - **Starter**: $9.99/month, ID: `price_starter`
   - **Pro**: $29.99/month, ID: `price_pro`
   - **Unlimited**: $99.99/month, ID: `price_unlimited`

**D. Backend API Endpoints Needed:**
```
POST /api/create-checkout-session
GET  /api/subscription-status
POST /api/cancel-subscription
POST /api/deduct-credit
POST /api/stripe-webhook (for payment confirmations)
```

### 2. Cloudflare R2 Setup

**A. Sign up:**
- Go to https://dash.cloudflare.com
- Create account (free tier: 10GB storage)

**B. Create R2 Bucket:**
- Go to R2 → Create bucket
- Name: `yousef-3d-models`
- Region: Automatic

**C. Get API Credentials:**
- Go to R2 → Manage R2 API Tokens
- Create API token with:
  - Permissions: Read & Write
  - Bucket: yousef-3d-models

**D. Add to Render Environment:**
```
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=yousef-3d-models
```

### 3. Backend Code Needed

I'll create these files for you:
- `ai-backend/stripe_handler.py` - Stripe payment logic
- `ai-backend/r2_storage.py` - Cloudflare R2 storage
- Update `ai-backend/app_replicate.py` to save models to R2

### 4. Database Schema (Supabase)

Add these tables:
```sql
-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT,
  credits INTEGER,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Generated models table
CREATE TABLE generated_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  model_name TEXT,
  model_url TEXT,
  model_type TEXT,
  generation_mode TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📊 Cost Breakdown

**For 1000 users:**
- Stripe: 2.9% + $0.30 per transaction (only when they pay)
- Cloudflare R2: Free for first 10GB, then $0.015/GB/month
- Replicate (AI): ~$10-50 depending on usage

**Total monthly cost: ~$10-70** (very affordable!)

## 🚀 Next Steps

1. Add Stripe keys to `.env` and Render
2. Sign up for Cloudflare R2
3. I'll create the backend code for both
4. Test the payment flow
5. Deploy!

Ready to continue?
