# Frontend Setup Guide - SARAL AI OS Platform

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Environment Setup](#environment-setup)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Routing](#routing)
8. [API Integration](#api-integration)
9. [Styling Approach](#styling-approach)
10. [Installation & Configuration](#installation--configuration)
11. [Development Workflow](#development-workflow)
12. [Build & Deployment](#build--deployment)
13. [Git Commit Strategy](#git-commit-strategy)

---

## Project Overview

This frontend application is the user interface for the **SARAL AI OS Platform**, delivering:
- **Module 1**: AI Candidate Search with real-time processing stages, result grid, and detailed candidate modals
- **Module 2**: Email Sequence Builder with rich text editing, analytics dashboard, and campaign management

Built with React 18+, TypeScript, and modern UI/UX principles for a responsive, performant, and accessible experience.

---

## Technology Stack

### Core Technologies
- **Framework**: React 18.3+
- **Language**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **Package Manager**: npm/yarn

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.0",
  "zustand": "^4.5.0",
  "axios": "^1.6.7",
  "zod": "^3.22.4",
  "react-hook-form": "^7.50.0",
  "@tanstack/react-query": "^5.20.0",
  "recharts": "^2.10.3",
  "react-quill": "^2.0.0",
  "framer-motion": "^11.0.0",
  "react-loading-skeleton": "^3.3.1"
}
```

### Development Dependencies
```json
{
  "@types/react": "^18.3.0",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react": "^4.2.1",
  "typescript": "^5.3.3",
  "eslint": "^8.56.0",
  "prettier": "^3.2.5",
  "@testing-library/react": "^14.1.2",
  "@testing-library/jest-dom": "^6.2.0"
}
```

---

## Project Structure

```
headsIn-frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── placeholder-avatar.png
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │       └── globals.css
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Input.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Modal.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Card.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Skeleton/
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Pagination/
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── Pagination.module.css
│   │   │   │   └── index.ts
│   │   │   └── LoadingSpinner/
│   │   │       ├── LoadingSpinner.tsx
│   │   │       ├── LoadingSpinner.module.css
│   │   │       └── index.ts
│   │   │
│   │   ├── candidate/
│   │   │   ├── SearchBar/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── SearchBar.module.css
│   │   │   │   └── index.ts
│   │   │   ├── FilterButton/
│   │   │   │   ├── FilterButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── UploadJDButton/
│   │   │   │   ├── UploadJDButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SuggestionChips/
│   │   │   │   ├── SuggestionChips.tsx
│   │   │   │   ├── SuggestionChips.module.css
│   │   │   │   └── index.ts
│   │   │   ├── CreditModal/
│   │   │   │   ├── CreditModal.tsx
│   │   │   │   ├── CreditModal.module.css
│   │   │   │   └── index.ts
│   │   │   ├── SearchStages/
│   │   │   │   ├── SearchStages.tsx
│   │   │   │   ├── SearchStages.module.css
│   │   │   │   └── index.ts
│   │   │   ├── CandidateCard/
│   │   │   │   ├── CandidateCard.tsx
│   │   │   │   ├── CandidateCard.module.css
│   │   │   │   └── index.ts
│   │   │   ├── CandidateGrid/
│   │   │   │   ├── CandidateGrid.tsx
│   │   │   │   ├── CandidateGrid.module.css
│   │   │   │   └── index.ts
│   │   │   ├── CandidateDetailModal/
│   │   │   │   ├── CandidateDetailModal.tsx
│   │   │   │   ├── CandidateDetailModal.module.css
│   │   │   │   ├── components/
│   │   │   │   │   ├── CandidateHeader.tsx
│   │   │   │   │   ├── StrengthsSection.tsx
│   │   │   │   │   ├── AreasToProbe.tsx
│   │   │   │   │   ├── AIVerdict.tsx
│   │   │   │   │   ├── CareerTimeline.tsx
│   │   │   │   │   ├── WorkExperience.tsx
│   │   │   │   │   ├── AboutSection.tsx
│   │   │   │   │   ├── ContactSection.tsx
│   │   │   │   │   └── EducationSection.tsx
│   │   │   │   └── index.ts
│   │   │   └── ResultTabs/
│   │   │       ├── ResultTabs.tsx
│   │   │       ├── ResultTabs.module.css
│   │   │       └── index.ts
│   │   │
│   │   ├── campaign/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Dashboard.module.css
│   │   │   │   └── index.ts
│   │   │   ├── CampaignTabs/
│   │   │   │   ├── CampaignTabs.tsx
│   │   │   │   ├── CampaignTabs.module.css
│   │   │   │   └── index.ts
│   │   │   ├── CampaignCard/
│   │   │   │   ├── CampaignCard.tsx
│   │   │   │   ├── CampaignCard.module.css
│   │   │   │   └── index.ts
│   │   │   ├── AnalyticsChart/
│   │   │   │   ├── AnalyticsChart.tsx
│   │   │   │   ├── AnalyticsChart.module.css
│   │   │   │   └── index.ts
│   │   │   ├── SequenceBuilder/
│   │   │   │   ├── SequenceBuilder.tsx
│   │   │   │   ├── SequenceBuilder.module.css
│   │   │   │   ├── components/
│   │   │   │   │   ├── StepEditor.tsx
│   │   │   │   │   ├── RichTextEditor.tsx
│   │   │   │   │   └── StepPreview.tsx
│   │   │   │   └── index.ts
│   │   │   └── CampaignForm/
│   │   │       ├── CampaignForm.tsx
│   │   │       ├── CampaignForm.module.css
│   │   │       └── index.ts
│   │   │
│   │   └── layout/
│   │       ├── Header/
│   │       │   ├── Header.tsx
│   │       │   ├── Header.module.css
│   │       │   └── index.ts
│   │       ├── Sidebar/
│   │       │   ├── Sidebar.tsx
│   │       │   ├── Sidebar.module.css
│   │       │   └── index.ts
│   │       └── Layout/
│   │           ├── Layout.tsx
│   │           ├── Layout.module.css
│   │           └── index.ts
│   │
│   ├── hooks/
│   │   ├── useCandidateSearch.ts
│   │   ├── useCandidateDetail.ts
│   │   ├── useShortlist.ts
│   │   ├── useCampaigns.ts
│   │   ├── useSequence.ts
│   │   ├── useAnalytics.ts
│   │   ├── useDebounce.ts
│   │   ├── usePagination.ts
│   │   └── useModal.ts
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── candidate.api.ts
│   │   │   ├── campaign.api.ts
│   │   │   └── credit.api.ts
│   │   └── utils/
│   │       ├── formatters.ts
│   │       ├── validators.ts
│   │       └── constants.ts
│   │
│   ├── store/
│   │   ├── candidateStore.ts
│   │   ├── campaignStore.ts
│   │   ├── creditStore.ts
│   │   └── uiStore.ts
│   │
│   ├── types/
│   │   ├── candidate.types.ts
│   │   ├── campaign.types.ts
│   │   ├── api.types.ts
│   │   └── common.types.ts
│   │
│   ├── utils/
│   │   ├── errorHandler.ts
│   │   ├── localStorage.ts
│   │   └── helpers.ts
│   │
│   ├── pages/
│   │   ├── CandidateSearch/
│   │   │   ├── CandidateSearch.tsx
│   │   │   ├── CandidateSearch.module.css
│   │   │   └── index.ts
│   │   ├── CampaignDashboard/
│   │   │   ├── CampaignDashboard.tsx
│   │   │   ├── CampaignDashboard.module.css
│   │   │   └── index.ts
│   │   └── NotFound/
│   │       ├── NotFound.tsx
│   │       └── index.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## Environment Setup

### Prerequisites
- Node.js v18+ installed
- npm or yarn package manager
- Git for version control

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_API_TIMEOUT=30000

# Application Configuration
VITE_APP_NAME=SARAL AI OS
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MOCK_DATA=false
```

---

## Component Architecture

### Component Structure Pattern

Each component follows this structure:
```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.module.css   # Scoped styles
├── ComponentName.test.tsx     # Unit tests (optional)
└── index.ts                   # Barrel export
```

### Example Component: Button

**Button.tsx**
```typescript
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

**Button.module.css**
```css
.button {
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background-color: #007bff;
  color: white;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.danger {
  background-color: #dc3545;
  color: white;
}

.small {
  padding: 8px 16px;
  font-size: 14px;
}

.medium {
  padding: 12px 24px;
  font-size: 16px;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
}

.button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

## State Management

### Zustand Store Structure

**candidateStore.ts**
```typescript
import { create } from 'zustand';
import { Candidate, SearchStage } from '../types/candidate.types';

interface CandidateState {
  candidates: Candidate[];
  shortlisted: Candidate[];
  searchStages: SearchStage[];
  currentSearchId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCandidates: (candidates: Candidate[]) => void;
  addToShortlist: (candidate: Candidate) => void;
  removeFromShortlist: (candidateId: number) => void;
  updateSearchStages: (stages: SearchStage[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useCandidateStore = create<CandidateState>((set) => ({
  candidates: [],
  shortlisted: [],
  searchStages: [],
  currentSearchId: null,
  isLoading: false,
  error: null,
  
  setCandidates: (candidates) => set({ candidates }),
  addToShortlist: (candidate) => 
    set((state) => ({
      shortlisted: [...state.shortlisted, candidate]
    })),
  removeFromShortlist: (candidateId) =>
    set((state) => ({
      shortlisted: state.shortlisted.filter(c => c.id !== candidateId)
    })),
  updateSearchStages: (stages) => set({ searchStages: stages }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({
    candidates: [],
    searchStages: [],
    currentSearchId: null,
    isLoading: false,
    error: null
  })
}));
```

---

## Routing

### React Router Configuration

**App.tsx**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CandidateSearch } from './pages/CandidateSearch';
import { CampaignDashboard } from './pages/CampaignDashboard';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<CandidateSearch />} />
            <Route path="/candidates" element={<CandidateSearch />} />
            <Route path="/campaigns" element={<CampaignDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
```

---

## API Integration

### API Client Setup

**services/api/client.ts**
```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### React Query Hooks

**hooks/useCandidateSearch.ts**
```typescript
import { useMutation, useQuery } from '@tanstack/react-query';
import { candidateApi } from '../services/api/candidate.api';
import { SearchRequest, SearchResponse } from '../types/candidate.types';

export const useCandidateSearch = () => {
  return useMutation({
    mutationFn: (data: SearchRequest) => candidateApi.search(data),
    onSuccess: (data: SearchResponse) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    },
  });
};

export const useSearchStatus = (searchId: string | null) => {
  return useQuery({
    queryKey: ['searchStatus', searchId],
    queryFn: () => candidateApi.getSearchStatus(searchId!),
    enabled: !!searchId,
    refetchInterval: 2000, // Poll every 2 seconds
  });
};
```

---

## Styling Approach

### CSS Modules

Each component has its own CSS module for scoped styling:
- Prevents style conflicts
- Enables component-level styling
- Supports CSS variables for theming

### Global Styles

**assets/styles/globals.css**
```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  
  --border-radius: 8px;
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  /* Mobile styles */
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet styles */
}

@media (min-width: 1025px) {
  /* Desktop styles */
}
```

### Responsive Grid Layout

**CandidateGrid.module.css**
```css
.grid {
  display: grid;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
}

/* Mobile: 1 column */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet: 2 columns */
@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1025px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Installation & Configuration

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/headsIn-frontend.git
cd headsIn-frontend
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Configuration
```bash
cp .env.example .env
# Edit .env with your API base URL
```

### Step 4: Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:5173` (Vite default port)

---

## Development Workflow

### Available Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
  "test": "vitest",
  "test:coverage": "vitest --coverage"
}
```

### Development Best Practices

1. **Component Development**
   - Write components in TypeScript
   - Use CSS Modules for styling
   - Export components via index.ts barrel files
   - Add PropTypes or TypeScript interfaces

2. **State Management**
   - Use Zustand for global state
   - Use React Query for server state
   - Use local state for component-specific state

3. **Performance Optimization**
   - Use `React.memo` for expensive components
   - Implement lazy loading for routes
   - Use `useMemo` and `useCallback` appropriately
   - Implement virtual scrolling for long lists

4. **Error Handling**
   - Use Error Boundaries for component errors
   - Handle API errors gracefully
   - Show user-friendly error messages
   - Log errors for debugging

---

## Build & Deployment

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deployment to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Environment Variables**
   - Set `VITE_API_BASE_URL` in Vercel dashboard
   - Configure other environment variables

### Deployment to Netlify

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Build Configuration**
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

3. **Deploy**
```bash
netlify deploy --prod
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] API base URL set correctly
- [ ] Build completes without errors
- [ ] All routes work correctly
- [ ] Error boundaries tested
- [ ] Performance optimized
- [ ] Analytics configured (if applicable)

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
- `style`: Code style changes (formatting, CSS)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ui`: UI/UX changes

### Example Commits

```
feat(candidate): implement AI candidate search interface

- Add SearchBar component with natural language input
- Implement multi-stage search progress indicator
- Create CandidateCard component with match percentage
- Add pagination and result tabs (Matches/Shortlisted)
- Integrate with search API endpoint

Closes #1

---

feat(candidate): add candidate detail modal

- Create CandidateDetailModal component
- Implement scrollable modal with all sections
- Add strengths and areas to probe sections
- Include AI verdict banner
- Add career timeline visualization
- Implement contact unlock functionality

---

fix(search): resolve search stage polling issue

- Fix infinite polling when search completes
- Add proper cleanup in useEffect
- Handle search status errors gracefully

---

style(candidate): improve candidate card responsive design

- Update grid layout for mobile devices
- Adjust card spacing and padding
- Fix image aspect ratio on small screens
- Improve touch targets for mobile

---

feat(campaign): implement email sequence builder

- Add SequenceBuilder component with step editor
- Integrate React Quill for rich text editing
- Implement step reordering functionality
- Add step preview mode
- Save sequence to backend

---

feat(campaign): add analytics dashboard

- Create CampaignCard component with metrics
- Implement Recharts for data visualization
- Add trend indicators (up/down arrows)
- Display delivery, open, and reply rates
- Add date range filtering

---

refactor(api): optimize API call structure

- Consolidate API calls using React Query
- Implement request caching
- Add retry logic for failed requests
- Reduce unnecessary re-renders

---

perf(candidate): optimize candidate grid rendering

- Implement React.memo for CandidateCard
- Add virtual scrolling for large lists
- Lazy load images with intersection observer
- Debounce search input

---

test(candidate): add unit tests for search components

- Test SearchBar component
- Test CandidateCard rendering
- Test search stage updates
- Achieve 80% code coverage

---

chore(deps): update dependencies to latest versions

- Update React to 18.3.1
- Update TypeScript to 5.3.3
- Update Vite to 5.0.0
- Update React Router to 6.22.0

---

ui(common): enhance button component variants

- Add loading state with spinner
- Improve hover and focus states
- Add icon support
- Update color scheme for better contrast
```

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature branches (e.g., `feature/candidate-search`)
- `fix/*`: Bug fix branches (e.g., `fix/search-polling`)
- `ui/*`: UI/UX improvement branches
- `refactor/*`: Refactoring branches

---

## Performance Optimization

### Code Splitting
```typescript
// Lazy load routes
const CandidateSearch = lazy(() => import('./pages/CandidateSearch'));
const CampaignDashboard = lazy(() => import('./pages/CampaignDashboard'));

// Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/candidates" element={<CandidateSearch />} />
  </Routes>
</Suspense>
```

### Image Optimization
- Use WebP format where supported
- Implement lazy loading with Intersection Observer
- Use placeholder images during loading
- Optimize image sizes

### Memoization
```typescript
// Memoize expensive computations
const filteredCandidates = useMemo(() => {
  return candidates.filter(c => c.match_percent > 80);
}, [candidates]);

// Memoize callbacks
const handleCardClick = useCallback((candidateId: number) => {
  // Handle click
}, []);
```

---

## Testing Strategy

### Unit Tests
- Test individual components
- Test custom hooks
- Test utility functions
- Use React Testing Library

### Integration Tests
- Test component interactions
- Test API integration
- Test user flows

### E2E Tests (Optional)
- Use Playwright or Cypress
- Test critical user journeys

---

## Accessibility (a11y)

### Best Practices
- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation
- Maintain color contrast ratios
- Provide alt text for images
- Test with screen readers

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Support & Maintenance

### Common Issues

**API Connection Error**
- Check API base URL in `.env`
- Verify CORS settings on backend
- Check network connectivity

**Build Errors**
- Clear `node_modules` and reinstall
- Check TypeScript errors
- Verify all dependencies installed

**Styling Issues**
- Check CSS module imports
- Verify class names match
- Check for CSS specificity conflicts

---

## Contributing

1. Create feature branch from `develop`
2. Write clean, typed code
3. Add tests for new features
4. Update documentation
5. Ensure responsive design
6. Submit pull request with descriptive message

---

## License

ISC License

---

**Built with ❤️ by Rohit Parmar | 2.5 Years Full Stack Experience**

