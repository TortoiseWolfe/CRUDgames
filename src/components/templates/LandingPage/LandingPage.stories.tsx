// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { LandingPage } from './LandingPage';
import { Shield, Zap, Users, TrendingUp, Award, CheckCircle } from 'lucide-react';

const meta = {
  title: 'Templates/LandingPage',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete landing page template with hero, trust badges, metrics, testimonials, and form integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hero: {
      description: 'Hero section configuration',
    },
    navigation: {
      description: 'Navigation header configuration',
    },
    trustBadges: {
      description: 'Trust badges section configuration',
    },
    metrics: {
      description: 'Conversion metrics to display',
    },
    testimonials: {
      description: 'Customer testimonials',
    },
    footer: {
      description: 'Footer section configuration',
    },
    form: {
      description: 'Form configuration and behavior',
    },
  },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc',
    content: 'This product transformed our business operations. The ROI was immediate and substantial.',
    rating: 5,
    featured: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Innovation Labs',
    content: 'Best decision we made this year. The team support is exceptional.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'Digital Solutions',
    content: 'Intuitive, powerful, and exactly what we needed to scale.',
    rating: 5,
  },
];

const defaultTrustBadges = [
  {
    id: '1',
    title: 'Enterprise Security',
    icon: <Shield className="h-6 w-6" />,
    description: 'SOC 2 Type II Certified',
    highlight: true,
  },
  {
    id: '2',
    title: 'Lightning Fast',
    icon: <Zap className="h-6 w-6" />,
    description: '99.9% Uptime SLA',
  },
  {
    id: '3',
    title: 'Trusted by Thousands',
    icon: <Users className="h-6 w-6" />,
    description: '10,000+ Active Users',
  },
  {
    id: '4',
    title: 'Industry Leader',
    icon: <Award className="h-6 w-6" />,
    description: 'G2 Leader 2024',
  },
];

const defaultMetrics = [
  {
    id: '1',
    label: 'Active Users',
    value: 10000,
    suffix: '+',
    icon: <Users className="h-5 w-5" />,
    color: 'primary' as const,
  },
  {
    id: '2',
    label: 'Revenue Growth',
    value: 150,
    suffix: '%',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'success' as const,
  },
  {
    id: '3',
    label: 'Customer Satisfaction',
    value: 4.9,
    suffix: '/5',
    icon: <Award className="h-5 w-5" />,
    color: 'warning' as const,
  },
  {
    id: '4',
    label: 'Response Time',
    value: '<2',
    suffix: 'hrs',
    icon: <Zap className="h-5 w-5" />,
    color: 'secondary' as const,
  },
];

export const Default: Story = {
  args: {
    hero: {
      headline: 'Transform Your Business with',
      highlightedText: 'AI-Powered Solutions',
      subheadline: 'Join thousands of companies already leveraging our platform to accelerate growth and streamline operations.',
      primaryCtaText: 'Start Free Trial',
      secondaryCtaText: 'Watch Demo',
      trustIndicators: [
        { value: '10,000+', label: 'Active Users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '24/7', label: 'Support' },
      ],
    },
    footer: {
      companyName: 'CRUDgames',
      companyDescription: 'Building the future of business automation.',
      contactInfo: {
        email: 'hello@crudgames.com',
        phone: '1-800-CRUD',
      },
    },
  },
};

export const WithFullContent: Story = {
  args: {
    navigation: {
      logo: <span className="text-2xl font-bold">CRUDgames</span>,
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ],
      ctaText: 'Get Started',
    },
    hero: {
      headline: 'Transform Your Business with',
      highlightedText: 'AI-Powered Solutions',
      subheadline: 'Join thousands of companies already leveraging our platform to accelerate growth and streamline operations.',
      primaryCtaText: 'Start Free Trial',
      secondaryCtaText: 'Watch Demo',
      backgroundGradient: 'from-blue-600 to-purple-600',
      trustIndicators: [
        { value: '10,000+', label: 'Active Users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '24/7', label: 'Support' },
      ],
    },
    trustBadges: {
      badges: defaultTrustBadges,
    },
    metrics: defaultMetrics,
    testimonials: defaultTestimonials,
    footer: {
      companyName: 'CRUDgames',
      companyDescription: 'Building the future of business automation.',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com/crudgames' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/crudgames' },
        { platform: 'github', url: 'https://github.com/crudgames' },
      ],
      contactInfo: {
        email: 'hello@crudgames.com',
        phone: '1-800-CRUD',
        address: '123 Innovation Drive, Tech City, TC 12345',
      },
      newsletterTitle: 'Stay Updated',
      newsletterDescription: 'Get the latest updates and exclusive offers.',
    },
  },
};

export const WithModalForm: Story = {
  args: {
    hero: {
      headline: 'Launch Your Next Project',
      highlightedText: 'In Record Time',
      subheadline: 'Professional development services tailored to your needs.',
      primaryCtaText: 'Get Quote',
      secondaryCtaText: 'View Portfolio',
    },
    footer: {
      companyName: 'CRUDgames',
      companyDescription: 'Your trusted development partner.',
    },
    form: {
      showAsModal: true,
      modalTitle: 'Get Your Free Quote',
      modalDescription: 'Tell us about your project and we\'ll get back to you within 24 hours.',
      onSubmitSuccess: (data) => console.log('Form submitted:', data),
      onSubmitError: (error) => console.error('Form error:', error),
    },
  },
};

export const WithInlineForm: Story = {
  args: {
    hero: {
      headline: 'Ready to Get Started?',
      highlightedText: 'Let\'s Talk',
      subheadline: 'Fill out the form below and we\'ll be in touch.',
      primaryCtaText: 'Contact Us',
    },
    footer: {
      companyName: 'CRUDgames',
    },
    form: {
      showAsModal: false,
      onSubmitSuccess: (data) => console.log('Form submitted:', data),
    },
  },
};

export const MinimalLayout: Story = {
  args: {
    hero: {
      headline: 'Simple and',
      highlightedText: 'Effective',
      primaryCtaText: 'Learn More',
    },
    footer: {
      companyName: 'CRUDgames',
    },
  },
};

export const WithCustomContent: Story = {
  args: {
    hero: {
      headline: 'Discover the Power of',
      highlightedText: 'Custom Solutions',
      subheadline: 'Tailored specifically for your industry.',
      primaryCtaText: 'Get Started',
      secondaryCtaText: 'Learn More',
    },
    footer: {
      companyName: 'CRUDgames',
      companyDescription: 'Innovation meets execution.',
    },
    children: (
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Feature One</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
          <p className="text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore.</p>
        </div>
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
          <p className="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation.</p>
        </div>
      </div>
    ),
  },
};

export const SaaSLanding: Story = {
  name: 'SaaS Landing Page',
  args: {
    navigation: {
      logo: <span className="text-2xl font-bold text-blue-600">CloudSync</span>,
      links: [
        { label: 'Product', href: '#product' },
        { label: 'Solutions', href: '#solutions' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Resources', href: '#resources' },
      ],
      ctaText: 'Start Free Trial',
    },
    hero: {
      headline: 'Sync Your Data Across',
      highlightedText: 'All Platforms',
      subheadline: 'The most reliable cloud synchronization platform for modern businesses.',
      primaryCtaText: 'Start 14-Day Trial',
      secondaryCtaText: 'Request Demo',
      backgroundGradient: 'from-blue-500 to-cyan-500',
      trustIndicators: [
        { value: '500TB+', label: 'Data Synced' },
        { value: '99.99%', label: 'Uptime' },
        { value: '150+', label: 'Integrations' },
      ],
    },
    trustBadges: {
      badges: [
        {
          id: '1',
          title: 'Enterprise Ready',
          icon: <Shield className="h-6 w-6" />,
          description: 'SOC 2 & ISO 27001',
          highlight: true,
        },
        {
          id: '2',
          title: 'Global Scale',
          icon: <Users className="h-6 w-6" />,
          description: '50+ Data Centers',
        },
        {
          id: '3',
          title: 'Always On',
          icon: <Zap className="h-6 w-6" />,
          description: '24/7 Monitoring',
        },
        {
          id: '4',
          title: 'Award Winning',
          icon: <Award className="h-6 w-6" />,
          description: 'Best SaaS 2024',
        },
      ],
    },
    metrics: [
      {
        id: '1',
        label: 'Enterprise Clients',
        value: 5000,
        suffix: '+',
        color: 'primary' as const,
      },
      {
        id: '2',
        label: 'Data Processed Daily',
        value: '10',
        suffix: 'PB',
        color: 'success' as const,
      },
      {
        id: '3',
        label: 'Countries Served',
        value: 120,
        suffix: '+',
        color: 'secondary' as const,
      },
      {
        id: '4',
        label: 'API Uptime',
        value: 99.99,
        suffix: '%',
        color: 'warning' as const,
      },
    ],
    testimonials: [
      {
        id: '1',
        name: 'Alex Thompson',
        role: 'CTO',
        company: 'TechCorp',
        content: 'CloudSync has revolutionized how we handle data synchronization across our global infrastructure.',
        rating: 5,
        featured: true,
      },
      {
        id: '2',
        name: 'Maria Garcia',
        role: 'Head of IT',
        company: 'Finance Plus',
        content: 'The reliability and speed are unmatched. We\'ve reduced sync errors by 95%.',
        rating: 5,
      },
      {
        id: '3',
        name: 'David Kim',
        role: 'DevOps Lead',
        company: 'StartupXYZ',
        content: 'Integration was seamless and the API documentation is excellent.',
        rating: 5,
      },
    ],
    footer: {
      companyName: 'CloudSync',
      companyDescription: 'Enterprise data synchronization made simple.',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com/cloudsync' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/cloudsync' },
        { platform: 'github', url: 'https://github.com/cloudsync' },
        { platform: 'youtube', url: 'https://youtube.com/cloudsync' },
      ],
      contactInfo: {
        email: 'sales@cloudsync.io',
        phone: '1-888-SYNC-NOW',
      },
      newsletterTitle: 'Developer Updates',
      newsletterDescription: 'Get API updates and best practices delivered weekly.',
    },
    form: {
      showAsModal: true,
      modalTitle: 'Start Your Free Trial',
      modalDescription: 'No credit card required. Full access for 14 days.',
    },
  },
};