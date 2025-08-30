import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from './Alert';
import { useState } from 'react';
import { Button } from '../Button/Button';

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A notification component for displaying important messages with appropriate styling and accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual style variant of the alert',
    },
    title: {
      control: 'text',
      description: 'Optional title for the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Shows dismiss button',
    },
    autoHide: {
      control: 'boolean',
      description: 'Automatically hides after delay',
    },
    autoHideDelay: {
      control: 'number',
      description: 'Delay in ms before auto-hiding',
    },
    compact: {
      control: 'boolean',
      description: 'Reduces padding for compact display',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes alert take full width',
    },
    icon: {
      control: 'boolean',
      description: 'Shows or hides the icon',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational message for the user.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your action was completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review this important information.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'There was a problem processing your request.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'This is an alert without a title.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'No Icon',
    icon: false,
    children: 'This alert displays without an icon.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    dismissible: true,
    children: 'Click the X button to dismiss this alert.',
  },
};

export const AutoHiding: Story = {
  args: {
    variant: 'success',
    autoHide: true,
    autoHideDelay: 3000,
    children: 'This alert will disappear in 3 seconds.',
  },
};

export const Compact: Story = {
  args: {
    variant: 'info',
    compact: true,
    children: 'Compact alert with less padding.',
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'warning',
    fullWidth: true,
    title: 'Full Width Alert',
    children: 'This alert takes the full width of its container.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Detailed Information',
    dismissible: true,
    children: 'This is a longer alert message that contains more detailed information. It might span multiple lines and include important details that the user needs to read carefully before proceeding with their action.',
  },
};

export const AllVariants: Story = {
  args: {
    variant: 'info',
    children: 'Alert message',
  },
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <Alert variant="info" title="Information">
        This is an info alert.
      </Alert>
      <Alert variant="success" title="Success">
        This is a success alert.
      </Alert>
      <Alert variant="warning" title="Warning">
        This is a warning alert.
      </Alert>
      <Alert variant="error" title="Error">
        This is an error alert.
      </Alert>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  args: {
    variant: 'success',
    children: 'Alert message',
  },
  render: () => {
    const [showAlert, setShowAlert] = useState(false);
    
    return (
      <div className="flex flex-col gap-4 w-96">
        <Button onClick={() => setShowAlert(true)}>
          Show Alert
        </Button>
        {showAlert && (
          <Alert
            variant="success"
            title="Form Submitted!"
            dismissible
            autoHide
            autoHideDelay={5000}
            onDismiss={() => setShowAlert(false)}
          >
            Your form has been submitted successfully. This alert will auto-hide in 5 seconds.
          </Alert>
        )}
      </div>
    );
  },
};

export const NotificationStack: Story = {
  args: {
    variant: 'info',
    children: 'Alert message',
  },
  render: () => (
    <div className="flex flex-col gap-2 w-96">
      <Alert variant="error" dismissible>
        Failed to save changes.
      </Alert>
      <Alert variant="warning" dismissible>
        Your session will expire in 5 minutes.
      </Alert>
      <Alert variant="success" dismissible>
        Profile updated successfully!
      </Alert>
      <Alert variant="info" dismissible>
        New features are available.
      </Alert>
    </div>
  ),
};