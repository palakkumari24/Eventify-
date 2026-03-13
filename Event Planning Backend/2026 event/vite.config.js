import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // allow ngrok host so the dev server accepts requests proxied from the tunnel
    allowedHosts: [
      'unpreferable-meagan-ostentatiously.ngrok-free.dev',
      'localhost',
      '127.0.0.1'
    ]
  }
})
