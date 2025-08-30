import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ErrorBoundary } from './ErrorBoundary';
import { Button } from '@/components/atoms/Button';

const meta = {
  title: 'Molecules/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Error boundary component that catches JavaScript errors and displays a fallback UI.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error: This is an intentional error for demonstration');
  }
  return (
    <div className="p-8 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800">Everything is working!</h3>
      <p className="text-green-600">No errors detected.</p>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: <ThrowError shouldThrow={false} />,
  },
};

export const WithError: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
  },
};

export const WithDetails: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    showDetails: true,
  },
};

export const CustomFallback: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    fallback: (error, resetError) => (
      <div className="p-8 bg-blue-50 rounded-lg text-center">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Custom Error Handler</h3>
        <p className="text-blue-700 mb-4">Error: {error.message}</p>
        <Button onClick={resetError} variant="primary">
          Reset Application
        </Button>
      </div>
    ),
  },
};

export const WithErrorHandler: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    onError: (error, errorInfo) => {
      console.log('Custom error handler called:', error.message);
      console.log('Component stack:', errorInfo.componentStack);
    },
  },
};

export const Interactive: Story = {
  args: {
    showDetails: true,
    children: null, // Will be overridden by render
  },
  render: () => {
    const BuggyCounter = () => {
      const [count, setCount] = useState(0);
      
      if (count === 3) {
        throw new Error('Count reached 3! Application crashed!');
      }
      
      return (
        <div className="p-4 text-center">
          <p className="mb-4">Click the button 3 times to trigger an error</p>
          <p className="text-2xl font-bold mb-4">Count: {count}</p>
          <Button onClick={() => setCount(count + 1)}>
            Increment ({3 - count} clicks until error)
          </Button>
        </div>
      );
    };

    return (
      <ErrorBoundary showDetails={true}>
        <BuggyCounter />
      </ErrorBoundary>
    );
  },
};

// Need to import useState for the Interactive story
import { useState } from 'react';