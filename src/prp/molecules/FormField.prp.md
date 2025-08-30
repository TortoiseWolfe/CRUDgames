# FormField Component PRP

## Component Overview

### Purpose
A complete form field component that combines label, input, helper text, and error messaging into a cohesive, accessible unit with consistent spacing and behavior.

### Business Value
- **Problem it solves**: Ensures consistent form field implementation across the application
- **Target users**: Developers building forms, end users filling them out
- **Success metrics**: Form completion rate, error recovery rate, development speed

### User Story
```
As a developer
I want a complete form field component
So that I can quickly build consistent, accessible forms
```

## Technical Specifications

### Component Properties
```typescript
interface FormFieldProps {
  // Field configuration
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select';
  
  // Value management
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  onBlur?: (event: React.FocusEvent) => void;
  
  // Validation
  required?: boolean;
  error?: string | boolean;
  touched?: boolean;
  validate?: (value: any) => string | undefined;
  
  // Content
  placeholder?: string;
  helperText?: string;
  tooltip?: string;
  
  // For select fields
  options?: Array<{value: string; label: string}>;
  
  // Appearance
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  
  // Layout
  orientation?: 'vertical' | 'horizontal';
  labelWidth?: string;
  
  // Accessibility
  autoComplete?: string;
  inputProps?: object;
}
```

## Design Requirements

### Layout Structure
```
[Label] [Required *] [Tooltip]
[Input/Textarea/Select]
[Helper Text]
[Error Message]
```

### Spacing System
```css
--field-gap: 4px;
--field-margin-bottom: 20px;
--label-margin-bottom: 4px;
--helper-margin-top: 4px;
```

## Accessibility Requirements

### Complete ARIA Structure
```html
<div role="group">
  <label for="field-id" id="label-id">
    Field Label
    <span aria-label="required">*</span>
  </label>
  <input 
    id="field-id"
    aria-labelledby="label-id"
    aria-describedby="helper-id error-id"
    aria-invalid="true"
    aria-required="true"
  />
  <span id="helper-id">Helper text</span>
  <span id="error-id" role="alert">Error message</span>
</div>
```

## Testing Requirements

### Unit Tests
```typescript
describe('FormField', () => {
  it('renders all field types correctly');
  it('shows error messages when touched');
  it('validates on blur');
  it('handles value changes');
  it('applies required indicator');
  it('links label to input properly');
  it('announces errors to screen readers');
});
```

## Integration Patterns

### With React Hook Form
```tsx
<FormField
  name="email"
  label="Email Address"
  type="email"
  required
  error={errors.email?.message}
  touched={touchedFields.email}
  {...register('email')}
/>
```

## Acceptance Criteria
- [ ] All input types supported
- [ ] Error messages display correctly
- [ ] Required fields marked clearly
- [ ] Tooltip shows on hover/focus
- [ ] Horizontal layout option works
- [ ] Integrates with form libraries
- [ ] Fully keyboard accessible
- [ ] Screen reader friendly