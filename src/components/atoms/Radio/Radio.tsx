'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  id: string;
  name: string;
  value?: string;
  defaultValue?: string;
  options: RadioOption[];
  
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  
  label?: string;
  helperText?: string;
  error?: boolean | string;
  disabled?: boolean;
  required?: boolean;
  
  onChange?: (value: string) => void;
  
  ariaLabel?: string;
  className?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    id,
    name,
    value,
    defaultValue,
    options,
    orientation = 'vertical',
    size = 'md',
    label,
    helperText,
    error = false,
    disabled = false,
    required = false,
    onChange,
    ariaLabel,
    className,
  }, ref) => {
    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';

    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const dotSizeClasses = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    };

    const radioClasses = cn(
      'appearance-none border-2 rounded-full transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[size],
      {
        'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500': !hasError && !disabled,
        'border-red-500 hover:border-red-600 focus:border-red-600 focus:ring-red-500': hasError,
      }
    );

    const handleChange = (optionValue: string) => {
      if (!disabled) {
        onChange?.(optionValue);
      }
    };

    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const groupId = `${id}-group`;

    return (
      <div className={cn('w-full', className)} ref={ref}>
        {label && (
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
          </div>
        )}
        
        <div
          id={groupId}
          role="radiogroup"
          aria-label={ariaLabel || label}
          aria-describedby={`${helperText ? helperId : ''} ${hasError ? errorId : ''}`}
          aria-invalid={hasError}
          aria-required={required}
          className={cn(
            'flex',
            orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row flex-wrap gap-4'
          )}
        >
          {options.map((option) => {
            const isChecked = value ? value === option.value : defaultValue === option.value;
            const optionId = `${id}-${option.value}`;
            const isDisabled = disabled || option.disabled;
            
            return (
              <div key={option.value} className="flex items-start">
                <div className="relative flex items-center h-5">
                  <input
                    type="radio"
                    id={optionId}
                    name={name}
                    value={option.value}
                    checked={value !== undefined ? value === option.value : undefined}
                    defaultChecked={value === undefined ? defaultValue === option.value : undefined}
                    disabled={isDisabled}
                    onChange={() => handleChange(option.value)}
                    aria-describedby={option.description ? `${optionId}-description` : undefined}
                    className={cn(radioClasses, {
                      'border-blue-600 bg-blue-600': isChecked && !hasError && !isDisabled,
                      'border-red-600 bg-red-600': isChecked && hasError,
                    })}
                  />
                  {isChecked && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className={cn('bg-white rounded-full', dotSizeClasses[size])} />
                    </div>
                  )}
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor={optionId}
                    className={cn(
                      'font-medium cursor-pointer',
                      hasError ? 'text-red-900' : 'text-gray-900',
                      isDisabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    {option.label}
                  </label>
                  {option.description && (
                    <p id={`${optionId}-description`} className="text-gray-500 mt-0.5">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-2">
          {helperText && !hasError && (
            <p id={helperId} className="text-sm text-gray-500">
              {helperText}
            </p>
          )}
          
          {hasError && errorMessage && (
            <p id={errorId} className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';