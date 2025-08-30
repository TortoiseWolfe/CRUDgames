import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> January 1, 2024<br />
                <strong>Last Updated:</strong> August 30, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you fill out our intake form, 
                  schedule a consultation, or contact us.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Company information (company name, job title, company size)</li>
                  <li>Project details (project type, budget, timeline)</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Respond to your inquiries and fulfill your requests</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Communicate with you about services, offers, and events</li>
                  <li>Improve our website and services</li>
                  <li>Protect against fraud and unauthorized transactions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties. 
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>With your consent or at your direction</li>
                  <li>With service providers who assist in our operations</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to our use of your personal information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to collect information about your browsing 
                  activities. You can control cookies through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
                <p className="text-gray-600 mb-4">
                  Our services are not directed to individuals under the age of 16. We do not knowingly 
                  collect personal information from children under 16.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    Email: privacy@company.com<br />
                    Phone: 1-800-123-4567<br />
                    Address: 123 Business St, Suite 100, City, State 12345
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/terms" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    View Terms of Service
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