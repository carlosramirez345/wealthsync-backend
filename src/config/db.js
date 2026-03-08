import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Cargamos las variables de tu archivo .env
dotenv.config();

// Creamos un "Pool" de conexiones a la base de datos usando la llave maestra
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('📦 Conectado a la Base de Datos de WealthSync exitosamente.');
});

export default pool;