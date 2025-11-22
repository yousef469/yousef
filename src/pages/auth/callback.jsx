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
        
        // Check if we have hash params (OAuth callback)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        console.log('🔑 Access token in URL:', !!accessToken);
        console.log('🔄 Refresh token in URL:', !!refreshToken);
        
        if (!accessToken) {
          console.log('⚠️ No access token in URL, checking existing session...');
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            console.log('✅ Found existing session, redirecting...');
            window.location.href = '/';
            return;
          }
          console.log('❌ No session found, redirecting to home...');
          window.location.href = '/';
          return;
        }
        
        setStatus('Processing authentication tokens...');
        
        // Set the session from the tokens in the URL
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
        
        console.log('📦 Set session result:', data);
        console.log('❌ Set session error:', error);
        
        if (error) {
          console.error('❌ Failed to set session:', error);
          setStatus('Authentication failed, redirecting...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
          return;
        }
        
        if (data.session) {
          console.log('✅ Auth successful! User:', data.session.user.email);
          console.log('💾 Session saved to localStorage');
          
          setStatus('Success! Redirecting to dashboard...');
          
          // Wait to ensure the session is fully saved
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Redirect to home (will show logged in page)
          window.location.href = '/';
        } else {
          console.log('⚠️ No session created');
          setStatus('No session created, redirecting...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      } catch (error) {
        console.error('❌ Auth callback error:', error);
        setStatus('Error occurred, redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
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
