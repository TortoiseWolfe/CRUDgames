// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { ThankYouPage } from './ThankYouPage';

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
    showScheduler: {
      control: 'boolean',
      description: 'Show Calendly scheduler option',
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
  },
};

export const WithDownloadResources: Story = {
  name: 'With Download Resources',
  args: {
    firstName: 'David',
    email: 'david@enterprise.com',
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
        step: 1,
        description: 'We\'ll schedule a 60-minute strategy session to discuss your brand vision',
      },
      {
        step: 2,
        description: 'Our team will conduct a comprehensive audit of your current brand presence',
      },
      {
        step: 3,
        description: 'You\'ll receive a detailed proposal with timeline and investment options',
      },
      {
        step: 4,
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
    showScheduler: true,
    calendlyUrl: 'https://calendly.com/sales-team/enterprise-demo',
    nextSteps: [
      {
        step: 1,
        description: 'Our solutions architect will contact you within 24 hours',
      },
      {
        step: 2,
        description: 'We\'ll prepare a demo tailored to your specific use cases',
      },
      {
        step: 3,
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
    title: 'Order Confirmed!',
    subtitle: 'Thank you for your purchase. Your order #12345 has been received and is being processed.',
    nextSteps: [
      {
        step: 1,
        description: 'Your order is being prepared for shipment (1-2 business days)',
      },
      {
        step: 2,
        description: 'You\'ll receive tracking information once your order ships',
      },
      {
        step: 3,
        description: 'Estimated delivery within 3-5 business days',
      },
    ],
  },
};

export const NewsletterSignup: Story = {
  name: 'Newsletter Signup',
  args: {
    firstName: 'Jessica',
    email: 'jessica@email.com',
    title: 'Welcome to Our Community!',
    subtitle: 'You\'re now subscribed to our weekly newsletter. Expect valuable insights delivered every Tuesday.',
    nextSteps: [
      {
        step: 1,
        description: 'Confirm your subscription via the link we just sent',
      },
      {
        step: 2,
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
    title: 'You\'re Registered!',
    subtitle: 'Thank you for registering for our Annual Tech Summit 2024.',
    showScheduler: false,
    nextSteps: [
      {
        step: 1,
        description: 'March 15-17, 2024 at the Convention Center',
      },
      {
        step: 2,
        description: 'You\'ll receive the full agenda and speaker list 2 weeks before the event',
      },
      {
        step: 3,
        description: 'Download our event app to connect with other attendees',
      },
    ],
  },
};