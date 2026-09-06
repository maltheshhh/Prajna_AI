import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendTarget = env.VITE_BACKEND_URL || 'http://127.0.0.1:5000';
  const faceMatchingTarget = env.VITE_FACE_MATCHING_URL || 'http://127.0.0.1:8000';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      port: 5173,
      proxy: {
        '/server': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
        '/api/face': {
          target: faceMatchingTarget,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/face/, ''),
        },
        '/api/citizen': {
          target: faceMatchingTarget,
          changeOrigin: true,
          // /api/citizen/report  →  /citizen/report on port 8000
        },
        '/api/otp': {
          target: faceMatchingTarget,
          changeOrigin: true,
        },
      },
    },
  };
})