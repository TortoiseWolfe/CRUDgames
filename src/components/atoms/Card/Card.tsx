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
  flat: 'bg-transparent',
  elevated: 'bg-white shadow-md',
  outlined: 'bg-transparent border border-gray-200',
  filled: 'bg-gray-50',
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
      'block',
      paddingClasses[padding],
      roundedClasses[rounded],
      
      // Variant styles
      variantClasses[variant],
      
      // Shadow override
      shadow && shadowClasses[shadow],
      
      // Interactive states
      isInteractive && 'cursor-pointer transition-all duration-200',
      hoverable && 'hover:shadow-lg hover:-translate-y-0.5',
      isInteractive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
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
        {header && (
          <div className={cn(
            'border-b border-gray-200',
            paddingClasses[padding],
            'pb-3'
          )}>
            {header}
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
            'border-t border-gray-200',
            paddingClasses[padding],
            'pt-3'
          )}>
            {footer}
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