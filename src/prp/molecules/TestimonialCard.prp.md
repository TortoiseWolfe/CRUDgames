# TestimonialCard Component PRP

## Component Overview

### Purpose
Individual testimonial display component that showcases customer reviews, ratings, and social proof in a visually appealing card format.

### Business Value
- **Problem it solves**: Builds trust through social proof
- **User benefit**: Helps users make informed decisions based on peer experiences
- **Use cases**: Customer reviews, success stories, case studies, ratings display

## Technical Specifications

### Component Properties
```typescript
interface TestimonialCardProps {
  testimonial: {
    id: string;
    content: string;
    name: string;
    role?: string;
    company?: string;
    image?: string;
    rating?: number;
    date?: string;
    verified?: boolean;
    featured?: boolean;
  };
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  showRating?: boolean;
  showImage?: boolean;
  showQuotes?: boolean;
  maxLength?: number;
  className?: string;
  onClick?: () => void;
}
```

### Variants
- **default**: Standard layout with all elements
- **compact**: Reduced padding and smaller text
- **detailed**: Expanded with more metadata
- **minimal**: Just quote and attribution

### Content Structure
- Quote/testimonial text (required)
- Author name (required)
- Author role/title (optional)
- Company/organization (optional)
- Profile image (optional)
- Star rating (optional)
- Date posted (optional)
- Verified badge (optional)

## Design Requirements

### Visual Design
- Clean card layout with proper hierarchy
- Prominent quote with subtle quote marks
- Clear attribution section
- Star rating visualization
- Profile image with fallback
- Verified badge for authenticity

### Interactive States
- Default: Static display
- Hover: Slight elevation/shadow
- Focus: Visible focus ring
- Expanded: Show full text if truncated
- Loading: Skeleton state

### Responsive Behavior
- Stack elements on mobile
- Maintain readability at all sizes
- Image scales appropriately
- Text truncation with "Read more"

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Semantic HTML (blockquote, cite)
- Proper heading hierarchy
- Alt text for profile images
- Star rating aria-label
- Sufficient color contrast
- Keyboard navigation support

### ARIA Support
- role="article" for card
- aria-label for rating
- aria-expanded for truncated text
- Live region for dynamic updates

### Screen Reader
- Announces full testimonial
- Reads author attribution
- Describes rating value
- Indicates verified status

## Testing Requirements

### Unit Tests
- Renders all testimonial data
- Handles missing optional fields
- Truncates long content correctly
- Rating displays accurately
- Image fallback works
- Click handler fires

### Visual Tests
- All variants render correctly
- Image loading states
- Text truncation
- Rating star display
- Responsive layouts

### Accessibility Tests
- Semantic markup validation
- Keyboard navigation
- Screen reader compatibility
- Color contrast compliance

### Integration Tests
- Works within TestimonialSection
- Handles dynamic data updates
- Performance with many instances

## Performance Considerations

### Optimization Strategies
- Lazy load images
- Virtualize in long lists
- Memoize component
- Optimize re-renders
- CSS containment

### Bundle Impact
- Component: ~3KB minified
- Styles: ~2KB minified
- Optional image lazy loading

## Dependencies

### Internal Dependencies
- Card component (wrapper)
- Badge component (verified)
- Star rating component
- Avatar component (fallback)

### External Dependencies
- next/image for optimization

## Acceptance Criteria

- [ ] All testimonial data displays correctly
- [ ] Rating visualization works
- [ ] Image loading with fallback
- [ ] Text truncation with expansion
- [ ] Verified badge displays
- [ ] All variants implemented
- [ ] Fully accessible
- [ ] Responsive design complete
- [ ] Tests achieve 100% coverage
- [ ] Documentation complete

## Example Usage

```tsx
// Basic testimonial
<TestimonialCard
  testimonial={{
    id: '1',
    content: 'Excellent product that exceeded expectations.',
    name: 'Jane Smith',
    role: 'CEO',
    company: 'TechCorp',
    rating: 5
  }}
/>

// Detailed with image
<TestimonialCard
  variant="detailed"
  testimonial={{
    id: '2',
    content: 'The best solution we have found...',
    name: 'John Doe',
    role: 'CTO',
    company: 'StartupCo',
    image: '/testimonials/john.jpg',
    rating: 5,
    date: '2024-01-15',
    verified: true,
    featured: true
  }}
  showRating
  showImage
/>

// Minimal variant
<TestimonialCard
  variant="minimal"
  testimonial={{
    id: '3',
    content: 'Simply amazing!',
    name: 'Sarah Johnson'
  }}
  showQuotes={false}
/>
```

## Notes

- Consider implementing read more/less for long testimonials
- Ensure images are optimized and have proper aspect ratios
- Consider adding social media links if available
- May want to add source platform (Google, Trustpilot, etc.)
- Consider animation for featured testimonials