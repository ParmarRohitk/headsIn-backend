import app from './app';
import { config } from './config/config';

const startServer = async () => {
    try {
        const server = app.listen(config.port, () => {
            console.log(`Server running in ${config.env} mode on port ${config.port}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err: any) => {
            console.error('UNHANDLED REJECTION! 💥 Shutting down...');
            console.error(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
