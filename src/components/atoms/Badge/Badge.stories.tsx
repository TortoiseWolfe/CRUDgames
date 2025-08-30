import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';
import { Star, User, Check, AlertCircle, TrendingUp, Tag } from 'lucide-react';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A badge component for displaying status, tags, labels, and other small pieces of information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'purple', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
};

export const Variants: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge icon={<Star className="h-3 w-3" />} variant="primary">
        Featured
      </Badge>
      <Badge icon={<User className="h-3 w-3" />} variant="info">
        Admin
      </Badge>
      <Badge icon={<Check className="h-3 w-3" />} variant="success">
        Verified
      </Badge>
      <Badge icon={<AlertCircle className="h-3 w-3" />} variant="warning">
        Pending
      </Badge>
      <Badge icon={<TrendingUp className="h-3 w-3" />} variant="purple">
        Trending
      </Badge>
    </div>
  ),
};

export const Removable: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge removable onRemove={() => console.log('Removed: JavaScript')}>
        JavaScript
      </Badge>
      <Badge removable variant="primary" onRemove={() => console.log('Removed: TypeScript')}>
        TypeScript
      </Badge>
      <Badge removable variant="success" onRemove={() => console.log('Removed: React')}>
        React
      </Badge>
      <Badge removable variant="purple" onRemove={() => console.log('Removed: Next.js')}>
        Next.js
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Order Status:</span>
        <Badge variant="success" icon={<Check className="h-3 w-3" />}>
          Completed
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Payment:</span>
        <Badge variant="warning">Pending</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Subscription:</span>
        <Badge variant="danger">Expired</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Account:</span>
        <Badge variant="info">Premium</Badge>
      </div>
    </div>
  ),
};

export const TagList: Story = {
  args: {
    children: 'Tag',
  },
  render: () => {
    const tags = ['Design', 'Development', 'Marketing', 'Sales', 'Support'];
    
    return (
      <div className="max-w-md">
        <h3 className="text-sm font-medium mb-2">Selected Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              removable
              icon={<Tag className="h-3 w-3" />}
              onRemove={() => console.log(`Removed: ${tag}`)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    );
  },
};

export const NotificationBadges: Story = {
  args: {
    children: '1',
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <Badge size="sm" variant="danger" className="absolute -top-1 -right-1">
          3
        </Badge>
      </div>
      
      <div className="relative">
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        <Badge size="sm" variant="primary" className="absolute -top-1 -right-1">
          12
        </Badge>
      </div>
    </div>
  ),
};

export const TableExample: Story = {
  args: {
    children: 'Status',
  },
  render: () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant="purple">Admin</Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant="success">Active</Badge>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant="info">Editor</Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant="success">Active</Badge>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">Bob Johnson</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant="outline">Viewer</Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant="warning">Pending</Badge>
          </td>
        </tr>
      </tbody>
    </table>
  ),
};