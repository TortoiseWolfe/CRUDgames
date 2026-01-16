'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/templates/ErrorPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service (e.g., Sentry)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <ErrorPage
      errorCode={500}
      errorTitle="Something went wrong!"
      errorMessage={error.message || 'An unexpected error occurred'}
      description="We apologize for the inconvenience. Our team has been notified."
      showDebugInfo={process.env.NODE_ENV === 'development'}
      onRetry={reset}
      suggestions={[
        { label: 'Go Home', href: '/' },
        { label: 'Try Again', href: '#' },
      ]}
      contactSupport={{
        email: 'support@crudgames.com',
        phone: '1-800-CRUDGAME',
      }}
    />
  );
}