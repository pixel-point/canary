import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.UI_HOST || 'localhost',
    port: Number(process.env.UI_DEV_SERVER_PORT) || 5137,
    proxy: {
      '/api/v1': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  }
})
