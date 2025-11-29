import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UsageLimitsContext = createContext();

// Free tier limits
const FREE_LIMITS = {
  aiChatPerDay: 20,
  homeworkSolverPerDay: 3,
  modelComparisonPerWeek: 1,
};

// Storage keys
const STORAGE_KEYS = {
  aiChat: 'engineerium_ai_chat_usage',
  homeworkSolver: 'engineerium_homework_usage',
  modelComparison: 'engineerium_comparison_usage',
};

export function UsageLimitsProvider({ children }) {
  const { user } = useAuth();
  const [usage, setUsage] = useState({
    aiChat: { count: 0, resetTime: null },
    homeworkSolver: { count: 0, resetTime: null },
    modelComparison: { count: 0, resetTime: null },
  });
  const [isPremium, setIsPremium] = useState(false);

  // Load usage from localStorage on mount
  useEffect(() => {
    loadUsage();
  }, [user]);

  const loadUsage = () => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekMs = 7 * dayMs;

    // Load AI chat usage
    const aiChatData = JSON.parse(localStorage.getItem(STORAGE_KEYS.aiChat) || '{}');
    const aiChatReset = aiChatData.resetTime || now + dayMs;
    const aiChatCount = aiChatReset > now ? (aiChatData.count || 0) : 0;

    // Load homework solver usage
    const homeworkData = JSON.parse(localStorage.getItem(STORAGE_KEYS.homeworkSolver) || '{}');
    const homeworkReset = homeworkData.resetTime || now + dayMs;
    const homeworkCount = homeworkReset > now ? (homeworkData.count || 0) : 0;

    // Load model comparison usage (weekly)
    const comparisonData = JSON.parse(localStorage.getItem(STORAGE_KEYS.modelComparison) || '{}');
    const comparisonReset = comparisonData.resetTime || now + weekMs;
    const comparisonCount = comparisonReset > now ? (comparisonData.count || 0) : 0;

    setUsage({
      aiChat: { 
        count: aiChatCount, 
        resetTime: aiChatCount === 0 ? now + dayMs : aiChatReset 
      },
      homeworkSolver: { 
        count: homeworkCount, 
        resetTime: homeworkCount === 0 ? now + dayMs : homeworkReset 
      },
      modelComparison: { 
        count: comparisonCount, 
        resetTime: comparisonCount === 0 ? now + weekMs : comparisonReset 
      },
    });

    // Check premium status from user metadata or subscription
    // For now, check localStorage (would be from Stripe in production)
    const premiumStatus = localStorage.getItem('engineerium_premium') === 'true';
    setIsPremium(premiumStatus);
  };

  const saveUsage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Check if user can use AI chat
  const canUseAiChat = () => {
    if (isPremium) return true;
    return usage.aiChat.count < FREE_LIMITS.aiChatPerDay;
  };

  // Use AI chat (increment counter)
  const useAiChat = () => {
    if (isPremium) return true;
    if (!canUseAiChat()) return false;

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const newCount = usage.aiChat.count + 1;
    const resetTime = usage.aiChat.resetTime || now + dayMs;

    const newData = { count: newCount, resetTime };
    setUsage(prev => ({ ...prev, aiChat: newData }));
    saveUsage(STORAGE_KEYS.aiChat, newData);
    return true;
  };

  // Check if user can use homework solver
  const canUseHomeworkSolver = () => {
    if (isPremium) return true;
    return usage.homeworkSolver.count < FREE_LIMITS.homeworkSolverPerDay;
  };

  // Use homework solver
  const useHomeworkSolver = () => {
    if (isPremium) return true;
    if (!canUseHomeworkSolver()) return false;

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const newCount = usage.homeworkSolver.count + 1;
    const resetTime = usage.homeworkSolver.resetTime || now + dayMs;

    const newData = { count: newCount, resetTime };
    setUsage(prev => ({ ...prev, homeworkSolver: newData }));
    saveUsage(STORAGE_KEYS.homeworkSolver, newData);
    return true;
  };

  // Check if user can use model comparison
  const canUseModelComparison = () => {
    if (isPremium) return true;
    return usage.modelComparison.count < FREE_LIMITS.modelComparisonPerWeek;
  };

  // Use model comparison
  const useModelComparison = () => {
    if (isPremium) return true;
    if (!canUseModelComparison()) return false;

    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const newCount = usage.modelComparison.count + 1;
    const resetTime = usage.modelComparison.resetTime || now + weekMs;

    const newData = { count: newCount, resetTime };
    setUsage(prev => ({ ...prev, modelComparison: newData }));
    saveUsage(STORAGE_KEYS.modelComparison, newData);
    return true;
  };

  // Get remaining uses
  const getRemainingAiChats = () => {
    if (isPremium) return Infinity;
    return Math.max(0, FREE_LIMITS.aiChatPerDay - usage.aiChat.count);
  };

  const getRemainingHomeworkSolves = () => {
    if (isPremium) return Infinity;
    return Math.max(0, FREE_LIMITS.homeworkSolverPerDay - usage.homeworkSolver.count);
  };

  const getRemainingComparisons = () => {
    if (isPremium) return Infinity;
    return Math.max(0, FREE_LIMITS.modelComparisonPerWeek - usage.modelComparison.count);
  };

  // Get time until reset
  const getTimeUntilReset = (type) => {
    const resetTime = usage[type]?.resetTime;
    if (!resetTime) return null;
    
    const now = Date.now();
    const diff = resetTime - now;
    if (diff <= 0) return null;

    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
  };

  // Check if lesson is free (beginner/intermediate = free, advanced/expert = paid)
  const isLessonFree = (lessonLevel) => {
    if (isPremium) return true;
    const freelevels = ['beginner', 'intermediate', 'Beginner', 'Intermediate'];
    return freelevels.includes(lessonLevel);
  };

  // Check if calculator is free (first 25% are free)
  const isCalculatorFree = (calculatorIndex, totalCalculators) => {
    if (isPremium) return true;
    const freeCount = Math.ceil(totalCalculators * 0.25);
    return calculatorIndex < freeCount;
  };

  const value = {
    isPremium,
    setIsPremium,
    usage,
    limits: FREE_LIMITS,
    // AI Chat
    canUseAiChat,
    useAiChat,
    getRemainingAiChats,
    // Homework Solver
    canUseHomeworkSolver,
    useHomeworkSolver,
    getRemainingHomeworkSolves,
    // Model Comparison
    canUseModelComparison,
    useModelComparison,
    getRemainingComparisons,
    // Time until reset
    getTimeUntilReset,
    // Content access
    isLessonFree,
    isCalculatorFree,
  };

  return (
    <UsageLimitsContext.Provider value={value}>
      {children}
    </UsageLimitsContext.Provider>
  );
}

export function useUsageLimits() {
  const context = useContext(UsageLimitsContext);
  if (!context) {
    throw new Error('useUsageLimits must be used within a UsageLimitsProvider');
  }
  return context;
}
