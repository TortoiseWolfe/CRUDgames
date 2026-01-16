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
        // Disabled state - muted metal appearance
        return 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60';
      }
      
      // Balanced light/dark themes with subtle effects
      switch (variant) {
        case 'primary':
          // Metallic blue with raised effect
          return cn(
            'relative overflow-hidden',
            'bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900',
            'border border-t-blue-400 border-b-blue-800 dark:border-t-gray-600 dark:border-b-black',
            'text-white dark:text-cyan-300',
            'shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
            'hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-800',
            'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] dark:active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]',
            'transition-all duration-200'
          );
        case 'secondary':
          // Brushed aluminum
          return cn(
            'relative overflow-hidden',
            'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-400 dark:from-gray-700 dark:via-gray-600 dark:to-gray-800',
            'border border-t-white border-b-gray-500 dark:border-t-gray-500 dark:border-b-gray-900',
            'text-gray-800 dark:text-gray-200',
            'shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]',
            'hover:from-gray-200 hover:via-gray-100 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:via-gray-500 dark:hover:to-gray-700',
            'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]',
            'transition-all duration-200'
          );
        case 'danger':
          // Metallic red with warning feel
          return cn(
            'relative overflow-hidden',
            'bg-gradient-to-b from-red-500 via-red-600 to-red-700 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900',
            'border border-t-red-400 border-b-red-800 dark:border-t-gray-600 dark:border-b-black',
            'text-white dark:text-red-300',
            'shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
            'hover:from-red-400 hover:via-red-500 hover:to-red-600 dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-800',
            'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] dark:active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]',
            'transition-all duration-200'
          );
        case 'ghost':
          // Etched metal
          return cn(
            'relative',
            'bg-transparent dark:bg-transparent',
            'border border-gray-400 dark:border-gray-600',
            'text-gray-700 dark:text-gray-300',
            'shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'hover:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]',
            'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] dark:active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.4)]',
            'transition-all duration-200'
          );
        case 'link':
          // Simple text link
          return 'bg-transparent text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline-offset-4 hover:underline transition-all duration-200';
        default:
          return '';
      }
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium font-mono tracking-wide transition-all duration-200 overflow-hidden',
          variant !== 'link' && 'border',
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900',
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
        <span className="relative z-10 flex items-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {!loading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {children}
          {!loading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';