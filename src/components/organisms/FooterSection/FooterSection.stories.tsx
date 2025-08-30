import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FooterSection } from './FooterSection';

const meta = {
  title: 'Organisms/FooterSection',
  component: FooterSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive footer component with navigation, contact info, newsletter, and social links.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onNewsletterSubmit: { action: 'newsletter submitted' },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'centered', 'modern'],
    },
  },
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    companyName: 'TechCorp Solutions',
    companyDescription: 'Building innovative solutions for tomorrow\'s challenges.',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'github', url: 'https://github.com' },
    ],
    contactInfo: {
      email: 'hello@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Innovation Street, Tech Valley, CA 94000',
    },
    onNewsletterSubmit: (email) => console.log('Newsletter signup:', email),
  },
};

export const Minimal: Story = {
  args: {
    companyName: 'MinimalCo',
    variant: 'minimal',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'github', url: 'https://github.com' },
    ],
  },
};

export const Centered: Story = {
  args: {
    companyName: 'Creative Agency',
    companyDescription: 'We craft digital experiences that inspire and delight.',
    variant: 'centered',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
    ],
  },
};

export const Modern: Story = {
  args: {
    ...Default.args,
    variant: 'modern',
    newsletterTitle: 'Get the Latest Updates',
    newsletterDescription: 'Join 10,000+ subscribers and never miss an update.',
  },
};

export const CustomColumns: Story = {
  args: {
    companyName: 'CustomCorp',
    columns: [
      {
        title: 'Solutions',
        links: [
          { label: 'Enterprise', href: '#enterprise' },
          { label: 'Small Business', href: '#smb' },
          { label: 'Startups', href: '#startups' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help Center', href: '#help' },
          { label: 'Community', href: '#community' },
          { label: 'Contact Us', href: '#contact' },
        ],
      },
      {
        title: 'Developers',
        links: [
          { label: 'API Docs', href: '#api', external: true },
          { label: 'SDKs', href: '#sdks' },
          { label: 'Webhooks', href: '#webhooks' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
    ],
  },
};

export const WithoutNewsletter: Story = {
  args: {
    companyName: 'Simple Corp',
    companyDescription: 'Keeping things simple and effective.',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
    ],
    contactInfo: {
      email: 'info@simplecorp.com',
    },
  },
};

export const CompleteFooter: Story = {
  args: {
    companyName: 'Global Enterprise Inc.',
    companyDescription: 'Leading the way in digital transformation across industries worldwide.',
    copyrightText: '© 2025 Global Enterprise Inc. All rights reserved. Patent pending.',
    variant: 'modern',
    columns: [
      {
        title: 'Products',
        links: [
          { label: 'Cloud Platform', href: '#cloud' },
          { label: 'Analytics Suite', href: '#analytics' },
          { label: 'Security Tools', href: '#security' },
          { label: 'API Gateway', href: '#api' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'For Enterprise', href: '#enterprise' },
          { label: 'For Startups', href: '#startups' },
          { label: 'For Government', href: '#government' },
          { label: 'For Education', href: '#education' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '#docs', external: true },
          { label: 'Tutorials', href: '#tutorials' },
          { label: 'Blog', href: '#blog' },
          { label: 'Webinars', href: '#webinars' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com', label: 'Follow us on Facebook' },
      { platform: 'twitter', url: 'https://twitter.com', label: 'Follow us on Twitter' },
      { platform: 'linkedin', url: 'https://linkedin.com', label: 'Connect on LinkedIn' },
      { platform: 'youtube', url: 'https://youtube.com', label: 'Watch on YouTube' },
      { platform: 'github', url: 'https://github.com', label: 'Contribute on GitHub' },
    ],
    contactInfo: {
      email: 'contact@globalenterprise.com',
      phone: '+1 (800) 555-0100',
      address: '1 Enterprise Plaza, Suite 1000, New York, NY 10001',
    },
    newsletterTitle: 'Stay Ahead of the Curve',
    newsletterDescription: 'Get weekly insights from industry leaders and exclusive content.',
    onNewsletterSubmit: (email) => console.log('Premium newsletter signup:', email),
    showBackToTop: true,
  },
};