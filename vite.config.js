import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    open: false,
    watch: {
      usePolling: true,
      interval: 300
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three'],
          spline: ['@splinetool/runtime', '@splinetool/react-spline'],
          icons: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
