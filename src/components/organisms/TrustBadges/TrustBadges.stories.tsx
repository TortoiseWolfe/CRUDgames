import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TrustBadges } from './TrustBadges';
import { Shield, Lock, Award, CheckCircle, Users, TrendingUp, Star, Zap, Globe, Heart } from 'lucide-react';

const meta = {
  title: 'Organisms/TrustBadges',
  component: TrustBadges,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Trust badges component for displaying security, certifications, and social proof indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'grid', 'compact', 'detailed'],
    },
  },
} satisfies Meta<typeof TrustBadges>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultBadges = [
  {
    id: '1',
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure',
    description: 'SSL encrypted',
    value: '256-bit',
  },
  {
    id: '2',
    icon: <Users className="h-6 w-6" />,
    title: 'Active Users',
    value: '10K+',
    description: 'Growing community',
  },
  {
    id: '3',
    icon: <Star className="h-6 w-6" />,
    title: 'Rated',
    value: '4.9/5',
    description: 'Customer reviews',
    highlight: true,
  },
  {
    id: '4',
    icon: <Zap className="h-6 w-6" />,
    title: 'Fast Setup',
    value: '5 min',
    description: 'Quick installation',
  },
];

export const Default: Story = {
  args: {
    badges: defaultBadges,
  },
};

export const Horizontal: Story = {
  args: {
    badges: defaultBadges,
    variant: 'horizontal',
  },
};

export const Grid: Story = {
  args: {
    badges: defaultBadges,
    variant: 'grid',
  },
};

export const Compact: Story = {
  args: {
    badges: defaultBadges,
    variant: 'compact',
  },
};

export const Detailed: Story = {
  args: {
    badges: defaultBadges,
    variant: 'detailed',
  },
};

export const NoDescriptions: Story = {
  args: {
    badges: defaultBadges,
    showDescriptions: false,
  },
};

export const SecurityFocused: Story = {
  args: {
    badges: [
      {
        id: '1',
        icon: <Shield className="h-6 w-6" />,
        title: 'SSL Encrypted',
        description: 'All data encrypted in transit',
      },
      {
        id: '2',
        icon: <Lock className="h-6 w-6" />,
        title: 'GDPR Compliant',
        description: 'Privacy regulations met',
      },
      {
        id: '3',
        icon: <CheckCircle className="h-6 w-6" />,
        title: 'SOC 2 Certified',
        description: 'Enterprise security standards',
      },
      {
        id: '4',
        icon: <Award className="h-6 w-6" />,
        title: 'ISO 27001',
        description: 'Information security certified',
      },
    ],
    variant: 'grid',
  },
};

export const SocialProof: Story = {
  args: {
    badges: [
      {
        id: '1',
        icon: <Users className="h-6 w-6" />,
        title: 'Active Players',
        value: '50K+',
        highlight: true,
      },
      {
        id: '2',
        icon: <TrendingUp className="h-6 w-6" />,
        title: 'Productivity Boost',
        value: '+40%',
      },
      {
        id: '3',
        icon: <Star className="h-6 w-6" />,
        title: 'User Rating',
        value: '4.9',
      },
      {
        id: '4',
        icon: <Heart className="h-6 w-6" />,
        title: 'Satisfaction',
        value: '98%',
      },
    ],
    variant: 'compact',
  },
};

export const MinimalBadges: Story = {
  args: {
    badges: [
      { id: '1', title: 'Free Trial' },
      { id: '2', title: 'No Credit Card' },
      { id: '3', title: 'Cancel Anytime' },
    ],
    variant: 'compact',
    showDescriptions: false,
  },
};

export const HighlightExample: Story = {
  args: {
    badges: [
      {
        id: '1',
        icon: <Globe className="h-6 w-6" />,
        title: 'Worldwide',
        description: 'Available globally',
      },
      {
        id: '2',
        icon: <Award className="h-6 w-6" />,
        title: 'Award Winner',
        description: 'Best Gamification 2024',
        highlight: true,
      },
      {
        id: '3',
        icon: <Zap className="h-6 w-6" />,
        title: 'Lightning Fast',
        description: 'Instant setup',
      },
    ],
    variant: 'horizontal',
  },
};

export const CustomLayout: Story = {
  args: {
    badges: [],  // Will use inline badges in render
  },
  render: () => (
    <div className="space-y-8 p-8 bg-gray-50 rounded-lg">
      <div>
        <h3 className="text-center text-lg font-semibold mb-4">Trusted By</h3>
        <TrustBadges
          badges={[
            { id: '1', title: 'Fortune 500', value: '12' },
            { id: '2', title: 'Startups', value: '500+' },
            { id: '3', title: 'Countries', value: '45' },
          ]}
          variant="compact"
        />
      </div>
      
      <div>
        <h3 className="text-center text-lg font-semibold mb-4">Security & Compliance</h3>
        <TrustBadges
          badges={[
            {
              id: '1',
              icon: <Shield className="h-6 w-6" />,
              title: 'Enterprise Security',
              description: 'Bank-level encryption and security protocols',
            },
            {
              id: '2',
              icon: <Lock className="h-6 w-6" />,
              title: 'Data Protection',
              description: 'Your data is safe and never shared',
            },
          ]}
          variant="detailed"
        />
      </div>
    </div>
  ),
};