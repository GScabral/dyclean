import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Cambiado a @vitejs/plugin-react

export default defineConfig({
  plugins: [react()], // Usa el plugin correcto para React
  server: {
    host: '0.0.0.0', // Asegúrate de tener esto para el despliegue
    port: 3003,       // El puerto que estés usando
  },
});