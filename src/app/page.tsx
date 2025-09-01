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
    <div className="min-h-screen bg-background text-foreground">
      {/* Matrix Rain Background */}
      <div className="matrix-rain" aria-hidden="true"></div>
      
      {/* Skip to content link for screen readers */}
      <a 
        href="#main-content" 
        className="skip-to-content"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
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

      {/* Main Content */}
      <main id="main-content">
        {/* Hero and CTA Side by Side */}
        <section className="flex flex-col lg:flex-row gap-4 lg:gap-8 min-h-[600px] p-8 lg:p-16">
          {/* Left Side: Hero Section */}
          <div className="w-full lg:w-2/3 relative">
            <div className="binary-rain" aria-hidden="true"></div>
            <HeroSection
              headline="Make Work Fun with CRUDgames.com"
              highlightedText="CRUDgames.com"
              subheadline="Reality is just another database. We engineer existence through gamified CRUD operations where every query matters."
              primaryCtaText="Engineer Your Reality"
              primaryCtaAction={() => setShowForm(true)}
              secondaryCtaText="See The Matrix"
              secondaryCtaAction={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              backgroundGradient=""
              badges={['Database Philosophers', 'Code Artists', 'Reality Engineers']}
              trustIndicators={[
                { value: '∞', label: 'Uptime' },
                { value: '1337', label: 'QPS' },
                { value: '42', label: 'Answers' },
                { value: '100%', label: 'Magic' },
              ]}
              className="h-full relative z-10"
            />
            {/* CRUD Operations Showcase */}
            <div className="absolute bottom-8 left-8 right-8 flex gap-4 justify-center flex-wrap z-20">
              <div className="crud-operation crud-operation-create">
                <span>CREATE</span>
              </div>
              <div className="crud-operation crud-operation-read">
                <span>READ</span>
              </div>
              <div className="crud-operation crud-operation-update">
                <span>UPDATE</span>
              </div>
              <div className="crud-operation crud-operation-delete">
                <span>DELETE</span>
              </div>
            </div>
          </div>

          {/* Right Side: CTA Section with Halloween Special */}
          <div className="w-full lg:w-1/3 relative texture-weathered-metal">
            <div className="h-full flex flex-col justify-center items-center p-8 lg:p-12 relative z-10">
              <div className="text-center max-w-md mx-auto">
                <div className="halloween-terminal mb-6" role="region" aria-label="Special offer pricing">
                  <div className="halloween-header">
                    <span className="pumpkin-icon" aria-label="pumpkin">🎃</span>
                    HALLOWEEN SPECIAL
                    <span className="pumpkin-icon" aria-label="pumpkin">🎃</span>
                  </div>
                  <div className="text-center">
                    <div className="mb-2">
                      <span className="halloween-price">
                        Landing Pages $100/year
                      </span>
                    </div>
                    <div className="spooky-text text-lg">
                      Limited Time Offer!
                    </div>
                    <div className="mt-3 text-sm spooky-text opacity-80">
                      Normal Price: $500/year
                    </div>
                    <div className="text-xs spooky-text mt-2">
                      Expires October 31st
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg"
                  variant="secondary"
                  onClick={() => setShowForm(true)}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="crt-button w-full"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section id="features" className="relative py-12 border-y border-border texture-gritty-concrete hud-frame">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 font-orbitron text-primary dark:text-amber-glow">
              Turn Tedious Tasks<br />
              into Engaging Experiences
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-card/90 backdrop-blur-sm p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Gamified CRUD Operations</h3>
                <p className="text-lg text-muted-foreground">
                  Turn boring database tasks into point-scoring opportunities with achievements and leaderboards.
                </p>
              </div>
              <div className="text-center bg-card/90 backdrop-blur-sm p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Boost Productivity</h3>
                <p className="text-lg text-muted-foreground">
                  Employees complete 40% more tasks when work feels like play. Proven engagement mechanics.
                </p>
              </div>
              <div className="text-center bg-card/90 backdrop-blur-sm p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">WordPress Ready</h3>
                <p className="text-lg text-muted-foreground">
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
        description={(
          <div className="w-full">
            <div className="text-center mb-4">
              Get a 15-minute consultation to discuss how gamification can transform your workplace.
            </div>
            <div className="halloween-terminal">
              <div className="halloween-header">
                <span className="pumpkin-icon" aria-label="pumpkin">🎃</span>
                SPECIAL OFFER DETECTED
                <span className="pumpkin-icon" aria-label="pumpkin">🎃</span>
              </div>
              <div className="text-center">
                <span className="halloween-price">
                  Landing Pages $100/year
                </span>
                <div className="spooky-text mt-2">
                  Valid Until Halloween!
                </div>
              </div>
            </div>
          </div>
        )}
        size="xl"
        closeOnBackdrop={true}
        closeOnEscape={true}
        variant="default"
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
      <section id="portfolio" className="relative py-12 texture-weathered-metal radar-sweep">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-8 terminal-text">
              Our Work
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="hologram-panel p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">geoLARP.com</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Geolocated Live Action Role Playing - Transform your city into a game world. 
                  Track quests, find other players, and experience adventures in real locations.
                </p>
                <div className="flex gap-4">
                  <a href="https://geolarp.com" target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Visit Site →
                  </a>
                </div>
              </div>
              <div className="hologram-panel p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">WordPress Gamification Plugin</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Our flagship WordPress plugin that adds game mechanics to any site. 
                  Points, badges, leaderboards, and achievements for user engagement.
                </p>
                <div className="text-base text-muted-foreground/80">
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

      </main>

      {/* Footer */}
      <FooterSection
        companyName={(
          <div className="crud-logo text-2xl">
            <span className="crud-letter crud-letter-c">C</span>
            <span className="crud-letter crud-letter-r">R</span>
            <span className="crud-letter crud-letter-u">U</span>
            <span className="crud-letter crud-letter-d">D</span>
            <span className="text-white">games.com</span>
          </div>
        )}
        companyDescription={(
          <div>
            <p className="mb-2">Database Operations Meet Art. Code as Philosophy.</p>
            <p className="philosophy-text text-sm italic">
              &quot;SELECT * FROM reality WHERE possibilities = &apos;infinite&apos;&quot;
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="crud-operation crud-operation-create text-xs">CREATE</span>
              <span className="crud-operation crud-operation-read text-xs">READ</span>
              <span className="crud-operation crud-operation-update text-xs">UPDATE</span>
              <span className="crud-operation crud-operation-delete text-xs">DELETE</span>
            </div>
          </div>
        )}
        socialLinks={[
          { platform: 'github', url: 'https://github.com/crudgames' },
          { platform: 'twitter', url: 'https://twitter.com/crudgames' },
          { platform: 'linkedin', url: 'https://linkedin.com/company/crudgames' },
          { platform: 'youtube', url: 'https://youtube.com/@crudgames' },
        ]}
        contactInfo={{
          email: 'reality@crudgames.com',
          phone: '1-800-DATABASE',
          address: 'The Matrix, Server Room 404',
        }}
        newsletterTitle="Subscribe to The Query"
        newsletterDescription="Weekly insights from the database philosophers. Unsubscribe = DELETE FROM subscribers WHERE email = yours;"
        onNewsletterSubmit={() => {
          // TODO: Implement newsletter signup
        }}
        showBackToTop={true}
      />
    </div>
  );
}