// Direct API implementation using v1 API - Fresh deployment
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAyc8h7rPTKJ9UM5GF4div6iLgZ_dQ5CNw';

console.log('🔑 API Key Status [FRESH BUILD]:', {
  exists: !!API_KEY,
  length: API_KEY?.length,
  startsWithAIza: API_KEY?.startsWith('AIza'),
  firstChars: API_KEY?.substring(0, 10) + '...'
});

// Direct API call using v1 endpoint with Gemini 2.5 Flash
const callGeminiAPI = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  
  try {
    console.log('🚀 Calling Gemini API directly...');
    
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
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('✅ API Response received');
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('No text in response');
    }
    
    return text;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const generateResponse = async (prompt, context = '') => {
  try {
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
    
    if (error.message?.includes('429')) {
      return `**Rate Limit**

Too many requests. Please wait a minute and try again.`;
    }
    
    return `**Temporary Error**

${error.message}

Please try again. If the issue persists, check your API key at https://aistudio.google.com/`;
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
  console.log('🧪 Testing Gemini API...');
  try {
    const response = await callGeminiAPI('Say "Hello! API test successful!"');
    return { success: true, message: response };
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return { success: false, error: error.message };
  }
};
