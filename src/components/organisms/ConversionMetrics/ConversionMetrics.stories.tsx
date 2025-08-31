import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ConversionMetrics } from './ConversionMetrics';
import { Users, TrendingUp, Clock, Target, Award, DollarSign } from 'lucide-react';

const meta = {
  title: 'Organisms/ConversionMetrics',
  component: ConversionMetrics,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dynamic display of success metrics with animations and real-time updates.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['horizontal', 'grid'],
      description: 'Layout style for metrics display',
    },
    animated: {
      control: 'boolean',
      description: 'Enable number animations',
    },
    updateInterval: {
      control: 'number',
      description: 'Auto-update interval in milliseconds (0 to disable)',
    },
  },
} satisfies Meta<typeof ConversionMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMetrics = [
  {
    id: 'conversion-rate',
    label: 'Conversion Rate',
    value: 47,
    suffix: '%',
    icon: <TrendingUp className="h-5 w-5" />,
    trend: { value: 12, isPositive: true },
    color: 'success' as const,
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: 2847,
    icon: <Users className="h-5 w-5" />,
    trend: { value: 8, isPositive: true },
    color: 'primary' as const,
  },
  {
    id: 'avg-session',
    label: 'Avg Session',
    value: 4.2,
    suffix: 'min',
    icon: <Clock className="h-5 w-5" />,
    trend: { value: -3, isPositive: false },
    color: 'warning' as const,
  },
  {
    id: 'goals-met',
    label: 'Goals Met',
    value: 92,
    suffix: '%',
    icon: <Target className="h-5 w-5" />,
    trend: { value: 5, isPositive: true },
    color: 'success' as const,
  },
];

export const Default: Story = {
  args: {
    metrics: sampleMetrics,
    animated: true,
    layout: 'grid',
  },
};

export const HorizontalLayout: Story = {
  args: {
    metrics: sampleMetrics.slice(0, 3),
    animated: true,
    layout: 'horizontal',
  },
};

export const WithoutAnimation: Story = {
  args: {
    metrics: sampleMetrics,
    animated: false,
    layout: 'grid',
  },
};

export const AutoUpdating: Story = {
  args: {
    metrics: sampleMetrics,
    animated: true,
    layout: 'grid',
    updateInterval: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics automatically update every 3 seconds with random variations.',
      },
    },
  },
};

export const RevenueMetrics: Story = {
  args: {
    metrics: [
      {
        id: 'revenue',
        label: 'Monthly Revenue',
        value: 48750,
        prefix: '$',
        icon: <DollarSign className="h-5 w-5" />,
        trend: { value: 23, isPositive: true },
        color: 'success',
      },
      {
        id: 'customers',
        label: 'New Customers',
        value: 342,
        icon: <Users className="h-5 w-5" />,
        trend: { value: 15, isPositive: true },
        color: 'primary',
      },
      {
        id: 'ltv',
        label: 'Customer LTV',
        value: 2840,
        prefix: '$',
        icon: <Award className="h-5 w-5" />,
        trend: { value: 7, isPositive: true },
        color: 'secondary',
      },
      {
        id: 'churn',
        label: 'Churn Rate',
        value: 2.3,
        suffix: '%',
        icon: <TrendingUp className="h-5 w-5" />,
        trend: { value: -0.5, isPositive: true },
        color: 'warning',
      },
    ],
    animated: true,
    layout: 'grid',
  },
};

export const MinimalMetrics: Story = {
  args: {
    metrics: [
      {
        id: 'score',
        label: 'Performance Score',
        value: 98,
        suffix: '/100',
        color: 'success',
      },
      {
        id: 'tasks',
        label: 'Tasks Completed',
        value: 147,
        color: 'primary',
      },
    ],
    animated: true,
    layout: 'horizontal',
  },
};

export const ErrorStateMetrics: Story = {
  args: {
    metrics: [
      {
        id: 'errors',
        label: 'Error Rate',
        value: 12.5,
        suffix: '%',
        trend: { value: 3, isPositive: false },
        color: 'error',
      },
      {
        id: 'downtime',
        label: 'Downtime',
        value: 2.3,
        suffix: 'hrs',
        trend: { value: 1.2, isPositive: false },
        color: 'error',
      },
      {
        id: 'failures',
        label: 'Failed Requests',
        value: 523,
        trend: { value: 45, isPositive: false },
        color: 'warning',
      },
      {
        id: 'recovery',
        label: 'Recovery Time',
        value: 4.7,
        suffix: 'min',
        trend: { value: -2, isPositive: true },
        color: 'secondary',
      },
    ],
    animated: true,
    layout: 'grid',
  },
};