// Simple error tracking service
// For production, consider upgrading to Sentry: npm install @sentry/react

const ERROR_LOG_KEY = 'error_log';
const MAX_ERRORS = 100;

// Initialize error tracking
export const initErrorTracking = () => {
  // Global error handler
  window.onerror = (message, source, lineno, colno, error) => {
    logError({
      type: 'uncaught',
      message,
      source,
      lineno,
      colno,
      stack: error?.stack,
    });
    return false;
  };

  // Unhandled promise rejection handler
  window.onunhandledrejection = (event) => {
    logError({
      type: 'unhandled_promise',
      message: event.reason?.message || String(event.reason),
      stack: event.reason?.stack,
    });
  };

  console.log('🛡️ Error tracking initialized');
};

// Log an error
export const logError = (errorData) => {
  try {
    const errors = JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
    
    const errorEntry = {
      ...errorData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: localStorage.getItem('user_id') || 'anonymous',
    };

    errors.unshift(errorEntry);
    
    // Keep only last MAX_ERRORS
    if (errors.length > MAX_ERRORS) {
      errors.length = MAX_ERRORS;
    }

    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(errors));
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('🚨 Error logged:', errorEntry);
    }

    // Send to backend if available
    sendErrorToBackend(errorEntry);
  } catch (e) {
    console.error('Failed to log error:', e);
  }
};

// Send error to backend
const sendErrorToBackend = async (errorEntry) => {
  try {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    if (!serverUrl) return;

    await fetch(`${serverUrl}/api/errors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorEntry),
    }).catch(() => {}); // Silently fail
  } catch (e) {
    // Silently fail - don't want error tracking to cause errors
  }
};

// Get all logged errors
export const getErrors = () => {
  try {
    return JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
  } catch {
    return [];
  }
};

// Clear error log
export const clearErrors = () => {
  localStorage.removeItem(ERROR_LOG_KEY);
};

// Track specific error types
export const trackAPIError = (endpoint, status, message) => {
  logError({
    type: 'api_error',
    endpoint,
    status,
    message,
  });
};

export const trackComponentError = (componentName, error) => {
  logError({
    type: 'component_error',
    component: componentName,
    message: error.message,
    stack: error.stack,
  });
};

export const trackUserAction = (action, details = {}) => {
  // For debugging user flows
  if (import.meta.env.DEV) {
    console.log(`📊 User action: ${action}`, details);
  }
};

export default {
  initErrorTracking,
  logError,
  getErrors,
  clearErrors,
  trackAPIError,
  trackComponentError,
  trackUserAction,
};
