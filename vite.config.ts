/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
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
  optimizeDeps: {
    include: [
      '@inovua/reactdatagrid-community',
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
      'react-query',
      'react-router-dom',
    ],
  },
});
