import { Request, Response } from 'express';
import { SearchService } from '../../services/candidate/searchService';
import { catchAsync } from '../../utils/catchAsync';
import { ApiResponse } from '../../utils/ApiResponse';

const searchService = new SearchService();

export const searchCandidates = catchAsync(async (req: Request, res: Response) => {
    const { query, filters } = req.body;
    // Mock user ID
    const userId = 1;

    const result = await searchService.initiateSearch(userId, query, filters);
    res.status(200).json(new ApiResponse(200, result, 'Search initiated successfully'));
});

export const getSearchStatus = catchAsync(async (req: Request, res: Response) => {
    const { searchId } = req.params;
    const result = await searchService.getSearchStatus(parseInt(searchId || '0'));
    res.status(200).json(new ApiResponse(200, result, 'Search status retrieved successfully'));
});

export const getSearchResults = catchAsync(async (req: Request, res: Response) => {
    const { searchId } = req.params;
    const page = parseInt(req.query.page as string || '1');
    const limit = parseInt(req.query.limit as string || '12');

    // Extract filters from query params
    const filters: any = {
        location: req.query.location as string,
        experience_min: req.query.experience_min ? parseInt(req.query.experience_min as string) : undefined,
    };

    const result = await searchService.getSearchResults(parseInt(searchId || '0'), page, limit, filters);
    res.status(200).json(new ApiResponse(200, result, 'Search results retrieved successfully'));
});
