import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroSection } from './HeroSection';

const meta = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'High-impact landing section with headline, value proposition, and CTAs for maximum conversion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    primaryCtaAction: { action: 'primary CTA clicked' },
    secondaryCtaAction: { action: 'secondary CTA clicked' },
    variant: {
      control: 'select',
      options: ['default', 'centered', 'split', 'minimal'],
    },
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: 'Transform Your Business with Expert Solutions',
    highlightedText: 'Expert Solutions',
    subheadline: 'Get personalized consulting, development, and design services tailored to your unique needs. Start your journey with a free consultation.',
    primaryCtaText: 'Get Started Now',
    primaryCtaAction: () => console.log('Primary CTA clicked'),
    secondaryCtaText: 'Learn More',
    secondaryCtaAction: () => console.log('Secondary CTA clicked'),
  },
};

export const Centered: Story = {
  args: {
    ...Default.args,
    variant: 'centered',
    headline: 'Build Something Amazing Today',
    highlightedText: 'Amazing',
    badges: ['🚀 Launch Ready', '⚡ Lightning Fast', '🛡️ Enterprise Secure'],
  },
};

export const WithVideo: Story = {
  args: {
    ...Default.args,
    showVideoButton: true,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
};

export const Minimal: Story = {
  args: {
    headline: 'Simple. Powerful. Effective.',
    subheadline: 'The only tool you need to manage your entire workflow.',
    primaryCtaText: 'Start Free Trial',
    primaryCtaAction: () => console.log('Start trial'),
    variant: 'minimal',
  },
};

export const WithBackgroundImage: Story = {
  args: {
    ...Default.args,
    backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600',
    headline: 'Elevate Your Business to New Heights',
    highlightedText: 'New Heights',
    subheadline: 'Join thousands of companies transforming their operations with our platform.',
  },
};

export const CustomTrustIndicators: Story = {
  args: {
    ...Default.args,
    trustIndicators: [
      { value: '10M+', label: 'Active Users' },
      { value: '150+', label: 'Countries' },
      { value: '99.9%', label: 'Uptime' },
      { value: '#1', label: 'Rated Platform' },
    ],
  },
};

export const SplitVariant: Story = {
  args: {
    ...Default.args,
    variant: 'split',
    headline: 'Grow Your Business with Confidence',
    highlightedText: 'Confidence',
    subheadline: 'Our platform provides everything you need to scale sustainably and efficiently.',
  },
};

export const WithGradientBackground: Story = {
  args: {
    ...Default.args,
    backgroundGradient: 'from-purple-50 to-pink-100',
    headline: 'Creative Solutions for Modern Challenges',
    highlightedText: 'Creative Solutions',
  },
};

export const NoSecondaryAction: Story = {
  args: {
    headline: 'Start Your Journey Today',
    highlightedText: 'Journey',
    subheadline: 'One button. One decision. Unlimited possibilities.',
    primaryCtaText: 'Begin Now',
    primaryCtaAction: () => console.log('Begin'),
    variant: 'centered',
  },
};

export const FullFeatured: Story = {
  args: {
    headline: 'The Future of Work Starts Here',
    highlightedText: 'Future of Work',
    subheadline: 'Revolutionize your workflow with AI-powered tools designed for the modern professional.',
    primaryCtaText: 'Get Early Access',
    primaryCtaAction: () => console.log('Early access'),
    secondaryCtaText: 'Watch Demo',
    secondaryCtaAction: () => console.log('Watch demo'),
    showVideoButton: true,
    videoUrl: 'https://example.com/demo',
    badges: ['🎯 Product Hunt #1', '🏆 Best of 2025', '✨ AI Powered'],
    variant: 'centered',
    backgroundGradient: 'from-gradient-start to-gradient-end',
    trustIndicators: [
      { value: '50K+', label: 'Teams' },
      { value: '4.9/5', label: 'Rating' },
      { value: '60%', label: 'Time Saved' },
      { value: '$2M+', label: 'Revenue Generated' },
    ],
  },
};