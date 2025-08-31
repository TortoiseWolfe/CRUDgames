import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('catches errors and displays error UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/Oops! Something went wrong/)).toBeInTheDocument();
    expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onError = vi.fn();
    
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Test error message' }),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });

  it('uses custom fallback when provided', () => {
    const customFallback = (error: Error, resetError: () => void) => (
      <div>
        <p>Custom error: {error.message}</p>
        <button onClick={resetError}>Reset</button>
      </div>
    );
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Custom error: Test error message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('resets error state when retry button is clicked', () => {
    let shouldThrow = true;
    
    const DynamicThrowError = () => {
      if (shouldThrow) {
        throw new Error('Test error message');
      }
      return <div>No error</div>;
    };
    
    const { rerender } = render(
      <ErrorBoundary>
        <DynamicThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/Oops! Something went wrong/)).toBeInTheDocument();
    
    // Change the condition so it won't throw
    shouldThrow = false;
    
    // Click retry button to reset error boundary
    const retryButton = screen.getByRole('button', { name: /Try Again/i });
    fireEvent.click(retryButton);
    
    // Force a rerender
    rerender(
      <ErrorBoundary>
        <DynamicThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('shows error details when showDetails is true', () => {
    // Use showDebugInfo prop instead of manipulating NODE_ENV
    
    render(
      <ErrorBoundary showDetails={true} showDebugInfo={true}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Should show details summary when showDebugInfo is true
    const detailsSummary = screen.getByText(/Error details \(development only\)/);
    expect(detailsSummary).toBeInTheDocument();
  });

  it('hides error details when showDetails is false', () => {
    render(
      <ErrorBoundary showDetails={false}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Should not show details button
    expect(screen.queryByRole('button', { name: /Show details/i })).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ErrorBoundary className="custom-error-boundary">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(container.querySelector('.custom-error-boundary')).toBeInTheDocument();
  });

  it('logs error when showDebugInfo is true', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    
    render(
      <ErrorBoundary showDebugInfo={true}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Check that console.error was called (React will call it multiple times)
    expect(consoleSpy).toHaveBeenCalled();
    
    // Find the specific call from ErrorBoundary
    const errorBoundaryCall = consoleSpy.mock.calls.find(call => 
      call[0] === 'ErrorBoundary caught an error:'
    );
    expect(errorBoundaryCall).toBeDefined();
    expect(errorBoundaryCall?.[1]).toMatchObject({ message: 'Test error message' });
    
    consoleSpy.mockRestore();
  });
});