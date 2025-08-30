import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { Info, HelpCircle, AlertCircle } from 'lucide-react';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component that displays additional information on hover, click, or focus.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position relative to trigger',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
      description: 'How to trigger the tooltip',
    },
    delay: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointer',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  args: {
    content: 'Tooltip',
    children: <div />,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-16 p-16">
      <Tooltip content="Top tooltip" position="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Triggers: Story = {
  args: {
    content: 'Tooltip',
    children: <div />,
  },
  render: () => (
    <div className="flex gap-8">
      <Tooltip content="Hover to show" trigger="hover">
        <Button variant="secondary">Hover</Button>
      </Tooltip>
      <Tooltip content="Click to toggle" trigger="click">
        <Button variant="secondary">Click</Button>
      </Tooltip>
      <Tooltip content="Focus to show" trigger="focus">
        <Button variant="secondary">Focus</Button>
      </Tooltip>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    content: 'Tooltip',
    children: <div />,
  },
  render: () => (
    <div className="flex items-center gap-4">
      <span>Settings</span>
      <Tooltip content="Adjust your preferences">
        <Info className="h-4 w-4 text-gray-500 cursor-help" />
      </Tooltip>
      
      <span>Help</span>
      <Tooltip content="Click for more information" trigger="click">
        <HelpCircle className="h-4 w-4 text-blue-500 cursor-pointer" />
      </Tooltip>
      
      <span>Warning</span>
      <Tooltip content="This action cannot be undone">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
      </Tooltip>
    </div>
  ),
};

export const NoArrow: Story = {
  args: {
    content: 'Tooltip without arrow',
    arrow: false,
    children: <Button>No Arrow</Button>,
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'Tooltip',
    children: <div />,
  },
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="No delay" delay={0}>
        <Button variant="secondary">Instant</Button>
      </Tooltip>
      <Tooltip content="200ms delay (default)" delay={200}>
        <Button variant="secondary">Default</Button>
      </Tooltip>
      <Tooltip content="1 second delay" delay={1000}>
        <Button variant="secondary">Slow</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content: 'This is a much longer tooltip message that contains more detailed information',
    children: <Button>Long Content</Button>,
    contentClassName: 'max-w-xs whitespace-normal',
  },
};

export const CustomContent: Story = {
  args: {
    content: (
      <div>
        <strong>Custom HTML Content</strong>
        <ul className="mt-2 text-xs">
          <li>• Feature 1</li>
          <li>• Feature 2</li>
          <li>• Feature 3</li>
        </ul>
      </div>
    ),
    children: <Button>Rich Content</Button>,
    contentClassName: 'whitespace-normal',
  },
};

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
    children: <Button variant="secondary">Disabled Tooltip</Button>,
  },
};

export const FormExample: Story = {
  args: {
    content: 'Example',
    children: <div />,
  },
  render: () => (
    <form className="space-y-4 p-6 bg-white rounded-lg shadow max-w-md">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-1">
          Email Address
          <Tooltip content="We'll never share your email with anyone">
            <Info className="h-3 w-3 text-gray-400" />
          </Tooltip>
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-1">
          Password
          <Tooltip 
            content="Password must be at least 8 characters and include a number"
            trigger="click"
          >
            <HelpCircle className="h-3 w-3 text-blue-500 cursor-pointer" />
          </Tooltip>
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter password"
        />
      </div>
      
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-1">
          API Key
          <Tooltip content="Find this in your account settings">
            <Info className="h-3 w-3 text-gray-400" />
          </Tooltip>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="sk_..."
        />
      </div>
    </form>
  ),
};

export const TableExample: Story = {
  args: {
    content: 'Example',
    children: <div />,
  },
  render: () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Feature
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              Status
              <Tooltip content="Current deployment status">
                <Info className="h-3 w-3" />
              </Tooltip>
            </span>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">Authentication</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-green-600">Active</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Tooltip content="Configure authentication settings">
              <button className="text-blue-600 hover:text-blue-800">Configure</button>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">Analytics</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-yellow-600">Pending</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Tooltip content="Enable analytics tracking">
              <button className="text-blue-600 hover:text-blue-800">Enable</button>
            </Tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  ),
};