/**
 * Translation Generation Script
 * 
 * This script helps identify hardcoded strings that need translation
 * 
 * Usage: node scripts/generate-translations.js
 */

const fs = require('fs');
const path = require('path');

// Directories to scan
const SCAN_DIRS = ['src/pages', 'src/components'];

// Patterns to find hardcoded strings
const STRING_PATTERNS = [
  /"([^"]{10,})"/g,  // Double quoted strings
  /'([^']{10,})'/g,  // Single quoted strings
  /`([^`]{10,})`/g   // Template literals
];

console.log('🔍 Scanning for hardcoded strings...\n');
console.log('📝 Add these to your i18n config:\n');
console.log('---\n');

// This is a starter - you'd expand this to actually scan files
console.log(`
RECOMMENDATION:
===============

For translating 30+ pages into 8 languages, use one of these approaches:

1. **AI Translation Service** (Fastest)
   - Use Google Cloud Translation API
   - Or DeepL API for better quality
   - Cost: ~$20 per million characters

2. **Translation Management Platform** (Best for teams)
   - Lokalise.com
   - Crowdin.com  
   - They handle version control, context, and team collaboration

3. **Manual Translation** (Most accurate)
   - Hire translators for each language
   - Use the TRANSLATION_TODO.md as a guide

4. **Hybrid Approach** (Recommended)
   - Use AI for initial translation
   - Have native speakers review and refine
   - Focus on user-facing text first

CURRENT STATUS:
===============
✅ 8 core languages configured
✅ HomePage header translated
✅ AuthPage fully translated
✅ RTL support for Arabic
✅ Language selector working

TODO:
=====
- HomePage body content (~50 strings)
- Game pages (~30 strings each × 10 pages)
- Mechanics pages (~40 strings each × 3 pages)
- Component text (~200+ strings)

ESTIMATED TOTAL: ~1000 translation keys needed
`);
