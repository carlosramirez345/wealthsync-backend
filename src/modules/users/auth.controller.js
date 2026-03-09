import pool from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        // 1. Recibimos los datos exactos que pide tu base de datos
        const { email, password, first_name, last_name } = req.body;

        // 2. Verificamos si el correo ya existe en la base de datos
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Este correo ya está registrado.' });
        }

        // 3. Encriptamos la contraseña (nivel de seguridad bancario)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       // 4. Guardamos al nuevo usuario en los cajones correctos
const newUser = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [first_name || 'Usuario Nuevo', email, hashedPassword]
);

        // 5. Le respondemos al Frontend que todo salió bien
        res.status(201).json({
            message: '¡Usuario creado exitosamente!',
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscamos si el correo existe en la base de datos
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        const user = result.rows[0];

        // 2. Comparamos la contraseña escrita con el hash guardado
        // CORREGIDO: Ahora busca 'user.password' en lugar de password_hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

       // 3. Fabricamos el "gafete VIP" (Token)
        const token = jwt.sign(
            { id: user.id },                  // Lo que dice el gafete por dentro
            process.env.JWT_SECRET,           // Nuestro sello de agua
            { expiresIn: '1d' }               // El gafete caduca en 1 día (por seguridad)
        );

        // 4. Le respondemos al Frontend con todo y gafete
        // CORREGIDO: Ahora devolvemos 'name' para coincidir con Supabase
        res.status(200).json({
            message: '¡Login exitoso! Bienvenido de nuevo.',
            token: token, 
            user: {
                id: user.id,
                name: user.name, 
                email: user.email
            }
        });

    } catch (error) {
        console.error('❌ Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};