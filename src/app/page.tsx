'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Alert } from '@/components/atoms/Alert';
import { ArrowRight, Mail, Lock } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Next.js Funnel Template
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            High-converting landing pages with intake forms and Calendly integration
          </p>

          {/* Button Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Button Components</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button loading>Loading...</Button>
                <Button disabled>Disabled</Button>
                <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
                  With Icon
                </Button>
              </div>
            </div>
          </section>

          {/* Alert Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Alert Components</h2>
            <div className="space-y-3">
              <Alert variant="info" title="Information">
                This is an informational alert message.
              </Alert>
              <Alert variant="success" title="Success!" dismissible>
                Your form has been submitted successfully.
              </Alert>
              <Alert variant="warning" title="Warning" dismissible>
                Please review your information before submitting.
              </Alert>
              <Alert variant="error" title="Error" dismissible>
                There was a problem processing your request.
              </Alert>
              {showSuccess && (
                <Alert variant="success" autoHide autoHideDelay={5000}>
                  Form submitted! This alert will auto-hide in 5 seconds.
                </Alert>
              )}
            </div>
          </section>

          {/* Input Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Input Components</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                helperText="We'll never share your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                leftIcon={<Lock className="h-4 w-4" />}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="(555) 123-4567"
                helperText="Optional"
              />
              
              <Input
                id="error-example"
                name="error"
                type="text"
                label="Error State Example"
                error="This field has an error"
                defaultValue="Invalid input"
              />
              
              <Input
                id="success-example"
                name="success"
                type="text"
                label="Success State Example"
                success
                defaultValue="Valid input"
              />
              
              <Button 
                type="submit" 
                fullWidth 
                loading={loading}
                size="lg"
              >
                Submit Form
              </Button>
            </form>
          </section>

          {/* Status */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Components Built</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Button Component
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Input Component
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Alert Component
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">○</span> IntakeForm Component (pending)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">○</span> Landing Page Template (pending)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}