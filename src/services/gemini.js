// src/services/geminiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB3MgLeBT9CxTQCdyKyKEiCiM3ZFutYTwo';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Use the correct model name - gemini-pro or gemini-1.5-flash
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateResponse = async (prompt, context = '') => {
  try {
    const fullPrompt = context 
      ? `Context: ${context}\n\nQuestion: ${prompt}\n\nPlease provide a detailed engineering explanation.`
      : prompt;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Better error handling
    if (error.message?.includes('404')) {
      throw new Error('Model not found. Please check your API key or try a different model.');
    } else if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your Gemini API key in the .env file.');
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later or upgrade your plan.');
    }
    
    throw new Error(`Failed to generate response: ${error.message}`);
  }
};

export const generateLesson = async (topic, difficulty = 'beginner') => {
  try {
    const prompt = `Create a ${difficulty} level engineering lesson about ${topic}. Include:
1. Introduction
2. Key concepts
3. Real-world applications
4. Practice exercises

Format the response in a clear, structured way.`;
    
    return await generateResponse(prompt);
  } catch (error) {
    console.error('Error generating lesson:', error);
    throw error;
  }
};

export const explainModel = async (modelName, specificQuestion = '') => {
  try {
    const prompt = specificQuestion
      ? `Explain ${modelName} focusing on: ${specificQuestion}`
      : `Provide a detailed engineering explanation of ${modelName}, including its design, functionality, and engineering principles.`;
    
    return await generateResponse(prompt);
  } catch (error) {
    console.error('Error explaining model:', error);
    throw error;
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

// Explain a component
export const explainComponent = async (componentName, modelType) => {
  try {
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
