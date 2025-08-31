'use client';

import { CalendlyScheduler } from '@/components/organisms/CalendlyScheduler';
import { NavigationHeader } from '@/components/organisms/NavigationHeader';
import { FooterSection } from '@/components/organisms/FooterSection';
import { TestimonialCard } from '@/components/molecules/TestimonialCard';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { CheckCircle2, Clock, Calendar, Users } from 'lucide-react';

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface SchedulingPageProps {
  title?: string;
  subtitle?: string;
  calendlyUrl: string;
  benefits?: Benefit[];
  testimonials?: Array<{
    id: string;
    name: string;
    role?: string;
    company?: string;
    content: string;
    rating?: number;
    image?: string;
  }>;
  availability?: {
    timezone: string;
    hours: string;
    responseTime: string;
  };
}

const defaultBenefits: Benefit[] = [
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
];

export function SchedulingPage({
  title = 'Schedule Your Free Consultation',
  subtitle = 'Choose a convenient time to discuss your project and get expert advice',
  calendlyUrl,
  benefits = defaultBenefits,
  testimonials = [],
  availability,
}: SchedulingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavigationHeader />
      
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 text-blue-600">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Availability Badge */}
      {availability && (
        <section className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-center items-center space-x-4">
            <Badge variant="success" size="lg">
              Available {availability.hours}
            </Badge>
            <Badge variant="info" size="lg">
              {availability.timezone}
            </Badge>
            <Badge variant="default" size="lg">
              Response within {availability.responseTime}
            </Badge>
          </div>
        </section>
      )}

      {/* Calendly Scheduler */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <CalendlyScheduler 
            url={calendlyUrl}
            className="shadow-xl rounded-lg overflow-hidden"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterSection />
    </div>
  );
}