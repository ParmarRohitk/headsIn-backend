const { Pool } = require('pg');
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

async function seedCampaigns() {
    try {
        console.log('Seeding campaigns...');

        // 1. Create Campaigns
        const campaigns = [
            { name: 'Q1 Frontend Recruitment', type: 'email', status: 'active' },
            { name: 'Senior Backend Drive', type: 'linkedin', status: 'active' },
            { name: 'Product Designer Outreach', type: 'email', status: 'paused' },
            { name: 'Mobile Lead Hunting', type: 'email', status: 'draft' }
        ];

        for (const c of campaigns) {
            const res = await pool.query(
                'INSERT INTO campaigns (user_id, name, type, status) VALUES ($1, $2, $3, $4) RETURNING id',
                [1, c.name, c.type, c.status]
            );
            const campaignId = res.rows[0].id;

            // 2. Create Email Sequences for email type
            if (c.type === 'email') {
                const seqRes = await pool.query(
                    'INSERT INTO email_sequences (campaign_id, name, subject, status) VALUES ($1, $2, $3, $4) RETURNING id',
                    [campaignId, `${c.name} Primary Sequence`, `Job Opportunity at TechCorp`, 'active']
                );
                const sequenceId = seqRes.rows[0].id;

                // 3. Create Steps
                await pool.query(
                    'INSERT INTO sequence_steps (sequence_id, step_order, delay_days, subject, body_content) VALUES ($1, $2, $3, $4, $5)',
                    [sequenceId, 1, 0, 'Exciting Role: Senior Frontend', 'Hi {{name}}, I saw your profile and was impressed...']
                );
                await pool.query(
                    'INSERT INTO sequence_steps (sequence_id, step_order, delay_days, subject, body_content) VALUES ($1, $2, $3, $4, $5)',
                    [sequenceId, 2, 3, 'Follow up: Senior Frontend', 'Hi {{name}}, just following up on my previous email...']
                );
            }

            // 4. Create Mock Recipients and Analytics for active campaigns
            if (c.status === 'active') {
                const candidates = await pool.query('SELECT id, email FROM candidates LIMIT 10');
                for (const cand of candidates.rows) {
                    const recRes = await pool.query(
                        'INSERT INTO campaign_recipients (campaign_id, candidate_id, email, status, sent_at) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                        [campaignId, cand.id, cand.email, 'sent', new Date()]
                    );
                    const recipientId = recRes.rows[0].id;

                    // Mock analytics events
                    if (Math.random() > 0.3) {
                        await pool.query(
                            'INSERT INTO analytics_events (campaign_id, recipient_id, event_type) VALUES ($1, $2, $3)',
                            [campaignId, recipientId, 'opened']
                        );
                        await pool.query(
                            'UPDATE campaign_recipients SET opened_at = $1 WHERE id = $2',
                            [new Date(), recipientId]
                        );
                    }
                    if (Math.random() > 0.7) {
                        await pool.query(
                            'INSERT INTO analytics_events (campaign_id, recipient_id, event_type) VALUES ($1, $2, $3)',
                            [campaignId, recipientId, 'replied']
                        );
                        await pool.query(
                            'UPDATE campaign_recipients SET replied_at = $1 WHERE id = $2',
                            [new Date(), recipientId]
                        );
                    }
                }
            }
        }

        console.log('Campaign seeding complete!');
    } catch (err) {
        console.error('Error seeding campaigns:', err);
    } finally {
        await pool.end();
    }
}

seedCampaigns();
