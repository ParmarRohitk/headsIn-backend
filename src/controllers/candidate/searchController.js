"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchResults = exports.getSearchStatus = exports.searchCandidates = void 0;
const searchService_1 = require("../../services/candidate/searchService");
const searchService = new searchService_1.SearchService();
const searchCandidates = async (req, res) => {
    try {
        const { query, filters, page, limit } = req.body;
        // Mock user ID
        const userId = 1;
        const result = await searchService.initiateSearch(userId, query, filters);
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('Search initiation error:', error);
        res.status(500).json({ success: false, error: 'Failed to initiate search' });
    }
};
exports.searchCandidates = searchCandidates;
const getSearchStatus = async (req, res) => {
    try {
        const { searchId } = req.params;
        const result = await searchService.getSearchStatus(parseInt(searchId || '0'));
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('Search status error:', error);
        res.status(500).json({ success: false, error: 'Failed to get search status' });
    }
};
exports.getSearchStatus = getSearchStatus;
const getSearchResults = async (req, res) => {
    try {
        const { searchId } = req.params;
        const page = parseInt(req.query.page || '1');
        const limit = parseInt(req.query.limit || '12');
        const result = await searchService.getSearchResults(parseInt(searchId || '0'), page, limit);
        res.json({ success: true, data: result });
    }
    catch (error) {
        console.error('Search results error:', error);
        res.status(500).json({ success: false, error: 'Failed to get search results' });
    }
};
exports.getSearchResults = getSearchResults;
//# sourceMappingURL=searchController.js.map