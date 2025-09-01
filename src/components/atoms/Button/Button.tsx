import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
}

const buttonVariants = {
  primary: 'border-2 font-mono',
  secondary: 'border-2 font-mono',
  danger: 'border-2 font-mono',
  ghost: 'border-2 font-mono',
  link: 'font-mono',
};

const buttonSizes = {
  sm: 'h-10 px-4 text-xs',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = 'button',
      ariaLabel,
      ariaPressed,
      ariaExpanded,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Build dynamic classes based on variant and disabled state
    const getVariantClasses = () => {
      if (isDisabled) {
        // Disabled state - gray everything out, no glows
        return 'bg-gray-300 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-600 cursor-not-allowed opacity-60';
      }
      
      // Enabled states with variant-specific colors
      switch (variant) {
        case 'primary':
          return 'bg-blue-600 dark:bg-cyan-900/50 border-blue-500 dark:border-cyan-500/60 text-white dark:text-cyan-100 shadow-lg dark:shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:border-blue-600 dark:hover:border-cyan-400 hover:bg-blue-700 dark:hover:bg-cyan-800/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] hover:scale-105 backdrop-blur-sm';
        case 'secondary':
          return 'bg-amber-600 dark:bg-amber-900/50 border-amber-500 dark:border-amber-500/60 text-white dark:text-amber-100 shadow-lg dark:shadow-[0_0_10px_rgba(255,176,0,0.3)] hover:border-amber-600 dark:hover:border-amber-400 hover:bg-amber-700 dark:hover:bg-amber-800/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] dark:hover:shadow-[0_0_25px_rgba(255,176,0,0.6)] hover:scale-105 backdrop-blur-sm';
        case 'danger':
          return 'bg-red-600 dark:bg-red-900/50 border-red-600 dark:border-red-400 text-white dark:text-red-100 hover:bg-red-700 dark:hover:bg-red-800/60 hover:border-red-700 dark:hover:border-red-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] dark:hover:shadow-[0_0_25px_rgba(255,0,64,0.8)] hover:scale-105 backdrop-blur-sm';
        case 'ghost':
          return 'bg-gray-100/50 dark:bg-cyan-950/30 border-gray-400 dark:border-cyan-500/50 text-gray-800 dark:text-cyan-200 hover:bg-gray-200 dark:hover:bg-cyan-900/40 hover:border-gray-500 dark:hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:scale-105 backdrop-blur-sm';
        case 'link':
          return 'bg-transparent text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 underline-offset-4 hover:underline';
        default:
          return '';
      }
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-bold rounded-sm transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          !isDisabled && 'active:scale-[0.95]',
          buttonVariants[variant],
          buttonSizes[size],
          getVariantClasses(),
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-expanded={ariaExpanded}
        aria-busy={loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';