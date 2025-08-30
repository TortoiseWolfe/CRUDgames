'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Shield, Lock, Award, CheckCircle, Users, TrendingUp, Star, Zap } from 'lucide-react';

export interface TrustBadge {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  value?: string | number;
  highlight?: boolean;
}

export interface TrustBadgesProps {
  badges: TrustBadge[];
  variant?: 'horizontal' | 'grid' | 'compact' | 'detailed';
  showDescriptions?: boolean;
  className?: string;
}

const defaultIcons = {
  security: <Shield className="h-6 w-6" />,
  privacy: <Lock className="h-6 w-6" />,
  certified: <Award className="h-6 w-6" />,
  verified: <CheckCircle className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  growth: <TrendingUp className="h-6 w-6" />,
  rating: <Star className="h-6 w-6" />,
  fast: <Zap className="h-6 w-6" />,
};

export const TrustBadges = forwardRef<HTMLDivElement, TrustBadgesProps>(
  ({ badges, variant = 'horizontal', showDescriptions = true, className }, ref) => {
    
    const containerClasses = {
      horizontal: 'flex flex-wrap justify-center gap-6',
      grid: 'grid grid-cols-2 md:grid-cols-4 gap-4',
      compact: 'flex flex-wrap justify-center gap-4',
      detailed: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
    };

    const renderBadge = (badge: TrustBadge) => {
      if (variant === 'compact') {
        return (
          <div
            key={badge.id}
            className={cn(
              "flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm",
              badge.highlight && "ring-2 ring-purple-500 ring-offset-2"
            )}
          >
            <div className="text-purple-600">
              {badge.icon || defaultIcons.verified}
            </div>
            <span className="font-medium text-gray-900">{badge.title}</span>
            {badge.value && (
              <span className="text-purple-600 font-bold">{badge.value}</span>
            )}
          </div>
        );
      }

      if (variant === 'detailed') {
        return (
          <div
            key={badge.id}
            className={cn(
              "bg-white p-6 rounded-lg shadow-md",
              badge.highlight && "ring-2 ring-purple-500"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg text-purple-600">
                {badge.icon || defaultIcons.verified}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {badge.title}
                </h3>
                {badge.value && (
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {badge.value}
                  </div>
                )}
                {showDescriptions && badge.description && (
                  <p className="text-sm text-gray-600">
                    {badge.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      }

      // Default horizontal and grid variants
      return (
        <div
          key={badge.id}
          className={cn(
            "flex flex-col items-center text-center",
            variant === 'grid' && "p-4 bg-white rounded-lg shadow-sm",
            badge.highlight && "transform scale-110"
          )}
        >
          <div className={cn(
            "p-3 rounded-full mb-2",
            badge.highlight ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-600"
          )}>
            {badge.icon || defaultIcons.verified}
          </div>
          <div className="font-medium text-gray-900">
            {badge.title}
          </div>
          {badge.value && (
            <div className="text-lg font-bold text-purple-600 mt-1">
              {badge.value}
            </div>
          )}
          {showDescriptions && badge.description && variant === 'grid' && (
            <p className="text-xs text-gray-600 mt-2">
              {badge.description}
            </p>
          )}
        </div>
      );
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <div className={containerClasses[variant]}>
          {badges.map(renderBadge)}
        </div>
      </div>
    );
  }
);

TrustBadges.displayName = 'TrustBadges';