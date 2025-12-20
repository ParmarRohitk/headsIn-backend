CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    company VARCHAR(255),
    experience_years INTEGER,
    location VARCHAR(255),
    availability_status VARCHAR(50) DEFAULT 'available',
    image_url TEXT,
    about TEXT,
    match_percent INTEGER,
    contact_locked BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidate_experience (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    company VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT,
    order_index INTEGER
);

CREATE TABLE IF NOT EXISTS candidate_education (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    institution VARCHAR(255),
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    graduation_year INTEGER,
    order_index INTEGER
);

CREATE TABLE IF NOT EXISTS candidate_skills (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    proficiency_level VARCHAR(50)
);
