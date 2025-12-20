CREATE TABLE IF NOT EXISTS shortlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    search_id INTEGER REFERENCES search_history(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, candidate_id)
);
