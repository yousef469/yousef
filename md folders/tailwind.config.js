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
          muted: '#7A9FBF',
        }
      },
      animation: {
        'bounce': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}
