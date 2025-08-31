import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationPage } from './ConfirmationPage';
import type { AppointmentInfo, CalendarLink, PreparationTip } from './ConfirmationPage';

describe('ConfirmationPage', () => {
  const mockAppointmentDetails: AppointmentInfo = {
    id: '123',
    date: new Date('2024-12-25T10:00:00'),
    time: '10:00 AM',
    duration: '30 minutes',
    type: 'video',
    location: 'Zoom',
    meetingUrl: 'https://zoom.us/j/123456',
    host: {
      name: 'John Doe',
      email: 'john@example.com',
      title: 'Senior Consultant',
    },
    attendee: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: 'ACME Corp',
    },
  };

  it('renders appointment details', () => {
    render(<ConfirmationPage appointmentDetails={mockAppointmentDetails} />);
    
    expect(screen.getByText(/Appointment Confirmed/)).toBeInTheDocument();
    // Time and duration are rendered together
    expect(screen.getByText('10:00 AM (30 minutes)')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows video meeting icon for video appointments', () => {
    render(<ConfirmationPage appointmentDetails={mockAppointmentDetails} />);
    
    // Check for video-specific content
    expect(screen.getByText('video')).toBeInTheDocument();
  });

  it('shows phone icon for phone appointments', () => {
    const phoneAppointment = {
      ...mockAppointmentDetails,
      type: 'phone' as const,
      location: undefined,
      meetingUrl: undefined,
    };
    
    render(<ConfirmationPage appointmentDetails={phoneAppointment} />);
    
    expect(screen.getByText('phone')).toBeInTheDocument();
  });

  it('shows location for in-person appointments', () => {
    const inPersonAppointment = {
      ...mockAppointmentDetails,
      type: 'in-person' as const,
      location: '123 Main St, Suite 100',
      meetingUrl: undefined,
    };
    
    render(<ConfirmationPage appointmentDetails={inPersonAppointment} />);
    
    expect(screen.getByText('in-person')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Suite 100')).toBeInTheDocument();
  });

  it('renders calendar links when provided', () => {
    const calendarLinks: CalendarLink[] = [
      { type: 'google', url: 'https://calendar.google.com/add' },
      { type: 'outlook', url: 'https://outlook.live.com/add' },
    ];
    
    render(
      <ConfirmationPage 
        appointmentDetails={mockAppointmentDetails}
        calendarLinks={calendarLinks}
      />
    );
    
    expect(screen.getByText(/Google Calendar/i)).toBeInTheDocument();
    expect(screen.getByText(/Outlook/i)).toBeInTheDocument();
  });

  it('renders preparation tips when provided', () => {
    const tips: PreparationTip[] = [
      { id: '1', title: 'Test your camera', description: 'Ensure your camera works' },
      { id: '2', title: 'Find a quiet space', description: 'Minimize background noise' },
    ];
    
    render(
      <ConfirmationPage 
        appointmentDetails={mockAppointmentDetails}
        preparationTips={tips}
      />
    );
    
    expect(screen.getByText('Test your camera')).toBeInTheDocument();
    expect(screen.getByText('Find a quiet space')).toBeInTheDocument();
  });

  it('shows default preparation tips when none provided', () => {
    render(<ConfirmationPage appointmentDetails={mockAppointmentDetails} />);
    
    // Should show some default tips
    expect(screen.getByText(/How to Prepare/i)).toBeInTheDocument();
  });

  it('shows confirmation email alert when enabled', () => {
    render(
      <ConfirmationPage 
        appointmentDetails={mockAppointmentDetails}
        showConfirmationEmail={true}
      />
    );
    
    // There might be multiple elements with 'confirmation email' text
    const confirmationTexts = screen.getAllByText(/confirmation email/i);
    expect(confirmationTexts.length).toBeGreaterThan(0);
    expect(screen.getByText(mockAppointmentDetails.attendee.email)).toBeInTheDocument();
  });

  it('renders contact information when provided', () => {
    const contactInfo = {
      email: 'support@example.com',
      phone: '+1-234-567-8900',
      supportUrl: 'https://example.com/support',
    };
    
    render(
      <ConfirmationPage 
        appointmentDetails={mockAppointmentDetails}
        contactInfo={contactInfo}
      />
    );
    
    const emailLink = screen.getByRole('link', { name: /support@example.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:support@example.com');
    
    const phoneLink = screen.getByRole('link', { name: /234-567-8900/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+1-234-567-8900');
  });

  it('renders reschedule and cancel links when provided', () => {
    render(
      <ConfirmationPage 
        appointmentDetails={mockAppointmentDetails}
        rescheduleLink="https://example.com/reschedule"
        cancelLink="https://example.com/cancel"
      />
    );
    
    expect(screen.getByRole('link', { name: /Reschedule/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('renders custom message when provided', () => {
    const customMessage = 'Looking forward to speaking with you!';
    
    render(
      <ConfirmationPage 
        appointmentDetails={mockAppointmentDetails}
        customMessage={customMessage}
      />
    );
    
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ConfirmationPage 
        appointmentDetails={mockAppointmentDetails}
        className="custom-confirmation"
      />
    );
    
    expect(container.querySelector('.custom-confirmation')).toBeInTheDocument();
  });

  it('handles date as string', () => {
    const appointmentWithStringDate = {
      ...mockAppointmentDetails,
      date: '2024-12-25T10:00:00',
    };
    
    render(<ConfirmationPage appointmentDetails={appointmentWithStringDate} />);
    
    // Should still render correctly - time and duration together
    expect(screen.getByText('10:00 AM (30 minutes)')).toBeInTheDocument();
  });

  it('tracks calendar add events with analytics', () => {
    // Mock window.open to prevent navigation
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    
    // Mock gtag
    const gtagSpy = vi.fn();
    (window as unknown as { gtag: typeof gtagSpy }).gtag = gtagSpy;
    
    const calendarLinks: CalendarLink[] = [
      { type: 'google', url: 'https://calendar.google.com/add' },
    ];
    
    render(
      <ConfirmationPage 
        appointmentDetails={mockAppointmentDetails}
        calendarLinks={calendarLinks}
      />
    );
    
    const googleCalendarLink = screen.getByText(/Google Calendar/i);
    fireEvent.click(googleCalendarLink);
    
    expect(openSpy).toHaveBeenCalledWith('https://calendar.google.com/add', '_blank');
    expect(gtagSpy).toHaveBeenCalledWith('event', 'calendar_add', expect.objectContaining({
      calendar_type: 'google',
    }));
    
    openSpy.mockRestore();
  });
});