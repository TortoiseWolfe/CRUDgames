import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RadioGroup } from './Radio';

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button group component for single selection from multiple options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of radio buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all options',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const optionsWithDescriptions = [
  { value: 'free', label: 'Free Plan', description: 'Basic features for personal use' },
  { value: 'pro', label: 'Pro Plan', description: 'Advanced features for professionals' },
  { value: 'enterprise', label: 'Enterprise', description: 'Full features with priority support' },
];

export const Default: Story = {
  args: {
    id: 'default',
    name: 'default',
    label: 'Select an option',
    options: basicOptions,
    helperText: 'Choose one option',
  },
};

export const WithDescriptions: Story = {
  args: {
    id: 'plans',
    name: 'plans',
    label: 'Choose your plan',
    options: optionsWithDescriptions,
    helperText: 'Select the plan that best fits your needs',
  },
};

export const Horizontal: Story = {
  args: {
    id: 'horizontal',
    name: 'horizontal',
    label: 'Horizontal layout',
    options: basicOptions,
    orientation: 'horizontal',
  },
};

export const WithDefaultValue: Story = {
  args: {
    id: 'default-value',
    name: 'default-value',
    label: 'Pre-selected option',
    options: basicOptions,
    defaultValue: 'option2',
  },
};

export const Required: Story = {
  args: {
    id: 'required',
    name: 'required',
    label: 'Required selection',
    options: basicOptions,
    required: true,
    helperText: 'This field is required',
  },
};

export const WithError: Story = {
  args: {
    id: 'error',
    name: 'error',
    label: 'Radio with error',
    options: basicOptions,
    error: 'Please select an option',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    name: 'disabled',
    label: 'Disabled radio group',
    options: basicOptions,
    disabled: true,
  },
};

export const PartiallyDisabled: Story = {
  args: {
    id: 'partial',
    name: 'partial',
    label: 'Some options disabled',
    options: [
      { value: 'available', label: 'Available' },
      { value: 'unavailable', label: 'Unavailable', disabled: true },
      { value: 'also-available', label: 'Also Available' },
    ],
  },
};

export const SmallSize: Story = {
  args: {
    id: 'small',
    name: 'small',
    label: 'Small radio buttons',
    options: basicOptions,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    id: 'large',
    name: 'large',
    label: 'Large radio buttons',
    options: basicOptions,
    size: 'lg',
  },
};