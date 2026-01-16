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
      'appearance-none border-2 rounded-full transition-all duration-300',
      'bg-black/80 dark:bg-black/95',
      'focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[size],
      {
        'border-cyan-600/50 dark:border-cyan-400/60': !hasError && !disabled,
        'hover:border-cyan-400 dark:hover:border-cyan-300': !hasError && !disabled,
        'hover:shadow-[0_0_30px_rgba(0,255,255,0.5),0_0_50px_rgba(0,255,255,0.3)]': !hasError && !disabled,
        'focus:border-cyan-300 dark:focus:border-cyan-200': !hasError && !disabled,
        'focus:shadow-[0_0_40px_rgba(0,255,255,0.7),0_0_60px_rgba(0,255,255,0.4)]': !hasError && !disabled,
        'border-red-400 shadow-[0_0_30px_rgba(255,0,0,0.6),0_0_50px_rgba(255,0,0,0.3)]': hasError,
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
            <label className="block text-sm font-mono font-semibold text-gray-800 dark:text-cyan-300 dark:text-shadow-[0_0_8px_rgba(0,255,255,0.6)]">
              <span className="text-cyan-400 dark:text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">{'> '}</span>
              <span className="drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">{label}</span>
              {required && <span className="text-red-400 ml-1 animate-pulse drop-shadow-[0_0_8px_rgba(255,0,0,1)]" aria-label="required">*</span>}
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
            'bg-black/60 dark:bg-black/80 backdrop-blur-md',
            orientation === 'vertical' ? 'flex-col space-y-4' : 'flex-row flex-wrap gap-4 justify-between',
            {
              'border-red-400 shadow-[0_0_30px_rgba(255,0,0,0.6),0_0_60px_rgba(255,0,0,0.3),inset_0_0_30px_rgba(255,0,0,0.2)]': hasError,
              'border-green-400 shadow-[0_0_30px_rgba(0,255,0,0.6),0_0_60px_rgba(0,255,0,0.3),inset_0_0_30px_rgba(0,255,0,0.2)]': success && !hasError,
              'border-cyan-600/40 dark:border-cyan-400/60 shadow-[0_0_20px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.08)]': !hasError && !success,
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
                      'border-[#ff4500] bg-[#ff4500]/80 shadow-[0_0_40px_rgba(255,68,0,1),0_0_60px_rgba(255,68,0,0.6)]': isChecked && option.isHalloween && !hasError && !isDisabled,
                      'border-cyan-400 dark:border-cyan-300 bg-cyan-900/80 dark:bg-cyan-900/90 shadow-[0_0_40px_rgba(0,255,255,0.8),0_0_60px_rgba(0,255,255,0.5)]': isChecked && !option.isHalloween && !hasError && !isDisabled,
                      'border-red-400 bg-red-900/80 shadow-[0_0_40px_rgba(255,0,0,0.8),0_0_60px_rgba(255,0,0,0.5)]': isChecked && hasError,
                    })}
                  />
                  {isChecked && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className={cn(
                        'rounded-full',
                        option.isHalloween 
                          ? 'bg-[#ff9900] shadow-[0_0_25px_rgba(255,153,0,1)]'
                          : hasError 
                            ? 'bg-red-400 shadow-[0_0_15px_rgba(255,0,0,1)]'
                            : 'bg-cyan-300 shadow-[0_0_15px_rgba(0,255,255,1)]',
                        size === 'sm' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-2 w-2' : 'h-2.5 w-2.5'
                      )} />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <label
                    htmlFor={optionId}
                    className={cn(
                      'text-base font-semibold cursor-pointer font-mono tracking-wider',
                      option.isHalloween 
                        ? '' 
                        : hasError 
                          ? 'text-red-400 drop-shadow-[0_0_5px_currentColor]' 
                          : 'text-cyan-400 dark:text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]',
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
                    <p id={`${optionId}-description`} className="text-cyan-600/70 dark:text-cyan-500/60 text-sm font-mono mt-1">
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
            <p id={helperId} className="text-sm text-cyan-600/70 dark:text-cyan-500/60 font-mono">
              {helperText}
            </p>
          )}
          
          {hasError && errorMessage && (
            <p id={errorId} className="text-sm text-red-400 font-mono drop-shadow-[0_0_5px_currentColor]" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';