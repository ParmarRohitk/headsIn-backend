import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    corsOrigin: process.env.CORS_ORIGIN || '*',
    database: {
        url: process.env.DATABASE_URL,
    }
};
