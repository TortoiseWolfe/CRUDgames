# Component Strategy

## Philosophy: Build vs. Buy vs. Borrow

### Build (Custom Components)
Components we OWN because they contain business logic or branding:
- **IntakeForm** - Custom multi-step flow with validation
- **ContactForm** - Specific field requirements and submission logic
- **TestimonialCard/Section** - Branded testimonial display
- **MultiStepForm** - Complex state management with persistence
- **CalendlyScheduler** - Wrapper for Calendly integration
- **ConversionMetrics** - Business-specific metrics display
- **TrustBadges** - Marketing/trust indicators
- **HeroSection** - Branded landing page sections
- **NavigationHeader/FooterSection** - Site-specific navigation

### Borrow (Headless Libraries)
Complex interactions better handled by battle-tested libraries:

**Recommended: Radix UI** (fully accessible, unstyled, composable)
- `@radix-ui/react-dialog` → Modals
- `@radix-ui/react-dropdown-menu` → Dropdowns
- `@radix-ui/react-tabs` → Tab interfaces
- `@radix-ui/react-accordion` → Collapsible content
- `@radix-ui/react-tooltip` → Tooltips
- `@radix-ui/react-popover` → Popovers
- `@radix-ui/react-select` → Advanced selects

**For Notifications:**
- `sonner` or `react-hot-toast` → Toast notifications

**For Tables:**
- `@tanstack/react-table` → Data tables with sorting/filtering

### Style (Pure Tailwind)
Simple visual elements that don't need component abstraction:

```tsx
// Instead of <Divider />
<hr className="border-gray-300 my-4" />
// Or for vertical:
<div className="border-l border-gray-300 h-full mx-4" />

// Instead of <ValidationMessage />
<div className="text-sm text-red-600 flex items-center gap-1 mt-1">
  <AlertCircle className="h-4 w-4" />
  <span>Error message here</span>
</div>

// Instead of <LoadingState />
<div className="flex justify-center items-center p-8">
  <Spinner className="h-8 w-8" />
  <span className="ml-2">Loading...</span>
</div>

// Instead of <ProgressIndicator />
<div className="w-full bg-gray-200 rounded-full h-2">
  <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: '60%'}} />
</div>

// Instead of <StepIndicator />
<div className="flex items-center">
  <div className="flex items-center">
    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">1</div>
    <span className="ml-2">Step 1</span>
  </div>
  <div className="flex-1 h-0.5 bg-gray-300 mx-4" />
  <div className="flex items-center">
    <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">2</div>
    <span className="ml-2">Step 2</span>
  </div>
</div>

// Instead of <Skeleton />
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
</div>
```

## Decision Framework

### Build a component when:
1. **Business Logic**: Contains app-specific behavior
2. **Consistent Reuse**: Used 5+ times with same props
3. **Complex State**: Manages significant internal state
4. **Branded Design**: Unique to your brand identity
5. **Performance**: Needs specific optimizations

### Use a library when:
1. **Accessibility**: Complex ARIA requirements (modals, menus)
2. **Interactions**: Touch gestures, drag-and-drop
3. **Well-Solved**: Problem already solved well (date pickers)
4. **Time Constraint**: Faster to integrate than build

### Use Tailwind directly when:
1. **One-off styles**: Unique to single location
2. **Simple variations**: Just changing colors/spacing
3. **Pure presentation**: No behavior or state

## Current Component Ownership

### Keep (Already Built)
✅ Button - Consistent use across app
✅ Input/Textarea - Form consistency
✅ Card - Worth it for consistency
✅ Avatar - Reusable with fallback logic
✅ Badge - Simple but frequently used
✅ Alert - Consistent messaging

### Consider Removing
❓ Divider - Could be just Tailwind
❓ Tooltip - Use Radix UI instead
❓ Modal - Use Radix UI Dialog

### Don't Build
❌ Skeleton - Use Tailwind animate-pulse
❌ Toast - Use sonner
❌ Dropdown - Use Radix UI
❌ Tabs - Use Radix UI
❌ Accordion - Use Radix UI
❌ Table - Use TanStack Table
❌ Breadcrumb - Simple nav list

## Implementation Guidelines

### When using Radix UI:
```tsx
import * as Dialog from '@radix-ui/react-dialog';

// Apply Tailwind classes for styling
<Dialog.Root>
  <Dialog.Trigger className="btn-primary">
    Open
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
      {/* Content */}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### When using Tailwind directly:
```tsx
// Create utility classes in globals.css for repeated patterns
.card {
  @apply bg-white rounded-lg shadow-md p-6;
}

.divider {
  @apply border-t border-gray-300 my-4;
}

.skeleton {
  @apply animate-pulse bg-gray-200 rounded;
}
```

## Benefits of This Approach

1. **Smaller Bundle**: Only ship code you need
2. **Better Accessibility**: Libraries handle edge cases
3. **Faster Development**: Less code to maintain
4. **Future Proof**: Easy to swap implementations
5. **Team Velocity**: Clear decisions, less debate
6. **Quality**: Battle-tested solutions for common problems

## Migration Path

For existing components we want to replace:
1. Keep component API stable
2. Replace internals with library
3. Deprecate over time
4. Remove when no longer used

## Questions to Ask

Before creating any new component:
1. Is this solving a business problem?
2. Does a good library solution exist?
3. Can Tailwind classes handle this?
4. Will this be used in 3+ places?
5. Does it need complex state management?

If you answered "no" to most of these, don't build a component!