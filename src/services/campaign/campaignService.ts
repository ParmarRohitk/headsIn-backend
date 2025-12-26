import { query } from '../../config/database';

export class CampaignService {
    async getCampaignsWithStats(userId: number) {
        const campaignsResult = await query(
            `SELECT c.*, 
                    (SELECT COUNT(*) FROM campaign_recipients WHERE campaign_id = c.id) as reach,
                    (SELECT COUNT(*) FROM campaign_recipients WHERE campaign_id = c.id AND opened_at IS NOT NULL) as opens,
                    (SELECT COUNT(*) FROM campaign_recipients WHERE campaign_id = c.id AND replied_at IS NOT NULL) as replies
             FROM campaigns c
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        return campaignsResult.rows.map(row => {
            const reach = parseInt(row.reach) || 0;
            const opens = parseInt(row.opens) || 0;
            const replies = parseInt(row.replies) || 0;

            return {
                id: row.id,
                name: row.name,
                type: row.type,
                status: row.status,
                stats: {
                    sent: reach,
                    openRate: reach > 0 ? (opens / reach) * 100 : 0,
                    replyRate: reach > 0 ? (replies / reach) * 100 : 0,
                    trend: Math.random() > 0.5 ? 'up' : 'down'
                },
                createdAt: row.created_at
            };
        });
    }

    async createCampaign(userId: number, name: string, type: string) {
        const result = await query(
            'INSERT INTO campaigns (user_id, name, type, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, name, type, 'draft']
        );
        return result.rows[0];
    }

    async getSequencesByCampaign(campaignId: number) {
        const sequencesResult = await query(
            'SELECT * FROM email_sequences WHERE campaign_id = $1',
            [campaignId]
        );

        const sequences = [];
        for (const seq of sequencesResult.rows) {
            const stepsResult = await query(
                'SELECT * FROM sequence_steps WHERE sequence_id = $1 ORDER BY step_order ASC',
                [seq.id]
            );
            sequences.push({
                ...seq,
                steps: stepsResult.rows
            });
        }
        return sequences;
    }

    async getDetailedAnalytics(campaignId: number) {
        // Mock daily activity for the chart
        const dailyActivity = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            dailyActivity.push({
                date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                sent: Math.floor(Math.random() * 50) + 10,
                opened: Math.floor(Math.random() * 30) + 5,
                replied: Math.floor(Math.random() * 10) + 1
            });
        }

        return {
            dailyActivity,
            summary: {
                totalRecipients: 100,
                delivered: 98,
                opened: 45,
                replied: 12
            }
        };
    }
}
