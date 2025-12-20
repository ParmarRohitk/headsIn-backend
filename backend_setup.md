# Backend Setup Guide - SARAL AI OS Platform

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Environment Setup](#environment-setup)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Installation & Configuration](#installation--configuration)
8. [Development Workflow](#development-workflow)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Git Commit Strategy](#git-commit-strategy)

---

## Project Overview

This backend service powers the **SARAL AI OS Platform**, a comprehensive recruitment solution featuring:
- **Module 1**: AI Candidate Search with semantic matching, ranking, and insights
- **Module 2**: Email Sequence Builder with analytics and campaign management

Built with enterprise-grade architecture, following RESTful principles, TypeScript for type safety, and PostgreSQL for robust data persistence.

---

## Technology Stack

### Core Technologies
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 5.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 14+
- **ORM/Query Builder**: Native `pg` with custom query builders

### Key Dependencies
```json
{
  "express": "^5.2.1",
  "pg": "^8.16.3",
  "zod": "^4.2.1",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3"
}
```

### Development Dependencies
```json
{
  "typescript": "^5.9.3",
  "ts-node-dev": "^2.0.0",
  "@types/express": "^5.0.6",
  "@types/node": "^25.0.3",
  "@types/cors": "^2.8.19"
}
```

---

## Project Structure

```
headsIn-backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # PostgreSQL connection pool
│   │   ├── env.ts               # Environment variables validation
│   │   └── constants.ts         # Application constants
│   │
│   ├── middleware/
│   │   ├── errorHandler.ts      # Global error handler
│   │   ├── validator.ts         # Request validation middleware
│   │   ├── auth.ts              # Authentication middleware (if needed)
│   │   └── logger.ts            # Request logging middleware
│   │
│   ├── models/
│   │   ├── Candidate.ts         # Candidate data model
│   │   ├── SearchHistory.ts     # Search history model
│   │   ├── Credit.ts            # Credit management model
│   │   ├── Shortlist.ts         # Shortlisted candidates model
│   │   ├── Campaign.ts          # Email campaign model
│   │   ├── Sequence.ts          # Email sequence model
│   │   ├── Step.ts              # Sequence step model
│   │   └── Analytics.ts         # Analytics event model
│   │
│   ├── controllers/
│   │   ├── candidate/
│   │   │   ├── searchController.ts      # AI search logic
│   │   │   ├── detailController.ts      # Candidate details
│   │   │   └── shortlistController.ts   # Shortlist management
│   │   │
│   │   ├── campaign/
│   │   │   ├── campaignController.ts    # Campaign CRUD
│   │   │   ├── sequenceController.ts    # Sequence builder
│   │   │   └── analyticsController.ts   # Analytics data
│   │   │
│   │   └── credit/
│   │       └── creditController.ts      # Credit management
│   │
│   ├── services/
│   │   ├── candidate/
│   │   │   ├── searchService.ts         # Search business logic
│   │   │   ├── rankingService.ts        # Ranking algorithm
│   │   │   └── insightService.ts        # AI insights generation
│   │   │
│   │   ├── campaign/
│   │   │   ├── emailService.ts          # Email sending logic
│   │   │   └── analyticsService.ts      # Analytics processing
│   │   │
│   │   └── credit/
│   │       └── creditService.ts         # Credit deduction logic
│   │
│   ├── routes/
│   │   ├── index.ts             # Route aggregator
│   │   ├── candidate.routes.ts  # Candidate endpoints
│   │   ├── campaign.routes.ts   # Campaign endpoints
│   │   └── credit.routes.ts     # Credit endpoints
│   │
│   ├── utils/
│   │   ├── queryBuilder.ts      # SQL query builder utilities
│   │   ├── sanitizer.ts         # Input sanitization
│   │   ├── pagination.ts        # Pagination helpers
│   │   └── logger.ts            # Logger utility
│   │
│   ├── types/
│   │   ├── candidate.types.ts   # Candidate TypeScript types
│   │   ├── campaign.types.ts    # Campaign TypeScript types
│   │   └── api.types.ts         # API request/response types
│   │
│   ├── validators/
│   │   ├── candidate.validator.ts   # Zod schemas for candidates
│   │   └── campaign.validator.ts     # Zod schemas for campaigns
│   │
│   ├── migrations/
│   │   ├── 001_create_candidates_table.sql
│   │   ├── 002_create_search_history_table.sql
│   │   ├── 003_create_credits_table.sql
│   │   ├── 004_create_shortlists_table.sql
│   │   ├── 005_create_campaigns_table.sql
│   │   ├── 006_create_sequences_table.sql
│   │   ├── 007_create_steps_table.sql
│   │   ├── 008_create_analytics_table.sql
│   │   └── 009_seed_mock_data.sql
│   │
│   └── app.ts                   # Express app configuration
│   └── server.ts                # Server entry point
│
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Environment Setup

### Prerequisites
- Node.js v18+ installed
- PostgreSQL 14+ installed and running
- Git for version control

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=headsin_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_MAX_CONNECTIONS=20

# API Configuration
API_VERSION=v1
CORS_ORIGIN=http://localhost:3001

# Credit Configuration
SEARCH_CREDIT_COST=10
UNLOCK_CREDIT_COST=5

# AI Processing Configuration
AI_STAGE_DELAY_MS=2000
MOCK_AI_PROCESSING=true
```

---

## Database Schema

### Candidates Table
```sql
CREATE TABLE candidates (
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
    contact_locked BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidate_experience (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    company VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT,
    order_index INTEGER
);

CREATE TABLE candidate_education (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    institution VARCHAR(255),
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    graduation_year INTEGER,
    order_index INTEGER
);

CREATE TABLE candidate_skills (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    proficiency_level VARCHAR(50)
);
```

### Search History Table
```sql
CREATE TABLE search_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    search_query TEXT NOT NULL,
    filters JSONB,
    results_count INTEGER,
    credits_used INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE search_stages (
    id SERIAL PRIMARY KEY,
    search_id INTEGER REFERENCES search_history(id) ON DELETE CASCADE,
    stage_name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

### Credits Table
```sql
CREATE TABLE credits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    total_credits INTEGER DEFAULT 0,
    used_credits INTEGER DEFAULT 0,
    available_credits INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE credit_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    credit_id INTEGER REFERENCES credits(id),
    transaction_type VARCHAR(50),
    amount INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Shortlists Table
```sql
CREATE TABLE shortlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    search_id INTEGER REFERENCES search_history(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, candidate_id)
);
```

### Campaigns Table
```sql
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'linkedin' or 'email'
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email_sequences (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sequence_steps (
    id SERIAL PRIMARY KEY,
    sequence_id INTEGER REFERENCES email_sequences(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    delay_days INTEGER DEFAULT 0,
    subject VARCHAR(255),
    body_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE campaign_recipients (
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

CREATE TABLE analytics_events (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    recipient_id INTEGER REFERENCES campaign_recipients(id),
    event_type VARCHAR(50), -- 'sent', 'opened', 'replied', 'bounced'
    event_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Module 1: Candidate Search

#### POST `/api/v1/candidates/search`
Initiate AI candidate search with multi-stage processing.

**Request Body:**
```json
{
  "query": "Senior React developer with 5+ years experience",
  "filters": {
    "experience_min": 5,
    "location": "Remote",
    "availability": "available"
  },
  "page": 1,
  "limit": 12
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "searchId": "uuid",
    "stages": [
      {
        "name": "Fetch profiles",
        "status": "completed",
        "startedAt": "2025-12-21T10:00:00Z",
        "completedAt": "2025-12-21T10:00:02Z"
      },
      {
        "name": "Semantic search and LLM match",
        "status": "in_progress"
      }
    ],
    "candidates": [
      {
        "id": 1,
        "name": "John Doe",
        "title": "Senior React Developer",
        "company": "Tech Corp",
        "experience_years": 6,
        "location": "Remote",
        "availability": "available",
        "match_percent": 92,
        "image_url": "/placeholder.jpg"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 30,
      "totalPages": 3
    },
    "creditsUsed": 10
  }
}
```

#### GET `/api/v1/candidates/search/:searchId/status`
Get search processing status.

#### GET `/api/v1/candidates/:id`
Get candidate details with insights.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "title": "Senior React Developer",
    "company": "Tech Corp",
    "match_percent": 92,
    "strengths": ["React expertise", "Team leadership"],
    "areas_to_probe": ["Scalability experience"],
    "ai_verdict": "Highly recommended",
    "experience": [...],
    "education": [...],
    "about": "...",
    "contact_locked": true
  }
}
```

#### POST `/api/v1/candidates/:id/unlock`
Unlock candidate contact information.

#### POST `/api/v1/candidates/:id/shortlist`
Add candidate to shortlist.

#### GET `/api/v1/shortlists`
Get all shortlisted candidates.

### Module 2: Email Campaigns

#### GET `/api/v1/campaigns`
Get all campaigns with analytics.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Q1 Recruitment Drive",
      "type": "email",
      "status": "active",
      "analytics": {
        "delivery_rate": 98.5,
        "open_rate": 45.2,
        "reply_rate": 12.3,
        "trend": "up"
      }
    }
  ]
}
```

#### POST `/api/v1/campaigns`
Create new campaign.

#### GET `/api/v1/campaigns/:id/sequences`
Get sequences for a campaign.

#### POST `/api/v1/campaigns/:id/sequences`
Create email sequence.

#### PUT `/api/v1/sequences/:id/steps`
Update sequence steps.

#### GET `/api/v1/campaigns/:id/analytics`
Get detailed analytics for campaign.

### Credits

#### GET `/api/v1/credits`
Get user credit balance.

#### POST `/api/v1/credits/deduct`
Deduct credits (internal use).

---

## Installation & Configuration

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/headsIn-backend.git
cd headsIn-backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Database Setup
```bash
# Create database
createdb headsin_db

# Run migrations
psql -d headsin_db -f src/migrations/001_create_candidates_table.sql
psql -d headsin_db -f src/migrations/002_create_search_history_table.sql
# ... (run all migrations in order)

# Seed mock data
psql -d headsin_db -f src/migrations/009_seed_mock_data.sql
```

### Step 4: Environment Configuration
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### Step 5: Build TypeScript
```bash
npm run build
```

### Step 6: Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

---

## Development Workflow

### Running in Development Mode
```bash
npm run dev
```
Uses `ts-node-dev` for hot reloading.

### Building for Production
```bash
npm run build
```

### Running Production Build
```bash
npm start
```

### Code Quality
- TypeScript strict mode enabled
- Prettier for code formatting
- ESLint for linting (if configured)

---

## Testing

### Unit Tests Structure
```
src/
├── __tests__/
│   ├── controllers/
│   ├── services/
│   └── utils/
```

### Running Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

---

## Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates configured
- [ ] CORS origins set correctly
- [ ] Error logging configured
- [ ] Rate limiting enabled
- [ ] Health check endpoint configured

### Health Check Endpoint
```
GET /api/v1/health
```

### Deployment Platforms
- **Heroku**: Configure Procfile and environment variables
- **Railway**: Connect GitHub repo, set environment variables
- **AWS EC2**: Use PM2 for process management
- **Docker**: Use provided Dockerfile

---

## Git Commit Strategy

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Example Commits

```
feat(candidate): implement AI candidate search endpoint

- Add searchController with multi-stage processing
- Implement semantic search simulation
- Add ranking and scoring algorithm
- Include pagination support
- Add credit deduction logic

Closes #1

---

fix(search): resolve pagination offset calculation error

- Fix off-by-one error in pagination logic
- Add validation for page and limit parameters

---

docs(api): add comprehensive API documentation

- Document all candidate endpoints
- Include request/response examples
- Add error code references

---

refactor(database): optimize candidate query performance

- Add database indexes on frequently queried columns
- Implement query result caching
- Reduce N+1 query problems

---

test(candidate): add unit tests for search service

- Test search query processing
- Test ranking algorithm
- Test pagination logic
- Achieve 85% code coverage

---

chore(deps): update dependencies to latest versions

- Update Express to 5.2.1
- Update TypeScript to 5.9.3
- Update pg to 8.16.3
```

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches
- `hotfix/*`: Critical production fixes

---

## Security Best Practices

### SQL Injection Prevention
- Use parameterized queries with `pg` library
- Never concatenate user input into SQL strings
- Validate all inputs with Zod schemas

### Input Sanitization
- Sanitize all user inputs
- Validate request bodies with Zod
- Escape special characters

### Error Handling
- Never expose database errors to clients
- Log errors securely
- Return generic error messages to users

### Rate Limiting
- Implement rate limiting on search endpoints
- Prevent credit abuse
- Monitor suspicious activity

---

## Performance Optimization

### Database Optimization
- Index frequently queried columns
- Use connection pooling
- Implement query result caching
- Optimize N+1 query problems

### API Optimization
- Implement response caching
- Use pagination for large datasets
- Compress responses with gzip
- Lazy load related data

---

## Monitoring & Logging

### Logging Levels
- `error`: Critical errors
- `warn`: Warning messages
- `info`: Informational messages
- `debug`: Debug information

### Log Format
```json
{
  "timestamp": "2025-12-21T10:00:00Z",
  "level": "info",
  "message": "Search initiated",
  "searchId": "uuid",
  "userId": 123
}
```

---

## Support & Maintenance

### Common Issues

**Database Connection Error**
- Check PostgreSQL is running
- Verify credentials in `.env`
- Check firewall settings

**Port Already in Use**
- Change PORT in `.env`
- Kill process using port: `lsof -ti:3000 | xargs kill`

**Migration Errors**
- Ensure migrations run in order
- Check database user permissions
- Verify SQL syntax

---

## Contributing

1. Create feature branch from `develop`
2. Write clean, typed code
3. Add tests for new features
4. Update documentation
5. Submit pull request with descriptive message

---

## License

ISC License

---

**Built with ❤️ by Rohit Parmar | 2.5 Years Full Stack Experience**

