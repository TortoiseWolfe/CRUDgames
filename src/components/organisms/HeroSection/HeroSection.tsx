'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { ArrowRight, ChevronDown, Play, Star, Users, Zap, Shield } from 'lucide-react';

export interface HeroSectionProps {
  headline: string;
  highlightedText?: string;
  subheadline?: string;
  primaryCtaText: string;
  primaryCtaAction: () => void;
  secondaryCtaText?: string;
  secondaryCtaAction?: () => void;
  backgroundImage?: string;
  backgroundGradient?: string;
  videoUrl?: string;
  showVideoButton?: boolean;
  trustIndicators?: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  badges?: string[];
  variant?: 'default' | 'centered' | 'split' | 'minimal';
  className?: string;
}

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      headline,
      highlightedText,
      subheadline,
      primaryCtaText,
      primaryCtaAction,
      secondaryCtaText,
      secondaryCtaAction,
      backgroundImage,
      backgroundGradient = 'from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-950',
      videoUrl,
      showVideoButton,
      trustIndicators,
      badges,
      variant = 'default',
      className,
    },
    ref
  ) => {
    const handleVideoClick = () => {
      if (videoUrl) {
        window.open(videoUrl, '_blank');
      }
    };

    const defaultTrustIndicators = trustIndicators || [
      { value: '500+', label: 'Happy Clients', icon: <Users className="h-4 w-4" /> },
      { value: '98%', label: 'Success Rate', icon: <Star className="h-4 w-4" /> },
      { value: '24/7', label: 'Support', icon: <Zap className="h-4 w-4" /> },
      { value: '5⭐', label: 'Average Rating', icon: <Shield className="h-4 w-4" /> },
    ];

    const renderHeadline = () => {
      if (!highlightedText) {
        return headline;
      }

      const parts = headline.split(highlightedText);
      if (parts.length === 1) {
        return headline;
      }

      return (
        <>
          {parts[0]}
          <span className="text-blue-600">{highlightedText}</span>
          {parts.slice(1).join(highlightedText)}
        </>
      );
    };

    const contentClasses = {
      default: 'text-center',
      centered: 'text-center max-w-4xl mx-auto',
      split: 'text-left lg:text-center',
      minimal: 'text-center max-w-2xl mx-auto',
    };

    const headlineClasses = {
      default: 'text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6',
      centered: 'text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8',
      split: 'text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6',
      minimal: 'text-4xl lg:text-6xl font-semibold text-gray-900 dark:text-white mb-4',
    };

    const subheadlineClasses = {
      default: 'text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto',
      centered: 'text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto',
      split: 'text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl lg:mx-auto',
      minimal: 'text-xl text-gray-600 dark:text-gray-300 mb-5',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          !backgroundImage && !backgroundGradient && 'bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-950',
          !backgroundImage && backgroundGradient && `bg-gradient-to-br ${backgroundGradient}`,
          className
        )}
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {/* Background overlay for images */}
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        )}

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Badges */}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="primary" size="md">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Main Content */}
            <div className={contentClasses[variant]}>
              <h1 className={headlineClasses[variant]}>
                {renderHeadline()}
              </h1>
              
              {subheadline && (
                <p className={cn(
                  subheadlineClasses[variant],
                  backgroundImage && 'text-white'
                )}>
                  {subheadline}
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg"
                  onClick={primaryCtaAction}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  {primaryCtaText}
                </Button>
                
                {secondaryCtaText && secondaryCtaAction && (
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={secondaryCtaAction}
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    {secondaryCtaText}
                  </Button>
                )}

                {showVideoButton && videoUrl && (
                  <Button
                    size="lg"
                    variant="secondary"
                    leftIcon={<Play className="h-5 w-5" />}
                    onClick={handleVideoClick}
                    className="bg-white/90 backdrop-blur"
                  >
                    Watch Demo
                  </Button>
                )}
              </div>

              {/* Scroll indicator */}
              {variant !== 'minimal' && (
                <div className="flex justify-center mb-8 animate-bounce">
                  <ChevronDown className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            {variant !== 'minimal' && defaultTrustIndicators.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {defaultTrustIndicators.map((indicator, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      'text-center p-4 rounded-lg transition-transform hover:scale-105',
                      backgroundImage 
                        ? 'bg-white/10 backdrop-blur text-white' 
                        : 'bg-white/50 backdrop-blur'
                    )}
                  >
                    {indicator.icon && (
                      <div className="flex justify-center mb-2">
                        {indicator.icon}
                      </div>
                    )}
                    <div className={cn(
                      'text-3xl font-bold',
                      backgroundImage ? 'text-white' : 'text-gray-900'
                    )}>
                      {indicator.value}
                    </div>
                    <div className={cn(
                      'text-sm',
                      backgroundImage ? 'text-white/80' : 'text-gray-600'
                    )}>
                      {indicator.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Additional decorative elements */}
            {variant === 'centered' && (
              <>
                <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl" />
                <div className="absolute top-40 right-20 w-16 h-16 bg-green-400/20 rounded-full blur-xl" />
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';