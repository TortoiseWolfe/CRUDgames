import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TestimonialSection } from './TestimonialSection';

const meta = {
  title: 'Organisms/TestimonialSection',
  component: TestimonialSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Testimonial section with multiple layout variants for displaying customer feedback and social proof.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'carousel', 'featured', 'minimal'],
    },
  },
} satisfies Meta<typeof TestimonialSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Operations Manager',
    company: 'TechCorp',
    content: 'Our team actually enjoys database work now. Completion rates are up 40% since implementing CRUDgames.com!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'IT Director',
    company: 'StartupHub',
    content: 'The WordPress plugin was so easy to set up. Our team loves competing for the top spot on the leaderboard!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'Team Lead',
    company: 'DataFlow Inc',
    content: 'Finally, a solution that makes database work fun. My team asks for MORE data entry tasks now!',
    rating: 5,
  },
  {
    id: '4',
    name: 'Alex Rivera',
    role: 'Product Manager',
    company: 'InnovateCo',
    content: 'The gamification elements have transformed our workplace culture. Productivity is through the roof!',
    rating: 4,
    featured: true,
  },
  {
    id: '5',
    name: 'Jordan Smith',
    role: 'HR Director',
    company: 'GlobalTech',
    content: 'Employee engagement scores have never been higher. CRUDgames.com turned mundane tasks into achievements.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Pat Williams',
    role: 'CTO',
    company: 'DevOps Pro',
    content: 'ROI was immediate. Less errors, faster completion times, and happier developers. What more could you want?',
    rating: 5,
  },
];

export const Default: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 3),
  },
};

export const Grid: Story = {
  args: {
    testimonials: sampleTestimonials,
    variant: 'grid',
    title: 'Trusted by Teams Worldwide',
    subtitle: 'See how companies are transforming their workplace with gamification',
  },
};

export const Carousel: Story = {
  args: {
    testimonials: sampleTestimonials,
    variant: 'carousel',
    title: 'Success Stories',
  },
};

export const Featured: Story = {
  args: {
    testimonials: sampleTestimonials,
    variant: 'featured',
    title: 'What Our Customers Say',
    subtitle: 'Real results from real teams',
  },
};

export const Minimal: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 2),
    variant: 'minimal',
    showRatings: false,
  },
};

export const NoRatings: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 3),
    showRatings: false,
  },
};

export const WithImages: Story = {
  args: {
    testimonials: sampleTestimonials.map(t => ({
      ...t,
      image: `https://i.pravatar.cc/150?u=${t.id}`,
    })),
    variant: 'grid',
  },
};

export const SingleTestimonial: Story = {
  args: {
    testimonials: [sampleTestimonials[3]],
    variant: 'minimal',
    title: '',
  },
};

export const CustomStyling: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 3),
    className: 'bg-gradient-to-br from-purple-50 to-indigo-100',
  },
};

export const LongContent: Story = {
  args: {
    testimonials: [
      {
        id: '1',
        name: 'Dr. Elizabeth Harper',
        role: 'Research Director',
        company: 'Data Science Institute',
        content: 'After implementing CRUDgames.com, our research team saw a remarkable transformation. What used to be tedious data entry and database management became an engaging experience. The gamification elements - points, badges, and leaderboards - created healthy competition among team members. We\'ve seen a 40% increase in data processing speed and, more importantly, a significant reduction in errors. The platform has fundamentally changed how we approach routine tasks.',
        rating: 5,
      },
      {
        id: '2',
        name: 'Marcus Thompson',
        role: 'Engineering Manager',
        company: 'TechFlow Solutions',
        content: 'CRUDgames.com has been a game-changer for our engineering team. The WordPress plugin integration was seamless, and the immediate feedback through achievements keeps our developers motivated during long coding sessions. It\'s not just about productivity - it\'s about making work enjoyable.',
        rating: 5,
      },
    ],
    variant: 'minimal',
  },
};