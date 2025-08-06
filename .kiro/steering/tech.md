# Technology Stack

## Core Framework
- **React 18** - Modern React with concurrent features
- **Vite** - Fast build tool and development server
- **JavaScript (JSX)** - Primary language with JSX syntax

## State Management & Data
- **Redux Toolkit** - Simplified Redux for state management
- **Supabase** - Backend-as-a-Service for database and auth
- **Axios** - HTTP client for API requests

## Styling & UI
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Tailwind Forms Plugin** - Enhanced form styling
- **Tailwind Animate** - Animation utilities
- **CSS Custom Properties** - Design tokens via CSS variables
- **Framer Motion** - Animation library for smooth UI transitions

## Routing & Navigation
- **React Router v6** - Declarative routing with `useRoutes`
- **React Router Hash Link** - Hash-based navigation support

## Forms & Validation
- **React Hook Form** - Performant form management
- **Date-fns** - Date manipulation and formatting

## Data Visualization
- **D3.js** - Advanced data visualization
- **Recharts** - React chart components

## UI Components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class utilities

## Development Tools
- **ESLint** - Code linting with React-specific rules
- **PostCSS** - CSS processing with Autoprefixer
- **Vite TypeScript Paths** - Path mapping support

## Common Commands

```bash
# Development
npm start              # Start dev server on port 4028
npm run build          # Build for production (outputs to /build)
npm run preview        # Preview production build
npm run serve          # Alias for preview

# Code Quality
npm run lint           # Run ESLint with React rules

# Dependencies
npm install            # Install all dependencies
```

## Build Configuration
- **Output Directory**: `build/` (not `dist/`)
- **Dev Server**: Port 4028, accessible on all interfaces
- **Chunk Size Warning**: 2MB limit
- **Allowed Hosts**: AWS and Rocket.new domains