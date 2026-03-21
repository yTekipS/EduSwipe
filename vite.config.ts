import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    middlewareMode: false
  },
  build: {
    // Code splitting by routes
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'recharts': ['recharts'],
          'ui': ['./src/components/SwipeCard', './src/components/Results']
        }
      }
    },
    // Optimize build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2
      }
    },
    // Target modern browsers
    target: 'es2020',
    // CSS code splitting
    cssCodeSplit: true,
    // Build performance
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})
