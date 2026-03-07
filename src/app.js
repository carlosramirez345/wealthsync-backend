import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
// import { errorHandler } from './middlewares/errorHandler.js';
// import transactionRoutes from './modules/transactions/transactions.routes.js';
import authRoutes from './modules/users/auth.routes.js';
import transactionRoutes from './modules/transaction/transaction.routes.js'; // <- NUEVO
const app = express();

// Seguridad & Middlewares
app.use(helmet()); // Protege headers HTTP
app.use(cors({ 
  origin: ['http://localhost:3000'],
  credentials: true // Como veo que usas cookie-parser, esto es vital para la seguridad
}));app.use(express.json({ limit: '10kb' })); // Prevenir payload inmenso
app.use(cookieParser()); // Para JWT en HttpOnly cookies

// Rate Limiting general
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 requests por IP
    message: 'Demasiadas peticiones, por favor intenta más tarde.'
});
app.use('/api', limiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/transactions', transactionRoutes); // <- NUEVO
// app.use('/api/v1/transactions', transactionRoutes);
// app.use(errorHandler);
export default app;