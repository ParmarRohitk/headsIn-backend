import { query } from '../../config/database';

export class CreditService {
    async getUserCredits(userId: number) {
        const result = await query(
            `SELECT * FROM credits WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            // Initialize credits for new user if not exists (for demo purposes)
            return this.initializeCredits(userId);
        }

        return result.rows[0];
    }

    async initializeCredits(userId: number, defaultCredits: number = 1000) {
        const result = await query(
            `INSERT INTO credits (user_id, total_credits, available_credits) 
       VALUES ($1, $2, $2) 
       ON CONFLICT DO NOTHING
       RETURNING *`,
            [userId, defaultCredits]
        );
        return result.rows[0];
    }

    async deductCredits(userId: number, amount: number, description: string) {
        const client = await import('../../config/database.js').then(m => m.getClient());

        try {
            await client.query('BEGIN');

            // Check available credits
            let creditResult = await client.query(
                `SELECT * FROM credits WHERE user_id = $1 FOR UPDATE`,
                [userId]
            );

            // Auto-initialize credits if user doesn't exist
            if (creditResult.rows.length === 0) {
                await client.query(
                    `INSERT INTO credits (user_id, total_credits, available_credits) 
                     VALUES ($1, 1000, 1000)`,
                    [userId]
                );
                creditResult = await client.query(
                    `SELECT * FROM credits WHERE user_id = $1 FOR UPDATE`,
                    [userId]
                );
            }

            const userCredits = creditResult.rows[0];
            if (userCredits.available_credits < amount) {
                throw new Error('Insufficient credits');
            }

            // Update credits
            await client.query(
                `UPDATE credits 
         SET available_credits = available_credits - $1, 
             used_credits = used_credits + $1,
             last_updated = CURRENT_TIMESTAMP
         WHERE id = $2`,
                [amount, userCredits.id]
            );

            // Record transaction
            await client.query(
                `INSERT INTO credit_transactions (user_id, credit_id, transaction_type, amount, description)
         VALUES ($1, $2, 'deduction', $3, $4)`,
                [userId, userCredits.id, amount, description]
            );

            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}
