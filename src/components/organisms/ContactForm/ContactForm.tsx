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

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  variant?: 'default' | 'minimal' | 'detailed';
  showSubject?: boolean;
  className?: string;
  submitText?: string;
}

export function ContactForm({ 
  onSubmit,
  variant = 'default',
  showSubject = true,
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
        // Default behavior - log to console
        console.log('Contact form submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      }
      
      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
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
      {variant === 'detailed' && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
          <p className="text-gray-600">
            Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      )}

      <div className={cn(
        'grid gap-4',
        variant !== 'minimal' && 'md:grid-cols-2'
      )}>
        <FormField
          label="Name"
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
      </div>

      {showSubject && variant !== 'minimal' && (
        <FormField
          label="Subject"
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
          <p className="font-medium">Message sent successfully!</p>
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