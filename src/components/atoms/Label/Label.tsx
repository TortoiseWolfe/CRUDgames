'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  error?: boolean | string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inline';
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({
    htmlFor,
    required = false,
    optional = false,
    disabled = false,
    error = false,
    helperText,
    size = 'md',
    variant = 'default',
    as: Component = 'label',
    children,
    className,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';
    
    const labelClasses = cn(
      'font-medium transition-colors duration-200',
      sizeClasses[size],
      {
        'block mb-1': variant === 'default',
        'inline-flex items-center': variant === 'inline',
        'text-gray-700 dark:text-gray-300': !hasError && !disabled,
        'text-red-700 dark:text-red-400': hasError && !disabled,
        'text-gray-400 dark:text-gray-600 cursor-not-allowed': disabled,
        'cursor-pointer': !disabled && Component === 'label',
      },
      className
    );

    return (
      <div>
        <Component
          ref={ref}
          htmlFor={Component === 'label' ? htmlFor : undefined}
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
          {optional && (
            <span 
              className="text-gray-500 ml-1 text-sm" 
              aria-label="optional"
            >
              (optional)
            </span>
          )}
        </Component>
        {helperText && !errorMessage && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {helperText}
          </p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Label.displayName = 'Label';