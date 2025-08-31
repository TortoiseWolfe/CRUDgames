'use client';

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  value?: string;
  defaultValue?: string;
  
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
    
    const textareaClasses = cn(
      'w-full px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-600',
      'border rounded-md transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-500 disabled:cursor-not-allowed',
      'read-only:bg-gray-50 dark:read-only:bg-gray-800 read-only:cursor-default',
      'bg-white dark:bg-gray-800',
      {
        'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-500': !hasError && !success,
        'border-red-500 hover:border-red-600 focus:border-red-600 focus:ring-red-500': hasError,
        'border-green-500 hover:border-green-600 focus:border-green-600 focus:ring-green-500': success,
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
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <textarea
          ref={combinedRef}
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
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
        
        <div className="mt-1 flex justify-between items-start">
          <div className="flex-1">
            {helperText && !hasError && (
              <p id={helperId} className="text-sm text-gray-500 dark:text-gray-400">
                {helperText}
              </p>
            )}
            
            {hasError && errorMessage && (
              <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
          
          {showCount && maxLength && (
            <span 
              id={countId}
              className={cn(
                'text-sm ml-2',
                charCount > maxLength ? 'text-red-600' : 'text-gray-500'
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