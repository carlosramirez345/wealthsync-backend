import pool from '../../config/db.js';

// 1. Función para agregar un nuevo gasto fijo
export const addSubscription = async (req, res) => {
    try {
        const { user_id, name, amount, due_day } = req.body;

        const newSub = await pool.query(
            'INSERT INTO subscriptions (user_id, name, amount, due_day) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, name, amount, due_day]
        );

        res.status(201).json({
            message: '¡Gasto agregado a tu bóveda!',
            subscription: newSub.rows[0]
        });
    } catch (error) {
        console.error('❌ Error al agregar suscripción:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// 2. Función para obtener todos tus gastos y calcular el total del mes
export const getSubscriptions = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Traemos los gastos ordenados por día de cobro (del 1 al 31)
        const result = await pool.query(
            'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY due_day ASC', 
            [user_id]
        );

        const subscriptions = result.rows;

        // Magia matemática: Sumamos todos los montos automáticamente
        const totalAmount = subscriptions.reduce((suma, sub) => suma + parseFloat(sub.amount), 0);

        res.status(200).json({
            total: totalAmount,
            subscriptions: subscriptions
        });
    } catch (error) {
        console.error('❌ Error al obtener suscripciones:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};