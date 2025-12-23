"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const database_1 = require("../../config/database");
const creditService_1 = require("../credit/creditService");
const creditService = new creditService_1.CreditService();
class SearchService {
    async initiateSearch(userId, queryText, filters) {
        // 0. Deduct credits
        const creditCost = parseInt(process.env.SEARCH_CREDIT_COST || '10');
        await creditService.deductCredits(userId, creditCost, `Search: ${queryText.substring(0, 30)}...`);
        // 1. Create a search record
        const searchResult = await (0, database_1.query)(`INSERT INTO search_history (user_id, search_query, filters, status, credits_used) 
       VALUES ($1, $2, $3, 'processing', $4) 
       RETURNING id`, [userId, queryText, filters, creditCost]);
        const searchId = searchResult.rows[0].id;
        // 2. Initialize stages
        const stages = [
            'Fetch profiles',
            'Semantic search and LLM match',
            'Ranking and scoring',
            'Preparing insights'
        ];
        for (const stage of stages) {
            await (0, database_1.query)(`INSERT INTO search_stages (search_id, stage_name, status) VALUES ($1, $2, 'pending')`, [searchId, stage]);
        }
        // 3. Trigger async processing (fire and forget for this demo, or use a queue)
        this.processSearchStages(searchId, queryText, filters);
        return { searchId };
    }
    async processSearchStages(searchId, queryText, filters) {
        const stages = [
            'Fetch profiles',
            'Semantic search and LLM match',
            'Ranking and scoring',
            'Preparing insights'
        ];
        try {
            for (const stageName of stages) {
                // Update stage to loading
                await this.updateStageStatus(searchId, stageName, 'loading');
                // Simulate delay (min 2 seconds per stage)
                await new Promise(resolve => setTimeout(resolve, 2000));
                // Update stage to completed
                await this.updateStageStatus(searchId, stageName, 'completed');
            }
            // Finalize search
            await (0, database_1.query)(`UPDATE search_history SET status = 'completed', results_count = 30 WHERE id = $1`, [searchId]);
        }
        catch (error) {
            console.error(`Search processing failed for ${searchId}`, error);
            await (0, database_1.query)(`UPDATE search_history SET status = 'failed' WHERE id = $1`, [searchId]);
        }
    }
    async updateStageStatus(searchId, stageName, status) {
        const now = new Date();
        let queryText = `UPDATE search_stages SET status = $1, started_at = COALESCE(started_at, $2) WHERE search_id = $3 AND stage_name = $4`;
        if (status === 'completed') {
            queryText = `UPDATE search_stages SET status = $1, completed_at = $2 WHERE search_id = $3 AND stage_name = $4`;
        }
        await (0, database_1.query)(queryText, [status, now, searchId, stageName]);
    }
    async getSearchStatus(searchId) {
        const stagesResult = await (0, database_1.query)(`SELECT stage_name, status, started_at, completed_at FROM search_stages WHERE search_id = $1 ORDER BY id ASC`, [searchId]);
        const searchResult = await (0, database_1.query)(`SELECT status FROM search_history WHERE id = $1`, [searchId]);
        return {
            status: searchResult.rows[0]?.status,
            stages: stagesResult.rows
        };
    }
    async getSearchResults(searchId, page = 1, limit = 12) {
        // For this mock, we return random candidates from the DB
        // In a real app, we would join with search_results table linked to search_id
        const offset = (page - 1) * limit;
        const candidatesResult = await (0, database_1.query)(`SELECT * FROM candidates ORDER BY id DESC LIMIT $1 OFFSET $2`, [limit, offset]);
        const totalResult = await (0, database_1.query)(`SELECT COUNT(*) FROM candidates`);
        const total = parseInt(totalResult.rows[0].count);
        return {
            candidates: candidatesResult.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}
exports.SearchService = SearchService;
//# sourceMappingURL=searchService.js.map