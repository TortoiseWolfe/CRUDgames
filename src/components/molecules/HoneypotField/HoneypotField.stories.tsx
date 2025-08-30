import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HoneypotField } from './HoneypotField';
import { useState } from 'react';
import { Button } from '@/components/atoms/Button';

const meta = {
  title: 'Molecules/HoneypotField',
  component: HoneypotField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Invisible honeypot field to catch spam bots. This field is hidden from real users but visible to bots.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoneypotField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomName: Story = {
  args: {
    fieldName: 'url_field',
  },
};

export const WithTrapHandler: Story = {
  args: {
    onTrap: () => alert('Bot detected! Form submission would be blocked.'),
  },
};

export const DemoForm: Story = {
  render: () => {
    const [isBot, setIsBot] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isBot) {
        alert('Bot detected! Submission blocked.');
      } else {
        setSubmitted(true);
      }
    };
    
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Contact Form (with Honeypot)</h3>
          
          {/* Visible fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {/* Honeypot field - invisible to users */}
          <HoneypotField 
            onTrap={() => setIsBot(true)}
            fieldName="website"
          />
          
          <Button type="submit" variant="primary" className="w-full">
            Submit
          </Button>
          
          {submitted && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">
              Form submitted successfully! (Human user detected)
            </div>
          )}
          
          {isBot && (
            <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">
              Bot detected! Honeypot field was filled.
            </div>
          )}
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
          <p className="font-semibold mb-2">How it works:</p>
          <ul className="space-y-1 text-gray-600">
            <li>• The honeypot field is invisible to real users</li>
            <li>• Bots typically fill all fields they find</li>
            <li>• If the honeypot is filled, we know it&apos;s a bot</li>
            <li>• The form submission can then be blocked</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const TestMode: Story = {
  render: () => {
    const [trapTriggered, setTrapTriggered] = useState(false);
    
    return (
      <div className="space-y-6">
        <div className="p-4 bg-yellow-50 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Test Mode:</strong> The honeypot field is shown below for demonstration.
            In production, it would be completely hidden.
          </p>
        </div>
        
        <div className="p-4 border-2 border-dashed border-gray-300 rounded">
          <p className="text-sm text-gray-600 mb-2">Honeypot field (normally hidden):</p>
          <input
            type="text"
            placeholder="Bot trap - fill this to simulate a bot"
            className="w-full px-3 py-2 border border-red-300 rounded"
            onChange={(e) => {
              if (e.target.value) {
                setTrapTriggered(true);
              } else {
                setTrapTriggered(false);
              }
            }}
          />
          
          {trapTriggered && (
            <p className="mt-2 text-red-600 font-semibold">
              🚨 Bot detected! Form would be blocked.
            </p>
          )}
        </div>
        
        <HoneypotField onTrap={() => console.log('Honeypot triggered!')} />
      </div>
    );
  },
};