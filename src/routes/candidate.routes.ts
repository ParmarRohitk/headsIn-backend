import { Router } from 'express';
import { searchCandidates, getSearchStatus, getSearchResults } from '../controllers/candidate/searchController';

const router = Router();

router.post('/search', searchCandidates);
router.get('/search/:searchId/status', getSearchStatus);
router.get('/search/:searchId/results', getSearchResults);
router.get('/', (req, res) => res.json({ message: 'Candidate routes working' }));

export default router;
