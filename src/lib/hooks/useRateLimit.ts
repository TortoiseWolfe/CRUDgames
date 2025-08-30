import { useState, useCallback, useEffect } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  key: string;
}

export function useRateLimit({ maxAttempts, windowMs, key }: RateLimitConfig) {
  const [attempts, setAttempts] = useState(0);
  const [isLimited, setIsLimited] = useState(false);
  const [resetTime, setResetTime] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`rateLimit_${key}`);
    if (stored) {
      const data = JSON.parse(stored);
      const now = Date.now();
      
      if (now < data.resetTime) {
        setAttempts(data.attempts);
        setResetTime(data.resetTime);
        setIsLimited(data.attempts >= maxAttempts);
      } else {
        localStorage.removeItem(`rateLimit_${key}`);
      }
    }
  }, [key, maxAttempts]);

  const checkLimit = useCallback(() => {
    const now = Date.now();
    
    if (resetTime && now >= resetTime) {
      setAttempts(0);
      setIsLimited(false);
      setResetTime(null);
      localStorage.removeItem(`rateLimit_${key}`);
      return true;
    }

    if (attempts >= maxAttempts) {
      setIsLimited(true);
      return false;
    }

    const newAttempts = attempts + 1;
    const newResetTime = resetTime || now + windowMs;
    
    setAttempts(newAttempts);
    setResetTime(newResetTime);
    setIsLimited(newAttempts >= maxAttempts);
    
    localStorage.setItem(
      `rateLimit_${key}`,
      JSON.stringify({
        attempts: newAttempts,
        resetTime: newResetTime,
      })
    );

    return true;
  }, [attempts, maxAttempts, windowMs, key, resetTime]);

  const reset = useCallback(() => {
    setAttempts(0);
    setIsLimited(false);
    setResetTime(null);
    localStorage.removeItem(`rateLimit_${key}`);
  }, [key]);

  return {
    checkLimit,
    isLimited,
    attempts,
    remainingAttempts: Math.max(0, maxAttempts - attempts),
    resetTime,
    reset,
  };
}