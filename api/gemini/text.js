// Vercel Serverless Function for Gemini Text API with Model Fallback
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, maxTokens = 256, retries = 4 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing required field: prompt' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment variables!');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log(`💬 Gemini Text request: ${prompt.substring(0, 50)}...`);

    console.log('🔄 Using gemini-1.5-flash (1500 requests/day limit)');
    
    // We use gemini-1.5-flash because it is stable and has high limits (1500/day)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: prompt }]
              }],
              generationConfig: {
                maxOutputTokens: maxTokens,
                temperature: 0.2
              }
            })
          }
        );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Gemini API Error: ${response.status} - ${errorText}`);
      return res.status(response.status).json({ error: `Gemini API error: ${response.status}`, details: errorText });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No text in response');
    }

    console.log('✅ Gemini Text Success');
    return res.status(200).json({ text });

  } catch (error) {
    console.error('❌ Gemini Text proxy error:', error);
    return res.status(500).json({ error: error.message });
  }
}
