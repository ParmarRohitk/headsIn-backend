import { Request, Response } from 'express';
import { CreditService } from '../../services/credit/creditService';
import { catchAsync } from '../../utils/catchAsync';
import { ApiResponse } from '../../utils/ApiResponse';

const creditService = new CreditService();

export const getUserCredits = catchAsync(async (req: Request, res: Response) => {
    // Mock user ID
    const userId = 1;
    const credits = await creditService.getUserCredits(userId);
    res.status(200).json(new ApiResponse(200, credits, 'Credits retrieved successfully'));
});
