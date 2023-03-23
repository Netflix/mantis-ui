/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin({ fix: true })],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  test: {
    environment: 'jsdom',
  },
});
