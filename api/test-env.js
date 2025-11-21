// Test endpoint to verify environment variables
export default async function handler(req, res) {
  const hasKey = !!process.env.GEMINI_API_KEY;
  const keyLength = process.env.GEMINI_API_KEY?.length || 0;
  const keyPrefix = process.env.GEMINI_API_KEY?.substring(0, 10) || 'none';
  
  return res.status(200).json({
    hasKey,
    keyLength,
    keyPrefix,
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('GEMINI')),
    message: hasKey ? '✅ API key is configured' : '❌ API key NOT found'
  });
}
