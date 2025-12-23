import app from './app';
// import pool from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // await pool.query('SELECT 1'); // Test DB connection
        // console.log('Database connected successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
