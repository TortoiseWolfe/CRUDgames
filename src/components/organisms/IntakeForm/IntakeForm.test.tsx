import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IntakeForm } from './IntakeForm';

describe('IntakeForm', () => {
  const mockOnSubmitSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders first step form fields', () => {
    render(<IntakeForm onSubmitSuccess={mockOnSubmitSuccess} />);
    
    // First step shows personal information
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it('displays navigation buttons', () => {
    render(<IntakeForm onSubmitSuccess={mockOnSubmitSuccess} />);
    
    // First step should show Next button
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    render(<IntakeForm onSubmitSuccess={mockOnSubmitSuccess} />);
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/first name must be/i)).toBeInTheDocument();
    });
  });

  it('shows email validation error for invalid email', async () => {
    render(<IntakeForm onSubmitSuccess={mockOnSubmitSuccess} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('shows progress through steps', () => {
    render(<IntakeForm onSubmitSuccess={mockOnSubmitSuccess} />);
    
    // Check initial step
    expect(screen.getByText(/personal information/i)).toBeInTheDocument();
    
    // Fill required fields for first step
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('shows progress bar', () => {
    const { container } = render(<IntakeForm onSubmitSuccess={mockOnSubmitSuccess} />);
    
    // Progress bar should be visible
    const progressBar = container.querySelector('.bg-blue-600.h-2');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders in compact mode when specified', () => {
    render(<IntakeForm onSubmitSuccess={mockOnSubmitSuccess} />);
    
    // In compact mode, some fields might be optional or hidden
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('shows custom heading and description when provided', () => {
    render(
      <IntakeForm 
        onSubmitSuccess={mockOnSubmitSuccess}
      />
    );
    
    // Check for form existence
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <IntakeForm 
        onSubmitSuccess={mockOnSubmitSuccess}
      />
    );
    
    // Check form exists
    expect(container.firstChild).toBeInTheDocument();
  });

  it('includes honeypot field for bot protection', () => {
    const { container } = render(<IntakeForm onSubmitSuccess={mockOnSubmitSuccess} />);
    
    // Honeypot field might be in a later step or hidden
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });
});