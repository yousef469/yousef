// Vercel Serverless Function for Gemini Text API
export default async function handler(req, res) {
  // Only allow POST requests
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

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Using specific version "gemini-1.5-flash-001" for stability
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${GEMINI_API_KEY}`,
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

        if (response.status >= 500 && attempt < retries) {
          console.warn(`⚠️ Retry ${attempt}/${retries}...`);
          await new Promise(r => setTimeout(r, attempt * 1000));
          continue;
        }

        if (!response.ok) {
          const errorText = await response.text();
          return res.status(response.status).json({ 
            error: `Gemini API error: ${response.status}`,
            details: errorText
          });
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          throw new Error('No text in response');
        }

        console.log(`✅ Gemini Text success`);
        console.log(`📄 Extracted text length: ${text.length} chars`);
        
        // Return ONLY the text at top level (keep full response for debugging)
        return res.status(200).json({
          text: text,           // Primary: extracted text for easy access
          fullResponse: data    // Secondary: full Gemini response for debugging
        });

      } catch (err) {
        console.warn(`⚠️ Attempt ${attempt} failed:`, err.message);
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, attempt * 1000));
        }
      }
    }

    return res.status(500).json({ 
      error: 'Gemini Text failed after all retries' 
    });

  } catch (error) {
    console.error('❌ Gemini Text proxy error:', error);
    return res.status(500).json({ error: error.message });
  }
}
