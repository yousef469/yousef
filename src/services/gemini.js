import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB3MgLeBT9CxTQCdyKyKEiCiM3ZFutYTwo';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Build conversation context
    const context = conversationHistory
      .map(msg => `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}`)
      .join('\n\n');

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${context ? context + '\n\n' : ''}Student: ${userMessage}\n\nTutor:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `As an engineering tutor, answer this question about the ${modelName} (a ${modelType}):

Question: ${question}

Provide a detailed but concise technical explanation focusing on engineering principles and real specifications.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

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

// Generate lesson content
export const generateLesson = async (topic) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Create a concise engineering lesson about: ${topic}

Format the response as:
1. Brief introduction (1 paragraph)
2. Key concepts (3-4 bullet points)
3. Real-world application (1 paragraph)
4. Practice question

Keep it educational and engaging for engineering students.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { success: true, lesson: text };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Explain a component
export const explainComponent = async (componentName, modelType) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Explain the ${componentName} component of a ${modelType} in simple terms:
- What it does
- Why it's important
- How it works
- Interesting engineering facts

Keep it concise (2-3 paragraphs).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { success: true, explanation: text };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
