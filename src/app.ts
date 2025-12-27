import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import candidateRoutes from './routes/candidate.routes';
import creditRoutes from './routes/credit.routes';
import campaignRoutes from './routes/campaign.routes';
import { AppError } from './utils/AppError';
import { ApiResponse } from './utils/ApiResponse';
import { query } from './config/database';

const app = express();

// Middlewares
// Parse CORS origins from environment variable (comma-separated)
const envOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : [];

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173', // Vite default
    'https://headsin-saral-ai.vercel.app', // Production frontend
    ...envOrigins
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '16kb' }));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, { version: '1.0.0' }, 'HeadsIn Backend is running!'));
});

app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/credits', creditRoutes);
app.use('/api/v1/campaigns', campaignRoutes);

// Health check
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, { timestamp: new Date() }, 'Health check passed'));
});

// DB check
app.get('/dbcheck', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await query('SELECT 1');
        res.status(200).json(new ApiResponse(200, { timestamp: new Date() }, 'Database connection successful'));
    } catch (error) {
        next(new AppError('Database connection failed', 500));
    }
});

// Handle undefined routes (404)
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
        success: false,
        status,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack, error: err })
    });
});

export default app;
