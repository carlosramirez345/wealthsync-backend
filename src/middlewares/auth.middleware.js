import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    try {
        // Extraer token de cookie HttpOnly (Seguridad contra XSS)
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'No autorizado, token faltante.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // Inyectar ID de usuario en la request
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};