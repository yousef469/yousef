import { useEffect, useRef } from 'react';
import { createRoomUrl } from '../services/daily';

/**
 * Daily.co Video Chat Component
 * Simple iframe embed - no complex setup needed!
 */
export default function DailyVideoChat({ roomId, userName }) {
  const iframeRef = useRef(null);
  const roomUrl = createRoomUrl(roomId);

  useEffect(() => {
    if (!roomUrl) return;

    // Daily.co automatically creates rooms on the fly
    // Just load the iframe and it works!
    console.log('Loading Daily.co room:', roomUrl);
  }, [roomUrl]);

  if (!roomUrl) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-text-muted mb-2">Video/Audio Disabled</p>
          <p className="text-xs text-text-muted">
            Add VITE_DAILY_DOMAIN to .env to enable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <iframe
        ref={iframeRef}
        src={`${roomUrl}?userName=${encodeURIComponent(userName)}`}
        allow="camera; microphone; fullscreen; display-capture"
        className="w-full h-full border-0 rounded-lg"
        title="Daily.co Video Chat"
      />
    </div>
  );
}
