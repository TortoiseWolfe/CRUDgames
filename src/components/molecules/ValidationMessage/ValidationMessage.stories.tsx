import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ValidationMessage } from './ValidationMessage';
import { Shield, Zap } from 'lucide-react';

const meta = {
  title: 'Molecules/ValidationMessage',
  component: ValidationMessage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A validation message component for displaying form validation feedback, errors, warnings, and success messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success', 'info'],
      description: 'Message variant/type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the message',
    },
    message: {
      control: 'text',
      description: 'Single message to display',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show icon',
    },
    inline: {
      control: 'boolean',
      description: 'Display as inline text',
    },
  },
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is a default validation message',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <ValidationMessage variant="error" message="This is an error message" />
      <ValidationMessage variant="warning" message="This is a warning message" />
      <ValidationMessage variant="success" message="This is a success message" />
      <ValidationMessage variant="info" message="This is an info message" />
      <ValidationMessage variant="default" message="This is a default message" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <ValidationMessage size="sm" variant="info" message="Small validation message" />
      <ValidationMessage size="md" variant="info" message="Medium validation message" />
      <ValidationMessage size="lg" variant="info" message="Large validation message" />
    </div>
  ),
};

export const MultipleMessages: Story = {
  render: () => (
    <div className="space-y-4">
      <ValidationMessage
        variant="error"
        messages={[
          'Password must be at least 8 characters',
          'Password must contain at least one number',
          'Password must contain at least one special character',
        ]}
      />
      <ValidationMessage
        variant="warning"
        messages={[
          'Your session will expire in 5 minutes',
          'Please save your work',
        ]}
      />
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <ValidationMessage variant="error" message="Error without icon" showIcon={false} />
      <ValidationMessage variant="success" message="Success without icon" showIcon={false} />
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <ValidationMessage
        variant="info"
        message="Custom shield icon"
        icon={<Shield className="h-4 w-4" />}
      />
      <ValidationMessage
        variant="warning"
        message="Custom zap icon"
        icon={<Zap className="h-4 w-4" />}
      />
    </div>
  ),
};

export const InlineMessages: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-red-300 rounded"
          placeholder="Enter email"
        />
        <ValidationMessage
          variant="error"
          message="Invalid email address"
          inline
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-green-300 rounded"
          placeholder="Enter username"
          defaultValue="johndoe"
        />
        <ValidationMessage
          variant="success"
          message="Username is available"
          inline
          className="mt-1"
        />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="max-w-md space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Account Registration</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Choose a username"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-red-300 rounded"
          placeholder="Enter your email"
        />
        <ValidationMessage
          variant="error"
          message="This email is already registered"
          inline
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-red-300 rounded"
          placeholder="Create a password"
        />
        <ValidationMessage
          variant="error"
          messages={[
            'Password must be at least 8 characters',
            'Include at least one uppercase letter',
            'Include at least one number',
          ]}
          size="sm"
          className="mt-2"
        />
      </div>
      
      <ValidationMessage
        variant="info"
        message="By registering, you agree to our terms of service and privacy policy"
      />
      
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Account
      </button>
    </form>
  ),
};

export const StatusMessages: Story = {
  render: () => (
    <div className="space-y-4">
      <ValidationMessage variant="success">
        <div>
          <strong>Payment successful!</strong>
          <p className="mt-1">Your order has been confirmed and will be shipped within 24 hours.</p>
        </div>
      </ValidationMessage>
      
      <ValidationMessage variant="warning">
        <div>
          <strong>Limited stock available</strong>
          <p className="mt-1">Only 3 items left in stock. Order soon to avoid disappointment.</p>
        </div>
      </ValidationMessage>
      
      <ValidationMessage variant="error">
        <div>
          <strong>Connection failed</strong>
          <p className="mt-1">Unable to connect to the server. Please check your internet connection and try again.</p>
        </div>
      </ValidationMessage>
      
      <ValidationMessage variant="info">
        <div>
          <strong>New feature available</strong>
          <p className="mt-1">Dark mode is now available in settings. Try it out!</p>
        </div>
      </ValidationMessage>
    </div>
  ),
};

export const PasswordStrength: Story = {
  render: () => {
    const passwordStrengths = [
      { strength: 'Weak', variant: 'error' as const, messages: ['Too short', 'Add numbers and symbols'] },
      { strength: 'Fair', variant: 'warning' as const, messages: ['Add special characters', 'Consider making it longer'] },
      { strength: 'Good', variant: 'info' as const, messages: ['Password is acceptable'] },
      { strength: 'Strong', variant: 'success' as const, messages: ['Excellent password strength!'] },
    ];

    return (
      <div className="space-y-6">
        {passwordStrengths.map(({ strength, variant, messages }) => (
          <div key={strength}>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Password ({strength})</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter password"
              />
            </div>
            <ValidationMessage
              variant={variant}
              messages={messages}
              size="sm"
            />
          </div>
        ))}
      </div>
    );
  },
};