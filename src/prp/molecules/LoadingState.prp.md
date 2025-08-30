# LoadingState Component PRP

## Component Overview

### Purpose
Displays loading states with skeletons, spinners, or custom content during data fetching.

### Business Value
- **Problem it solves**: User feedback during async operations
- **Target users**: All application users
- **Success metrics**: Perceived performance, user patience

## Technical Specifications

### Component Properties
```typescript
interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'dots' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}
```

## Acceptance Criteria
- [ ] Component functions correctly
- [ ] Accessible to all users
- [ ] Performance optimized
- [ ] Error states handled
