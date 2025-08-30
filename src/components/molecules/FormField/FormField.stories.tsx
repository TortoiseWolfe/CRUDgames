import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormField } from './FormField';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
import { Checkbox } from '@/components/atoms/Checkbox';
import { RadioGroup } from '@/components/atoms/Radio';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A form field wrapper that provides consistent layout, labels, and validation messages for form inputs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    success: {
      control: 'text',
      description: 'Success message to display',
    },
    hint: {
      control: 'text',
      description: 'Hint text to display',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Field layout orientation',
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  args: {
    label: 'Email Address',
    id: 'email',
    required: true,
    hint: 'We\'ll never share your email with anyone else.',
    children: <div />,
  },
  render: (args) => (
    <FormField {...args}>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="john@example.com"
      />
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Username',
    id: 'username',
    required: true,
    error: 'Username is already taken. Please choose another.',
    children: <div />,
  },
  render: (args) => (
    <FormField {...args}>
      <Input
        id="username"
        name="username"
        placeholder="Enter username"
        className="border-red-500"
      />
    </FormField>
  ),
};

export const WithSuccess: Story = {
  args: {
    label: 'Email',
    id: 'email',
    success: 'Email is available!',
    children: <div />,
  },
  render: (args) => (
    <FormField {...args}>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="john@example.com"
        className="border-green-500"
      />
    </FormField>
  ),
};

export const WithTextarea: Story = {
  args: {
    label: 'Message',
    id: 'message',
    required: true,
    hint: 'Maximum 500 characters',
    children: <div />,
  },
  render: (args) => (
    <FormField {...args}>
      <Textarea
        id="message"
        name="message"
        placeholder="Enter your message..."
        maxLength={500}
      />
    </FormField>
  ),
};

export const WithSelect: Story = {
  args: {
    label: 'Country',
    id: 'country',
    required: true,
    children: <div />,
  },
  render: (args) => (
    <FormField {...args}>
      <Select
        id="country"
        placeholder="Select a country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
        ]}
      />
    </FormField>
  ),
};

export const WithCheckbox: Story = {
  args: {
    label: 'Terms and Conditions',
    id: 'terms',
    error: 'You must accept the terms and conditions',
    children: <div />,
  },
  render: (args) => (
    <FormField {...args}>
      <Checkbox
        id="terms"
        name="terms"
        label="I accept the terms and conditions"
        description="By checking this box, you agree to our terms of service and privacy policy."
      />
    </FormField>
  ),
};

export const WithRadioGroup: Story = {
  args: {
    label: 'Preferred Contact Method',
    id: 'contact-method',
    required: true,
    children: <div />,
  },
  render: (args) => (
    <FormField {...args}>
      <RadioGroup
        id="contact-method"
        name="contact-method"
        options={[
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
          { value: 'text', label: 'Text Message' },
        ]}
      />
    </FormField>
  ),
};

export const HorizontalOrientation: Story = {
  args: {
    label: 'Full Name',
    id: 'fullname',
    required: true,
    orientation: 'horizontal',
    hint: 'Enter your full legal name',
    children: <div />,
  },
  render: (args) => (
    <div className="max-w-2xl">
      <FormField {...args}>
        <Input
          id="fullname"
          name="fullname"
          placeholder="John Doe"
        />
      </FormField>
    </div>
  ),
};

export const MultipleFields: Story = {
  args: {
    children: <div />,
  },
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <FormField
        label="First Name"
        id="first-name"
        required
      >
        <Input id="first-name" name="first-name" placeholder="John" />
      </FormField>
      
      <FormField
        label="Last Name"
        id="last-name"
        required
      >
        <Input id="last-name" name="last-name" placeholder="Doe" />
      </FormField>
      
      <FormField
        label="Email Address"
        id="email"
        required
        hint="We'll use this to contact you"
      >
        <Input id="email" name="email" type="email" placeholder="john@example.com" />
      </FormField>
      
      <FormField
        label="Phone Number"
        id="phone"
        error="Please enter a valid phone number"
      >
        <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" className="border-red-500" />
      </FormField>
      
      <FormField
        label="Bio"
        id="bio"
        hint="Tell us about yourself (optional)"
      >
        <Textarea id="bio" name="bio" placeholder="I am a..." />
      </FormField>
    </div>
  ),
};

export const FormExample: Story = {
  args: {
    children: <div />,
  },
  render: () => (
    <form className="space-y-6 max-w-2xl p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="First Name" id="first-name" required>
          <Input id="first-name" name="first-name" placeholder="John" />
        </FormField>
        
        <FormField label="Last Name" id="last-name" required>
          <Input id="last-name" name="last-name" placeholder="Doe" />
        </FormField>
      </div>
      
      <FormField
        label="Email"
        id="email"
        required
        hint="We'll never share your email"
      >
        <Input id="email" name="email" type="email" placeholder="john@example.com" />
      </FormField>
      
      <FormField
        label="Subject"
        id="subject"
        required
      >
        <Select
          id="subject"
          placeholder="Select a subject"
          options={[
            { value: 'general', label: 'General Inquiry' },
            { value: 'support', label: 'Technical Support' },
            { value: 'sales', label: 'Sales' },
            { value: 'other', label: 'Other' },
          ]}
        />
      </FormField>
      
      <FormField
        label="Message"
        id="message"
        required
        hint="Minimum 10 characters"
      >
        <Textarea
          id="message"
          name="message"
          placeholder="How can we help you?"
          minLength={10}
        />
      </FormField>
      
      <FormField>
        <Checkbox
          id="newsletter"
          name="newsletter"
          label="Subscribe to our newsletter"
          description="Get updates about new features and promotions"
        />
      </FormField>
      
      <div className="flex justify-end gap-4">
        <button type="button" className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </form>
  ),
};