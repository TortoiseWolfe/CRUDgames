import type { Meta, StoryObj } from '@storybook/react';
import { ThankYouPage } from './ThankYouPage';
import { Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const meta = {
  title: 'Templates/ThankYouPage',
  component: ThankYouPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Thank you page template displayed after form submission with submission summary and next steps.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    firstName: {
      control: 'text',
      description: 'User\'s first name from form submission',
    },
    lastName: {
      control: 'text',
      description: 'User\'s last name from form submission',
    },
    email: {
      control: 'text',
      description: 'User\'s email address',
    },
    phone: {
      control: 'text',
      description: 'User\'s phone number',
    },
    company: {
      control: 'text',
      description: 'User\'s company name',
    },
    projectType: {
      control: 'text',
      description: 'Type of project user is interested in',
    },
    budget: {
      control: 'text',
      description: 'Project budget range',
    },
    timeline: {
      control: 'text',
      description: 'Project timeline',
    },
    message: {
      control: 'text',
      description: 'Additional message from user',
    },
    showScheduler: {
      control: 'boolean',
      description: 'Show Calendly scheduler option',
    },
    showSocial: {
      control: 'boolean',
      description: 'Show social media links',
    },
    showDownload: {
      control: 'boolean',
      description: 'Show download resources section',
    },
  },
} satisfies Meta<typeof ThankYouPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstName: 'John',
    email: 'john.doe@example.com',
  },
};

export const WithFullDetails: Story = {
  name: 'With Full Form Details',
  args: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Industries',
    projectType: 'Web Application',
    budget: '$50,000 - $100,000',
    timeline: '3-6 months',
    message: 'We need a complete redesign of our customer portal with modern UI/UX and improved performance.',
  },
};

export const WithScheduler: Story = {
  name: 'With Calendly Scheduler',
  args: {
    firstName: 'Michael',
    email: 'michael@startup.com',
    showScheduler: true,
    calendlyUrl: 'https://calendly.com/your-company/consultation',
  },
};

export const WithSocialLinks: Story = {
  name: 'With Social Media',
  args: {
    firstName: 'Emily',
    email: 'emily@design.co',
    showSocial: true,
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/yourcompany', icon: <Twitter className="h-5 w-5" /> },
      { platform: 'facebook', url: 'https://facebook.com/yourcompany', icon: <Facebook className="h-5 w-5" /> },
      { platform: 'linkedin', url: 'https://linkedin.com/company/yourcompany', icon: <Linkedin className="h-5 w-5" /> },
      { platform: 'instagram', url: 'https://instagram.com/yourcompany', icon: <Instagram className="h-5 w-5" /> },
    ],
  },
};

export const WithDownloadResources: Story = {
  name: 'With Download Resources',
  args: {
    firstName: 'David',
    email: 'david@enterprise.com',
    showDownload: true,
    downloadResources: [
      {
        title: 'Project Planning Guide',
        description: 'A comprehensive guide to planning your next project',
        fileSize: '2.5 MB',
        downloadUrl: '/downloads/project-guide.pdf',
      },
      {
        title: 'ROI Calculator',
        description: 'Calculate the potential return on your investment',
        fileSize: '1.2 MB',
        downloadUrl: '/downloads/roi-calculator.xlsx',
      },
      {
        title: 'Case Studies',
        description: 'See how we\'ve helped companies like yours',
        fileSize: '5.8 MB',
        downloadUrl: '/downloads/case-studies.pdf',
      },
    ],
  },
};

export const CustomNextSteps: Story = {
  name: 'With Custom Next Steps',
  args: {
    firstName: 'Lisa',
    email: 'lisa@agency.com',
    projectType: 'Brand Strategy',
    nextSteps: [
      {
        number: 1,
        title: 'Strategy Call',
        description: 'We\'ll schedule a 60-minute strategy session to discuss your brand vision',
      },
      {
        number: 2,
        title: 'Brand Audit',
        description: 'Our team will conduct a comprehensive audit of your current brand presence',
      },
      {
        number: 3,
        title: 'Proposal Delivery',
        description: 'You\'ll receive a detailed proposal with timeline and investment options',
      },
      {
        number: 4,
        title: 'Kickoff Meeting',
        description: 'Once approved, we\'ll schedule a kickoff to begin your transformation',
      },
    ],
  },
};

export const B2BSales: Story = {
  name: 'B2B Sales Thank You',
  args: {
    firstName: 'Robert',
    lastName: 'Williams',
    email: 'rwilliams@enterprise.com',
    company: 'Enterprise Solutions Inc',
    projectType: 'Enterprise Software',
    budget: '$500,000+',
    timeline: 'Q2 2024',
    showScheduler: true,
    calendlyUrl: 'https://calendly.com/sales-team/enterprise-demo',
    nextSteps: [
      {
        number: 1,
        title: 'Technical Discovery',
        description: 'Our solutions architect will contact you within 24 hours',
      },
      {
        number: 2,
        title: 'Custom Demo',
        description: 'We\'ll prepare a demo tailored to your specific use cases',
      },
      {
        number: 3,
        title: 'Proof of Concept',
        description: 'Test our solution in your environment with a 30-day POC',
      },
    ],
  },
};

export const ConsultingServices: Story = {
  name: 'Consulting Services',
  args: {
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'mgarcia@fintech.com',
    company: 'FinTech Innovations',
    projectType: 'Digital Transformation',
    message: 'Looking for expertise in cloud migration and DevOps practices.',
    showDownload: true,
    downloadResources: [
      {
        title: 'Digital Transformation Roadmap',
        description: 'Step-by-step guide to modernizing your infrastructure',
        fileSize: '3.2 MB',
        downloadUrl: '/downloads/transformation-roadmap.pdf',
      },
      {
        title: 'Cloud Migration Checklist',
        description: 'Essential considerations for your cloud journey',
        fileSize: '890 KB',
        downloadUrl: '/downloads/cloud-checklist.pdf',
      },
    ],
    showSocial: true,
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/company/consulting', icon: <Linkedin className="h-5 w-5" /> },
      { platform: 'twitter', url: 'https://twitter.com/consulting', icon: <Twitter className="h-5 w-5" /> },
    ],
  },
};

export const MinimalThankYou: Story = {
  name: 'Minimal Thank You',
  args: {
    email: 'user@example.com',
  },
};

export const EcommerceOrder: Story = {
  name: 'E-commerce Order Confirmation',
  args: {
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'alex.thompson@email.com',
    customTitle: 'Order Confirmed!',
    customMessage: 'Thank you for your purchase. Your order #12345 has been received and is being processed.',
    nextSteps: [
      {
        number: 1,
        title: 'Order Processing',
        description: 'Your order is being prepared for shipment (1-2 business days)',
      },
      {
        number: 2,
        title: 'Shipping Notification',
        description: 'You\'ll receive tracking information once your order ships',
      },
      {
        number: 3,
        title: 'Delivery',
        description: 'Estimated delivery within 3-5 business days',
      },
    ],
    showSocial: true,
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/shop', icon: <Instagram className="h-5 w-5" /> },
      { platform: 'facebook', url: 'https://facebook.com/shop', icon: <Facebook className="h-5 w-5" /> },
    ],
  },
};

export const NewsletterSignup: Story = {
  name: 'Newsletter Signup',
  args: {
    firstName: 'Jessica',
    email: 'jessica@email.com',
    customTitle: 'Welcome to Our Community!',
    customMessage: 'You\'re now subscribed to our weekly newsletter. Expect valuable insights delivered every Tuesday.',
    showDownload: true,
    downloadResources: [
      {
        title: 'Welcome Guide',
        description: 'Get the most out of your subscription',
        fileSize: '1.5 MB',
        downloadUrl: '/downloads/welcome-guide.pdf',
      },
    ],
    showSocial: true,
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/newsletter', icon: <Twitter className="h-5 w-5" /> },
      { platform: 'linkedin', url: 'https://linkedin.com/newsletter', icon: <Linkedin className="h-5 w-5" /> },
    ],
    nextSteps: [
      {
        number: 1,
        title: 'Check Your Email',
        description: 'Confirm your subscription via the link we just sent',
      },
      {
        number: 2,
        title: 'Set Preferences',
        description: 'Customize your content preferences in your account',
      },
    ],
  },
};

export const EventRegistration: Story = {
  name: 'Event Registration',
  args: {
    firstName: 'Kevin',
    lastName: 'Lee',
    email: 'kevin.lee@company.com',
    company: 'Tech Innovations Ltd',
    customTitle: 'You\'re Registered!',
    customMessage: 'Thank you for registering for our Annual Tech Summit 2024.',
    showScheduler: false,
    nextSteps: [
      {
        number: 1,
        title: 'Save the Date',
        description: 'March 15-17, 2024 at the Convention Center',
      },
      {
        number: 2,
        title: 'Event Details',
        description: 'You\'ll receive the full agenda and speaker list 2 weeks before the event',
      },
      {
        number: 3,
        title: 'Networking App',
        description: 'Download our event app to connect with other attendees',
      },
    ],
    downloadResources: [
      {
        title: 'Event Schedule',
        description: 'Full 3-day agenda and session details',
        fileSize: '2.1 MB',
        downloadUrl: '/downloads/event-schedule.pdf',
      },
      {
        title: 'Venue Map',
        description: 'Navigate the convention center with ease',
        fileSize: '450 KB',
        downloadUrl: '/downloads/venue-map.pdf',
      },
    ],
    showDownload: true,
  },
};