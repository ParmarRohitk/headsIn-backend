CREATE TABLE IF NOT EXISTS sequence_steps (
    id SERIAL PRIMARY KEY,
    sequence_id INTEGER REFERENCES email_sequences(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    delay_days INTEGER DEFAULT 0,
    subject VARCHAR(255),
    body_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaign_recipients (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    candidate_id INTEGER REFERENCES candidates(id),
    email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    sent_at TIMESTAMP,
    opened_at TIMESTAMP,
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics_events (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    recipient_id INTEGER REFERENCES campaign_recipients(id),
    event_type VARCHAR(50), -- 'sent', 'opened', 'replied', 'bounced'
    event_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
