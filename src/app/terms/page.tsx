import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />} className="mb-8">
              Back to Home
            </Button>
          </Link>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> January 1, 2024<br />
                <strong>Last Updated:</strong> August 30, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using this website, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not use 
                  this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Services</h2>
                <p className="text-gray-600 mb-4">
                  Our services are provided for business purposes. You agree to use our services only for 
                  lawful purposes and in accordance with these Terms.
                </p>
                <p className="text-gray-600 mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Use the services for any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>Violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>Submit false or misleading information</li>
                  <li>Upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Service Description</h2>
                <p className="text-gray-600 mb-4">
                  We provide consulting, development, and design services as described on our website. 
                  Services are subject to availability and may be modified or discontinued at any time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  The content on this website, including but not limited to text, graphics, logos, images, 
                  and software, is the property of our company and is protected by copyright and other 
                  intellectual property laws.
                </p>
                <p className="text-gray-600 mb-4">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, 
                  publicly perform, republish, download, store, or transmit any of the material on our website 
                  without prior written consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Submissions</h2>
                <p className="text-gray-600 mb-4">
                  Any information, data, text, or other material you submit to us through our forms or 
                  services (&quot;Submissions&quot;) will be treated in accordance with our Privacy Policy.
                </p>
                <p className="text-gray-600 mb-4">
                  You grant us a non-exclusive, royalty-free, perpetual, and fully sublicensable right to 
                  use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, 
                  and display such Submissions for the purpose of providing services to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimers</h2>
                <p className="text-gray-600 mb-4">
                  The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent 
                  permitted by law, we disclaim all warranties, express or implied, including but not limited 
                  to implied warranties of merchantability and fitness for a particular purpose.
                </p>
                <p className="text-gray-600 mb-4">
                  We do not warrant that the services will be uninterrupted, timely, secure, or error-free, 
                  or that defects will be corrected.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  In no event shall our company, its directors, officers, employees, or agents be liable for 
                  any indirect, incidental, special, consequential, or punitive damages, including without 
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from 
                  your use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Indemnification</h2>
                <p className="text-gray-600 mb-4">
                  You agree to defend, indemnify, and hold harmless our company and its affiliates, licensors, 
                  and service providers from and against any claims, liabilities, damages, judgments, awards, 
                  losses, costs, expenses, or fees arising out of or relating to your violation of these Terms 
                  or your use of the services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
                <p className="text-gray-600 mb-4">
                  We may terminate or suspend your access to our services immediately, without prior notice or 
                  liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be governed and construed in accordance with the laws of the United States, 
                  without regard to its conflict of law provisions. Any disputes arising from these Terms will 
                  be resolved through binding arbitration.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days notice prior to any new terms 
                  taking effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    Email: legal@company.com<br />
                    Phone: 1-800-123-4567<br />
                    Address: 123 Business St, Suite 100, City, State 12345
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-6 text-center">
                By using our services, you acknowledge that you have read and understood these Terms of Service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/privacy" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    View Privacy Policy
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="primary" className="w-full">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}