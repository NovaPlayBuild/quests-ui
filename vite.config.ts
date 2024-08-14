import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

import packageJson from './package.json'

export default defineConfig({
  publicDir: 'public',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [react()],
  build: {
    copyPublicDir: true,
    minify: 'esbuild',
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'HyperplayUI',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      input: [resolve(__dirname, './src/index.ts')]
    }
  }
})
