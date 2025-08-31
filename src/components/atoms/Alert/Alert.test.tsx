import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders with default props', () => {
    render(<Alert variant="info">Default alert message</Alert>);
    expect(screen.getByText('Default alert message')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Alert variant="info">Info message</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50', 'border-blue-200');

    rerender(<Alert variant="success">Success message</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50', 'border-green-200');

    rerender(<Alert variant="warning">Warning message</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50', 'border-yellow-200');

    rerender(<Alert variant="error">Error message</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50', 'border-red-200');
  });

  it('renders with title', () => {
    render(<Alert variant="info" title="Alert Title">Alert content</Alert>);
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert Title')).toHaveClass('font-medium');
  });

  it('renders with icon', () => {
    render(<Alert variant="info" icon={<span data-testid="custom-icon">🔔</span>}>Alert with icon</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('handles dismissible alerts', () => {
    const onDismiss = vi.fn();
    render(
      <Alert variant="info" dismissible onDismiss={onDismiss}>
        Dismissible alert
      </Alert>
    );

    const closeButton = screen.getByRole('button', { name: /dismiss/i });
    expect(closeButton).toBeInTheDocument();
    
    fireEvent.click(closeButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it.skip('renders action buttons', () => {
    const onAction = vi.fn();
    render(
      <Alert
        variant="info"
        action={{
          label: 'Take Action',
          onClick: onAction,
        }}
      >
        Alert with action
      </Alert>
    );

    const actionButton = screen.getByRole('button', { name: 'Take Action' });
    expect(actionButton).toBeInTheDocument();
    
    fireEvent.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('handles auto hide', async () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(
      <Alert variant="warning" autoHide autoHideDelay={1000} onDismiss={onDismiss}>
        Auto-hiding alert
      </Alert>
    );

    expect(screen.getByText('Auto-hiding alert')).toBeInTheDocument();
    
    vi.advanceTimersByTime(1000);
    await vi.runAllTimers();
    
    expect(onDismiss).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('renders in compact mode', () => {
    render(<Alert variant="success" compact>Compact alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('p-3');
  });

  it('applies custom className', () => {
    render(<Alert variant="error" className="custom-alert">Custom styled alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-alert');
  });

  it('has correct accessibility attributes', () => {
    render(<Alert variant="error">Error alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('role', 'alert');
  });

  it('renders children content correctly', () => {
    render(
      <Alert variant="info">
        <div data-testid="child-1">First child</div>
        <div data-testid="child-2">Second child</div>
      </Alert>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});