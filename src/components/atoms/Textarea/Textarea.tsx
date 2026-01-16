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
      default: 'bg-black/80 dark:bg-black/95 backdrop-blur-md border-cyan-600/40 dark:border-cyan-400/60',
      filled: 'bg-black/90 dark:bg-black backdrop-blur-lg border-cyan-600/50 dark:border-cyan-400/70',
      ghost: 'bg-transparent border-transparent hover:border-cyan-400/60 dark:hover:border-cyan-300/80',
    };
    
    const textareaClasses = cn(
      'w-full font-mono transition-all duration-300',
      'text-cyan-400 dark:text-cyan-300 tracking-wider',
      'placeholder:text-cyan-700/50 dark:placeholder:text-cyan-600/40',
      'drop-shadow-[0_0_2px_currentColor]',
      'border-2 rounded-sm',
      'shadow-[0_0_20px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,255,255,0.08)]',
      'focus:outline-none focus:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-30',
      'read-only:bg-black/60 read-only:cursor-default',
      sizeClasses[size],
      variantClasses[variant],
      {
        'hover:border-cyan-400 dark:hover:border-cyan-300': !hasError && !success,
        'hover:shadow-[0_0_30px_rgba(0,255,255,0.4),0_0_50px_rgba(0,255,255,0.2),inset_0_0_20px_rgba(0,255,255,0.1)]': !hasError && !success,
        'hover:text-cyan-300 dark:hover:text-cyan-200': !hasError && !success,
        'focus:border-cyan-300 dark:focus:border-cyan-200': !hasError && !success,
        'focus:shadow-[0_0_40px_rgba(0,255,255,0.6),0_0_80px_rgba(0,255,255,0.3),inset_0_0_30px_rgba(0,255,255,0.15)]': !hasError && !success,
        'focus:bg-black/90 dark:focus:bg-black': !hasError && !success,
        'focus:text-cyan-200 dark:focus:text-cyan-100': !hasError && !success,
        'border-red-400 text-red-400 shadow-[0_0_30px_rgba(255,0,0,0.6),0_0_60px_rgba(255,0,0,0.3),inset_0_0_30px_rgba(255,0,0,0.2)]': hasError,
        'border-green-400 text-green-400 shadow-[0_0_30px_rgba(0,255,0,0.6),0_0_60px_rgba(0,255,0,0.3),inset_0_0_30px_rgba(0,255,0,0.2)]': success,
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
            className="block text-sm font-mono font-semibold text-gray-800 dark:text-cyan-300 dark:text-shadow-[0_0_8px_rgba(0,255,255,0.6)] mb-1"
          >
            <span className="text-cyan-400 dark:text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">{'> '}</span>
            <span className="drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">{label}</span>
            {required && <span className="text-red-400 ml-1 animate-pulse drop-shadow-[0_0_8px_rgba(255,0,0,1)]" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative overflow-hidden">
          {/* CRT scan line effect */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-[2px] animate-[scan-line_3s_linear_infinite]" />
          </div>
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
            <Loader2 className="absolute right-2 top-2 z-20 h-4 w-4 text-cyan-500 dark:text-cyan-400 animate-spin drop-shadow-[0_0_10px_currentColor]" />
          )}
        </div>
        
        <div className="mt-1 flex justify-between items-start">
          <div className="flex-1">
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
          
          {showCount && maxLength && (
            <span 
              id={countId}
              className={cn(
                'text-sm ml-2 font-mono',
                charCount > maxLength ? 'text-red-400 drop-shadow-[0_0_5px_currentColor]' : 'text-cyan-600/70 dark:text-cyan-500/60'
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