import { useEffect } from 'react';
import { supabase } from '../../services/supabase';

export default function AuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 Auth callback triggered');
        console.log('📍 Current URL:', window.location.href);
        
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Auth callback error:', error);
          window.location.href = '/';
          return;
        }
        
        if (data.session) {
          console.log('✅ Auth successful! Session:', data.session.user.email);
          // Redirect to home page (which will show HomePageLoggedIn)
          window.location.href = '/';
        } else {
          console.log('⚠️ No session found, redirecting to home');
          window.location.href = '/';
        }
      } catch (error) {
        console.error('❌ Auth callback error:', error);
        window.location.href = '/';
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg">Completing sign in...</p>
      </div>
    </div>
  );
}
