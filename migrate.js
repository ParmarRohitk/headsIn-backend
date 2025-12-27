const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

async function runMigrations() {
    // Check for migrations in dist folder first (production), then src folder (development)
    let migrationsDir = path.join(__dirname, 'dist', 'migrations');
    if (!fs.existsSync(migrationsDir)) {
        migrationsDir = path.join(__dirname, 'src', 'migrations');
    }

    console.log(`Looking for migrations in: ${migrationsDir}`);

    if (!fs.existsSync(migrationsDir)) {
        console.error('Migrations directory not found!');
        process.exit(1);
    }

    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

    console.log(`Found ${files.length} migration files`);
    console.log('Running migrations...');

    for (const file of files) {
        // Skip seed data in migration runner
        if (file === '009_seed_mock_data.sql') {
            console.log(`Skipping ${file}...`);
            continue;
        }

        console.log(`Executing ${file}...`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        try {
            await pool.query(sql);
            console.log(`✓ ${file} completed successfully`);
        } catch (err) {
            console.error(`✗ Error in ${file}:`, err.message);
            // Don't exit on error, continue with other migrations
        }
    }

    console.log('Migrations complete!');
    await pool.end();
}

runMigrations().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
