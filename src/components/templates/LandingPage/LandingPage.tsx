'use client';

import { NavigationHeader } from '@/components/organisms/NavigationHeader';
import { HeroSection } from '@/components/organisms/HeroSection';
import { TrustBadges } from '@/components/organisms/TrustBadges';
import { ConversionMetrics } from '@/components/organisms/ConversionMetrics';
import { TestimonialSection } from '@/components/organisms/TestimonialSection';
import { FooterSection } from '@/components/organisms/FooterSection';
import { IntakeForm } from '@/components/organisms/IntakeForm';
import { Modal } from '@/components/molecules/Modal';
import { useState } from 'react';

export interface LandingPageProps {
  // Navigation
  navigation?: {
    logo?: React.ReactNode;
    links?: Array<{ label: string; href: string; }>;
    ctaText?: string;
  };
  
  // Hero Section
  hero: {
    headline: string;
    highlightedText?: string;
    subheadline?: string;
    primaryCtaText?: string;
    secondaryCtaText?: string;
    backgroundGradient?: string;
    trustIndicators?: Array<{ value: string; label: string; }>;
  };
  
  // Trust Badges
  trustBadges?: {
    badges: Array<{
      id: string;
      title: string;
      icon?: React.ReactNode;
      description?: string;
      value?: string | number;
      highlight?: boolean;
    }>;
  };
  
  // Conversion Metrics
  metrics?: Array<{
    id: string;
    label: string;
    value: number | string;
    suffix?: string;
    prefix?: string;
    icon?: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  }>;
  
  // Testimonials
  testimonials?: Array<{
    id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    rating?: number;
    image?: string;
    featured?: boolean;
  }>;
  
  // Footer
  footer: {
    companyName: string;
    companyDescription?: string;
    socialLinks?: Array<{ 
      platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'github';
      url: string; 
    }>;
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
    };
    newsletterTitle?: string;
    newsletterDescription?: string;
  };
  
  // Form Configuration
  form?: {
    showAsModal?: boolean;
    modalTitle?: string;
    modalDescription?: string;
    onSubmitSuccess?: (data: Record<string, unknown>) => void;
    onSubmitError?: (error: unknown) => void;
  };
  
  // SEO & Analytics
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  
  // Additional sections can be passed as children
  children?: React.ReactNode;
}

export function LandingPage({
  navigation,
  hero,
  trustBadges,
  metrics,
  testimonials,
  footer,
  form,
  children,
}: LandingPageProps) {
  const [showFormModal, setShowFormModal] = useState(false);
  
  const handleHeroCta = () => {
    if (form?.showAsModal) {
      setShowFormModal(true);
    } else {
      // Scroll to form or navigate
      const formSection = document.getElementById('intake-form');
      formSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleFormSuccess = (data: Record<string, unknown>) => {
    setShowFormModal(false);
    if (form?.onSubmitSuccess) {
      form.onSubmitSuccess(data);
    } else {
      // Default behavior - redirect to thank you page
      const params = new URLSearchParams({
        email: data.email as string,
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        ...(data.phone ? { phone: data.phone as string } : {}),
        ...(data.company ? { company: data.company as string } : {}),
        ...(data.projectType ? { projectType: data.projectType as string } : {}),
      });
      window.location.href = `/thank-you?${params.toString()}`;
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      {navigation && (
        <NavigationHeader
          logo={navigation.logo}
          links={navigation.links || []}
          ctaText={navigation.ctaText}
          ctaAction={() => handleHeroCta()}
        />
      )}
      
      {/* Hero Section */}
      <HeroSection
        headline={hero.headline}
        highlightedText={hero.highlightedText}
        subheadline={hero.subheadline}
        primaryCtaText={hero.primaryCtaText || 'Get Started'}
        secondaryCtaText={hero.secondaryCtaText}
        backgroundGradient={hero.backgroundGradient}
        trustIndicators={hero.trustIndicators}
        primaryCtaAction={handleHeroCta}
        secondaryCtaAction={() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      {/* Trust Badges */}
      {trustBadges && trustBadges.badges.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <TrustBadges
              badges={trustBadges.badges}
              variant="grid"
            />
          </div>
        </section>
      )}
      
      {/* Conversion Metrics */}
      {metrics && metrics.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Impact in Numbers
            </h2>
            <ConversionMetrics
              metrics={metrics}
              animated={true}
              layout="grid"
            />
          </div>
        </section>
      )}
      
      {/* Custom Content Sections */}
      {children && (
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {children}
          </div>
        </section>
      )}
      
      {/* Inline Form (if not modal) */}
      {form && !form.showAsModal && (
        <section id="intake-form" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Get Started Today
              </h2>
              <IntakeForm
                onSubmitSuccess={handleFormSuccess}
                onSubmitError={form.onSubmitError}
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <TestimonialSection
          testimonials={testimonials}
          title="What Our Clients Say"
          variant="grid"
        />
      )}
      
      {/* Footer */}
      <FooterSection
        {...footer}
        onNewsletterSubmit={() => {
          // TODO: Implement newsletter signup
        }}
        showBackToTop={true}
      />
      
      {/* Form Modal */}
      {form?.showAsModal && (
        <Modal
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          title={form.modalTitle || 'Get Started'}
          description={form.modalDescription}
          size="xl"
          closeOnBackdrop={true}
          closeOnEscape={true}
        >
          <IntakeForm
            onSubmitSuccess={handleFormSuccess}
            onSubmitError={form.onSubmitError}
          />
        </Modal>
      )}
    </div>
  );
}