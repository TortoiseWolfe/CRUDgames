'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
import { RadioGroup } from '@/components/atoms/Radio';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Alert } from '@/components/atoms/Alert';
import { ChevronLeft, ChevronRight, Check, Calendar } from 'lucide-react';
import { sendEmail } from '@/lib/email';

export const intakeFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  
  projectType: z.enum(['consulting', 'development', 'design', 'other']),
  budget: z.enum(['<10k', '10k-50k', '50k-100k', '100k+']).optional(),
  timeline: z.enum(['asap', '1-3months', '3-6months', '6months+']).optional(),
  
  message: z.string()
    .min(10, 'Please provide at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof intakeFormSchema>;

export interface IntakeFormProps {
  onSubmitSuccess?: (data: FormData) => void;
  onSubmitError?: (error: Error) => void;
  emailServiceConfig?: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
}

const FORM_STEPS = [
  { id: 'personal', title: 'Personal Information', description: 'Tell us about yourself' },
  { id: 'project', title: 'Project Details', description: 'Share your project requirements' },
  { id: 'review', title: 'Review & Submit', description: 'Review your information' },
];

export function IntakeForm({ 
  onSubmitSuccess, 
  onSubmitError
}: IntakeFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(intakeFormSchema),
    mode: 'onBlur',
  });

  const formData = watch();

  const handleStepChange = async (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      let fieldsToValidate: (keyof FormData)[] = [];
      
      if (currentStep === 0) {
        fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
      } else if (currentStep === 1) {
        fieldsToValidate = ['projectType', 'message'];
      }
      
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }
    
    if (direction === 'next' && currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      if (data.website && data.website.length > 0) {
        throw new Error('Bot detected');
      }
      
      // Use the unified email service
      const emailResult = await sendEmail({
        subject: `New Intake Form Submission from ${data.firstName} ${data.lastName}`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        company: data.company,
        projectType: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message || 'No additional message provided',
        source: 'Intake Form',
        timestamp: new Date().toISOString()
      });

      if (!emailResult.success) {
        throw new Error(emailResult.error || 'Failed to send form');
      }
      
      setSubmitSuccess(true);
      onSubmitSuccess?.(data);
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
      onSubmitError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep + 1) / FORM_STEPS.length) * 100;

  if (submitSuccess) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your submission. We&apos;ll be in touch within 24 hours.
        </p>
        <Button
          onClick={() => window.location.href = '#schedule'}
          rightIcon={<Calendar className="h-4 w-4" />}
        >
          Schedule a Call
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {FORM_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              )}>
                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              {index < FORM_STEPS.length - 1 && (
                <div className={cn(
                  'w-full h-1 mx-2',
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                )} />
              )}
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {FORM_STEPS[currentStep].title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {FORM_STEPS[currentStep].description}
          </p>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {submitError && (
        <Alert variant="error" title="Submission Error" dismissible className="mb-6">
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="firstName"
                label="First Name"
                placeholder="John"
                required
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                id="lastName"
                label="Last Name"
                placeholder="Doe"
                required
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
            
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              required
              {...register('email')}
              error={errors.email?.message}
            />
            
            <Input
              id="phone"
              type="tel"
              label="Phone Number"
              placeholder="(555) 123-4567"
              required
              {...register('phone')}
              error={errors.phone?.message}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="company"
                label="Company"
                placeholder="Acme Inc."
                {...register('company')}
              />
              <Input
                id="jobTitle"
                label="Job Title"
                placeholder="CEO"
                {...register('jobTitle')}
              />
            </div>
            
            <Select
              id="companySize"
              label="Company Size"
              placeholder="Select company size"
              options={[
                { value: '1-10', label: '1-10 employees' },
                { value: '11-50', label: '11-50 employees' },
                { value: '51-200', label: '51-200 employees' },
                { value: '201-500', label: '201-500 employees' },
                { value: '500+', label: '500+ employees' },
              ]}
              onChange={(value) => setValue('companySize', value as z.infer<typeof intakeFormSchema>['companySize'])}
              error={errors.companySize?.message}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <RadioGroup
              id="projectType"
              name="projectType"
              label="Project Type"
              required
              options={[
                { value: 'consulting', label: 'Consulting', description: 'Strategic guidance and expertise' },
                { value: 'development', label: 'Development', description: 'Custom software solutions' },
                { value: 'design', label: 'Design', description: 'UI/UX and visual design' },
                { value: 'other', label: 'Other', description: 'Something else' },
              ]}
              onChange={(value) => setValue('projectType', value as z.infer<typeof intakeFormSchema>['projectType'])}
              error={errors.projectType?.message}
            />
            
            <Select
              id="budget"
              label="Budget Range"
              placeholder="Select budget"
              options={[
                { value: '<10k', label: 'Less than $10,000' },
                { value: '10k-50k', label: '$10,000 - $50,000' },
                { value: '50k-100k', label: '$50,000 - $100,000' },
                { value: '100k+', label: 'More than $100,000' },
              ]}
              onChange={(value) => setValue('budget', value as z.infer<typeof intakeFormSchema>['budget'])}
              error={errors.budget?.message}
            />
            
            <Select
              id="timeline"
              label="Timeline"
              placeholder="Select timeline"
              options={[
                { value: 'asap', label: 'ASAP' },
                { value: '1-3months', label: '1-3 months' },
                { value: '3-6months', label: '3-6 months' },
                { value: '6months+', label: '6+ months' },
              ]}
              onChange={(value) => setValue('timeline', value as z.infer<typeof intakeFormSchema>['timeline'])}
              error={errors.timeline?.message}
            />
            
            <Textarea
              id="message"
              label="Project Details"
              placeholder="Tell us about your project..."
              required
              minRows={4}
              maxRows={8}
              showCount
              maxLength={1000}
              {...register('message')}
              error={errors.message?.message}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Review Your Information</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600 dark:text-gray-400">Name</span>
                  <span className="font-medium dark:text-gray-200">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium dark:text-gray-200">{formData.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium dark:text-gray-200">{formData.phone}</span>
                </div>
                {formData.company && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Company</span>
                    <span className="font-medium dark:text-gray-200">{formData.company}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Project Type</span>
                  <span className="font-medium capitalize dark:text-gray-200">{formData.projectType}</span>
                </div>
                {formData.budget && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium dark:text-gray-200">{formData.budget}</span>
                  </div>
                )}
                {formData.timeline && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Timeline</span>
                    <span className="font-medium dark:text-gray-200">{formData.timeline}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Checkbox
              id="termsAccepted"
              label="I accept the terms and conditions"
              description="By submitting this form, you agree to our privacy policy and terms of service."
              required
              {...register('termsAccepted')}
              error={errors.termsAccepted?.message}
            />
            
            <input
              type="text"
              {...register('website')}
              tabIndex={-1}
              autoComplete="off"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px'
              }}
              aria-hidden="true"
            />
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleStepChange('prev')}
            disabled={currentStep === 0}
            leftIcon={<ChevronLeft className="h-4 w-4" />}
          >
            Previous
          </Button>
          
          {currentStep < FORM_STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={() => handleStepChange('next')}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}