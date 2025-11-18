# Travel Content Health Score Calculator

## Overview

This is a B2B SaaS diagnostic calculator application for PIXIgroup.ai that helps luxury hotel groups assess their travel content management health. The application calculates a proprietary "Travel Content Health Score" (also called PCC - PIXI Content Co-efficient) based on portfolio size, room keys, ADR, commercial team hours, and content budget. It provides ROI projections and subscription recommendations to demonstrate the value proposition of PIXI's content management platform.

The calculator is designed to be embedded in iframes (particularly Squarespace) with automatic height resizing to eliminate whitespace issues.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component Library**: shadcn/ui components built on Radix UI primitives, providing a comprehensive set of accessible, customizable components

**Styling**: Tailwind CSS with custom design tokens following Material Design principles adapted for B2B SaaS. The design system emphasizes clarity, professional credibility, and data presentation.

**State Management**: React hooks for local state, TanStack Query for server state management (though currently minimal server interaction)

**Routing**: Wouter for lightweight client-side routing

**Animations**: Framer Motion for smooth transitions and score display animations

**Form Handling**: React Hook Form with Zod schema validation for type-safe form inputs

**Key Design Decisions**:
- Single-page application structure with fixed max-width container (max-w-5xl)
- Inter font family used throughout for consistency
- Component-based architecture with reusable UI primitives
- Responsive design with mobile-first approach
- Iframe-friendly with auto-resize messaging to parent windows

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**API Structure**: RESTful endpoints (currently minimal - primarily serves static frontend)

**Session Management**: express-session configured with connect-pg-simple for PostgreSQL session storage

**Development Setup**: 
- Vite dev server integrated with Express for hot module replacement
- Custom middleware for request logging and JSON response capture
- Error handling with runtime error overlay in development

**Build Process**:
- Frontend: Vite builds React app to dist/public
- Backend: esbuild bundles Express server to dist/index.js
- Single production command runs the bundled Express server serving static assets

### Calculator Logic

**Core Algorithm** (in `client/src/lib/calculator.ts`):
- Converts portfolio size selections to property counts (single=1, small=3, large=8)
- Calculates three component scores:
  - **Productivity Score** (0-30 points): Based on labor cost drain from manual asset requests
  - **Consistency Index** (0-35 points): Based on content investment at risk from inconsistent branding
  - **Discovery Value Score** (0-35 points): Based on incremental revenue opportunity
- Final PCC Score is the sum of all three components (0-100)
- ROI calculation compares total gains vs estimated PIXI subscription cost

**Key Constants**:
- Working days per year: 220
- Average S&M annual salary: £82,500
- Average PIXI subscription: £5,100 (Medium tier)
- Average length of stay: 5 days
- Incremental bookings per property: 20
- Conservative risk factor: 10% of content budget at risk

### Iframe Embedding System

**Auto-Resize Mechanism** (`client/src/hooks/useIframeResize.ts`):
- Uses ResizeObserver to monitor document height changes
- Posts messages to parent window with iframe-resize event type
- MutationObserver as backup for DOM changes
- Parent window listens for messages and updates iframe height dynamically

**Implementation Files**:
- `IFRAME_EMBEDDING.md`: General embedding instructions
- `SQUARESPACE_EMBED.html`: Pre-built embed code for Squarespace
- `SQUARESPACE_INSTRUCTIONS.md`: Step-by-step Squarespace integration guide

## External Dependencies

### Database

**Drizzle ORM**: Type-safe PostgreSQL ORM with schema definition in `shared/schema.ts`

**Neon Database**: Serverless PostgreSQL via `@neondatabase/serverless` driver

**Schema**: Currently defines users table and calculator input/result schemas, though the calculator operates entirely client-side without database persistence

**Migration System**: drizzle-kit for schema migrations with `npm run db:push`

### UI Component Libraries

**Radix UI**: Headless, accessible component primitives for accordion, dialog, dropdown, tooltip, select, and 20+ other components

**shadcn/ui**: Pre-styled component implementations built on Radix UI with Tailwind CSS

**Lucide React**: Icon library for consistent iconography

### Form & Validation

**React Hook Form**: Performant form state management with minimal re-renders

**Zod**: TypeScript-first schema validation for form inputs and data models

**@hookform/resolvers**: Integrates Zod schemas with React Hook Form

### Animation & Interaction

**Framer Motion**: Declarative animations for score reveals and UI transitions

**Embla Carousel**: Lightweight carousel/slider component (available but not currently used)

### Development Tools

**Vite Plugins**:
- `@vitejs/plugin-react`: Fast Refresh and JSX transform
- `@replit/vite-plugin-runtime-error-modal`: Runtime error overlay
- `@replit/vite-plugin-cartographer`: Code navigation (development only)
- `@replit/vite-plugin-dev-banner`: Development environment banner (development only)

**TypeScript**: Strict type checking with path aliases (@/, @shared, @assets)

### Build & Deployment

**esbuild**: Fast bundling for production server build

**PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins

**Environment**: Designed for Replit deployment with published URL for iframe embedding