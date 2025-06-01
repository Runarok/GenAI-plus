import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/GenAI-plus/Experiments/AnimeMerch/',  // IMPORTANT: set your repo and folder path here
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
