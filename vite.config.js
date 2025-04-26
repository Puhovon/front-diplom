import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,  // Запрещает автоматический выбор другого порта
    host: true,       // Добавьте это, чтобы разрешить доступ с других устройств в сети
    open: true        // Автоматически открывать браузер
  }
})
