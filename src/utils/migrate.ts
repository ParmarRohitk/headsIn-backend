import fs from 'fs';
import path from 'path';
import pool from '../config/database';

const migrate = async () => {
    const migrationsDir = path.join(__dirname, '../migrations');

    try {
        // Get all SQL files
        const files = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.sql'))
            .sort(); // Ensure order by filename

        console.log(`Found ${files.length} migration files.`);

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            for (const file of files) {
                const filePath = path.join(migrationsDir, file);
                const sql = fs.readFileSync(filePath, 'utf-8');

                console.log(`Running migration: ${file}`);
                await client.query(sql);
            }

            await client.query('COMMIT');
            console.log('All migrations executed successfully.');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Migration failed, rolling back.', error);
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Migration script error:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();
