// Test Gemini API directly
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyD-ZWhokP76Ctk_RpTyqwvtSNlUQ183gdc';

async function test() {
  console.log('Testing Gemini API...');
  
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const result = await model.generateContent('Say hello!');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ SUCCESS!');
    console.log('Response:', text);
  } catch (error) {
    console.log('❌ FAILED!');
    console.log('Error:', error.message);
  }
}

test();
