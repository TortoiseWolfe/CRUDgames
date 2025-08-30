'use client';

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/atoms/Label';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export interface FormFieldProps {
  children: ReactNode;
  label?: string;
  id?: string;
  required?: boolean;
  error?: string;
  success?: string;
  hint?: string;
  className?: string;
  labelClassName?: string;
  messageClassName?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({
    children,
    label,
    id,
    required = false,
    error,
    success,
    hint,
    className,
    labelClassName,
    messageClassName,
    orientation = 'vertical',
  }, ref) => {
    const hasMessage = error || success || hint;
    
    return (
      <div
        ref={ref}
        className={cn(
          'form-field',
          orientation === 'horizontal' && 'sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start',
          className
        )}
      >
        {label && (
          <Label
            htmlFor={id || undefined}
            required={required}
            className={cn(
              orientation === 'horizontal' && 'sm:text-right sm:pt-2',
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
        
        <div className={cn(
          orientation === 'horizontal' && 'sm:col-span-2',
          orientation === 'vertical' && label && 'mt-1'
        )}>
          {children}
          
          {hasMessage && (
            <div className={cn(
              'mt-2 text-sm',
              messageClassName
            )}>
              {error && (
                <div className="flex items-start gap-1.5 text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              {success && !error && (
                <div className="flex items-start gap-1.5 text-green-600">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}
              
              {hint && !error && !success && (
                <div className="flex items-start gap-1.5 text-gray-500">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{hint}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

FormField.displayName = 'FormField';