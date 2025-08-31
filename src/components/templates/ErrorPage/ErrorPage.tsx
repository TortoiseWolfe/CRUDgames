'use client';

import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/atoms/Alert';
import { Home, ArrowLeft, Mail, RefreshCw, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export interface ErrorPageProps {
  errorCode: number;
  errorMessage?: string;
  errorTitle?: string;
  description?: string;
  suggestions?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
  contactSupport?: {
    email?: string;
    phone?: string;
    showContactForm?: boolean;
  };
  showSearch?: boolean;
  showDebugInfo?: boolean;
  onRetry?: () => void;
  className?: string;
}

const defaultErrorMessages = {
  404: {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
    description: 'It might have been moved or deleted.',
  },
  500: {
    title: 'Internal Server Error',
    message: 'Something went wrong on our end.',
    description: 'Please try again later or contact support if the problem persists.',
  },
  503: {
    title: 'Service Unavailable',
    message: 'Our service is temporarily unavailable.',
    description: 'We are working to restore service as quickly as possible.',
  },
  401: {
    title: 'Unauthorized',
    message: 'You need to be logged in to access this page.',
    description: 'Please log in and try again.',
  },
  403: {
    title: 'Forbidden',
    message: 'You do not have permission to access this page.',
    description: 'Please contact your administrator if you believe this is an error.',
  },
};

export function ErrorPage({
  errorCode,
  errorMessage,
  errorTitle,
  description,
  suggestions,
  contactSupport,
  showSearch = false,
  showDebugInfo = false,
  onRetry,
  className,
}: ErrorPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const defaultError = defaultErrorMessages[errorCode as keyof typeof defaultErrorMessages] || 
    defaultErrorMessages[500];
  
  const title = errorTitle || defaultError.title;
  const message = errorMessage || defaultError.message;
  const desc = description || defaultError.description;
  
  const defaultSuggestions = [
    { label: 'Go Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { label: 'Go Back', href: '#', icon: <ArrowLeft className="h-4 w-4" /> },
  ];
  
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      // Redirect to search results page:
      // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${className || ''}`}>
      <div className="max-w-2xl w-full">
        {/* Error Code Display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-50 mb-6">
            <span className="text-6xl font-bold text-red-500">
              {errorCode}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <p className="text-xl text-gray-700 mb-2">
            {message}
          </p>
          
          {desc && (
            <p className="text-gray-600">
              {desc}
            </p>
          )}
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search our site..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" variant="primary">
                Search
              </Button>
            </form>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {(suggestions || defaultSuggestions).map((suggestion, index) => (
            suggestion.href === '#' ? (
              <Button
                key={index}
                variant="secondary"
                leftIcon={suggestion.icon}
                onClick={handleGoBack}
              >
                {suggestion.label}
              </Button>
            ) : (
              <Link key={index} href={suggestion.href}>
                <Button
                  variant={index === 0 ? 'primary' : 'secondary'}
                  leftIcon={suggestion.icon}
                >
                  {suggestion.label}
                </Button>
              </Link>
            )
          ))}
          
          {onRetry && (
            <Button
              variant="secondary"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={onRetry}
            >
              Try Again
            </Button>
          )}
        </div>
        
        {/* Contact Support */}
        {contactSupport && (
          <div className="border-t pt-8">
            <Alert
              variant="info"
              title="Need Help?"
              icon={<Mail className="h-5 w-5" />}
            >
              <div className="mt-2">
                <p className="mb-2">
                  If you continue to experience issues, please contact our support team:
                </p>
                <div className="flex flex-col gap-1">
                  {contactSupport.email && (
                    <a
                      href={`mailto:${contactSupport.email}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {contactSupport.email}
                    </a>
                  )}
                  {contactSupport.phone && (
                    <a
                      href={`tel:${contactSupport.phone}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {contactSupport.phone}
                    </a>
                  )}
                </div>
              </div>
            </Alert>
          </div>
        )}
        
        {/* Error Details for Development */}
        {showDebugInfo && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Debug Information</h3>
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify({ errorCode, errorTitle, errorMessage }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}