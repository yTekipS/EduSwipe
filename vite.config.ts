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
    // Dzielenie kodu na trasy
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'recharts': ['recharts'],
          'ui': ['./src/components/SwipeCard', './src/components/Results']
        }
      }
    },
    // Optymalizuj budowę
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2
      }
    },
    // Kieruj na nowoczesne przeglądarki
    target: 'es2020',
    // Dzielenie kodu CSS
    cssCodeSplit: true,
    // Wydajność budowy
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600
  },
  // Optymalizuj zależności
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})
