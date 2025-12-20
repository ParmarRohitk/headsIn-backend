"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCredits = void 0;
const creditService_1 = require("../../services/credit/creditService");
const creditService = new creditService_1.CreditService();
const getUserCredits = async (req, res) => {
    try {
        // Mock user ID
        const userId = 1;
        const credits = await creditService.getUserCredits(userId);
        res.json({ success: true, data: credits });
    }
    catch (error) {
        console.error('Get credits error:', error);
        res.status(500).json({ success: false, error: 'Failed to get credits' });
    }
};
exports.getUserCredits = getUserCredits;
//# sourceMappingURL=creditController.js.map