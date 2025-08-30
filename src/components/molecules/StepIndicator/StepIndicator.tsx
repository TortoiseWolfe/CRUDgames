'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  showConnectors?: boolean;
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({
    steps,
    currentStep,
    variant = 'horizontal',
    size = 'md',
    showLabels = true,
    showConnectors = true,
    clickable = false,
    onStepClick,
    className,
  }, ref) => {
    const sizeClasses = {
      sm: {
        circle: 'w-8 h-8',
        icon: 'w-4 h-4',
        text: 'text-xs',
        connector: variant === 'horizontal' ? 'h-0.5' : 'w-0.5',
      },
      md: {
        circle: 'w-10 h-10',
        icon: 'w-5 h-5',
        text: 'text-sm',
        connector: variant === 'horizontal' ? 'h-0.5' : 'w-0.5',
      },
      lg: {
        circle: 'w-12 h-12',
        icon: 'w-6 h-6',
        text: 'text-base',
        connector: variant === 'horizontal' ? 'h-1' : 'w-1',
      },
    };

    const sizes = sizeClasses[size];

    const getStepStatus = (index: number) => {
      if (index < currentStep) return 'completed';
      if (index === currentStep) return 'current';
      return 'upcoming';
    };

    const handleStepClick = (index: number) => {
      if (clickable && onStepClick) {
        onStepClick(index);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'step-indicator',
          variant === 'horizontal' ? 'flex items-center' : 'flex flex-col',
          className
        )}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className={cn(
                'step-item',
                variant === 'horizontal' ? 'flex items-center' : 'flex',
                !isLast && variant === 'horizontal' && 'flex-1'
              )}
            >
              <div
                className={cn(
                  'step-content',
                  variant === 'horizontal' ? 'flex flex-col items-center' : 'flex items-center',
                  clickable && 'cursor-pointer'
                )}
                onClick={() => handleStepClick(index)}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (clickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleStepClick(index);
                  }
                }}
              >
                <div
                  className={cn(
                    'step-circle rounded-full flex items-center justify-center transition-all duration-200',
                    sizes.circle,
                    status === 'completed' && 'bg-green-600 text-white',
                    status === 'current' && 'bg-blue-600 text-white ring-4 ring-blue-100',
                    status === 'upcoming' && 'bg-gray-200 text-gray-500',
                    clickable && status !== 'current' && 'hover:scale-110'
                  )}
                >
                  {status === 'completed' ? (
                    <Check className={sizes.icon} />
                  ) : step.icon ? (
                    <span className={sizes.icon}>{step.icon}</span>
                  ) : (
                    <span className={cn('font-semibold', sizes.text)}>
                      {index + 1}
                    </span>
                  )}
                </div>

                {showLabels && (
                  <div
                    className={cn(
                      'step-label',
                      variant === 'horizontal' ? 'mt-2 text-center' : 'ml-3',
                      sizes.text
                    )}
                  >
                    <div
                      className={cn(
                        'font-medium',
                        status === 'completed' && 'text-green-700',
                        status === 'current' && 'text-blue-700',
                        status === 'upcoming' && 'text-gray-500'
                      )}
                    >
                      {step.title}
                    </div>
                    {step.description && (
                      <div className="text-gray-500 text-xs mt-0.5">
                        {step.description}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!isLast && showConnectors && (
                <div
                  className={cn(
                    'step-connector transition-all duration-200',
                    variant === 'horizontal' 
                      ? cn('flex-1 mx-2', sizes.connector)
                      : cn('ml-5 my-2 h-8', sizes.connector),
                    status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

StepIndicator.displayName = 'StepIndicator';