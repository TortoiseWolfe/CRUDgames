import { Metadata } from 'next';
import { SchedulingPage } from '@/components/templates/SchedulingPage';

export const metadata: Metadata = {
  title: 'Schedule a Consultation | CRUDgames',
  description: 'Book a free 30-minute consultation with our experts to discuss your project requirements and get personalized advice.',
  openGraph: {
    title: 'Schedule Your Free Consultation',
    description: 'Choose a convenient time to discuss your project with our team',
    type: 'website',
  },
};

const testimonials = [
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

const availability = {
  timezone: 'PST/EST',
  hours: '9 AM - 6 PM',
  responseTime: '24 hours',
};

export default function SchedulingRoute() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username/30min';

  return (
    <SchedulingPage
      calendlyUrl={calendlyUrl}
      testimonials={testimonials}
      availability={availability}
    />
  );
}