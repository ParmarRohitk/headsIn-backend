import { Request, Response } from 'express';
import { CandidateService } from '../../services/candidate/candidateService';

const candidateService = new CandidateService();

export const getCandidateDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, message: 'ID is required' });
        const candidate = await candidateService.getCandidateDetails(parseInt(id));

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        res.json({
            success: true,
            data: candidate
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const toggleShortlist = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, message: 'ID is required' });
        // Mock userId 1 until auth is implemented
        const userId = 1;
        const result = await candidateService.toggleShortlist(userId, parseInt(id));

        res.json({
            success: true,
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getShortlist = async (req: Request, res: Response) => {
    try {
        const userId = 1;
        const candidates = await candidateService.getShortlistedCandidates(userId);

        res.json({
            success: true,
            data: candidates
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const unlockContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, message: 'ID is required' });
        const userId = 1;
        const result = await candidateService.unlockContact(userId, parseInt(id));

        res.json({
            success: true,
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
