import { Request, Response } from 'express';
import { SearchService } from '../../services/candidate/searchService';
import { SearchFilters } from '../../types/candidate.types';

const searchService = new SearchService();

export const searchCandidates = async (req: Request, res: Response) => {
    try {
        const { query, filters, page, limit } = req.body;
        // Mock user ID
        const userId = 1;

        const result = await searchService.initiateSearch(userId, query, filters);
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Search initiation error:', error);
        res.status(500).json({ success: false, error: 'Failed to initiate search' });
    }
};

export const getSearchStatus = async (req: Request, res: Response) => {
    try {
        const { searchId } = req.params;
        const result = await searchService.getSearchStatus(parseInt(searchId || '0'));
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Search status error:', error);
        res.status(500).json({ success: false, error: 'Failed to get search status' });
    }
};

export const getSearchResults = async (req: Request, res: Response) => {
    try {
        const { searchId } = req.params;
        const page = parseInt(req.query.page as string || '1');
        const limit = parseInt(req.query.limit as string || '12');

        const result = await searchService.getSearchResults(parseInt(searchId || '0'), page, limit);
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Search results error:', error);
        res.status(500).json({ success: false, error: 'Failed to get search results' });
    }
};
