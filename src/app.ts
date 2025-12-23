import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import candidateRoutes from './routes/candidate.routes';
// import campaignRoutes from './routes/campaign.routes';
import creditRoutes from './routes/credit.routes';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(json());

// Routes
app.use('/api/v1/candidates', candidateRoutes);
// app.use('/api/v1/campaigns', campaignRoutes);
app.use('/api/v1/credits', creditRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
