// Security service - Production hardening
// Prevents common attack vectors and protects sensitive data

const IS_PRODUCTION = import.meta.env.PROD;

// Disable console in production
export const disableConsole = () => {
  if (!IS_PRODUCTION) return;
  
  const noop = () => {};
  
  // Override console methods
  console.log = noop;
  console.warn = noop;
  console.error = noop;
  console.info = noop;
  console.debug = noop;
  console.trace = noop;
  console.dir = noop;
  console.dirxml = noop;
  console.table = noop;
  console.group = noop;
  console.groupCollapsed = noop;
  console.groupEnd = noop;
  console.time = noop;
  console.timeEnd = noop;
  console.timeLog = noop;
  console.clear = noop;
  console.count = noop;
  console.countReset = noop;
  console.assert = noop;
  console.profile = noop;
  console.profileEnd = noop;
};

// Disable right-click context menu
export const disableContextMenu = () => {
  if (!IS_PRODUCTION) return;
  
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
};

// Disable keyboard shortcuts for dev tools
export const disableDevToolsShortcuts = () => {
  if (!IS_PRODUCTION) return;
  
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+I (Dev Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      return false;
    }
  });
};

// Detect dev tools open
export const detectDevTools = () => {
  if (!IS_PRODUCTION) return;
  
  const threshold = 160;
  
  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      // Dev tools detected - you can add custom behavior here
      // For now, just clear sensitive data from memory
      clearSensitiveData();
    }
  };
  
  // Check periodically
  setInterval(checkDevTools, 1000);
  
  // Also check on resize
  window.addEventListener('resize', checkDevTools);
};

// Clear sensitive data from memory
const clearSensitiveData = () => {
  // Clear any cached API responses that might contain sensitive data
  if (window.__SENSITIVE_CACHE__) {
    window.__SENSITIVE_CACHE__ = null;
  }
};

// Disable text selection on sensitive elements
export const disableTextSelection = () => {
  if (!IS_PRODUCTION) return;
  
  const style = document.createElement('style');
  style.textContent = `
    .no-select {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);
};

// Prevent iframe embedding (clickjacking protection)
export const preventClickjacking = () => {
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }
};

// Add CSP meta tag
export const addCSPMeta = () => {
  if (!IS_PRODUCTION) return;
  
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co https://*.google.com https://*.googleapis.com https://*.vercel-analytics.com https://*.mixpanel.com https://*.render.com wss://*.supabase.co;";
  document.head.appendChild(meta);
};

// Initialize all security measures
export const initSecurity = () => {
  disableConsole();
  disableContextMenu();
  disableDevToolsShortcuts();
  detectDevTools();
  disableTextSelection();
  preventClickjacking();
  // Note: CSP should be set via HTTP headers in production, not meta tags
};

export default {
  initSecurity,
  disableConsole,
  disableContextMenu,
  disableDevToolsShortcuts,
  detectDevTools,
  disableTextSelection,
  preventClickjacking,
};
