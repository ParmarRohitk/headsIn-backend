import { Router } from 'express';
import { searchCandidates, getSearchStatus, getSearchResults } from '../controllers/candidate/searchController';
import { getCandidateDetails, toggleShortlist, getShortlist, unlockContact } from '../controllers/candidate/candidateController';

const router = Router();

router.post('/search', searchCandidates);
router.get('/search/:searchId/status', getSearchStatus);
router.get('/search/:searchId/results', getSearchResults);
router.get('/shortlist', getShortlist);
router.get('/:id', getCandidateDetails);
router.post('/:id/shortlist', toggleShortlist);
router.post('/:id/unlock', unlockContact);

export default router;
