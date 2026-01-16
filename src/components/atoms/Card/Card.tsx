'use client';

import { forwardRef, createElement } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'flat' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hoverable?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section' | 'aside';
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  role?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

const paddingClasses = {
  none: '',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

const variantClasses = {
  flat: 'bg-black/20 backdrop-blur-sm',
  elevated: 'bg-gradient-to-br from-black/60 via-purple-950/20 to-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(147,51,234,0.2),inset_0_0_30px_rgba(147,51,234,0.05)] border border-purple-500/20',
  outlined: 'bg-black/40 backdrop-blur-sm border-2 border-transparent bg-clip-padding',
  filled: 'bg-gradient-to-br from-slate-900/90 via-gray-900/95 to-slate-900/90 backdrop-blur-lg',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    children,
    variant = 'elevated',
    padding = 'md',
    shadow,
    rounded = 'lg',
    hoverable = false,
    clickable = false,
    disabled = false,
    onClick,
    as: Component = 'div',
    className,
    header,
    footer,
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ...props
  }, ref) => {
    const isInteractive = clickable || onClick;
    
    const cardClasses = cn(
      // Base styles
      'block relative overflow-hidden',
      paddingClasses[padding],
      roundedClasses[rounded],
      
      // Variant styles
      variantClasses[variant],
      
      // Holographic effect base
      variant === 'elevated' && 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-purple-500/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000',
      variant === 'outlined' && 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500',
      
      // Shadow override
      shadow && shadowClasses[shadow],
      
      // Interactive states
      isInteractive && 'cursor-pointer transition-all duration-300',
      hoverable && 'hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:-translate-y-0.5',
      isInteractive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      isInteractive && 'active:scale-[0.99]',
      className
    );

    const handleClick = () => {
      if (onClick && !disabled) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleClick();
      }
    };

    const cardContent = (
      <>
        {/* Holographic grid overlay */}
        {variant === 'elevated' && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(147,51,234,0.05)_25%,rgba(147,51,234,0.05)_26%,transparent_27%,transparent_74%,rgba(147,51,234,0.05)_75%,rgba(147,51,234,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(147,51,234,0.05)_25%,rgba(147,51,234,0.05)_26%,transparent_27%,transparent_74%,rgba(147,51,234,0.05)_75%,rgba(147,51,234,0.05)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
          </div>
        )}
        {header && (
          <div className={cn(
            'border-b border-purple-500/30',
            paddingClasses[padding],
            'pb-3 relative'
          )}>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
            <div className="font-mono text-purple-300 uppercase tracking-wider text-sm">
              {header}
            </div>
          </div>
        )}
        
        <div className={cn(
          header || footer ? paddingClasses[padding] : '',
          header && 'pt-3'
        )}>
          {children}
        </div>
        
        {footer && (
          <div className={cn(
            'border-t border-purple-500/30',
            paddingClasses[padding],
            'pt-3 relative'
          )}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
            <div className="font-mono text-purple-300/80 text-sm">
              {footer}
            </div>
          </div>
        )}
      </>
    );

    return createElement(
      Component,
      {
        ref,
        className: cardClasses,
        onClick: isInteractive ? handleClick : undefined,
        onKeyDown: isInteractive ? handleKeyDown : undefined,
        tabIndex: isInteractive ? 0 : undefined,
        role: role || (isInteractive ? 'button' : undefined),
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        ...props,
      },
      cardContent
    );
  }
);

Card.displayName = 'Card';