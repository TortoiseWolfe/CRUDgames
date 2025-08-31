import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Label component for form fields with support for required/optional indicators, helper text, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID of the form element this label is for',
    },
    required: {
      control: 'boolean',
      description: 'Show required indicator',
    },
    optional: {
      control: 'boolean',
      description: 'Show optional indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state styling',
    },
    error: {
      control: { type: 'radio' },
      options: [false, true, 'Custom error message'],
      description: 'Error state with optional message',
    },
    helperText: {
      control: 'text',
      description: 'Additional helper text below label',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Text size',
    },
    variant: {
      control: 'select',
      options: ['default', 'inline'],
      description: 'Layout variant',
    },
    as: {
      control: 'select',
      options: ['label', 'span', 'div'],
      description: 'HTML element to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: 'email',
    children: 'Email Address',
  },
};

export const Required: Story = {
  args: {
    htmlFor: 'required-field',
    required: true,
    children: 'Required Field',
  },
};

export const Optional: Story = {
  args: {
    htmlFor: 'optional-field',
    optional: true,
    children: 'Optional Field',
  },
};

export const WithHelperText: Story = {
  args: {
    htmlFor: 'field-with-helper',
    helperText: 'Enter your primary email address',
    children: 'Email',
  },
};

export const ErrorState: Story = {
  args: {
    htmlFor: 'error-field',
    error: true,
    required: true,
    children: 'Password',
  },
};

export const ErrorWithMessage: Story = {
  args: {
    htmlFor: 'error-message-field',
    error: 'This field is required and must be at least 8 characters',
    children: 'Password',
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'disabled-field',
    disabled: true,
    children: 'Disabled Field',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Label size="sm" htmlFor="small">Small Label</Label>
      <Label size="md" htmlFor="medium">Medium Label (Default)</Label>
      <Label size="lg" htmlFor="large">Large Label</Label>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label variant="default" htmlFor="default">
          Default Block Label
        </Label>
        <input 
          id="default" 
          type="text" 
          className="mt-1 px-3 py-2 border rounded"
          placeholder="Input field"
        />
      </div>
      <div>
        <Label variant="inline" htmlFor="inline">
          Inline Label:
        </Label>
        <input 
          id="inline" 
          type="text" 
          className="ml-2 px-3 py-2 border rounded"
          placeholder="Input field"
        />
      </div>
    </div>
  ),
};

export const PolymorphicComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <Label as="label" htmlFor="as-label">
        Rendered as label element
      </Label>
      <Label as="span">
        Rendered as span element (no htmlFor)
      </Label>
      <Label as="div">
        Rendered as div element (no htmlFor)
      </Label>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <Label 
          htmlFor="email" 
          required
          helperText="We'll never share your email"
        >
          Email Address
        </Label>
        <input 
          id="email" 
          type="email" 
          className="mt-1 w-full px-3 py-2 border rounded"
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <Label 
          htmlFor="password" 
          required
          error="Password must be at least 8 characters"
        >
          Password
        </Label>
        <input 
          id="password" 
          type="password" 
          className="mt-1 w-full px-3 py-2 border border-red-500 rounded"
          placeholder="••••••••"
        />
      </div>
      
      <div>
        <Label 
          htmlFor="bio" 
          optional
          helperText="Tell us about yourself (max 500 characters)"
        >
          Bio
        </Label>
        <textarea 
          id="bio" 
          className="mt-1 w-full px-3 py-2 border rounded"
          rows={4}
          placeholder="Enter your bio..."
        />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Label htmlFor="normal">Normal Label</Label>
      <Label htmlFor="required" required>Required Label</Label>
      <Label htmlFor="optional" optional>Optional Label</Label>
      <Label htmlFor="error" error={true}>Error Label</Label>
      <Label htmlFor="disabled" disabled>Disabled Label</Label>
      <Label htmlFor="helper" helperText="With helper text">Label with Helper</Label>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Label htmlFor="icon-field">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email with Icon
        </span>
      </Label>
      <Label htmlFor="icon-field-2" required>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Password with Icon
        </span>
      </Label>
    </div>
  ),
};