/**
 * Daily.co Service (Simpler Alternative to LiveKit)
 * Much easier setup - just need one domain name!
 */

/**
 * Get Daily.co domain
 * @returns {string} Daily domain (e.g., 'engineerium.daily.co')
 */
export function getDailyDomain() {
  return import.meta.env.VITE_DAILY_DOMAIN || '';
}

/**
 * Create room URL for Daily.co
 * @param {string} roomName - Room identifier
 * @returns {string} Full Daily.co room URL
 */
export function createRoomUrl(roomName) {
  const domain = getDailyDomain();
  if (!domain) {
    console.warn('Daily.co domain not configured');
    return '';
  }
  
  // Daily.co automatically creates rooms on the fly
  // Just use: https://your-domain.daily.co/room-name
  return `https://${domain}/${roomName}`;
}

/**
 * Check if Daily.co is configured
 * @returns {boolean}
 */
export function isDailyConfigured() {
  return !!getDailyDomain();
}

/**
 * Get Daily.co call configuration
 * @param {boolean} isTeacher - Whether user is teacher
 * @returns {object} Daily call configuration
 */
export function getDailyConfig(isTeacher = false) {
  return {
    // UI customization
    showLeaveButton: true,
    showFullscreenButton: true,
    
    // Audio/Video settings
    startVideoOff: false,
    startAudioOff: false,
    
    // Layout
    layout: 'grid', // or 'sidebar'
    
    // Permissions (teachers can control more)
    ...(isTeacher && {
      showParticipantsBar: true,
      showLocalVideo: true,
    }),
  };
}
