'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/atoms/Card';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import { Star, Quote, CheckCircle } from 'lucide-react';

export interface Testimonial {
  id: string;
  content: string;
  name: string;
  role?: string;
  company?: string;
  image?: string;
  rating?: number;
  date?: string;
  verified?: boolean;
  featured?: boolean;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  showRating?: boolean;
  showImage?: boolean;
  showQuotes?: boolean;
  maxLength?: number;
  className?: string;
  onClick?: () => void;
}

function renderRating(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
      );
    } else {
      stars.push(
        <Star key={i} className="h-4 w-4 text-gray-300" />
      );
    }
  }
  
  return (
    <div 
      className="flex gap-0.5" 
      role="img" 
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {stars}
    </div>
  );
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({
    testimonial,
    variant = 'default',
    showRating = true,
    showImage = true,
    showQuotes = true,
    maxLength,
    className,
    onClick,
    ...props
  }, ref) => {
    const content = maxLength ? truncateText(testimonial.content, maxLength) : testimonial.content;
    
    const cardPadding = variant === 'compact' ? 'sm' : variant === 'minimal' ? 'md' : 'lg';
    const showMetadata = variant !== 'minimal';
    
    return (
      <Card
        ref={ref}
        variant={testimonial.featured ? 'elevated' : 'outlined'}
        padding={cardPadding}
        hoverable={!!onClick}
        clickable={!!onClick}
        onClick={onClick}
        className={cn(
          'h-full flex flex-col',
          testimonial.featured && 'ring-2 ring-purple-500 ring-offset-2',
          className
        )}
        as="article"
        ariaLabel={`Testimonial from ${testimonial.name}`}
        {...props}
      >
        {/* Quote Icon */}
        {showQuotes && variant !== 'minimal' && (
          <Quote className="h-8 w-8 text-gray-200 mb-3" aria-hidden="true" />
        )}
        
        {/* Rating */}
        {showRating && testimonial.rating && (
          <div className="mb-3">
            {renderRating(testimonial.rating)}
          </div>
        )}
        
        {/* Content */}
        <blockquote className="flex-1 mb-4">
          <p className={cn(
            'text-gray-700',
            variant === 'detailed' ? 'text-base' : 'text-sm',
            variant !== 'minimal' && 'italic'
          )}>
            {showQuotes ? `"${content}"` : content}
          </p>
        </blockquote>
        
        {/* Author Section */}
        <div className="flex items-center gap-3">
          {showImage && variant !== 'minimal' && (
            <Avatar
              src={testimonial.image}
              name={testimonial.name}
              size={variant === 'compact' ? 'sm' : 'md'}
            />
          )}
          
          <div className="flex-1">
            <cite className="not-italic">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {testimonial.name}
                </span>
                {testimonial.verified && (
                  <CheckCircle className="h-4 w-4 text-blue-500" aria-label="Verified" />
                )}
              </div>
              
              {showMetadata && (testimonial.role || testimonial.company) && (
                <div className="text-sm text-gray-600">
                  {testimonial.role}
                  {testimonial.role && testimonial.company && ', '}
                  {testimonial.company}
                </div>
              )}
              
              {variant === 'detailed' && testimonial.date && (
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(testimonial.date).toLocaleDateString()}
                </div>
              )}
            </cite>
          </div>
          
          {testimonial.featured && variant !== 'minimal' && (
            <Badge variant="primary" size="sm">
              Featured
            </Badge>
          )}
        </div>
      </Card>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';