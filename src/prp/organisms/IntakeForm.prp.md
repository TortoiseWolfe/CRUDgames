# IntakeForm Component PRP

## Component Overview

### Purpose
A comprehensive multi-step intake form that collects user information, validates input, sends email notifications, and seamlessly transitions to Calendly scheduling. This is the primary conversion component for the application.

### Business Value
- **Problem it solves**: Streamlines lead capture and appointment scheduling in one flow
- **Target users**: Prospective clients/customers seeking consultations
- **Success metrics**: 
  - Form completion rate > 60%
  - Form-to-meeting conversion > 65%
  - Average time to complete < 3 minutes
  - Error rate < 5%

### User Story
```
As a prospective client
I want to provide my information and schedule a consultation
So that I can discuss my needs with the service provider
```

## Technical Specifications

### Component Properties
```typescript
interface IntakeFormProps {
  // Configuration
  formId?: string;
  emailServiceConfig: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
  calendlyConfig: {
    url: string;
    prefillEnabled?: boolean;
    hideEventTypeDetails?: boolean;
    hideGuestInfo?: boolean;
  };
  
  // Multi-step configuration
  steps?: FormStep[];
  initialStep?: number;
  allowStepNavigation?: boolean;
  
  // Validation
  validationSchema?: ZodSchema;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  
  // Behavior
  onSubmitSuccess?: (data: FormData) => void;
  onSubmitError?: (error: Error) => void;
  onSchedulingComplete?: (event: CalendlyEvent) => void;
  onStepChange?: (step: number) => void;
  
  // Security
  enableHoneypot?: boolean;
  enableRateLimit?: boolean;
  rateLimitConfig?: {
    maxAttempts: number;
    windowMs: number;
  };
  
  // Analytics
  trackingEnabled?: boolean;
  gtmConfig?: {
    formName: string;
    formCategory: string;
  };
  
  // Appearance
  theme?: 'light' | 'dark' | 'auto';
  compact?: boolean;
  className?: string;
}

interface FormStep {
  id: string;
  title: string;
  fields: FormFieldConfig[];
  validation?: ZodSchema;
}

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Company Information
  company?: string;
  jobTitle?: string;
  companySize?: string;
  industry?: string;
  
  // Project Details
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  
  // Hidden fields
  source?: string;
  campaign?: string;
  referrer?: string;
  
  // Honeypot (should be empty)
  website?: string;
}
```

### State Management
```typescript
// Internal state structure
interface FormState {
  currentStep: number;
  formData: Partial<FormData>;
  touchedFields: Set<string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValidating: boolean;
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
  schedulingStatus: 'idle' | 'active' | 'completed';
}
```

### Form Flow
```
1. Initial State
   ├── Load form configuration
   ├── Initialize analytics
   └── Set up rate limiting

2. Information Collection (Step 1)
   ├── Personal details
   ├── Real-time validation
   └── Progress indication

3. Project Details (Step 2)
   ├── Requirements gathering
   ├── Budget/timeline
   └── Additional context

4. Review & Submit (Step 3)
   ├── Summary display
   ├── Edit capability
   ├── Honeypot check
   ├── Rate limit check
   └── Email submission

5. Calendly Integration (Step 4)
   ├── Prefill from form data
   ├── Embedded scheduler
   └── Confirmation handling

6. Success State
   ├── Confirmation message
   ├── Next steps
   └── Analytics tracking
```

## Design Requirements

### Visual Hierarchy
```
┌─────────────────────────────────┐
│  Progress Indicator (Steps 1-4)  │
├─────────────────────────────────┤
│  Step Title & Description        │
├─────────────────────────────────┤
│                                  │
│  Form Fields                     │
│  - Grouped logically             │
│  - Clear labels                  │
│  - Inline validation             │
│                                  │
├─────────────────────────────────┤
│  Helper Text / Tips              │
├─────────────────────────────────┤
│  [Previous]          [Next/Submit]│
└─────────────────────────────────┘
```

### Responsive Behavior
- **Desktop**: Two-column layout for related fields
- **Tablet**: Single column with larger touch targets
- **Mobile**: Full-width fields, sticky progress bar

### Animation & Transitions
```css
/* Step transitions */
--transition-duration: 300ms;
--transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

/* Slide animations */
.step-enter { transform: translateX(100%); }
.step-enter-active { transform: translateX(0); }
.step-exit { transform: translateX(0); }
.step-exit-active { transform: translateX(-100%); }
```

## Validation Requirements

### Zod Schema
```typescript
const intakeFormSchema = z.object({
  // Personal Information
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .refine(email => !email.includes('+'), 'Plus addressing not allowed'),
  
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  
  // Company Information (optional)
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  
  // Project Details
  projectType: z.enum(['consulting', 'development', 'design', 'other']),
  budget: z.enum(['<10k', '10k-50k', '50k-100k', '100k+']).optional(),
  timeline: z.enum(['asap', '1-3months', '3-6months', '6months+']).optional(),
  
  message: z.string()
    .min(10, 'Please provide at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  // Honeypot - should be empty
  website: z.string().max(0)
});
```

### Validation Behavior
- Real-time validation on blur
- Inline error messages
- Prevent progression with errors
- Clear error on valid input
- Maintain errors during step navigation

## Security Requirements

### Spam Prevention
```typescript
// Honeypot Implementation
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  style={{
    position: 'absolute',
    left: '-9999px',
    width: '1px',
    height: '1px'
  }}
  aria-hidden="true"
/>

// Rate Limiting
const checkRateLimit = () => {
  const attempts = getRateLimitAttempts(identifier);
  if (attempts >= maxAttempts) {
    throw new Error('Too many attempts. Please try again later.');
  }
  incrementRateLimitAttempts(identifier);
};
```

### Data Sanitization
- XSS prevention on all inputs
- SQL injection prevention
- Email validation beyond format
- Phone number normalization

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- All form fields labeled
- Error messages linked via aria-describedby
- Required fields marked with aria-required
- Progress indicator keyboard navigable
- Focus management between steps
- Screen reader announcements for step changes

### Keyboard Navigation
- `Tab` - Navigate between fields
- `Shift+Tab` - Navigate backwards
- `Enter` - Submit form (when on submit button)
- `Space` - Toggle checkboxes/radios
- `Arrow keys` - Navigate radio groups/selects
- `Escape` - Close dropdowns

### Screen Reader Support
```html
<!-- Step announcement -->
<div role="status" aria-live="polite" aria-atomic="true">
  Step 2 of 4: Project Details
</div>

<!-- Field with error -->
<div>
  <label for="email" id="email-label">
    Email Address
    <span aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    aria-labelledby="email-label"
    aria-describedby="email-error email-helper"
    aria-invalid="true"
    aria-required="true"
  />
  <span id="email-helper">We'll use this to send confirmation</span>
  <span id="email-error" role="alert">
    Please enter a valid email address
  </span>
</div>
```

## Testing Requirements

### Unit Tests
```typescript
describe('IntakeForm', () => {
  describe('Form Validation', () => {
    it('validates required fields');
    it('shows inline errors on blur');
    it('prevents submission with errors');
    it('clears errors on valid input');
  });
  
  describe('Multi-step Navigation', () => {
    it('progresses through steps');
    it('prevents skipping with errors');
    it('allows backward navigation');
    it('maintains data between steps');
  });
  
  describe('Security Features', () => {
    it('honeypot prevents bot submission');
    it('rate limiting blocks excessive attempts');
    it('sanitizes user input');
  });
  
  describe('Email Integration', () => {
    it('sends email on valid submission');
    it('handles email service errors');
    it('includes all form data');
  });
  
  describe('Calendly Integration', () => {
    it('prefills user data');
    it('handles scheduling completion');
    it('shows success confirmation');
  });
});
```

### E2E Test Scenarios
1. **Happy Path**: Complete form → Submit → Schedule → Success
2. **Validation Path**: Invalid data → Errors → Correction → Success
3. **Navigation Path**: Forward → Back → Edit → Forward → Submit
4. **Error Recovery**: Network error → Retry → Success
5. **Abandonment Recovery**: Partial fill → Leave → Return → Continue

### Performance Tests
- Form loads in < 1 second
- Step transitions < 300ms
- No layout shift during validation
- Email submission < 2 seconds
- Calendly loads < 2 seconds

## Performance Requirements

### Metrics
- **First Input Delay**: < 100ms
- **Form Interaction Time**: < 50ms per field
- **Validation Feedback**: < 300ms
- **Step Transition**: < 300ms
- **Total Bundle Size**: < 50KB gzipped

### Optimization Strategies
```typescript
// Lazy load Calendly only when needed
const CalendlyScheduler = lazy(() => import('./CalendlyScheduler'));

// Debounce validation
const debouncedValidate = useMemo(
  () => debounce(validate, 300),
  [validate]
);

// Memoize expensive computations
const progressPercentage = useMemo(
  () => (currentStep / totalSteps) * 100,
  [currentStep, totalSteps]
);
```

## Analytics Requirements

### Events to Track
```typescript
// Google Analytics 4 Events
const trackingEvents = {
  form_start: {
    form_name: 'intake_form',
    form_id: formId,
    entry_point: source
  },
  
  form_step_completed: {
    form_name: 'intake_form',
    step_number: currentStep,
    step_name: stepName,
    time_on_step: duration
  },
  
  form_field_interaction: {
    form_name: 'intake_form',
    field_name: fieldName,
    interaction_type: 'focus' | 'blur' | 'change'
  },
  
  form_validation_error: {
    form_name: 'intake_form',
    field_name: fieldName,
    error_message: errorMessage
  },
  
  form_submission: {
    form_name: 'intake_form',
    submission_time: totalDuration,
    field_count: filledFields
  },
  
  calendly_scheduling_started: {
    form_name: 'intake_form',
    user_email: hashedEmail
  },
  
  calendly_scheduling_completed: {
    form_name: 'intake_form',
    event_type: eventType,
    scheduled_date: scheduledDate
  }
};
```

## Error Handling

### Error States
```typescript
type ErrorType = 
  | 'VALIDATION_ERROR'
  | 'NETWORK_ERROR'
  | 'RATE_LIMIT_ERROR'
  | 'EMAIL_SERVICE_ERROR'
  | 'CALENDLY_LOAD_ERROR'
  | 'UNKNOWN_ERROR';

interface ErrorState {
  type: ErrorType;
  message: string;
  field?: string;
  retryable?: boolean;
  action?: () => void;
}
```

### User-Friendly Error Messages
```typescript
const errorMessages = {
  VALIDATION_ERROR: 'Please check the highlighted fields and try again.',
  NETWORK_ERROR: 'Connection issue. Please check your internet and try again.',
  RATE_LIMIT_ERROR: 'Too many attempts. Please wait a few minutes and try again.',
  EMAIL_SERVICE_ERROR: 'Unable to send confirmation. Please try again or contact support.',
  CALENDLY_LOAD_ERROR: 'Scheduling system unavailable. Please refresh and try again.',
  UNKNOWN_ERROR: 'Something went wrong. Please try again or contact support.'
};
```

## Integration Requirements

### Email Service Integration (Multiple Options)

The form supports multiple email providers. Choose based on your requirements:
- **Web3Forms**: Privacy-focused, no account needed (recommended)
- **EmailJS**: Template-based, client-side only
- **Resend**: React components, best DX
- **SendGrid**: Enterprise features

See `src/prp/system/EmailProviders.prp.md` for detailed comparison.

#### Option 1: Web3Forms Integration (Recommended)
```typescript
const sendIntakeEmail = async (formData: FormData) => {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        subject: `New Intake Form Submission from ${formData.firstName} ${formData.lastName}`,
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not provided',
        message: formData.message,
        project_type: formData.projectType,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        submitted_at: new Date().toISOString(),
        // Web3Forms specific features
        botcheck: true,  // Spam protection
        replyto: formData.email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error('EMAIL_SERVICE_ERROR');
  }
};
```

#### Option 2: EmailJS Integration
```typescript
const sendIntakeEmail = async (formData: FormData) => {
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        to_email: 'admin@company.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not provided',
        message: formData.message,
        project_type: formData.projectType,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        submitted_at: new Date().toISOString()
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error('EMAIL_SERVICE_ERROR');
  }
};
```

### Calendly Integration
```typescript
const calendlyConfig = {
  url: calendlyConfig.url,
  pageSettings: {
    backgroundColor: 'ffffff',
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: '00a2ff',
    textColor: '4d5055'
  },
  prefill: {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    name: `${formData.firstName} ${formData.lastName}`,
    customAnswers: {
      a1: formData.phone,
      a2: formData.company,
      a3: formData.projectType
    }
  },
  utm: {
    utmCampaign: 'intake-form',
    utmSource: 'website',
    utmMedium: 'form',
    utmContent: formData.source
  }
};
```

## Acceptance Criteria

### Functional Requirements
- [ ] All form fields render and function correctly
- [ ] Multi-step navigation works smoothly
- [ ] Validation prevents invalid submissions
- [ ] Email sends successfully with all data
- [ ] Calendly integration prefills correctly
- [ ] Success confirmation displays
- [ ] Error states handle gracefully

### Quality Gates
- [ ] 80% unit test coverage
- [ ] All E2E scenarios pass
- [ ] Lighthouse score > 90
- [ ] WCAG 2.1 AA compliant
- [ ] No console errors or warnings
- [ ] Form completion rate > 60%
- [ ] Average completion time < 3 minutes

### Definition of Done
- [ ] Code complete with all features
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Security review completed
- [ ] Analytics tracking verified
- [ ] Deployed to staging
- [ ] UAT sign-off received

## Future Enhancements
- Save and resume functionality
- Progressive disclosure for complex fields
- Conditional field display
- File upload capability
- Multi-language support
- A/B testing variations
- Smart field suggestions
- Integration with CRM systems

---
**Last Updated**: 2024-01-15
**Author**: Development Team
**Review Status**: Approved
**Version**: 1.0.0