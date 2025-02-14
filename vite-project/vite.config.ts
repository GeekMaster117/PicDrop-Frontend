import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import backendURL from './src/Constants/backend-url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}
  }
})
