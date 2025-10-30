import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ptwjvfuwwjpfcivlqjxo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0d2p2ZnV3d2pwZmNpdmxxanhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjg5OTUsImV4cCI6MjA3NjY0NDk5NX0.XZMuH_2Vb7bqlpTT7AF0gi3aaf2Whs0On-QDaV8vBL0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// AUTHENTICATION
// ============================================

export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return { user };
};

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Social Authentication
export const signInWithGoogle = async () => {
  // Get the current origin dynamically
  const redirectUrl = `${window.location.origin}/`;
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  });
  return { data, error };
};

export const signInWithApple = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/`
    }
  });
  return { data, error };
};

// ============================================
// PROFILE
// ============================================

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  return { data, error };
};

// ============================================
// FAVORITES
// ============================================

export const getFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

export const addFavorite = async (userId, modelId) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, model_id: modelId }]);
  return { data, error };
};

export const removeFavorite = async (userId, modelId) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('model_id', modelId);
  return { data, error };
};

// ============================================
// PROGRESS
// ============================================

export const getProgress = async (userId, courseId) => {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();
  return { data, error };
};

export const updateProgress = async (userId, courseId, progressPercent) => {
  const { data, error } = await supabase
    .from('progress')
    .upsert({
      user_id: userId,
      course_id: courseId,
      progress_percent: progressPercent,
      completed: progressPercent === 100,
      last_accessed: new Date().toISOString(),
    });
  return { data, error };
};

// ============================================
// CHAT HISTORY
// ============================================

export const saveChatMessage = async (userId, userMessage, aiResponse, modelId = null) => {
  const { data, error } = await supabase
    .from('chat_history')
    .insert([{
      user_id: userId,
      user_message: userMessage,
      ai_response: aiResponse,
      model_id: modelId,
    }]);
  return { data, error };
};

export const getChatHistory = async (userId, limit = 50) => {
  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data, error };
};

// ============================================
// ACHIEVEMENTS
// ============================================

export const unlockAchievement = async (userId, achievementId) => {
  const { data, error } = await supabase
    .from('achievements')
    .insert([{
      user_id: userId,
      achievement_id: achievementId,
    }]);
  return { data, error };
};

export const getAchievements = async (userId) => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

// ============================================
// USER STATS
// ============================================

export const getUserStats = async (userId) => {
  const [favorites, progress, achievements, chatHistory] = await Promise.all([
    getFavorites(userId),
    supabase.from('progress').select('*').eq('user_id', userId),
    getAchievements(userId),
    supabase.from('chat_history').select('*').eq('user_id', userId),
  ]);

  const stats = {
    totalFavorites: favorites.data?.length || 0,
    coursesCompleted: progress.data?.filter(p => p.completed).length || 0,
    achievementsUnlocked: achievements.data?.length || 0,
    questionsAsked: chatHistory.data?.length || 0,
  };

  return { stats };
};

// ============================================
// STORAGE - BOOKS
// ============================================

export const getBookUrl = (filename) => {
  const { data } = supabase.storage
    .from('books')
    .getPublicUrl(filename);
  
  return data.publicUrl;
};

export const listBooks = async () => {
  const { data, error } = await supabase.storage
    .from('books')
    .list();
  
  return { data, error };
};
