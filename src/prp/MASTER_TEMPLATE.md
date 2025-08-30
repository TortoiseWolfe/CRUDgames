# Component Name PRP (Product Requirements Prompt)

## Component Overview

### Purpose
[Clear description of what this component does and why it exists]

### Business Value
- **Problem it solves**: [Specific business or user problem]
- **Target users**: [Who will use this component]
- **Success metrics**: [How we measure if this component is successful]

### User Story
```
As a [type of user]
I want to [action/goal]
So that [benefit/value]
```

## Technical Specifications

### Component Properties
```typescript
interface ComponentNameProps {
  // Required props
  id: string;                    // Unique identifier for the component
  
  // Optional props
  className?: string;            // Additional CSS classes
  disabled?: boolean;            // Disable state
  loading?: boolean;             // Loading state
  error?: string | null;         // Error message to display
  
  // Event handlers
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (value: any) => void;
  onBlur?: (event: React.FocusEvent) => void;
  
  // Children and content
  children?: React.ReactNode;    // Child elements
  label?: string;                // Display label
  placeholder?: string;          // Placeholder text
  
  // Styling variants
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  
  // Accessibility
  ariaLabel?: string;            // Screen reader label
  ariaDescribedBy?: string;      // ID of describing element
}
```

### State Management
- **Local state**: [List any useState hooks needed]
- **Context usage**: [Any context providers consumed]
- **External state**: [Redux, Zustand, or other state management]

### Data Flow
```
User Input → Validation → State Update → UI Update → Event Emission
```

## Design Requirements

### Visual Specifications
- **Desktop**: [Width, height, spacing requirements]
- **Tablet**: [Responsive adjustments]
- **Mobile**: [Mobile-specific layout]

### Theme Support
```css
/* Light theme */
--component-bg: #ffffff;
--component-text: #1a1a1a;
--component-border: #e5e5e5;

/* Dark theme */
--component-bg: #1a1a1a;
--component-text: #ffffff;
--component-border: #333333;
```

### Interactive States
- **Default**: Base appearance
- **Hover**: Cursor pointer, slight elevation
- **Focus**: Blue outline, increased contrast
- **Active**: Pressed state feedback
- **Disabled**: Reduced opacity, no pointer events
- **Loading**: Spinner or skeleton
- **Error**: Red border, error message display

### Animation & Transitions
```css
transition: all 0.2s ease-in-out;
transform: translateY(0);
```

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Focus indicators visible
- [ ] Touch targets ≥ 44x44px

### ARIA Implementation
```html
<div 
  role="[appropriate role]"
  aria-label="[descriptive label]"
  aria-describedby="[helper text id]"
  aria-invalid="[true/false for errors]"
  aria-busy="[true/false for loading]"
  aria-disabled="[true/false]"
>
```

### Keyboard Navigation
- `Tab`: Navigate to component
- `Enter/Space`: Activate component
- `Escape`: Cancel/close action
- `Arrow keys`: Navigate within component (if applicable)

### Screen Reader Support
- Announce state changes
- Provide context for actions
- Include helper text in announcements
- Support for common screen readers (NVDA, JAWS, VoiceOver)

## Testing Requirements

### Unit Tests
```typescript
describe('ComponentName', () => {
  it('renders with required props', () => {});
  it('handles click events', () => {});
  it('displays error state', () => {});
  it('shows loading state', () => {});
  it('is accessible', () => {});
});
```

### Integration Tests
- Form submission flow
- Data validation
- API interaction
- State management integration

### E2E Test Scenarios
1. User completes primary action
2. Error recovery flow
3. Loading state handling
4. Accessibility navigation

### Visual Regression Tests
- All component states
- Theme variations
- Responsive breakpoints
- Browser compatibility

## Performance Requirements

### Metrics
- **First Contentful Paint**: < 100ms
- **Time to Interactive**: < 200ms
- **Bundle size**: < 5KB gzipped
- **Memory usage**: < 10MB

### Optimization Strategies
- React.memo for expensive renders
- useMemo/useCallback for computations
- Lazy loading if appropriate
- Code splitting considerations

## Dependencies

### Required Packages
```json
{
  "react": "^18.2.0",
  "tailwindcss": "^3.4.0",
  "clsx": "^2.0.0"
}
```

### Internal Dependencies
- `@/lib/utils/cn`: Class name utility
- `@/lib/validation`: Input validation
- `@/components/ui/base`: Base components

### External Integrations
- [List any third-party services]
- [API endpoints used]
- [External libraries]

## Implementation Guidelines

### File Structure
```
src/components/ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit tests
├── ComponentName.module.css   # Styles (if needed)
├── index.ts                   # Public exports
└── README.md                  # Component documentation
```

### Code Patterns
```typescript
// Use functional components with TypeScript
export const ComponentName = forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, ...props }, ref) => {
  // Implementation
  return (
    <div ref={ref} className={cn("base-styles", className)} {...props}>
      {/* Content */}
    </div>
  );
});

ComponentName.displayName = "ComponentName";
```

### Naming Conventions
- Component: PascalCase (ComponentName)
- Props interface: ComponentNameProps
- Files: PascalCase for components
- CSS classes: kebab-case
- Test IDs: data-testid="component-name"

## Storybook Requirements

### Stories to Include
```typescript
export default {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Component description',
      },
    },
  },
  argTypes: {
    // Define controls for props
  },
};

// Stories
export const Default: Story = {};
export const WithError: Story = {};
export const Loading: Story = {};
export const Disabled: Story = {};
export const AllVariants: Story = {};
```

### Documentation
- Component description
- Props documentation with JSDoc
- Usage examples
- Do's and don'ts
- Accessibility notes

## Acceptance Criteria

### Functional Requirements
- [ ] Component renders without errors
- [ ] All props work as specified
- [ ] Event handlers fire correctly
- [ ] Validation works properly
- [ ] Error states display correctly
- [ ] Loading state shows appropriately

### Quality Gates
- [ ] TypeScript: No type errors
- [ ] Tests: 80% coverage minimum
- [ ] Accessibility: WCAG 2.1 AA pass
- [ ] Performance: Meets all metrics
- [ ] Documentation: Complete and accurate
- [ ] Code review: Approved by team

### Definition of Done
- [ ] Code complete and tested
- [ ] Documentation updated
- [ ] Storybook story created
- [ ] Accessibility tested
- [ ] Performance validated
- [ ] Code reviewed and approved
- [ ] Deployed to staging

## Migration Guide

### Breaking Changes
[List any breaking changes from previous versions]

### Upgrade Path
```bash
# Steps to migrate from old version
npm install new-version
# Update imports
# Update props
```

## Related Components
- [Component A]: Used together for [use case]
- [Component B]: Alternative for [scenario]
- [Component C]: Parent/child relationship

## References
- [Design System Documentation](link)
- [Accessibility Guidelines](link)
- [Component Library](link)
- [Best Practices](link)

## Notes
[Any additional context, constraints, or considerations]

---
**Last Updated**: [Date]
**Author**: [Name]
**Review Status**: [Draft/In Review/Approved]