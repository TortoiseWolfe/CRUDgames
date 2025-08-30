'use client';

import { forwardRef, useEffect, useState } from 'react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/atoms/Spinner';
import { Alert } from '@/components/atoms/Alert';
import { Button } from '@/components/atoms/Button';
import { Mail, Phone, RefreshCw } from 'lucide-react';

type CalendlyEvent = unknown;

export interface CalendlySchedulerProps {
  url: string;
  
  prefillData?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    phone?: string;
    company?: string;
    customAnswers?: Record<string, string>;
  };
  
  height?: number | string;
  hideEventTypeDetails?: boolean;
  hideLandingPageDetails?: boolean;
  hideGdprBanner?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  
  autoLoad?: boolean;
  iframeTitle?: string;
  
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
  
  onScheduled?: (event: CalendlyEvent) => void;
  onEventTypeViewed?: () => void;
  onProfilePageViewed?: () => void;
  onDateAndTimeSelected?: () => void;
  onLoadError?: (error: Error) => void;
  
  trackingEnabled?: boolean;
  gaTrackingId?: string;
  
  className?: string;
}

export const CalendlyScheduler = forwardRef<HTMLDivElement, CalendlySchedulerProps>(
  ({
    url,
    prefillData,
    height = '700px',
    hideEventTypeDetails = false,
    hideLandingPageDetails = false,
    hideGdprBanner = false,
    backgroundColor = 'ffffff',
    textColor = '4d5055',
    primaryColor = '00a2ff',
    // autoLoad = true, // Reserved for future use
    iframeTitle = 'Schedule an appointment',
    utm,
    onScheduled,
    onEventTypeViewed,
    onProfilePageViewed,
    onDateAndTimeSelected,
    // onLoadError, // Reserved for future use
    trackingEnabled = true,
    className,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const trackEvent = (eventName: string, eventData?: Record<string, string | number | boolean | undefined>) => {
      if (!trackingEnabled) return;

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventData);
      }
      
      console.log(`[Analytics] ${eventName}`, eventData);
    };

    useCalendlyEventListener({
      onEventScheduled: (e: unknown) => {
        console.log('Event scheduled:', e);
        trackEvent('calendly_appointment_scheduled', {});
        onScheduled?.(e);
        setIsLoading(false);
      },
      onEventTypeViewed: () => {
        trackEvent('calendly_event_type_viewed', { url });
        onEventTypeViewed?.();
        setIsLoading(false);
      },
      onDateAndTimeSelected: () => {
        trackEvent('calendly_date_selected', { url });
        onDateAndTimeSelected?.();
      },
      onProfilePageViewed: () => {
        trackEvent('calendly_profile_viewed', { url });
        onProfilePageViewed?.();
        setIsLoading(false);
      },
    });

    useEffect(() => {
      const loadTimer = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
        }
      }, 3000);

      return () => clearTimeout(loadTimer);
    }, [isLoading]);

    const handleRetry = () => {
      setHasError(false);
      setErrorMessage('');
      setIsLoading(true);
    };

    // handleError function is currently not used but kept for future implementation
    // const handleError = (error: Error) => {
    //   console.error('Calendly loading error:', error);
    //   setHasError(true);
    //   setErrorMessage(error.message || 'Unable to load the scheduler');
    //   setIsLoading(false);
    //   onLoadError?.(error);
    //   
    //   trackEvent('calendly_load_error', {
    //     error_message: error.message,
    //     url,
    //   });
    // };

    if (hasError) {
      return (
        <div className={cn('calendly-error-container p-8', className)} ref={ref}>
          <Alert variant="error" className="mb-6">
            <div className="font-semibold mb-2">Unable to Load Scheduler</div>
            <div className="text-sm">{errorMessage || 'Please try again or contact us directly.'}</div>
          </Alert>
          
          <div className="space-y-4">
            <p className="text-gray-600 text-center">
              We apologize for the inconvenience. Please try one of these options:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                leftIcon={<RefreshCw className="h-4 w-4" />}
                onClick={handleRetry}
              >
                Try Again
              </Button>
              
              <Button
                variant="secondary"
                leftIcon={<Mail className="h-4 w-4" />}
                onClick={() => window.location.href = 'mailto:contact@company.com?subject=Meeting Request'}
              >
                Email Us
              </Button>
              
              <Button
                variant="secondary"
                leftIcon={<Phone className="h-4 w-4" />}
                onClick={() => window.location.href = 'tel:+1234567890'}
              >
                Call Us
              </Button>
            </div>
          </div>
        </div>
      );
    }

    const responsiveHeight = typeof window !== 'undefined' 
      ? window.innerWidth < 640 ? '600px' 
      : window.innerWidth < 768 ? '650px' 
      : height
      : height;

    return (
      <div 
        ref={ref}
        className={cn(
          'calendly-wrapper relative',
          'rounded-lg overflow-hidden',
          'shadow-lg border border-gray-200',
          className
        )}
        role="region"
        aria-label="Schedule an appointment"
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
            <div className="text-center">
              <Spinner size="lg" className="mb-4" />
              <p className="text-gray-600">Loading scheduler...</p>
            </div>
          </div>
        )}
        
        <div className="calendly-inline-widget-container">
          <InlineWidget
            url={url}
            styles={{
              height: responsiveHeight,
              width: '100%',
              minWidth: '320px',
            }}
            pageSettings={{
              backgroundColor,
              hideEventTypeDetails,
              hideLandingPageDetails,
              hideGdprBanner,
              primaryColor,
              textColor,
            }}
            prefill={prefillData}
            utm={utm}
            iframeTitle={iframeTitle}
          />
        </div>
      </div>
    );
  }
);

CalendlyScheduler.displayName = 'CalendlyScheduler';