import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import candidateRoutes from './routes/candidate.routes';
import creditRoutes from './routes/credit.routes';
import { AppError } from './utils/AppError';
import { ApiResponse } from './utils/ApiResponse';

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(json({ limit: '16kb' }));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, { version: '1.0.0' }, 'HeadsIn Backend is running!'));
});

app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/credits', creditRoutes);

// Health check
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, { timestamp: new Date() }, 'Health check passed'));
});

// Handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
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
