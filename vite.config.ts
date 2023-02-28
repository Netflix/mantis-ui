/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), eslintPlugin({ fix: true }), tsconfigPaths()],
  resolve: {
    alias: [{ find: /^~/, replacement: '' }],
  },
  test: {
    environment: 'jsdom',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          '@ag-grid-community/core': ['@ag-grid-community/core'],
          '@ag-grid-community/react': ['@ag-grid-community/react'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      '@ag-grid-community/client-side-row-model',
      '@ag-grid-community/core',
      '@ag-grid-community/react',
      '@ag-grid-community/styles',
      '@mantine/core',
      '@mantine/dropzone',
      '@mantine/notifications',
      '@sentry/react',
      '@sentry/tracing',
      'date-fns',
      'ky',
      'react',
      'react-dom',
      'react-dom/client',
      'react-dom/server',
      'react-error-boundary',
      'react-helmet-async',
      'react-hook-form',
      'react-icons/ai',
      'react-icons/fa',
      'react-icons/tb',
      'react-location',
      'react-query',
      'web-vitals',
    ],
  },
});
