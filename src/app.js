"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const candidate_routes_1 = __importDefault(require("./routes/candidate.routes"));
// import campaignRoutes from './routes/campaign.routes';
const credit_routes_1 = __importDefault(require("./routes/credit.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN || '*' }));
app.use((0, body_parser_1.json)());
// Routes
app.get('/', (req, res) => {
    res.json({ message: 'HeadsIn Backend is running!', version: '1.0.0' });
});
app.use('/api/v1/candidates', candidate_routes_1.default);
// app.use('/api/v1/campaigns', campaignRoutes);
app.use('/api/v1/credits', credit_routes_1.default);
// Health check
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
exports.default = app;
//# sourceMappingURL=app.js.map