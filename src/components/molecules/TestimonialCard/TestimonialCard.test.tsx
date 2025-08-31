import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TestimonialCard } from './TestimonialCard';

describe('TestimonialCard', () => {
  const mockTestimonial = {
    id: '1',
    content: 'This product has transformed our business operations.',
    name: 'Jane Smith',
    role: 'CEO',
    company: 'TechCorp',
    image: '/testimonials/jane.jpg',
    rating: 5,
    date: '2024-01-15',
    verified: true,
    featured: false,
  };

  it('renders testimonial content', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByText(/This product has transformed/)).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText(/CEO/)).toBeInTheDocument();
    expect(screen.getByText(/TechCorp/)).toBeInTheDocument();
  });

  it('renders with quotes when showQuotes is true', () => {
    render(<TestimonialCard testimonial={mockTestimonial} showQuotes={true} />);
    
    expect(screen.getByText(/"This product has transformed/)).toBeInTheDocument();
  });

  it('renders without quotes when showQuotes is false', () => {
    render(<TestimonialCard testimonial={mockTestimonial} showQuotes={false} />);
    
    expect(screen.getByText(/^This product has transformed/)).toBeInTheDocument();
    expect(screen.queryByText(/"This product/)).not.toBeInTheDocument();
  });

  it('renders rating stars', () => {
    render(<TestimonialCard testimonial={mockTestimonial} showRating={true} />);
    
    const rating = screen.getByLabelText('Rating: 5 out of 5 stars');
    expect(rating).toBeInTheDocument();
    expect(rating.querySelectorAll('.fill-yellow-400')).toHaveLength(5);
  });

  it('handles partial ratings', () => {
    const testimonialWithPartialRating = { ...mockTestimonial, rating: 3.5 };
    render(<TestimonialCard testimonial={testimonialWithPartialRating} />);
    
    const rating = screen.getByLabelText('Rating: 3.5 out of 5 stars');
    const stars = rating.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('hides rating when showRating is false', () => {
    render(<TestimonialCard testimonial={mockTestimonial} showRating={false} />);
    
    expect(screen.queryByLabelText(/Rating:/)).not.toBeInTheDocument();
  });

  it('shows verified badge when testimonial is verified', () => {
    render(<TestimonialCard testimonial={{ ...mockTestimonial, verified: true }} />);
    
    expect(screen.getByLabelText('Verified')).toBeInTheDocument();
  });

  it('shows featured badge when testimonial is featured', () => {
    render(<TestimonialCard testimonial={{ ...mockTestimonial, featured: true }} />);
    
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('truncates content when maxLength is set', () => {
    const longTestimonial = {
      ...mockTestimonial,
      content: 'This is a very long testimonial that should be truncated after a certain number of characters to maintain consistency.',
    };
    
    render(<TestimonialCard testimonial={longTestimonial} maxLength={50} />);
    
    expect(screen.getByText(/This is a very long testimonial that should be.../)).toBeInTheDocument();
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(
      <TestimonialCard testimonial={mockTestimonial} variant="compact" />
    );
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    rerender(<TestimonialCard testimonial={mockTestimonial} variant="minimal" />);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText(/CEO/)).not.toBeInTheDocument(); // Minimal variant hides metadata
    
    rerender(<TestimonialCard testimonial={mockTestimonial} variant="detailed" />);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    // Date format varies by locale, just check that a date is shown
    expect(screen.getByText(/2024|1\/14|1\/15|14\/1|15\/1/)).toBeInTheDocument(); // Detailed shows date
  });

  it('handles missing optional fields', () => {
    const minimalTestimonial = {
      id: '2',
      content: 'Great product!',
      name: 'John Doe',
    };
    
    render(<TestimonialCard testimonial={minimalTestimonial} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Great product!/)).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<TestimonialCard testimonial={mockTestimonial} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Jane Smith'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <TestimonialCard testimonial={mockTestimonial} className="custom-testimonial" />
    );
    
    expect(container.querySelector('.custom-testimonial')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    const { container } = render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const card = container.querySelector('article');
    expect(card).toHaveAttribute('aria-label', 'Testimonial from Jane Smith');
  });

  it('renders without image when showImage is false', () => {
    render(
      <TestimonialCard testimonial={mockTestimonial} showImage={false} />
    );
    
    // Avatar should not be rendered when showImage is false
    expect(screen.queryByAltText(mockTestimonial.name)).not.toBeInTheDocument();
  });

  it('shows only name and role when company is missing', () => {
    const testimonialNoCompany = { ...mockTestimonial, company: undefined };
    render(<TestimonialCard testimonial={testimonialNoCompany} />);
    
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.queryByText(/TechCorp/)).not.toBeInTheDocument();
  });

  it('shows only name and company when role is missing', () => {
    const testimonialNoRole = { ...mockTestimonial, role: undefined };
    render(<TestimonialCard testimonial={testimonialNoRole} />);
    
    expect(screen.getByText('TechCorp')).toBeInTheDocument();
    expect(screen.queryByText(/CEO/)).not.toBeInTheDocument();
  });
});