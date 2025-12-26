const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'headsIn',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
});

async function runMigrations() {
    const migrationsDir = path.join(__dirname, 'src', 'migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

    console.log('Running migrations...');

    for (const file of files) {
        // Skip migrations that are likely already run (001-004) if you want, 
        // but since they have IF NOT EXISTS, it's safer to just run them all.
        if (file === '009_seed_mock_data.sql') continue; // Skip seed data in migration runner

        console.log(`Executing ${file}...`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        try {
            await pool.query(sql);
        } catch (err) {
            console.error(`Error in ${file}:`, err.message);
        }
    }

    console.log('Migrations complete!');
    await pool.end();
}

runMigrations();
