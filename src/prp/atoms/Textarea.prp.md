# Textarea Component PRP

## Component Overview

### Purpose
A multi-line text input component for longer form content with auto-resize capabilities, character counting, and validation support.

### Business Value
- **Problem it solves**: Enables collection of detailed text feedback and longer content
- **Target users**: Users providing comments, descriptions, or detailed information
- **Success metrics**: Form completion rate, content quality metrics

### User Story
```
As a user providing detailed information
I want a text area that adapts to my content
So that I can comfortably write and review my input
```

## Technical Specifications

### Component Properties
```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Core props
  id: string;
  name: string;
  value?: string;
  defaultValue?: string;
  
  // Appearance
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  
  // Validation
  maxLength?: number;
  minLength?: number;
  showCount?: boolean;
  required?: boolean;
  
  // State
  error?: boolean | string;
  disabled?: boolean;
  readOnly?: boolean;
  
  // Content
  label?: string;
  placeholder?: string;
  helperText?: string;
  
  // Events
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
```

## Design Requirements

### Visual Specifications
```css
/* Base styles */
--textarea-padding: 8px 12px;
--textarea-border: 1px solid #d1d5db;
--textarea-radius: 6px;
--textarea-min-height: 80px;
--textarea-line-height: 1.5;
```

### Auto-resize Behavior
- Grows with content up to maxRows
- Smooth height transitions
- Maintains scroll position
- No content jumping

## Accessibility Requirements

### Character Count Announcement
```html
<div>
  <textarea 
    aria-describedby="char-count"
    maxLength="500"
  />
  <span id="char-count" aria-live="polite">
    100 of 500 characters used
  </span>
</div>
```

## Testing Requirements

### Unit Tests
```typescript
describe('Textarea', () => {
  it('auto-resizes with content');
  it('shows character count');
  it('enforces max length');
  it('shows error state');
  it('handles line breaks correctly');
  it('maintains value on resize');
});
```

## Acceptance Criteria
- [ ] Auto-resize works smoothly
- [ ] Character counter updates live
- [ ] Max length enforced
- [ ] Error messages display
- [ ] Resize handles work
- [ ] Mobile experience optimized