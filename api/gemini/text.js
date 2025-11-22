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

    // List of models to try (in order of preference)
    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro' // Legacy fallback
    ];

    // Loop through models until one works
    for (const model of modelsToTry) {
      try {
        console.log(`🔄 Trying model: ${model}...`);
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
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

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!text) {
            throw new Error('No text in response');
          }

          console.log(`✅ Success with ${model}`);
          return res.status(200).json({ text });
        } else {
          const err = await response.text();
          console.warn(`⚠️ ${model} failed: ${response.status} - ${err}`);
          // If it's a 404, continue to next model
          if (response.status !== 404) {
            throw new Error(`Google API Error: ${response.status} ${err}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error with ${model}:`, error.message);
      }
    }

    // If all models failed
    return res.status(500).json({ 
      error: 'All AI models failed (404). Check your API Key permissions.' 
    });

  } catch (error) {
    console.error('❌ Gemini Text proxy error:', error);
    return res.status(500).json({ error: error.message });
  }
}
