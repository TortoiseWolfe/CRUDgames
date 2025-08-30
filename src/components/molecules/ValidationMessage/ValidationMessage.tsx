'use client';

import { forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle, AlertTriangle } from 'lucide-react';

const validationMessageVariants = cva(
  'flex items-start gap-2 text-sm rounded-md p-3 transition-all duration-200',
  {
    variants: {
      variant: {
        error: 'bg-red-50 text-red-800 border border-red-200',
        warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        success: 'bg-green-50 text-green-800 border border-green-200',
        info: 'bg-blue-50 text-blue-800 border border-blue-200',
        default: 'bg-gray-50 text-gray-800 border border-gray-200',
      },
      size: {
        sm: 'text-xs p-2',
        md: 'text-sm p-3',
        lg: 'text-base p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const iconVariants = cva('flex-shrink-0', {
  variants: {
    size: {
      sm: 'h-3 w-3 mt-0.5',
      md: 'h-4 w-4 mt-0.5',
      lg: 'h-5 w-5 mt-0.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface ValidationMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof validationMessageVariants> {
  message?: string;
  messages?: string[];
  showIcon?: boolean;
  icon?: ReactNode;
  inline?: boolean;
}

export const ValidationMessage = forwardRef<HTMLDivElement, ValidationMessageProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    message,
    messages,
    showIcon = true,
    icon,
    inline = false,
    children,
    ...props
  }, ref) => {
    const getDefaultIcon = () => {
      if (icon) return icon;
      
      switch (variant) {
        case 'error':
          return <XCircle className={iconVariants({ size })} />;
        case 'warning':
          return <AlertTriangle className={iconVariants({ size })} />;
        case 'success':
          return <CheckCircle className={iconVariants({ size })} />;
        case 'info':
          return <Info className={iconVariants({ size })} />;
        default:
          return <AlertCircle className={iconVariants({ size })} />;
      }
    };

    const content = children || message || (messages && messages.length > 0);

    if (!content) return null;

    if (inline) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm',
            variant === 'error' && 'text-red-600',
            variant === 'warning' && 'text-yellow-600',
            variant === 'success' && 'text-green-600',
            variant === 'info' && 'text-blue-600',
            variant === 'default' && 'text-gray-600',
            className
          )}
          {...props}
        >
          {showIcon && getDefaultIcon()}
          <span>
            {children || message || (messages && messages.join(', '))}
          </span>
        </span>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(validationMessageVariants({ variant, size }), className)}
        role={variant === 'error' ? 'alert' : 'status'}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
        {...props}
      >
        {showIcon && getDefaultIcon()}
        <div className="flex-1">
          {children || (
            <>
              {message && <div>{message}</div>}
              {messages && messages.length > 0 && (
                <ul className={cn(
                  'space-y-1',
                  messages.length > 1 && 'mt-1'
                )}>
                  {messages.map((msg, index) => (
                    <li key={index} className="flex items-start">
                      {messages.length > 1 && (
                        <span className="mr-1">•</span>
                      )}
                      <span>{msg}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

ValidationMessage.displayName = 'ValidationMessage';