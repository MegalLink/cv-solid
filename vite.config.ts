import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  base: '/', // Use root path since it's working at megallink.github.io/
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
