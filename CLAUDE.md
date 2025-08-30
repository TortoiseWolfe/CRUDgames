# Claude AI Context - Next.js Funnel Conversion Template

## Project Overview
Production-ready Next.js template for high-converting funnel pages with intake forms, Calendly integration, and comprehensive component library. Optimized for AI-assisted development with detailed PRPs (Product Requirements Prompts).

## Tech Stack
- **Framework**: Next.js 15.5.2 with App Router (Static Export)
- **Language**: TypeScript 5.9.2 (strict mode)
- **UI Library**: React 19.1.1 + shadcn/ui
- **Styling**: Tailwind CSS 4.1.12
- **Forms**: React Hook Form 7.62.0 + Zod 4.1.5 validation
- **Email**: Web3Forms / EmailJS 4.4.1 / Resend (multiple providers supported)
- **Scheduling**: react-calendly 4.4.0
- **Component Dev**: Storybook 9.1.3
- **Testing**: Vitest 3.2.4 + React Testing Library 16.1.0
- **Deployment**: GitHub Pages (static export)
- **Analytics**: Google Analytics 4
- **Monitoring**: Sentry (errors), Vercel Analytics (performance)
- **Node.js**: 22.x LTS (recommended)

## Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── thank-you/         # Thank you page
│   ├── error/             # Error page
│   └── api/               # API routes (optional)
├── components/
│   ├── atoms/             # Basic components (Button, Input, etc.)
│   ├── molecules/         # Compound components (FormField, etc.)
│   ├── organisms/         # Complex components (IntakeForm, etc.)
│   └── templates/         # Page templates
├── lib/
│   ├── email/             # Email service integration
│   ├── validation/        # Zod schemas
│   ├── utils/             # Utility functions
│   └── hooks/             # Custom React hooks
├── prp/                   # Product Requirements Prompts
│   ├── atoms/             # Atomic component specs
│   ├── molecules/         # Molecular component specs
│   ├── organisms/         # Organism component specs
│   ├── templates/         # Page template specs
│   └── system/            # System-wide specs
├── stories/               # Storybook stories
└── tests/                 # Test files
```

## Development Commands
```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Build for production (static export)
npm run start        # Serve production build
npm run storybook    # Start Storybook (localhost:6006)
npm run test         # Run tests with Vitest
npm run test:e2e     # Run E2E tests with Playwright
npm run lint         # Lint with ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format with Prettier
npm run analyze      # Bundle size analysis
```

## Component Development Guidelines

### File Structure Pattern
```
components/ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit tests
├── ComponentName.module.css   # CSS modules (if needed)
├── index.ts                   # Public exports
└── README.md                  # Component documentation
```

### Component Template
```typescript
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  // Add specific props with JSDoc comments
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('base-styles', className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Import Order Convention
1. React/Next.js imports
2. Third-party libraries
3. Local components
4. Utilities/hooks
5. Types/interfaces
6. Styles

## Form Implementation Pattern

### React Hook Form + Zod
```typescript
const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name required'),
});

type FormData = z.infer<typeof schema>;

const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { email: '', name: '' }
});
```

### Security Measures
- **Honeypot fields**: Hidden fields to catch bots
- **Rate limiting**: Client-side submission limits
- **Input sanitization**: XSS prevention
- **CSRF protection**: Token validation
- **Environment variables**: Never expose API keys

## State Management Approach
- **Local state**: useState for component state
- **Form state**: React Hook Form for forms
- **Global state**: Context API for app-wide state
- **Server state**: React Query for API data
- **URL state**: Next.js router for navigation

## Styling Conventions

### Tailwind CSS Classes
```tsx
// Use cn() utility for conditional classes
className={cn(
  'base-class',
  variant === 'primary' && 'primary-styles',
  disabled && 'disabled-styles',
  className // Allow override
)}
```

### Design Tokens (CSS Variables)
```css
:root {
  /* Colors */
  --primary: hsl(222, 100%, 40%);
  --secondary: hsl(220, 9%, 46%);
  --destructive: hsl(0, 84%, 60%);
  
  /* Spacing */
  --space-unit: 8px;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

## Testing Requirements

### Test Coverage Goals
- Unit tests: 80% minimum
- Integration tests: Critical paths
- E2E tests: User journeys
- Accessibility tests: All components
- Visual regression: Key components

### Test File Pattern
```typescript
describe('ComponentName', () => {
  it('renders with default props');
  it('handles user interaction');
  it('displays error state');
  it('is accessible');
  it('matches snapshot');
});
```

## Accessibility Standards

### WCAG 2.1 AA Requirements
- Color contrast: 4.5:1 minimum
- Keyboard navigation: Full support
- Screen readers: Proper ARIA labels
- Focus management: Visible indicators
- Touch targets: 44x44px minimum
- Error messages: Clear and linked

### Implementation Checklist
- [ ] Semantic HTML elements
- [ ] ARIA labels and descriptions
- [ ] Keyboard event handlers
- [ ] Focus trap for modals
- [ ] Skip navigation links
- [ ] Alt text for images

## Performance Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.0s
- **TTI** (Time to Interactive): < 3.5s

### Optimization Strategies
- Static export for GitHub Pages
- Image optimization with next/image
- Code splitting with dynamic imports
- Font subsetting and preloading
- CSS/JS minification
- CDN for static assets

## Security Guidelines

### Form Security
```typescript
// Never trust client input
const sanitizedInput = DOMPurify.sanitize(userInput);

// Rate limiting
if (!checkRateLimit(userId)) {
  throw new Error('Too many attempts');
}

// Validate server-side
const validated = await serverValidate(data);
```

### Environment Variables
```bash
# .env.local (never commit)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=xxx  # Public keys only
EMAILJS_PRIVATE_KEY=xxx              # Never expose
```

## Deployment Configuration

### GitHub Pages Setup
```javascript
// next.config.js
module.exports = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/repo-name' : '',
  images: { unoptimized: true },
  trailingSlash: true,
};
```

### GitHub Actions Workflow
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
      - uses: actions/deploy-pages@v4
```

## Analytics Implementation

### Google Analytics 4
```typescript
// Track custom events
gtag('event', 'form_submission', {
  form_name: 'intake_form',
  form_location: 'landing_page',
  submission_time: Date.now()
});
```

### Conversion Tracking
- Form starts and completions
- Field-level interactions
- Error occurrences
- CTA clicks
- Page scroll depth
- Time on page

## Error Handling Pattern

### Error Boundary
```typescript
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
    this.setState({ hasError: true });
  }
}
```

### User-Friendly Messages
```typescript
const errorMessages = {
  NETWORK_ERROR: 'Connection issue. Please check your internet.',
  VALIDATION_ERROR: 'Please check the highlighted fields.',
  RATE_LIMIT: 'Too many attempts. Please wait and try again.',
};
```

## Code Quality Standards

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### ESLint Rules
- No any types
- Prefer const
- No console logs in production
- Exhaustive deps for hooks
- Accessibility rules enabled

## PRP Usage Guide

### Finding Component Specs
```
src/prp/
├── atoms/          # Basic components (Button, Input, etc.)
├── molecules/      # Compound components (FormField, etc.)
├── organisms/      # Complex components (IntakeForm, etc.)
├── templates/      # Page layouts
└── system/         # Design system, accessibility, etc.
```

### Using PRPs for Development
1. Read the relevant PRP before implementing
2. Follow the technical specifications exactly
3. Implement all acceptance criteria
4. Reference the testing requirements
5. Check accessibility requirements

## Common Patterns

### Loading States
```typescript
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
return <Content data={data} />;
```

### Form Submission
```typescript
const onSubmit = async (data: FormData) => {
  try {
    setIsSubmitting(true);
    await submitForm(data);
    router.push('/thank-you');
  } catch (error) {
    setError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## Do's and Don'ts

### Do's ✅
- Use TypeScript strict mode
- Write tests for new components
- Follow accessibility guidelines
- Use semantic HTML
- Implement proper error handling
- Optimize for performance
- Document complex logic
- Use PRPs as reference

### Don'ts ❌
- Skip accessibility testing
- Expose API keys in code
- Use inline styles
- Ignore TypeScript errors
- Skip form validation
- Use any type
- Commit console.logs
- Deploy without testing

## Troubleshooting

### Common Issues
1. **Build fails**: Check Node version (18+)
2. **Styles not applying**: Check Tailwind config
3. **Forms not submitting**: Check validation and network
4. **Calendly not loading**: Check URL and permissions
5. **Deploy fails**: Check GitHub Pages settings

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Storybook](https://storybook.js.org/docs)

### Internal Docs
- Component PRPs: `src/prp/`
- Design System: `src/prp/system/DesignSystem.prp.md`
- Testing Strategy: `src/prp/system/TestingStrategy.prp.md`
- Deployment: `src/prp/system/DeploymentPipeline.prp.md`

## Support

For questions or issues:
1. Check the relevant PRP documentation
2. Review this CLAUDE.md file
3. Check GitHub issues
4. Contact the development team

---
**Version**: 1.0.0
**Last Updated**: 2025-08-30
**Maintained By**: Development Team