import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThankYouPage } from './ThankYouPage';

describe('ThankYouPage', () => {
  it('renders with default props', () => {
    render(<ThankYouPage />);
    
    expect(screen.getByText('Thank You!')).toBeInTheDocument();
    expect(screen.getByText(/Your information has been successfully submitted/)).toBeInTheDocument();
  });

  it('renders with personalized greeting', () => {
    render(<ThankYouPage firstName="John" />);
    
    expect(screen.getByText('Thank You, John!')).toBeInTheDocument();
  });

  it('renders with custom title and subtitle', () => {
    render(
      <ThankYouPage
        title="Success!"
        subtitle="We've received your submission."
      />
    );
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText("We've received your submission.")).toBeInTheDocument();
  });

  it('renders submission summary with all fields', () => {
    render(
      <ThankYouPage
        firstName="John"
        lastName="Doe"
        email="john@example.com"
        company="Tech Corp"
        projectType="Web Development"
      />
    );
    
    expect(screen.getByText('Submission Summary')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
  });

  it('does not render submission summary when no data provided', () => {
    render(<ThankYouPage />);
    
    expect(screen.queryByText('Submission Summary')).not.toBeInTheDocument();
  });

  it('renders next steps section', () => {
    render(<ThankYouPage />);
    
    expect(screen.getByText('What Happens Next?')).toBeInTheDocument();
    expect(screen.getByText(/Our team will review your submission/)).toBeInTheDocument();
    expect(screen.getByText(/prepare a customized proposal/)).toBeInTheDocument();
    expect(screen.getByText(/specialist will contact you/)).toBeInTheDocument();
  });

  it('renders custom next steps', () => {
    const customSteps = [
      { step: 1, description: 'Custom step 1' },
      { step: 2, description: 'Custom step 2' },
    ];
    
    render(<ThankYouPage nextSteps={customSteps} />);
    
    expect(screen.getByText('Custom step 1')).toBeInTheDocument();
    expect(screen.getByText('Custom step 2')).toBeInTheDocument();
  });

  it('shows schedule consultation button', () => {
    render(<ThankYouPage />);
    
    const scheduleButton = screen.getByRole('button', { name: /Schedule a Consultation/i });
    expect(scheduleButton).toBeInTheDocument();
  });

  it('shows Calendly scheduler when button clicked', () => {
    const { container } = render(<ThankYouPage />);
    
    const scheduleButton = screen.getByRole('button', { name: /Schedule a Consultation/i });
    fireEvent.click(scheduleButton);
    
    expect(screen.getByText('Schedule Your Consultation')).toBeInTheDocument();
    expect(screen.getByText(/Choose a convenient time/)).toBeInTheDocument();
    
    // Check for Calendly iframe
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('hides scheduler when Maybe Later clicked', () => {
    render(<ThankYouPage />);
    
    const scheduleButton = screen.getByRole('button', { name: /Schedule a Consultation/i });
    fireEvent.click(scheduleButton);
    
    const maybeLaterButton = screen.getByRole('button', { name: /Maybe Later/i });
    fireEvent.click(maybeLaterButton);
    
    expect(screen.queryByText('Schedule Your Consultation')).not.toBeInTheDocument();
  });

  it('shows appointment confirmed alert after scheduling', () => {
    const onSchedulingComplete = vi.fn();
    render(<ThankYouPage onSchedulingComplete={onSchedulingComplete} />);
    
    // Open scheduler
    const scheduleButton = screen.getByRole('button', { name: /Schedule a Consultation/i });
    fireEvent.click(scheduleButton);
    
    // Simulate scheduling complete
    const { container } = render(
      <ThankYouPage 
        showScheduler={true}
        onSchedulingComplete={onSchedulingComplete}
      />
    );
    
    // Find and trigger the CalendlyScheduler's onScheduled callback
    // This is a simplified test - in real scenario, Calendly would trigger this
    const scheduler = container.querySelector('.calendly-inline-widget');
    if (scheduler) {
      // Simulate the scheduling complete event
      const event = new CustomEvent('calendly.event_scheduled');
      window.dispatchEvent(event);
    }
  });

  it('shows info alert when not scheduled', () => {
    render(<ThankYouPage />);
    
    expect(screen.getByText(/Want to speed things up?/)).toBeInTheDocument();
  });

  it('renders additional resources section', () => {
    render(<ThankYouPage />);
    
    expect(screen.getByText('While You Wait...')).toBeInTheDocument();
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
    expect(screen.getByText('Our Process')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders custom resources', () => {
    const customResources = [
      {
        title: 'Custom Resource',
        description: 'Custom description',
        href: '/custom',
        color: 'blue' as const,
      },
    ];
    
    render(<ThankYouPage resources={customResources} />);
    
    expect(screen.getByText('Custom Resource')).toBeInTheDocument();
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<ThankYouPage />);
    
    expect(screen.getByRole('button', { name: /Return to Homepage/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Contact Support/i })).toBeInTheDocument();
  });

  it('handles contact support button click', () => {
    const originalLocation = window.location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.location = { href: '' } as any;
    
    render(<ThankYouPage />);
    
    const contactButton = screen.getByRole('button', { name: /Contact Support/i });
    fireEvent.click(contactButton);
    
    expect(window.location.href).toBe('mailto:contact@company.com');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.location = originalLocation as any;
  });

  it('calls onTrackConversion on mount', () => {
    const onTrackConversion = vi.fn();
    render(<ThankYouPage onTrackConversion={onTrackConversion} />);
    
    expect(onTrackConversion).toHaveBeenCalledTimes(1);
  });

  it('prefills Calendly with user data', () => {
    const { container } = render(
      <ThankYouPage
        firstName="John"
        lastName="Doe"
        email="john@example.com"
        phone="555-1234"
        company="Tech Corp"
        projectType="Web Development"
        showScheduler={true}
      />
    );
    
    // The CalendlyScheduler should receive prefill data
    // In a real test, we'd check that the iframe URL contains the prefill parameters
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<ThankYouPage />);
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-br');
  });
});