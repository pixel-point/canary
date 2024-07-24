import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"
import ViteYaml from '@modyfi/vite-plugin-yaml'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), ViteYaml()],
  build: {
    sourcemap: true,
    copyPublicDir: false
  }
})
