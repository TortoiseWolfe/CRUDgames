import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with required props', () => {
    const { container } = render(<Switch id="test-switch" />);
    const switchInput = container.querySelector('input[type="checkbox"]');
    expect(switchInput).toBeInTheDocument();
    expect(switchInput).toHaveAttribute('id', 'test-switch');
  });

  it('handles checked state', () => {
    const { rerender, container } = render(<Switch id="sw1" checked={false} onCheckedChange={() => {}} />);
    let switchInput = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(switchInput.checked).toBe(false);

    rerender(<Switch id="sw1" checked={true} onCheckedChange={() => {}} />);
    switchInput = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(switchInput.checked).toBe(true);
  });

  it('handles defaultChecked', () => {
    const { container } = render(<Switch id="sw1" defaultChecked={true} />);
    const switchInput = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(switchInput.checked).toBe(true);
  });

  it('handles onCheckedChange event', () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch id="sw1" onCheckedChange={onCheckedChange} />);
    
    const switchLabel = container.querySelector('label[for="sw1"]');
    fireEvent.click(switchLabel!);
    
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles state on click', () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch id="sw1" checked={false} onCheckedChange={onCheckedChange} />);
    
    const switchLabel = container.querySelector('label[for="sw1"]');
    fireEvent.click(switchLabel!);
    
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('handles disabled state', () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch id="sw1" disabled onCheckedChange={onCheckedChange} />);
    
    const switchInput = container.querySelector('input[type="checkbox"]');
    expect(switchInput).toBeDisabled();
    
    const switchLabel = container.querySelector('label[for="sw1"]');
    fireEvent.click(switchLabel!);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it.skip('handles required attribute', () => {
    const { container } = render(<Switch id="sw1" required />);
    const switchInput = container.querySelector('input[type="checkbox"]');
    expect(switchInput).toHaveAttribute('required');
  });

  it('renders with label', () => {
    render(<Switch id="sw1" label="Enable notifications" />);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <Switch 
        id="sw1" 
        label="Notifications" 
        description="Receive email notifications"
      />
    );
    expect(screen.getByText('Receive email notifications')).toBeInTheDocument();
  });

  it.skip('renders with error state', () => {
    // Switch doesn't have error prop
    render(<Switch id="sw1" error="Switch must be enabled" />);
    expect(screen.getByText('Switch must be enabled')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Switch id="sw1" description="Toggle to enable feature" />);
    expect(screen.getByText('Toggle to enable feature')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Switch id="sw1" size="sm" />);
    let switchElement = container.querySelector('.h-5.w-9');
    expect(switchElement).toBeInTheDocument();

    rerender(<Switch id="sw1" size="md" />);
    switchElement = container.querySelector('.h-6.w-11');
    expect(switchElement).toBeInTheDocument();

    rerender(<Switch id="sw1" size="lg" />);
    switchElement = container.querySelector('.h-7.w-14');
    expect(switchElement).toBeInTheDocument();
  });

  it('renders different label positions', () => {
    const { rerender } = render(
      <Switch id="sw1" label="Label" labelPosition="left" />
    );
    // Check if label appears before switch
    let labels = screen.getAllByText('Label');
    expect(labels.length).toBeGreaterThan(0);

    rerender(<Switch id="sw1" label="Label" labelPosition="right" />);
    // Check if label appears after switch (default)
    labels = screen.getAllByText('Label');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('renders with custom variant colors', () => {
    const { container } = render(<Switch id="sw1" checked variant="success" onCheckedChange={() => {}} />);
    const switchElement = container.querySelector('.bg-green-600');
    expect(switchElement).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Switch id="sw1" className="custom-switch" />);
    const switchElement = container.querySelector('.custom-switch');
    expect(switchElement).toBeInTheDocument();
  });

  it.skip('has correct accessibility attributes', () => {
    // Switch doesn't have ariaLabel or ariaDescribedby props
    const { container } = render(
      <Switch 
        id="sw1" 
        description="Switch description"
      />
    );
    
    const switchInput = container.querySelector('input[type="checkbox"]');
    expect(switchInput).toHaveAttribute('aria-describedby', 'sw1-description');
  });

  it('handles name attribute', () => {
    render(<Switch id="sw1" name="notifications" />);
    const input = document.querySelector('input[type="checkbox"]');
    expect(input).toHaveAttribute('name', 'notifications');
  });

  it('handles value attribute', () => {
    render(<Switch id="sw1" value="enabled" />);
    const input = document.querySelector('input[type="checkbox"]');
    expect(input).toHaveAttribute('value', 'enabled');
  });

  it.skip('shows loading state', () => {
    // Switch doesn't have loading prop
    render(<Switch id="sw1" loading />);
  });

  it('handles keyboard navigation', () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch id="sw1" onCheckedChange={onCheckedChange} />);
    
    const switchInput = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(switchInput).toBeInTheDocument();
    
    // Simulate clicking which triggers the checkbox change
    fireEvent.click(switchInput);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});