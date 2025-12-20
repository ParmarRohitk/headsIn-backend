CREATE TABLE IF NOT EXISTS search_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    search_query TEXT NOT NULL,
    filters JSONB,
    results_count INTEGER,
    credits_used INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_stages (
    id SERIAL PRIMARY KEY,
    search_id INTEGER REFERENCES search_history(id) ON DELETE CASCADE,
    stage_name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);
