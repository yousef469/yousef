// Vercel Serverless Function for Gemini Vision API with Model Fallback
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, images, maxTokens = 500 } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server Error: API Key missing' });
  }

  const cleanImages = images.map(img => {
    const data = img.data.includes('base64,') ? img.data.split('base64,')[1] : img.data;
    return { inline_data: { mime_type: img.mime_type || 'image/jpeg', data: data } };
  });

  try {
    console.log('🔄 Using gemini-pro-vision (legacy model, works with all API keys)');
    
    // Using gemini-pro-vision for maximum compatibility
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }, ...cleanImages] }],
            generationConfig: { maxOutputTokens: maxTokens }
          })
        }
      );

    if (!response.ok) {
      const err = await response.text();
      console.error(`❌ Gemini API Error: ${response.status} - ${err}`);
      return res.status(response.status).json({ error: `Gemini API Error: ${err}` });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return res.status(500).json({ error: 'No text in response' });
    }
    
    console.log('✅ Gemini Vision Success');
    return res.status(200).json({ text });
    
  } catch (error) {
    console.error('❌ Vision API Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
