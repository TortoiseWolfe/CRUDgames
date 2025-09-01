# DesignSystem System PRP

## System Overview

### Purpose
Comprehensive design system defining colors, typography, spacing, components, and patterns for consistent UI/UX with a cyberpunk CRT holographic aesthetic.

### Scope
All UI components, layouts, and visual elements across the application

## Core Requirements

### Design Tokens - Cyberpunk CRT Theme

#### Light Mode Colors
```css
/* Primary Palette */
--primary: #3B82F6;           /* Blue for primary actions */
--secondary: #F59E0B;         /* Amber for secondary actions */
--success: #10B981;           /* Green for success states */
--warning: #F59E0B;           /* Amber for warnings */
--error: #EF4444;             /* Red for errors */

/* Text Colors */
--text-primary: #111827;      /* gray-900 for main text */
--text-secondary: #6B7280;    /* gray-500 for secondary text */
--text-muted: #9CA3AF;        /* gray-400 for muted text */

/* Background Colors */
--bg-primary: #FFFFFF;        /* White backgrounds */
--bg-secondary: #F9FAFB;      /* gray-50 for subtle backgrounds */
--bg-muted: #F3F4F6;          /* gray-100 for muted areas */

/* Border Colors */
--border-default: #D1D5DB;    /* gray-300 for default borders */
--border-hover: #9CA3AF;      /* gray-400 for hover states */
--border-focus: #3B82F6;      /* Blue for focus states */
```

#### Dark Mode Colors (Cyberpunk CRT)
```css
/* Primary Palette */
--primary-dark: #00FFFF;      /* Cyan for primary (holographic) */
--secondary-dark: #FFB000;    /* Amber for secondary (CRT amber) */
--success-dark: #39FF14;      /* Neon green for success */
--warning-dark: #FFB000;      /* Amber for warnings */
--error-dark: #FF0040;        /* Neon red for errors */

/* Text Colors */
--text-primary-dark: #00FFFF; /* Cyan for main text */
--text-secondary-dark: #06B6D4; /* cyan-500 for secondary */
--text-muted-dark: #0E7490;   /* cyan-700 for muted */

/* Background Colors */
--bg-primary-dark: #000000;   /* Black with opacity layers */
--bg-secondary-dark: rgba(0, 0, 0, 0.4); /* Semi-transparent black */
--bg-muted-dark: rgba(0, 0, 0, 0.6);     /* Deeper black */

/* Border Colors */
--border-default-dark: rgba(0, 255, 255, 0.5);  /* Cyan 50% opacity */
--border-hover-dark: rgba(0, 255, 255, 0.7);    /* Cyan 70% opacity */
--border-focus-dark: #00FFFF;                   /* Full cyan for focus */

/* Glow Effects */
--glow-primary: 0 0 15px rgba(0, 255, 255, 0.6);
--glow-success: 0 0 10px rgba(57, 255, 20, 0.5);
--glow-error: 0 0 10px rgba(255, 0, 64, 0.5);
```

### Typography
```css
/* Font Families */
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
--font-display: 'Orbitron', sans-serif; /* For cyberpunk headers */

/* Font Sizes */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */

/* Font Weights - IMPORTANT: Avoid bold for labels */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600; /* Use sparingly */
--font-bold: 700;     /* Avoid in form labels */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Form Field Standards

#### Validation States
```css
/* Success State (Green) */
.field-success {
  border-color: #10B981;  /* Light mode */
  border-color: #34D399;  /* Dark mode */
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
}

/* Error State (Red) */
.field-error {
  border-color: #EF4444;  /* Light mode */
  border-color: #EF4444;  /* Dark mode */
  box-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
}

/* Default State */
.field-default {
  border-color: #D1D5DB;  /* Light mode: gray-300 */
  border-color: rgba(0, 255, 255, 0.5); /* Dark mode: cyan 50% */
}
```

#### Autofill Handling
```css
/* Light Mode Autofill */
input:-webkit-autofill {
  -webkit-text-fill-color: #111827; /* gray-900 */
  box-shadow: 0 0 0px 1000px white inset;
}

/* Dark Mode Autofill */
.dark input:-webkit-autofill {
  -webkit-text-fill-color: #00FFFF; /* cyan */
  box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0.4) inset;
}
```

### Component Requirements

#### All Form Components MUST:
1. **Have a `success` prop** - Shows green validation when field is valid
2. **Support immediate validation** - Use `shouldValidate: true` for setValue calls
3. **Maintain consistent styling** - Same borders, shadows, and transitions
4. **Respect theme modes** - Proper light/dark mode colors
5. **Handle autofill gracefully** - No unexpected background colors

#### Label Standards:
- Use `font-mono` for all form labels
- NO `font-semibold` or `font-bold` on labels
- Include `> ` prefix for terminal aesthetic
- Show `*` for required fields with pulse animation

#### Visual Feedback Timeline:
1. **Empty field**: Default border (gray/cyan)
2. **User types**: Immediate validation if mode is onChange
3. **Valid input**: Green border + shadow instantly
4. **Invalid input**: Red border + shadow instantly
5. **Field blur**: Maintain validation state

### Special Effects

#### CRT Monitor Effects
```css
/* Scan lines */
.scan-lines::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(180deg, transparent, rgba(0, 255, 255, 0.4), transparent);
  animation: scan 8s linear infinite;
}

/* Matrix rain background */
.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0.05;
}

/* Holographic shimmer */
.hologram {
  background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  animation: shimmer 3s ease-in-out infinite;
}
```

## Implementation Guidelines

### Component Development
1. **Start with PRP** - Read component PRP before implementation
2. **Use design tokens** - Never hardcode colors or sizes
3. **Test both themes** - Verify in light and dark modes
4. **Check validation** - Test all validation states
5. **Document in Storybook** - Show all states and variants

### Form Field Checklist
- [ ] Has `success` prop
- [ ] Has `error` prop (string or boolean)
- [ ] Supports `disabled` state
- [ ] Respects theme mode
- [ ] Handles autofill
- [ ] Shows validation immediately
- [ ] Consistent with other fields

## Testing Requirements

### Visual Regression Tests
- All components in both light/dark modes
- All validation states (default, success, error)
- Hover and focus states
- Disabled states
- Autofilled states

### Accessibility Tests
- Color contrast ratios (4.5:1 minimum)
- Focus indicators visible
- Screen reader labels
- Keyboard navigation

## Monitoring & Metrics

### Key Indicators
- Validation response time (<100ms)
- Theme consistency score (100%)
- Color contrast compliance (WCAG AA)
- Component reuse rate (>80%)

## Compliance & Standards

### WCAG 2.1 AA Requirements
- Color contrast: 4.5:1 for normal text
- Focus indicators: Always visible
- Error messages: Clear and associated
- Success feedback: Not color-only

### Performance Standards
- CSS animation: Use GPU-accelerated properties
- Transition duration: 300ms maximum
- Shadow/glow effects: Use sparingly
- Backdrop filters: Check performance impact

## Acceptance Criteria
- [ ] All form fields have consistent validation
- [ ] Light/dark modes fully implemented
- [ ] Autofill styling handled properly
- [ ] No bold labels on form fields
- [ ] Green success states on all fields
- [ ] Red error states clear immediately
- [ ] CRT effects enhance not hinder UX
- [ ] All components documented in Storybook
- [ ] Tests cover all validation states
- [ ] Accessibility standards met