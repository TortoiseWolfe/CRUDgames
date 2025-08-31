// eslint-disable-next-line storybook/no-renderer-packages
import type { StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { User } from 'lucide-react';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component for displaying user profile images with fallback support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Shape of the avatar',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
    },
    name: {
      control: 'text',
      description: 'Name to generate initials from',
    },
    initials: {
      control: 'text',
      description: 'Custom initials to display',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
      description: 'Status indicator',
    },
    statusPosition: {
      control: 'select',
      options: ['top-right', 'bottom-right', 'top-left', 'bottom-left'],
      description: 'Position of status indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    alt: 'User avatar',
    name: 'John Doe',
  },
};

export const WithInitials: Story = {
  name: 'With Initials',
  args: {
    initials: 'JD',
    alt: 'John Doe',
  },
};

export const WithName: Story = {
  name: 'Generated Initials from Name',
  args: {
    name: 'Jane Smith',
  },
};

export const WithStatus: Story = {
  name: 'With Status Indicator',
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    alt: 'User avatar',
    status: 'online',
  },
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" initials="XS" />
      <Avatar size="sm" initials="SM" />
      <Avatar size="md" initials="MD" />
      <Avatar size="lg" initials="LG" />
      <Avatar size="xl" initials="XL" />
      <Avatar size="2xl" initials="2X" />
    </div>
  ),
};

export const Shapes: Story = {
  name: 'Shape Variants',
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar 
        shape="circle" 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
        alt="Circle avatar"
      />
      <Avatar 
        shape="square" 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
        alt="Square avatar"
      />
      <Avatar 
        shape="rounded" 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
        alt="Rounded avatar"
      />
    </div>
  ),
};

export const StatusIndicators: Story = {
  name: 'Status Indicators',
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="text-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
          status="online"
          alt="Online"
        />
        <p className="text-sm mt-2">Online</p>
      </div>
      <div className="text-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
          status="offline"
          alt="Offline"
        />
        <p className="text-sm mt-2">Offline</p>
      </div>
      <div className="text-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
          status="away"
          alt="Away"
        />
        <p className="text-sm mt-2">Away</p>
      </div>
      <div className="text-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
          status="busy"
          alt="Busy"
        />
        <p className="text-sm mt-2">Busy</p>
      </div>
    </div>
  ),
};

export const StatusPositions: Story = {
  name: 'Status Positions',
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="text-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
          status="online"
          statusPosition="top-right"
          alt="Top Right"
          size="lg"
        />
        <p className="text-sm mt-2">Top Right</p>
      </div>
      <div className="text-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
          status="online"
          statusPosition="top-left"
          alt="Top Left"
          size="lg"
        />
        <p className="text-sm mt-2">Top Left</p>
      </div>
      <div className="text-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
          status="online"
          statusPosition="bottom-right"
          alt="Bottom Right"
          size="lg"
        />
        <p className="text-sm mt-2">Bottom Right</p>
      </div>
      <div className="text-center">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
          status="online"
          statusPosition="bottom-left"
          alt="Bottom Left"
          size="lg"
        />
        <p className="text-sm mt-2">Bottom Left</p>
      </div>
    </div>
  ),
};

export const WithFallbackIcon: Story = {
  name: 'Custom Fallback Icon',
  args: {
    fallbackIcon: <User className="h-6 w-6" />,
    size: 'lg',
  },
};

export const Clickable: Story = {
  name: 'Clickable Avatar',
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    alt: 'Clickable avatar',
    onClick: () => alert('Avatar clicked!'),
  },
};

export const ImageLoadError: Story = {
  name: 'Failed Image Load',
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    name: 'Error Fallback',
  },
};

export const GridLayout: Story = {
  name: 'Avatar Grid',
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 8 }, (_, i) => (
        <Avatar
          key={i}
          src={`https://i.pravatar.cc/150?img=${i + 1}`}
          alt={`User ${i + 1}`}
          status={i % 2 === 0 ? 'online' : undefined}
        />
      ))}
    </div>
  ),
};