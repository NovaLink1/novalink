import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    // Nutze PostCSS-Konfig aus der Datei postcss.config.js
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        // Proxy für alle /user-Requests (z.B. /user/profile)
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/users': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      // Erleichtert Importe, z.B. @/components statt ../../components
      '@': '/src',
    },
  },
})