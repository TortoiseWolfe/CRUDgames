import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MultiStepForm, Step } from './MultiStepForm';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
import { Checkbox } from '@/components/atoms/Checkbox';
import { z } from 'zod';
import { useState } from 'react';

const meta = {
  title: 'Organisms/MultiStepForm',
  component: MultiStepForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Multi-step form container with validation, progress tracking, and data persistence.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    allowSkip: {
      control: 'boolean',
      description: 'Allow skipping optional steps',
    },
    showProgressBar: {
      control: 'boolean',
      description: 'Show progress bar and step indicators',
    },
    persistData: {
      control: 'boolean',
      description: 'Persist form data to localStorage',
    },
  },
} satisfies Meta<typeof MultiStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample validation schemas
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
});

const companyInfoSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  role: z.string().min(2, 'Role is required'),
  size: z.string().min(1, 'Please select company size'),
});

const projectInfoSchema = z.object({
  projectType: z.string().min(1, 'Please select project type'),
  budget: z.string().min(1, 'Please select budget range'),
  timeline: z.string().min(1, 'Please select timeline'),
});

// Sample step content components
const PersonalInfoStep = ({ data, updateData }: { data: Record<string, unknown>; updateData: (data: Record<string, unknown>) => void }) => (
  <div className="space-y-4">
    <Input
      id="firstName"
      name="firstName"
      label="First Name"
      value={(data.firstName as string) || ''}
      onChange={(e) => updateData({ ...data, firstName: e.target.value })}
      placeholder="John"
      required
    />
    <Input
      id="lastName"
      name="lastName"
      label="Last Name"
      value={(data.lastName as string) || ''}
      onChange={(e) => updateData({ ...data, lastName: e.target.value })}
      placeholder="Doe"
      required
    />
    <Input
      id="email"
      name="email"
      label="Email"
      type="email"
      value={(data.email as string) || ''}
      onChange={(e) => updateData({ ...data, email: e.target.value })}
      placeholder="john@example.com"
      required
    />
  </div>
);

const CompanyInfoStep = ({ data, updateData }: { data: Record<string, unknown>; updateData: (data: Record<string, unknown>) => void }) => (
  <div className="space-y-4">
    <Input
      id="company"
      name="company"
      label="Company Name"
      value={(data.company as string) || ''}
      onChange={(e) => updateData({ ...data, company: e.target.value })}
      placeholder="Acme Corp"
      required
    />
    <Input
      id="role"
      name="role"
      label="Your Role"
      value={(data.role as string) || ''}
      onChange={(e) => updateData({ ...data, role: e.target.value })}
      placeholder="Product Manager"
      required
    />
    <Select
      id="size"
      label="Company Size"
      value={(data.size as string) || ''}
      onChange={(value) => updateData({ ...data, size: value })}
      options={[
        { value: '', label: 'Select size' },
        { value: '1-10', label: '1-10 employees' },
        { value: '11-50', label: '11-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-1000', label: '201-1000 employees' },
        { value: '1000+', label: '1000+ employees' },
      ]}
      required
    />
  </div>
);

const ProjectInfoStep = ({ data, updateData }: { data: Record<string, unknown>; updateData: (data: Record<string, unknown>) => void }) => (
  <div className="space-y-4">
    <Select
      id="projectType"
      label="Project Type"
      value={(data.projectType as string) || ''}
      onChange={(value) => updateData({ ...data, projectType: value })}
      options={[
        { value: '', label: 'Select type' },
        { value: 'website', label: 'Website Development' },
        { value: 'app', label: 'Mobile App' },
        { value: 'saas', label: 'SaaS Platform' },
        { value: 'consulting', label: 'Consulting' },
      ]}
      required
    />
    <Select
      id="budget"
      label="Budget Range"
      value={(data.budget as string) || ''}
      onChange={(value) => updateData({ ...data, budget: value })}
      options={[
        { value: '', label: 'Select budget' },
        { value: '<10k', label: 'Less than $10,000' },
        { value: '10-50k', label: '$10,000 - $50,000' },
        { value: '50-100k', label: '$50,000 - $100,000' },
        { value: '100k+', label: 'More than $100,000' },
      ]}
      required
    />
    <Select
      id="timeline"
      label="Timeline"
      value={(data.timeline as string) || ''}
      onChange={(value) => updateData({ ...data, timeline: value })}
      options={[
        { value: '', label: 'Select timeline' },
        { value: 'asap', label: 'ASAP' },
        { value: '1month', label: 'Within 1 month' },
        { value: '3months', label: 'Within 3 months' },
        { value: '6months', label: 'Within 6 months' },
      ]}
      required
    />
  </div>
);

const AdditionalInfoStep = ({ data, updateData }: { data: Record<string, unknown>; updateData: (data: Record<string, unknown>) => void }) => (
  <div className="space-y-4">
    <Textarea
      id="description"
      name="description"
      label="Project Description"
      value={(data.description as string) || ''}
      onChange={(e) => updateData({ ...data, description: e.target.value })}
      placeholder="Tell us more about your project..."
      rows={4}
    />
    <Checkbox
      id="subscribe"
      name="subscribe"
      label="Subscribe to newsletter"
      checked={(data.subscribe as boolean) || false}
      onChange={(e) => updateData({ ...data, subscribe: e.target.checked })}
    />
  </div>
);

const sampleSteps: Step[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Let us know who you are',
    content: PersonalInfoStep,
    validation: personalInfoSchema,
  },
  {
    id: 'company',
    title: 'Company Details',
    description: 'Tell us about your organization',
    content: CompanyInfoStep,
    validation: companyInfoSchema,
  },
  {
    id: 'project',
    title: 'Project Requirements',
    description: 'What can we help you with?',
    content: ProjectInfoStep,
    validation: projectInfoSchema,
  },
  {
    id: 'additional',
    title: 'Additional Information',
    description: 'Any other details you\'d like to share',
    content: AdditionalInfoStep,
    isOptional: true,
  },
];

export const Default: Story = {
  args: {
    steps: sampleSteps,
    onComplete: (data) => console.log('Form completed:', data),
    showProgressBar: true,
    allowSkip: false,
    persistData: false,
  },
};

export const WithOptionalSteps: Story = {
  args: {
    steps: sampleSteps,
    onComplete: (data) => console.log('Form completed:', data),
    showProgressBar: true,
    allowSkip: true,
    persistData: false,
  },
};

export const WithDataPersistence: Story = {
  args: {
    steps: sampleSteps,
    onComplete: (data) => console.log('Form completed:', data),
    showProgressBar: true,
    allowSkip: false,
    persistData: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form data is saved to localStorage and restored on page reload.',
      },
    },
  },
};

export const ControlledStep: Story = {
  args: {
    steps: sampleSteps,
    onComplete: (data) => console.log('Form completed:', data),
    showProgressBar: true,
  },
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0);
    
    return (
      <div>
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setCurrentStep(0)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Go to Step 1
          </button>
          <button
            onClick={() => setCurrentStep(1)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Go to Step 2
          </button>
          <button
            onClick={() => setCurrentStep(2)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Go to Step 3
          </button>
        </div>
        <MultiStepForm
          {...args}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    );
  },
};

export const MinimalForm: Story = {
  args: {
    steps: [
      {
        id: 'email',
        title: 'Email Signup',
        description: 'Get updates about our products',
        content: ({ data, updateData }: { data: Record<string, unknown>; updateData: (data: Record<string, unknown>) => void }) => (
          <Input
            id="emailSignup"
            name="emailSignup"
            label="Email Address"
            type="email"
            value={(data.email as string) || ''}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="your@email.com"
            required
          />
        ),
        validation: z.object({
          email: z.string().email('Please enter a valid email'),
        }),
      },
      {
        id: 'preferences',
        title: 'Preferences',
        description: 'Customize your experience',
        content: ({ data, updateData }: { data: Record<string, unknown>; updateData: (data: Record<string, unknown>) => void }) => (
          <div className="space-y-3">
            <Checkbox
              id="products"
              name="products"
              label="Product updates"
              checked={(data.products as boolean) || false}
              onChange={(e) => updateData({ ...data, products: e.target.checked })}
            />
            <Checkbox
              id="newsletter"
              name="newsletter"
              label="Newsletter"
              checked={(data.newsletter as boolean) || false}
              onChange={(e) => updateData({ ...data, newsletter: e.target.checked })}
            />
            <Checkbox
              id="offers"
              name="offers"
              label="Special offers"
              checked={(data.offers as boolean) || false}
              onChange={(e) => updateData({ ...data, offers: e.target.checked })}
            />
          </div>
        ),
        isOptional: true,
      },
    ],
    onComplete: (data) => console.log('Signup completed:', data),
    showProgressBar: true,
    allowSkip: true,
  },
};

export const WithoutProgressBar: Story = {
  args: {
    steps: sampleSteps.slice(0, 2),
    onComplete: (data) => console.log('Form completed:', data),
    showProgressBar: false,
    allowSkip: false,
  },
};

export const WithCancelAction: Story = {
  args: {
    steps: sampleSteps,
    onComplete: (data) => console.log('Form completed:', data),
    onCancel: () => console.log('Form cancelled'),
    showProgressBar: true,
    allowSkip: false,
  },
};