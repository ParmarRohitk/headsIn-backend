import { Request, Response } from 'express';
import { CampaignService } from '../../services/campaign/campaignService';
import { catchAsync } from '../../utils/catchAsync';
import { ApiResponse } from '../../utils/ApiResponse';
import { AppError } from '../../utils/AppError';

const campaignService = new CampaignService();

export const getAllCampaigns = catchAsync(async (req: Request, res: Response) => {
    const userId = 1; // Mock user id
    const result = await campaignService.getCampaignsWithStats(userId);
    res.status(200).json(new ApiResponse(200, result, 'Campaigns retrieved successfully'));
});

export const createCampaign = catchAsync(async (req: Request, res: Response) => {
    const userId = 1;
    const { name, type } = req.body;
    const result = await campaignService.createCampaign(userId, name, type);
    res.status(201).json(new ApiResponse(201, result, 'Campaign created successfully'));
});

export const getCampaignSequences = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError('Campaign ID is required', 400);
    }
    const result = await campaignService.getSequencesByCampaign(parseInt(id));
    res.status(200).json(new ApiResponse(200, result, 'Sequences retrieved successfully'));
});

export const getCampaignAnalytics = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError('Campaign ID is required', 400);
    }
    const result = await campaignService.getDetailedAnalytics(parseInt(id));
    res.status(200).json(new ApiResponse(200, result, 'Analytics retrieved successfully'));
});
