'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inline';
  children: React.ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({
    htmlFor,
    required = false,
    disabled = false,
    error = false,
    size = 'md',
    variant = 'default',
    children,
    className,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const labelClasses = cn(
      'font-medium transition-colors duration-200',
      sizeClasses[size],
      {
        'block mb-1': variant === 'default',
        'inline-flex items-center': variant === 'inline',
        'text-gray-700 dark:text-gray-300': !error && !disabled,
        'text-red-600 dark:text-red-400': error && !disabled,
        'text-gray-400 dark:text-gray-600 cursor-not-allowed': disabled,
        'cursor-pointer': !disabled,
      },
      className
    );

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={labelClasses}
        {...props}
      >
        {children}
        {required && (
          <span 
            className="text-red-500 ml-1" 
            aria-label="required"
          >
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';