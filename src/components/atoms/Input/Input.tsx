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
  fontStyle?: 'mono' | 'typewriter' | 'system';
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
  default: '',  // Use the default styles from className
  filled: 'bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900',
  ghost: 'bg-transparent border-transparent hover:border-gray-400 dark:hover:border-gray-600',
};

const fontStyles = {
  mono: 'font-mono',
  typewriter: 'font-typewriter',
  system: 'font-sans',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size = 'md',
      variant = 'default',
      fontStyle = 'mono',
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
              'text-sm font-medium',
              'text-gray-700 dark:text-gray-200',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative overflow-hidden">
          {/* CRT scan line effect */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-[2px] animate-[scan-line_3s_linear_infinite]" />
          </div>
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500 dark:text-cyan-400 z-20 drop-shadow-[0_0_5px_currentColor]">
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
              'w-full rounded-sm border px-3 transition-all duration-200 relative',
              'focus:outline-none focus:ring-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              // Metal surface gradient
              'bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950',
              // Text styling
              'text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              fontStyles[fontStyle],
              // Cut metal shadow effect
              'shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-1px_2px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.1)]',
              'dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.4),inset_0_-1px_3px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.05)]',
              inputSizes[size],
              inputVariants[variant],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              type === 'password' && 'pr-10',
              // Error state
              hasError && [
                'border-red-300 dark:border-red-700',
                'bg-gradient-to-b from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20',
                'text-red-900 dark:text-red-100',
              ],
              // Success state  
              success && [
                'border-green-300 dark:border-green-700',
                'bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20',
                'text-green-900 dark:text-green-100',
              ],
              // Default hover and focus
              !hasError && !success && [
                'border-gray-300 dark:border-gray-700',
                'hover:border-gray-400 dark:hover:border-gray-600',
                'focus:border-blue-500 dark:focus:border-blue-400',
                'focus:ring-blue-500/20 dark:focus:ring-blue-400/30',
                'focus:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15),inset_0_-1px_3px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.15)]',
                'dark:focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5),inset_0_-1px_4px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.08)]',
              ],
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
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-cyan-500 dark:text-cyan-400 hover:text-cyan-300 dark:hover:text-cyan-200 transition-all duration-200 drop-shadow-[0_0_8px_currentColor] hover:drop-shadow-[0_0_15px_currentColor]"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          
          {!type.includes('password') && rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-cyan-500 dark:text-cyan-400 drop-shadow-[0_0_5px_currentColor]">
              {rightIcon}
            </div>
          )}
          
          {loading && !rightIcon && !type.includes('password') && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-4 w-4 text-cyan-500 dark:text-cyan-400 animate-spin drop-shadow-[0_0_10px_currentColor]" />
          )}
          
          {success && !loading && !rightIcon && !type.includes('password') && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-4 w-4 text-green-400 drop-shadow-[0_0_15px_rgba(0,255,0,1)]" />
          )}
        </div>
        
        {helperText && !errorMessage && (
          <span id={helperId} className="text-sm text-cyan-600/70 dark:text-cyan-500/60 font-mono">
            {helperText}
          </span>
        )}
        
        {errorMessage && (
          <span id={errorId} role="alert" className="text-sm text-red-400 font-mono flex items-center gap-1 drop-shadow-[0_0_5px_currentColor]">
            <AlertCircle className="h-3 w-3 drop-shadow-[0_0_8px_currentColor]" />
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';