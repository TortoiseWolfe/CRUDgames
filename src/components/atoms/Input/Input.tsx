import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'ghost';
  fullWidth?: boolean;
  error?: boolean | string;
  success?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaDescribedby?: string; // Support both casings
  ariaInvalid?: boolean;
  loading?: boolean;
}

const inputSizes = {
  sm: 'h-10 text-base',
  md: 'h-11 text-lg',
  lg: 'h-12 text-lg',
};

const inputVariants = {
  default: 'bg-input border-border',
  filled: 'bg-card border-border',
  ghost: 'bg-transparent border-transparent hover:border-border',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size = 'md',
      variant = 'default',
      fullWidth = false,
      error = false,
      success = false,
      disabled = false,
      readOnly = false,
      required = false,
      label,
      helperText,
      leftIcon,
      rightIcon,
      id,
      name,
      ariaLabel,
      ariaDescribedBy,
      ariaDescribedby,
      ariaInvalid,
      loading = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;
    
    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : '';
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    
    const ariaDescribedByIds = [
      ariaDescribedBy || ariaDescribedby,
      helperText && helperId,
      errorMessage && errorId,
    ].filter(Boolean).join(' ');

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-base font-medium text-foreground',
              disabled && 'text-muted-foreground'
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={id}
            name={name}
            type={inputType}
            className={cn(
              'w-full rounded-md border px-3 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'placeholder:text-muted-foreground',
              'text-foreground',
              inputSizes[size],
              inputVariants[variant],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              type === 'password' && 'pr-10',
              hasError && 'border-destructive focus:ring-destructive/50',
              success && 'border-accent focus:ring-accent/50',
              !hasError && !success && 'focus:border-ring focus:ring-ring/50',
              className
            )}
            disabled={disabled || loading}
            readOnly={readOnly}
            required={required}
            aria-label={ariaLabel || label}
            aria-describedby={ariaDescribedByIds || undefined}
            aria-invalid={ariaInvalid || hasError}
            aria-required={required}
            {...props}
          />
          
          {type === 'password' && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          
          {!type.includes('password') && rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
          
          {loading && !rightIcon && !type.includes('password') && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
          )}
          
          {success && !loading && !rightIcon && !type.includes('password') && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent" />
          )}
        </div>
        
        {helperText && !errorMessage && (
          <span id={helperId} className="text-base text-muted-foreground">
            {helperText}
          </span>
        )}
        
        {errorMessage && (
          <span id={errorId} role="alert" className="text-base text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';