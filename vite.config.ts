import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    viteSingleFile(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:4000/api',
    },
    host: true,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
