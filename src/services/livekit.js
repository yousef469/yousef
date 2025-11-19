/**
 * LiveKit Service
 * Handles video/audio token generation for Virtual Classroom
 */

import { AccessToken } from 'livekit-server-sdk';

/**
 * Generate LiveKit access token for a user
 * 
 * NOTE: In production, this should be done on the backend for security.
 * For MVP/development, we're doing it client-side.
 * 
 * @param {string} roomName - Room identifier
 * @param {string} participantName - User's display name
 * @param {boolean} isTeacher - Whether user has teacher privileges
 * @returns {Promise<string>} JWT token
 */
export async function generateToken(roomName, participantName, isTeacher = false) {
  const apiKey = import.meta.env.VITE_LIVEKIT_API_KEY;
  const apiSecret = import.meta.env.VITE_LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.warn('LiveKit credentials not configured. Video/audio will be disabled.');
    return null;
  }

  try {
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      name: participantName,
    });

    // Grant permissions
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
      // Teachers can control room settings
      roomAdmin: isTeacher,
    });

    return at.toJwt();
  } catch (error) {
    console.error('Failed to generate LiveKit token:', error);
    return null;
  }
}

/**
 * Get LiveKit WebSocket URL
 * @returns {string} LiveKit server URL
 */
export function getLiveKitUrl() {
  return import.meta.env.VITE_LIVEKIT_URL || '';
}

/**
 * Check if LiveKit is configured
 * @returns {boolean}
 */
export function isLiveKitConfigured() {
  return !!(
    import.meta.env.VITE_LIVEKIT_URL &&
    import.meta.env.VITE_LIVEKIT_API_KEY &&
    import.meta.env.VITE_LIVEKIT_API_SECRET
  );
}
