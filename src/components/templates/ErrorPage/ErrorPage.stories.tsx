import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPage } from './ErrorPage';
import { Home, FileText, Mail, Shield, Settings } from 'lucide-react';

const meta = {
  title: 'Templates/ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Error page template with customizable error codes, messages, and recovery options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    errorCode: {
      control: { type: 'select' },
      options: [400, 401, 403, 404, 500, 502, 503],
      description: 'HTTP error code to display',
    },
    errorTitle: {
      control: 'text',
      description: 'Custom error title (overrides default)',
    },
    errorMessage: {
      control: 'text',
      description: 'Custom error message (overrides default)',
    },
    description: {
      control: 'text',
      description: 'Additional description or instructions',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search bar for finding content',
    },
    showDebugInfo: {
      control: 'boolean',
      description: 'Show debug information (development only)',
    },
    onRetry: {
      action: 'retry clicked',
      description: 'Callback when retry button is clicked',
    },
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error404: Story = {
  name: '404 - Not Found',
  args: {
    errorCode: 404,
    showSearch: true,
  },
};

export const Error500: Story = {
  name: '500 - Server Error',
  args: {
    errorCode: 500,
    onRetry: () => console.log('Retrying...'),
    contactSupport: {
      email: 'support@example.com',
      phone: '1-800-HELP',
    },
  },
};

export const Error503: Story = {
  name: '503 - Service Unavailable',
  args: {
    errorCode: 503,
    onRetry: () => console.log('Retrying...'),
  },
};

export const Error401: Story = {
  name: '401 - Unauthorized',
  args: {
    errorCode: 401,
    suggestions: [
      { label: 'Log In', href: '/login', icon: <Shield className="h-4 w-4" /> },
      { label: 'Go Home', href: '/', icon: <Home className="h-4 w-4" /> },
    ],
  },
};

export const Error403: Story = {
  name: '403 - Forbidden',
  args: {
    errorCode: 403,
    contactSupport: {
      email: 'admin@example.com',
    },
  },
};

export const CustomError: Story = {
  name: 'Custom Error',
  args: {
    errorCode: 418,
    errorTitle: "I'm a teapot",
    errorMessage: 'The requested entity body is short and stout.',
    description: 'Tip me over and pour me out.',
    showSearch: true,
    suggestions: [
      { label: 'Make Coffee Instead', href: '/coffee', icon: <Settings className="h-4 w-4" /> },
      { label: 'Go Home', href: '/', icon: <Home className="h-4 w-4" /> },
    ],
  },
};

export const WithFullOptions: Story = {
  name: 'With All Options',
  args: {
    errorCode: 404,
    errorTitle: 'Content Not Found',
    errorMessage: 'We couldn\'t find what you\'re looking for.',
    description: 'The page may have been moved, deleted, or you may have mistyped the URL.',
    showSearch: true,
    showDebugInfo: true,
    onRetry: () => console.log('Retrying...'),
    suggestions: [
      { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
      { label: 'Documentation', href: '/docs', icon: <FileText className="h-4 w-4" /> },
      { label: 'Contact', href: '/contact', icon: <Mail className="h-4 w-4" /> },
    ],
    contactSupport: {
      email: 'help@example.com',
      phone: '1-888-SUPPORT',
      showContactForm: true,
    },
  },
};

export const MinimalError: Story = {
  name: 'Minimal Error',
  args: {
    errorCode: 404,
  },
};

export const MaintenanceMode: Story = {
  name: 'Maintenance Mode',
  args: {
    errorCode: 503,
    errorTitle: 'Under Maintenance',
    errorMessage: 'We\'re updating our systems to serve you better.',
    description: 'We expect to be back online by 3:00 PM EST. Thank you for your patience.',
    onRetry: () => window.location.reload(),
  },
};

export const RateLimitError: Story = {
  name: 'Rate Limit Error',
  args: {
    errorCode: 429,
    errorTitle: 'Too Many Requests',
    errorMessage: 'You\'ve made too many requests in a short period.',
    description: 'Please wait a few minutes before trying again.',
    onRetry: () => console.log('Retrying...'),
    showDebugInfo: false,
  },
};

export const NetworkError: Story = {
  name: 'Network Error',
  args: {
    errorCode: 0,
    errorTitle: 'Network Connection Error',
    errorMessage: 'Unable to connect to our servers.',
    description: 'Please check your internet connection and try again.',
    onRetry: () => window.location.reload(),
    suggestions: [
      { label: 'Retry', href: '#', icon: <Settings className="h-4 w-4" /> },
      { label: 'Go Offline', href: '/offline', icon: <Home className="h-4 w-4" /> },
    ],
  },
};

export const PaymentRequired: Story = {
  name: 'Payment Required',
  args: {
    errorCode: 402,
    errorTitle: 'Payment Required',
    errorMessage: 'This content requires an active subscription.',
    description: 'Upgrade your account to access premium features.',
    suggestions: [
      { label: 'View Plans', href: '/pricing', icon: <Settings className="h-4 w-4" /> },
      { label: 'Go Home', href: '/', icon: <Home className="h-4 w-4" /> },
    ],
    contactSupport: {
      email: 'billing@example.com',
    },
  },
};

export const DevelopmentError: Story = {
  name: 'Development Error',
  args: {
    errorCode: 500,
    errorTitle: 'Application Error',
    errorMessage: 'An unexpected error occurred in the application.',
    description: 'This error has been logged and our team has been notified.',
    showDebugInfo: true,
    onRetry: () => console.log('Retrying...'),
    contactSupport: {
      email: 'dev@example.com',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Error page with debug information visible for development environments.',
      },
    },
  },
};