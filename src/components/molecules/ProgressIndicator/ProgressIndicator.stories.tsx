import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgressIndicator } from './ProgressIndicator';

const meta = {
  title: 'Molecules/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible progress indicator component with multiple variants and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value (default: 100)',
    },
    label: {
      control: 'text',
      description: 'Optional label text',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress bar',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Visual variant',
    },
    animated: {
      control: 'boolean',
      description: 'Enable pulse animation',
    },
    striped: {
      control: 'boolean',
      description: 'Enable striped animation',
    },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    label: 'Upload Progress',
    showPercentage: true,
  },
};

export const Sizes: Story = {
  args: {
    value: 50,
  },
  render: () => (
    <div className="space-y-4 w-64">
      <ProgressIndicator value={30} size="sm" label="Small" showPercentage />
      <ProgressIndicator value={50} size="md" label="Medium" showPercentage />
      <ProgressIndicator value={70} size="lg" label="Large" showPercentage />
    </div>
  ),
};

export const Variants: Story = {
  args: {
    value: 50,
  },
  render: () => (
    <div className="space-y-4 w-64">
      <ProgressIndicator value={40} variant="default" label="Default" showPercentage />
      <ProgressIndicator value={100} variant="success" label="Success" showPercentage />
      <ProgressIndicator value={65} variant="warning" label="Warning" showPercentage />
      <ProgressIndicator value={25} variant="error" label="Error" showPercentage />
    </div>
  ),
};

export const Animated: Story = {
  args: {
    value: 60,
    animated: true,
    label: 'Processing...',
    showPercentage: true,
  },
};

export const Striped: Story = {
  args: {
    value: 70,
    striped: true,
    label: 'Loading...',
    showPercentage: true,
  },
};

export const AnimatedStriped: Story = {
  args: {
    value: 80,
    animated: true,
    striped: true,
    label: 'In Progress...',
    showPercentage: true,
    variant: 'default',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    label: 'Complete!',
    showPercentage: true,
  },
};

export const CustomMax: Story = {
  args: {
    value: 7,
    max: 10,
    label: 'Step 7 of 10',
    showPercentage: true,
  },
};

export const MultipleProgress: Story = {
  args: {
    value: 50,
  },
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h3 className="text-sm font-semibold mb-3">Project Status</h3>
        <div className="space-y-3">
          <ProgressIndicator value={100} variant="success" label="Design" showPercentage />
          <ProgressIndicator value={75} variant="default" label="Development" showPercentage />
          <ProgressIndicator value={30} variant="warning" label="Testing" showPercentage />
          <ProgressIndicator value={0} variant="error" label="Deployment" showPercentage />
        </div>
      </div>
    </div>
  ),
};

export const FormProgress: Story = {
  args: {
    value: 60,
  },
  render: () => (
    <div className="w-96 p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Application Progress</h2>
      <ProgressIndicator 
        value={3} 
        max={5} 
        label="Step 3 of 5: Project Details" 
        showPercentage 
        size="lg"
        variant="default"
      />
      <div className="mt-4 text-sm text-gray-600">
        <p>Completed: Personal Info, Company Info</p>
        <p>Next: Budget & Timeline</p>
      </div>
    </div>
  ),
};