'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Star, Quote } from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
  featured?: boolean;
}

export interface TestimonialSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  variant?: 'grid' | 'carousel' | 'featured' | 'minimal';
  showRatings?: boolean;
  className?: string;
}

export const TestimonialSection = forwardRef<HTMLElement, TestimonialSectionProps>(
  ({ 
    testimonials, 
    title = 'What Our Clients Say',
    subtitle,
    variant = 'grid',
    showRatings = true,
    className 
  }, ref) => {
    
    const renderRating = (rating: number) => {
      return (
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "h-4 w-4",
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              )}
            />
          ))}
        </div>
      );
    };

    const renderTestimonial = (testimonial: Testimonial) => {
      const isFeature = variant === 'featured' && testimonial.featured;
      
      return (
        <div
          key={testimonial.id}
          className={cn(
            "bg-white rounded-lg shadow-md p-6 flex flex-col",
            isFeature && "md:col-span-2 lg:col-span-2",
            "hover:shadow-lg transition-shadow duration-200"
          )}
        >
          {/* Quote Icon */}
          <Quote className="h-8 w-8 text-purple-200 mb-4" />
          
          {/* Rating */}
          {showRatings && testimonial.rating && (
            <div className="mb-3">
              {renderRating(testimonial.rating)}
            </div>
          )}
          
          {/* Content */}
          <blockquote className="flex-1 text-gray-600 mb-6 italic">
            &ldquo;{testimonial.content}&rdquo;
          </blockquote>
          
          {/* Author */}
          <div className="flex items-center gap-3">
            {testimonial.image && (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <cite className="not-italic">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">
                  {testimonial.role}
                  {testimonial.company && `, ${testimonial.company}`}
                </div>
              </cite>
            </div>
          </div>
        </div>
      );
    };

    const gridClasses = {
      grid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
      featured: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
      carousel: "flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4",
      minimal: "grid md:grid-cols-2 gap-6"
    };

    return (
      <section ref={ref} className={cn("py-16", className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            {(title || subtitle) && (
              <div className="text-center mb-12">
                {title && (
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            
            {/* Testimonials */}
            <div className={gridClasses[variant]}>
              {variant === 'carousel' ? (
                testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
                  >
                    {renderTestimonial(testimonial)}
                  </div>
                ))
              ) : (
                testimonials.map((testimonial) => 
                  renderTestimonial(testimonial)
                )
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

TestimonialSection.displayName = 'TestimonialSection';