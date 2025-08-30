# CalendlyScheduler Component PRP

## Component Overview

### Purpose
An embedded Calendly scheduling component that seamlessly integrates with the intake form flow, prefills user data, and handles appointment booking with proper event tracking and confirmation.

### Business Value
- **Problem it solves**: Eliminates back-and-forth scheduling emails
- **Target users**: Prospects ready to book consultations
- **Success metrics**: 
  - Scheduling completion rate > 70%
  - Time to schedule < 2 minutes
  - No-show rate < 15%

### User Story
```
As a qualified lead
I want to immediately schedule a consultation
So that I can move forward while my interest is high
```

## Technical Specifications

### Component Properties
```typescript
interface CalendlySchedulerProps {
  // Required configuration
  url: string;  // Calendly event type URL
  
  // Prefill data
  prefillData?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    phone?: string;
    company?: string;
    customAnswers?: Record<string, string>;
  };
  
  // Display options
  height?: number | string;
  hideEventTypeDetails?: boolean;
  hideLandingPageDetails?: boolean;
  hideGdprBanner?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  
  // Behavior
  autoLoad?: boolean;
  iframeTitle?: string;
  
  // UTM Parameters
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
  
  // Callbacks
  onScheduled?: (event: CalendlyEvent) => void;
  onEventTypeViewed?: () => void;
  onProfilePageViewed?: () => void;
  onDateAndTimeSelected?: () => void;
  onLoadError?: (error: Error) => void;
  
  // Analytics
  trackingEnabled?: boolean;
  gaTrackingId?: string;
}

interface CalendlyEvent {
  event: string;
  payload?: {
    invitee: {
      email: string;
      name: string;
    };
    event: {
      uri: string;
      startTime: string;
      endTime: string;
    };
  };
}
```

## Implementation Patterns

### React Calendly Integration
```typescript
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';

const CalendlyScheduler: React.FC<CalendlySchedulerProps> = ({
  url,
  prefillData,
  onScheduled,
  ...props
}) => {
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log('Event scheduled:', e.data.payload);
      trackEvent('calendly_appointment_scheduled', {
        event_uri: e.data.payload.event.uri,
        start_time: e.data.payload.event.startTime
      });
      onScheduled?.(e.data);
    },
    onEventTypeViewed: () => {
      trackEvent('calendly_event_type_viewed');
    },
    onDateAndTimeSelected: () => {
      trackEvent('calendly_date_selected');
    }
  });

  return (
    <div className="calendly-wrapper">
      <InlineWidget
        url={url}
        styles={{
          height: props.height || '700px',
          width: '100%',
        }}
        pageSettings={{
          backgroundColor: props.backgroundColor,
          hideEventTypeDetails: props.hideEventTypeDetails,
          hideLandingPageDetails: props.hideLandingPageDetails,
          primaryColor: props.primaryColor,
          textColor: props.textColor,
        }}
        prefill={prefillData}
        utm={props.utm}
      />
    </div>
  );
};
```

## Design Requirements

### Visual Integration
```css
.calendly-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive heights */
--calendly-height-mobile: 600px;
--calendly-height-tablet: 650px;
--calendly-height-desktop: 700px;
```

### Loading States
- Skeleton loader while Calendly loads
- Smooth fade-in transition
- Error fallback UI

## Event Tracking

### Analytics Events
```typescript
const calendlyEvents = {
  widget_loaded: {
    event_type: url,
    load_time: performance.now()
  },
  
  scheduling_started: {
    event_type: url,
    has_prefill: !!prefillData
  },
  
  date_selected: {
    event_type: url,
    selection_time: timeElapsed
  },
  
  scheduling_completed: {
    event_type: url,
    scheduled_date: payload.event.startTime,
    total_time: totalDuration
  },
  
  scheduling_abandoned: {
    event_type: url,
    abandonment_point: lastInteraction,
    time_spent: duration
  }
};
```

## Error Handling

### Error Scenarios
```typescript
const handleCalendlyError = (error: CalendlyError) => {
  switch (error.type) {
    case 'LOAD_ERROR':
      showFallback('Unable to load scheduler. Please try again.');
      break;
    case 'NETWORK_ERROR':
      showFallback('Connection issue. Check your internet.');
      break;
    case 'INVALID_URL':
      showFallback('Invalid scheduling link. Contact support.');
      break;
    default:
      showFallback('Scheduling unavailable. Please contact us directly.');
  }
};
```

### Fallback UI
```tsx
<div className="calendly-fallback">
  <h3>Unable to load scheduler</h3>
  <p>Please try one of these options:</p>
  <button onClick={retry}>Try Again</button>
  <a href={`mailto:contact@company.com?subject=Meeting Request`}>
    Email Us
  </a>
  <a href="tel:+1234567890">Call Us</a>
</div>
```

## Performance Requirements

### Loading Optimization
```typescript
// Lazy load Calendly script
const loadCalendlyScript = () => {
  if (window.Calendly) return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Intersection Observer for lazy loading
const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true
});

useEffect(() => {
  if (inView) {
    loadCalendlyScript();
  }
}, [inView]);
```

## Accessibility Requirements

### Widget Accessibility
- iframe title attribute for screen readers
- Keyboard navigation within Calendly
- Focus management on load
- Announce scheduling completion

### Implementation
```html
<div role="region" aria-label="Schedule an appointment">
  <h2 id="scheduler-title">Select a time for your consultation</h2>
  <div aria-describedby="scheduler-title">
    <iframe
      title="Schedule an appointment"
      src="calendly-url"
      aria-label="Appointment scheduler"
    />
  </div>
</div>
```

## Testing Requirements

### Unit Tests
```typescript
describe('CalendlyScheduler', () => {
  it('loads Calendly widget');
  it('prefills user data correctly');
  it('handles scheduling completion');
  it('tracks analytics events');
  it('shows error fallback');
  it('passes UTM parameters');
});
```

### Integration Tests
- Widget loads successfully
- Data prefill works
- Event callbacks fire
- Error handling functions

## Acceptance Criteria
- [ ] Calendly widget loads properly
- [ ] User data prefills correctly
- [ ] Scheduling completion tracked
- [ ] Error states handled gracefully
- [ ] Mobile responsive layout
- [ ] Analytics events fire
- [ ] Accessible to screen readers
- [ ] Performance optimized