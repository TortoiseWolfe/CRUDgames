import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RateLimiter, RateLimitMessage } from './RateLimiter';
import { Button } from '@/components/atoms/Button';
import { useState } from 'react';

const meta = {
  title: 'Molecules/RateLimiter',
  component: RateLimiter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Rate limiting component to prevent spam and abuse. Tracks attempts and enforces time-based limits.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RateLimiter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxAttempts: 3,
    windowMs: 30000,
    children: ({ canProceed, attemptsRemaining, resetTime, recordAttempt }) => (
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            Attempts remaining: <strong>{attemptsRemaining}</strong>
          </p>
          {resetTime && (
            <p className="text-sm text-gray-600">
              Resets at: {resetTime.toLocaleTimeString()}
            </p>
          )}
        </div>
        
        <Button
          onClick={recordAttempt}
          disabled={!canProceed}
          variant={canProceed ? 'primary' : 'secondary'}
        >
          {canProceed ? 'Submit Form' : 'Rate Limited'}
        </Button>
        
        <RateLimitMessage 
          attemptsRemaining={attemptsRemaining}
          resetTime={resetTime}
        />
      </div>
    ),
  },
};

export const FormExample: Story = {
  args: {
    maxAttempts: 3,
    windowMs: 60000,
    onLimitExceeded: () => console.log('Rate limit exceeded!'),
    children: () => null, // Will be overridden by render
  },
  render: (args) => {
    const [submitted, setSubmitted] = useState(false);
    
    return (
      <RateLimiter {...args}>
        {({ canProceed, attemptsRemaining, resetTime, recordAttempt, reset }) => (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (canProceed) {
                recordAttempt();
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 3000);
              }
            }}
            className="w-full max-w-md space-y-4 p-6 bg-white rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">Contact Form</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />
            </div>
            
            <RateLimitMessage 
              attemptsRemaining={attemptsRemaining}
              resetTime={resetTime}
              variant={attemptsRemaining === 0 ? 'error' : 'warning'}
            />
            
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!canProceed}
                variant="primary"
                className="flex-1"
              >
                {canProceed ? `Submit (${attemptsRemaining} left)` : 'Rate Limited'}
              </Button>
              
              <Button
                type="button"
                onClick={reset}
                variant="secondary"
              >
                Reset
              </Button>
            </div>
            
            {submitted && (
              <div className="p-3 bg-green-50 text-green-800 rounded">
                Form submitted successfully!
              </div>
            )}
          </form>
        )}
      </RateLimiter>
    );
  },
};

export const ShortWindow: Story = {
  args: {
    maxAttempts: 2,
    windowMs: 10000,
    children: ({ canProceed, attemptsRemaining, resetTime, recordAttempt }) => (
      <div className="space-y-4 p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold">Quick Reset Demo</h3>
        <p className="text-sm text-gray-600">
          2 attempts allowed, resets after 10 seconds
        </p>
        
        <Button
          onClick={recordAttempt}
          disabled={!canProceed}
          variant="primary"
          className="w-full"
        >
          Click Me ({attemptsRemaining} attempts left)
        </Button>
        
        <RateLimitMessage 
          attemptsRemaining={attemptsRemaining}
          resetTime={resetTime}
        />
      </div>
    ),
  },
};

export const CustomStorage: Story = {
  args: {
    maxAttempts: 3,
    windowMs: 30000,
    children: () => null, // Will be overridden by render
  },
  render: () => (
    <div className="space-y-6">
      <RateLimiter 
        maxAttempts={3} 
        windowMs={30000}
        storageKey="form_a_limit"
      >
        {({ canProceed, attemptsRemaining, recordAttempt }) => (
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-3">Form A</h3>
            <Button
              onClick={recordAttempt}
              disabled={!canProceed}
              variant="primary"
            >
              Submit Form A ({attemptsRemaining} left)
            </Button>
          </div>
        )}
      </RateLimiter>
      
      <RateLimiter 
        maxAttempts={3} 
        windowMs={30000}
        storageKey="form_b_limit"
      >
        {({ canProceed, attemptsRemaining, recordAttempt }) => (
          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="font-semibold mb-3">Form B</h3>
            <Button
              onClick={recordAttempt}
              disabled={!canProceed}
              variant="primary"
            >
              Submit Form B ({attemptsRemaining} left)
            </Button>
          </div>
        )}
      </RateLimiter>
      
      <p className="text-sm text-gray-600 text-center">
        Each form has independent rate limiting
      </p>
    </div>
  ),
};