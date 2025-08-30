# 🚀 Next.js Funnel Conversion Template

> Production-ready Next.js template for high-converting landing pages with intake forms, Calendly integration, and comprehensive component library. Optimized for AI-assisted development with detailed Product Requirements Prompts (PRPs).

## ✨ Features

- **🎯 High-Converting Intake Form** - Multi-step form with validation, progress tracking, and email integration
- **📅 Calendly Integration** - Seamless appointment scheduling with data prefill
- **📚 Component Library** - 40+ documented components with Storybook
- **🤖 AI-Optimized** - Comprehensive PRPs for consistent AI code generation  
- **♿ Accessibility First** - WCAG 2.1 AA compliant with full keyboard navigation
- **📊 Analytics Ready** - Google Analytics 4 integration with conversion tracking
- **🔒 Security Built-in** - Rate limiting, honeypot fields, input sanitization
- **📱 Fully Responsive** - Mobile-first design with all breakpoints covered
- **⚡ Performance Optimized** - Static export, code splitting, Core Web Vitals optimized
- **🧪 Comprehensive Testing** - Unit, integration, E2E, and accessibility tests

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [PRP Documentation](#prp-documentation)
- [Development](#development)
- [Components](#components)
- [Forms & Validation](#forms--validation)
- [Email Integration](#email-integration)
- [Calendly Setup](#calendly-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Performance](#performance)
- [Security](#security)
- [Contributing](#contributing)

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x LTS and npm 10+
- Git
- EmailJS account (for email notifications)
- Calendly account (for scheduling)
- GitHub account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-funnel-template.git
   cd nextjs-funnel-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:
   ```env
   # EmailJS Configuration
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id  
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

   # Calendly Configuration
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourname/meeting

   # Google Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

   # Optional: Server-side email (Resend)
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Start Storybook**
   ```bash
   npm run storybook
   ```
   Open [http://localhost:6006](http://localhost:6006)

## 📁 Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── thank-you/          # Confirmation page
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── atoms/              # Basic components (12 components)
│   │   ├── molecules/          # Compound components (10 components)
│   │   ├── organisms/          # Complex components (10 components)
│   │   └── templates/          # Page templates (5 templates)
│   ├── lib/
│   │   ├── email/              # Email service integration
│   │   ├── validation/         # Zod schemas
│   │   ├── utils/              # Utilities
│   │   └── hooks/              # Custom hooks
│   ├── prp/                    # Product Requirements Prompts
│   │   ├── MASTER_TEMPLATE.md  # Base PRP template
│   │   ├── atoms/              # Atomic component specs
│   │   ├── molecules/          # Molecular component specs
│   │   ├── organisms/          # Organism component specs
│   │   ├── templates/          # Page template specs
│   │   └── system/             # System-wide specs
│   ├── stories/                # Storybook stories
│   └── tests/                  # Test files
├── public/                     # Static assets
├── .github/
│   └── workflows/              # GitHub Actions
├── CLAUDE.md                   # AI context documentation
├── package.json
└── README.md
```

## 📚 PRP Documentation

This template includes **43 comprehensive Product Requirements Prompts (PRPs)** that define every component and system in detail:

### Component PRPs

#### Atomic Components (12)
- `Button.prp.md` - All button variants and states
- `Input.prp.md` - Text input with validation
- `Label.prp.md` - Accessible form labels
- `Alert.prp.md` - Notification messages
- `Textarea.prp.md` - Multi-line text input
- `Select.prp.md` - Dropdown selection
- `Checkbox.prp.md` - Binary selection
- `Radio.prp.md` - Single choice selection
- `Switch.prp.md` - Toggle switches
- `Badge.prp.md` - Status indicators
- `Spinner.prp.md` - Loading indicators
- `Tooltip.prp.md` - Contextual help

#### Molecular Components (10)
- `FormField.prp.md` - Complete form field unit
- `ProgressIndicator.prp.md` - Multi-step progress
- `ErrorBoundary.prp.md` - Error handling
- `LoadingState.prp.md` - Loading displays
- `ValidationMessage.prp.md` - Form feedback
- `StepIndicator.prp.md` - Step status
- `HoneypotField.prp.md` - Spam prevention
- `RateLimiter.prp.md` - Submission limits

#### Organism Components (10)
- `IntakeForm.prp.md` - Main conversion form (comprehensive)
- `CalendlyScheduler.prp.md` - Appointment booking
- `MultiStepForm.prp.md` - Form navigation
- `HeroSection.prp.md` - Landing hero
- `ConversionMetrics.prp.md` - Social proof
- `TrustBadges.prp.md` - Credibility indicators
- `TestimonialSection.prp.md` - Customer reviews
- `NavigationHeader.prp.md` - Site navigation
- `FooterSection.prp.md` - Page footer
- `ContactForm.prp.md` - Simple contact

#### Page Templates (5)
- `LandingPage.prp.md` - Main conversion page
- `ThankYouPage.prp.md` - Post-submission
- `ErrorPage.prp.md` - Error handling
- `SchedulingPage.prp.md` - Booking page
- `ConfirmationPage.prp.md` - Appointment confirmed

#### System PRPs (6)
- `DesignSystem.prp.md` - Visual standards
- `AccessibilityStandards.prp.md` - WCAG compliance
- `SecurityRequirements.prp.md` - Security protocols
- `PerformanceTargets.prp.md` - Performance goals
- `TestingStrategy.prp.md` - Test approach
- `DeploymentPipeline.prp.md` - CI/CD setup

### Using PRPs for Development

1. **Before implementing any component**, read its PRP:
   ```bash
   cat src/prp/organisms/IntakeForm.prp.md
   ```

2. **Follow the specifications exactly** - props, behavior, styling

3. **Implement all acceptance criteria** before marking complete

4. **Use PRPs with AI assistants** for consistent code generation

## 💻 Development

### Available Scripts

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run start        # Serve production build
npm run storybook    # Start Storybook
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run lint         # Lint code
npm run format       # Format with Prettier
npm run type-check   # Check TypeScript
npm run analyze      # Analyze bundle size
```

### Component Development Workflow

1. **Read the PRP** for the component you're building
2. **Create component structure**:
   ```bash
   mkdir src/components/atoms/NewComponent
   touch src/components/atoms/NewComponent/{NewComponent.tsx,NewComponent.stories.tsx,NewComponent.test.tsx,index.ts}
   ```
3. **Implement the component** following the PRP specs
4. **Create Storybook stories** for all variants
5. **Write tests** for functionality and accessibility
6. **Document usage** in the component README

## 🧩 Components

### Using Components

```tsx
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { IntakeForm } from '@/components/organisms/IntakeForm';

// Atomic component
<Button variant="primary" size="lg" onClick={handleClick}>
  Get Started
</Button>

// Form field
<Input
  label="Email"
  type="email"
  required
  error={errors.email}
  {...register('email')}
/>

// Complex organism
<IntakeForm
  emailServiceConfig={{
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  }}
  calendlyConfig={{
    url: process.env.NEXT_PUBLIC_CALENDLY_URL,
  }}
  onSubmitSuccess={handleSuccess}
/>
```

## 📝 Forms & Validation

### React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema
const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short'),
});

type FormData = z.infer<typeof schema>;

// Use in component
const form = useForm<FormData>({
  resolver: zodResolver(schema),
});

const onSubmit = async (data: FormData) => {
  // Handle submission
};
```

## 📧 Email Integration

Multiple email providers are supported. Choose based on your needs:
- **Web3Forms** - Privacy-focused, no account needed (recommended)
- **EmailJS** - Template-based, client-side only
- **Resend** - React components, best DX
- **SendGrid** - Enterprise features

See `src/prp/system/EmailProviders.prp.md` for detailed comparison.

### Web3Forms Setup (Recommended - 5 min setup)

1. **Get access key** at [web3forms.com](https://web3forms.com)
   - No account required
   - Just enter your email to receive the key

2. **Add to environment**:
   ```env
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key
   ```

3. **Use in component**:
   ```typescript
   const response = await fetch('https://api.web3forms.com/submit', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
       ...formData
     })
   });
   ```

### EmailJS Setup (Alternative)

1. **Create EmailJS account** at [emailjs.com](https://www.emailjs.com)

2. **Create email service**:
   - Go to Email Services → Add New Service
   - Choose your email provider
   - Follow connection steps

3. **Create email template**:
   ```
   Subject: New Contact from {{from_name}}
   
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Company: {{company}}
   Message: {{message}}
   ```

4. **Get credentials**:
   - Service ID from Email Services
   - Template ID from Email Templates
   - Public Key from Account → API Keys

### Alternative: Resend (Server-side)

```typescript
// app/api/send-email/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  
  const { data, error } = await resend.emails.send({
    from: 'contact@yourdomain.com',
    to: 'admin@yourdomain.com',
    subject: 'New Contact Form Submission',
    html: generateEmailHTML(body),
  });

  return NextResponse.json({ data, error });
}
```

## 📅 Calendly Setup

1. **Get your Calendly URL**:
   - Log into Calendly
   - Go to Event Types
   - Copy the link for your meeting type

2. **Configure in environment**:
   ```env
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourname/30min
   ```

3. **Use in component**:
   ```tsx
   import { CalendlyScheduler } from '@/components/organisms/CalendlyScheduler';

   <CalendlyScheduler
     url={process.env.NEXT_PUBLIC_CALENDLY_URL}
     prefillData={{
       name: formData.name,
       email: formData.email,
     }}
     onScheduled={handleSchedulingComplete}
   />
   ```

## 🧪 Testing

### Running Tests

```bash
npm run test          # Unit tests with Vitest
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
npm run test:e2e      # E2E with Playwright
npm run test:a11y     # Accessibility tests
```

### Writing Tests

```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is accessible', () => {
    const { container } = render(<Button>Accessible</Button>);
    expect(container).toBeAccessible();
  });
});
```

## 🚀 Deployment

### GitHub Pages Deployment

1. **Update repository name** in `next.config.js`:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/your-repo-name',
     assetPrefix: '/your-repo-name/',
   };
   ```

2. **Configure GitHub repository**:
   - Go to Settings → Pages
   - Source: GitHub Actions

3. **Add secrets** in repository settings:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   - `CALENDLY_URL`
   - `GA_ID`

4. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

5. **Monitor deployment**:
   - Check Actions tab for build status
   - Site available at: `https://yourusername.github.io/your-repo-name`

### Alternative Deployment Options

#### Vercel
```bash
npx vercel
```

#### Netlify
```bash
npx netlify deploy
```

#### Self-hosted
```bash
npm run build
# Upload 'out' directory to your server
```

## ⚡ Performance

### Optimization Checklist

- [x] Static export for fastest loading
- [x] Image optimization with next/image
- [x] Font subsetting and preloading
- [x] Code splitting with dynamic imports
- [x] Minification and compression
- [x] CDN for static assets
- [x] Service worker caching
- [x] Lazy loading components

### Monitoring

```typescript
// Track Core Web Vitals
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

## 🔒 Security

### Security Features

- **Input Validation**: Zod schemas on client and server
- **XSS Prevention**: Content sanitization with DOMPurify
- **Rate Limiting**: Client-side submission limits
- **Honeypot Fields**: Invisible spam traps
- **CSRF Protection**: Token validation
- **Environment Variables**: Secure credential storage
- **Content Security Policy**: Headers configuration

### Security Checklist

- [ ] All inputs validated with Zod
- [ ] API keys in environment variables
- [ ] Rate limiting implemented
- [ ] Honeypot fields added
- [ ] Error messages sanitized
- [ ] Dependencies updated regularly
- [ ] Security headers configured
- [ ] HTTPS enforced

## 🤝 Contributing

### Development Process

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Read relevant PRPs** before implementing
4. **Follow coding standards** in CLAUDE.md
5. **Write tests** for new features
6. **Update documentation** as needed
7. **Commit changes**: `git commit -m 'Add amazing feature'`
8. **Push to branch**: `git push origin feature/amazing-feature`
9. **Open Pull Request** with description

### Code Quality Standards

- TypeScript strict mode
- 80% test coverage minimum
- WCAG 2.1 AA compliance
- Lighthouse score > 90
- No console.logs in production
- All PRPs followed

## 📊 Analytics & Tracking

### Setting Up Google Analytics 4

1. **Create GA4 property** at [analytics.google.com](https://analytics.google.com)

2. **Get Measurement ID** (starts with G-)

3. **Add to environment**:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Track custom events**:
   ```typescript
   gtag('event', 'form_submission', {
     form_name: 'intake_form',
     form_location: 'landing_page',
   });
   ```

### Key Metrics to Track

- Form start/completion rates
- Field-level drop-off
- Time to complete
- Calendly scheduling rate
- Error frequency
- Page performance

## 🛠️ Troubleshooting

### Common Issues

#### Build Fails
```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

#### Styles Not Applying
```bash
# Check Tailwind config
npm run dev
# Check browser console for errors
```

#### EmailJS Not Working
- Verify service ID, template ID, and public key
- Check EmailJS dashboard for quota
- Test with EmailJS playground

#### Calendly Not Loading
- Verify Calendly URL is correct
- Check for ad blockers
- Test in incognito mode

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [Tailwind CSS](https://tailwindcss.com) - Utility CSS
- [React Hook Form](https://react-hook-form.com) - Form library
- [EmailJS](https://emailjs.com) - Email service
- [Calendly](https://calendly.com) - Scheduling service
- [Storybook](https://storybook.js.org) - Component development

## 📞 Support

- **Documentation**: Check PRPs in `src/prp/`
- **Context**: Read `CLAUDE.md` for development guidelines
- **Issues**: [GitHub Issues](https://github.com/yourusername/nextjs-funnel-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/nextjs-funnel-template/discussions)

---

Built with ❤️ for high-converting landing pages and AI-assisted development