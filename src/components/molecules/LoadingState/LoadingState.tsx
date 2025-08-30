'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  text?: string;
  className?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ size = 'md', variant = 'spinner', text, className, fullScreen = false, overlay = false }, ref) => {
    const containerClasses = cn(
      'flex flex-col items-center justify-center',
      fullScreen && 'min-h-screen',
      overlay && 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50',
      !fullScreen && !overlay && 'p-8',
      className
    );

    const content = (
      <>
        {variant === 'spinner' && (
          <Loader2 className={cn(sizeClasses[size], 'animate-spin text-purple-600')} />
        )}
        
        {variant === 'dots' && (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'bg-purple-600 rounded-full animate-pulse',
                  size === 'sm' && 'h-2 w-2',
                  size === 'md' && 'h-3 w-3',
                  size === 'lg' && 'h-4 w-4',
                  size === 'xl' && 'h-5 w-5'
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
        
        {variant === 'pulse' && (
          <div className={cn(
            'bg-purple-600 rounded-full animate-pulse',
            sizeClasses[size]
          )} />
        )}
        
        {variant === 'skeleton' && (
          <div className="w-full max-w-md space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        )}
        
        {text && (
          <p className={cn(
            'mt-4 text-gray-600',
            textSizeClasses[size]
          )}>
            {text}
          </p>
        )}
      </>
    );

    return (
      <div ref={ref} className={containerClasses} role="status" aria-live="polite">
        {content}
        <span className="sr-only">{text || 'Loading...'}</span>
      </div>
    );
  }
);

LoadingState.displayName = 'LoadingState';