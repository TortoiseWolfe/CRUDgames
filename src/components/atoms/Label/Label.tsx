'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  error?: boolean | string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inline';
  techStyle?: 'phosphor' | 'terminal' | 'lcd' | 'amber' | 'military';
  showPrompt?: boolean;
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({
    htmlFor,
    required = false,
    optional = false,
    disabled = false,
    error = false,
    helperText,
    size = 'md',
    variant = 'default',
    techStyle = 'phosphor',
    showPrompt = true,
    as: Component = 'label',
    children,
    className,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';
    
    const getTechStyleClasses = () => {
      if (disabled) {
        return 'text-gray-600 dark:text-gray-500 opacity-50';
      }
      
      if (hasError) {
        return 'text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] dark:text-red-300';
      }
      
      switch (techStyle) {
        case 'terminal':
          return 'text-green-400 dark:text-green-300 drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]';
        case 'lcd':
          return 'text-blue-400 dark:text-blue-300 drop-shadow-[0_0_5px_rgba(0,100,255,0.8)]';
        case 'amber':
          return 'text-amber-400 dark:text-amber-300 drop-shadow-[0_0_5px_rgba(255,176,0,0.8)]';
        case 'military':
          return 'text-yellow-600 dark:text-yellow-500 bg-black/80 px-2 py-0.5 border border-yellow-600/60 shadow-[inset_0_0_10px_rgba(255,255,0,0.2)]';
        default: // phosphor
          return 'text-cyan-400 dark:text-cyan-300 drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]';
      }
    };
    
    const labelClasses = cn(
      'font-mono font-bold uppercase tracking-wider transition-all duration-200',
      sizeClasses[size],
      {
        'block mb-2': variant === 'default',
        'inline-flex items-center': variant === 'inline',
        'cursor-not-allowed': disabled,
        'cursor-pointer hover:brightness-125': !disabled && Component === 'label',
      },
      getTechStyleClasses(),
      techStyle === 'military' && 'inline-block',
      className
    );

    return (
      <div>
        <Component
          ref={ref}
          htmlFor={Component === 'label' ? htmlFor : undefined}
          className={labelClasses}
          aria-required={required}
          aria-invalid={hasError}
          aria-disabled={disabled}
          {...props}
        >
          {showPrompt && techStyle === 'terminal' && (
            <span className="mr-1 animate-pulse">{'>'}</span>
          )}
          {showPrompt && techStyle === 'military' && (
            <span className="mr-1">[</span>
          )}
          {children}
          {showPrompt && techStyle === 'military' && (
            <span className="ml-1">]</span>
          )}
          {required && (
            <span 
              className="text-red-400 ml-1 drop-shadow-[0_0_5px_currentColor] animate-pulse" 
              aria-label="required"
              role="presentation"
            >
              *
            </span>
          )}
          {optional && (
            <span 
              className="text-gray-400 dark:text-gray-500 ml-1 text-xs opacity-80" 
              aria-label="optional"
              role="presentation"
            >
              (OPT)
            </span>
          )}
        </Component>
        {helperText && !errorMessage && (
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider opacity-80">
            <span className="text-green-500 mr-1">{'//'}</span>
            {helperText}
          </p>
        )}
        {errorMessage && (
          <p className="text-xs font-mono text-red-400 dark:text-red-300 mt-1 uppercase tracking-wider drop-shadow-[0_0_5px_currentColor]" role="alert">
            <span className="mr-1 animate-pulse">!</span>
            ERROR: {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Label.displayName = 'Label';