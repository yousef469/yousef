import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { AuthProvider } from './contexts/AuthContext'
import { LivesProvider } from './contexts/LivesContext'
import { GenerationsProvider } from './contexts/GenerationsContext'
import { ProgressProvider } from './contexts/ProgressContext'
import { UsageLimitsProvider } from './contexts/UsageLimitsContext'
import App from './App.jsx'
import { initErrorTracking } from './services/errorTracking'

// Defer heavy, non-critical widget until after initial render
const LazyTawkToChat = React.lazy(() => import('./components/TawkToChat'))
import './index.css'
import './i18n/config'

// Initialize error tracking for production
initErrorTracking();
console.log('✅ Vercel Analytics + Error Tracking enabled');

// Deferred mount for TawkToChat
function DeferredTawk() {
  const [mount, setMount] = React.useState(false);
  React.useEffect(() => {
    const schedule = window.requestIdleCallback || ((fn) => setTimeout(fn, 2000));
    schedule(() => setMount(true));
  }, []);
  return mount ? (
    <React.Suspense fallback={null}>
      <LazyTawkToChat />
    </React.Suspense>
  ) : null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UsageLimitsProvider>
        <LivesProvider>
          <GenerationsProvider>
            <ProgressProvider>
              <App />
              <Analytics />
              <DeferredTawk />
            </ProgressProvider>
          </GenerationsProvider>
        </LivesProvider>
      </UsageLimitsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
