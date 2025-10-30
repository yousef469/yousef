# Solution for Books Over 50MB

## Quick Fix: Increase Supabase Storage Limit

### Step 1: Update Bucket Settings
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Storage** in sidebar
4. Click on **books** bucket
5. Click the **Settings** icon (⚙️)
6. Change **File size limit** from `52428800` to `104857600` (100MB)
7. Click **Save**

### Step 2: Re-upload Failed Books
Run the upload script again:
```bash
node upload-books.js
```

Or upload manually via dashboard.

## Which Books Failed?

The 6 books that likely failed (over 50MB):
1. **Fundamentals of Physics 9th Extended.pdf** (~52MB)
2. **Serway Physics for Scientists & Engineers** (~53MB)
3. **University Physics with Modern Physics** (~62MB)
4. **The Feynman Lectures on Physics** (varies)
5. **Engineering Mechanics Dynamics** (varies)
6. **Vector Mechanics for Engineers** (varies)

## Alternative: Compress PDFs

If you don't want to increase the limit, compress these books:

### Online Compression:
1. Go to https://www.ilovepdf.com/compress_pdf
2. Upload the large PDF
3. Download compressed version
4. Upload to Supabase

### Quality Settings:
- **Extreme compression**: Smaller file, lower quality (good for text-heavy books)
- **Recommended compression**: Balanced (best for most books)
- **Low compression**: Larger file, better quality (for image-heavy books)

## Alternative: Cloudflare R2 (No Limits)

For unlimited file sizes:

1. **Sign up**: https://dash.cloudflare.com/sign-up
2. **Create R2 bucket**:
   - Go to R2 Object Storage
   - Click "Create bucket"
   - Name it "engineerium-books"
   - Make it public

3. **Upload large files**:
   - Use Cloudflare dashboard
   - Or use Wrangler CLI

4. **Get public URLs**:
   ```
   https://pub-xxxxx.r2.dev/filename.pdf
   ```

5. **Update code** to use R2 URLs for large books

## Recommended Approach:

**For now:**
1. Increase Supabase limit to 100MB ✅
2. Re-upload the 6 failed books ✅
3. All books will work! ✅

**For future:**
- If you need books over 100MB, use Cloudflare R2
- Or compress PDFs before uploading

## Cost Comparison:

| Service | Free Tier | File Size Limit |
|---------|-----------|-----------------|
| Supabase | 1GB storage | Configurable (up to 5GB) |
| Cloudflare R2 | 10GB storage | No limit |
| Vercel Blob | 500MB | 500MB per file |

**Winner for books: Supabase** (you already have it set up!)
