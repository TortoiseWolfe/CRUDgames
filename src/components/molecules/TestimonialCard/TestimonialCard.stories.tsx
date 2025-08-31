// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialCard } from './TestimonialCard';

const meta: Meta<typeof TestimonialCard> = {
  title: 'Molecules/TestimonialCard',
  component: TestimonialCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Testimonial card component for displaying customer reviews and feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the person giving testimonial',
    },
    role: {
      control: 'text',
      description: 'Job title or role',
    },
    company: {
      control: 'text',
      description: 'Company name',
    },
    content: {
      control: 'text',
      description: 'Testimonial content',
    },
    rating: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Star rating (1-5)',
    },
    image: {
      control: 'text',
      description: 'Profile image URL',
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
      description: 'Visual style variant',
    },
    featured: {
      control: 'boolean',
      description: 'Featured testimonial styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Tech Solutions Inc',
    content: 'Working with this team has been an absolute pleasure. They delivered our project on time and exceeded all expectations. The quality of work and attention to detail is outstanding.',
    rating: 5,
  },
};

export const WithImage: Story = {
  args: {
    name: 'John Doe',
    role: 'CEO',
    company: 'Startup Co',
    content: 'The best decision we made was partnering with this team. Their expertise and professionalism transformed our vision into reality.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
};

export const Featured: Story = {
  args: {
    name: 'Emily Chen',
    role: 'Product Manager',
    company: 'Innovation Labs',
    content: 'Exceptional service and incredible results! This team went above and beyond to ensure our project was successful. I highly recommend them to anyone looking for top-tier development.',
    rating: 5,
    featured: true,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
      <TestimonialCard
        variant="default"
        name="Alice Brown"
        role="Designer"
        company="Creative Studio"
        content="Great experience working with this team. Highly professional!"
        rating={5}
      />
      <TestimonialCard
        variant="bordered"
        name="Bob Smith"
        role="Developer"
        company="Tech Corp"
        content="Excellent communication and fantastic results. Would work with them again."
        rating={5}
      />
      <TestimonialCard
        variant="elevated"
        name="Carol White"
        role="Manager"
        company="Business Inc"
        content="They delivered exactly what we needed, on time and on budget."
        rating={5}
      />
    </div>
  ),
};

export const DifferentRatings: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <TestimonialCard
        name="5 Star Review"
        role="Customer"
        company="Company A"
        content="Absolutely perfect! Exceeded all expectations."
        rating={5}
      />
      <TestimonialCard
        name="4 Star Review"
        role="Customer"
        company="Company B"
        content="Very good service with minor room for improvement."
        rating={4}
      />
      <TestimonialCard
        name="3 Star Review"
        role="Customer"
        company="Company C"
        content="Good overall, but could be better in some areas."
        rating={3}
      />
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    name: 'David Miller',
    role: 'CTO',
    company: 'Enterprise Solutions',
    content: 'I have worked with many development teams over the years, and I can confidently say this is one of the best. Their technical expertise is matched only by their commitment to customer satisfaction. They took the time to understand our complex requirements and delivered a solution that not only met but exceeded our expectations. The project was completed on schedule, within budget, and the quality of the code is exceptional. I would not hesitate to recommend them to anyone looking for a reliable and skilled development partner.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {[
        {
          name: 'Sarah Johnson',
          role: 'CEO',
          company: 'Tech Start',
          content: 'Outstanding service and exceptional results!',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        },
        {
          name: 'Michael Brown',
          role: 'Designer',
          company: 'Creative Co',
          content: 'They brought our vision to life perfectly.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        },
        {
          name: 'Lisa Wang',
          role: 'Product Lead',
          company: 'Innovation Inc',
          content: 'Professional, efficient, and great to work with.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        },
        {
          name: 'James Wilson',
          role: 'Founder',
          company: 'Startup Hub',
          content: 'Exceeded our expectations in every way.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        },
        {
          name: 'Emma Davis',
          role: 'Marketing Head',
          company: 'Growth Co',
          content: 'Fantastic experience from start to finish.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        },
        {
          name: 'Robert Taylor',
          role: 'CTO',
          company: 'Tech Giant',
          content: 'Top-notch development team. Highly recommended!',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
        },
      ].map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  ),
};

export const MinimalStyle: Story = {
  render: () => (
    <TestimonialCard
      name="Jane Smith"
      content="Simple and elegant testimonial without role or company information."
      rating={5}
    />
  ),
};

export const NoRating: Story = {
  args: {
    name: 'Alex Johnson',
    role: 'Developer',
    company: 'Code Factory',
    content: 'This testimonial card displays without a star rating, focusing purely on the textual feedback.',
  },
};

export const CompactView: Story = {
  render: () => (
    <div className="max-w-sm">
      <TestimonialCard
        name="Chris Lee"
        role="Manager"
        content="Compact testimonial for smaller spaces."
        rating={4}
      />
    </div>
  ),
};

export const ColoredBackground: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
      <div className="bg-blue-50 p-1 rounded-lg">
        <TestimonialCard
          name="Blue Theme"
          role="Designer"
          company="Color Co"
          content="Testimonial with blue background theme."
          rating={5}
        />
      </div>
      <div className="bg-green-50 p-1 rounded-lg">
        <TestimonialCard
          name="Green Theme"
          role="Developer"
          company="Eco Tech"
          content="Testimonial with green background theme."
          rating={5}
        />
      </div>
      <div className="bg-purple-50 p-1 rounded-lg">
        <TestimonialCard
          name="Purple Theme"
          role="Manager"
          company="Creative Inc"
          content="Testimonial with purple background theme."
          rating={5}
        />
      </div>
    </div>
  ),
};