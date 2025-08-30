import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A multi-line text input with auto-resize, character counting, and validation support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior of the textarea',
    },
    autoResize: {
      control: 'boolean',
      description: 'Automatically resize to fit content',
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'message',
    name: 'message',
    label: 'Message',
    placeholder: 'Enter your message here...',
    helperText: 'Please provide details about your request',
  },
};

export const WithCharacterCount: Story = {
  args: {
    id: 'bio',
    name: 'bio',
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    showCount: true,
    maxLength: 200,
    helperText: 'Maximum 200 characters',
  },
};

export const AutoResize: Story = {
  args: {
    id: 'comment',
    name: 'comment',
    label: 'Comment',
    placeholder: 'Leave a comment...',
    autoResize: true,
    minRows: 3,
    maxRows: 10,
    helperText: 'This textarea will grow as you type',
  },
};

export const Required: Story = {
  args: {
    id: 'feedback',
    name: 'feedback',
    label: 'Feedback',
    placeholder: 'Your feedback is important to us...',
    required: true,
    minLength: 10,
    helperText: 'Minimum 10 characters required',
  },
};

export const WithError: Story = {
  args: {
    id: 'description',
    name: 'description',
    label: 'Description',
    placeholder: 'Describe the issue...',
    error: 'This field is required',
    defaultValue: '',
  },
};

export const Success: Story = {
  args: {
    id: 'review',
    name: 'review',
    label: 'Review',
    defaultValue: 'Great product! Would definitely recommend.',
    success: true,
    helperText: 'Thank you for your review!',
  },
};

export const Disabled: Story = {
  args: {
    id: 'notes',
    name: 'notes',
    label: 'Notes',
    defaultValue: 'This field is disabled',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    id: 'terms',
    name: 'terms',
    label: 'Terms and Conditions',
    defaultValue: 'By using our service, you agree to our terms and conditions...',
    readOnly: true,
    rows: 5,
  },
};