import { Request, Response } from 'express';
import { CreditService } from '../../services/credit/creditService';

const creditService = new CreditService();

export const getUserCredits = async (req: Request, res: Response) => {
    try {
        // Mock user ID
        const userId = 1;
        const credits = await creditService.getUserCredits(userId);
        res.json({ success: true, data: credits });
    } catch (error) {
        console.error('Get credits error:', error);
        res.status(500).json({ success: false, error: 'Failed to get credits' });
    }
};
