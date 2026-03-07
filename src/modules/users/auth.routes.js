import { Router } from 'express';
import { registerUser, loginUser } from './auth.controller.js';
const router = Router();

// Cuando alguien mande datos por POST a /register, ejecutamos la función
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;