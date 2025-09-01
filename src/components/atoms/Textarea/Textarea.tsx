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
      sm: 'text-sm py-1.5 px-2.5',
      md: 'text-base py-2 px-3',
      lg: 'text-lg py-2.5 px-3.5',
    };

    const variantClasses = {
      default: 'bg-input',
      filled: 'bg-card',
      ghost: 'bg-transparent',
    };
    
    const textareaClasses = cn(
      'w-full text-foreground placeholder-muted-foreground',
      'border rounded-md transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
      'read-only:bg-muted read-only:cursor-default',
      sizeClasses[size],
      variantClasses[variant],
      {
        'border-border hover:border-ring focus:border-ring focus:ring-ring/50': !hasError && !success && variant !== 'ghost',
        'border-transparent hover:border-border': variant === 'ghost' && !hasError && !success,
        'border-destructive hover:border-destructive focus:border-destructive focus:ring-destructive/50': hasError,
        'border-accent hover:border-accent focus:border-accent focus:ring-accent/50': success,
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
            className="block text-sm font-medium text-foreground mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
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