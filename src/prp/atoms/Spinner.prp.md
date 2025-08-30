# Spinner Component PRP

## Component Overview

### Purpose
A loading indicator component that provides visual feedback during asynchronous operations, with multiple styles and sizes.

### Business Value
- **Problem it solves**: User feedback during loading states
- **Target users**: All users waiting for operations
- **Success metrics**: Perceived performance, user patience

### User Story
```
As a user waiting for content
I want to see loading progress
So that I know the system is working
```

## Technical Specifications

### Component Properties
```typescript
interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'dots' | 'bars' | 'pulse';
  color?: 'primary' | 'secondary' | 'white' | 'current';
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
}
```

## Design Requirements
- Smooth, continuous animation
- Centered in container
- Optional overlay backdrop
- Accessible loading announcement

## Accessibility Requirements
- aria-label="Loading"
- role="status"
- Screen reader announcement
- Reduced motion support

## Acceptance Criteria
- [ ] All variants animate smoothly
- [ ] Overlay blocks interaction
- [ ] Screen reader announces
- [ ] Respects prefers-reduced-motion
- [ ] Scales appropriately
