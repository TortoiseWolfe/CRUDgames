'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Clock } from 'lucide-react';

export interface RateLimiterProps {
  maxAttempts?: number;
  windowMs?: number;
  storageKey?: string;
  onLimitExceeded?: () => void;
  children: (props: {
    canProceed: boolean;
    attemptsRemaining: number;
    resetTime: Date | null;
    recordAttempt: () => void;
    reset: () => void;
  }) => React.ReactNode;
}

interface RateLimitData {
  attempts: number;
  windowStart: number;
}

export function RateLimiter({
  maxAttempts = 3,
  windowMs = 60000, // 1 minute default
  storageKey = 'rate_limit',
  onLimitExceeded,
  children,
}: RateLimiterProps) {
  const [attempts, setAttempts] = useState(0);
  const [windowStart, setWindowStart] = useState<number>(Date.now());
  const [resetTime, setResetTime] = useState<Date | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const data: RateLimitData = JSON.parse(stored);
        const now = Date.now();
        
        // Check if window has expired
        if (now - data.windowStart < windowMs) {
          setAttempts(data.attempts);
          setWindowStart(data.windowStart);
          setResetTime(new Date(data.windowStart + windowMs));
        } else {
          // Window expired, reset
          localStorage.removeItem(storageKey);
        }
      } catch (e) {
        console.error('Failed to parse rate limit data:', e);
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey, windowMs]);

  // Save to localStorage when attempts change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (attempts > 0) {
      const data: RateLimitData = {
        attempts,
        windowStart,
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [attempts, windowStart, storageKey]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    
    // Check if window has expired
    if (now - windowStart >= windowMs) {
      // Reset window
      setAttempts(1);
      setWindowStart(now);
      setResetTime(new Date(now + windowMs));
    } else {
      // Increment attempts in current window
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= maxAttempts && onLimitExceeded) {
        onLimitExceeded();
      }
    }
  }, [attempts, windowStart, windowMs, maxAttempts, onLimitExceeded]);

  const reset = useCallback(() => {
    setAttempts(0);
    setWindowStart(Date.now());
    setResetTime(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const canProceed = attempts < maxAttempts;
  const attemptsRemaining = Math.max(0, maxAttempts - attempts);

  return (
    <>
      {children({
        canProceed,
        attemptsRemaining,
        resetTime,
        recordAttempt,
        reset,
      })}
    </>
  );
}

export interface RateLimitMessageProps {
  attemptsRemaining: number;
  resetTime: Date | null;
  variant?: 'warning' | 'error';
}

export function RateLimitMessage({ 
  attemptsRemaining, 
  resetTime,
  variant = 'warning' 
}: RateLimitMessageProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!resetTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = resetTime.getTime() - now;
      
      if (diff <= 0) {
        setTimeRemaining('');
        clearInterval(interval);
      } else {
        const seconds = Math.ceil(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes > 0) {
          setTimeRemaining(`${minutes}m ${remainingSeconds}s`);
        } else {
          setTimeRemaining(`${remainingSeconds}s`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resetTime]);

  if (attemptsRemaining === 0) {
    return (
      <div className={`p-4 rounded-lg flex items-start gap-3 ${
        variant === 'error' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'
      }`}>
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold">Too many attempts</p>
          <p className="text-sm mt-1">
            Please wait {timeRemaining || 'a moment'} before trying again.
          </p>
        </div>
      </div>
    );
  }

  if (attemptsRemaining <= 2) {
    return (
      <div className="p-4 bg-blue-50 text-blue-800 rounded-lg flex items-start gap-3">
        <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm">
            {attemptsRemaining} {attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining
          </p>
        </div>
      </div>
    );
  }

  return null;
}