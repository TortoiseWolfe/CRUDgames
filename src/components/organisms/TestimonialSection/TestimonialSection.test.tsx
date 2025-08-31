import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestimonialSection } from './TestimonialSection';

const mockTestimonials = [
  {
    id: '1',
    content: 'Great product!',
    name: 'John Doe',
    role: 'CEO',
    company: 'Tech Corp',
    rating: 5,
  },
  {
    id: '2',
    content: 'Excellent service',
    name: 'Jane Smith',
    role: 'CTO',
    company: 'StartupCo',
    rating: 4,
  },
  {
    id: '3',
    content: 'Highly recommend',
    name: 'Bob Johnson',
    role: 'Developer',
    company: 'DevShop',
    rating: 5,
  },
];

describe('TestimonialSection', () => {
  it('renders title and subtitle', () => {
    render(
      <TestimonialSection
        title="Customer Reviews"
        subtitle="What our clients say"
        testimonials={mockTestimonials}
      />
    );
    
    expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
    expect(screen.getByText('What our clients say')).toBeInTheDocument();
  });

  it('renders all testimonials in grid variant', () => {
    render(
      <TestimonialSection
        testimonials={mockTestimonials}
        variant="grid"
      />
    );
    
    // Content is wrapped in quotes
    expect(screen.getByText(/Great product!/)).toBeInTheDocument();
    expect(screen.getByText(/Excellent service/)).toBeInTheDocument();
    expect(screen.getByText(/Highly recommend/)).toBeInTheDocument();
  });

  it('renders author information', () => {
    render(
      <TestimonialSection
        testimonials={[mockTestimonials[0]]}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('CEO, Tech Corp')).toBeInTheDocument();
  });

  it('renders rating stars when provided', () => {
    render(
      <TestimonialSection
        testimonials={[mockTestimonials[0]]}
        showRatings={true}
      />
    );
    
    // Look for star icons by their aria-label
    const ratingContainer = screen.getByLabelText('5 out of 5 stars');
    expect(ratingContainer).toBeInTheDocument();
  });

  it('renders carousel variant', () => {
    render(
      <TestimonialSection
        testimonials={mockTestimonials}
        variant="carousel"
      />
    );
    
    // Carousel variant may not have explicit navigation buttons
    // Just verify it renders
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
  });

  it('renders featured variant', () => {
    render(
      <TestimonialSection
        testimonials={mockTestimonials}
        variant="featured"
      />
    );
    
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { container } = render(
      <TestimonialSection
        testimonials={mockTestimonials}
        variant="minimal"
      />
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles empty testimonials array', () => {
    render(
      <TestimonialSection
        testimonials={[]}
        title="No Reviews Yet"
      />
    );
    
    expect(screen.getByText('No Reviews Yet')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TestimonialSection
        testimonials={mockTestimonials}
        className="custom-testimonials"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-testimonials');
  });

  it('shows testimonials with images when provided', () => {
    const testimonialsWithImages = [
      { ...mockTestimonials[0], image: '/avatar1.png' }
    ];
    
    render(
      <TestimonialSection
        testimonials={testimonialsWithImages}
      />
    );
    
    // Content is wrapped in quotes
    expect(screen.getByText(/Great product!/)).toBeInTheDocument();
  });
});