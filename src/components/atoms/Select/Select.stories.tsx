import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown selection component with search, multi-select, and grouping support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Enable multi-select mode',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Visual variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
];

const groupedOptions = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
  { value: 'chicken', label: 'Chicken', group: 'Meat' },
  { value: 'beef', label: 'Beef', group: 'Meat' },
];

export const Default: Story = {
  args: {
    id: 'fruit',
    label: 'Select a fruit',
    placeholder: 'Choose your favorite',
    options: basicOptions,
    helperText: 'Pick one option from the list',
  },
};

export const WithSearch: Story = {
  args: {
    id: 'searchable',
    label: 'Searchable Select',
    placeholder: 'Type to search...',
    options: basicOptions,
    searchable: true,
    helperText: 'Start typing to filter options',
  },
};

export const MultiSelect: Story = {
  args: {
    id: 'multi',
    label: 'Multi-Select',
    placeholder: 'Select multiple options',
    options: basicOptions,
    multiple: true,
    helperText: 'You can select multiple items',
  },
};

export const WithGroups: Story = {
  args: {
    id: 'grouped',
    label: 'Grouped Options',
    placeholder: 'Select an item',
    options: groupedOptions,
    helperText: 'Options are organized by category',
  },
};

export const Clearable: Story = {
  args: {
    id: 'clearable',
    label: 'Clearable Select',
    placeholder: 'Select an option',
    options: basicOptions,
    clearable: true,
    defaultValue: 'apple',
    helperText: 'Click X to clear selection',
  },
};

export const Required: Story = {
  args: {
    id: 'required',
    label: 'Required Field',
    placeholder: 'This field is required',
    options: basicOptions,
    required: true,
  },
};

export const WithError: Story = {
  args: {
    id: 'error',
    label: 'Select with Error',
    placeholder: 'Select an option',
    options: basicOptions,
    error: 'Please select a valid option',
  },
};

export const Success: Story = {
  args: {
    id: 'success',
    label: 'Valid Selection',
    options: basicOptions,
    defaultValue: 'apple',
    success: true,
    helperText: 'Great choice!',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    label: 'Disabled Select',
    placeholder: 'Cannot select',
    options: basicOptions,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    id: 'loading',
    label: 'Loading Options',
    placeholder: 'Loading...',
    options: [],
    loading: true,
  },
};

export const SmallSize: Story = {
  args: {
    id: 'small',
    label: 'Small Select',
    placeholder: 'Small size',
    options: basicOptions,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    id: 'large',
    label: 'Large Select',
    placeholder: 'Large size',
    options: basicOptions,
    size: 'lg',
  },
};