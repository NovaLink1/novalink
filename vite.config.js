// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1) /api/auth/* → http://127.0.0.1:8000/auth/*
      '/api/auth': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api\/auth/, '/auth')
      },

      // 2) /api/apps/* → http://127.0.0.1:8000/apps/*
      '/api/apps': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api\/apps/, '/apps')
      }
    }
  }
})
