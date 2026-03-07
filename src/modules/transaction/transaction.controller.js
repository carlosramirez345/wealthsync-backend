import pool from '../../config/db.js';

// 1️⃣ Crear Movimiento (Ya lo tenías)
export const createTransaction = async (req, res) => {
    try {
        const { user_id, amount, type, category, description } = req.body;
        const newTransaction = await pool.query(
            'INSERT INTO transactions (user_id, amount, type, category, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, amount, type, category, description]
        );
        res.status(201).json(newTransaction.rows[0]);
    } catch (error) {
        console.error('❌ Error al crear:', error);
        res.status(500).json({ message: 'Error al guardar.' });
    }
};

// 2️⃣ Leer Movimientos (Ya lo tenías)
export const getTransactionsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query(
            'SELECT * FROM transactions WHERE user_id = $1 ORDER BY transaction_date DESC',
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener datos.' });
    }
};

// 3️⃣ EDITAR Movimiento (¡La nueva!) ✏️
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, type, category, description } = req.body;
        
        const result = await pool.query(
            'UPDATE transactions SET amount = $1, type = $2, category = $3, description = $4 WHERE id = $5 RETURNING *',
            [amount, type, category, description, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('❌ Error al editar:', error);
        res.status(500).json({ message: 'Error al actualizar.' });
    }
};

// 4️⃣ BORRAR Movimiento (¡La nueva!) 🗑️
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
        
        if (result.rowCount === 0) return res.status(404).json({ message: 'No encontrado' });
        res.status(200).json({ message: 'Movimiento eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al borrar:', error);
        res.status(500).json({ message: 'Error al eliminar.' });
    }
};