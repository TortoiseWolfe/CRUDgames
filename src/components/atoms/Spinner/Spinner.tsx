'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  thickness?: 'thin' | 'normal' | 'thick';
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
  className?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({
    size = 'md',
    variant = 'primary',
    thickness = 'normal',
    speed = 'normal',
    label = 'Loading',
    className,
  }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    };

    const thicknessClasses = {
      thin: 'border-2',
      normal: 'border-3',
      thick: 'border-4',
    };

    const speedClasses = {
      slow: 'animate-spin-slow',
      normal: 'animate-spin',
      fast: 'animate-spin-fast',
    };

    const variantClasses = {
      primary: 'border-gray-200 border-t-blue-600',
      secondary: 'border-gray-200 border-t-gray-600',
      white: 'border-gray-400 border-t-white',
    };

    const spinnerClasses = cn(
      'rounded-full',
      sizeClasses[size],
      thicknessClasses[thickness],
      speedClasses[speed],
      variantClasses[variant],
      className
    );

    return (
      <div 
        ref={ref}
        role="status" 
        aria-label={label}
        className="inline-flex items-center justify-center"
      >
        <div className={spinnerClasses} />
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';