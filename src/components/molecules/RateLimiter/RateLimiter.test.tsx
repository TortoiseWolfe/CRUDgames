import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { RateLimiter } from './RateLimiter';

describe('RateLimiter', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children function with initial state', () => {
    render(
      <RateLimiter>
        {({ canProceed, attemptsRemaining }) => (
          <div>
            <span>Can proceed: {canProceed.toString()}</span>
            <span>Attempts remaining: {attemptsRemaining}</span>
          </div>
        )}
      </RateLimiter>
    );
    
    expect(screen.getByText('Can proceed: true')).toBeInTheDocument();
    expect(screen.getByText('Attempts remaining: 3')).toBeInTheDocument();
  });

  it('tracks attempts and updates state', () => {
    render(
      <RateLimiter maxAttempts={3}>
        {({ canProceed, attemptsRemaining, recordAttempt }) => (
          <div>
            <span>Can proceed: {canProceed.toString()}</span>
            <span>Attempts remaining: {attemptsRemaining}</span>
            <button onClick={recordAttempt}>Submit</button>
          </div>
        )}
      </RateLimiter>
    );
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    // First attempt
    fireEvent.click(submitButton);
    expect(screen.getByText('Attempts remaining: 2')).toBeInTheDocument();
    expect(screen.getByText('Can proceed: true')).toBeInTheDocument();
    
    // Second attempt
    fireEvent.click(submitButton);
    expect(screen.getByText('Attempts remaining: 1')).toBeInTheDocument();
    expect(screen.getByText('Can proceed: true')).toBeInTheDocument();
    
    // Third attempt - should block after this
    fireEvent.click(submitButton);
    expect(screen.getByText('Attempts remaining: 0')).toBeInTheDocument();
    expect(screen.getByText('Can proceed: false')).toBeInTheDocument();
  });

  it('calls onLimitExceeded when limit is reached', () => {
    const onLimitExceeded = vi.fn();
    
    render(
      <RateLimiter maxAttempts={2} onLimitExceeded={onLimitExceeded}>
        {({ recordAttempt }) => (
          <button onClick={recordAttempt}>Submit</button>
        )}
      </RateLimiter>
    );
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    fireEvent.click(submitButton); // First attempt
    expect(onLimitExceeded).not.toHaveBeenCalled();
    
    fireEvent.click(submitButton); // Second attempt - reaches limit
    expect(onLimitExceeded).toHaveBeenCalledTimes(1);
  });

  it.skip('stores attempts in localStorage', async () => {
    const storageKey = 'test_rate_limit_' + Date.now();
    
    render(
      <RateLimiter storageKey={storageKey} maxAttempts={3}>
        {({ recordAttempt, attemptsRemaining }) => (
          <>
            <button onClick={recordAttempt}>Submit</button>
            <span data-testid="attempts">{attemptsRemaining}</span>
          </>
        )}
      </RateLimiter>
    );
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    // Record an attempt
    act(() => {
      fireEvent.click(submitButton);
    });
    
    // Wait for localStorage to be updated
    await waitFor(() => {
      const stored = localStorage.getItem(storageKey);
      expect(stored).toBeTruthy();
      const data = JSON.parse(stored!);
      expect(data.attempts).toBe(1);
    });
    
    localStorage.removeItem(storageKey);
  });

  it.skip('loads state from localStorage on mount', async () => {
    const storageKey = 'test_rate_limit_load_' + Date.now();
    const existingData = {
      attempts: 2,
      windowStart: Date.now(),
    };
    
    localStorage.setItem(storageKey, JSON.stringify(existingData));
    
    render(
      <RateLimiter storageKey={storageKey} maxAttempts={3}>
        {({ attemptsRemaining }) => (
          <span>Attempts remaining: {attemptsRemaining}</span>
        )}
      </RateLimiter>
    );
    
    // Wait for the component to load from localStorage
    await waitFor(() => {
      expect(screen.getByText('Attempts remaining: 1')).toBeInTheDocument();
    });
    
    localStorage.removeItem(storageKey);
  });

  it.skip('resets after time window expires', async () => {
    const windowMs = 1000; // 1 second window
    
    render(
      <RateLimiter maxAttempts={2} windowMs={windowMs}>
        {({ canProceed, attemptsRemaining, recordAttempt }) => (
          <div>
            <span>Can proceed: {canProceed.toString()}</span>
            <span>Attempts remaining: {attemptsRemaining}</span>
            <button onClick={recordAttempt}>Submit</button>
          </div>
        )}
      </RateLimiter>
    );
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    // Use up all attempts
    act(() => {
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
    });
    
    expect(screen.getByText('Can proceed: false')).toBeInTheDocument();
    expect(screen.getByText('Attempts remaining: 0')).toBeInTheDocument();
    
    // Advance time past the window
    act(() => {
      vi.advanceTimersByTime(windowMs + 100);
    });
    
    // Click again after window expires - should reset
    act(() => {
      fireEvent.click(submitButton);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Can proceed: true')).toBeInTheDocument();
      expect(screen.getByText('Attempts remaining: 1')).toBeInTheDocument();
    });
  });

  it('provides reset function', () => {
    render(
      <RateLimiter maxAttempts={2}>
        {({ canProceed, attemptsRemaining, recordAttempt, reset }) => (
          <div>
            <span>Can proceed: {canProceed.toString()}</span>
            <span>Attempts remaining: {attemptsRemaining}</span>
            <button onClick={recordAttempt}>Submit</button>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </RateLimiter>
    );
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    
    // Use up attempts
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    expect(screen.getByText('Can proceed: false')).toBeInTheDocument();
    
    // Reset
    fireEvent.click(resetButton);
    expect(screen.getByText('Can proceed: true')).toBeInTheDocument();
    expect(screen.getByText('Attempts remaining: 2')).toBeInTheDocument();
  });

  it.skip('provides resetTime when limit is reached', async () => {
    const windowMs = 60000; // 1 minute
    
    render(
      <RateLimiter maxAttempts={1} windowMs={windowMs}>
        {({ recordAttempt, resetTime, attemptsRemaining }) => (
          <div>
            <button onClick={recordAttempt}>Submit</button>
            <span>Attempts: {attemptsRemaining}</span>
            {resetTime && (
              <span>Reset time: {resetTime.toISOString()}</span>
            )}
          </div>
        )}
      </RateLimiter>
    );
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    // Use up the single attempt
    act(() => {
      fireEvent.click(submitButton);
    });
    
    // Should show reset time after the attempt is recorded
    await waitFor(() => {
      expect(screen.getByText('Attempts: 0')).toBeInTheDocument();
      expect(screen.getByText(/Reset time:/)).toBeInTheDocument();
    });
  });

  it.skip('handles localStorage errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const storageKey = 'test_rate_limit_error_' + Date.now();
    
    // Set invalid JSON in localStorage
    localStorage.setItem(storageKey, 'invalid json');
    
    render(
      <RateLimiter storageKey={storageKey} maxAttempts={3}>
        {({ attemptsRemaining }) => (
          <span>Attempts remaining: {attemptsRemaining}</span>
        )}
      </RateLimiter>
    );
    
    // Should fall back to default state when localStorage has invalid data
    await waitFor(() => {
      expect(screen.getByText('Attempts remaining: 3')).toBeInTheDocument();
    });
    
    // Check that error was logged
    expect(consoleSpy).toHaveBeenCalled();
    
    // Clean up
    localStorage.removeItem(storageKey);
    consoleSpy.mockRestore();
  });

  it.skip('clears expired data from localStorage', async () => {
    const storageKey = 'test_rate_limit_expire_' + Date.now();
    const windowMs = 1000;
    
    // Set old data that should be expired
    const oldData = {
      attempts: 2,
      windowStart: Date.now() - windowMs - 1000, // Expired
    };
    
    localStorage.setItem(storageKey, JSON.stringify(oldData));
    
    render(
      <RateLimiter storageKey={storageKey} windowMs={windowMs} maxAttempts={3}>
        {({ attemptsRemaining }) => (
          <span>Attempts remaining: {attemptsRemaining}</span>
        )}
      </RateLimiter>
    );
    
    // Should reset to default state since data is expired
    await waitFor(() => {
      expect(screen.getByText('Attempts remaining: 3')).toBeInTheDocument();
    });
    
    // Expired data should be removed from localStorage
    await waitFor(() => {
      const stored = localStorage.getItem(storageKey);
      expect(stored).toBeNull();
    });
    
    localStorage.removeItem(storageKey);
  });
});