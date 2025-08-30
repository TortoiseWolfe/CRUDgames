# ProgressIndicator Component PRP

## Component Overview

### Purpose
A visual component showing progress through multi-step processes, with clear indication of completed, current, and upcoming steps.

### Business Value
- **Problem it solves**: Users understand their position in multi-step workflows
- **Target users**: Users completing multi-step forms or processes
- **Success metrics**: Task completion rate, abandonment reduction

### User Story
```
As a user in a multi-step process
I want to see my progress
So that I know how much remains
```

## Technical Specifications

### Component Properties
```typescript
interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  variant?: 'linear' | 'circular' | 'dots';
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  allowNavigation?: boolean;
  onStepClick?: (stepIndex: number) => void;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success';
}

interface Step {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming' | 'error';
  disabled?: boolean;
}
```

## Design Requirements
- Clear visual distinction between states
- Smooth transitions between steps
- Mobile-responsive layout
- Optional step navigation

## Accessibility Requirements
- aria-current="step" for current
- Keyboard navigation if clickable
- Screen reader announces progress
- Role="progressbar" with aria-valuenow

## Acceptance Criteria
- [ ] All step states visible
- [ ] Navigation works if enabled
- [ ] Responsive on mobile
- [ ] Animations smooth
- [ ] Screen reader friendly
