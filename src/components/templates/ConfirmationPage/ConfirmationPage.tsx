'use client';

import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import { Badge } from '@/components/atoms/Badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  CheckCircle,
  Link as LinkIcon,
  Video
} from 'lucide-react';
import { useState } from 'react';

export interface AppointmentInfo {
  id: string;
  date: Date | string;
  time: string;
  duration: string;
  type: 'video' | 'phone' | 'in-person';
  location?: string;
  meetingUrl?: string;
  host?: {
    name: string;
    email?: string;
    phone?: string;
    title?: string;
  };
  attendee: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
}

export interface CalendarLink {
  type: 'google' | 'outlook' | 'ical' | 'yahoo';
  url: string;
}

export interface PreparationTip {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ConfirmationPageProps {
  appointmentDetails: AppointmentInfo;
  preparationTips?: PreparationTip[];
  calendarLinks?: CalendarLink[];
  rescheduleLink?: string;
  cancelLink?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    supportUrl?: string;
  };
  showConfirmationEmail?: boolean;
  customMessage?: string;
  className?: string;
}

export function ConfirmationPage({
  appointmentDetails,
  preparationTips,
  calendarLinks,
  rescheduleLink,
  cancelLink,
  contactInfo,
  showConfirmationEmail = true,
  customMessage,
  className,
}: ConfirmationPageProps) {
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleCalendarAdd = (link: CalendarLink) => {
    window.open(link.url, '_blank');
    setAddedToCalendar(true);
    
    // Track calendar add event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calendar_add', {
        calendar_type: link.type,
        appointment_id: appointmentDetails.id,
      });
    }
  };
  
  const getMeetingIcon = () => {
    switch (appointmentDetails.type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'phone':
        return <Phone className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };
  
  const defaultPreparationTips: PreparationTip[] = [
    {
      id: '1',
      title: 'Prepare Your Questions',
      description: 'Write down any questions or topics you want to discuss during the meeting.',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      id: '2',
      title: 'Test Your Setup',
      description: appointmentDetails.type === 'video' 
        ? 'Ensure your camera and microphone are working properly.'
        : 'Make sure you\'re in a quiet environment for the call.',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      id: '3',
      title: 'Have Materials Ready',
      description: 'Gather any relevant documents or information you might need.',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
  ];
  
  const tips = preparationTips || defaultPreparationTips;
  
  return (
    <div className={`min-h-screen bg-gray-50 py-12 px-4 ${className || ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            {customMessage || 'Your appointment has been successfully scheduled.'}
          </p>
        </div>
        
        {/* Confirmation Email Alert */}
        {showConfirmationEmail && (
          <Alert
            variant="success"
            title="Confirmation Email Sent"
            className="mb-8"
          >
            We&apos;ve sent a confirmation email to {appointmentDetails.attendee.email} with all the details.
          </Alert>
        )}
        
        {/* Appointment Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Appointment Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date & Time */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Date</p>
                  <p className="text-gray-600">{formatDate(appointmentDetails.date)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Time</p>
                  <p className="text-gray-600">
                    {appointmentDetails.time} ({appointmentDetails.duration})
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                {getMeetingIcon()}
                <div>
                  <p className="font-semibold text-gray-900">Meeting Type</p>
                  <Badge variant="primary" size="sm">
                    {appointmentDetails.type}
                  </Badge>
                  {appointmentDetails.location && (
                    <p className="text-gray-600 mt-1">{appointmentDetails.location}</p>
                  )}
                  {appointmentDetails.meetingUrl && (
                    <a
                      href={appointmentDetails.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 mt-1 inline-flex items-center gap-1"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Join Meeting
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Participants */}
            <div className="space-y-4">
              {appointmentDetails.host && (
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Meeting With</p>
                    <p className="text-gray-600">{appointmentDetails.host.name}</p>
                    {appointmentDetails.host.title && (
                      <p className="text-sm text-gray-500">{appointmentDetails.host.title}</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Your Email</p>
                  <p className="text-gray-600">{appointmentDetails.attendee.email}</p>
                </div>
              </div>
              
              {appointmentDetails.attendee.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Your Phone</p>
                    <p className="text-gray-600">{appointmentDetails.attendee.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Calendar Links */}
        {calendarLinks && calendarLinks.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add to Calendar
            </h2>
            <p className="text-gray-600 mb-4">
              Don&apos;t forget! Add this appointment to your calendar:
            </p>
            <div className="flex flex-wrap gap-3">
              {calendarLinks.map((link) => (
                <Button
                  key={link.type}
                  variant={addedToCalendar ? 'secondary' : 'primary'}
                  leftIcon={<Calendar className="h-4 w-4" />}
                  onClick={() => handleCalendarAdd(link)}
                >
                  {link.type === 'google' && 'Google Calendar'}
                  {link.type === 'outlook' && 'Outlook'}
                  {link.type === 'ical' && 'Apple Calendar'}
                  {link.type === 'yahoo' && 'Yahoo Calendar'}
                </Button>
              ))}
            </div>
            {addedToCalendar && (
              <Alert variant="success" className="mt-4">
                Calendar event added successfully!
              </Alert>
            )}
          </div>
        )}
        
        {/* Preparation Tips */}
        {tips.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              How to Prepare
            </h2>
            <div className="space-y-4">
              {tips.map((tip) => (
                <div key={tip.id} className="flex gap-3">
                  {tip.icon || <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                  <div>
                    <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Need to Make Changes?
          </h2>
          <div className="flex flex-wrap gap-3">
            {rescheduleLink && (
              <a href={rescheduleLink}>
                <Button variant="secondary">
                  Reschedule Appointment
                </Button>
              </a>
            )}
            {cancelLink && (
              <a href={cancelLink}>
                <Button variant="ghost">
                  Cancel Appointment
                </Button>
              </a>
            )}
          </div>
          
          {contactInfo && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-gray-600 mb-2">
                Have questions? Contact us:
              </p>
              <div className="flex flex-col gap-1">
                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {contactInfo.email}
                  </a>
                )}
                {contactInfo.phone && (
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {contactInfo.phone}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}