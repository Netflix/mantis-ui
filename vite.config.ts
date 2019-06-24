import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({ fix: true }),
    tsconfigPaths(),
    PkgConfig(),
    OptimizationPersist(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    visualizer(),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      {
        find: /^@ag-grid-community\/react/,
        replacement: path.resolve(
          __dirname,
          './node_modules/@ag-grid-community/react/bundles/ag-grid-react.min.js',
        ),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'card-head-background': '#f5f7fa',
          'breadcrumb-link-color': '#1890ff',
        },
      },
    },
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
});
