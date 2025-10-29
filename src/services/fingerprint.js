// Device Fingerprinting & Fraud Prevention
// Uses FingerprintJS Pro for accurate device identification

const FINGERPRINT_API_KEY = import.meta.env.VITE_FINGERPRINT_API_KEY;

/**
 * Generate device fingerprint using multiple techniques
 */
export async function generateFingerprint() {
  try {
    // Method 1: FingerprintJS (most accurate)
    if (window.FingerprintJS && FINGERPRINT_API_KEY) {
      const fp = await window.FingerprintJS.load({ apiKey: FINGERPRINT_API_KEY });
      const result = await fp.get();
      return {
        visitorId: result.visitorId,
        confidence: result.confidence.score,
        method: 'fingerprintjs',
        components: result.components
      };
    }

    // Method 2: Custom fingerprinting (fallback)
    const fingerprint = await generateCustomFingerprint();
    return {
      visitorId: fingerprint,
      confidence: 0.7,
      method: 'custom',
      components: null
    };
  } catch (error) {
    console.error('Fingerprint generation error:', error);
    // Fallback to basic fingerprint
    return {
      visitorId: generateBasicFingerprint(),
      confidence: 0.5,
      method: 'basic',
      components: null
    };
  }
}

/**
 * Custom fingerprinting using browser APIs
 */
async function generateCustomFingerprint() {
  const components = [];

  // 1. Canvas fingerprinting
  components.push(await getCanvasFingerprint());

  // 2. WebGL fingerprinting
  components.push(getWebGLFingerprint());

  // 3. Audio fingerprinting
  components.push(await getAudioFingerprint());

  // 4. Screen & Device info
  components.push(getScreenFingerprint());

  // 5. Browser info
  components.push(getBrowserFingerprint());

  // 6. Timezone & Language
  components.push(getLocaleFingerprint());

  // 7. Hardware info
  components.push(getHardwareFingerprint());

  // 8. Font detection
  components.push(await getFontFingerprint());

  // Combine all components into a hash
  const combined = components.join('|');
  return await hashString(combined);
}

/**
 * Canvas fingerprinting
 */
async function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 200;
    canvas.height = 50;
    
    // Draw text with specific styling
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Device Fingerprint 🚀', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Device Fingerprint 🚀', 4, 17);
    
    return canvas.toDataURL();
  } catch (e) {
    return 'canvas-error';
  }
}

/**
 * WebGL fingerprinting
 */
function getWebGLFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return 'no-webgl';
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    
    return `${vendor}~${renderer}`;
  } catch (e) {
    return 'webgl-error';
  }
}

/**
 * Audio fingerprinting
 */
async function getAudioFingerprint() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return 'no-audio';
    
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const analyser = context.createAnalyser();
    const gainNode = context.createGain();
    const scriptProcessor = context.createScriptProcessor(4096, 1, 1);
    
    gainNode.gain.value = 0; // Mute
    oscillator.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.start(0);
    
    return new Promise((resolve) => {
      scriptProcessor.onaudioprocess = function(event) {
        const output = event.outputBuffer.getChannelData(0);
        const hash = Array.from(output.slice(0, 30)).join('');
        oscillator.stop();
        scriptProcessor.disconnect();
        context.close();
        resolve(hash);
      };
    });
  } catch (e) {
    return 'audio-error';
  }
}

/**
 * Screen fingerprinting
 */
function getScreenFingerprint() {
  return [
    screen.width,
    screen.height,
    screen.availWidth,
    screen.availHeight,
    screen.colorDepth,
    screen.pixelDepth,
    window.devicePixelRatio
  ].join('x');
}

/**
 * Browser fingerprinting
 */
function getBrowserFingerprint() {
  return [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    navigator.hardwareConcurrency,
    navigator.maxTouchPoints,
    navigator.vendor
  ].join('|');
}

/**
 * Locale fingerprinting
 */
function getLocaleFingerprint() {
  return [
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    new Date().getTimezoneOffset(),
    navigator.languages.join(',')
  ].join('|');
}

/**
 * Hardware fingerprinting
 */
function getHardwareFingerprint() {
  return [
    navigator.hardwareConcurrency || 'unknown',
    navigator.deviceMemory || 'unknown',
    navigator.maxTouchPoints || 0
  ].join('|');
}

/**
 * Font detection fingerprinting
 */
async function getFontFingerprint() {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testFonts = [
    'Arial', 'Verdana', 'Times New Roman', 'Courier New',
    'Georgia', 'Palatino', 'Garamond', 'Comic Sans MS'
  ];
  
  const detected = [];
  
  for (const font of testFonts) {
    if (await isFontAvailable(font, baseFonts)) {
      detected.push(font);
    }
  }
  
  return detected.join(',');
}

async function isFontAvailable(font, baseFonts) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const text = 'mmmmmmmmmmlli';
  
  ctx.font = `72px ${baseFonts[0]}`;
  const baseWidth = ctx.measureText(text).width;
  
  ctx.font = `72px ${font}, ${baseFonts[0]}`;
  const testWidth = ctx.measureText(text).width;
  
  return baseWidth !== testWidth;
}

/**
 * Hash string using SHA-256
 */
async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Basic fingerprint (last resort)
 */
function generateBasicFingerprint() {
  return [
    navigator.userAgent,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset()
  ].join('|');
}

/**
 * Get IP address and network info
 */
export async function getNetworkInfo() {
  try {
    // Use ipify API to get public IP
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    
    return {
      ip: data.ip,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Network info error:', error);
    return {
      ip: 'unknown',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Detect VPN/Proxy usage
 */
export async function detectVPN(ip) {
  try {
    // Use IPHub or similar service (requires API key)
    const API_KEY = import.meta.env.VITE_IPHUB_API_KEY;
    if (!API_KEY) return { isVPN: false, confidence: 0 };
    
    const response = await fetch(`https://v2.api.iphub.info/ip/${ip}`, {
      headers: { 'X-Key': API_KEY }
    });
    
    const data = await response.json();
    
    return {
      isVPN: data.block === 1,
      confidence: data.block === 1 ? 0.9 : 0.1,
      country: data.countryCode,
      isp: data.isp
    };
  } catch (error) {
    console.error('VPN detection error:', error);
    return { isVPN: false, confidence: 0 };
  }
}

/**
 * Check if device is suspicious
 */
export function detectSuspiciousBehavior() {
  const flags = [];
  
  // Check for automation tools
  if (navigator.webdriver) {
    flags.push('webdriver-detected');
  }
  
  // Check for headless browser
  if (!navigator.plugins || navigator.plugins.length === 0) {
    flags.push('no-plugins');
  }
  
  // Check for unusual screen size
  if (screen.width < 100 || screen.height < 100) {
    flags.push('unusual-screen');
  }
  
  // Check for missing features
  if (!window.chrome && !window.safari && !window.opera) {
    flags.push('unusual-browser');
  }
  
  return {
    isSuspicious: flags.length > 0,
    flags,
    riskScore: Math.min(flags.length * 0.3, 1)
  };
}

/**
 * Complete fraud check
 */
export async function performFraudCheck() {
  const fingerprint = await generateFingerprint();
  const network = await getNetworkInfo();
  const vpn = await detectVPN(network.ip);
  const behavior = detectSuspiciousBehavior();
  
  // Calculate overall risk score
  const riskScore = (
    (1 - fingerprint.confidence) * 0.3 +
    (vpn.isVPN ? 0.4 : 0) +
    behavior.riskScore * 0.3
  );
  
  return {
    fingerprint: fingerprint.visitorId,
    confidence: fingerprint.confidence,
    method: fingerprint.method,
    ip: network.ip,
    isVPN: vpn.isVPN,
    vpnConfidence: vpn.confidence,
    isSuspicious: behavior.isSuspicious,
    suspiciousFlags: behavior.flags,
    riskScore,
    timestamp: new Date().toISOString()
  };
}
