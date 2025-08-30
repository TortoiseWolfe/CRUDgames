import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A loading spinner component with multiple sizes, variants, and speeds.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white'],
      description: 'Color variant',
    },
    thickness: {
      control: 'select',
      options: ['thin', 'normal', 'thick'],
      description: 'Border thickness',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
    label: {
      control: 'text',
      description: 'Accessibility label',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Loading',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Loading data',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Processing',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
    label: 'Loading',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Loading',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Loading',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    label: 'Loading',
  },
};

export const Thin: Story = {
  args: {
    thickness: 'thin',
    size: 'lg',
    label: 'Loading',
  },
};

export const Thick: Story = {
  args: {
    thickness: 'thick',
    size: 'lg',
    label: 'Loading',
  },
};

export const SlowSpeed: Story = {
  args: {
    speed: 'slow',
    size: 'lg',
    label: 'Loading slowly',
  },
};

export const FastSpeed: Story = {
  args: {
    speed: 'fast',
    size: 'lg',
    label: 'Loading quickly',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Spinner size="sm" label="Small" />
      <Spinner size="md" label="Medium" />
      <Spinner size="lg" label="Large" />
      <Spinner size="xl" label="Extra Large" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Spinner variant="primary" label="Primary" />
      <Spinner variant="secondary" label="Secondary" />
      <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '0.5rem' }}>
        <Spinner variant="white" label="White" />
      </div>
    </div>
  ),
};