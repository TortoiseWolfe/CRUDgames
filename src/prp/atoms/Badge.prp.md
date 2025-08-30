# Badge Component PRP

## Component Overview

### Purpose
A small status indicator component for displaying counts, labels, or status information in a compact, attention-grabbing format.

### Business Value
- **Problem it solves**: Quick visual communication of status or counts
- **Target users**: Users needing at-a-glance information
- **Success metrics**: Information recognition speed, UI clarity

### User Story
```
As a user scanning the interface
I want to see important status indicators
So that I can quickly understand item states
```

## Technical Specifications

### Component Properties
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  animated?: boolean;
}
```

## Design Requirements
- Inline with text or standalone
- High contrast for visibility
- Consistent padding/sizing
- Optional pulse animation for attention

## Acceptance Criteria
- [ ] All variants visible
- [ ] Removable badges work
- [ ] Animation smooth
- [ ] Text remains readable
- [ ] Scales with parent text
