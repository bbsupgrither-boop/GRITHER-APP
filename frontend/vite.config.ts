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
      'vaul': 'vaul',
      'sonner': 'sonner',
      'recharts': 'recharts',
      'react-resizable-panels': 'react-resizable-panels',
      'react-hook-form': 'react-hook-form',
      'react-day-picker': 'react-day-picker',
      'next-themes': 'next-themes',
      'lucide-react': 'lucide-react',
      'input-otp': 'input-otp',
      'figma:asset/acaa4cccbfaf8eeee6ecbbe8f29c92d03b701371.png': path.resolve(__dirname, './assets/acaa4cccbfaf8eeee6ecbbe8f29c92d03b701371.png'),
      'figma:asset/8913ba3c8424dada0cd9697071e01ea367a29a23.png': path.resolve(__dirname, './assets/8913ba3c8424dada0cd9697071e01ea367a29a23.png'),
      'figma:asset/29d513144bb95c08c031f3604ac2dd2e7bee6450.png': path.resolve(__dirname, './assets/29d513144bb95c08c031f3604ac2dd2e7bee6450.png'),
      'figma:asset/282ed224b8d6681278187a87d172cc01e9522cbc.png': path.resolve(__dirname, './assets/282ed224b8d6681278187a87d172cc01e9522cbc.png'),
      'embla-carousel-react': 'embla-carousel-react',
      'cmdk': 'cmdk',
      'class-variance-authority': 'class-variance-authority',
      '@radix-ui/react-tooltip': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs': '@radix-ui/react-tabs',
      '@radix-ui/react-switch': '@radix-ui/react-switch',
      '@radix-ui/react-slot': '@radix-ui/react-slot',
      '@radix-ui/react-slider': '@radix-ui/react-slider',
      '@radix-ui/react-separator': '@radix-ui/react-separator',
      '@radix-ui/react-select': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress': '@radix-ui/react-progress',
      '@radix-ui/react-popover': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar': '@radix-ui/react-menubar',
      '@radix-ui/react-label': '@radix-ui/react-label',
      '@radix-ui/react-hover-card': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion': '@radix-ui/react-accordion',
      '@': path.resolve(__dirname, './src'),
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
  base: '/',
});