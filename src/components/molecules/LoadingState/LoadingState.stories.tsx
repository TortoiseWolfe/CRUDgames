import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LoadingState } from './LoadingState';

const meta = {
  title: 'Molecules/LoadingState',
  component: LoadingState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible loading state component with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse', 'skeleton'],
    },
  },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Spinner: Story = {
  args: {
    variant: 'spinner',
    size: 'lg',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
    size: 'md',
  },
};

export const Pulse: Story = {
  args: {
    variant: 'pulse',
    size: 'lg',
  },
};

export const Skeleton: Story = {
  args: {
    variant: 'skeleton',
  },
};

export const WithText: Story = {
  args: {
    text: 'Loading your content...',
    size: 'lg',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    text: 'Please wait',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    text: 'Processing your request...',
  },
};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
    size: 'xl',
    text: 'Loading application...',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Overlay: Story = {
  args: {
    overlay: true,
    size: 'lg',
    text: 'Saving changes...',
  },
  decorators: [
    (Story) => (
      <div className="relative">
        <div className="p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Background Content</h2>
          <p className="text-gray-600 mb-4">
            This is some background content that would be covered by the loading overlay.
          </p>
          <p className="text-gray-600">
            The overlay creates a semi-transparent backdrop that prevents interaction with the content below.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="text-center">
        <h3 className="font-semibold mb-4">Spinner</h3>
        <LoadingState variant="spinner" text="Loading..." />
      </div>
      <div className="text-center">
        <h3 className="font-semibold mb-4">Dots</h3>
        <LoadingState variant="dots" text="Processing..." />
      </div>
      <div className="text-center">
        <h3 className="font-semibold mb-4">Pulse</h3>
        <LoadingState variant="pulse" text="Please wait..." />
      </div>
      <div className="text-center">
        <h3 className="font-semibold mb-4">Skeleton</h3>
        <LoadingState variant="skeleton" />
      </div>
    </div>
  ),
};