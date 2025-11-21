import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are correctly linked in Netlify deployments
  build: {
    outDir: 'dist', // Default output directory
    rollupOptions: {
      input: {
        main: 'index.html' // Specify index.html as the entry point
      }
    }
  }
});