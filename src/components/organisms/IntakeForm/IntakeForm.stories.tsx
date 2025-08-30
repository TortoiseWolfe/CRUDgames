import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IntakeForm } from './IntakeForm';

const meta = {
  title: 'Organisms/IntakeForm',
  component: IntakeForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive multi-step intake form with validation, email integration, and conversion optimization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmitSuccess: { action: 'form submitted' },
    onSubmitError: { action: 'submission error' },
  },
} satisfies Meta<typeof IntakeForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    emailServiceConfig: {
      serviceId: 'demo_service',
      templateId: 'demo_template',
      publicKey: 'demo_key',
    },
  },
};

export const WithCallbacks: Story = {
  args: {
    onSubmitSuccess: (data) => {
      console.log('Form submitted successfully:', data);
      alert('Form submitted! Check console for data.');
    },
    onSubmitError: (error) => {
      console.error('Form submission error:', error);
      alert('Error submitting form. Check console for details.');
    },
  },
};

export const CustomEmailConfig: Story = {
  args: {
    emailServiceConfig: {
      serviceId: 'custom_service_id',
      templateId: 'custom_template_id',
      publicKey: 'custom_public_key',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Configure with your own email service credentials.',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const DarkBackground: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#1f2937', padding: '2rem', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};