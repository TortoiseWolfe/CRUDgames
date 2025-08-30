# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2025-08-30

### Hotfix - Build Errors for GitHub Pages Deployment

### Fixed
- ESLint no-explicit-any error in test/setup.ts - proper Storage type casting
- Unused import warning in Button.test.tsx - removed ArrowRight import
- Next.js img element warning in TestimonialSection - replaced with Image component
- Missing args property in Button stories (InteractiveDemo, AllVariants)
- Missing vi import from vitest in test/setup.ts
- localStorage mock typing with proper Storage interface implementation

### Technical Details
- Build now passes all linting and type checking
- GitHub Pages deployment pipeline restored
- All ESLint rules properly enforced

## [1.2.0] - 2025-08-30

### Session 3 - Testing Infrastructure & Component Expansion

### Added
- **Testing Infrastructure**
  - Vitest configuration with React Testing Library
  - Storybook-test integration (stories serve as test fixtures)
  - Button component unit tests (13 tests passing)
  - Test setup files with browser API mocks
  - Vitest workspace configuration for running different test suites

- **Security Components**
  - `ErrorBoundary` - Graceful React error handling with fallback UI
  - `HoneypotField` - Invisible spam protection for forms
  - `RateLimiter` - Client-side form submission throttling

- **UX Components** 
  - `LoadingState` - Skeleton loading screens with animations
  - `Modal` - Accessible modal dialogs (not fully implemented)

- **Organism Components**
  - `NavigationHeader` - Responsive site navigation with mobile menu
  - `ContactForm` - Full contact form with validation and email integration
  - `TestimonialSection` - Social proof display with ratings
  - `TrustBadges` - Credibility indicators and certifications

### Changed
- Button stories updated to use `loading` prop instead of `isLoading`
- Updated README with testing documentation and current progress
- Enhanced project structure with comprehensive component library

### Fixed
- Button test assertions to match actual implementation
- Storybook addon compatibility issues (v9 vs v8)

### Technical Details
- Integrated `@storybook/addon-vitest` for test visualization
- Set up `composeStories` pattern for using stories in tests
- Configured test coverage reporting with v8 provider
- Added proper TypeScript types for testing utilities

## [1.1.0] - 2025-08-30

### Session 2 - Brand Update & Core Components

### Added
- HeroSection component with variants and trust indicators
- FooterSection component with newsletter and social links
- Additional atom components (Badge, Switch, Tooltip, Radio, Label)
- Privacy and Terms pages

### Changed
- Updated all branding from "TechStartup" to "CRUDgames"
- Refocused messaging on game development services
- Fixed component extraction bugs

## [1.0.0] - 2025-08-29

### Session 1 - Initial Setup

### Added
- Next.js 15.5.2 project setup with App Router
- Tailwind CSS 4 configuration
- Storybook 9.1.3 integration
- Multi-step IntakeForm with validation
- CalendlyScheduler component
- Basic atom components (Button, Input, Alert, Textarea, Select, Checkbox, Spinner)
- React Hook Form + Zod validation
- Web3Forms email integration setup
- Thank you page with form data passing

### Project Foundation
- TypeScript strict mode configuration
- Static export setup for GitHub Pages
- Comprehensive PRP documentation (44 component specs)
- CLAUDE.md AI development guidelines

---

## Version History

- **v1.2.1** (Current) - Build fixes for GitHub Pages deployment
- **v1.2.0** - Testing infrastructure and expanded component library
- **v1.1.0** - Brand update and core page components
- **v1.0.0** - Initial release with form and scheduling functionality