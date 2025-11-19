# Daily.co Setup Guide (Simpler Alternative to LiveKit)

## Why Daily.co?

Daily.co is **much simpler** than LiveKit:
- ✅ No complex API keys
- ✅ Just copy one URL
- ✅ 10,000 minutes/month free
- ✅ Easier React integration
- ✅ Works in 5 minutes

## Step 1: Sign Up (2 minutes)

1. Go to https://www.daily.co/
2. Click **"Sign up free"**
3. Enter email and password
4. Verify your email
5. Done! You're in the dashboard

## Step 2: Get Your Domain (1 minute)

After login, you'll see your **Daily domain**:

```
https://your-subdomain.daily.co
```

Example: `https://engineerium.daily.co`

**That's it!** That's all you need. No API keys, no secrets.

## Step 3: Add to .env

Just add ONE line to your `.env` file:

```env
VITE_DAILY_DOMAIN=your-subdomain.daily.co
```

Example:
```env
VITE_DAILY_DOMAIN=engineerium.daily.co
```

⚠️ **Note**: Don't include `https://` - just the domain!

## Step 4: Install Package

```bash
npm install @daily-co/daily-react
```

## Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Step 6: Test It!

1. Go to `/classroom`
2. Create a classroom
3. Video should work automatically!
4. Open another browser
5. Join with room code
6. Both see each other's video!

## That's It!

No API keys, no secrets, no complexity. Just one domain name.

## Free Tier Limits

- ✅ **10,000 participant minutes/month**
- ✅ **Up to 200 participants per room**
- ✅ **HD video quality**
- ✅ **Screen sharing**
- ✅ **Recording (optional)**
- ✅ **No credit card required**

## Comparison

| Feature | LiveKit | Daily.co |
|---------|---------|----------|
| Setup Complexity | ⭐⭐⭐⭐ (Hard) | ⭐ (Easy) |
| API Keys Needed | 3 credentials | 1 domain |
| Free Minutes | 10,000 | 10,000 |
| Max Participants | 100 | 200 |
| Setup Time | 15 minutes | 5 minutes |

## Troubleshooting

### "Video not showing"
- Check browser permissions (camera/mic)
- Make sure you added `VITE_DAILY_DOMAIN` to `.env`
- Restart dev server after adding `.env`

### "Domain not found"
- Don't include `https://` in the domain
- Just use: `your-subdomain.daily.co`

### "Still not working"
- Open browser console (F12)
- Look for errors
- Make sure Daily package is installed: `npm list @daily-co/daily-react`

## Production Deployment (Vercel)

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add: `VITE_DAILY_DOMAIN` = `your-subdomain.daily.co`
4. Redeploy

## Advanced Features (Optional)

### Custom Branding
In Daily Dashboard:
- Settings → Branding
- Upload your logo
- Change colors
- Customize UI

### Recording
In Daily Dashboard:
- Settings → Recording
- Enable cloud recording
- Recordings saved to your dashboard

### Analytics
In Daily Dashboard:
- Analytics tab
- See usage stats
- Monitor quality

## Support

- **Daily Docs**: https://docs.daily.co/
- **React Guide**: https://docs.daily.co/guides/products/react
- **Support**: support@daily.co

## Next Steps

1. ✅ Sign up at daily.co
2. ✅ Copy your domain
3. ✅ Add to `.env`
4. ✅ Install package
5. ✅ Test it!

Much simpler than LiveKit! 🎉
