'use client';

import { forwardRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  fallbackIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
  '2xl': 'h-24 w-24 text-2xl',
};

const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg',
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

const statusPositions = {
  'top-right': 'top-0 right-0',
  'bottom-right': 'bottom-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-left': 'bottom-0 left-0',
};

function getInitialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({
    src,
    alt,
    name,
    initials,
    size = 'md',
    shape = 'circle',
    status,
    statusPosition = 'bottom-right',
    fallbackIcon,
    onClick,
    className,
    loading = 'lazy',
    priority = false,
    ...props
  }, ref) => {
    const [imageError, setImageError] = useState(false);
    
    const displayInitials = initials || (name ? getInitialsFromName(name) : '');
    const displayAlt = alt || name || 'Avatar';
    const isClickable = !!onClick;
    
    const containerClasses = cn(
      'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 select-none',
      sizeClasses[size],
      shapeClasses[shape],
      isClickable && 'cursor-pointer hover:opacity-90 transition-opacity',
      isClickable && 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      className
    );

    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    };

    const statusDotSize = {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-3.5 w-3.5',
      '2xl': 'h-4 w-4',
    };

    return (
      <div
        ref={ref}
        className={containerClasses}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        tabIndex={isClickable ? 0 : undefined}
        role={isClickable ? 'button' : 'img'}
        aria-label={displayAlt + (status ? `, ${status}` : '')}
        {...props}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={displayAlt}
            fill
            className="object-cover"
            loading={priority ? 'eager' : loading}
            priority={priority}
            onError={() => setImageError(true)}
          />
        ) : displayInitials ? (
          <span className="font-medium text-gray-700" aria-hidden="true">
            {displayInitials}
          </span>
        ) : fallbackIcon ? (
          <span className="text-gray-500" aria-hidden="true">
            {fallbackIcon}
          </span>
        ) : (
          <User className="h-[60%] w-[60%] text-gray-500" aria-hidden="true" />
        )}
        
        {status && (
          <span
            className={cn(
              'absolute border-2 border-white',
              statusDotSize[size],
              statusColors[status],
              statusPositions[statusPosition],
              shapeClasses[shape]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';