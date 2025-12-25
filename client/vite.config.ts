import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../dist/client',
        emptyOutDir: true,
    },
    server: {
        proxy: {
            '/validate-nursing-data': 'http://localhost:3000',
            '/health': 'http://localhost:3000',
        }
    }
});
