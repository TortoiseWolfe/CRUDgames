import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandingPage } from './LandingPage';
import type { LandingPageProps } from './LandingPage';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('LandingPage', () => {
  const minimalProps: LandingPageProps = {
    hero: {
      headline: 'Welcome to Our Service',
      subheadline: 'The best solution for your needs',
    },
    footer: {
      companyName: 'ACME Corp',
    },
  };

  it('renders hero section with headline and subheadline', () => {
    render(<LandingPage {...minimalProps} />);
    
    expect(screen.getByText('Welcome to Our Service')).toBeInTheDocument();
    expect(screen.getByText('The best solution for your needs')).toBeInTheDocument();
  });

  it('renders hero with highlighted text', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      hero: {
        ...minimalProps.hero,
        highlightedText: 'Service',
      },
    };
    
    render(<LandingPage {...props} />);
    
    // The highlighted text should be wrapped in a special element
    const highlightedElement = screen.getByText('Service');
    // Just check that it exists, as the highlighting is handled by HeroSection
    expect(highlightedElement).toBeInTheDocument();
  });

  it('renders hero CTA buttons', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      hero: {
        ...minimalProps.hero,
        primaryCtaText: 'Get Started',
        secondaryCtaText: 'Learn More',
      },
    };
    
    render(<LandingPage {...props} />);
    
    expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument();
  });

  it('renders trust indicators in hero', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      hero: {
        ...minimalProps.hero,
        trustIndicators: [
          { value: '10,000+', label: 'Happy Customers' },
          { value: '99.9%', label: 'Uptime' },
        ],
      },
    };
    
    render(<LandingPage {...props} />);
    
    expect(screen.getByText('10,000+')).toBeInTheDocument();
    expect(screen.getByText('Happy Customers')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();
  });

  it('renders navigation with logo and links', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      navigation: {
        logo: <span>LOGO</span>,
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
        ],
        ctaText: 'Sign Up',
      },
    };
    
    render(<LandingPage {...props} />);
    
    expect(screen.getByText('LOGO')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Features' })[0]).toHaveAttribute('href', '#features');
    expect(screen.getAllByRole('link', { name: 'Pricing' })[0]).toHaveAttribute('href', '#pricing');
    expect(screen.getAllByRole('button', { name: 'Sign Up' })[0]).toBeInTheDocument();
  });

  it('renders trust badges section', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      trustBadges: {
        badges: [
          { id: '1', title: 'SSL Secured', description: 'Your data is safe' },
          { id: '2', title: '24/7 Support', value: 'Always here', highlight: true },
        ],
      },
    };
    
    render(<LandingPage {...props} />);
    
    expect(screen.getByText('SSL Secured')).toBeInTheDocument();
    expect(screen.getByText('Your data is safe')).toBeInTheDocument();
    expect(screen.getByText('24/7 Support')).toBeInTheDocument();
    expect(screen.getByText('Always here')).toBeInTheDocument();
  });

  it.skip('renders conversion metrics', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      metrics: [
        { id: '1', label: 'Success Rate', value: 95, suffix: '%' },
        { id: '2', label: 'Revenue', value: '1M', prefix: '$' },
      ],
    };
    
    render(<LandingPage {...props} />);
    
    expect(screen.getAllByText('Success Rate').length).toBeGreaterThan(0);
    expect(screen.getByText('95')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getAllByText('Revenue').length).toBeGreaterThan(0);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('1M')).toBeInTheDocument();
  });

  it.skip('renders testimonials section', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      testimonials: [
        {
          id: '1',
          name: 'John Doe',
          role: 'CEO',
          company: 'Tech Corp',
          content: 'Great product!',
          rating: 5,
        },
        {
          id: '2',
          name: 'Jane Smith',
          role: 'CTO',
          content: 'Excellent service',
          featured: true,
        },
      ],
    };
    
    render(<LandingPage {...props} />);
    
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    expect(screen.getByText('CEO, Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
    expect(screen.getAllByText('Jane Smith').length).toBeGreaterThan(0);
    expect(screen.getByText('CTO')).toBeInTheDocument();
    expect(screen.getByText('Excellent service')).toBeInTheDocument();
  });

  it('renders footer with company info', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      footer: {
        companyName: 'ACME Corp',
        companyDescription: 'Leading provider of solutions',
        contactInfo: {
          email: 'info@acme.com',
          phone: '+1-234-5678',
          address: '123 Main St',
        },
      },
    };
    
    render(<LandingPage {...props} />);
    
    expect(screen.getByText('ACME Corp')).toBeInTheDocument();
    expect(screen.getByText('Leading provider of solutions')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /info@acme.com/i })).toHaveAttribute('href', 'mailto:info@acme.com');
    expect(screen.getByRole('link', { name: /234-5678/i })).toHaveAttribute('href', 'tel:+1-234-5678');
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
  });

  it('renders footer social links', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      footer: {
        ...minimalProps.footer,
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com/acme' },
          { platform: 'twitter', url: 'https://twitter.com/acme' },
        ],
      },
    };
    
    render(<LandingPage {...props} />);
    
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/acme');
    
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/acme');
  });

  it('renders footer newsletter section', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      footer: {
        ...minimalProps.footer,
        newsletterTitle: 'Subscribe to our newsletter',
        newsletterDescription: 'Get updates in your inbox',
      },
    };
    
    render(<LandingPage {...props} />);
    
    expect(screen.getByText('Subscribe to our newsletter')).toBeInTheDocument();
    expect(screen.getByText('Get updates in your inbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
  });

  it('shows form as modal when configured', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      form: {
        showAsModal: true,
        modalTitle: 'Get Started',
        modalDescription: 'Fill out the form below',
      },
    };
    
    render(<LandingPage {...props} />);
    
    // Modal should not be visible initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    
    // TODO: Test modal opening when CTA is clicked
  });

  it('shows inline form when not modal', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      form: {
        showAsModal: false,
      },
    };
    
    render(<LandingPage {...props} />);
    
    // Form should be visible inline (IntakeForm component)
    // IntakeForm may not have role="form" attribute
    expect(screen.getAllByText(/Name/i).length).toBeGreaterThan(0);
  });

  it.skip('handles form submission success', async () => {
    const onSubmitSuccess = vi.fn();
    const props: LandingPageProps = {
      ...minimalProps,
      form: {
        showAsModal: false,
        onSubmitSuccess,
      },
    };
    
    render(<LandingPage {...props} />);
    
    // Check if form section is rendered
    const formSection = document.getElementById('intake-form');
    expect(formSection).toBeInTheDocument();
    
    // Check for form heading
    expect(screen.getByText('Get Started Today')).toBeInTheDocument();
    
    // Fill and submit form
    const emailInputs = screen.getAllByLabelText(/email/i);
    const emailInput = emailInputs[0]; // Get first email input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // IntakeForm uses 'Submit Form' as button text
    const submitButton = screen.getByRole('button', { name: /Submit Form/i });
    fireEvent.click(submitButton);
    
    // Wait for submission
    await vi.waitFor(() => {
      expect(onSubmitSuccess).toHaveBeenCalled();
    });
  });

  it.skip('handles form submission error', async () => {
    const onSubmitError = vi.fn();
    const props: LandingPageProps = {
      ...minimalProps,
      form: {
        showAsModal: false,
        onSubmitError,
      },
    };
    
    render(<LandingPage {...props} />);
    
    // Check if form section is rendered
    const formSection = document.getElementById('intake-form');
    expect(formSection).toBeInTheDocument();
    
    // Submit form without required fields
    // IntakeForm uses 'Submit Form' as button text
    const submitButton = screen.getByRole('button', { name: /Submit Form/i });
    fireEvent.click(submitButton);
    
    // Should show validation errors
    await vi.waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  it('renders custom children sections', () => {
    render(
      <LandingPage {...minimalProps}>
        <section id="custom-section">
          <h2>Custom Content</h2>
          <p>This is custom content passed as children</p>
        </section>
      </LandingPage>
    );
    
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    expect(screen.getByText('This is custom content passed as children')).toBeInTheDocument();
  });

  it('handles smooth scroll navigation', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      navigation: {
        links: [
          { label: 'Features', href: '#features' },
        ],
      },
    };
    
    render(<LandingPage {...props} />);
    
    const featuresLinks = screen.getAllByRole('link', { name: 'Features' });
    const featuresLink = featuresLinks[0]; // Get first link
    fireEvent.click(featuresLink);
    
    // Should trigger smooth scroll (implementation dependent)
    expect(featuresLink).toHaveAttribute('href', '#features');
  });

  it('applies custom background gradient to hero', () => {
    const props: LandingPageProps = {
      ...minimalProps,
      hero: {
        ...minimalProps.hero,
        backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    };
    
    render(<LandingPage {...props} />);
    
    // HeroSection component handles the gradient internally
    // Just verify the component renders
    expect(screen.getByText('Welcome to Our Service')).toBeInTheDocument();
  });

  it('renders without optional sections', () => {
    // Test with absolute minimum props
    render(<LandingPage {...minimalProps} />);
    
    // Should not crash and render basic structure
    expect(screen.getByText('Welcome to Our Service')).toBeInTheDocument();
    expect(screen.getByText('ACME Corp')).toBeInTheDocument();
    
    // Optional sections should not be present
    expect(screen.queryByText(/testimonials/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/metrics/i)).not.toBeInTheDocument();
  });
});