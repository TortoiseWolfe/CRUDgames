# FormValidation System PRP

## System Overview

### Purpose
Standardized form validation system ensuring consistent, immediate, and accessible feedback across all form components in the application.

### Scope
All form fields including Input, Select, RadioGroup, Textarea, and any custom form components.

## Core Requirements

### Validation Architecture

#### React Hook Form Integration
```typescript
// Standard form setup with immediate validation
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: 'onChange',  // REQUIRED: Immediate validation
  reValidateMode: 'onChange'
});
```

#### Zod Schema Pattern
```typescript
// All form schemas must provide clear error messages
const schema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  projectType: z.enum(['consulting', 'development', 'design', 'other'], {
    errorMap: () => ({ message: 'Please select a project type' })
  })
});
```

### Component Props Standards

#### Required Props for ALL Form Components
```typescript
interface FormFieldProps {
  // Validation state props
  error?: boolean | string;  // Error state or message
  success?: boolean;          // Success state (REQUIRED)
  
  // Standard props
  disabled?: boolean;
  required?: boolean;
  
  // Change handlers
  onChange?: (value: any) => void;
}
```

### Validation Behavior Standards

#### Immediate Feedback Requirements
1. **Input fields using register()**: Automatic validation on change
2. **Select/Radio using setValue()**: Must use `{ shouldValidate: true }`
3. **Custom components**: Must trigger validation immediately

#### Example Implementation
```typescript
// For Select/Radio components
onChange={(value) => setValue('fieldName', value, { 
  shouldValidate: true  // REQUIRED for immediate validation
})}

// Success prop calculation
success={!!watch('fieldName') && !errors.fieldName}  // For controlled
success={dirtyFields.fieldName && !errors.fieldName} // For registered
```

### Visual Feedback Standards

#### Color States
```css
/* Default State */
border: 2px solid #D1D5DB;  /* gray-300 light */
border: 2px solid rgba(0, 255, 255, 0.5); /* cyan 50% dark */

/* Success State (Field Valid) */
border: 2px solid #10B981;  /* green-500 light */
border: 2px solid #34D399;  /* green-400 dark */
box-shadow: 0 0 10px rgba(57, 255, 20, 0.5);

/* Error State (Field Invalid) */
border: 2px solid #EF4444;  /* red-500 both modes */
box-shadow: 0 0 10px rgba(255, 0, 64, 0.5);

/* Disabled State */
opacity: 0.3;
cursor: not-allowed;
```

#### Transition Requirements
- All state changes must animate: `transition-all duration-300`
- Focus transitions should be smooth
- No jarring color changes

### Error Message Standards

#### Display Requirements
```typescript
// Error messages must be:
1. Associated with the field (aria-describedby)
2. Clear and actionable
3. Shown immediately on error
4. Removed immediately when fixed

// Example
{error && (
  <p id={`${id}-error`} className="text-sm text-red-600 mt-1">
    {typeof error === 'string' ? error : 'This field is required'}
  </p>
)}
```

#### Message Guidelines
- Be specific: "Please enter a valid email" not "Invalid input"
- Be helpful: "Phone number must be 10 digits" not "Wrong format"
- Be polite: "Please select an option" not "Selection required"

### Accessibility Requirements

#### ARIA Attributes
```html
<!-- All form fields must have -->
<input
  aria-invalid={hasError}
  aria-required={required}
  aria-describedby={errorId || helperId}
  aria-label={label || placeholder}
/>
```

#### Screen Reader Support
- Error messages announced immediately
- Success states communicated (not just color)
- Required fields clearly indicated
- Field purposes clear from labels

### Testing Requirements

#### Unit Test Coverage
```typescript
describe('FormField Validation', () => {
  it('shows success state when valid');
  it('shows error state when invalid');
  it('validates immediately on change');
  it('clears error when corrected');
  it('maintains state on blur');
  it('handles disabled state');
  it('announces errors to screen readers');
});
```

#### Integration Test Scenarios
1. Complete form flow with all validation states
2. Tab navigation through fields
3. Error recovery scenarios
4. Form submission with validation
5. Theme mode transitions

## Implementation Checklist

### For New Form Components
- [ ] Has `error` prop (boolean or string)
- [ ] Has `success` prop (boolean)
- [ ] Shows green border when success=true
- [ ] Shows red border when error=true
- [ ] Transitions smoothly between states
- [ ] Error messages associated via aria-describedby
- [ ] Works in both light and dark modes
- [ ] Handles autofill appropriately
- [ ] Tests cover all validation states

### For Form Integration
- [ ] Uses React Hook Form with onChange mode
- [ ] Zod schema has clear error messages
- [ ] setValue calls use shouldValidate: true
- [ ] Success prop calculated correctly
- [ ] Error prop passes validation errors
- [ ] All fields validate immediately
- [ ] Validation states persist appropriately

## Common Patterns

### Input Field Pattern
```tsx
<Input
  {...register('fieldName')}
  error={errors.fieldName?.message}
  success={dirtyFields.fieldName && !errors.fieldName}
  required
/>
```

### Select/Radio Pattern
```tsx
<Select
  value={watch('fieldName')}
  onChange={(val) => setValue('fieldName', val, { shouldValidate: true })}
  error={errors.fieldName?.message}
  success={!!watch('fieldName') && !errors.fieldName}
  required
/>
```

### Custom Validation Pattern
```tsx
// For complex validation logic
const validateField = (value: string) => {
  if (!value) return 'Required';
  if (value.length < 3) return 'Too short';
  if (!pattern.test(value)) return 'Invalid format';
  return true;
};
```

## Anti-Patterns to Avoid

### DON'T: Mix Validation Approaches
```tsx
// BAD: Some fields with success, some without
<Input success={isValid} />
<Select /> // No success prop

// GOOD: Consistent across all fields
<Input success={isValid} />
<Select success={isValid} />
```

### DON'T: Delay Validation Feedback
```tsx
// BAD: Only validate on blur
mode: 'onBlur'

// GOOD: Immediate feedback
mode: 'onChange'
```

### DON'T: Use Only Color for Feedback
```tsx
// BAD: Just green border
border-color: green;

// GOOD: Multiple indicators
border-color: green;
box-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
aria-invalid: false;
// Plus success message or icon
```

### DON'T: Hardcode Validation Styles
```tsx
// BAD: Inline styles
style={{ borderColor: isValid ? 'green' : 'red' }}

// GOOD: Use success/error props
success={isValid}
error={!isValid}
```

## Migration Guide

### Updating Existing Components
1. Add `success` prop to component interface
2. Implement success styling (green border + glow)
3. Ensure error styling matches standards
4. Add proper ARIA attributes
5. Update tests for new prop
6. Document in Storybook

### Updating Form Usage
1. Change form mode to 'onChange'
2. Add shouldValidate to setValue calls
3. Calculate success prop for each field
4. Ensure error messages are clear
5. Test all validation scenarios

## Monitoring & Metrics

### Key Performance Indicators
- Validation response time: <100ms
- Form completion rate: Track improvements
- Error recovery rate: Users fixing errors
- Accessibility score: 100% WCAG AA

### User Experience Metrics
- Time to first error: Should be immediate
- Error message clarity: A/B test messages
- Success state recognition: User studies
- Form abandonment: Track and reduce

## Future Enhancements

### Planned Improvements
1. Async validation support
2. Progressive validation (field dependencies)
3. Smart error recovery suggestions
4. Validation analytics dashboard
5. A/B testing framework for messages

## Acceptance Criteria
- [ ] All form components have success prop
- [ ] Validation is immediate across all fields
- [ ] Error messages are clear and actionable
- [ ] Success states show consistently
- [ ] Accessibility standards met
- [ ] Tests cover all scenarios
- [ ] Documentation complete
- [ ] Team trained on standards