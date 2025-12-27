# HeadsIn Backend

## Description

HeadsIn Backend is a Node.js/TypeScript-based backend service for the HeadsIn recruitment platform. It provides AI-powered candidate search, email campaign management, and credit-based access control. The platform features semantic matching, ranking algorithms, and comprehensive analytics for recruitment workflows.

## Features

- **AI Candidate Search**: Semantic search with ranking and insights
- **Email Sequence Builder**: Automated campaign management with analytics
- **Credit System**: Usage-based credit management for searches and unlocks
- **RESTful API**: Well-structured endpoints for candidates, campaigns, and credits
- **PostgreSQL Database**: Robust data persistence with migrations
- **TypeScript**: Type-safe development
- **CORS Support**: Configurable cross-origin resource sharing

## Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 5.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 14+
- **Query Builder**: Native `pg` library
- **Validation**: Zod schemas
- **Environment**: dotenv for configuration

### Dependencies
- `express`: Web framework
- `pg`: PostgreSQL client
- `zod`: Schema validation
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variables

### Dev Dependencies
- `typescript`: TypeScript compiler
- `ts-node-dev`: Development server with hot reload
- `@types/*`: Type definitions

## Project Structure

```
headsIn-backend/
├── src/
│   ├── app.ts                    # Express app configuration
│   ├── server.ts                 # Server entry point
│   ├── config/
│   │   ├── config.ts             # App configuration
│   │   └── database.ts           # PostgreSQL connection pool
│   ├── controllers/
│   │   ├── candidate/
│   │   │   ├── candidateController.ts
│   │   │   └── searchController.ts
│   │   ├── credit/
│   │   │   └── creditController.ts
│   │   └── campaign/
│   │       └── campaignController.ts
│   ├── routes/
│   │   ├── candidate.routes.ts
│   │   ├── credit.routes.ts
│   │   └── campaign.routes.ts
│   ├── services/
│   │   ├── candidate/
│   │   │   ├── candidateService.ts
│   │   │   └── searchService.ts
│   │   ├── credit/
│   │   │   └── creditService.ts
│   │   └── campaign/
│   │       └── campaignService.ts
│   ├── types/
│   │   └── candidate.types.ts
│   ├── utils/
│   │   ├── ApiResponse.ts
│   │   ├── AppError.ts
│   │   ├── catchAsync.ts
│   │   └── migrate.ts
│   └── migrations/
│       ├── 001_create_candidates_table.sql
│       ├── 002_create_search_history_table.sql
│       ├── 003_create_credits_table.sql
│       ├── 004_create_shortlists_table.sql
│       ├── 005_create_campaigns_and_sequences.sql
│       ├── 006_create_steps_and_analytics.sql
│       └── 009_seed_mock_data.sql
├── backend_setup.md
├── frontend_setup.md
├── package.json
├── tsconfig.json
├── render.yaml
├── index.js
├── migrate.js
├── copy-assets.js
├── seed-campaigns.js
├── seed-skills.js
└── README.md
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ParmarRohitk/headsIn-backend-.git
   cd headsIn-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=headsin_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_MAX_CONNECTIONS=20
   CORS_ORIGIN=http://localhost:3001
   ```

4. **Set up PostgreSQL database**:
   - Ensure PostgreSQL is installed and running.
   - Create a database named `headsin_db` (or as specified in `.env`).
   - Run migrations to set up tables:
     ```bash
     node migrate.js
     ```

5. **Seed initial data** (optional):
   ```bash
   node seed-skills.js
   node seed-campaigns.js
   ```

## Database Setup

The database schema includes the following main tables:

- **candidates**: Candidate profiles with experience, education, skills
- **search_history**: Records of search queries and results
- **credits**: User credit balances and transactions
- **shortlists**: Shortlisted candidates
- **campaigns**: Email campaigns
- **sequences**: Email sequences within campaigns
- **steps**: Individual steps in sequences
- **analytics**: Campaign analytics data

Migrations are located in `src/migrations/` and can be run using `node migrate.js`.

## Running the Application

### Development
```bash
npm run dev
```
Starts the server with hot reload using `ts-node-dev`.

### Production Build
```bash
npm run build
npm start
```
Builds TypeScript to JavaScript in `dist/` and starts the server.

### Health Check
- Health endpoint: `GET /api/v1/health`
- DB check endpoint: `GET /dbcheck`

## API Endpoints

### Candidates
- `GET /api/v1/candidates/search` - Search candidates
- `GET /api/v1/candidates/:id` - Get candidate details
- `POST /api/v1/candidates/:id/shortlist` - Shortlist candidate

### Credits
- `GET /api/v1/credits` - Get user credits
- `POST /api/v1/credits/deduct` - Deduct credits

### Campaigns
- `GET /api/v1/campaigns` - List campaigns
- `POST /api/v1/campaigns` - Create campaign
- `GET /api/v1/campaigns/:id` - Get campaign details
- `PUT /api/v1/campaigns/:id` - Update campaign
- `DELETE /api/v1/campaigns/:id` - Delete campaign

## Deployment

The application is configured for deployment on Render using `render.yaml`.

### Environment Variables for Production
Ensure the following are set in your deployment environment:
- `NODE_ENV=production`
- Database connection details
- `CORS_ORIGIN` for frontend URL

### Build and Deploy
```bash
npm run build
```
The `postinstall` script runs the build automatically.

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `node migrate.js`: Run database migrations
- `node seed-skills.js`: Seed skills data
- `node seed-campaigns.js`: Seed campaigns data

## Repository

[GitHub Repository](https://github.com/ParmarRohitk/headsIn-backend-)</content>
<parameter name="filePath">