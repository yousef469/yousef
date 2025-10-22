// src/services/geminiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Check if API key exists
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB3MgLeBT9CxTQCdyKyKEiCiM3ZFutYTwo';

console.log('🔑 Gemini API Key Check:', {
  exists: !!apiKey,
  length: apiKey?.length,
  startsWithAIza: apiKey?.startsWith('AIza'),
  firstChars: apiKey?.substring(0, 10) + '...'
});

let model = null;
let genAI = null;

// Try to initialize the model
const initializeModel = () => {
  if (!apiKey || apiKey === 'YOUR_KEY_HERE' || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey === 'YOUR_NEW_KEY_HERE') {
    console.error('❌ Invalid or missing API key');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(apiKey);
    
    // Try gemini-pro first (most stable)
    model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE",
        },
      ],
    });
    
    console.log('✅ Gemini model initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize Gemini:', error);
    return false;
  }
};

// Initialize on load
const isInitialized = initializeModel();

export const generateResponse = async (prompt, context = '') => {
  // Check initialization
  if (!isInitialized || !model) {
    console.error('❌ Gemini not initialized');
    return `**AI Tutor Unavailable**

The AI assistant is currently not configured. To enable it:
1. Get a free API key from: https://aistudio.google.com/app/apikey
2. Add it to your .env file as: VITE_GEMINI_API_KEY=your_key_here
3. Restart your development server

For now, here's some general guidance about ${prompt}:
This is a placeholder response. The AI tutor will provide detailed, personalized explanations once configured.`;
  }

  try {
    const fullPrompt = context 
      ? `Context: ${context}\n\nQuestion: ${prompt}\n\nProvide a detailed engineering explanation with practical examples.`
      : `${prompt}\n\nProvide a detailed engineering explanation with practical examples.`;

    console.log('🚀 Sending request to Gemini API...');
    console.log('📝 Prompt length:', fullPrompt.length);

    const result = await model.generateContent(fullPrompt);
    
    if (!result || !result.response) {
      throw new Error('Empty response from API');
    }

    const response = await result.response;
    const text = response.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error('Empty text in response');
    }

    console.log('✅ Gemini API response received:', text.substring(0, 100) + '...');
    return text;
  } catch (error) {
    console.error('❌ Gemini API Error Details:', {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      error: error
    });

    // Return helpful error messages
    if (error.message?.includes('API_KEY_INVALID') || error.status === 400) {
      return `**API Key Error**

Your Gemini API key appears to be invalid. Please:
1. Go to https://aistudio.google.com/app/apikey
2. Create a new API key
3. Update your .env file with the new key
4. Restart your server

Current issue: Invalid API key format or permissions`;
    }

    if (error.message?.includes('404') || error.status === 404) {
      return `**Model Not Found**

The AI model is not available. This could mean:
1. Your API key doesn't have access to this model
2. The model name is incorrect
3. Your API key needs to be regenerated

Try creating a new API key at: https://aistudio.google.com/app/apikey`;
    }

    if (error.message?.includes('quota') || error.status === 429) {
      return `**Rate Limit Reached**

You've reached the API rate limit. Please:
1. Wait a few minutes and try again
2. Check your usage at: https://aistudio.google.com/
3. Consider upgrading your plan if you need more requests

The free tier allows 60 requests per minute.`;
    }

    if (error.message?.includes('CORS') || error.message?.includes('fetch')) {
      return `**Connection Error**

Having trouble connecting to the AI service. This could be:
1. Network issue - check your internet connection
2. CORS issue - this usually only happens in development
3. Firewall blocking the API

Try refreshing the page or checking your network settings.`;
    }

    // Generic fallback
    return `**AI Tutor Temporarily Unavailable**

I'm having trouble connecting right now. Error: ${error.message || 'Unknown error'}

Please try again in a moment. If the issue persists:
1. Check your internet connection
2. Verify your API key is correct
3. Try refreshing the page

You can still explore the 3D models and interactive features while I'm offline!`;
  }
};

export const generateLesson = async (topic, difficulty = 'beginner') => {
  const prompt = `Create a comprehensive ${difficulty} level engineering lesson about ${topic}. Structure:

1. **Introduction** - Brief overview
2. **Key Concepts** - Main engineering principles
3. **Real-World Applications** - Practical examples
4. **Engineering Analysis** - Technical details
5. **Practice Exercises** - 3 problems to solve

Make it engaging and include specific numbers and examples.`;
  
  return await generateResponse(prompt);
};

export const explainModel = async (modelName, specificQuestion = '') => {
  const prompt = specificQuestion
    ? `Explain the ${modelName} with focus on: ${specificQuestion}

Include:
- Engineering specifications
- Design principles
- How it works
- Real-world applications`
    : `Provide a detailed engineering explanation of the ${modelName}.

Include:
- Technical specifications
- Design and engineering principles
- How it functions
- Materials and construction
- Performance characteristics
- Real-world applications and impact`;
  
  return await generateResponse(prompt);
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
    // Build conversation context
    const context = conversationHistory
      .map(msg => `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}`)
      .join('\n\n');

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${context ? context + '\n\n' : ''}Student: ${userMessage}\n\nTutor:`;

    const text = await generateResponse(fullPrompt);

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

// Specialized function for model-specific questions
export const askAboutModel = async (modelName, modelType, question) => {
  try {
    const prompt = `As an engineering tutor, answer this question about the ${modelName} (a ${modelType}):

Question: ${question}

Provide a detailed but concise technical explanation focusing on engineering principles and real specifications.`;

    const text = await generateResponse(prompt);

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

// Explain a component
export const explainComponent = async (componentName, modelType) => {
  try {
    const prompt = `Explain the ${componentName} component of a ${modelType} in simple terms:
- What it does
- Why it's important
- How it works
- Interesting engineering facts

Keep it concise (2-3 paragraphs).`;

    const text = await generateResponse(prompt);

    return { success: true, explanation: text };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Test function to verify API is working
export const testAPI = async () => {
  console.log('🧪 Testing Gemini API...');
  try {
    const response = await generateResponse('Say "Hello! API is working!" and nothing else.');
    console.log('✅ API Test Result:', response);
    return { success: true, message: response };
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return { success: false, error: error.message };
  }
};
