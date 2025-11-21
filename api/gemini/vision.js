// Vercel Serverless Function for Gemini Vision API
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, images, maxTokens = 256, retries = 5 } = req.body;

    if (!prompt || !images || !Array.isArray(images)) {
      return res.status(400).json({ 
        error: 'Missing required fields: prompt, images' 
      });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment variables!');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log(`🔮 Gemini Vision request: ${images.length} images, maxTokens: ${maxTokens}`);

    // Retry logic with exponential backoff
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { parts: [{ text: prompt }] },
                { parts: images.map(img => ({ inline_data: img })) }
              ],
              generationConfig: {
                maxOutputTokens: maxTokens,
                temperature: 0.1,
                topP: 0.8
              }
            })
          }
        );

        // Handle 5xx errors with retry
        if (response.status >= 500) {
          console.warn(`⚠️ Gemini overloaded (${response.status}). Retry ${attempt}/${retries}...`);
          if (attempt < retries) {
            await new Promise(r => setTimeout(r, attempt * 1000));
            continue;
          }
        }

        if (!response.ok) {
          const errorText = await response.text();
          return res.status(response.status).json({ 
            error: `Gemini API error: ${response.status}`,
            details: errorText
          });
        }

        const data = await response.json();
        
        // Check for MAX_TOKENS or empty response
        const candidate = data.candidates?.[0];
        const finishReason = candidate?.finishReason;
        const text = candidate?.content?.parts?.[0]?.text;

        if (finishReason === 'MAX_TOKENS') {
          console.warn(`⚠️ MAX_TOKENS on attempt ${attempt}. Retrying...`);
          if (attempt < retries) {
            await new Promise(r => setTimeout(r, attempt * 1000));
            continue;
          }
        }

        if (!text || text.trim().length === 0) {
          console.warn(`⚠️ Empty response on attempt ${attempt}. Retrying...`);
          if (attempt < retries) {
            await new Promise(r => setTimeout(r, attempt * 1000));
            continue;
          }
        }

        console.log(`✅ Gemini Vision success on attempt ${attempt}`);
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
      error: 'Gemini Vision failed after all retries' 
    });

  } catch (error) {
    console.error('❌ Gemini Vision proxy error:', error);
    return res.status(500).json({ error: error.message });
  }
}
