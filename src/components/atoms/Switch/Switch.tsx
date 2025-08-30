'use client';

import { forwardRef, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

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
    id,
    ...props
  }, ref) => {
    const [isChecked, setIsChecked] = useState(controlledChecked ?? defaultChecked);
    const isControlled = controlledChecked !== undefined;

    useEffect(() => {
      if (isControlled) {
        setIsChecked(controlledChecked);
      }
    }, [controlledChecked, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      
      if (!isControlled) {
        setIsChecked(newChecked);
      }
      
      onCheckedChange?.(newChecked);
      props.onChange?.(e);
    };

    const getBackgroundColor = () => {
      if (disabled) return 'bg-gray-200';
      if (!isChecked) return 'bg-gray-200';
      
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
          disabled={disabled}
          id={id}
          aria-describedby={description ? `${id}-description` : undefined}
          {...props}
        />
        <span
          className={cn(
            switchVariants({ variant, size }),
            getBackgroundColor(),
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          aria-hidden="true"
        >
          <span
            className={cn(
              thumbVariants({ size }),
              getTranslateClass(),
              disabled && 'opacity-75'
            )}
          />
        </span>
      </>
    );

    if (!label && !description) {
      return (
        <label htmlFor={id} className="inline-flex items-center">
          {switchElement}
        </label>
      );
    }

    return (
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
    );
  }
);

Switch.displayName = 'Switch';