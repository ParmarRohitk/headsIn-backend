"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("../config/database"));
const migrate = async () => {
    const migrationsDir = path_1.default.join(__dirname, '../migrations');
    try {
        // Get all SQL files
        const files = fs_1.default.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.sql'))
            .sort(); // Ensure order by filename
        console.log(`Found ${files.length} migration files.`);
        const client = await database_1.default.connect();
        try {
            await client.query('BEGIN');
            for (const file of files) {
                const filePath = path_1.default.join(migrationsDir, file);
                const sql = fs_1.default.readFileSync(filePath, 'utf-8');
                console.log(`Running migration: ${file}`);
                await client.query(sql);
            }
            await client.query('COMMIT');
            console.log('All migrations executed successfully.');
        }
        catch (error) {
            await client.query('ROLLBACK');
            console.error('Migration failed, rolling back.', error);
            throw error;
        }
        finally {
            client.release();
        }
    }
    catch (error) {
        console.error('Migration script error:', error);
        process.exit(1);
    }
    finally {
        await database_1.default.end();
    }
};
migrate();
//# sourceMappingURL=migrate.js.map