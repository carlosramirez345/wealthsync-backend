import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Cargamos las variables de tu archivo .env
dotenv.config();

// Creamos un "Pool" de conexiones a la base de datos
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('📦 Conectado a la Base de Datos de WealthSync exitosamente.');
});

export default pool;