'use client';

import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';

interface Metric {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

interface ConversionMetricsProps {
  metrics: Metric[];
  animated?: boolean;
  layout?: 'horizontal' | 'grid';
  updateInterval?: number;
  className?: string;
}

const defaultIcons = {
  conversion: <TrendingUp className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  time: <Clock className="h-5 w-5" />,
  achievement: <Award className="h-5 w-5" />,
};

const colorClasses = {
  primary: 'bg-blue-50 text-blue-700 border-blue-200',
  secondary: 'bg-gray-50 text-gray-700 border-gray-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  error: 'bg-red-50 text-red-700 border-red-200',
};

function AnimatedNumber({ 
  value, 
  duration = 1000 
}: { 
  value: number; 
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;
    const animationDuration = duration;

    const updateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Easing function (easeOutQuad)
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      
      setDisplayValue(Math.round(currentValue));

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <>{displayValue.toLocaleString()}</>;
}

export const ConversionMetrics = forwardRef<HTMLDivElement, ConversionMetricsProps>(
  ({ 
    metrics, 
    animated = true, 
    layout = 'grid', 
    updateInterval,
    className 
  }, ref) => {
    const [currentMetrics, setCurrentMetrics] = useState(metrics);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Trigger animation when component mounts
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (!updateInterval) return;

      const interval = setInterval(() => {
        // Simulate metric updates for demo purposes
        setCurrentMetrics(prev => 
          prev.map(metric => {
            if (typeof metric.value === 'number') {
              const variance = 0.1; // 10% variance
              const min = metric.value * (1 - variance);
              const max = metric.value * (1 + variance);
              const newValue = Math.round(Math.random() * (max - min) + min);
              
              return {
                ...metric,
                value: newValue,
                trend: {
                  value: Math.round((newValue - metric.value) / metric.value * 100),
                  isPositive: newValue > metric.value
                }
              };
            }
            return metric;
          })
        );
      }, updateInterval);

      return () => clearInterval(interval);
    }, [updateInterval, metrics]);

    const layoutClasses = layout === 'horizontal' 
      ? 'flex flex-wrap gap-4 justify-center'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';

    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          layoutClasses,
          className
        )}
        role="region"
        aria-label="Conversion metrics"
      >
        {currentMetrics.map((metric, index) => {
          const isNumber = typeof metric.value === 'number';
          const colorClass = colorClasses[metric.color || 'primary'];

          return (
            <div
              key={metric.id}
              className={cn(
                'relative overflow-hidden rounded-lg border p-6 transition-all duration-300',
                colorClass,
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                layout === 'horizontal' && 'flex-1 min-w-[200px]'
              )}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {metric.icon || defaultIcons.conversion}
                    <p className="text-sm font-medium opacity-80">
                      {metric.label}
                    </p>
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    {metric.prefix && (
                      <span className="text-2xl font-bold">{metric.prefix}</span>
                    )}
                    <span className="text-3xl font-bold">
                      {animated && isNumber ? (
                        <AnimatedNumber value={metric.value as number} />
                      ) : (
                        metric.value
                      )}
                    </span>
                    {metric.suffix && (
                      <span className="text-xl font-semibold opacity-80">
                        {metric.suffix}
                      </span>
                    )}
                  </div>

                  {metric.trend && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className={cn(
                        'text-sm font-medium',
                        metric.trend.isPositive ? 'text-green-600' : 'text-red-600'
                      )}>
                        {metric.trend.isPositive ? '↑' : '↓'} {Math.abs(metric.trend.value)}%
                      </span>
                      <span className="text-xs opacity-60">vs last period</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Animated background decoration */}
              {animated && (
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `radial-gradient(circle at ${50 + index * 10}% 50%, currentColor 0%, transparent 70%)`
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

ConversionMetrics.displayName = 'ConversionMetrics';