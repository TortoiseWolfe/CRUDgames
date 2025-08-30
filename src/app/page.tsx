'use client';

import { useState } from 'react';
import { IntakeForm } from '@/components/organisms/IntakeForm';
import { Button } from '@/components/atoms/Button';
import { ArrowRight, Users, Zap, Shield, Star } from 'lucide-react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Business with 
              <span className="text-blue-600"> Expert Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized consulting, development, and design services tailored to your unique needs. 
              Start your journey with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setShowForm(true)}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Get Started Now
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">5⭐</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Our Services?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Get your project completed on time with our agile development process.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="text-gray-600">
                  Work with seasoned professionals who understand your business needs.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Your data and projects are protected with enterprise-grade security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      {showForm && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Let&apos;s Get Started
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we&apos;ll get back to you within 24 hours
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <IntakeForm 
                  onSubmitSuccess={(data) => {
                    console.log('Form submitted successfully:', data);
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
                  onSubmitError={(error) => {
                    console.error('Form submission error:', error);
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  &quot;Exceptional service! They delivered our project on time and exceeded our expectations.&quot;
                </p>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-gray-500">CEO, TechStart</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  &quot;Professional team with deep expertise. Highly recommend for any development project.&quot;
                </p>
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm text-gray-500">CTO, InnovateCo</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  &quot;Great communication throughout the project. They truly understand client needs.&quot;
                </p>
                <div className="font-semibold">Emily Davis</div>
                <div className="text-sm text-gray-500">Product Manager, ScaleUp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of satisfied clients who have accelerated their growth with us.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={() => setShowForm(true)}
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Start Your Project Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Services</a></li>
                  <li><a href="#" className="hover:text-white">Portfolio</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                  <li><a href="#" className="hover:text-white">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li>contact@example.com</li>
                  <li>1-800-123-4567</li>
                  <li>123 Business St, Suite 100</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}