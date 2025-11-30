import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UsageLimitsContext = createContext();

// BETA MODE: All features unlocked for free until 500+ daily users
// TODO: Re-enable paid tiers after reaching user milestone
const BETA_MODE = true;

// Tier definitions with all limits
export const TIER_LIMITS = {
  free: {
    name: 'Free',
    // BETA: Everything unlimited for now
    aiChatPerMonth: BETA_MODE ? -1 : 20,
    homeworkSolverPerMonth: BETA_MODE ? -1 : 3,
    modelComparisonPerWeek: BETA_MODE ? -1 : 1,
    explodeModePerWeek: BETA_MODE ? -1 : 3,
    calculatorPercent: BETA_MODE ? 100 : 25,
    lessonsAccess: BETA_MODE ? 'all' : 'beginner',
    careerProjects: BETA_MODE ? true : false,
    certificates: BETA_MODE ? true : false,
    vrSupport: BETA_MODE ? true : false,
    earlyAccess: BETA_MODE ? true : false,
  },
  starter: {
    name: 'Starter',
    aiChatPerMonth: -1,
    homeworkSolverPerMonth: -1,
    modelComparisonPerWeek: -1,
    explodeModePerWeek: -1,
    calculatorPercent: 100,
    lessonsAccess: 'all',
    careerProjects: true,
    certificates: true,
    vrSupport: false,
    earlyAccess: false,
  },
  pro: {
    name: 'Pro',
    aiChatPerMonth: -1,
    homeworkSolverPerMonth: -1,
    modelComparisonPerWeek: -1,
    explodeModePerMonth: -1,
    calculatorPercent: 100,
    lessonsAccess: 'all',
    careerProjects: true,
    certificates: true,
    vrSupport: true,
    earlyAccess: false,
  },
  master: {
    name: 'Master',
    aiChatPerMonth: -1,
    homeworkSolverPerMonth: -1,
    modelComparisonPerWeek: -1,
    explodeModePerMonth: -1,
    calculatorPercent: 100,
    lessonsAccess: 'all',
    careerProjects: true,
    certificates: true,
    vrSupport: true,
    earlyAccess: true,
  },
};

// Storage keys
const STORAGE_KEYS = {
  aiChat: 'engineerium_ai_chat_usage',
  homeworkSolver: 'engineerium_homework_usage',
  modelComparison: 'engineerium_comparison_usage',
  explodeMode: 'engineerium_explode_usage',
  userTier: 'engineerium_user_tier',
};

export function UsageLimitsProvider({ children }) {
  const { user } = useAuth();
  const [userTier, setUserTier] = useState('free');
  const [usage, setUsage] = useState({
    aiChat: { count: 0, resetTime: null },
    homeworkSolver: { count: 0, resetTime: null },
    modelComparison: { count: 0, resetTime: null },
    explodeMode: { count: 0, resetTime: null },
  });

  // Load usage from localStorage on mount
  useEffect(() => {
    loadUsage();
    loadTier();
  }, [user]);

  const loadTier = () => {
    const savedTier = localStorage.getItem(STORAGE_KEYS.userTier) || 'free';
    setUserTier(savedTier);
  };

  const loadUsage = () => {
    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const monthMs = 30 * 24 * 60 * 60 * 1000;

    // Load AI chat usage (monthly)
    const aiChatData = JSON.parse(localStorage.getItem(STORAGE_KEYS.aiChat) || '{}');
    const aiChatReset = aiChatData.resetTime || now + monthMs;
    const aiChatCount = aiChatReset > now ? (aiChatData.count || 0) : 0;

    // Load homework solver usage (monthly)
    const homeworkData = JSON.parse(localStorage.getItem(STORAGE_KEYS.homeworkSolver) || '{}');
    const homeworkReset = homeworkData.resetTime || now + monthMs;
    const homeworkCount = homeworkReset > now ? (homeworkData.count || 0) : 0;

    // Load model comparison usage (weekly)
    const comparisonData = JSON.parse(localStorage.getItem(STORAGE_KEYS.modelComparison) || '{}');
    const comparisonReset = comparisonData.resetTime || now + weekMs;
    const comparisonCount = comparisonReset > now ? (comparisonData.count || 0) : 0;

    // Load explode mode usage (weekly for free/starter, monthly for pro)
    const explodeData = JSON.parse(localStorage.getItem(STORAGE_KEYS.explodeMode) || '{}');
    const explodeReset = explodeData.resetTime || now + weekMs;
    const explodeCount = explodeReset > now ? (explodeData.count || 0) : 0;

    setUsage({
      aiChat: { count: aiChatCount, resetTime: aiChatCount === 0 ? now + monthMs : aiChatReset },
      homeworkSolver: { count: homeworkCount, resetTime: homeworkCount === 0 ? now + monthMs : homeworkReset },
      modelComparison: { count: comparisonCount, resetTime: comparisonCount === 0 ? now + weekMs : comparisonReset },
      explodeMode: { count: explodeCount, resetTime: explodeCount === 0 ? now + weekMs : explodeReset },
    });
  };

  const saveUsage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getCurrentLimits = () => TIER_LIMITS[userTier] || TIER_LIMITS.free;

  // Upgrade tier (called after successful payment)
  const upgradeTier = (newTier) => {
    setUserTier(newTier);
    localStorage.setItem(STORAGE_KEYS.userTier, newTier);
  };

  // Check if user can use AI chat
  const canUseAiChat = () => {
    const limits = getCurrentLimits();
    if (limits.aiChatPerMonth === -1) return true;
    return usage.aiChat.count < limits.aiChatPerMonth;
  };

  // Use AI chat
  const useAiChat = () => {
    const limits = getCurrentLimits();
    if (limits.aiChatPerMonth === -1) return true;
    if (!canUseAiChat()) return false;

    const now = Date.now();
    const monthMs = 30 * 24 * 60 * 60 * 1000;
    const newCount = usage.aiChat.count + 1;
    const resetTime = usage.aiChat.resetTime || now + monthMs;

    const newData = { count: newCount, resetTime };
    setUsage((prev) => ({ ...prev, aiChat: newData }));
    saveUsage(STORAGE_KEYS.aiChat, newData);
    return true;
  };

  // Check if user can use homework solver
  const canUseHomeworkSolver = () => {
    const limits = getCurrentLimits();
    if (limits.homeworkSolverPerMonth === -1) return true;
    return usage.homeworkSolver.count < limits.homeworkSolverPerMonth;
  };

  // Use homework solver
  const useHomeworkSolver = () => {
    const limits = getCurrentLimits();
    if (limits.homeworkSolverPerMonth === -1) return true;
    if (!canUseHomeworkSolver()) return false;

    const now = Date.now();
    const monthMs = 30 * 24 * 60 * 60 * 1000;
    const newCount = usage.homeworkSolver.count + 1;
    const resetTime = usage.homeworkSolver.resetTime || now + monthMs;

    const newData = { count: newCount, resetTime };
    setUsage((prev) => ({ ...prev, homeworkSolver: newData }));
    saveUsage(STORAGE_KEYS.homeworkSolver, newData);
    return true;
  };

  // Check if user can use model comparison
  const canUseModelComparison = () => {
    const limits = getCurrentLimits();
    if (limits.modelComparisonPerWeek === -1) return true;
    return usage.modelComparison.count < limits.modelComparisonPerWeek;
  };

  // Use model comparison
  const useModelComparison = () => {
    const limits = getCurrentLimits();
    if (limits.modelComparisonPerWeek === -1) return true;
    if (!canUseModelComparison()) return false;

    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const newCount = usage.modelComparison.count + 1;
    const resetTime = usage.modelComparison.resetTime || now + weekMs;

    const newData = { count: newCount, resetTime };
    setUsage((prev) => ({ ...prev, modelComparison: newData }));
    saveUsage(STORAGE_KEYS.modelComparison, newData);
    return true;
  };

  // Check if user can use explode mode (JARVIS)
  const canUseExplodeMode = () => {
    const limits = getCurrentLimits();
    const limit = userTier === 'pro' ? limits.explodeModePerMonth : limits.explodeModePerWeek;
    if (limit === -1) return true;
    return usage.explodeMode.count < limit;
  };

  // Use explode mode
  const useExplodeMode = () => {
    const limits = getCurrentLimits();
    const limit = userTier === 'pro' ? limits.explodeModePerMonth : limits.explodeModePerWeek;
    if (limit === -1) return true;
    if (!canUseExplodeMode()) return false;

    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const monthMs = 30 * 24 * 60 * 60 * 1000;
    const resetPeriod = userTier === 'pro' ? monthMs : weekMs;
    const newCount = usage.explodeMode.count + 1;
    const resetTime = usage.explodeMode.resetTime || now + resetPeriod;

    const newData = { count: newCount, resetTime };
    setUsage((prev) => ({ ...prev, explodeMode: newData }));
    saveUsage(STORAGE_KEYS.explodeMode, newData);
    return true;
  };

  // Get remaining uses
  const getRemainingAiChats = () => {
    const limits = getCurrentLimits();
    if (limits.aiChatPerMonth === -1) return Infinity;
    return Math.max(0, limits.aiChatPerMonth - usage.aiChat.count);
  };

  const getRemainingHomeworkSolves = () => {
    const limits = getCurrentLimits();
    if (limits.homeworkSolverPerMonth === -1) return Infinity;
    return Math.max(0, limits.homeworkSolverPerMonth - usage.homeworkSolver.count);
  };

  const getRemainingComparisons = () => {
    const limits = getCurrentLimits();
    if (limits.modelComparisonPerWeek === -1) return Infinity;
    return Math.max(0, limits.modelComparisonPerWeek - usage.modelComparison.count);
  };

  const getRemainingExplodes = () => {
    const limits = getCurrentLimits();
    const limit = userTier === 'pro' ? limits.explodeModePerMonth : limits.explodeModePerWeek;
    if (limit === -1) return Infinity;
    return Math.max(0, limit - usage.explodeMode.count);
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

  // Check if lesson is accessible based on tier
  const isLessonAccessible = (lessonLevel) => {
    const limits = getCurrentLimits();
    const level = lessonLevel?.toLowerCase() || 'beginner';

    if (limits.lessonsAccess === 'all') return true;
    if (limits.lessonsAccess === 'advanced') {
      return ['beginner', 'intermediate', 'advanced'].includes(level);
    }
    if (limits.lessonsAccess === 'beginner') {
      return level === 'beginner';
    }
    return false;
  };

  // Check if calculator is accessible (based on percentage)
  const isCalculatorFree = (calculatorIndex, totalCalculators) => {
    const limits = getCurrentLimits();
    const freeCount = Math.ceil(totalCalculators * (limits.calculatorPercent / 100));
    return calculatorIndex < freeCount;
  };

  // Check if career projects are accessible
  const canAccessCareerProjects = () => {
    return getCurrentLimits().careerProjects;
  };

  // Check if certificates are accessible
  const canGenerateCertificates = () => {
    return getCurrentLimits().certificates;
  };

  // Check VR support
  const hasVRSupport = () => {
    return getCurrentLimits().vrSupport;
  };

  // Check early access
  const hasEarlyAccess = () => {
    return getCurrentLimits().earlyAccess;
  };

  const isPremium = userTier !== 'free';

  const value = {
    userTier,
    isPremium,
    upgradeTier,
    usage,
    limits: getCurrentLimits(),
    tierLimits: TIER_LIMITS,
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
    // Explode Mode
    canUseExplodeMode,
    useExplodeMode,
    getRemainingExplodes,
    // Time until reset
    getTimeUntilReset,
    // Content access
    isLessonAccessible,
    isCalculatorFree,
    canAccessCareerProjects,
    canGenerateCertificates,
    hasVRSupport,
    hasEarlyAccess,
  };

  return <UsageLimitsContext.Provider value={value}>{children}</UsageLimitsContext.Provider>;
}

export function useUsageLimits() {
  const context = useContext(UsageLimitsContext);
  if (!context) {
    throw new Error('useUsageLimits must be used within a UsageLimitsProvider');
  }
  return context;
}
