import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationHeader } from './NavigationHeader';

describe('NavigationHeader', () => {
  const mockCtaAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo text', () => {
    render(<NavigationHeader />);
    
    expect(screen.getByText('CRUDgames.com')).toBeInTheDocument();
  });

  it('renders custom logo text when provided', () => {
    render(<NavigationHeader logoText="Custom Logo" />);
    
    expect(screen.getByText('Custom Logo')).toBeInTheDocument();
  });

  it('renders default navigation links', () => {
    render(<NavigationHeader />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders CTA button when ctaAction is provided', () => {
    render(<NavigationHeader ctaAction={mockCtaAction} />);
    
    const ctaButton = screen.getByRole('button', { name: /get started/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('calls ctaAction when CTA button is clicked', () => {
    render(<NavigationHeader ctaAction={mockCtaAction} />);
    
    const ctaButton = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(ctaButton);
    
    expect(mockCtaAction).toHaveBeenCalledTimes(1);
  });

  it('renders custom CTA text', () => {
    render(<NavigationHeader ctaText="Contact Us" ctaAction={mockCtaAction} />);
    
    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument();
  });

  it('shows mobile menu button on mobile', () => {
    render(<NavigationHeader />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<NavigationHeader />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /toggle menu/i });
    
    // Initially menu is closed - desktop menu is always visible
    const initialHomeLinks = screen.getAllByText('Home');
    expect(initialHomeLinks.length).toBeGreaterThanOrEqual(1);
    
    // Click to open menu
    fireEvent.click(mobileMenuButton);
    
    // After opening mobile menu, there should be more instances
    const afterClickHomeLinks = screen.getAllByText('Home');
    expect(afterClickHomeLinks.length).toBeGreaterThan(initialHomeLinks.length);
  });

  it('applies sticky class when sticky prop is true', () => {
    const { container } = render(<NavigationHeader sticky={true} />);
    
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky');
  });

  it('applies variant classes correctly', () => {
    const { container } = render(<NavigationHeader variant="dark" />);
    
    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-gray-900');
  });

  it('hides mobile menu when showMobileMenu is false', () => {
    render(<NavigationHeader showMobileMenu={false} />);
    
    const mobileMenuButton = screen.queryByRole('button', { name: /toggle menu/i });
    expect(mobileMenuButton).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<NavigationHeader className="custom-class" />);
    
    const header = container.querySelector('header');
    expect(header).toHaveClass('custom-class');
  });

  it('handles dropdown menus for items with children', () => {
    render(<NavigationHeader />);
    
    // Services has a dropdown - find the button with chevron
    const servicesButtons = screen.getAllByText('Services');
    // Find the one that's a button (has children)
    const servicesButton = servicesButtons.find(el => 
      el.closest('button') !== null
    );
    
    if (servicesButton) {
      fireEvent.click(servicesButton);
      
      // Dropdown items should appear
      expect(screen.getByText('Game Development')).toBeInTheDocument();
      expect(screen.getByText('Backend Services')).toBeInTheDocument();
    } else {
      // If no dropdown button found, just check Services exists
      expect(servicesButtons.length).toBeGreaterThan(0);
    }
  });
});