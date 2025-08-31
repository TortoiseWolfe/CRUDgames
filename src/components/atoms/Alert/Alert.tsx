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
    container: 'bg-blue-50 text-blue-900 border-blue-200',
    icon: <Info className="h-5 w-5 text-blue-600" />,
    title: 'text-blue-900',
  },
  success: {
    container: 'bg-green-50 text-green-900 border-green-200',
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    title: 'text-green-900',
  },
  warning: {
    container: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    title: 'text-yellow-900',
  },
  error: {
    container: 'bg-red-50 text-red-900 border-red-200',
    icon: <AlertCircle className="h-5 w-5 text-red-600" />,
    title: 'text-red-900',
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
          'relative flex gap-3 rounded-md border transition-all duration-200',
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
            <h3 className={cn('font-medium mb-1', styles.title)}>
              <span className="sr-only">
                {variant === 'error' ? 'Error: ' : 
                 variant === 'warning' ? 'Warning: ' :
                 variant === 'success' ? 'Success: ' : 
                 'Information: '}
              </span>
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className={cn(
                  'mt-2 text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-1 rounded',
                  variant === 'info' && 'text-blue-700 hover:text-blue-800 focus:ring-blue-500',
                  variant === 'success' && 'text-green-700 hover:text-green-800 focus:ring-green-500',
                  variant === 'warning' && 'text-yellow-700 hover:text-yellow-800 focus:ring-yellow-500',
                  variant === 'error' && 'text-red-700 hover:text-red-800 focus:ring-red-500'
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
              'flex-shrink-0 inline-flex rounded-md p-1.5 -mr-1 -mt-1',
              'hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2',
              variant === 'info' && 'focus:ring-blue-500',
              variant === 'success' && 'focus:ring-green-500',
              variant === 'warning' && 'focus:ring-yellow-500',
              variant === 'error' && 'focus:ring-red-500'
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