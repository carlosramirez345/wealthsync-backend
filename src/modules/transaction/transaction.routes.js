import { Router } from 'express';
import { 
    createTransaction, 
    getTransactionsByUser, 
    updateTransaction, 
    deleteTransaction 
} from './transaction.controller.js';

const router = Router();

// Rutas para WealthSync / InnovaCodeHub
router.post('/', createTransaction);          // Crear
router.get('/:userId', getTransactionsByUser); // Leer todos
router.put('/:id', updateTransaction);        // Editar uno específico
router.delete('/:id', deleteTransaction);     // Borrar uno específico

export default router;