# Books Hosting Guide

## Issue
The PDF books are too large for GitHub (some exceed 50MB). While they were pushed to GitHub, Vercel may not deploy them properly.

## Solutions

### Option 1: Use Git LFS (Recommended for GitHub)
```bash
# Install Git LFS
git lfs install

# Track PDF files
git lfs track "public/books/*.pdf"

# Add .gitattributes
git add .gitattributes

# Commit and push
git add public/books/*.pdf
git commit -m "Add books with Git LFS"
git push
```

### Option 2: Use Cloud Storage (Recommended for Production)
Host PDFs on:
- **Cloudflare R2** (Free 10GB)
- **AWS S3**
- **Google Cloud Storage**
- **Supabase Storage**

Update the file paths in `BooksPage.jsx` and `PDFViewer.jsx`:
```javascript
// Instead of:
file={`/books/${encodeURIComponent(book.file)}`}

// Use:
file={`https://your-storage-url.com/books/${encodeURIComponent(book.file)}`}
```

### Option 3: Use CDN Links
Find the books on:
- Library Genesis
- Internet Archive
- Academic repositories

And link directly to their URLs.

### Option 4: Vercel Blob Storage
```bash
npm install @vercel/blob

# Upload books to Vercel Blob
# Then update file paths to use blob URLs
```

## Current Status
Books are in `public/books/` locally but may not deploy to Vercel due to size limits.

## Temporary Solution
For development, books work locally. For production, implement one of the solutions above.
