import mixpanel from 'mixpanel-browser';

// Mixpanel is initialized in main.jsx
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

// ============================================
// USER IDENTIFICATION
// ============================================

export const identifyUser = (userId, userProperties = {}) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.identify(userId);
  mixpanel.people.set({
    $email: userProperties.email,
    $name: userProperties.name,
    $created: userProperties.createdAt || new Date().toISOString(),
    ...userProperties,
  });
};

export const resetUser = () => {
  if (!MIXPANEL_TOKEN) return;
  mixpanel.reset();
};

// ============================================
// PAGE TRACKING
// ============================================

export const trackPageView = (pageName, properties = {}) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Page View', {
    page: pageName,
    url: window.location.href,
    referrer: document.referrer,
    ...properties,
  });
};

// ============================================
// AUTHENTICATION EVENTS
// ============================================

export const trackSignUp = (method = 'email') => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Sign Up', {
    method,
    timestamp: new Date().toISOString(),
  });
};

export const trackSignIn = (method = 'email') => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Sign In', {
    method,
    timestamp: new Date().toISOString(),
  });
};

export const trackSignOut = () => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Sign Out', {
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// LEARNING EVENTS
// ============================================

export const trackLessonStart = (lessonId, lessonName, category) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Lesson Started', {
    lesson_id: lessonId,
    lesson_name: lessonName,
    category,
    timestamp: new Date().toISOString(),
  });
};

export const trackLessonComplete = (lessonId, lessonName, category, timeSpent, score) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Lesson Completed', {
    lesson_id: lessonId,
    lesson_name: lessonName,
    category,
    time_spent_seconds: timeSpent,
    score,
    timestamp: new Date().toISOString(),
  });
  
  // Increment lesson count
  mixpanel.people.increment('lessons_completed');
  mixpanel.people.set({
    last_lesson_completed: lessonName,
    last_lesson_date: new Date().toISOString(),
  });
};

export const trackQuizAttempt = (quizId, score, totalQuestions, category) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Quiz Attempted', {
    quiz_id: quizId,
    score,
    total_questions: totalQuestions,
    percentage: (score / totalQuestions) * 100,
    category,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('quizzes_taken');
};

// ============================================
// 3D MODEL EVENTS
// ============================================

export const trackModelView = (modelId, modelName, category) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Model Viewed', {
    model_id: modelId,
    model_name: modelName,
    category,
    timestamp: new Date().toISOString(),
  });
};

export const trackModelInteraction = (modelId, modelName, action) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Model Interaction', {
    model_id: modelId,
    model_name: modelName,
    action, // rotate, zoom, pan, etc.
    timestamp: new Date().toISOString(),
  });
};

export const trackModelComparison = (model1, model2) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Model Comparison', {
    model_1: model1,
    model_2: model2,
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// AI TUTOR EVENTS
// ============================================

export const trackAIQuestion = (question, category, hasVoice = false) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('AI Question Asked', {
    question_length: question.length,
    category,
    has_voice: hasVoice,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('ai_questions_asked');
};

export const trackAIResponse = (question, responseTime, hasVoice = false) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('AI Response Received', {
    response_time_ms: responseTime,
    has_voice: hasVoice,
    timestamp: new Date().toISOString(),
  });
};

export const trackVoiceInput = (duration) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Voice Input Used', {
    duration_seconds: duration,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('voice_inputs_used');
};

// ============================================
// GAMIFICATION EVENTS
// ============================================

export const trackLevelUp = (newLevel, xpEarned) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Level Up', {
    new_level: newLevel,
    xp_earned: xpEarned,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.set({
    current_level: newLevel,
    total_xp: xpEarned,
  });
};

export const trackAchievementUnlocked = (achievementId, achievementName) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Achievement Unlocked', {
    achievement_id: achievementId,
    achievement_name: achievementName,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('achievements_unlocked');
};

export const trackDailyChallengeComplete = (challengeId, score, streak) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Daily Challenge Completed', {
    challenge_id: challengeId,
    score,
    streak,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.set({
    current_streak: streak,
    last_challenge_date: new Date().toISOString(),
  });
};

export const trackRewardPurchase = (rewardId, rewardName, cost) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Reward Purchased', {
    reward_id: rewardId,
    reward_name: rewardName,
    cost,
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// GAME EVENTS
// ============================================

export const trackGameStart = (gameType, category) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Game Started', {
    game_type: gameType,
    category,
    timestamp: new Date().toISOString(),
  });
};

export const trackGameComplete = (gameType, category, score, timeSpent) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Game Completed', {
    game_type: gameType,
    category,
    score,
    time_spent_seconds: timeSpent,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('games_played');
};

// ============================================
// SOCIAL EVENTS
// ============================================

export const trackSocialShare = (platform, contentType) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Social Share', {
    platform, // twitter, linkedin, facebook
    content_type: contentType, // achievement, progress, model
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('social_shares');
};

export const trackCollaborationStart = (sessionId, isHost) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Collaboration Started', {
    session_id: sessionId,
    is_host: isHost,
    timestamp: new Date().toISOString(),
  });
};

export const trackCollaborationJoin = (sessionId) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Collaboration Joined', {
    session_id: sessionId,
    timestamp: new Date().toISOString(),
  });
};

export const trackCommunityQuestion = (questionLength, category) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Community Question Posted', {
    question_length: questionLength,
    category,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('community_questions_posted');
};

export const trackCommunityAnswer = (questionId, answerLength) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Community Answer Posted', {
    question_id: questionId,
    answer_length: answerLength,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('community_answers_posted');
};

// ============================================
// CONTENT CREATION EVENTS
// ============================================

export const trackModelUpload = (modelSize, modelType) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Model Uploaded', {
    model_size_mb: modelSize,
    model_type: modelType,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('models_uploaded');
};

export const trackBookmarkAdd = (contentType, contentId) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Bookmark Added', {
    content_type: contentType,
    content_id: contentId,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('bookmarks_created');
};

export const trackNoteAdd = (contentType, noteLength) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Note Added', {
    content_type: contentType,
    note_length: noteLength,
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// SUBSCRIPTION EVENTS
// ============================================

export const trackSubscriptionView = (tier) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Subscription Viewed', {
    tier, // free, pro, master
    timestamp: new Date().toISOString(),
  });
};

export const trackSubscriptionUpgrade = (fromTier, toTier, price) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Subscription Upgraded', {
    from_tier: fromTier,
    to_tier: toTier,
    price,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.set({
    subscription_tier: toTier,
    subscription_price: price,
  });
  
  // Track revenue
  mixpanel.people.track_charge(price);
};

// ============================================
// FEATURE USAGE EVENTS
// ============================================

export const trackFeatureUsed = (featureName, properties = {}) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Feature Used', {
    feature_name: featureName,
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

export const trackCalculatorUsed = (calculatorType, inputs) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Calculator Used', {
    calculator_type: calculatorType,
    inputs,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('calculators_used');
};

export const trackSearchPerformed = (query, resultsCount) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Search Performed', {
    query,
    results_count: resultsCount,
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// ERROR TRACKING
// ============================================

export const trackError = (errorType, errorMessage, context = {}) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Error Occurred', {
    error_type: errorType,
    error_message: errorMessage,
    context,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// ENGAGEMENT METRICS
// ============================================

export const trackSessionStart = () => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Session Started', {
    timestamp: new Date().toISOString(),
  });
};

export const trackSessionEnd = (duration) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Session Ended', {
    duration_seconds: duration,
    timestamp: new Date().toISOString(),
  });
  
  mixpanel.people.increment('total_sessions');
  mixpanel.people.set({
    last_seen: new Date().toISOString(),
  });
};

export const trackTimeSpent = (page, duration) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Time Spent', {
    page,
    duration_seconds: duration,
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  identifyUser,
  resetUser,
  trackPageView,
  trackSignUp,
  trackSignIn,
  trackSignOut,
  trackLessonStart,
  trackLessonComplete,
  trackQuizAttempt,
  trackModelView,
  trackModelInteraction,
  trackModelComparison,
  trackAIQuestion,
  trackAIResponse,
  trackVoiceInput,
  trackLevelUp,
  trackAchievementUnlocked,
  trackDailyChallengeComplete,
  trackRewardPurchase,
  trackGameStart,
  trackGameComplete,
  trackSocialShare,
  trackCollaborationStart,
  trackCollaborationJoin,
  trackCommunityQuestion,
  trackCommunityAnswer,
  trackModelUpload,
  trackBookmarkAdd,
  trackNoteAdd,
  trackSubscriptionView,
  trackSubscriptionUpgrade,
  trackFeatureUsed,
  trackCalculatorUsed,
  trackSearchPerformed,
  trackError,
  trackSessionStart,
  trackSessionEnd,
  trackTimeSpent,
};
