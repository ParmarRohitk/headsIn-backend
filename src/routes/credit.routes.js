"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creditController_1 = require("../controllers/credit/creditController");
const router = (0, express_1.Router)();
router.get('/', creditController_1.getUserCredits);
exports.default = router;
//# sourceMappingURL=credit.routes.js.map