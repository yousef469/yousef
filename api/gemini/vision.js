// Vercel Serverless Function for Gemini Vision API
export default async function handler(req, res) {
  // 1. Handle CORS and Method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, images, maxTokens = 500 } = req.body;

    // 2. Verify Payload
    if (!prompt || !images || !Array.isArray(images)) {
      return res.status(400).json({ error: 'Missing required fields (prompt or images)' });
    }

    // 3. Verify API Key
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error('❌ Critical: GEMINI_API_KEY is missing in Vercel Environment Variables');
      return res.status(500).json({ error: 'Server configuration error: API Key missing' });
    }

    // 4. Clean Image Data (Crucial Step)
    // Removes "data:image/jpeg;base64," prefix if present
    const cleanImages = images.map(img => {
      const data = img.data.includes('base64,')
        ? img.data.split('base64,')[1]
        : img.data;
      return {
        inline_data: {
          mime_type: img.mime_type || 'image/jpeg',
          data: data
        }
      };
    });

    console.log(`🔮 Sending to Gemini: ${cleanImages.length} images`);

    // 5. Call Google API (No Retries to prevent Vercel Timeout)
    // Using specific version "gemini-1.5-flash-001" for stability
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              ...cleanImages
            ]
          }],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.2, // Lower temperature for more factual engineering answers
          }
        })
      }
    );

    // 6. Handle Google Errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google API Error:', errorText);
      return res.status(response.status).json({
        error: `Google API Failed: ${response.status}`,
        details: errorText
      });
    }

    // 7. Success
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('❌ Empty response structure:', JSON.stringify(data));
      return res.status(500).json({ error: 'AI returned no text' });
    }

    console.log('✅ Gemini Success');
    return res.status(200).json({ text });

  } catch (error) {
    console.error('❌ Server Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
