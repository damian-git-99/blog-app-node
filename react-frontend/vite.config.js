import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import htmlPurge from 'vite-plugin-purgecss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), htmlPurge([htmlPurge()])],
  server: {
    watch: {
      usePolling: true
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173 // you can replace this port with any port
  }
})
