import { Router } from 'express';
import {
    getAllCampaigns,
    getCampaignSequences,
    getCampaignAnalytics,
    createCampaign
} from '../controllers/campaign/campaignController';

const router = Router();

router.get('/', getAllCampaigns);
router.post('/', createCampaign);
router.get('/:id/sequences', getCampaignSequences);
router.get('/:id/analytics', getCampaignAnalytics);

export default router;
