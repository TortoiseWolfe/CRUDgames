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
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    };

    const iconSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const checkboxClasses = cn(
      'appearance-none border-2 transition-all duration-300 backdrop-blur-md',
      'focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-30',
      sizeClasses[size],
      {
        'rounded-sm': variant === 'default',
        'rounded-full': variant === 'rounded',
        // Unchecked state with heavy CRT glow
        'bg-black/80 dark:bg-black/95 border-cyan-600/50 dark:border-cyan-400/60': !hasError && !disabled && !isChecked,
        'hover:border-cyan-400 dark:hover:border-cyan-300': !hasError && !disabled && !isChecked,
        'hover:shadow-[0_0_30px_rgba(0,255,255,0.5),0_0_50px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)]': !hasError && !disabled && !isChecked,
        'focus:shadow-[0_0_40px_rgba(0,255,255,0.7),0_0_60px_rgba(0,255,255,0.4)]': !hasError && !disabled && !isChecked,
        // Error unchecked
        'border-red-400 shadow-[0_0_30px_rgba(255,0,0,0.6),0_0_50px_rgba(255,0,0,0.3)]': hasError && !isChecked,
        // Checked state with heavy glow
        'bg-cyan-900/80 dark:bg-cyan-900/90 border-cyan-400 dark:border-cyan-300': isChecked && !hasError && !disabled,
        'shadow-[0_0_40px_rgba(0,255,255,0.8),0_0_60px_rgba(0,255,255,0.5),inset_0_0_20px_rgba(0,255,255,0.3)]': isChecked && !hasError && !disabled,
        'hover:shadow-[0_0_50px_rgba(0,255,255,1),0_0_80px_rgba(0,255,255,0.6)]': isChecked && !hasError && !disabled,
        // Error checked
        'bg-red-900/80 dark:bg-red-900/90 border-red-400 shadow-[0_0_40px_rgba(255,0,0,0.8),0_0_60px_rgba(255,0,0,0.5)]': isChecked && hasError,
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
                  <Minus className={cn('text-cyan-300 dark:text-cyan-200 drop-shadow-[0_0_10px_currentColor]', iconSizeClasses[size])} />
                ) : (
                  <Check className={cn('text-cyan-300 dark:text-cyan-200 drop-shadow-[0_0_10px_currentColor]', iconSizeClasses[size])} />
                )}
              </div>
            )}
          </div>
          {(label || description || errorMessage) && (
            <div className="ml-3">
              {label && (
                <label 
                  htmlFor={id}
                  className={cn(
                    'text-sm font-mono font-semibold cursor-pointer tracking-wider',
                    hasError ? 'text-red-400 drop-shadow-[0_0_5px_currentColor]' : 'text-cyan-400 dark:text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]',
                    disabled && 'cursor-not-allowed opacity-30'
                  )}
                >
                  {label}
                  {required && <span className="text-red-400 ml-1 animate-pulse drop-shadow-[0_0_8px_rgba(255,0,0,1)]" aria-label="required">*</span>}
                </label>
              )}
              {description && !hasError && (
                <p id={descriptionId} className="text-cyan-600/70 dark:text-cyan-500/60 text-sm font-mono mt-1">
                  {description}
                </p>
              )}
              {hasError && errorMessage && (
                <p id={errorId} className="text-red-400 text-sm font-mono mt-1 drop-shadow-[0_0_5px_currentColor]" role="alert">
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