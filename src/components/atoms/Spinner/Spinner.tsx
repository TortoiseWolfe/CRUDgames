'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white' | 'radar' | 'oscilloscope' | 'matrix' | 'gear';
  thickness?: 'thin' | 'normal' | 'thick';
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  fullscreen?: boolean;
  className?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({
    size = 'md',
    variant = 'primary',
    thickness = 'normal',
    speed = 'normal',
    label = 'Loading',
    labelPosition = 'bottom',
    fullscreen = false,
    className,
  }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    };

    const thicknessClasses = {
      thin: 'border-2',
      normal: 'border-3',
      thick: 'border-4',
    };

    const speedClasses = {
      slow: 'animate-spin-slow',
      normal: 'animate-spin',
      fast: 'animate-spin-fast',
    };

    // Different tech-era loading animations
    const getVariantContent = () => {
      switch (variant) {
        case 'radar':
          // Radar sweep effect
          return (
            <div className={cn('relative', sizeClasses[size])}>
              <div className="absolute inset-0 rounded-full border-2 border-green-500/30 shadow-[0_0_20px_rgba(0,255,0,0.4)]" />
              <div className="absolute inset-2 rounded-full border border-green-500/20" />
              <div className="absolute inset-4 rounded-full border border-green-500/10" />
              <div className={cn(
                'absolute inset-0 rounded-full',
                'bg-gradient-to-t from-transparent to-green-500/40',
                'animate-spin origin-center',
                speedClasses[speed]
              )} style={{ clipPath: 'polygon(50% 50%, 50% 0, 60% 0, 50% 50%)' }} />
            </div>
          );
        
        case 'oscilloscope':
          // Oscilloscope wave
          return (
            <div className={cn('relative flex items-center', sizeClasses[size])}>
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-transparent animate-pulse" />
              </div>
            </div>
          );
        
        case 'matrix':
          // Matrix digital rain
          return (
            <div className={cn('relative overflow-hidden', sizeClasses[size])}>
              <div className="absolute inset-0 flex justify-around">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-px bg-gradient-to-b from-transparent via-green-400 to-transparent h-full animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          );
        
        case 'gear':
          // Mechanical gear
          return (
            <div className={cn('relative', sizeClasses[size])}>
              <svg className={cn('animate-spin', speedClasses[speed])} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L13.09 5.26L16.51 3.87L16.06 7.52L19.89 7.47L18.14 10.58L21.5 12L18.14 13.42L19.89 16.53L16.06 16.48L16.51 20.13L13.09 18.74L12 22L10.91 18.74L7.49 20.13L7.94 16.48L4.11 16.53L5.86 13.42L2.5 12L5.86 10.58L4.11 7.47L7.94 7.52L7.49 3.87L10.91 5.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-500"
                />
              </svg>
            </div>
          );
        
        default:
          // Classic spinner
          return (
            <div className="relative">
              <div className={cn(
                'rounded-full',
                sizeClasses[size],
                thicknessClasses[thickness],
                speedClasses[speed],
                variant === 'primary' ? 'border-cyan-900/30 border-t-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.6),inset_0_0_20px_rgba(0,255,255,0.3)]' :
                variant === 'secondary' ? 'border-gray-900/30 border-t-gray-400 shadow-[0_0_30px_rgba(128,128,128,0.6),inset_0_0_20px_rgba(128,128,128,0.3)]' :
                'border-gray-900/30 border-t-white shadow-[0_0_30px_rgba(255,255,255,0.6),inset_0_0_20px_rgba(255,255,255,0.3)]',
                'drop-shadow-[0_0_10px_currentColor]'
              )} />
              {/* Inner glow effect */}
              <div className={cn(
                'absolute inset-0 rounded-full animate-pulse',
                variant === 'primary' ? 'bg-cyan-400/20' : 
                variant === 'white' ? 'bg-white/20' : 
                'bg-gray-400/20'
              )} />
            </div>
          );
      }
    };

    // Label color based on variant
    const getLabelColor = () => {
      switch (variant) {
        case 'radar':
        case 'oscilloscope':
        case 'matrix':
          return 'text-green-400 drop-shadow-[0_0_8px_currentColor]';
        case 'gear':
          return 'text-gray-400 drop-shadow-[0_0_8px_currentColor]';
        case 'primary':
          return 'text-cyan-400 drop-shadow-[0_0_8px_currentColor]';
        case 'white':
          return 'text-white drop-shadow-[0_0_8px_currentColor]';
        default:
          return 'text-gray-400 drop-shadow-[0_0_8px_currentColor]';
      }
    };

    const containerClasses = cn(
      'inline-flex items-center justify-center',
      {
        'flex-col': labelPosition === 'bottom',
        'flex-col-reverse': labelPosition === 'top',
        'flex-row': labelPosition === 'right',
        'flex-row-reverse': labelPosition === 'left',
      },
      className
    );

    const labelClasses = cn(
      'text-sm font-mono uppercase tracking-wider',
      getLabelColor(),
      {
        'mt-2': labelPosition === 'bottom',
        'mb-2': labelPosition === 'top',
        'ml-2': labelPosition === 'right',
        'mr-2': labelPosition === 'left',
      }
    );

    const spinner = (
      <div 
        ref={!fullscreen ? ref : undefined}
        role="status" 
        aria-label={label}
        className={containerClasses}
      >
        {getVariantContent()}
        {label && labelPosition !== 'bottom' && labelPosition !== 'top' && labelPosition !== 'left' && labelPosition !== 'right' ? (
          <span className="sr-only">{label}</span>
        ) : label ? (
          <span className={labelClasses}>{label}</span>
        ) : null}
      </div>
    );

    if (fullscreen) {
      return (
        <div 
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
          {spinner}
        </div>
      );
    }

    return spinner;
  }
);

Spinner.displayName = 'Spinner';