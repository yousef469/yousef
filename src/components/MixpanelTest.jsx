import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader2, Activity } from 'lucide-react';
import mixpanel from 'mixpanel-browser';

const MixpanelTest = () => {
  const [status, setStatus] = useState('idle'); // idle, testing, success, error
  const [message, setMessage] = useState('');

  const testMixpanel = () => {
    setStatus('testing');
    setMessage('Testing Mixpanel connection...');

    try {
      // Check if token exists
      const token = import.meta.env.VITE_MIXPANEL_TOKEN;
      
      if (!token || token === 'YOUR_MIXPANEL_TOKEN_HERE') {
        setStatus('error');
        setMessage('❌ Mixpanel token not configured. Please add VITE_MIXPANEL_TOKEN to your .env file.');
        return;
      }

      // Send test event
      mixpanel.track('Mixpanel Test Event', {
        test: true,
        timestamp: new Date().toISOString(),
        source: 'test_component'
      });

      // If we get here, it worked
      setTimeout(() => {
        setStatus('success');
        setMessage('✅ Mixpanel is working! Check your Mixpanel Live View to see the test event.');
      }, 500);

    } catch (error) {
      setStatus('error');
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-2xl max-w-sm">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white">Mixpanel Test</h3>
        </div>

        {status === 'idle' && (
          <button
            onClick={testMixpanel}
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-white transition-all"
          >
            Test Connection
          </button>
        )}

        {status === 'testing' && (
          <div className="flex items-center gap-3 text-gray-300">
            <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
            <span>{message}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-green-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{message}</span>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold text-white transition-all"
            >
              Test Again
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-red-400">
              <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{message}</span>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold text-white transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Token: {import.meta.env.VITE_MIXPANEL_TOKEN ? 
              `${import.meta.env.VITE_MIXPANEL_TOKEN.substring(0, 8)}...` : 
              'Not configured'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MixpanelTest;
