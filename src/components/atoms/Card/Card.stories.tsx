// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Versatile card component for content containers with various styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'ghost'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding size',
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    clickable: {
      control: 'boolean',
      description: 'Make card clickable with cursor pointer',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">This is a basic card with some content inside.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <Card variant="default">
        <h3 className="font-semibold mb-2">Default Card</h3>
        <p className="text-sm text-gray-600">Standard card appearance</p>
      </Card>
      <Card variant="bordered">
        <h3 className="font-semibold mb-2">Bordered Card</h3>
        <p className="text-sm text-gray-600">Card with border</p>
      </Card>
      <Card variant="elevated">
        <h3 className="font-semibold mb-2">Elevated Card</h3>
        <p className="text-sm text-gray-600">Card with shadow elevation</p>
      </Card>
      <Card variant="ghost">
        <h3 className="font-semibold mb-2">Ghost Card</h3>
        <p className="text-sm text-gray-600">Minimal card style</p>
      </Card>
    </div>
  ),
};

export const PaddingSizes: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Card padding="none">
        <div className="bg-blue-100 p-2">No padding (content handles padding)</div>
      </Card>
      <Card padding="sm">
        <div>Small padding</div>
      </Card>
      <Card padding="md">
        <div>Medium padding (default)</div>
      </Card>
      <Card padding="lg">
        <div>Large padding</div>
      </Card>
      <Card padding="xl">
        <div>Extra large padding</div>
      </Card>
    </div>
  ),
};

export const WithHover: Story = {
  args: {
    hover: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Hover Me</h3>
        <p className="text-gray-600">This card has hover effects enabled.</p>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    hover: true,
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Click Me</h3>
        <p className="text-gray-600">This card is clickable with cursor pointer.</p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    padding: 'none',
    children: (
      <>
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"
          alt="Sofa"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Product Card</h3>
          <p className="text-gray-600 mb-4">Beautiful modern sofa for your living room.</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">$599</span>
            <Button size="sm">Add to Cart</Button>
          </div>
        </div>
      </>
    ),
  },
};

export const ProfileCard: Story = {
  args: {
    children: (
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          JD
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-gray-600">Software Engineer</p>
          <div className="flex gap-2 mt-2">
            <Badge size="sm" variant="primary">React</Badge>
            <Badge size="sm" variant="secondary">TypeScript</Badge>
          </div>
        </div>
      </div>
    ),
  },
};

export const StatsCard: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
        <div className="text-gray-600 text-sm uppercase tracking-wide">Total Users</div>
        <div className="text-green-600 text-sm mt-2">↑ 12% from last month</div>
      </div>
    ),
  },
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[800px]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} hover clickable>
          <h3 className="font-semibold mb-2">Card {i}</h3>
          <p className="text-sm text-gray-600">Content for card number {i}</p>
        </Card>
      ))}
    </div>
  ),
};

export const ColoredCards: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Card className="bg-blue-50 border-blue-200">
        <h3 className="text-blue-900 font-semibold mb-2">Info Card</h3>
        <p className="text-blue-700">This is an informational message.</p>
      </Card>
      <Card className="bg-green-50 border-green-200">
        <h3 className="text-green-900 font-semibold mb-2">Success Card</h3>
        <p className="text-green-700">Operation completed successfully!</p>
      </Card>
      <Card className="bg-yellow-50 border-yellow-200">
        <h3 className="text-yellow-900 font-semibold mb-2">Warning Card</h3>
        <p className="text-yellow-700">Please review before proceeding.</p>
      </Card>
      <Card className="bg-red-50 border-red-200">
        <h3 className="text-red-900 font-semibold mb-2">Error Card</h3>
        <p className="text-red-700">Something went wrong.</p>
      </Card>
    </div>
  ),
};