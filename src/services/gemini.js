// ✅ SECURE: API calls go through backend proxy
// Frontend → Backend → Gemini API → Backend → Frontend
// API key is hidden on server, never exposed to users

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

console.log('🔐 Gemini API: Using SECURE backend proxy');
console.log('📡 Backend URL:', BACKEND_URL);

// Secure Vision API call (with images) through backend
export async function callGeminiVision(prompt, images, retries = 5, maxTokens = 256) {
  console.log(`🔮 Calling backend vision proxy: ${images.length} images, ${maxTokens} tokens`);
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/gemini/vision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        images,
        maxTokens,
        retries
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Backend error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Backend vision response received');
    
    // Backend now returns text at top level for convenience
    // But keep full response for compatibility
    return data;

  } catch (error) {
    console.error('❌ Backend vision error:', error);
    throw error;
  }
}

// Secure Text API call (no images) through backend
const callGeminiAPI = async (prompt, retries = 4) => {
  console.log(`💬 Calling backend text proxy`);
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/gemini/text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        maxTokens: 256,
        retries
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Backend error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No text in response');
    }

    console.log('✅ Backend text response received');
    return text;

  } catch (error) {
    console.error('❌ Backend text error:', error);
    throw error;
  }
};

export const generateResponse = async (prompt, options = {}) => {
  try {
    // Check if this is an image-based request
    if (options.inline_data) {
      // Legacy support - convert to new format
      return await callGeminiVision(prompt, [{
        mime_type: options.inline_data.mime_type,
        data: options.inline_data.data
      }]);
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
3. Update GEMINI_API_KEY in server .env file
4. Restart the backend server

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

Please try again. If the issue persists, check your backend server and API key.`;
  }
};

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
  console.log('🧪 Testing Gemini API through backend...');
  try {
    const response = await callGeminiAPI('Say "Hello! API test successful!"');
    return { success: true, message: response };
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return { success: false, error: error.message };
  }
};
