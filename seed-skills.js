const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Alternatively use individual params if DATABASE_URL is not set
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'headsIn',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
});

async function seedSkills() {
    try {
        const candidates = await pool.query('SELECT id FROM candidates');
        const skills = ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'Next.js', 'PostgreSQL'];

        console.log(`Seeding skills for ${candidates.rows.length} candidates...`);

        for (const candidate of candidates.rows) {
            // Randomly pick 3-5 skills
            const selectedSkills = skills
                .sort(() => 0.5 - Math.random())
                .slice(0, 3 + Math.floor(Math.random() * 3));

            for (const skill of selectedSkills) {
                await pool.query(
                    'INSERT INTO candidate_skills (candidate_id, skill_name) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                    [candidate.id, skill]
                );
            }
        }

        console.log('Seeding complete!');
    } catch (err) {
        console.error('Error seeding skills:', err);
    } finally {
        await pool.end();
    }
}

seedSkills();
