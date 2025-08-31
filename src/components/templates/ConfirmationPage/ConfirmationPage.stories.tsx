import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationPage } from './ConfirmationPage';
import { FileText, Laptop, Target, Coffee } from 'lucide-react';

const meta = {
  title: 'Templates/ConfirmationPage',
  component: ConfirmationPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Appointment confirmation page with meeting details, calendar integration, and preparation tips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    appointmentDetails: {
      description: 'Complete appointment information',
    },
    preparationTips: {
      description: 'Tips to help attendee prepare for the meeting',
    },
    calendarLinks: {
      description: 'Links to add appointment to various calendars',
    },
    rescheduleLink: {
      control: 'text',
      description: 'URL to reschedule the appointment',
    },
    cancelLink: {
      control: 'text',
      description: 'URL to cancel the appointment',
    },
    showConfirmationEmail: {
      control: 'boolean',
      description: 'Show confirmation email sent alert',
    },
    customMessage: {
      control: 'text',
      description: 'Custom confirmation message',
    },
  },
} satisfies Meta<typeof ConfirmationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseAppointment = {
  id: 'apt-12345',
  date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  time: '2:00 PM EST',
  duration: '30 minutes',
  attendee: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
  },
};

export const VideoCall: Story = {
  name: 'Video Call Confirmation',
  args: {
    appointmentDetails: {
      ...baseAppointment,
      type: 'video',
      meetingUrl: 'https://zoom.us/j/123456789',
      host: {
        name: 'Sarah Johnson',
        title: 'Senior Consultant',
        email: 'sarah.johnson@company.com',
      },
    },
    calendarLinks: [
      { type: 'google', url: 'https://calendar.google.com/calendar/render?action=TEMPLATE' },
      { type: 'outlook', url: 'https://outlook.live.com/calendar/0/deeplink/compose' },
      { type: 'ical', url: 'data:text/calendar;charset=utf8,BEGIN:VCALENDAR' },
    ],
    rescheduleLink: 'https://calendly.com/reschedule/apt-12345',
    cancelLink: 'https://calendly.com/cancel/apt-12345',
    showConfirmationEmail: true,
  },
};

export const PhoneCall: Story = {
  name: 'Phone Call Confirmation',
  args: {
    appointmentDetails: {
      ...baseAppointment,
      type: 'phone',
      host: {
        name: 'Michael Chen',
        title: 'Account Manager',
        phone: '+1 (555) 987-6543',
      },
    },
    calendarLinks: [
      { type: 'google', url: 'https://calendar.google.com/calendar/render?action=TEMPLATE' },
      { type: 'outlook', url: 'https://outlook.live.com/calendar/0/deeplink/compose' },
    ],
    rescheduleLink: 'https://calendly.com/reschedule/apt-12345',
    showConfirmationEmail: true,
  },
};

export const InPersonMeeting: Story = {
  name: 'In-Person Meeting',
  args: {
    appointmentDetails: {
      ...baseAppointment,
      type: 'in-person',
      location: '123 Business Ave, Suite 500, New York, NY 10001',
      host: {
        name: 'Emily Rodriguez',
        title: 'Product Specialist',
      },
    },
    preparationTips: [
      {
        id: '1',
        title: 'Bring Your ID',
        description: 'You\'ll need a valid photo ID to check in at the front desk.',
        icon: <FileText className="h-5 w-5 text-blue-500" />,
      },
      {
        id: '2',
        title: 'Parking Information',
        description: 'Free parking is available in the building garage. Enter from Main Street.',
        icon: <Target className="h-5 w-5 text-blue-500" />,
      },
      {
        id: '3',
        title: 'Arrive Early',
        description: 'Please arrive 10 minutes early to allow time for check-in.',
        icon: <Coffee className="h-5 w-5 text-blue-500" />,
      },
    ],
    calendarLinks: [
      { type: 'google', url: 'https://calendar.google.com/calendar/render?action=TEMPLATE' },
      { type: 'ical', url: 'data:text/calendar;charset=utf8,BEGIN:VCALENDAR' },
    ],
    rescheduleLink: 'https://calendly.com/reschedule/apt-12345',
    cancelLink: 'https://calendly.com/cancel/apt-12345',
    contactInfo: {
      email: 'reception@company.com',
      phone: '+1 (555) 000-1111',
    },
  },
};

export const CustomMessage: Story = {
  name: 'With Custom Message',
  args: {
    appointmentDetails: {
      ...baseAppointment,
      type: 'video',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      host: {
        name: 'Dr. Lisa Wang',
        title: 'Senior Advisor',
      },
    },
    customMessage: 'Thank you for booking your strategy session! We\'re excited to help you achieve your goals.',
    calendarLinks: [
      { type: 'google', url: 'https://calendar.google.com/calendar/render?action=TEMPLATE' },
    ],
    showConfirmationEmail: true,
  },
};

export const MinimalConfirmation: Story = {
  name: 'Minimal Confirmation',
  args: {
    appointmentDetails: {
      id: 'apt-minimal',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: '10:00 AM',
      duration: '1 hour',
      type: 'video',
      attendee: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
    },
    showConfirmationEmail: false,
  },
};

export const WithCustomTips: Story = {
  name: 'With Custom Preparation Tips',
  args: {
    appointmentDetails: {
      ...baseAppointment,
      type: 'video',
      meetingUrl: 'https://teams.microsoft.com/l/meetup-join/19:meeting',
    },
    preparationTips: [
      {
        id: '1',
        title: 'Review Your Portfolio',
        description: 'Have your recent work samples ready to share during the call.',
        icon: <Laptop className="h-5 w-5 text-purple-500" />,
      },
      {
        id: '2',
        title: 'Prepare Your Questions',
        description: 'Think about what you\'d like to learn about our services.',
        icon: <FileText className="h-5 w-5 text-purple-500" />,
      },
      {
        id: '3',
        title: 'Set Your Goals',
        description: 'Be ready to discuss your project timeline and budget.',
        icon: <Target className="h-5 w-5 text-purple-500" />,
      },
    ],
    calendarLinks: [
      { type: 'outlook', url: 'https://outlook.live.com/calendar/0/deeplink/compose' },
    ],
    rescheduleLink: 'https://calendly.com/reschedule/apt-12345',
  },
};

export const SalesConsultation: Story = {
  name: 'Sales Consultation',
  args: {
    appointmentDetails: {
      id: 'sales-001',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '3:30 PM PST',
      duration: '45 minutes',
      type: 'video',
      meetingUrl: 'https://zoom.us/j/987654321',
      host: {
        name: 'Robert Williams',
        title: 'Solutions Architect',
        email: 'robert.w@salesteam.com',
      },
      attendee: {
        name: 'Alice Johnson',
        email: 'alice@techstartup.com',
        company: 'TechStartup Inc',
      },
    },
    customMessage: 'Your product demo has been scheduled! We\'ll show you how our solution can transform your business.',
    preparationTips: [
      {
        id: '1',
        title: 'Current Challenges',
        description: 'Be prepared to discuss your current pain points and challenges.',
      },
      {
        id: '2',
        title: 'Decision Timeline',
        description: 'Let us know your implementation timeline and decision process.',
      },
      {
        id: '3',
        title: 'Technical Requirements',
        description: 'Have your technical requirements and integration needs ready.',
      },
    ],
    calendarLinks: [
      { type: 'google', url: 'https://calendar.google.com/calendar/render?action=TEMPLATE' },
      { type: 'outlook', url: 'https://outlook.live.com/calendar/0/deeplink/compose' },
    ],
    rescheduleLink: 'https://calendly.com/sales-team/demo',
    contactInfo: {
      email: 'sales@company.com',
      phone: '1-800-SALES',
    },
    showConfirmationEmail: true,
  },
};

export const MedicalAppointment: Story = {
  name: 'Medical Consultation',
  args: {
    appointmentDetails: {
      id: 'med-2024-001',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      time: '9:15 AM',
      duration: '30 minutes',
      type: 'in-person',
      location: 'Health Center, 456 Medical Plaza, Building A, Floor 3',
      host: {
        name: 'Dr. Jennifer Smith',
        title: 'Primary Care Physician',
      },
      attendee: {
        name: 'Patient Name',
        email: 'patient@email.com',
        phone: '+1 (555) 111-2222',
      },
    },
    customMessage: 'Your appointment with Dr. Smith has been confirmed. Please arrive 15 minutes early for check-in.',
    preparationTips: [
      {
        id: '1',
        title: 'Insurance Card',
        description: 'Please bring your insurance card and a valid photo ID.',
      },
      {
        id: '2',
        title: 'Medical History',
        description: 'Complete the patient forms sent to your email before arrival.',
      },
      {
        id: '3',
        title: 'Medications List',
        description: 'Bring a list of all current medications and supplements.',
      },
      {
        id: '4',
        title: 'Fasting Required',
        description: 'Please fast for 12 hours before your appointment for blood work.',
      },
    ],
    rescheduleLink: 'https://patient-portal.com/reschedule',
    cancelLink: 'https://patient-portal.com/cancel',
    contactInfo: {
      email: 'appointments@healthcenter.com',
      phone: '+1 (555) 000-0000',
      supportUrl: 'https://patient-portal.com',
    },
    showConfirmationEmail: true,
  },
};

export const TrainingSession: Story = {
  name: 'Training Session',
  args: {
    appointmentDetails: {
      id: 'training-2024-042',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      time: '1:00 PM - 4:00 PM EST',
      duration: '3 hours',
      type: 'video',
      meetingUrl: 'https://training-platform.com/session/abc123',
      host: {
        name: 'Training Team',
        email: 'training@company.com',
      },
      attendee: {
        name: 'New Employee',
        email: 'newemployee@company.com',
        company: 'Internal',
      },
    },
    customMessage: 'Welcome to the team! Your onboarding training session is confirmed.',
    preparationTips: [
      {
        id: '1',
        title: 'System Access',
        description: 'Ensure you can log into the training platform with your credentials.',
        icon: <Laptop className="h-5 w-5 text-blue-500" />,
      },
      {
        id: '2',
        title: 'Materials',
        description: 'Training materials have been sent to your email. Please review before the session.',
        icon: <FileText className="h-5 w-5 text-blue-500" />,
      },
    ],
    calendarLinks: [
      { type: 'outlook', url: 'https://outlook.office.com/calendar/0/deeplink/compose' },
    ],
    contactInfo: {
      email: 'hr@company.com',
    },
    showConfirmationEmail: true,
  },
};