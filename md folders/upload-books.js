const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function uploadBooks() {
  console.log('📚 Starting book upload to Supabase...\n');
  
  const booksDir = path.join(__dirname, 'public', 'books');
  
  if (!fs.existsSync(booksDir)) {
    console.error('❌ Books directory not found:', booksDir);
    return;
  }

  const files = fs.readdirSync(booksDir);
  const pdfFiles = files.filter(file => file.endsWith('.pdf'));

  console.log(`Found ${pdfFiles.length} PDF files to upload\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of pdfFiles) {
    try {
      console.log(`📤 Uploading: ${file}...`);
      
      const filePath = path.join(booksDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const fileSizeMB = (fileBuffer.length / 1024 / 1024).toFixed(2);

      console.log(`   Size: ${fileSizeMB} MB`);

      const { data, error } = await supabase.storage
        .from('books')
        .upload(file, fileBuffer, {
          contentType: 'application/pdf',
          upsert: true,
          cacheControl: '3600'
        });

      if (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        errorCount++;
      } else {
        console.log(`   ✅ Success!\n`);
        successCount++;
      }
    } catch (err) {
      console.error(`   ❌ Exception: ${err.message}\n`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Upload Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📚 Total: ${pdfFiles.length}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n🎉 Books uploaded successfully!');
    console.log('\nNext steps:');
    console.log('1. Update your code to use Supabase URLs');
    console.log('2. Test the books page');
    console.log('3. Deploy to Vercel');
  }
}

uploadBooks().catch(console.error);
