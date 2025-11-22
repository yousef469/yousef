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

  // List of models to try (in order of preference)
  const modelsToTry = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-pro-vision' // Legacy fallback
  ];

  const cleanImages = images.map(img => {
    const data = img.data.includes('base64,') ? img.data.split('base64,')[1] : img.data;
    return { inline_data: { mime_type: img.mime_type || 'image/jpeg', data: data } };
  });

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
            contents: [{ parts: [{ text: prompt }, ...cleanImages] }],
            generationConfig: { maxOutputTokens: maxTokens }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(`✅ Success with ${model}`);
        return res.status(200).json({ text });
      } else {
        const err = await response.text();
        console.warn(`⚠️ ${model} failed: ${response.status} - ${err}`);
        // If it's a 404, we continue to the next model.
        // If it's a 400 (Bad Request), the input is likely wrong, so we stop.
        if (response.status !== 404) {
          throw new Error(`Google API Error: ${response.status} ${err}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error with ${model}:`, error.message);
    }
  }

  // If all failed
  return res.status(500).json({
    error: 'All AI models failed (404). Check your API Key permissions.'
  });
}
