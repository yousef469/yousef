import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

export default function AuthCallback() {
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 Auth callback triggered');
        console.log('📍 Current URL:', window.location.href);
        console.log('📍 Hash:', window.location.hash);
        
        setStatus('Verifying authentication...');
        
        // Wait a moment for Supabase to process the hash
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession();
        
        console.log('📦 Session data:', data);
        console.log('❌ Session error:', error);
        
        if (error) {
          console.error('❌ Auth callback error:', error);
          setStatus('Authentication failed, redirecting...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
          return;
        }
        
        if (data.session) {
          console.log('✅ Auth successful! User:', data.session.user.email);
          console.log('🔑 Access token exists:', !!data.session.access_token);
          
          setStatus('Success! Redirecting to dashboard...');
          
          // Wait a moment to ensure the auth state is propagated
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Force a full page reload to ensure auth state is picked up
          window.location.href = '/';
        } else {
          console.log('⚠️ No session found in callback');
          setStatus('No session found, redirecting...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        }
      } catch (error) {
        console.error('❌ Auth callback error:', error);
        setStatus('Error occurred, redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg mb-2">Completing sign in...</p>
        <p className="text-gray-400 text-sm">{status}</p>
      </div>
    </div>
  );
}
