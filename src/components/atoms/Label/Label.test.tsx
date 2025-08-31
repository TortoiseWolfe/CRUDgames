import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders with children', () => {
    render(<Label>Label text</Label>);
    expect(screen.getByText('Label text')).toBeInTheDocument();
  });

  it('associates with form control via htmlFor', () => {
    render(<Label htmlFor="input-id">Input Label</Label>);
    const label = screen.getByText('Input Label');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('renders required indicator', () => {
    render(<Label required>Required Field</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it.skip('renders optional indicator', () => {
    render(<Label optional>Optional Field</Label>);
    expect(screen.getByText('(optional)')).toBeInTheDocument();
    expect(screen.getByText('(optional)')).toHaveClass('text-gray-500');
  });

  it.skip('renders helper text', () => {
    render(<Label helperText="Additional information">Field Label</Label>);
    expect(screen.getByText('Additional information')).toBeInTheDocument();
    expect(screen.getByText('Additional information')).toHaveClass('text-gray-600');
  });

  it('renders error state', () => {
    render(<Label error={true}>Error Field</Label>);
    expect(screen.getByText('Error Field')).toHaveClass('text-red-700');
  });

  it.skip('renders error state with message', () => {
    render(<Label error="Field is invalid">Error Field</Label>);
    expect(screen.getByText('Field is invalid')).toBeInTheDocument();
    expect(screen.getByText('Field is invalid')).toHaveClass('text-red-600');
    expect(screen.getByText('Error Field')).toHaveClass('text-red-700');
  });

  it('renders without error state', () => {
    render(<Label error={false}>Normal Field</Label>);
    expect(screen.getByText('Normal Field')).toHaveClass('text-gray-700');
  });

  it('renders disabled state', () => {
    render(<Label disabled>Disabled Field</Label>);
    expect(screen.getByText('Disabled Field')).toHaveClass('text-gray-400');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Label size="sm">Small Label</Label>);
    expect(screen.getByText('Small Label')).toHaveClass('text-sm');

    rerender(<Label size="md">Medium Label</Label>);
    expect(screen.getByText('Medium Label')).toHaveClass('text-base');

    rerender(<Label size="lg">Large Label</Label>);
    expect(screen.getByText('Large Label')).toHaveClass('text-lg');
  });

  it('applies custom className', () => {
    render(<Label className="custom-label">Custom Label</Label>);
    expect(screen.getByText('Custom Label').closest('label')).toHaveClass('custom-label');
  });

  it('renders as label element', () => {
    const { container } = render(<Label>Label Element</Label>);
    expect(container.querySelector('label')).toHaveTextContent('Label Element');
  });

  it.skip('renders as different HTML elements', () => {
    const { rerender, container } = render(<Label as="span">Span Label</Label>);
    expect(container.querySelector('span')).toHaveTextContent('Span Label');

    rerender(<Label as="div">Div Label</Label>);
    expect(container.querySelector('div')).toHaveTextContent('Div Label');
  });

  it('combines multiple states', () => {
    render(
      <Label 
        required 
        error={true}
        disabled={false}
      >
        Complex Label
      </Label>
    );
    
    expect(screen.getByText('Complex Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('Complex Label')).toHaveClass('text-red-700');
  });

  it('renders children elements', () => {
    render(
      <Label>
        <span data-testid="icon">📧</span>
        Email Address
      </Label>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('has correct semantic structure', () => {
    const { container } = render(
      <Label htmlFor="test-input">
        Test Label
      </Label>
    );
    
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-input');
  });
});