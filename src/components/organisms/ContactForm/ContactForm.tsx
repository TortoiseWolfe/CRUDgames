'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { FormField } from '@/components/molecules/FormField';
import { HoneypotField } from '@/components/molecules/HoneypotField';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendEmail } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  title?: string;
  variant?: 'default' | 'minimal' | 'detailed';
  showSubject?: boolean;
  showPhone?: boolean;
  showCompany?: boolean;
  companyOptions?: string[];
  className?: string;
  submitText?: string;
}

export function ContactForm({ 
  onSubmit,
  title,
  variant = 'default',
  showSubject = true,
  showPhone = true,
  showCompany = false,
  companyOptions,
  className,
  submitText = 'Send Message'
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBot, setIsBot] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    if (isBot) {
      console.warn('Bot detected, blocking submission');
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior - use email service
        const emailResult = await sendEmail({
          subject: data.subject || `Contact Form Submission from ${data.name}`,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
          source: 'Contact Form'
        });

        if (!emailResult.success) {
          throw new Error(emailResult.error || 'Failed to send message');
        }
      }
      
      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      // Error is handled by the UI state
    } finally {
      setIsSubmitting(false);
    }
  };

  const formClasses = cn(
    'space-y-4',
    variant === 'minimal' && 'max-w-md',
    variant === 'detailed' && 'max-w-2xl',
    className
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={formClasses}>
      {(title || variant === 'detailed') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{title || 'Get in Touch'}</h3>
          {variant === 'detailed' && (
            <p className="text-gray-600">
              Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          )}
        </div>
      )}

      <div className={cn(
        'grid gap-4',
        variant !== 'minimal' && 'md:grid-cols-2'
      )}>
        <FormField
          label="Name"
          id="contact-name"
          error={errors.name?.message}
          required
        >
          <Input
            {...register('name')}
            id="contact-name"
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField
          label="Email"
          id="contact-email"
          error={errors.email?.message}
          required
        >
          <Input
            {...register('email')}
            id="contact-email"
            type="email"
            placeholder="your@email.com"
            disabled={isSubmitting}
          />
        </FormField>

        {showPhone && (
          <FormField
            label="Phone"
            id="contact-phone"
            error={errors.phone?.message}
          >
            <Input
              {...register('phone')}
              id="contact-phone"
              type="tel"
              placeholder="Your phone number"
              disabled={isSubmitting}
            />
          </FormField>
        )}

        {(showCompany || companyOptions) && (
          <FormField
            label="Company"
            id="contact-company"
            error={errors.company?.message}
          >
            {companyOptions ? (
              <select
                {...register('company')}
                id="contact-company"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a company</option>
                {companyOptions.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                {...register('company')}
                id="contact-company"
                placeholder="Your company"
                disabled={isSubmitting}
              />
            )}
          </FormField>
        )}
      </div>

      {showSubject && variant !== 'minimal' && (
        <FormField
          label="Subject"
          id="contact-subject"
          error={errors.subject?.message}
        >
          <Input
            {...register('subject')}
            id="contact-subject"
            placeholder="What's this about?"
            disabled={isSubmitting}
          />
        </FormField>
      )}

      <FormField
        label="Message"
        id="contact-message"
        error={errors.message?.message}
        required
      >
        <Textarea
          {...register('message')}
          id="contact-message"
          placeholder="Your message..."
          rows={variant === 'minimal' ? 4 : 6}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Honeypot field for spam prevention */}
      <HoneypotField onTrap={() => setIsBot(true)} />

      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <p className="font-medium">Thank you! Your message was successfully sent.</p>
          <p className="text-sm mt-1">We&apos;ll get back to you as soon as possible.</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || isBot}
        variant="primary"
        size={variant === 'minimal' ? 'md' : 'lg'}
        className="w-full md:w-auto"
        leftIcon={isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      >
        {isSubmitting ? 'Sending...' : submitText}
      </Button>

      {variant === 'detailed' && (
        <p className="text-xs text-gray-500 mt-4">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      )}
    </form>
  );
}