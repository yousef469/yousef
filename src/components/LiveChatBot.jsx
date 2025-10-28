import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, RotateCcw, Trash2, Mic, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { askGemini } from '../services/gemini';
import VoiceInput, { speakText } from './VoiceInput';

export default function LiveChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your AI engineering tutor. Ask me anything about rockets, planes, cars, or engineering concepts! 🚀✈️🚗",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle send message
  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await askGemini(messageText, conversationHistory);

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-speak response
      if (isSpeaking) {
        speakText(response.response);
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle voice input
  const handleVoiceTranscript = (transcript) => {
    setInput(transcript);
  };

  const handleVoiceSpeechEnd = (transcript) => {
    if (transcript.trim()) {
      handleSend(transcript);
    }
  };

  // Copy message to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Regenerate last response
  const regenerateResponse = async () => {
    if (messages.length < 2) return;
    
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) return;

    // Remove last assistant message
    setMessages(prev => prev.filter(msg => 
      !(msg.role === 'assistant' && msg.timestamp > lastUserMessage.timestamp)
    ));

    // Regenerate
    await handleSend(lastUserMessage.content);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: "Hi! I'm your AI engineering tutor. Ask me anything about rockets, planes, cars, or engineering concepts! 🚀✈️🚗",
        timestamp: new Date()
      }
    ]);
    speechSynthesis.cancel();
  };

  // Toggle auto-speak
  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    if (isSpeaking) {
      speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Engineering Tutor</h3>
            <p className="text-xs text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpeaking}
            className={`p-2 rounded-lg transition-colors ${
              isSpeaking 
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            title={isSpeaking ? 'Auto-speak ON' : 'Auto-speak OFF'}
          >
            {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={regenerateResponse}
            disabled={isLoading || messages.length < 2}
            className="p-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Regenerate last response"
          >
            <RotateCcw className="w-4 h-4 text-gray-400" />
          </button>
          
          <button
            onClick={clearChat}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user'
                ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                : 'bg-gradient-to-br from-cyan-500 to-blue-600'
            }`}>
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white'
                  : message.isError
                  ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                  : 'bg-gray-800 text-gray-100'
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              
              {/* Message Actions */}
              {message.role === 'assistant' && !message.isError && (
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <button
                    onClick={() => copyToClipboard(message.content)}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                  <button
                    onClick={() => speakText(message.content)}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    Speak
                  </button>
                  <span className="text-xs text-gray-600">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gray-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-800/50 border-t border-gray-700">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask me anything about engineering..."
            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            disabled={isLoading}
          />
          
          {/* Voice Input */}
          <VoiceInput 
            onTranscript={handleVoiceTranscript}
            onSpeechEnd={handleVoiceSpeechEnd}
          />
          
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => handleSend("How does a rocket engine work?")}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-full text-gray-300 transition-colors"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            Rocket engines
          </button>
          <button
            onClick={() => handleSend("Explain aerodynamics of planes")}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-full text-gray-300 transition-colors"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            Plane aerodynamics
          </button>
          <button
            onClick={() => handleSend("How do car engines work?")}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-full text-gray-300 transition-colors"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            Car engines
          </button>
        </div>
      </div>
    </div>
  );
}
