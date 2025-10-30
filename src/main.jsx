import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { AuthProvider } from './contexts/AuthContext'
import { LivesProvider } from './contexts/LivesContext'
import { GenerationsProvider } from './contexts/GenerationsContext'
import App from './App.jsx'
import TawkToChat from './components/TawkToChat'
import './index.css'
import './i18n/config'
import mixpanel from 'mixpanel-browser'

// Initialize Mixpanel
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;
if (MIXPANEL_TOKEN && MIXPANEL_TOKEN !== 'YOUR_MIXPANEL_TOKEN_HERE') {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: 'localStorage',
    ignore_dnt: false,
  });
  console.log('✅ Mixpanel initialized successfully');
} else {
  console.warn('⚠️ Mixpanel token not configured. Add VITE_MIXPANEL_TOKEN to your .env file.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LivesProvider>
        <GenerationsProvider>
          <App />
          <Analytics />
          <TawkToChat />
        </GenerationsProvider>
      </LivesProvider>
    </AuthProvider>
  </React.StrictMode>,
)
