import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

export default function AuthCallback() {
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setStatus('Processing authentication...');
        
        // Check for PKCE code in query params (Supabase PKCE flow)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            setStatus('Authentication failed, redirecting...');
            setTimeout(() => {
              window.location.href = '/';
            }, 1500);
            return;
          }
          
          if (data.session) {
            setStatus('Success! Redirecting to dashboard...');
            await new Promise(resolve => setTimeout(resolve, 500));
            window.location.href = '/';
            return;
          }
        }
        
        // Fallback: Check for hash params (implicit flow - older method)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (accessToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            setStatus('Authentication failed, redirecting...');
            setTimeout(() => {
              window.location.href = '/';
            }, 1500);
            return;
          }
          
          if (data.session) {
            setStatus('Success! Redirecting to dashboard...');
            await new Promise(resolve => setTimeout(resolve, 500));
            window.location.href = '/';
            return;
          }
        }
        
        // No code or tokens found
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          window.location.href = '/';
          return;
        }
        
        setStatus('No authentication data found, redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
        
      } catch (error) {
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
