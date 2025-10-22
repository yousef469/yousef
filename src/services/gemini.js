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
let workingModel = null;

// List of models to try (in order of preference)
const MODELS_TO_TRY = [
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
  'gemini-1.5-pro-latest', 
  'gemini-1.5-pro',
  'gemini-pro',
  'models/gemini-pro',
  'models/gemini-1.5-flash',
  'models/gemini-1.5-pro'
];

// Try to initialize the model
const initializeModel = async () => {
  if (!apiKey || apiKey === 'YOUR_KEY_HERE' || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey === 'YOUR_NEW_KEY_HERE') {
    console.error('❌ Invalid or missing API key');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(apiKey);
    
    // Try each model until one works
    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`🔄 Trying model: ${modelName}...`);
        const testModel = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        });
        
        // Test the model with a simple request
        const testResult = await testModel.generateContent('Hi');
        const testResponse = await testResult.response;
        const testText = testResponse.text();
        
        if (testText) {
          model = testModel;
          workingModel = modelName;
          console.log(`✅ Successfully connected using model: ${modelName}`);
          return true;
        }
      } catch (error) {
        console.log(`❌ Model ${modelName} failed:`, error.message);
        continue;
      }
    }
    
    console.error('❌ None of the models worked');
    return false;
  } catch (error) {
    console.error('❌ Failed to initialize Gemini:', error);
    return false;
  }
};

// Initialize on load
let isInitialized = false;
let initPromise = null;

// Lazy initialization
const ensureInitialized = async () => {
  if (isInitialized) return true;
  
  if (!initPromise) {
    initPromise = initializeModel();
  }
  
  isInitialized = await initPromise;
  return isInitialized;
};

export const generateResponse = async (prompt, context = '') => {
  // Try to initialize if not already done
  const initialized = await ensureInitialized();
  
  if (!initialized || !model) {
    console.error('❌ Gemini not initialized');
    return `**AI Tutor Configuration Needed**

The AI assistant requires setup. Please follow these steps:

**Step 1: Get API Key**
Visit: https://aistudio.google.com/app/apikey
- Click "Create API Key"
- Choose "Create API key in new project"
- Copy the key (starts with AIza...)

**Step 2: Add to Environment**
Create/update your .env file in the project root:
\`\`\`
VITE_GEMINI_API_KEY=your_api_key_here
\`\`\`

**Step 3: Restart Server**
\`\`\`bash
npm run dev
\`\`\`

**For Vercel:**
1. Dashboard → Your Project → Settings
2. Environment Variables
3. Add VITE_GEMINI_API_KEY
4. Redeploy

Meanwhile, explore the 3D models and interactive features!`;
  }

  try {
    const fullPrompt = context 
      ? `Context: ${context}\n\nQuestion: ${prompt}\n\nProvide a detailed, practical engineering explanation with examples.`
      : `${prompt}\n\nProvide a detailed, practical engineering explanation with examples.`;

    console.log(`🚀 Sending request using ${workingModel}...`);

    const result = await model.generateContent(fullPrompt);
    
    if (!result || !result.response) {
      throw new Error('Empty response from API');
    }

    const response = await result.response;
    const text = response.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error('Empty text in response');
    }

    console.log('✅ Response received');
    return text;
  } catch (error) {
    console.error('❌ Gemini API Error:', error);

    // If we get a 404, try reinitializing with different model
    if (error.status === 404) {
      console.log('🔄 Got 404, trying to reinitialize...');
      isInitialized = false;
      initPromise = null;
      model = null;
      
      const reinitialized = await ensureInitialized();
      if (reinitialized) {
        console.log('✅ Reinitialized, retrying request...');
        return generateResponse(prompt, context);
      }
    }

    // Error handling
    if (error.message?.includes('API_KEY_INVALID') || error.status === 400) {
      return `**Invalid API Key**

Your API key is not valid. Please:
1. Go to https://aistudio.google.com/app/apikey
2. Create a NEW API key (don't reuse old ones)
3. Copy the ENTIRE key (usually 39 characters starting with "AIza")
4. Update your .env file
5. Restart the server

Make sure there are no spaces or quotes around the key.`;
    }

    if (error.status === 429) {
      return `**Rate Limit Exceeded**

You've made too many requests. Please:
1. Wait 1-2 minutes
2. Try again
3. Free tier limit: 60 requests/minute

If you need more, visit: https://aistudio.google.com/`;
    }

    if (error.status === 404) {
      return `**API Access Issue**

Cannot access the AI model. This means:
1. Your API key might be for an older API version
2. The Gemini API might have changed

**Solution:**
1. Go to https://aistudio.google.com/app/apikey
2. Delete your old API key
3. Create a BRAND NEW API key
4. Update your .env file with the new key
5. Restart your server

Make sure you're using Google AI Studio (not Google Cloud Console).`;
    }

    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return `**Connection Error**

Cannot reach the AI service. Check:
1. Internet connection
2. Firewall settings
3. VPN (try disabling)
4. Try again in a few seconds

Error: ${error.message}`;
    }

    // Generic fallback
    return `**Temporary Issue**

${error.message || 'Unknown error occurred'}

**Quick Fixes:**
1. Refresh the page
2. Clear browser cache
3. Check console logs (F12)
4. Verify API key at: https://aistudio.google.com/

The 3D models and other features still work!`;
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

// Test API connectivity
export const testAPI = async () => {
  console.log('🧪 Testing Gemini API connection...');
  try {
    const initialized = await ensureInitialized();
    
    if (!initialized) {
      return { 
        success: false, 
        error: 'Could not initialize any model',
        model: null
      };
    }
    
    const response = await generateResponse('Say "Hello! API test successful!"');
    
    return { 
      success: true, 
      message: response,
      model: workingModel
    };
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return { 
      success: false, 
      error: error.message,
      model: workingModel
    };
  }
};

// Export for debugging
export const getModelInfo = () => ({
  initialized: isInitialized,
  workingModel: workingModel,
  apiKeyExists: !!apiKey,
  apiKeyValid: apiKey?.startsWith('AIza')
});
