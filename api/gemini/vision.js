// Vercel Serverless Function for Gemini Vision API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, images, maxTokens = 500 } = req.body;

    // Verify Payload
    if (!prompt || !images || !Array.isArray(images)) {
      return res.status(400).json({ error: 'Missing required fields (prompt or images)' });
    }

    // Verify API Key
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error('❌ Critical: GEMINI_API_KEY is missing in Vercel Environment Variables');
      return res.status(500).json({ error: 'Server configuration error: API Key missing' });
    }

    // Clean Image Data - remove base64 prefix if present
    const cleanImages = images.map(img => {
      const data = img.data.includes('base64,') ? img.data.split('base64,')[1] : img.data;
      return {
        inline_data: {
          mime_type: img.mime_type || 'image/jpeg',
          data: data
        }
      };
    });

    console.log(`🔄 Using gemini-2.5-pro for ${cleanImages.length} images`);

    // CORRECT GEMINI CONTENT FORMAT - text and images in ONE message
    const contentParts = [
      { text: prompt },
      ...cleanImages
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: contentParts
          }],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.1,
            topP: 0.8
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google API Error:', errorText);
      return res.status(response.status).json({
        error: `Google API Failed: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('📦 Gemini response received');

    // Extract text from response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text || text.trim().length === 0) {
      console.warn('⚠️ Empty response from Gemini');
      return res.status(200).json({ text: '' });
    }

    console.log('✅ Gemini Vision Success');
    return res.status(200).json({ text });

  } catch (error) {
    console.error('❌ Vision API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
