import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Cargamos las variables de tu archivo .env
dotenv.config();

// Creamos un "Pool" de conexiones usando la llave maestra y activando SSL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // <--- ¡Esta es la llave mágica de seguridad!
    }
});

pool.on('connect', () => {
    console.log('📦 Conectado a la Base de Datos de WealthSync exitosamente.');
});

export default pool;