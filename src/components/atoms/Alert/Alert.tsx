import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { X, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
  icon?: React.ReactNode | boolean;
  compact?: boolean;
  fullWidth?: boolean;
  role?: 'alert' | 'status';
  ariaLive?: 'polite' | 'assertive' | 'off';
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const alertVariants = {
  info: {
    container: 'bg-black/80 dark:bg-black/95 text-cyan-400 dark:text-cyan-300 border-cyan-600/60 dark:border-cyan-400/70 shadow-[0_0_30px_rgba(0,255,255,0.4),inset_0_0_20px_rgba(0,255,255,0.1)]',
    icon: <Info className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_10px_currentColor]" />,
    title: 'text-cyan-300 drop-shadow-[0_0_8px_currentColor]',
  },
  success: {
    container: 'bg-black/80 dark:bg-black/95 text-green-400 dark:text-green-300 border-green-600/60 dark:border-green-400/70 shadow-[0_0_30px_rgba(0,255,0,0.4),inset_0_0_20px_rgba(0,255,0,0.1)]',
    icon: <CheckCircle2 className="h-5 w-5 text-green-400 drop-shadow-[0_0_10px_currentColor]" />,
    title: 'text-green-300 drop-shadow-[0_0_8px_currentColor]',
  },
  warning: {
    container: 'bg-black/80 dark:bg-black/95 text-amber-400 dark:text-amber-300 border-amber-600/60 dark:border-amber-400/70 shadow-[0_0_30px_rgba(255,176,0,0.4),inset_0_0_20px_rgba(255,176,0,0.1)]',
    icon: <AlertTriangle className="h-5 w-5 text-amber-400 drop-shadow-[0_0_10px_currentColor]" />,
    title: 'text-amber-300 drop-shadow-[0_0_8px_currentColor]',
  },
  error: {
    container: 'bg-black/80 dark:bg-black/95 text-red-400 dark:text-red-300 border-red-600/60 dark:border-red-400/70 shadow-[0_0_30px_rgba(255,0,0,0.4),inset_0_0_20px_rgba(255,0,0,0.1)]',
    icon: <AlertCircle className="h-5 w-5 text-red-400 drop-shadow-[0_0_10px_currentColor]" />,
    title: 'text-red-300 drop-shadow-[0_0_8px_currentColor]',
  },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant,
      title,
      children,
      dismissible = false,
      onDismiss,
      autoHide = false,
      autoHideDelay = 5000,
      icon = true,
      compact = false,
      fullWidth = false,
      role = 'alert',
      ariaLive = variant === 'error' ? 'assertive' : 'polite',
      action,
      className,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const styles = alertVariants[variant];

    useEffect(() => {
      if (autoHide && isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onDismiss?.();
        }, autoHideDelay);

        return () => clearTimeout(timer);
      }
    }, [autoHide, autoHideDelay, isVisible, onDismiss]);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    const iconElement = icon === true ? styles.icon : icon === false ? null : icon;

    return (
      <div
        ref={ref}
        role={role}
        aria-live={ariaLive}
        aria-atomic="true"
        className={cn(
          'relative flex gap-3 rounded-sm border-2 transition-all duration-300 backdrop-blur-md font-mono tracking-wider',
          compact ? 'p-3' : 'p-4',
          fullWidth ? 'w-full' : 'max-w-md',
          styles.container,
          className
        )}
      >
        {iconElement && (
          <div className="flex-shrink-0" aria-hidden="true">
            {iconElement}
          </div>
        )}

        <div className="flex-1">
          {title && (
            <h3 className={cn('font-bold mb-1 text-sm uppercase tracking-widest', styles.title)}>
              <span className="sr-only">
                {variant === 'error' ? 'Error: ' : 
                 variant === 'warning' ? 'Warning: ' :
                 variant === 'success' ? 'Success: ' : 
                 'Information: '}
              </span>
              {title}
            </h3>
          )}
          <div className="text-sm drop-shadow-[0_0_3px_currentColor]">
            {children}
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className={cn(
                  'mt-2 text-sm font-bold underline hover:no-underline focus:outline-none transition-all duration-200',
                  variant === 'info' && 'text-cyan-300 hover:text-cyan-200 hover:drop-shadow-[0_0_10px_currentColor]',
                  variant === 'success' && 'text-green-300 hover:text-green-200 hover:drop-shadow-[0_0_10px_currentColor]',
                  variant === 'warning' && 'text-amber-300 hover:text-amber-200 hover:drop-shadow-[0_0_10px_currentColor]',
                  variant === 'error' && 'text-red-300 hover:text-red-200 hover:drop-shadow-[0_0_10px_currentColor]'
                )}
              >
                {action.label}
              </button>
            )}
          </div>
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              'flex-shrink-0 inline-flex rounded-sm p-1.5 -mr-1 -mt-1 transition-all duration-200',
              'hover:bg-white/10 focus:outline-none',
              'hover:drop-shadow-[0_0_10px_currentColor]'
            )}
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';