import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SchedulingPage } from './SchedulingPage';

describe('SchedulingPage', () => {
  const defaultProps = {
    calendlyUrl: 'https://calendly.com/example/consultation',
  };

  it('renders with default props', () => {
    render(<SchedulingPage {...defaultProps} />);
    
    expect(screen.getByText('Schedule Your Free Consultation')).toBeInTheDocument();
    expect(screen.getByText(/Choose a convenient time/)).toBeInTheDocument();
  });

  it('renders with custom title and subtitle', () => {
    render(
      <SchedulingPage
        {...defaultProps}
        title="Book Your Session"
        subtitle="Let's discuss your project"
      />
    );
    
    expect(screen.getByText('Book Your Session')).toBeInTheDocument();
    expect(screen.getByText("Let's discuss your project")).toBeInTheDocument();
  });

  it('renders benefits section', () => {
    render(<SchedulingPage {...defaultProps} />);
    
    expect(screen.getByText('30-Minute Consultation')).toBeInTheDocument();
    expect(screen.getByText('Flexible Scheduling')).toBeInTheDocument();
    expect(screen.getByText('Expert Guidance')).toBeInTheDocument();
    expect(screen.getByText('No Commitment')).toBeInTheDocument();
  });

  it('renders custom benefits', () => {
    const customBenefits = [
      {
        icon: <span>🎯</span>,
        title: 'Custom Benefit',
        description: 'Custom description',
      },
    ];
    
    render(
      <SchedulingPage
        {...defaultProps}
        benefits={customBenefits}
      />
    );
    
    expect(screen.getByText('Custom Benefit')).toBeInTheDocument();
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('renders availability information', () => {
    const availability = {
      timezone: 'PST',
      hours: '9 AM - 5 PM',
      responseTime: '24 hours',
    };
    
    render(
      <SchedulingPage
        {...defaultProps}
        availability={availability}
      />
    );
    
    expect(screen.getByText('Available 9 AM - 5 PM')).toBeInTheDocument();
    expect(screen.getByText('PST')).toBeInTheDocument();
    expect(screen.getByText('Response within 24 hours')).toBeInTheDocument();
  });

  it('renders testimonials section', () => {
    const testimonials = [
      {
        id: '1',
        name: 'John Doe',
        role: 'CEO',
        company: 'Tech Corp',
        content: 'Great service!',
        rating: 5,
      },
      {
        id: '2',
        name: 'Jane Smith',
        role: 'Designer',
        company: 'Design Co',
        content: 'Highly recommended!',
        rating: 5,
      },
    ];
    
    render(
      <SchedulingPage
        {...defaultProps}
        testimonials={testimonials}
      />
    );
    
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
    
    // Check if testimonial cards are rendered (they might be inside the Card component)
    const container = screen.getByText('What Our Clients Say').parentElement?.parentElement;
    expect(container).toBeInTheDocument();
    
    // The testimonials should be in the DOM, but might be nested deeply
    // Let's check for the names which should be more accessible
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('does not render testimonials section when empty', () => {
    render(
      <SchedulingPage
        {...defaultProps}
        testimonials={[]}
      />
    );
    
    expect(screen.queryByText('What Our Clients Say')).not.toBeInTheDocument();
  });

  it('renders Calendly scheduler', () => {
    const { container } = render(<SchedulingPage {...defaultProps} />);
    
    // Check for CalendlyScheduler component
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    // Calendly adds query parameters to the URL
    expect(iframe?.getAttribute('src')).toContain(defaultProps.calendlyUrl);
  });

  it('renders navigation header', () => {
    render(<SchedulingPage {...defaultProps} />);
    
    // NavigationHeader should be present
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders footer section', () => {
    render(<SchedulingPage {...defaultProps} />);
    
    // FooterSection should be present
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<SchedulingPage {...defaultProps} />);
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-b');
  });

  it('renders empty benefits array without error', () => {
    render(
      <SchedulingPage
        {...defaultProps}
        benefits={[]}
      />
    );
    
    // Should not render benefits section
    expect(screen.queryByText('30-Minute Consultation')).not.toBeInTheDocument();
  });

  it('renders without availability section when not provided', () => {
    render(<SchedulingPage {...defaultProps} />);
    
    // Should not render availability badges
    expect(screen.queryByText(/Available/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Response within/)).not.toBeInTheDocument();
  });
});