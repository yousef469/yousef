import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

export default function AuthCallback() {
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 Auth callback triggered');
        console.log('📍 Current URL:', window.location.href);
        console.log('📍 Search params:', window.location.search);
        console.log('📍 Hash:', window.location.hash);
        
        setStatus('Processing authentication...');
        
        // Check for PKCE code in query params (Supabase PKCE flow)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        console.log('🔐 Auth code in URL:', !!code);
        
        if (code) {
          console.log('✅ PKCE code found, exchanging for session...');
          
          // Supabase will automatically exchange the code for a session
          // We just need to call getSession() and it will handle the exchange
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          console.log('📦 Exchange result:', data);
          console.log('❌ Exchange error:', error);
          
          if (error) {
            console.error('❌ Failed to exchange code:', error);
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
            return;
          }
        }
        
        // Fallback: Check for hash params (implicit flow - older method)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        console.log('🔑 Access token in hash:', !!accessToken);
        
        if (accessToken) {
          console.log('✅ Access token found in hash, setting session...');
          
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
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
            setStatus('Success! Redirecting to dashboard...');
            await new Promise(resolve => setTimeout(resolve, 500));
            window.location.href = '/';
            return;
          }
        }
        
        // No code or tokens found
        console.log('⚠️ No auth code or tokens in URL, checking existing session...');
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          console.log('✅ Found existing session, redirecting...');
          window.location.href = '/';
          return;
        }
        
        console.log('❌ No session found, redirecting to home...');
        setStatus('No authentication data found, redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
        
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
