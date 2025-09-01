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
  autoComplete?: string;
}

const inputSizes = {
  sm: 'h-11 text-base',
  md: 'h-12 text-lg',
  lg: 'h-14 text-lg',
};

const inputVariants = {
  default: 'bg-white dark:bg-black/40 backdrop-blur-sm border-gray-300 dark:border-cyan-500/50',
  filled: 'bg-gray-50 dark:bg-black/60 backdrop-blur-md border-gray-400 dark:border-cyan-500/60',
  ghost: 'bg-transparent border-transparent hover:border-gray-300 dark:hover:border-cyan-500/50',
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
      autoComplete,
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
              'text-sm font-mono font-semibold text-gray-700 dark:text-cyan-300',
              disabled && 'opacity-50'
            )}
          >
            {'> '}{label}
            {required && <span className="text-red-500 dark:text-red-400 ml-1 animate-pulse">*</span>}
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
            autoComplete={autoComplete}
            className={cn(
              'w-full rounded-sm border-2 px-3 transition-all duration-300',
              'focus:outline-none focus:ring-0',
              'disabled:cursor-not-allowed disabled:opacity-30',
              'placeholder:text-gray-400 dark:placeholder:text-cyan-800/60',
              'text-gray-900 dark:text-cyan-100 font-mono',
              inputSizes[size],
              inputVariants[variant],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              type === 'password' && 'pr-10',
              hasError && 'border-red-500 dark:border-red-500 shadow-[0_0_10px_rgba(255,0,64,0.5)]',
              success && 'border-green-500 dark:border-green-400 shadow-[0_0_10px_rgba(57,255,20,0.5)]',
              !hasError && !success && 'hover:border-gray-400 dark:hover:border-cyan-500/70 focus:border-blue-500 dark:focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:focus:shadow-[0_0_15px_rgba(0,255,255,0.6)]',
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-cyan-300"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          
          {!type.includes('password') && rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {rightIcon}
            </div>
          )}
          
          {loading && !rightIcon && !type.includes('password') && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400 animate-spin" />
          )}
          
          {success && !loading && !rightIcon && !type.includes('password') && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 dark:text-green-400" />
          )}
        </div>
        
        {helperText && !errorMessage && (
          <span id={helperId} className="text-base text-gray-600 dark:text-gray-400">
            {helperText}
          </span>
        )}
        
        {errorMessage && (
          <span id={errorId} role="alert" className="text-base text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';