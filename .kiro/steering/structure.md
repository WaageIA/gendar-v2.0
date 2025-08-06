# Project Structure

## Root Directory
```
servicehub-pro/
├── public/             # Static assets and manifest files
├── src/                # Source code
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.mjs     # Vite build configuration
├── jsconfig.json       # JavaScript path mapping
└── postcss.config.js   # PostCSS configuration
```

## Source Structure (`src/`)
```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (buttons, inputs, etc.)
│   ├── AppIcon.jsx    # Application icon component
│   ├── AppImage.jsx   # Image handling component
│   ├── ErrorBoundary.jsx  # Error boundary wrapper
│   └── ScrollToTop.jsx     # Route change scroll handler
├── pages/             # Page-level components (route handlers)
│   ├── admin-dashboard/
│   ├── admin-login/
│   ├── calendar-management/
│   ├── client-management/
│   ├── client-portal-dashboard/
│   ├── client-appointment-history/
│   ├── public-booking-interface/
│   └── NotFound.jsx   # 404 page component
├── styles/            # Global styles and CSS
│   ├── tailwind.css   # Tailwind imports and custom CSS
│   └── index.css      # Base styles and resets
├── utils/             # Utility functions and helpers
│   └── cn.js          # Class name utility (clsx + tailwind-merge)
├── App.jsx            # Root application component
├── Routes.jsx         # Route definitions and configuration
└── index.jsx          # Application entry point
```

## Architecture Patterns

### Page Organization
- Each page has its own folder under `src/pages/`
- Page folders contain an `index.jsx` as the main component
- Page-specific components go in a `components/` subfolder within each page
- Pages are imported and configured in `src/Routes.jsx`

### Component Structure
- **Global components** in `src/components/` for reusable UI elements
- **UI components** in `src/components/ui/` for base design system components
- **Page components** in `src/pages/[page-name]/components/` for page-specific elements

### Routing Convention
- Uses React Router v6 with `useRoutes` hook
- All routes defined in `src/Routes.jsx`
- Route paths match page folder names (kebab-case)
- Root path (`/`) defaults to Admin Dashboard
- Includes error boundary and scroll-to-top functionality

### Import Conventions
- **Absolute imports** enabled via `jsconfig.json` with `src/` as base
- Import components without relative paths: `import Component from "components/Component"`
- Import pages: `import PageName from "pages/page-name"`
- Import utilities: `import { cn } from "utils/cn"`

### Styling Conventions
- **Tailwind-first** approach with utility classes
- **CSS custom properties** for design tokens (colors, spacing)
- **Component variants** using `class-variance-authority`
- **Conditional classes** using `cn()` utility (clsx + tailwind-merge)
- Global styles in `src/styles/tailwind.css`

### File Naming
- **Components**: PascalCase (e.g., `AdminDashboard.jsx`)
- **Pages**: kebab-case folders with `index.jsx`
- **Utilities**: camelCase (e.g., `cn.js`)
- **Styles**: kebab-case (e.g., `tailwind.css`)