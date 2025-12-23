CREATE TABLE IF NOT EXISTS credits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    total_credits INTEGER DEFAULT 0,
    used_credits INTEGER DEFAULT 0,
    available_credits INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS credit_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    credit_id INTEGER REFERENCES credits(id),
    transaction_type VARCHAR(50),
    amount INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
