'use client';

import { forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
        primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500',
        success: 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500',
        danger: 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500',
        info: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 focus:ring-cyan-500',
        purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-500',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
  icon?: ReactNode;
  onRemove?: () => void;
  removable?: boolean;
  removeLabel?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant,
    size,
    children,
    icon,
    onRemove,
    removable = false,
    removeLabel = 'Remove',
    ...props
  }, ref) => {
    const showRemoveButton = removable || onRemove;

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <span className="mr-1 -ml-0.5">{icon}</span>
        )}
        {children}
        {showRemoveButton && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className={cn(
              'ml-1 -mr-0.5 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-offset-0',
              size === 'sm' && 'ml-0.5',
              size === 'lg' && 'ml-1.5 p-1'
            )}
            aria-label={removeLabel}
          >
            <X className={cn(
              'h-3 w-3',
              size === 'sm' && 'h-2.5 w-2.5',
              size === 'lg' && 'h-4 w-4'
            )} />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';