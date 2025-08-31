import type { Meta, StoryObj } from '@storybook/react';
import { SchedulingPage } from './SchedulingPage';
import { Clock, Calendar, Users, CheckCircle2, Target, Award, Zap, Shield } from 'lucide-react';

const meta = {
  title: 'Templates/SchedulingPage',
  component: SchedulingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Scheduling page template with Calendly integration, benefits section, and testimonials.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title for the scheduling page',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle or description text',
    },
    calendlyUrl: {
      control: 'text',
      description: 'Calendly scheduling URL (required)',
    },
    benefits: {
      description: 'Array of benefits to display',
    },
    testimonials: {
      description: 'Customer testimonials to display',
    },
    availability: {
      description: 'Availability information to display',
    },
  },
} satisfies Meta<typeof SchedulingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc',
    content: 'The consultation was incredibly valuable. They understood our needs immediately and provided actionable insights.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Innovation Labs',
    content: 'Professional, knowledgeable, and genuinely interested in helping us succeed. Highly recommend scheduling a call.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'Digital Solutions',
    content: 'The team went above and beyond during our consultation. We left with a clear roadmap for our project.',
    rating: 5,
  },
];

export const Default: Story = {
  args: {
    calendlyUrl: 'https://calendly.com/your-company/consultation',
  },
};

export const WithCustomContent: Story = {
  name: 'With Custom Title and Benefits',
  args: {
    title: 'Book Your Strategy Session',
    subtitle: 'Get personalized advice from our experts in a 45-minute deep-dive consultation',
    calendlyUrl: 'https://calendly.com/your-company/strategy',
    benefits: [
      {
        icon: <Target className="h-5 w-5" />,
        title: 'Strategic Planning',
        description: 'Develop a clear roadmap for your project success',
      },
      {
        icon: <Award className="h-5 w-5" />,
        title: 'Expert Insights',
        description: 'Learn from professionals with 10+ years of experience',
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: 'Quick Implementation',
        description: 'Get actionable advice you can implement immediately',
      },
      {
        icon: <Shield className="h-5 w-5" />,
        title: 'Risk Assessment',
        description: 'Identify potential challenges before they become problems',
      },
    ],
  },
};

export const WithTestimonials: Story = {
  name: 'With Testimonials',
  args: {
    calendlyUrl: 'https://calendly.com/your-company/consultation',
    testimonials: defaultTestimonials,
  },
};

export const WithAvailability: Story = {
  name: 'With Availability Info',
  args: {
    calendlyUrl: 'https://calendly.com/your-company/consultation',
    availability: {
      timezone: 'PST/EST',
      hours: '9 AM - 6 PM',
      responseTime: '24 hours',
    },
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured',
  args: {
    title: 'Schedule Your Free Consultation',
    subtitle: 'Choose a convenient time to discuss your project and get expert advice',
    calendlyUrl: 'https://calendly.com/your-company/consultation',
    benefits: [
      {
        icon: <Clock className="h-5 w-5" />,
        title: '30-Minute Consultation',
        description: 'Get personalized advice tailored to your specific needs',
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        title: 'Flexible Scheduling',
        description: 'Choose a time that works best for your schedule',
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: 'Expert Guidance',
        description: 'Connect with experienced professionals in your field',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5" />,
        title: 'No Commitment',
        description: 'Free consultation with no obligation to proceed',
      },
    ],
    testimonials: defaultTestimonials,
    availability: {
      timezone: 'PST/EST',
      hours: '9 AM - 6 PM',
      responseTime: '24 hours',
    },
  },
};

export const SalesDemo: Story = {
  name: 'Sales Demo Booking',
  args: {
    title: 'See Our Product in Action',
    subtitle: 'Book a personalized demo with our product specialists',
    calendlyUrl: 'https://calendly.com/sales-team/product-demo',
    benefits: [
      {
        icon: <Zap className="h-5 w-5" />,
        title: 'Live Product Demo',
        description: 'See all features demonstrated in real-time',
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: 'Q&A Session',
        description: 'Get all your questions answered by experts',
      },
      {
        icon: <Target className="h-5 w-5" />,
        title: 'Custom Use Cases',
        description: 'See how our solution fits your specific needs',
      },
      {
        icon: <Award className="h-5 w-5" />,
        title: 'ROI Analysis',
        description: 'Understand the value and potential savings',
      },
    ],
    availability: {
      timezone: 'All Timezones',
      hours: '8 AM - 8 PM',
      responseTime: '1 hour',
    },
  },
};

export const TechnicalConsultation: Story = {
  name: 'Technical Consultation',
  args: {
    title: 'Technical Architecture Review',
    subtitle: 'Get expert feedback on your system design and architecture',
    calendlyUrl: 'https://calendly.com/tech-team/architecture-review',
    benefits: [
      {
        icon: <Shield className="h-5 w-5" />,
        title: 'Security Assessment',
        description: 'Identify potential security vulnerabilities',
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: 'Performance Optimization',
        description: 'Get recommendations for improving system performance',
      },
      {
        icon: <Target className="h-5 w-5" />,
        title: 'Scalability Planning',
        description: 'Plan for future growth and scaling challenges',
      },
      {
        icon: <Award className="h-5 w-5" />,
        title: 'Best Practices',
        description: 'Learn industry best practices and standards',
      },
    ],
    testimonials: [
      {
        id: '1',
        name: 'David Kim',
        role: 'CTO',
        company: 'ScaleUp Tech',
        content: 'The architecture review helped us avoid costly mistakes. Their insights were invaluable.',
        rating: 5,
      },
      {
        id: '2',
        name: 'Lisa Wang',
        role: 'Engineering Lead',
        company: 'CloudFirst',
        content: 'Excellent technical depth. They identified issues we hadn\'t even considered.',
        rating: 5,
      },
    ],
    availability: {
      timezone: 'UTC',
      hours: '10 AM - 5 PM',
      responseTime: '48 hours',
    },
  },
};

export const MinimalScheduling: Story = {
  name: 'Minimal Scheduling',
  args: {
    calendlyUrl: 'https://calendly.com/your-company/quick-call',
    title: 'Quick Call',
    subtitle: 'Schedule a brief conversation',
  },
};

export const CoachingSession: Story = {
  name: 'Coaching Session',
  args: {
    title: 'Book Your Coaching Session',
    subtitle: 'Transform your business with personalized coaching',
    calendlyUrl: 'https://calendly.com/coach/one-on-one',
    benefits: [
      {
        icon: <Users className="h-5 w-5" />,
        title: 'One-on-One Attention',
        description: 'Personalized coaching tailored to your goals',
      },
      {
        icon: <Target className="h-5 w-5" />,
        title: 'Goal Setting',
        description: 'Define clear, achievable objectives',
      },
      {
        icon: <Award className="h-5 w-5" />,
        title: 'Accountability',
        description: 'Stay on track with regular check-ins',
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: 'Rapid Progress',
        description: 'Accelerate your growth with proven strategies',
      },
    ],
    testimonials: [
      {
        id: '1',
        name: 'Jennifer Brown',
        role: 'Entrepreneur',
        content: 'The coaching sessions transformed my business. I achieved more in 3 months than in the previous year.',
        rating: 5,
      },
      {
        id: '2',
        name: 'Mark Thompson',
        role: 'Startup Founder',
        content: 'Invaluable guidance and support. My coach helped me navigate critical business decisions.',
        rating: 5,
      },
    ],
    availability: {
      timezone: 'EST',
      hours: '7 AM - 7 PM',
      responseTime: '12 hours',
    },
  },
};

export const MedicalConsultation: Story = {
  name: 'Medical Consultation',
  args: {
    title: 'Schedule Your Telehealth Appointment',
    subtitle: 'Connect with healthcare professionals from the comfort of your home',
    calendlyUrl: 'https://calendly.com/clinic/telehealth',
    benefits: [
      {
        icon: <Shield className="h-5 w-5" />,
        title: 'Safe & Secure',
        description: 'HIPAA-compliant video consultations',
      },
      {
        icon: <Clock className="h-5 w-5" />,
        title: 'Save Time',
        description: 'No travel or waiting room time',
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: 'Expert Care',
        description: 'Board-certified physicians available',
      },
      {
        icon: <CheckCircle2 className="h-5 w-5" />,
        title: 'Follow-up Support',
        description: 'Continued care and prescription management',
      },
    ],
    availability: {
      timezone: 'Local Time',
      hours: '8 AM - 10 PM',
      responseTime: 'Same day',
    },
  },
};

export const FinancialAdvisory: Story = {
  name: 'Financial Advisory',
  args: {
    title: 'Schedule Your Financial Planning Session',
    subtitle: 'Take control of your financial future with expert guidance',
    calendlyUrl: 'https://calendly.com/advisors/financial-planning',
    benefits: [
      {
        icon: <Target className="h-5 w-5" />,
        title: 'Personalized Planning',
        description: 'Strategies tailored to your financial goals',
      },
      {
        icon: <Shield className="h-5 w-5" />,
        title: 'Risk Management',
        description: 'Protect and grow your wealth wisely',
      },
      {
        icon: <Award className="h-5 w-5" />,
        title: 'Tax Optimization',
        description: 'Maximize your after-tax returns',
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: 'Investment Strategies',
        description: 'Build a diversified portfolio for long-term growth',
      },
    ],
    testimonials: [
      {
        id: '1',
        name: 'Robert Martinez',
        role: 'Business Owner',
        content: 'The financial planning session gave me clarity on my retirement goals. Highly recommended!',
        rating: 5,
      },
      {
        id: '2',
        name: 'Amanda Foster',
        role: 'Executive',
        content: 'Professional, thorough, and genuinely caring about my financial well-being.',
        rating: 5,
      },
      {
        id: '3',
        name: 'James Wilson',
        role: 'Investor',
        content: 'Their investment strategies have significantly improved my portfolio performance.',
        rating: 5,
      },
    ],
    availability: {
      timezone: 'CST',
      hours: '9 AM - 5 PM',
      responseTime: '2 business days',
    },
  },
};