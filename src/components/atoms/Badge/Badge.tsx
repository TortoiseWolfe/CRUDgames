'use client';

import { forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm font-mono font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none backdrop-blur-md',
  {
    variants: {
      variant: {
        default: 'bg-black/80 text-cyan-400 border border-cyan-600/60 shadow-[0_0_20px_rgba(0,255,255,0.4),inset_0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:text-cyan-300',
        primary: 'bg-black/80 text-blue-400 border border-blue-600/60 shadow-[0_0_20px_rgba(0,100,255,0.4),inset_0_0_10px_rgba(0,100,255,0.1)] hover:shadow-[0_0_30px_rgba(0,100,255,0.6)] hover:text-blue-300',
        success: 'bg-black/80 text-green-400 border border-green-600/60 shadow-[0_0_20px_rgba(0,255,0,0.4),inset_0_0_10px_rgba(0,255,0,0.1)] hover:shadow-[0_0_30px_rgba(0,255,0,0.6)] hover:text-green-300',
        warning: 'bg-black/80 text-amber-400 border border-amber-600/60 shadow-[0_0_20px_rgba(255,176,0,0.4),inset_0_0_10px_rgba(255,176,0,0.1)] hover:shadow-[0_0_30px_rgba(255,176,0,0.6)] hover:text-amber-300',
        danger: 'bg-black/80 text-red-400 border border-red-600/60 shadow-[0_0_20px_rgba(255,0,0,0.4),inset_0_0_10px_rgba(255,0,0,0.1)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] hover:text-red-300',
        info: 'bg-black/80 text-cyan-400 border border-cyan-600/60 shadow-[0_0_20px_rgba(0,255,255,0.4),inset_0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:text-cyan-300',
        purple: 'bg-black/80 text-purple-400 border border-purple-600/60 shadow-[0_0_20px_rgba(128,0,255,0.4),inset_0_0_10px_rgba(128,0,255,0.1)] hover:shadow-[0_0_30px_rgba(128,0,255,0.6)] hover:text-purple-300',
        outline: 'bg-transparent border-2 border-cyan-600/60 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-cyan-900/30 hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]',
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
  as?: React.ElementType;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant,
    size,
    children,
    as: Component = 'span',
    icon,
    onRemove,
    removable = false,
    removeLabel = 'Remove',
    ...props
  }, ref) => {
    const showRemoveButton = removable || onRemove;

    return (
      <Component
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <span className="mr-1 -ml-0.5 drop-shadow-[0_0_5px_currentColor]">{icon}</span>
        )}
        <span className="drop-shadow-[0_0_3px_currentColor]">{children}</span>
        {showRemoveButton && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className={cn(
              'ml-1 -mr-0.5 rounded-full p-0.5 hover:bg-white/20 focus:outline-none transition-all duration-200 hover:drop-shadow-[0_0_8px_currentColor]',
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
      </Component>
    );
  }
);

Badge.displayName = 'Badge';