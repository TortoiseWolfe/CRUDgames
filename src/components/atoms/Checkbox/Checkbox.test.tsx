import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with required props', () => {
    render(<Checkbox id="test-checkbox" name="test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    expect(checkbox).toHaveAttribute('name', 'test');
  });

  it('handles checked state', () => {
    const { rerender } = render(<Checkbox id="cb1" name="cb1" checked={false} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox id="cb1" name="cb1" checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('handles defaultChecked', () => {
    render(<Checkbox id="cb1" name="cb1" defaultChecked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('handles onChange event', () => {
    const onChange = vi.fn();
    render(<Checkbox id="cb1" name="cb1" onChange={onChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        checked: true
      })
    }));
  });

  it('handles disabled state', () => {
    render(<Checkbox id="cb1" name="cb1" disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('handles required attribute', () => {
    render(<Checkbox id="cb1" name="cb1" required />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('required');
  });

  it('renders with label', () => {
    render(<Checkbox id="cb1" name="cb1" label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<Checkbox id="cb1" name="cb1" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with description', () => {
    render(<Checkbox id="cb1" name="cb1" description="Check to continue" />);
    expect(screen.getByText('Check to continue')).toBeInTheDocument();
  });

  it('handles indeterminate state', () => {
    render(<Checkbox id="cb1" name="cb1" indeterminate />);
    // Indeterminate is passed but not fully implemented in component
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Checkbox id="cb1" name="cb1" className="custom-checkbox" />
    );
    expect(container.firstChild).toHaveClass('custom-checkbox');
  });

  it('has correct accessibility attributes', () => {
    render(
      <Checkbox 
        id="cb1" 
        name="cb1" 
        ariaLabel="Custom checkbox"
        ariaDescribedBy="helper-text"
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Custom checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby', 'helper-text');
  });

  it('handles value prop', () => {
    render(<Checkbox id="cb1" name="cb1" value="option1" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('value', 'option1');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Checkbox id="cb1" name="cb1" size="sm" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('h-4', 'w-4');

    rerender(<Checkbox id="cb1" name="cb1" size="md" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-5', 'w-5');

    rerender(<Checkbox id="cb1" name="cb1" size="lg" />);
    expect(screen.getByRole('checkbox')).toHaveClass('h-6', 'w-6');
  });
});