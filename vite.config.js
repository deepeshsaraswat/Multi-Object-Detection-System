 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 1111 },
  plugins: [react()],
  // base: '/object-detect-tfjs/',
  // build: {chunkSizeWarningLimit:21600,}
})
