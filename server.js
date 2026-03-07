import app from './src/app.js';
import dotenv from 'dotenv';
import pool from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Prueba de conexión a la Base de Datos
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error fatal: No se pudo conectar a PostgreSQL.', err.message);
    } else {
        console.log('✅ Base de datos conectada. Hora del servidor:', res.rows[0].now);
        
        // Encendemos el servidor web
        app.listen(PORT, () => {
            console.log(`🚀 Servidor de WealthSync corriendo exitosamente en el puerto ${PORT}`);
        });
    }
});