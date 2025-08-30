import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';
import { Mail, Lock, Phone, Search, User, Calendar } from 'lucide-react';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive form input component with validation, error handling, and accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'url', 'search'],
      description: 'HTML input type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost'],
      description: 'Visual style variant',
    },
    error: {
      control: 'text',
      description: 'Error state or message',
    },
    success: {
      control: 'boolean',
      description: 'Success state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width input',
    },
  },
  args: {
    id: 'input-demo',
    name: 'demo',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    label: 'Default Input',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    helperText: "We'll never share your email with anyone else.",
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'This username is already taken',
    defaultValue: 'john_doe',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    success: true,
    defaultValue: 'valid@email.com',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only',
    readOnly: true,
    defaultValue: 'Read only value',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    leftIcon: <Lock className="h-4 w-4" />,
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

export const PhoneNumber: Story = {
  args: {
    type: 'tel',
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
    leftIcon: <Phone className="h-4 w-4" />,
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    leftIcon: <Search className="h-4 w-4" />,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    leftIcon: <User className="h-4 w-4" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select date',
    rightIcon: <Calendar className="h-4 w-4" />,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled Variant',
    placeholder: 'Filled background',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Variant',
    placeholder: 'Transparent background',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width Input',
    placeholder: 'Takes full container width',
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input
        id="default-variant"
        name="default"
        variant="default"
        label="Default Variant"
        placeholder="Default style"
      />
      <Input
        id="filled-variant"
        name="filled"
        variant="filled"
        label="Filled Variant"
        placeholder="Filled style"
      />
      <Input
        id="ghost-variant"
        name="ghost"
        variant="ghost"
        label="Ghost Variant"
        placeholder="Ghost style"
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input
        id="normal"
        name="normal"
        label="Normal"
        placeholder="Normal state"
      />
      <Input
        id="error"
        name="error"
        label="Error"
        placeholder="Error state"
        error="This field has an error"
      />
      <Input
        id="success"
        name="success"
        label="Success"
        placeholder="Success state"
        success
        defaultValue="Valid input"
      />
      <Input
        id="disabled"
        name="disabled"
        label="Disabled"
        placeholder="Disabled state"
        disabled
      />
    </div>
  ),
};