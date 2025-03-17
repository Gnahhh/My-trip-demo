import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VitePluginVueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [
    vue(),
    VitePluginVueDevTools()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8800
  }
})