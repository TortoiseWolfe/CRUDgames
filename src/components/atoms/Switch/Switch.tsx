'use client';

import { forwardRef, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const switchVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'focus:ring-blue-500',
        success: 'focus:ring-green-500',
        warning: 'focus:ring-yellow-500',
        danger: 'focus:ring-red-500',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  'pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 transition duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  labelPosition?: 'left' | 'right';
  error?: boolean | string;
  loading?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({
    className,
    variant,
    size,
    label,
    description,
    checked: controlledChecked,
    defaultChecked = false,
    onCheckedChange,
    labelPosition = 'right',
    disabled = false,
    error = false,
    loading = false,
    id,
    ...props
  }, ref) => {
    const [isChecked, setIsChecked] = useState(controlledChecked ?? defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';
    const isDisabled = disabled || loading;

    useEffect(() => {
      if (isControlled) {
        setIsChecked(controlledChecked);
      }
    }, [controlledChecked, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (loading) return;
      
      const newChecked = e.target.checked;
      
      if (!isControlled) {
        setIsChecked(newChecked);
      }
      
      onCheckedChange?.(newChecked);
      props.onChange?.(e);
    };

    const getBackgroundColor = () => {
      if (isDisabled) return 'bg-gray-200';
      if (!isChecked) return hasError ? 'bg-red-200' : 'bg-gray-200';
      
      if (hasError) return 'bg-red-600';
      
      switch (variant) {
        case 'success': return 'bg-green-600';
        case 'warning': return 'bg-yellow-600';
        case 'danger': return 'bg-red-600';
        default: return 'bg-blue-600';
      }
    };

    const getTranslateClass = () => {
      if (!isChecked) return 'translate-x-0';
      
      switch (size) {
        case 'sm': return 'translate-x-4';
        case 'lg': return 'translate-x-7';
        default: return 'translate-x-5';
      }
    };

    const switchElement = (
      <>
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          disabled={isDisabled}
          id={id}
          aria-invalid={hasError}
          aria-describedby={description ? `${id}-description` : undefined}
          required={props.required}
          {...props}
        />
        <span
          className={cn(
            switchVariants({ variant: hasError ? 'danger' : variant, size }),
            getBackgroundColor(),
            isDisabled && 'opacity-50 cursor-not-allowed',
            hasError && 'ring-2 ring-red-500 ring-offset-2',
            className
          )}
          aria-hidden="true"
        >
          {loading ? (
            <Loader2 className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-gray-600',
              size === 'sm' && 'h-3 w-3',
              size === 'md' && 'h-4 w-4',
              size === 'lg' && 'h-5 w-5'
            )} />
          ) : (
            <span
              className={cn(
                thumbVariants({ size }),
                getTranslateClass(),
                isDisabled && 'opacity-75'
              )}
            />
          )}
        </span>
      </>
    );

    if (!label && !description && !errorMessage) {
      return (
        <label htmlFor={id} className="inline-flex items-center">
          {switchElement}
        </label>
      );
    }

    return (
      <div>
        <div className="flex items-start">
        {labelPosition === 'left' && (
          <div className="mr-3">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'text-sm font-medium text-gray-900',
                  disabled && 'opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={`${id}-description`}
                className={cn(
                  'text-sm text-gray-500',
                  disabled && 'opacity-50'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        
        <label htmlFor={id} className="inline-flex items-center">
          {switchElement}
        </label>
        
        {labelPosition === 'right' && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'text-sm font-medium text-gray-900',
                  disabled && 'opacity-50',
                  'cursor-pointer'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={`${id}-description`}
                className={cn(
                  'text-sm text-gray-500',
                  disabled && 'opacity-50'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        </div>
        {errorMessage && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';