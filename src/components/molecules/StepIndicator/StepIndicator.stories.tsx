import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { StepIndicator } from './StepIndicator';
import { User, FileText, CheckCircle, Send } from 'lucide-react';

const meta = {
  title: 'Molecules/StepIndicator',
  component: StepIndicator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A visual step indicator showing progress through a multi-step process.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Current active step (0-indexed)',
    },
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Component size',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show step labels',
    },
    showConnectors: {
      control: 'boolean',
      description: 'Show connectors between steps',
    },
    clickable: {
      control: 'boolean',
      description: 'Allow clicking on steps to navigate',
    },
  },
} satisfies Meta<typeof StepIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { id: 'personal', title: 'Personal Info', description: 'Your details' },
  { id: 'project', title: 'Project Details', description: 'What you need' },
  { id: 'review', title: 'Review', description: 'Check details' },
  { id: 'complete', title: 'Complete', description: 'All done!' },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
  },
};

export const WithIcons: Story = {
  args: {
    steps: [
      { id: 'personal', title: 'Personal Info', icon: <User /> },
      { id: 'project', title: 'Project Details', icon: <FileText /> },
      { id: 'review', title: 'Review', icon: <CheckCircle /> },
      { id: 'submit', title: 'Submit', icon: <Send /> },
    ],
    currentStep: 2,
  },
};

export const Small: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    size: 'lg',
  },
};

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    variant: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const NoLabels: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    showLabels: false,
  },
};

export const NoConnectors: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    showConnectors: false,
  },
};

export const Clickable: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
  },
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    
    return (
      <div className="space-y-8">
        <StepIndicator
          steps={defaultSteps}
          currentStep={currentStep}
          clickable
          onStepClick={setCurrentStep}
        />
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Step {currentStep + 1}: {defaultSteps[currentStep].title}
          </h3>
          <p className="text-gray-600">
            Click on any step to navigate
          </p>
        </div>
      </div>
    );
  },
};

export const AllCompleted: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 4,
  },
};

export const FirstStep: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
  },
};

export const FormIntegration: Story = {
  args: {
    steps: [
      { id: 'account', title: 'Account', description: 'Create your account' },
      { id: 'profile', title: 'Profile', description: 'Personal information' },
      { id: 'preferences', title: 'Preferences', description: 'Customize settings' },
      { id: 'confirm', title: 'Confirm', description: 'Review and submit' },
    ],
    currentStep: 0,
  },
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const formSteps = [
      { id: 'account', title: 'Account', description: 'Create your account' },
      { id: 'profile', title: 'Profile', description: 'Personal information' },
      { id: 'preferences', title: 'Preferences', description: 'Customize settings' },
      { id: 'confirm', title: 'Confirm', description: 'Review and submit' },
    ];

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <StepIndicator
          steps={formSteps}
          currentStep={currentStep}
          className="mb-8"
        />
        
        <div className="p-8 bg-gray-50 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {formSteps[currentStep].title}
          </h2>
          <p className="text-gray-600 mb-4">
            {formSteps[currentStep].description}
          </p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter information..."
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="More details..."
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(formSteps.length - 1, currentStep + 1))}
            disabled={currentStep === formSteps.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {currentStep === formSteps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    );
  },
};

export const MinimalSteps: Story = {
  args: {
    steps: [
      { id: 'start', title: 'Start' },
      { id: 'finish', title: 'Finish' },
    ],
    currentStep: 0,
  },
};

export const ManySteps: Story = {
  args: {
    steps: [
      { id: 'step1', title: 'Step 1' },
      { id: 'step2', title: 'Step 2' },
      { id: 'step3', title: 'Step 3' },
      { id: 'step4', title: 'Step 4' },
      { id: 'step5', title: 'Step 5' },
      { id: 'step6', title: 'Step 6' },
    ],
    currentStep: 3,
    size: 'sm',
  },
};