import { useAuth } from '../contexts/AuthContext';
import { Sparkles } from 'lucide-react';
import HomePageLoggedIn from './HomePageLoggedIn';
import LandingPage from './LandingPage';
import { useLocation } from 'react-router-dom';

const HomeRouter = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-xl text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // AUTH DISABLED FOR BETA:
  // - "/" shows landing page (for new visitors)
  // - "/home" shows the main app (logged-in experience)
  // When auth is re-enabled, change back to: return user ? <HomePageLoggedIn /> : <LandingPage />;
  
  if (location.pathname === '/home') {
    return <HomePageLoggedIn />;
  }
  
  return <LandingPage />;
};

export default HomeRouter;
