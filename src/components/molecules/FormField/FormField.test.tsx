import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders children content', () => {
    render(
      <FormField>
        <input type="text" placeholder="Test input" />
      </FormField>
    );
    
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(
      <FormField label="Email Address">
        <input type="email" />
      </FormField>
    );
    
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <FormField label="Name" required>
        <input type="text" />
      </FormField>
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('associates label with input via id', () => {
    render(
      <FormField label="Username" id="username-field">
        <input type="text" id="username-field" />
      </FormField>
    );
    
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username-field');
  });

  it('shows error message with icon', () => {
    render(
      <FormField error="This field is required">
        <input type="text" />
      </FormField>
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    const errorContainer = screen.getByText('This field is required').parentElement;
    expect(errorContainer).toHaveClass('text-red-600');
  });

  it('shows success message with icon', () => {
    render(
      <FormField success="Email verified successfully">
        <input type="email" />
      </FormField>
    );
    
    expect(screen.getByText('Email verified successfully')).toBeInTheDocument();
    const successContainer = screen.getByText('Email verified successfully').parentElement;
    expect(successContainer).toHaveClass('text-green-600');
  });

  it('shows hint message with icon', () => {
    render(
      <FormField hint="Enter your full legal name">
        <input type="text" />
      </FormField>
    );
    
    expect(screen.getByText('Enter your full legal name')).toBeInTheDocument();
    const hintContainer = screen.getByText('Enter your full legal name').parentElement;
    expect(hintContainer).toHaveClass('text-gray-500');
  });

  it('prioritizes error over success and hint', () => {
    render(
      <FormField 
        error="Error message"
        success="Success message"
        hint="Hint message"
      >
        <input type="text" />
      </FormField>
    );
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    expect(screen.queryByText('Hint message')).not.toBeInTheDocument();
  });

  it('prioritizes success over hint when no error', () => {
    render(
      <FormField 
        success="Success message"
        hint="Hint message"
      >
        <input type="text" />
      </FormField>
    );
    
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.queryByText('Hint message')).not.toBeInTheDocument();
  });

  it('renders with horizontal orientation', () => {
    const { container } = render(
      <FormField label="Email" orientation="horizontal">
        <input type="email" />
      </FormField>
    );
    
    const formField = container.querySelector('.form-field');
    expect(formField).toHaveClass('sm:grid', 'sm:grid-cols-3');
  });

  it('renders with vertical orientation by default', () => {
    const { container } = render(
      <FormField label="Email">
        <input type="email" />
      </FormField>
    );
    
    const formField = container.querySelector('.form-field');
    expect(formField).not.toHaveClass('sm:grid');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormField className="custom-field">
        <input type="text" />
      </FormField>
    );
    
    expect(container.querySelector('.custom-field')).toBeInTheDocument();
  });

  it('applies custom labelClassName', () => {
    render(
      <FormField label="Test" labelClassName="custom-label">
        <input type="text" />
      </FormField>
    );
    
    const label = screen.getByText('Test').closest('label');
    expect(label).toHaveClass('custom-label');
  });

  it('applies custom messageClassName', () => {
    render(
      <FormField error="Error" messageClassName="custom-message">
        <input type="text" />
      </FormField>
    );
    
    const messageContainer = screen.getByText('Error').closest('.custom-message');
    expect(messageContainer).toBeInTheDocument();
  });

  it('renders without label', () => {
    const { container } = render(
      <FormField error="Error message">
        <input type="text" />
      </FormField>
    );
    
    expect(container.querySelector('label')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('handles multiple children', () => {
    render(
      <FormField label="Date Range">
        <input type="date" placeholder="Start date" />
        <input type="date" placeholder="End date" />
      </FormField>
    );
    
    expect(screen.getByPlaceholderText('Start date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('End date')).toBeInTheDocument();
  });
});