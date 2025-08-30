import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable checkbox component with label and description support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
    },
    variant: {
      control: 'select',
      options: ['default', 'rounded'],
      description: 'Visual variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'terms',
    name: 'terms',
    label: 'I agree to the terms and conditions',
  },
};

export const WithDescription: Story = {
  args: {
    id: 'newsletter',
    name: 'newsletter',
    label: 'Subscribe to newsletter',
    description: 'Receive weekly updates about new features and promotions',
  },
};

export const Checked: Story = {
  args: {
    id: 'checked',
    name: 'checked',
    label: 'This is checked by default',
    defaultChecked: true,
  },
};

export const Required: Story = {
  args: {
    id: 'required',
    name: 'required',
    label: 'Required checkbox',
    description: 'You must check this to continue',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    id: 'error',
    name: 'error',
    label: 'Checkbox with error',
    error: 'You must accept the terms',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    name: 'disabled',
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    id: 'disabled-checked',
    name: 'disabled-checked',
    label: 'Disabled and checked',
    defaultChecked: true,
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    id: 'indeterminate',
    name: 'indeterminate',
    label: 'Select all',
    description: 'Some items are selected',
    indeterminate: true,
    defaultChecked: true,
  },
};

export const SmallSize: Story = {
  args: {
    id: 'small',
    name: 'small',
    label: 'Small checkbox',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    id: 'large',
    name: 'large',
    label: 'Large checkbox',
    size: 'lg',
  },
};

export const RoundedVariant: Story = {
  args: {
    id: 'rounded',
    name: 'rounded',
    label: 'Rounded checkbox',
    variant: 'rounded',
  },
};