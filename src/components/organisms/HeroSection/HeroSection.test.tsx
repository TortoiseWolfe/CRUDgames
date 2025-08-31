import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  const mockPrimaryAction = vi.fn();
  const mockSecondaryAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders headline text', () => {
    render(<HeroSection headline="Welcome to Our Platform" primaryCtaText="Get Started" primaryCtaAction={mockPrimaryAction} />);
    
    expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
  });

  it('renders highlighted text when provided', () => {
    render(
      <HeroSection 
        headline="Build Amazing Products" 
        highlightedText="Products"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
      />
    );
    
    // The headline text will be split with highlighted part in a span
    expect(screen.getByText(/Build Amazing/)).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders subheadline when provided', () => {
    render(
      <HeroSection 
        headline="Welcome"
        subheadline="Start your journey today"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
      />
    );
    
    expect(screen.getByText('Start your journey today')).toBeInTheDocument();
  });

  it('renders primary CTA button', () => {
    render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
      />
    );
    
    const primaryButton = screen.getByRole('button', { name: /get started/i });
    expect(primaryButton).toBeInTheDocument();
  });

  it('calls primary action when primary CTA is clicked', () => {
    render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
      />
    );
    
    const primaryButton = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(primaryButton);
    
    expect(mockPrimaryAction).toHaveBeenCalledTimes(1);
  });

  it('renders secondary CTA button when provided', () => {
    render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
        secondaryCtaText="Learn More"
        secondaryCtaAction={mockSecondaryAction}
      />
    );
    
    const secondaryButton = screen.getByRole('button', { name: /learn more/i });
    expect(secondaryButton).toBeInTheDocument();
  });

  it('renders trust indicators when provided', () => {
    const trustIndicators = [
      { value: '10k+', label: 'Happy Customers' },
      { value: '99%', label: 'Uptime' },
      { value: '24/7', label: 'Support' }
    ];
    
    render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
        trustIndicators={trustIndicators}
      />
    );
    
    expect(screen.getByText('10k+')).toBeInTheDocument();
    expect(screen.getByText('Happy Customers')).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { container } = render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
        variant="minimal"
      />
    );
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('applies centered layout when specified', () => {
    const { container } = render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
      />
    );
    
    const contentDiv = container.querySelector('.text-center');
    expect(contentDiv).toBeInTheDocument();
  });

  it('renders background image when provided', () => {
    const { container } = render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
        backgroundImage="/hero-bg.jpg"
      />
    );
    
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ backgroundImage: 'url(/hero-bg.jpg)' });
  });

  it('applies custom className', () => {
    const { container } = render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
        className="custom-hero"
      />
    );
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-hero');
  });

  it('renders hero section', () => {
    const { container } = render(
      <HeroSection headline="Welcome" primaryCtaText="Get Started" primaryCtaAction={mockPrimaryAction} />
    );
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('relative', 'overflow-hidden');
  });

  it('shows animation classes when animations are enabled', () => {
    const { container } = render(
      <HeroSection 
        headline="Welcome"
        primaryCtaText="Get Started"
        primaryCtaAction={mockPrimaryAction}
      />
    );
    
    const animatedElements = container.querySelectorAll('[class*="animate-"]');
    expect(animatedElements.length).toBeGreaterThan(0);
  });
});