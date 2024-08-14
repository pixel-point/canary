import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import yaml from '@rollup/plugin-yaml'

const external = [
  'react',
  'react-dom',
  'lodash-es',
  'moment',
  '@harnessio/icons-noir',
  '@harnessio/canary',
  '@harnessio/unified-pipeline'
]

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [
    react(),
    yaml({}),
    dts({
      outDir: 'dist',
      tsconfigPath: './tsconfig.json'
    })
  ],
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'playground',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: { external }
  }
})
