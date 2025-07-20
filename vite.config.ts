import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  base: '/cv-solid/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
