/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00D9FF',  // Bright electric cyan
          light: '#5FFFFF',
          dark: '#00A8CC',
        },
        secondary: {
          DEFAULT: '#00FF88',  // Vibrant neon green
          light: '#66FFAA',
          dark: '#00CC6A',
        },
        background: {
          DEFAULT: '#0A0E27',  // Deep space blue
          light: '#1A1F3A',
          dark: '#050711',
        },
        accent: {
          DEFAULT: '#FF6B35',  // Bold orange-red
          light: '#FF8C61',
          dark: '#E5501A',
        },
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#B8E0FF',
          muted: '#94A3B8',  // Improved contrast - lighter gray-blue
        },
        // Engineering status colors
        success: {
          DEFAULT: '#00FF88',  // Green for success
          light: '#66FFAA',
          dark: '#00CC6A',
        },
        warning: {
          DEFAULT: '#FFC107',  // Yellow for warnings
          light: '#FFD54F',
          dark: '#FFA000',
        },
        danger: {
          DEFAULT: '#FF3B30',  // Red for errors/danger
          light: '#FF6B61',
          dark: '#E52520',
        },
        info: {
          DEFAULT: '#00D9FF',  // Cyan for info
          light: '#5FFFFF',
          dark: '#00A8CC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(rgba(26, 31, 58, 0.5) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}
