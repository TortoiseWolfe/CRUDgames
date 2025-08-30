# Tooltip Component PRP

## Component Overview

### Purpose
A contextual overlay component that displays helpful information when users hover over or focus on an element.

### Business Value
- **Problem it solves**: Provides additional context without cluttering UI
- **Target users**: Users needing clarification or help
- **Success metrics**: Help usage rate, task completion improvement

### User Story
```
As a user exploring the interface
I want helpful hints on hover
So that I understand functionality without leaving the page
```

## Technical Specifications

### Component Properties
```typescript
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
  delay?: number;
  offset?: number;
  arrow?: boolean;
  interactive?: boolean;
  maxWidth?: number;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
```

## Design Requirements
- Positioned to avoid viewport edges
- High contrast for readability
- Smooth fade in/out animation
- Arrow points to trigger element

## Accessibility Requirements
- Keyboard triggered on focus
- aria-describedby links tooltip
- Escape key closes tooltip
- Announce to screen readers

## Acceptance Criteria
- [ ] Shows on hover/focus
- [ ] Positioned correctly
- [ ] Keyboard accessible
- [ ] Touch-friendly on mobile
- [ ] Content wraps properly
- [ ] Dismissible with Escape
