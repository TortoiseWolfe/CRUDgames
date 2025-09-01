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
  primary: 'bg-primary text-primary-foreground hover:bg-primary/80 focus:ring-primary/50 transition-colors',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50 transition-colors',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 focus:ring-destructive/50 transition-colors',
  ghost: 'bg-transparent hover:bg-muted/50 text-foreground focus:ring-muted transition-colors',
  link: 'bg-transparent underline-offset-4 hover:underline text-primary hover:text-primary/80 focus:ring-primary/50 transition-colors',
};

const buttonSizes = {
  sm: 'h-9 px-3 text-base',
  md: 'h-11 px-4 text-lg',
  lg: 'h-12 px-6 text-lg',
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

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'active:scale-[0.98]',
          buttonVariants[variant],
          buttonSizes[size],
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