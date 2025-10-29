import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Widget
 * Free live chat support for your website
 */
export default function TawkToChat() {
  useEffect(() => {
    // Get Tawk.to property ID from environment
    const tawkPropertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
    const tawkWidgetId = import.meta.env.VITE_TAWK_WIDGET_ID || 'default';
    
    if (!tawkPropertyId) {
      console.warn('Tawk.to not configured. Add VITE_TAWK_PROPERTY_ID to .env');
      return;
    }

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Remove script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      // Remove Tawk.to widget
      const tawkWidget = document.getElementById('tawk-bubble');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, []);

  // This component doesn't render anything visible
  // The Tawk.to widget appears automatically
  return null;
}

/**
 * Helper functions to control Tawk.to programmatically
 */

// Show the chat widget
export function showTawkChat() {
  if (window.Tawk_API) {
    window.Tawk_API.showWidget();
  }
}

// Hide the chat widget
export function hideTawkChat() {
  if (window.Tawk_API) {
    window.Tawk_API.hideWidget();
  }
}

// Maximize (open) the chat window
export function openTawkChat() {
  if (window.Tawk_API) {
    window.Tawk_API.maximize();
  }
}

// Minimize (close) the chat window
export function closeTawkChat() {
  if (window.Tawk_API) {
    window.Tawk_API.minimize();
  }
}

// Set visitor name and email
export function setTawkVisitor(name, email) {
  if (window.Tawk_API) {
    window.Tawk_API.setAttributes({
      name: name,
      email: email
    });
  }
}

// Add custom tags to visitor
export function addTawkTags(tags) {
  if (window.Tawk_API && Array.isArray(tags)) {
    tags.forEach(tag => {
      window.Tawk_API.addTag(tag);
    });
  }
}

// Send a custom event
export function sendTawkEvent(eventName, metadata = {}) {
  if (window.Tawk_API) {
    window.Tawk_API.addEvent(eventName, metadata);
  }
}
