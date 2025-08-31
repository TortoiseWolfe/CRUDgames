import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with required props', () => {
    render(<Input id="test-input" name="test" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'test');
  });

  it('renders different input types', () => {
    const { rerender } = render(<Input id="i1" name="i1" type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input id="i2" name="i2" type="password" />);
    const passwordInput = document.getElementById('i2');
    expect(passwordInput).toHaveAttribute('type', 'password');

    rerender(<Input id="i3" name="i3" type="number" />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');

    rerender(<Input id="i4" name="i4" type="tel" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');

    rerender(<Input id="i5" name="i5" type="url" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  it('handles value and defaultValue', () => {
    const { unmount } = render(<Input id="i1" name="i1" value="controlled" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('controlled');
    unmount();

    render(<Input id="i2" name="i2" defaultValue="uncontrolled" />);
    expect(screen.getByRole('textbox')).toHaveValue('uncontrolled');
  });

  it('handles onChange event', () => {
    const onChange = vi.fn();
    render(<Input id="i1" name="i1" onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'new value'
      })
    }));
  });

  it('handles onFocus and onBlur events', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<Input id="i1" name="i1" onFocus={onFocus} onBlur={onBlur} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    render(<Input id="i1" name="i1" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('handles required attribute', () => {
    render(<Input id="i1" name="i1" required />);
    expect(screen.getByRole('textbox')).toHaveAttribute('required');
  });

  it('handles readonly state', () => {
    render(<Input id="i1" name="i1" readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('renders with placeholder', () => {
    render(<Input id="i1" name="i1" placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input id="i1" name="i1" label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<Input id="i1" name="i1" error="Invalid input" />);
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('border-red-500');
  });

  it('renders with success state', () => {
    render(<Input id="i1" name="i1" success />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-green-500');
  });

  it('renders with helper text', () => {
    render(<Input id="i1" name="i1" helperText="Enter your email" />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('renders with left and right icons', () => {
    render(
      <Input 
        id="i1" 
        name="i1" 
        leftIcon={<span data-testid="left-icon">👤</span>}
        rightIcon={<span data-testid="right-icon">✓</span>}
      />
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Input id="i1" name="i1" size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-10');

    rerender(<Input id="i1" name="i1" size="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-11');

    rerender(<Input id="i1" name="i1" size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Input id="i1" name="i1" variant="default" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-white');

    rerender(<Input id="i1" name="i1" variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-gray-50');
  });

  it('handles loading state', () => {
    render(<Input id="i1" name="i1" loading />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Input id="i1" name="i1" className="custom-input" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-input');
  });

  it('has correct accessibility attributes', () => {
    render(
      <Input 
        id="i1" 
        name="i1" 
        ariaLabel="Custom input"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Custom input');
  });

  it('handles aria-describedby', () => {
    render(
      <Input 
        id="i1" 
        name="i1" 
        ariaDescribedby="helper"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'helper');
  });

  it('handles min, max, and step for number inputs', () => {
    render(
      <Input 
        id="i1" 
        name="i1" 
        type="number" 
        min={0} 
        max={100} 
        step={5} 
      />
    );
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
    expect(input).toHaveAttribute('step', '5');
  });

  it('handles maxLength', () => {
    render(<Input id="i1" name="i1" maxLength={10} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
  });
});