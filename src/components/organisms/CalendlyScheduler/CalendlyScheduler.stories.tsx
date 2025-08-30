import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CalendlyScheduler } from './CalendlyScheduler';

const meta = {
  title: 'Organisms/CalendlyScheduler',
  component: CalendlyScheduler,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An embedded Calendly scheduling component that seamlessly integrates with the intake form flow, prefills user data, and handles appointment booking with proper event tracking.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'Calendly event type URL',
    },
    height: {
      control: 'text',
      description: 'Height of the widget',
      defaultValue: '700px',
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the widget',
    },
    primaryColor: {
      control: 'color',
      description: 'Primary color for buttons and links',
    },
    textColor: {
      control: 'color',
      description: 'Text color in the widget',
    },
    hideEventTypeDetails: {
      control: 'boolean',
      description: 'Hide event type details',
    },
    hideLandingPageDetails: {
      control: 'boolean',
      description: 'Hide landing page details',
    },
    hideGdprBanner: {
      control: 'boolean',
      description: 'Hide GDPR banner',
    },
    trackingEnabled: {
      control: 'boolean',
      description: 'Enable analytics tracking',
    },
  },
} satisfies Meta<typeof CalendlyScheduler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
    height: '700px',
  },
};

export const WithPrefillData: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
    prefillData: {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      company: 'Acme Corp',
      customAnswers: {
        a1: 'Web Development',
        a2: 'Next.js Application',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
    backgroundColor: 'f7f9fc',
    primaryColor: '4f46e5',
    textColor: '1f2937',
    height: '800px',
  },
};

export const MinimalView: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
    hideEventTypeDetails: true,
    hideLandingPageDetails: true,
    hideGdprBanner: true,
  },
};

export const MobileResponsive: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
    height: '600px',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WithUTMTracking: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
    utm: {
      utmCampaign: 'funnel_conversion',
      utmSource: 'website',
      utmMedium: 'intake_form',
      utmContent: 'schedule_consultation',
      utmTerm: 'web_development',
    },
  },
};

export const LoadingState: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the loading state while Calendly widget is being loaded.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    url: 'https://invalid-url.calendly.com/404',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the error state with fallback options when Calendly fails to load.',
      },
    },
  },
};

export const WithEventCallbacks: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
    onScheduled: (event) => {
      console.log('Event scheduled:', event);
      alert('Appointment scheduled successfully!');
    },
    onEventTypeViewed: () => {
      console.log('Event type viewed');
    },
    onDateAndTimeSelected: () => {
      console.log('Date and time selected');
    },
    onProfilePageViewed: () => {
      console.log('Profile page viewed');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates event callbacks for tracking user interactions.',
      },
    },
  },
};

export const IntegratedWithForm: Story = {
  args: {
    url: 'https://calendly.com/example-user/30min',
    prefillData: {
      email: 'submitted@fromform.com',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+9876543210',
      company: 'Tech Solutions Inc',
    },
    className: 'mt-8',
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Thank you for submitting your information!
          </h3>
          <p className="text-green-700">
            Your details have been received. Please schedule a consultation below.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows how the scheduler appears after form submission with prefilled data.',
      },
    },
  },
};