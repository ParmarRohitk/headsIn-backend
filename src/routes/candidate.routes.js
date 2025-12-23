"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchController_1 = require("../controllers/candidate/searchController");
const router = (0, express_1.Router)();
router.post('/search', searchController_1.searchCandidates);
router.get('/search/:searchId/status', searchController_1.getSearchStatus);
router.get('/search/:searchId/results', searchController_1.getSearchResults);
router.get('/', (req, res) => res.json({ message: 'Candidate routes working' }));
exports.default = router;
//# sourceMappingURL=candidate.routes.js.map