import { query } from '../../config/database';

export class CandidateService {
    async getCandidateDetails(candidateId: number) {
        const candidateResult = await query(
            'SELECT * FROM candidates WHERE id = $1',
            [candidateId]
        );

        if (candidateResult.rows.length === 0) {
            return null;
        }

        const candidate = candidateResult.rows[0];

        // Fetch experience
        const experienceResult = await query(
            'SELECT * FROM candidate_experience WHERE candidate_id = $1 ORDER BY order_index ASC',
            [candidateId]
        );

        // Fetch education
        const educationResult = await query(
            'SELECT * FROM candidate_education WHERE candidate_id = $1 ORDER BY order_index ASC',
            [candidateId]
        );

        // Fetch skills
        const skillsResult = await query(
            'SELECT skill_name FROM candidate_skills WHERE candidate_id = $1',
            [candidateId]
        );

        // Check if shortlisted
        const shortlistResult = await query(
            'SELECT 1 FROM shortlists WHERE candidate_id = $1',
            [candidateId]
        );

        return {
            ...candidate,
            experience: experienceResult.rows,
            education: educationResult.rows,
            skills: skillsResult.rows.map(s => s.skill_name),
            is_shortlisted: shortlistResult.rows.length > 0
        };
    }

    async toggleShortlist(userId: number, candidateId: number) {
        const existing = await query(
            'SELECT id FROM shortlists WHERE user_id = $1 AND candidate_id = $2',
            [userId, candidateId]
        );

        if (existing.rows.length > 0) {
            await query(
                'DELETE FROM shortlists WHERE user_id = $1 AND candidate_id = $2',
                [userId, candidateId]
            );
            return { shortlisted: false };
        } else {
            await query(
                'INSERT INTO shortlists (user_id, candidate_id) VALUES ($1, $2)',
                [userId, candidateId]
            );
            return { shortlisted: true };
        }
    }

    async getShortlistedCandidates(userId: number) {
        const result = await query(
            `SELECT c.*, 
                    (SELECT array_agg(skill_name) FROM candidate_skills WHERE candidate_id = c.id) as skills
             FROM candidates c
             INNER JOIN shortlists s ON s.candidate_id = c.id
             WHERE s.user_id = $1
             ORDER BY s.created_at DESC`,
            [userId]
        );

        return result.rows.map(row => ({
            ...row,
            is_shortlisted: true,
            skills: row.skills || []
        }));
    }

    async unlockContact(userId: number, candidateId: number) {
        // Implement credit deduction logic here later
        await query(
            'UPDATE candidates SET contact_locked = false WHERE id = $1',
            [candidateId]
        );
        return { success: true };
    }
}
