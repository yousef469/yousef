// Direct API implementation using v1 API - Hardcoded key to bypass Vercel env issues
const API_KEY = 'AIzaSyBnhkRzMRAtedkpKO3dFxke-W6rJc6V6-Q';

console.log('🔑 API Key Status [FRESH BUILD]:', {
  exists: !!API_KEY,
  length: API_KEY?.length,
  startsWithAIza: API_KEY?.startsWith('AIza'),
  firstChars: API_KEY?.substring(0, 10) + '...'
});

// Direct API call using v1 endpoint with Gemini 2.5 Flash (stable multimodal model)
const callGeminiAPI = async (prompt, retries = 4) => {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🚀 Calling Gemini API (attempt ${attempt}/${retries})...`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.2,  // Low temperature for consistent, structured output
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = `API Error: ${response.status} - ${JSON.stringify(errorData)}`;
        
        // Retry on 503 (overloaded) or 429 (rate limit)
        if ((response.status === 503 || response.status === 429) && attempt < retries) {
          const delay = 1000 * attempt; // Exponential backoff: 1s, 2s, 3s, 4s
          console.warn(`⚠️ Gemini overloaded (${response.status}) — retrying in ${delay}ms... (${attempt}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log('✅ API Response received');
      
      // Log full response for debugging
      if (!data.candidates || data.candidates.length === 0) {
        console.warn('⚠️ No candidates in response:', JSON.stringify(data));
        throw new Error('No candidates in response');
      }
      
      const candidate = data.candidates[0];
      
      // Check for safety blocks or finish reason
      if (candidate.finishReason && candidate.finishReason !== 'STOP') {
        console.warn(`⚠️ Unusual finish reason: ${candidate.finishReason}`);
      }
      
      const text = candidate?.content?.parts?.[0]?.text;
      
      if (!text || text.trim() === '') {
        console.warn('⚠️ Empty text in response. Full candidate:', JSON.stringify(candidate));
        throw new Error('No text in response');
      }
      
      return text;
    } catch (error) {
      // Check if this is a retryable error
      const isRetryable = error.message.includes('503') || error.message.includes('429') || error.message.includes('UNAVAILABLE');
      
      // If it's the last attempt or not retryable, throw
      if (attempt === retries || !isRetryable) {
        console.error('❌ API Error:', error);
        throw error;
      }
      
      // Retry with exponential backoff
      const delay = 1000 * attempt;
      console.warn(`⚠️ API error (${error.message.substring(0, 50)}) — retrying in ${delay}ms... (attempt ${attempt}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export const generateResponse = async (prompt, options = {}) => {
  try {
    // Check if this is an image-based request
    if (options.inline_data) {
      return await callGeminiAPIWithImage(prompt, options.inline_data);
    }
    
    // Text-only request
    const context = typeof options === 'string' ? options : '';
    const fullPrompt = context 
      ? `Context: ${context}\n\nQuestion: ${prompt}\n\nProvide a detailed, practical engineering explanation with examples.`
      : `${prompt}\n\nProvide a detailed, practical engineering explanation with examples.`;

    const response = await callGeminiAPI(fullPrompt);
    return response;
  } catch (error) {
    console.error('❌ Generate Response Error:', error);
    
    if (error.message?.includes('404')) {
      return `**API Configuration Issue**

Your API key doesn't have access to the Gemini models. Please:

1. Go to https://aistudio.google.com/app/apikey
2. Create a BRAND NEW API key
3. Make sure you're signed in with a Google account
4. Copy the entire key
5. Add it to Vercel environment variables:
   - Name: VITE_GEMINI_API_KEY
   - Value: your_new_key
6. Redeploy

Current error: ${error.message}`;
    }
    
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      return `**Rate Limit Exceeded**

The AI service has reached its usage limit. This happens when:
- Too many requests in a short time
- Daily/monthly quota exceeded

**Solutions:**
1. Wait 1-2 minutes and try again
2. Use the AI chat less frequently
3. For production: Upgrade to a paid Gemini API plan at https://ai.google.dev/pricing

The free tier allows 15 requests per minute. Please try again shortly.`;
    }
    
    return `**Temporary Error**

${error.message}

Please try again. If the issue persists, check your API key at https://aistudio.google.com/`;
  }
};

// API call with image support (for AI Vision)
const callGeminiAPIWithImage = async (prompt, imageData, retries = 4) => {
  // Use gemini-2.5-flash which is stable and supports vision (1M token input, 65k output)
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🚀 Calling Gemini Vision API (attempt ${attempt}/${retries})...`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { 
                inline_data: {
                  mime_type: imageData.mime_type,
                  data: imageData.data
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0,  // Deterministic output for structured JSON
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 2048,  // Increased for complete JSON
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = `API Error: ${response.status} - ${JSON.stringify(errorData)}`;
        
        // Retry on 503 (overloaded) or 429 (rate limit)
        if ((response.status === 503 || response.status === 429) && attempt < retries) {
          const delay = 1500 * attempt; // Longer backoff for vision: 1.5s, 3s, 4.5s, 6s
          console.warn(`⚠️ Vision API overloaded (${response.status}) — retrying in ${delay}ms... (${attempt}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log('✅ Vision API Response received');
      
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.warn('⚠️ Empty response from Vision API');
        throw new Error('No text in vision response');
      }
      
      console.log('📄 Raw AI response:', text.substring(0, 200) + '...');
      
      return text;
    } catch (error) {
      // Check if this is a retryable error
      const isRetryable = error.message.includes('503') || error.message.includes('429') || error.message.includes('UNAVAILABLE');
      
      // If it's the last attempt or not retryable, throw
      if (attempt === retries || !isRetryable) {
        console.error('❌ Vision API Error:', error);
        throw error;
      }
      
      // Retry with exponential backoff
      const delay = 1500 * attempt;
      console.warn(`⚠️ Vision API error (${error.message.substring(0, 50)}) — retrying in ${delay}ms... (attempt ${attempt}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// 🔥 STABLE MULTI-IMAGE VISION API - Never crashes with proper retry logic
export async function callGeminiVision(prompt, images, retries = 5) {
  const payload = {
    contents: [
      { parts: [{ text: prompt }] },
      { parts: images.map(img => ({ inline_data: img })) }
    ]
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      // If API returns a temporary 5xx error → retry
      if (res.status >= 500) {
        console.warn(`⚠️ Gemini overloaded (HTTP ${res.status}). Retrying ${attempt}/${retries}...`);
        await new Promise(r => setTimeout(r, attempt * 1000)); // exponential delay
        continue;
      }

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Gemini Error ${res.status}: ${txt}`);
      }

      const data = await res.json();
      console.log(`✅ Gemini responded successfully on retry ${attempt}`);
      return data; // success
    } catch (err) {
      console.warn(`⚠️ Retry ${attempt} failed:`, err.message);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, attempt * 1000));
      }
    }
  }

  throw new Error("❌ Gemini failed after all retries");
}

// System prompt for engineering tutor
const SYSTEM_PROMPT = `You are an expert aerospace and automotive engineering tutor. You help students understand:
- Rocket propulsion and orbital mechanics
- Aircraft aerodynamics and flight systems
- Automotive engineering and vehicle dynamics
- Physics principles (Newton's laws, thermodynamics, fluid dynamics)
- Engineering design and analysis

Provide clear, educational explanations with real-world examples. Use analogies when helpful.
Keep responses concise but informative (2-4 paragraphs max).
If asked about specific models (Falcon 9, F-22, etc.), provide accurate technical details.`;

export const askGemini = async (userMessage, conversationHistory = []) => {
  try {
    const context = conversationHistory
      .map(msg => `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}`)
      .join('\n\n');

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${context ? context + '\n\n' : ''}Student: ${userMessage}\n\nTutor:`;

    const text = await callGeminiAPI(fullPrompt);

    return { success: true, response: text };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message,
      response: "I'm having trouble connecting right now. Please try again in a moment."
    };
  }
};

export const askAboutModel = async (modelName, modelType, question) => {
  try {
    const prompt = `As an engineering tutor, answer this question about the ${modelName} (a ${modelType}):

Question: ${question}

Provide a detailed but concise technical explanation focusing on engineering principles and real specifications.`;

    const text = await callGeminiAPI(prompt);

    return { success: true, response: text };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message,
      response: "I'm having trouble connecting right now. Please try again in a moment."
    };
  }
};

export const explainComponent = async (componentName, modelType) => {
  try {
    const prompt = `Explain the ${componentName} component of a ${modelType} in simple terms:
- What it does
- Why it's important
- How it works
- Interesting engineering facts

Keep it concise (2-3 paragraphs).`;

    const text = await callGeminiAPI(prompt);

    return { success: true, explanation: text };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const generateLesson = async (topic, difficulty = 'beginner') => {
  const prompt = `Create a ${difficulty} level engineering lesson about ${topic}. Include:

1. **Introduction** - Overview and importance
2. **Core Concepts** - Key engineering principles  
3. **How It Works** - Step-by-step explanation
4. **Real Examples** - Practical applications
5. **Key Numbers** - Important specifications
6. **Try This** - 2-3 practice problems

Make it engaging with specific examples and numbers.`;
  
  return await generateResponse(prompt);
};

export const explainModel = async (modelName, specificQuestion = '') => {
  const prompt = specificQuestion
    ? `Explain ${modelName} focusing on: ${specificQuestion}

Provide:
- Technical details
- Engineering principles
- How it works
- Practical applications`
    : `Give a detailed engineering explanation of ${modelName}.

Cover:
- What it is and its purpose
- Key specifications and numbers
- Design and engineering
- How it functions
- Materials used
- Performance characteristics
- Real-world impact

Use specific examples and data.`;
  
  return await generateResponse(prompt);
};

export const testAPI = async () => {
  console.log('🧪 Testing Gemini API...');
  try {
    const response = await callGeminiAPI('Say "Hello! API test successful!"');
    return { success: true, message: response };
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return { success: false, error: error.message };
  }
};
