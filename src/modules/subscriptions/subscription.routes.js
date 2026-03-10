import { Router } from 'express';
import { addSubscription, getSubscriptions } from './subscription.controller.js';

const router = Router();

// Ruta POST: Vercel toca aquí para GUARDAR un nuevo gasto
router.post('/', addSubscription);

// Ruta GET: Vercel toca aquí para PEDIR la lista y el total del mes
router.get('/:user_id', getSubscriptions);

export default router;