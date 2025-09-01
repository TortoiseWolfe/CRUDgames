'use client';

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  value?: string;
  defaultValue?: string;
  
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'ghost';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  
  maxLength?: number;
  minLength?: number;
  showCount?: boolean;
  required?: boolean;
  
  error?: boolean | string;
  disabled?: boolean;
  readOnly?: boolean;
  success?: boolean;
  loading?: boolean;
  
  label?: string;
  placeholder?: string;
  helperText?: string;
  
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    id,
    name,
    value,
    defaultValue,
    size = 'md',
    variant = 'default',
    resize = 'vertical',
    autoResize = false,
    minRows = 3,
    maxRows = 10,
    maxLength,
    minLength,
    showCount = false,
    required = false,
    error = false,
    disabled = false,
    readOnly = false,
    success = false,
    loading = false,
    label,
    placeholder,
    helperText,
    onChange,
    onBlur,
    ariaLabel,
    ariaDescribedBy,
    className,
    ...props
  }, ref) => {
    const [charCount, setCharCount] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = ref || textareaRef;

    const adjustHeight = useCallback(() => {
      const textarea = typeof combinedRef === 'object' && combinedRef?.current;
      if (!textarea || !autoResize) return;

      textarea.style.height = 'auto';
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows * lineHeight;
      
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, combinedRef, maxRows, minRows]);

    useEffect(() => {
      const currentValue = value ?? defaultValue ?? '';
      setCharCount(currentValue.toString().length);
      adjustHeight();
    }, [value, defaultValue, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      adjustHeight();
      onChange?.(e);
    };

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';
    const isDisabled = disabled || loading;
    
    const sizeClasses = {
      sm: 'text-lg py-2 px-3',
      md: 'text-xl py-2.5 px-3.5',
      lg: 'text-xl py-3 px-4',
    };

    const variantClasses = {
      default: 'bg-white dark:bg-black/40 backdrop-blur-sm border-gray-300 dark:border-cyan-500/50',
      filled: 'bg-gray-50 dark:bg-black/60 backdrop-blur-md border-gray-400 dark:border-cyan-500/60',
      ghost: 'bg-transparent border-transparent hover:border-gray-300 dark:hover:border-cyan-500/50',
    };
    
    const textareaClasses = cn(
      'w-full text-gray-900 dark:text-cyan-100 font-mono placeholder:text-gray-400 dark:placeholder:text-cyan-800/60',
      'border-2 rounded-sm transition-all duration-300',
      'focus:outline-none focus:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-30',
      'read-only:bg-muted read-only:cursor-default',
      sizeClasses[size],
      variantClasses[variant],
      {
        'hover:border-gray-400 dark:hover:border-cyan-500/70 focus:border-blue-500 dark:focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:focus:shadow-[0_0_15px_rgba(0,255,255,0.6)]': !hasError && !success,
        'border-red-500 dark:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,64,0.5)]': hasError,
        'border-green-500 dark:border-green-400 focus:shadow-[0_0_10px_rgba(57,255,20,0.5)]': success,
        'resize-none': resize === 'none' || autoResize,
        'resize-y': resize === 'vertical' && !autoResize,
        'resize-x': resize === 'horizontal' && !autoResize,
        'resize': resize === 'both' && !autoResize,
      },
      className
    );

    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const countId = `${id}-count`;
    const describedBy = [
      ariaDescribedBy,
      helperText && helperId,
      hasError && errorId,
      showCount && countId,
    ].filter(Boolean).join(' ');

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={id}
            className="block text-sm font-mono text-gray-700 dark:text-cyan-300 mb-1"
          >
            {'> '}{label}
            {required && <span className="text-red-400 ml-1 animate-pulse" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={combinedRef}
            id={id}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            disabled={isDisabled}
            readOnly={readOnly}
            maxLength={maxLength}
            minLength={minLength}
            onChange={handleChange}
            onBlur={onBlur}
            aria-label={ariaLabel || label}
            aria-describedby={describedBy || undefined}
            aria-invalid={hasError}
            aria-required={required}
            className={textareaClasses}
            rows={minRows}
            {...props}
          />
          {loading && (
            <Loader2 className="absolute right-2 top-2 h-4 w-4 text-muted-foreground animate-spin" />
          )}
        </div>
        
        <div className="mt-1 flex justify-between items-start">
          <div className="flex-1">
            {helperText && !hasError && (
              <p id={helperId} className="text-sm text-muted-foreground">
                {helperText}
              </p>
            )}
            
            {hasError && errorMessage && (
              <p id={errorId} className="text-sm text-destructive" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
          
          {showCount && maxLength && (
            <span 
              id={countId}
              className={cn(
                'text-sm ml-2',
                charCount > maxLength ? 'text-destructive' : 'text-muted-foreground'
              )}
              aria-live="polite"
              aria-atomic="true"
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';