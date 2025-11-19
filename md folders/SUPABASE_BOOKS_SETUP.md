# Supabase Storage Setup for Books

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **Storage** in the left sidebar
4. Click **"New bucket"**
5. Configure:
   - **Name**: `books`
   - **Public bucket**: ✅ YES (check this box)
   - **File size limit**: 52428800 (50MB) or higher
   - Click **"Create bucket"**

## Step 2: Upload Books

### Option A: Upload via Dashboard (Easiest)
1. Click on the `books` bucket
2. Click **"Upload file"**
3. Select all PDF files from `public/books/` folder
4. Wait for upload to complete
5. Repeat for all books (you can upload multiple at once)

### Option B: Upload via Script (Faster for many files)
Create a file `upload-books.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function uploadBooks() {
  const booksDir = path.join(__dirname, 'public', 'books');
  const files = fs.readdirSync(booksDir);

  for (const file of files) {
    if (file.endsWith('.pdf')) {
      console.log(`Uploading ${file}...`);
      
      const filePath = path.join(booksDir, file);
      const fileBuffer = fs.readFileSync(filePath);

      const { data, error } = await supabase.storage
        .from('books')
        .upload(file, fileBuffer, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (error) {
        console.error(`Error uploading ${file}:`, error);
      } else {
        console.log(`✓ Uploaded ${file}`);
      }
    }
  }
  
  console.log('All books uploaded!');
}

uploadBooks();
```

Run it:
```bash
node upload-books.js
```

## Step 3: Get Public URLs

After uploading, get the public URL format:
```
https://[YOUR-PROJECT-ID].supabase.co/storage/v1/object/public/books/[FILENAME]
```

Example:
```
https://abcdefgh.supabase.co/storage/v1/object/public/books/Calculus - Early Transcendentals 6e.pdf
```

## Step 4: Update Code

### Update `src/services/supabase.js`:

Add this function:
```javascript
export const getBookUrl = (filename) => {
  const { data } = supabase.storage
    .from('books')
    .getPublicUrl(filename);
  
  return data.publicUrl;
};
```

### Update `src/pages/BooksPage.jsx`:

Change the file paths:
```javascript
import { getBookUrl } from '../services/supabase';

// In handleDownload function:
const bookUrl = getBookUrl(bookFile);
const link = document.createElement('a');
link.href = bookUrl;
link.download = bookFile;
link.click();

// In handleRead function:
const bookUrl = getBookUrl(book.file);
setSelectedBook({ ...book, url: bookUrl });
```

### Update `src/components/PDFViewer.jsx`:

Change the Document file prop:
```javascript
<Document
  file={book.url}  // Instead of `/books/${book.file}`
  onLoadSuccess={onDocumentLoadSuccess}
  // ... rest of props
/>
```

## Step 5: Set Storage Policies (Important!)

In Supabase Dashboard → Storage → books bucket → Policies:

1. **Allow public read access**:
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'books' );
```

2. **Allow authenticated uploads** (optional, for admin):
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'books' 
  AND auth.role() = 'authenticated'
);
```

## Step 6: Test

1. Go to your books page
2. Click "Read" on any book
3. Should load from Supabase!

## Benefits:
- ✅ Free 1GB storage (upgradable)
- ✅ Fast CDN delivery
- ✅ Works on Vercel
- ✅ No Git LFS needed
- ✅ Easy to manage

## Troubleshooting:

**Books not loading?**
- Check bucket is public
- Check file names match exactly
- Check CORS settings in Supabase

**Upload fails?**
- Check file size limits
- Check storage quota
- Try uploading via dashboard first

## Storage Limits:
- **Free tier**: 1GB storage, 2GB bandwidth/month
- **Pro tier**: 100GB storage, 200GB bandwidth/month ($25/month)

For 20 books (~500MB total), free tier is perfect!
