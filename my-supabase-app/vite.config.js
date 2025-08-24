import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Landing/',
  plugins: [react()],
  server: {
  port: 3000,
  host: true, // expose server on network (useful in containers / Codespaces)
  open: true,
  },
  build: {
    outDir: 'dist',
  },
});