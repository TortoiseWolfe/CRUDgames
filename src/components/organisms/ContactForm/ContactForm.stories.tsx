import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ContactForm } from './ContactForm';

const meta = {
  title: 'Organisms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Simple contact form with spam prevention and multiple layout variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'detailed'],
    },
  },
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    showSubject: false,
    submitText: 'Send',
  },
};

export const Detailed: Story = {
  args: {
    variant: 'detailed',
  },
};

export const CustomSubmitText: Story = {
  args: {
    submitText: 'Get in Touch',
  },
};

export const NoSubject: Story = {
  args: {
    showSubject: false,
  },
};

export const WithCustomHandler: Story = {
  args: {
    onSubmit: async (data) => {
      alert(`Message from ${data.name}: ${data.message}`);
    },
  },
};

export const InCard: Story = {
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'detailed',
  },
};

export const DarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <div className="w-full max-w-xl p-8 bg-white rounded-lg">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export const SideBySide: Story = {
  decorators: [
    (Story) => (
      <div className="grid md:grid-cols-2 gap-8 p-8 max-w-6xl">
        <div>
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Talk</h2>
          <p className="text-gray-600 mb-6">
            Have a project in mind? We&apos;d love to hear about it. Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">contact@crudgames.com</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">1-800-CRUDGAME</p>
            </div>
            <div>
              <h3 className="font-semibold">Office</h3>
              <p className="text-gray-600">Remote-First Studio</p>
            </div>
          </div>
        </div>
        <div>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};