'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  thickness?: 'thin' | 'normal' | 'thick';
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  fullscreen?: boolean;
  className?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({
    size = 'md',
    variant = 'primary',
    thickness = 'normal',
    speed = 'normal',
    label = 'Loading',
    labelPosition = 'bottom',
    fullscreen = false,
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

    const containerClasses = cn(
      'inline-flex items-center justify-center',
      {
        'flex-col': labelPosition === 'bottom',
        'flex-col-reverse': labelPosition === 'top',
        'flex-row': labelPosition === 'right',
        'flex-row-reverse': labelPosition === 'left',
      }
    );

    const labelClasses = cn(
      'text-sm text-gray-600 dark:text-gray-400',
      {
        'mt-2': labelPosition === 'bottom',
        'mb-2': labelPosition === 'top',
        'ml-2': labelPosition === 'right',
        'mr-2': labelPosition === 'left',
      }
    );

    const spinner = (
      <div 
        ref={!fullscreen ? ref : undefined}
        role="status" 
        aria-label={label}
        className={containerClasses}
      >
        <div className={spinnerClasses} />
        {label && labelPosition !== 'bottom' && labelPosition !== 'top' && labelPosition !== 'left' && labelPosition !== 'right' ? (
          <span className="sr-only">{label}</span>
        ) : label ? (
          <span className={labelClasses}>{label}</span>
        ) : null}
      </div>
    );

    if (fullscreen) {
      return (
        <div 
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          {spinner}
        </div>
      );
    }

    return spinner;
  }
);

Spinner.displayName = 'Spinner';