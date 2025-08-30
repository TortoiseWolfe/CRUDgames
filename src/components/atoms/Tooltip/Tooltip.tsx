'use client';

import { forwardRef, useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  disabled?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({
    children,
    content,
    position = 'top',
    trigger = 'hover',
    delay = 200,
    className,
    contentClassName,
    arrow = true,
    disabled = false,
  }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [actualPosition, setActualPosition] = useState(position);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => {
      if (disabled) return;
      
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(true);
        }, delay);
      } else {
        setIsVisible(true);
      }
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const toggleTooltip = () => {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    };

    useEffect(() => {
      if (isVisible && tooltipRef.current && triggerRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newPosition = position;

        // Check if tooltip would overflow viewport and adjust position
        if (position === 'top' && triggerRect.top - tooltipRect.height < 0) {
          newPosition = 'bottom';
        } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewportHeight) {
          newPosition = 'top';
        } else if (position === 'left' && triggerRect.left - tooltipRect.width < 0) {
          newPosition = 'right';
        } else if (position === 'right' && triggerRect.right + tooltipRect.width > viewportWidth) {
          newPosition = 'left';
        }

        if (newPosition !== actualPosition) {
          setActualPosition(newPosition);
        }
      }
    }, [isVisible, position, actualPosition]);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const getPositionClasses = () => {
      switch (actualPosition) {
        case 'top':
          return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
        case 'bottom':
          return 'top-full left-1/2 -translate-x-1/2 mt-2';
        case 'left':
          return 'right-full top-1/2 -translate-y-1/2 mr-2';
        case 'right':
          return 'left-full top-1/2 -translate-y-1/2 ml-2';
        default:
          return '';
      }
    };

    const getArrowClasses = () => {
      switch (actualPosition) {
        case 'top':
          return 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-gray-900';
        case 'bottom':
          return 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-gray-900';
        case 'left':
          return 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-gray-900';
        case 'right':
          return 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-gray-900';
        default:
          return '';
      }
    };

    const triggerProps = {
      ...(trigger === 'hover' && {
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
      }),
      ...(trigger === 'click' && {
        onClick: toggleTooltip,
      }),
      ...(trigger === 'focus' && {
        onFocus: showTooltip,
        onBlur: hideTooltip,
      }),
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (trigger === 'click' && isVisible) {
          if (
            triggerRef.current &&
            !triggerRef.current.contains(event.target as Node) &&
            tooltipRef.current &&
            !tooltipRef.current.contains(event.target as Node)
          ) {
            hideTooltip();
          }
        }
      };

      if (trigger === 'click' && isVisible) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [trigger, isVisible]);

    if (!content || disabled) {
      return <>{children}</>;
    }

    return (
      <div ref={ref} className={cn('relative inline-block', className)}>
        <div ref={triggerRef} {...triggerProps}>
          {children}
        </div>
        
        {isVisible && (
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap',
              'animate-in fade-in-0 zoom-in-95 duration-100',
              getPositionClasses(),
              contentClassName
            )}
          >
            {content}
            {arrow && (
              <div
                className={cn(
                  'absolute w-0 h-0 border-4 border-transparent',
                  getArrowClasses()
                )}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';