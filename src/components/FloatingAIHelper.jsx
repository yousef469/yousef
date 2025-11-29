import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Minimize2, Maximize2, BookOpen, Brain, Lock, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { useUsageLimits } from '../contexts/UsageLimitsContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FloatingAIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const { userProgress } = useProgress();
  const { canUseAiChat, useAiChat, getRemainingAiChats, getTimeUntilReset, isPremium } = useUsageLimits();
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get current context
  const getCurrentContext = () => {
    const path = location.pathname;
    let context = {
      page: 'general',
      subject: null,
      lessonId: null,
      userLevel: userProgress?.level || 1,
      totalXP: userProgress?.totalXP || 0,
      completedLessons: userProgress?.completedLessons || []
    };

    // Detect current page context
    if (path.includes('/rockets/lesson/')) {
      context.page = 'lesson';
      context.subject = 'rockets';
      context.lessonId = path.split('/').pop();
    } else if (path.includes('/cars/lesson/')) {
      context.page = 'lesson';
      context.subject = 'cars';
      context.lessonId = path.split('/').pop();
    } else if (path.includes('/planes/lesson/')) {
      context.page = 'lesson';
      context.subject = 'planes';
      context.lessonId = path.split('/').pop();
    } else if (path.includes('/electronics/lesson/')) {
      context.page = 'lesson';
      context.subject = 'electronics';
      context.lessonId = path.split('/').pop();
    } else if (path.includes('/mathematics/lesson/')) {
      context.page = 'lesson';
      context.subject = 'mathematics';
      context.lessonId = path.split('/').pop();
    } else if (path.includes('/explode-view')) {
      context.page = '3d-viewer';
    } else if (path.includes('/games/map/')) {
      context.page = 'game-map';
      context.subject = path.split('/').pop();
    }

    return context;
  };

  // Direct API with correct model name
  const callGeminiAPI = async (prompt) => {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!API_KEY) {
      throw new Error('API key not configured');
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  };

  const sendPredefinedMessage = async (message) => {
    // Check usage limits
    if (!canUseAiChat()) {
      const resetTime = getTimeUntilReset('aiChat');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `🔒 **Daily Limit Reached**\n\nYou've used all ${20} free AI chats for today.\n\n⏱️ Resets in: ${resetTime}\n\n💎 **Upgrade to Pro** for unlimited AI assistance!` 
      }]);
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    // Consume one usage
    useAiChat();

    try {
      const context = getCurrentContext();
      const systemPrompt = `You are EnGo, a friendly AI engineering tutor. Context: ${JSON.stringify(context)}. Keep responses concise (2-3 paragraphs max). Use simple language and examples.`;
      const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;
      
      const response = await callGeminiAPI(fullPrompt);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Sorry, I encountered an error. Please check your API key and try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect if message is career-related
  const isCareerQuestion = (message) => {
    const careerKeywords = [
      'career', 'job', 'internship', 'interview', 'resume', 'cv', 'salary',
      'work', 'company', 'hire', 'employment', 'profession', 'industry',
      'spacex', 'tesla', 'boeing', 'nasa', 'google', 'apple', 'microsoft',
      'engineer job', 'engineering career', 'what should i study', 'degree',
      'masters', 'phd', 'graduate', 'undergraduate', 'college', 'university',
      'skills', 'portfolio', 'experience', 'entry level', 'junior', 'senior',
      'mechanical engineer', 'aerospace engineer', 'electrical engineer',
      'software engineer', 'civil engineer', 'robotics engineer',
      'advice', 'path', 'roadmap', 'future', 'opportunities', 'field'
    ];
    const lowerMessage = message.toLowerCase();
    return careerKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Check usage limits
    if (!canUseAiChat()) {
      const resetTime = getTimeUntilReset('aiChat');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `🔒 **Daily Limit Reached**\n\nYou've used all ${20} free AI chats for today.\n\n⏱️ Resets in: ${resetTime}\n\n💎 **Upgrade to Pro** for unlimited AI assistance!\n\n[Click here to upgrade](/pricing)` 
      }]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Consume one usage
    useAiChat();

    try {
      const context = getCurrentContext();
      const isCareer = isCareerQuestion(userMessage);
      
      // Build context-aware system prompt
      let systemPrompt = `You are EnGo, an AI engineering tutor for Engineerium. `;
      
      // Career Advisor Mode
      if (isCareer) {
        systemPrompt = `You are EnGo, acting as an **AI Career Advisor** for engineering students and aspiring engineers. 

Your expertise includes:
- Engineering career paths (Mechanical, Aerospace, Electrical, Civil, Software, Robotics)
- Top companies hiring engineers (SpaceX, Tesla, Boeing, NASA, Google, Apple, etc.)
- Skills needed for different engineering roles
- Resume and portfolio tips for engineers
- Interview preparation for technical roles
- Salary expectations and career progression
- Graduate school advice (Masters, PhD)
- Internship strategies and how to land them
- Industry trends and emerging fields

Guidelines:
- Be encouraging and supportive
- Give specific, actionable advice
- Mention real companies and realistic expectations
- Suggest concrete next steps
- Reference the user's learning progress when relevant (Level ${context.userLevel}, ${context.totalXP} XP)
- Recommend relevant Engineerium features (Internship Simulator, Career Projects)

Start your response with "🎯 **Career Advisor Mode**" to indicate you're giving career advice.`;
      } else if (context.page === 'lesson') {
        systemPrompt += `The user is currently studying a ${context.subject} lesson (ID: ${context.lessonId}). They are at level ${context.userLevel} with ${context.totalXP} XP and have completed ${context.completedLessons.length} lessons. Provide educational assistance specific to ${context.subject} engineering. Use step-by-step explanations, relate concepts to real-world applications, and encourage learning. `;
      } else if (context.page === '3d-viewer') {
        systemPrompt += `The user is using the 3D model viewer. Help them understand engineering specifications, technical details, and the engineering principles behind what they're viewing. `;
      } else if (context.page === 'game-map') {
        systemPrompt += `The user is on the ${context.subject} game map, choosing lessons. Help them understand the learning path, prerequisites, and what they'll learn. Motivate them to continue their engineering journey. `;
      } else {
        systemPrompt += `The user is at level ${context.userLevel} with ${context.totalXP} XP. Help them with engineering concepts across rockets, cars, planes, electronics, and mathematics. `;
      }
      
      if (!isCareer) {
        systemPrompt += `Be concise, clear, and educational. Use emojis occasionally to make learning fun.`;
      }

      const conversationHistory = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n\n');

      const fullPrompt = `${systemPrompt}\n\n${conversationHistory ? conversationHistory + '\n\n' : ''}User: ${userMessage}\n\nAssistant:`;

      const text = await callGeminiAPI(fullPrompt);

      setMessages(prev => [...prev, { role: 'assistant', content: text, context: context.page }]);
    } catch (error) {
      console.error('AI Error:', error);
      
      let errorMessage = '❌ Sorry, I encountered an error. Please try again.';
      
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        errorMessage = '⏱️ **Rate Limit Reached**\n\nPlease wait a minute and try again. The free tier allows 15 requests per minute.';
      } else if (error.message?.includes('404') || error.message?.includes('All models failed')) {
        errorMessage = '🔧 **AI Service Temporarily Unavailable**\n\nThe AI chat is currently being configured. In the meantime:\n\n• Browse lessons in Rockets, Cars, Planes, or Electronics\n• Try the interactive 3D models\n• Complete quizzes to test your knowledge\n\nWe\'re working to restore AI chat soon!';
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 animate-pulse"
        title="EnGo - AI Companion"
      >
        <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-20 md:bottom-6 right-2 md:right-6 z-50 bg-gray-900 border-2 border-blue-500/50 rounded-2xl shadow-2xl transition-all flex flex-col ${
        isMinimized ? 'w-72 md:w-80 h-16' : 'w-[calc(100vw-16px)] md:w-96 h-[70vh] md:h-[600px] max-h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold flex items-center gap-2">
              EnGo
              {isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
            </h3>
            <p className="text-xs text-gray-400">
              {isPremium ? (
                <span className="text-yellow-400">Unlimited • Pro</span>
              ) : (
                <span>{getRemainingAiChats()}/20 chats left today</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Quick Help Buttons */}
          {messages.length === 0 && (
            <div className="p-4 border-b border-gray-700">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => sendPredefinedMessage('Explain this concept step by step')}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded text-left transition-colors"
                  disabled={isLoading}
                >
                  📚 Explain Concept
                </button>
                <button 
                  onClick={() => sendPredefinedMessage('Help me with this calculation')}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded text-left transition-colors"
                  disabled={isLoading}
                >
                  🧮 Help with Math
                </button>
                <button 
                  onClick={() => sendPredefinedMessage('Give me career advice for engineering')}
                  className="p-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:border-amber-400 rounded text-left transition-colors"
                  disabled={isLoading}
                >
                  🎯 Career Advice
                </button>
                <button 
                  onClick={() => sendPredefinedMessage('What are real-world applications?')}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded text-left transition-colors"
                  disabled={isLoading}
                >
                  🌍 Real Examples
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                <Bot className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <p className="text-lg font-semibold mb-2">Hi! I'm EnGo 👋</p>
                <p className="text-sm">
                  {getCurrentContext().page === 'lesson' ? 
                    `I can help you understand ${getCurrentContext().subject} concepts!` :
                    'Your AI engineering companion! Ask me anything!'
                  }
                </p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
