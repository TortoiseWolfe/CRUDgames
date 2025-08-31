'use client';

import { useState } from 'react';
import { IntakeForm } from '@/components/organisms/IntakeForm';
import { HeroSection } from '@/components/organisms/HeroSection';
import { FooterSection } from '@/components/organisms/FooterSection';
import { TestimonialSection } from '@/components/organisms/TestimonialSection';
import { NavigationHeader } from '@/components/organisms/NavigationHeader';
import { Modal } from '@/components/molecules/Modal';
import { Button } from '@/components/atoms/Button';
import { Users, Zap, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <NavigationHeader
        logoText="CRUDgames.com"
        links={[
          { label: 'Features', href: '#features' },
          { label: 'Portfolio', href: '#portfolio' },
          { label: 'Testimonials', href: '#testimonials' },
          { label: 'Contact', href: '#contact' },
        ]}
        ctaText="Get Started"
        ctaAction={() => setShowForm(true)}
        sticky={true}
        variant="default"
      />

      {/* Hero Section */}
      <HeroSection
        headline="Make Work Fun with CRUDgames.com"
        highlightedText="CRUDgames.com"
        subheadline="Transform boring CRUD operations into engaging, gamified experiences. Boost productivity through points, achievements, and friendly competition."
        primaryCtaText="Schedule Free Consultation"
        primaryCtaAction={() => setShowForm(true)}
        secondaryCtaText="See How It Works"
        secondaryCtaAction={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        backgroundGradient=""
        trustIndicators={[
          { value: '🎮', label: 'Gamified Forms' },
          { value: '⚡', label: 'Quick Setup' },
          { value: '🏆', label: 'Achievements' },
          { value: '📊', label: 'Analytics' },
        ]}
      />

      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Turn Tedious Tasks into Engaging Experiences
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 dark:text-white">Gamified CRUD Operations</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Turn boring database tasks into point-scoring opportunities with achievements and leaderboards.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 dark:text-white">Boost Productivity</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Employees complete 40% more tasks when work feels like play. Proven engagement mechanics.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 dark:text-white">WordPress Ready</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Easy integration with your existing WordPress site. Install, configure, and start playing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Schedule Your Free Consultation"
        description="Get a 15-minute consultation to discuss how gamification can transform your workplace. Special: Landing pages $100/year until Halloween!"
        size="xl"
        closeOnBackdrop={true}
        closeOnEscape={true}
      >
        <IntakeForm 
          onSubmitSuccess={(data) => {
            // Close modal first
            setShowForm(false);
            // Redirect to thank you page with form data
            const params = new URLSearchParams({
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              company: data.company || '',
              projectType: data.projectType,
            });
            window.location.href = `/thank-you?${params.toString()}`;
          }}
          onSubmitError={() => {
            // Error is displayed in the form UI
          }}
        />
      </Modal>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Our Work
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white">geoLARP.com</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Geolocated Live Action Role Playing - Transform your city into a game world. 
                  Track quests, find other players, and experience adventures in real locations.
                </p>
                <div className="flex gap-4">
                  <a href="https://geolarp.com" target="_blank" rel="noopener noreferrer" 
                     className="text-purple-600 hover:text-purple-700 font-medium">
                    Visit Site →
                  </a>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white">WordPress Gamification Plugin</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Our flagship WordPress plugin that adds game mechanics to any site. 
                  Points, badges, leaderboards, and achievements for user engagement.
                </p>
                <div className="text-base text-gray-500 dark:text-gray-400">
                  <em>Coming soon to WordPress.org (pending approval)</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialSection
        testimonials={[
          {
            id: '1',
            name: 'Sarah Johnson',
            role: 'Operations Manager',
            company: 'TechCorp',
            content: 'Our team actually enjoys database work now. Completion rates are up 40% since implementing CRUDgames.com!',
            rating: 5,
          },
          {
            id: '2',
            name: 'Michael Chen',
            role: 'IT Director',
            company: 'StartupHub',
            content: 'The WordPress plugin was so easy to set up. Our team loves competing for the top spot on the leaderboard!',
            rating: 5,
          },
          {
            id: '3',
            name: 'Emily Davis',
            role: 'Team Lead',
            company: 'DataFlow Inc',
            content: 'Finally, a solution that makes database work fun. My team asks for MORE data entry tasks now!',
            rating: 5,
          },
        ]}
        title="What Our Users Say"
        variant="grid"
        />
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Make Work Fun?
          </h2>
          <p className="text-2xl text-purple-100 mb-6">
            Transform your team&apos;s productivity with gamification. Landing pages $100/year until Halloween!
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={() => setShowForm(true)}
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Schedule Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <FooterSection
        companyName="CRUDgames.com"
        companyDescription="Indie startup making work more engaging through gamification. Creator of geoLARP.com and WordPress gamification plugins."
        socialLinks={[
          { platform: 'github', url: 'https://github.com/crudgames' },
          { platform: 'twitter', url: 'https://twitter.com/crudgames' },
          { platform: 'linkedin', url: 'https://linkedin.com/company/crudgames' },
          { platform: 'youtube', url: 'https://youtube.com/@crudgames' },
        ]}
        contactInfo={{
          email: 'contact@crudgames.com',
          phone: '1-800-CRUDGAME',
          address: 'Remote-First Game Studio',
        }}
        newsletterTitle="Level Up Your Inbox"
        newsletterDescription="Get game dev tips, industry insights, and exclusive beta access."
        onNewsletterSubmit={() => {
          // TODO: Implement newsletter signup
        }}
        showBackToTop={true}
      />
    </div>
  );
}