'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  id: string;
  name: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'rounded';
  
  label?: string;
  description?: string;
  error?: boolean | string;
  
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange?: (checked: boolean) => void;
  
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    id,
    name,
    checked: controlledChecked,
    defaultChecked = false,
    indeterminate = false,
    size = 'md',
    variant = 'default',
    label,
    description,
    error = false,
    disabled = false,
    required = false,
    onChange,
    onCheckedChange,
    ariaLabel,
    ariaDescribedBy,
    className,
    ...props
  }, ref) => {
    // Handle both controlled and uncontrolled modes
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';

    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const iconSizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    };

    const checkboxClasses = cn(
      'appearance-none border-2 transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[size],
      {
        'rounded': variant === 'default',
        'rounded-full': variant === 'rounded',
        'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500': !hasError && !disabled && !isChecked,
        'border-red-500 hover:border-red-600 focus:border-red-600 focus:ring-red-500': hasError && !isChecked,
        'bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700': isChecked && !hasError && !disabled,
        'bg-red-600 border-red-600': isChecked && hasError,
      }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      
      onChange?.(e);
      onCheckedChange?.(newChecked);
    };

    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;
    const describedBy = [
      ariaDescribedBy,
      description && descriptionId,
      hasError && errorId,
    ].filter(Boolean).join(' ');

    return (
      <div className={cn('flex', className)}>
        <div className="flex items-start">
          <div className="relative flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              id={id}
              name={name}
              checked={isControlled ? controlledChecked : undefined}
              defaultChecked={!isControlled ? defaultChecked : undefined}
              disabled={disabled}
              required={required}
              onChange={handleChange}
              aria-label={ariaLabel || label}
              aria-describedby={describedBy || undefined}
              aria-invalid={hasError}
              aria-required={required}
              className={checkboxClasses}
              {...props}
            />
            {isChecked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {indeterminate ? (
                  <Minus className={cn('text-white', iconSizeClasses[size])} />
                ) : (
                  <Check className={cn('text-white', iconSizeClasses[size])} />
                )}
              </div>
            )}
          </div>
          {(label || description || errorMessage) && (
            <div className="ml-3 text-sm">
              {label && (
                <label 
                  htmlFor={id}
                  className={cn(
                    'font-medium cursor-pointer',
                    hasError ? 'text-red-900' : 'text-gray-900',
                    disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {label}
                  {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
                </label>
              )}
              {description && !hasError && (
                <p id={descriptionId} className="text-gray-500 mt-0.5">
                  {description}
                </p>
              )}
              {hasError && errorMessage && (
                <p id={errorId} className="text-red-600 mt-0.5" role="alert">
                  {errorMessage}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';