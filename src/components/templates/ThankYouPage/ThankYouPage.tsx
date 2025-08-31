'use client';

import { useState, useEffect } from 'react';
import { CalendlyScheduler } from '@/components/organisms/CalendlyScheduler';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import { CheckCircle, Home, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

export interface ThankYouPageProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  projectType?: string;
  title?: string;
  subtitle?: string;
  showScheduler?: boolean;
  calendlyUrl?: string;
  nextSteps?: Array<{
    step: number;
    description: string;
  }>;
  resources?: Array<{
    title: string;
    description: string;
    href: string;
    color: 'blue' | 'green' | 'purple';
  }>;
  onSchedulingComplete?: () => void;
  onTrackConversion?: () => void;
}

const defaultNextSteps = [
  {
    step: 1,
    description: 'Our team will review your submission within 24 hours',
  },
  {
    step: 2,
    description: "We'll prepare a customized proposal based on your requirements",
  },
  {
    step: 3,
    description: 'A specialist will contact you to discuss your project in detail',
  },
];

const defaultResources = [
  {
    title: 'Case Studies',
    description: "See how we've helped other businesses succeed",
    href: '#',
    color: 'blue' as const,
  },
  {
    title: 'Our Process',
    description: 'Learn about our proven development methodology',
    href: '#',
    color: 'green' as const,
  },
  {
    title: 'FAQ',
    description: 'Find answers to common questions',
    href: '#',
    color: 'purple' as const,
  },
];

export function ThankYouPage({
  firstName = '',
  lastName = '',
  email = '',
  phone = '',
  company = '',
  projectType = '',
  title,
  subtitle,
  showScheduler: initialShowScheduler = false,
  calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username/30min',
  nextSteps = defaultNextSteps,
  resources = defaultResources,
  onSchedulingComplete,
  onTrackConversion,
}: ThankYouPageProps) {
  const [showScheduler, setShowScheduler] = useState(initialShowScheduler);
  const [hasScheduled, setHasScheduled] = useState(false);

  useEffect(() => {
    // Track conversion on mount
    if (onTrackConversion) {
      onTrackConversion();
    }
  }, [onTrackConversion]);

  const handleSchedulingComplete = () => {
    setHasScheduled(true);
    setShowScheduler(false);
    
    if (onSchedulingComplete) {
      onSchedulingComplete();
    }
  };

  const displayTitle = title || `Thank You${firstName ? `, ${firstName}` : ''}!`;
  const displaySubtitle = subtitle || "Your information has been successfully submitted. We'll review your request and get back to you within 24 hours.";

  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-900',
    green: 'bg-green-50 hover:bg-green-100 text-green-900',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-900',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
              {displayTitle}
            </h1>
            
            <p className="text-lg text-center text-gray-600 mb-8">
              {displaySubtitle}
            </p>

            {/* Submission Summary */}
            {(email || projectType || company) && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Submission Summary</h2>
                <dl className="space-y-2">
                  {email && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Email:</dt>
                      <dd className="font-medium text-gray-900">{email}</dd>
                    </div>
                  )}
                  {(firstName || lastName) && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Name:</dt>
                      <dd className="font-medium text-gray-900">
                        {`${firstName} ${lastName}`.trim()}
                      </dd>
                    </div>
                  )}
                  {company && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Company:</dt>
                      <dd className="font-medium text-gray-900">{company}</dd>
                    </div>
                  )}
                  {projectType && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Project Type:</dt>
                      <dd className="font-medium text-gray-900">{projectType}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Next Steps */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h2>
              <ol className="space-y-3 text-gray-600 mb-8">
                {nextSteps.map((step) => (
                  <li key={step.step} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold flex items-center justify-center mr-3">
                      {step.step}
                    </span>
                    <span>{step.description}</span>
                  </li>
                ))}
              </ol>

              {/* CTA Buttons */}
              {!hasScheduled && (
                <Alert variant="info" className="mb-6">
                  <strong>Want to speed things up?</strong> Schedule a consultation call now and speak with our team directly.
                </Alert>
              )}

              {hasScheduled && (
                <Alert variant="success" className="mb-6">
                  <strong>Appointment Confirmed!</strong> We've sent a confirmation email with your appointment details.
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {!hasScheduled && !showScheduler && (
                  <Button
                    size="lg"
                    variant="primary"
                    leftIcon={<Calendar className="h-5 w-5" />}
                    onClick={() => setShowScheduler(true)}
                    className="flex-1"
                  >
                    Schedule a Consultation
                  </Button>
                )}
                
                <Link href="/" className="flex-1">
                  <Button
                    size="lg"
                    variant="secondary"
                    leftIcon={<Home className="h-5 w-5" />}
                    className="w-full"
                  >
                    Return to Homepage
                  </Button>
                </Link>
                
                <Button
                  size="lg"
                  variant="secondary"
                  leftIcon={<Mail className="h-5 w-5" />}
                  onClick={() => window.location.href = 'mailto:contact@company.com'}
                  className="flex-1"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Calendly Scheduler */}
          {showScheduler && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Schedule Your Consultation
              </h2>
              <p className="text-gray-600 mb-8">
                Choose a convenient time for a 30-minute consultation call with our team.
              </p>
              
              <CalendlyScheduler
                url={calendlyUrl}
                prefillData={{
                  email,
                  firstName,
                  lastName,
                  phone,
                  company,
                  customAnswers: projectType ? {
                    a1: projectType,
                  } : undefined,
                }}
                height="700px"
                onScheduled={handleSchedulingComplete}
                className="mb-6"
              />
              
              <Button
                variant="secondary"
                onClick={() => setShowScheduler(false)}
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          )}

          {/* Additional Resources */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              While You Wait...
            </h2>
            <p className="text-gray-600 mb-6">
              Explore our resources to learn more about our services and approach.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.href}
                  className={`block p-4 rounded-lg transition-colors ${colorClasses[resource.color]}`}
                >
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm opacity-90">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}