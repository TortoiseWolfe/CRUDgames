'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ProgressIndicatorProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const variantClasses = {
  default: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600',
};

const backgroundClasses = {
  default: 'bg-gray-200',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
};

export const ProgressIndicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  (
    {
      value,
      max = 100,
      label,
      showPercentage = false,
      size = 'md',
      variant = 'default',
      animated = false,
      striped = false,
      className,
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const isComplete = percentage === 100;

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {(label || showPercentage) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className="text-sm font-medium text-gray-700">{label}</span>
            )}
            {showPercentage && (
              <span className="text-sm font-medium text-gray-600">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        
        <div
          className={cn(
            'w-full rounded-full overflow-hidden',
            backgroundClasses[variant],
            sizeClasses[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variantClasses[variant],
              isComplete && variant === 'default' && variantClasses.success,
              animated && 'animate-pulse',
              striped && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%] animate-[stripe_1s_linear_infinite]'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';