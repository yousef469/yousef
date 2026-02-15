import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['simple-peer', 'socket.io-client'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    chunkSizeWarningLimit: 1600,
    // SECURITY: No source maps in production
    sourcemap: false,
    // Use esbuild for minification (built-in, fast)
    minify: 'esbuild',
    target: 'esnext',
    commonjsOptions: {
      include: [/simple-peer/, /node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'services': ['@supabase/supabase-js', '@google/generative-ai'],
          'webrtc': ['simple-peer', 'socket.io-client'],
          'gsap': ['gsap'],
          'livekit': ['@livekit/components-react', 'livekit-client']
        }
      }
    }
  },
  resolve: {
    alias: {
      'simple-peer': 'simple-peer/simplepeer.min.js'
    }
  }
})
