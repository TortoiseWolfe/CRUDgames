# Avatar Component PRP

## Component Overview

### Purpose
User avatar component that displays profile images with intelligent fallbacks to initials or icons, supporting various sizes and shapes.

### Business Value
- **Problem it solves**: Consistent user representation across the application
- **User benefit**: Quick visual identification of users and personalization
- **Use cases**: User profiles, comments, testimonials, team members, chat interfaces

## Technical Specifications

### Component Properties
```typescript
interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  fallbackIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}
```

### Size Specifications
- **xs**: 24px (1.5rem)
- **sm**: 32px (2rem)
- **md**: 40px (2.5rem) - default
- **lg**: 48px (3rem)
- **xl**: 64px (4rem)
- **2xl**: 96px (6rem)

### Fallback Hierarchy
1. Provided image (src)
2. Initials from name or provided initials
3. Fallback icon
4. Default user icon

## Design Requirements

### Visual Design
- Smooth image loading transitions
- Consistent sizing across variants
- Clear status indicators
- Proper image cropping (object-fit: cover)
- Subtle border for better definition

### Interactive States
- Default: Static display
- Hover: Slight scale if clickable
- Focus: Visible focus ring
- Loading: Skeleton/blur effect
- Error: Graceful fallback

### Status Indicators
- Small dot overlay
- Color coding (green, gray, yellow, red)
- Positioned to not obscure face
- Accessible status text

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Alt text for images
- Role="img" with aria-label
- Status announced to screen readers
- Keyboard navigable if interactive
- Sufficient color contrast for initials

### ARIA Support
- aria-label with user name
- aria-describedby for status
- role="button" if clickable
- Live region for status changes

## Testing Requirements

### Unit Tests
- Image loading and display
- Fallback to initials
- Fallback to icon
- All size variants
- All shape variants
- Status indicator display
- Click handler

### Visual Tests
- Image rendering
- Initials generation
- Status positions
- Loading states
- Error states

### Accessibility Tests
- Alt text present
- ARIA labels correct
- Keyboard navigation
- Screen reader compatibility

## Performance Considerations

### Optimization Strategies
- Lazy loading by default
- Next.js Image optimization
- Blur placeholder for loading
- Appropriate image sizes
- CSS containment

### Bundle Impact
- Component: ~2KB minified
- Styles: ~1KB minified
- Uses next/image (already in bundle)

## Dependencies

### Internal Dependencies
- cn utility for className merging
- Design system colors

### External Dependencies
- next/image for optimization

## Acceptance Criteria

- [ ] All size variants implemented
- [ ] All shape variants working
- [ ] Image loading with optimization
- [ ] Intelligent fallback system
- [ ] Status indicators functional
- [ ] Fully accessible
- [ ] Responsive sizing
- [ ] Tests achieve 100% coverage
- [ ] Documentation complete

## Example Usage

```tsx
// Basic avatar with image
<Avatar
  src="/users/john.jpg"
  alt="John Doe"
  name="John Doe"
/>

// Avatar with initials fallback
<Avatar
  name="Jane Smith"
  size="lg"
/>

// Avatar with status
<Avatar
  src="/users/bob.jpg"
  name="Bob Johnson"
  status="online"
  statusPosition="bottom-right"
/>

// Clickable avatar
<Avatar
  src="/users/alice.jpg"
  name="Alice Cooper"
  size="xl"
  onClick={handleProfileClick}
/>

// Square avatar for org/team
<Avatar
  src="/teams/engineering.png"
  alt="Engineering Team"
  shape="square"
  size="lg"
/>
```

## Notes

- Consider implementing image preloading for critical avatars
- Ensure initials handle various name formats (first/last, single name, etc.)
- May want to add badge overlay support for notifications
- Consider group avatar component for multiple users
- Implement proper caching strategies for profile images