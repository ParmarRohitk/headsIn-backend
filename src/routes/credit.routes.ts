import { Router } from 'express';
import { getUserCredits } from '../controllers/credit/creditController';

const router = Router();

router.get('/', getUserCredits);

export default router;
