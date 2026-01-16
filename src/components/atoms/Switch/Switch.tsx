'use client';

import { forwardRef, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const switchVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 transition-all duration-500 ease-in-out focus:outline-none',
  {
    variants: {
      variant: {
        default: 'focus:shadow-[0_0_15px_rgba(100,100,120,0.6)]',
        success: 'focus:shadow-[0_0_15px_rgba(0,255,0,0.4)]',
        warning: 'focus:shadow-[0_0_15px_rgba(255,140,0,0.4)]',
        danger: 'focus:shadow-[0_0_15px_rgba(255,0,0,0.4)]',
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
  'pointer-events-none inline-block rounded-full transform ring-0 transition-all duration-500 ease-in-out',  
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
      // Analog metal aesthetic with subtle lighting
      if (isDisabled) return 'bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-700 opacity-50';
      
      // OFF state - brushed metal with recessed groove
      if (!isChecked) {
        if (hasError) {
          return 'bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 border-red-400 dark:border-red-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]';
        }
        return 'bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 border-gray-400 dark:border-gray-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]';
      }
      
      // ON state - metal with LED indicator glow
      if (hasError) {
        return 'bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-red-500 dark:border-red-600 shadow-[0_0_12px_rgba(239,68,68,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] dark:shadow-[0_0_20px_rgba(239,68,68,0.5),inset_0_1px_2px_rgba(0,0,0,0.3)]';
      }
      
      switch (variant) {
        case 'success': 
          return 'bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-green-500 dark:border-green-600 shadow-[0_0_12px_rgba(34,197,94,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] dark:shadow-[0_0_20px_rgba(34,197,94,0.5),inset_0_1px_2px_rgba(0,0,0,0.3)]';
        case 'warning': 
          return 'bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-amber-500 dark:border-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] dark:shadow-[0_0_20px_rgba(245,158,11,0.5),inset_0_1px_2px_rgba(0,0,0,0.3)]';
        case 'danger': 
          return 'bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-red-500 dark:border-red-600 shadow-[0_0_12px_rgba(239,68,68,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] dark:shadow-[0_0_20px_rgba(239,68,68,0.5),inset_0_1px_2px_rgba(0,0,0,0.3)]';
        default: 
          return 'bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-slate-500 dark:border-slate-600 shadow-[0_0_12px_rgba(100,116,139,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] dark:shadow-[0_0_20px_rgba(148,163,184,0.5),inset_0_1px_2px_rgba(0,0,0,0.3)]';
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
            'relative overflow-hidden',
            isDisabled && 'cursor-not-allowed',
            hasError && 'ring-1 ring-red-800 ring-offset-1 ring-offset-black',
            className
          )}
          aria-hidden="true"
        >
          {/* Metal texture overlay */}
          {!isDisabled && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full opacity-50">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10" />
            </div>
          )}
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
                // Chrome metal toggle with LED indicator
                isDisabled ? 'bg-gray-400 dark:bg-gray-600' : 
                isChecked ? cn(
                  'bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500',
                  'shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.3)]',
                  'after:absolute after:inset-1 after:rounded-full after:bg-gradient-to-br',
                  hasError ? 'after:from-red-400/60 after:to-red-500/40' :
                  variant === 'success' ? 'after:from-green-400/60 after:to-green-500/40' :
                  variant === 'warning' ? 'after:from-amber-400/60 after:to-amber-500/40' :
                  variant === 'danger' ? 'after:from-red-400/60 after:to-red-500/40' :
                  'after:from-blue-400/60 after:to-blue-500/40',
                  'after:animate-pulse'
                ) :
                'bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-600 dark:via-gray-500 dark:to-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.6)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]'
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
                  'text-sm font-mono font-bold text-gray-400 dark:text-gray-300',
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
                  'text-sm font-mono text-gray-500 dark:text-gray-400',
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
                  'text-sm font-mono text-gray-500 dark:text-gray-400',
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
          <p className="text-sm font-mono text-red-400 mt-1 drop-shadow-[0_0_5px_currentColor]" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';