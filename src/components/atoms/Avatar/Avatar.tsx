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
  online: 'bg-green-500 shadow-[0_0_10px_rgba(0,255,0,0.8)] animate-pulse',
  offline: 'bg-gray-600',
  away: 'bg-amber-500 shadow-[0_0_8px_rgba(255,176,0,0.6)]',
  busy: 'bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.8)] animate-pulse',
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
      'relative inline-flex items-center justify-center overflow-hidden select-none',
      'bg-black border-2 border-green-900/50',
      'shadow-[inset_0_0_20px_rgba(0,255,0,0.1)]',
      sizeClasses[size],
      shapeClasses[shape],
      isClickable && 'cursor-pointer hover:border-green-500/50 transition-all duration-300',
      isClickable && 'hover:shadow-[inset_0_0_30px_rgba(0,255,0,0.2),0_0_20px_rgba(0,255,0,0.3)]',
      isClickable && 'focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-black',
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
        {/* Surveillance camera scan lines */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-[2px] animate-[scan-line_4s_linear_infinite]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)]" />
        </div>
        
        {/* Night vision filter */}
        <div className="absolute inset-0 bg-green-500/5 mix-blend-screen pointer-events-none z-10" />
        
        {src && !imageError ? (
          <Image
            src={src}
            alt={displayAlt}
            fill
            className="object-cover saturate-50 contrast-125 brightness-90"
            loading={priority ? 'eager' : loading}
            priority={priority}
            onError={() => setImageError(true)}
          />
        ) : displayInitials ? (
          <span className="font-mono font-bold text-green-400 drop-shadow-[0_0_4px_rgba(0,255,0,0.8)]" aria-hidden="true">
            {displayInitials}
          </span>
        ) : fallbackIcon ? (
          <span className="text-green-400 drop-shadow-[0_0_4px_rgba(0,255,0,0.8)]" aria-hidden="true">
            {fallbackIcon}
          </span>
        ) : (
          <User className="h-[60%] w-[60%] text-green-400 drop-shadow-[0_0_4px_rgba(0,255,0,0.8)]" aria-hidden="true" />
        )}
        
        {status && (
          <>
            {/* Recording indicator for online status */}
            {status === 'online' && (
              <div className="absolute top-2 right-2 flex items-center gap-1 z-30">
                <span className="text-red-500 text-xs font-mono uppercase tracking-wider drop-shadow-[0_0_4px_rgba(255,0,0,0.8)]">REC</span>
                <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(255,0,0,1)] animate-pulse" />
              </div>
            )}
            <span
              className={cn(
                'absolute border-2 border-black z-30',
                statusDotSize[size],
                statusColors[status],
                statusPositions[statusPosition],
                shapeClasses[shape]
              )}
              aria-label={`Status: ${status}`}
            />
          </>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';