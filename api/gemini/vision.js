// Vercel Serverless Function for Gemini Vision API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Reduce default retries to prevent Vercel Timeout (10s limit)
    const { prompt, images, maxTokens = 256, retries = 2 } = req.body;

    if (!prompt || !images || !Array.isArray(images)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) return res.status(500).json({ error: 'API key missing' });

    // 2. CRITICAL FIX: Clean Base64 strings
    // Gemini fails if the string starts with "data:image/..."
    const cleanImages = images.map(img => {
      const base64Data = img.data.includes('base64,') 
        ? img.data.split('base64,')[1] 
        : img.data;
      
      return {
        inline_data: {
          mime_type: img.mime_type || 'image/jpeg',
          data: base64Data
        }
      };
    });

    console.log(`🔮 Vision request: ${cleanImages.length} imgs, ${maxTokens} tokens`);

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: prompt },
                  ...cleanImages // Use the cleaned images structure directly
                ]
              }],
              generationConfig: {
                maxOutputTokens: maxTokens,
                temperature: 0.1,
              }
            })
          }
        );

        if (!response.ok) {
          // If error is 500+, throw to trigger retry. If 400 (bad request), stop immediately.
          if (response.status >= 500) throw new Error(`Server error ${response.status}`);
          const errText = await response.text();
          return res.status(response.status).json({ error: `Gemini refused: ${errText}` });
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) throw new Error('Empty response from AI');

        console.log(`✅ Vision success on attempt ${attempt}`);
        return res.status(200).json({ text, fullResponse: data });

      } catch (err) {
        console.warn(`⚠️ Attempt ${attempt} failed:`, err.message);
        // Only wait if we have retries left, and keep wait time SHORT (500ms)
        if (attempt < retries) await new Promise(r => setTimeout(r, 500));
      }
    }

    return res.status(500).json({ error: 'Gemini Vision failed after retries' });

  } catch (error) {
    console.error('❌ Critical Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
