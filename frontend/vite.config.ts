import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: {},
  },
  define: {
    __TELEGRAM_WEBAPP__: JSON.stringify(true),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './components'),
      '@/types': path.resolve(__dirname, './types'),
      '@/hooks': path.resolve(__dirname, './hooks'),
      '@/utils': path.resolve(__dirname, './utils'),
      '@/styles': path.resolve(__dirname, './styles'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  base: process.env.VITE_BASE_PATH || '/',
});