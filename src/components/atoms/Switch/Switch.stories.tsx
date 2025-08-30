import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Switch } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component for binary on/off states, commonly used in settings and forms.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch',
    },
    label: {
      control: 'text',
      description: 'Label text for the switch',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default-switch',
  },
};

export const WithLabel: Story = {
  args: {
    id: 'labeled-switch',
    label: 'Enable notifications',
  },
};

export const WithDescription: Story = {
  args: {
    id: 'described-switch',
    label: 'Marketing emails',
    description: 'Receive emails about new products and features',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small switch" id="small" />
      <Switch size="md" label="Medium switch" id="medium" />
      <Switch size="lg" label="Large switch" id="large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch variant="default" label="Default" defaultChecked id="var-default" />
      <Switch variant="success" label="Success" defaultChecked id="var-success" />
      <Switch variant="warning" label="Warning" defaultChecked id="var-warning" />
      <Switch variant="danger" label="Danger" defaultChecked id="var-danger" />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Switch
        labelPosition="right"
        label="Label on right"
        description="This is the default position"
        id="label-right"
      />
      <Switch
        labelPosition="left"
        label="Label on left"
        description="Alternative label position"
        id="label-left"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Disabled unchecked" disabled id="disabled-off" />
      <Switch label="Disabled checked" disabled defaultChecked id="disabled-on" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    
    return (
      <div className="space-y-4">
        <Switch
          id="controlled"
          label="Controlled switch"
          checked={isChecked}
          onCheckedChange={setIsChecked}
        />
        <p className="text-sm text-gray-600">
          Switch is: <strong>{isChecked ? 'ON' : 'OFF'}</strong>
        </p>
        <button
          onClick={() => setIsChecked(!isChecked)}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          Toggle externally
        </button>
      </div>
    );
  },
};

export const SettingsExample: Story = {
  render: () => (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
      <div className="space-y-4">
        <Switch
          id="email-notifications"
          label="Email notifications"
          description="Get emails to stay up to date"
          defaultChecked
        />
        <Switch
          id="push-notifications"
          label="Push notifications"
          description="Get push notifications in-app"
          defaultChecked
        />
        <Switch
          id="sms-notifications"
          label="SMS notifications"
          description="Get text messages for important updates"
        />
        <Switch
          id="marketing"
          label="Marketing communications"
          description="Receive updates about new features and offers"
        />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      publicProfile: true,
      emailVisible: false,
      allowMessages: true,
      newsletter: false,
    });

    return (
      <form className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <Switch
            id="public-profile"
            label="Public profile"
            description="Make your profile visible to everyone"
            checked={formData.publicProfile}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, publicProfile: checked })
            }
          />
          <Switch
            id="email-visible"
            label="Show email address"
            description="Display your email on your profile"
            checked={formData.emailVisible}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, emailVisible: checked })
            }
          />
          <Switch
            id="allow-messages"
            label="Allow direct messages"
            description="Let others send you messages"
            checked={formData.allowMessages}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, allowMessages: checked })
            }
          />
          <Switch
            id="newsletter"
            label="Subscribe to newsletter"
            description="Get weekly updates and tips"
            checked={formData.newsletter}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, newsletter: checked })
            }
          />
        </div>
        <div className="mt-6 pt-4 border-t">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              console.log('Form data:', formData);
            }}
          >
            Save Settings
          </button>
        </div>
      </form>
    );
  },
};

export const ListExample: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">Feature Flags</h3>
      <div className="divide-y">
        <div className="flex items-center justify-between py-4">
          <div>
            <h4 className="font-medium">Dark Mode</h4>
            <p className="text-sm text-gray-500">Enable dark theme across the application</p>
          </div>
          <Switch id="dark-mode" variant="default" />
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <h4 className="font-medium">Beta Features</h4>
            <p className="text-sm text-gray-500">Try out new features before they&apos;re released</p>
          </div>
          <Switch id="beta" variant="warning" defaultChecked />
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <h4 className="font-medium">Analytics</h4>
            <p className="text-sm text-gray-500">Help us improve by sharing usage data</p>
          </div>
          <Switch id="analytics" variant="success" defaultChecked />
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <h4 className="font-medium">Maintenance Mode</h4>
            <p className="text-sm text-gray-500">Temporarily disable user access</p>
          </div>
          <Switch id="maintenance" variant="danger" />
        </div>
      </div>
    </div>
  ),
};