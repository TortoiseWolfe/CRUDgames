'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  customLabelClass?: string;
  isHalloween?: boolean;
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
  success?: boolean;
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
    success = false,
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


    const radioClasses = cn(
      'appearance-none border-2 rounded-full transition-all duration-200 bg-white dark:bg-gray-900',
      'focus:outline-none focus:ring-4 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[size],
      {
        'border-gray-400 dark:border-cyan-500/50 hover:border-blue-500 dark:hover:border-cyan-400 focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-blue-200 dark:focus:ring-cyan-900': !hasError && !disabled,
        'border-red-500 hover:border-red-600 focus:border-red-600 focus:ring-red-200': hasError,
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
            <label className="block text-sm font-mono text-gray-700 dark:text-cyan-300">
              {'> '}{label}
              {required && <span className="text-red-500 dark:text-red-400 ml-1 animate-pulse" aria-label="required">*</span>}
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
            'flex p-3 rounded-sm border-2 transition-all duration-300',
            orientation === 'vertical' ? 'flex-col space-y-4' : 'flex-row flex-wrap gap-4 justify-between',
            {
              'border-red-500 dark:border-red-500 shadow-[0_0_10px_rgba(255,0,64,0.5)]': hasError,
              'border-green-500 dark:border-green-400 shadow-[0_0_10px_rgba(57,255,20,0.5)]': success && !hasError,
              'border-gray-300 dark:border-cyan-500/50': !hasError && !success,
            },
            className
          )}
        >
          {options.map((option) => {
            const isChecked = value ? value === option.value : defaultValue === option.value;
            const optionId = `${id}-${option.value}`;
            const isDisabled = disabled || option.disabled;
            
            return (
              <div key={option.value} className="flex items-start min-w-0">
                <div className="relative flex items-center h-5">
                  <input
                    type="radio"
                    id={optionId}
                    name={name}
                    value={option.value}
                    checked={value !== undefined ? value === option.value : defaultValue === option.value}
                    disabled={isDisabled}
                    onChange={() => handleChange(option.value)}
                    aria-describedby={option.description ? `${optionId}-description` : undefined}
                    className={cn(radioClasses, {
                      'border-[#ff4500] dark:border-[#ff4500] bg-[#ff4500] dark:bg-[#ff4500] shadow-[0_0_15px_rgba(255,68,0,0.8)]': isChecked && option.isHalloween && !hasError && !isDisabled,
                      'border-blue-600 dark:border-cyan-400 bg-blue-600 dark:bg-cyan-400': isChecked && !option.isHalloween && !hasError && !isDisabled,
                      'border-red-600 bg-red-600': isChecked && hasError,
                    })}
                  />
                  {isChecked && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className={cn(
                        'rounded-full',
                        option.isHalloween 
                          ? 'bg-[#ff9900] dark:bg-[#ff9900] shadow-[0_0_20px_rgba(255,68,0,0.9)]'
                          : hasError 
                            ? 'bg-red-200 dark:bg-red-900 shadow-[0_0_8px_rgba(255,0,64,0.8)]'
                            : 'bg-cyan-200 dark:bg-cyan-900 shadow-[0_0_8px_rgba(0,255,255,0.8)]',
                        size === 'sm' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-2 w-2' : 'h-2.5 w-2.5'
                      )} />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <label
                    htmlFor={optionId}
                    className={cn(
                      'text-lg font-semibold cursor-pointer',
                      option.isHalloween 
                        ? '' 
                        : hasError 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-gray-900 dark:text-cyan-100',
                      isDisabled && 'cursor-not-allowed opacity-50',
                      option.customLabelClass
                    )}
                    style={option.isHalloween ? {
                      color: '#ff9900',
                      textShadow: '0 0 10px #ff4500, 0 0 20px rgba(255, 68, 0, 0.8), 0 0 30px rgba(255, 68, 0, 0.5)',
                      animation: 'halloween-glow-text 4s ease-in-out infinite',
                      fontFamily: 'Orbitron, monospace',
                      letterSpacing: '0.05em'
                    } : undefined}
                  >
                    {option.label}
                  </label>
                  {option.description && (
                    <p id={`${optionId}-description`} className="text-gray-600 dark:text-gray-400 text-sm mt-1">
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
            <p id={helperId} className="text-base text-gray-600 dark:text-gray-400">
              {helperText}
            </p>
          )}
          
          {hasError && errorMessage && (
            <p id={errorId} className="text-base text-red-600 dark:text-red-400" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';