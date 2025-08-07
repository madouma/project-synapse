import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vite.dev/config/
export default defineConfig({
    // plugins: [react(), basicSsl()],
    plugins: [react()],
    server: {
        // Optional: Define the port if you want it to be consistent
        port: 5173,
    },
});
