import { ErrorPage } from '@/components/templates/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      errorCode={404}
      showDebugInfo={process.env.NODE_ENV === 'development'}
      suggestions={[
        { label: 'Go Home', href: '/' },
        { label: 'Contact Support', href: 'mailto:support@crudgames.com' },
      ]}
      contactSupport={{
        email: 'support@crudgames.com',
      }}
      showSearch={true}
    />
  );
}