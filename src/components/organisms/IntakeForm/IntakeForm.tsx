'use client';

import { useState, useEffect } from 'react';
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
import { CalendlyScheduler } from '@/components/organisms/CalendlyScheduler';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
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
  
  projectType: z.enum(['consulting', 'development', 'design', 'landing', 'other']),
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
  { id: 'schedule', title: 'Schedule Consultation', description: 'Pick a time that works for you' },
];

export function IntakeForm({ 
  onSubmitSuccess, 
  onSubmitError
}: IntakeFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedMessages, setSavedMessages] = useState<string[]>([]);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  
  // Load saved messages on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('projectMessages');
      if (saved) {
        setSavedMessages(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);
  
  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(intakeFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formData = watch();

  // Save message to localStorage when it changes
  useEffect(() => {
    if (formData.message) {
      try {
        // Get existing messages from localStorage
        const savedMessages = JSON.parse(localStorage.getItem('projectMessages') || '[]');
        
        // Add new message if it's not already saved (avoid duplicates)
        if (!savedMessages.includes(formData.message)) {
          const updatedMessages = [formData.message, ...savedMessages].slice(0, 5); // Keep last 5
          localStorage.setItem('projectMessages', JSON.stringify(updatedMessages));
        }
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }, [formData.message]);

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
      
      // Save submitted data and move to scheduling step
      setSubmittedData(data);
      setCurrentStep(3); // Move to scheduling step
      onSubmitSuccess?.(data);
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
      onSubmitError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep + 1) / FORM_STEPS.length) * 100;

  return (
    <div className="w-full relative">
      {/* Terminal Window Frame */}
      <div className="bg-black/90 backdrop-blur-md border-2 border-cyan-400/50 rounded-lg shadow-[0_0_40px_rgba(0,255,255,0.3)] overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="bg-cyan-900/50 border-b-2 border-cyan-400/30 px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(255,0,0,0.8)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(255,176,0,0.8)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(0,255,0,0.8)]"></div>
          </div>
          <div className="text-gray-900 dark:text-cyan-300 font-mono text-xs uppercase tracking-wide">SYSTEM ACCESS // INTAKE PROTOCOL</div>
          <div className="text-cyan-500 font-mono text-xs">v2.0.1</div>
        </div>
        
        {/* Terminal Content Area */}
        <div className="relative p-4 lg:p-6 bg-white dark:bg-transparent dark:texture-holo-terminal rounded-lg">
          {/* CRT Monitor Effects */}
          <div className="grid-overlay" aria-hidden="true" role="presentation" />
          <div className="scan-beam" aria-hidden="true" role="presentation" />
          <div className="terminal-scanlines" aria-hidden="true" role="presentation" />
          
          <div className="relative z-10">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          {FORM_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="relative">
                <div className={cn(
                  'w-12 h-12 rotate-45 flex items-center justify-center text-xs font-mono font-bold transition-all duration-500',
                  index <= currentStep
                    ? 'bg-blue-100 dark:bg-cyan-900/50 border-2 border-blue-500 dark:border-cyan-400 shadow-lg dark:shadow-[0_0_20px_rgba(0,255,255,0.6)]'
                    : 'bg-gray-100 dark:bg-black/50 border-2 border-gray-300 dark:border-cyan-800/30'
                )}>
                  <div className="-rotate-45">
                    {index < currentStep ? <Check className="h-5 w-5 text-green-600 dark:text-green-400" /> : <span className="text-gray-700 dark:text-cyan-500">{index + 1}</span>}
                  </div>
                </div>
                {index <= currentStep && (
                  <div className="absolute inset-0 w-12 h-12 rotate-45 border-2 border-blue-500 dark:border-cyan-400 animate-pulse" />
                )}
              </div>
              {index < FORM_STEPS.length - 1 && (
                <div className="relative flex-1 mx-3">
                  <div className={cn(
                    'h-0.5 w-full',
                    index < currentStep ? 'bg-blue-500 dark:bg-cyan-400' : 'bg-gray-300 dark:bg-cyan-800/30'
                  )} />
                  {index < currentStep && (
                    <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 dark:via-cyan-300 to-transparent w-full animate-pulse" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mb-3">
          <h2 className="text-2xl font-mono font-semibold text-gray-900 dark:text-cyan-300">
            {FORM_STEPS[currentStep].title}
          </h2>
          <p className="text-sm font-mono text-gray-600 dark:text-cyan-600">
            {FORM_STEPS[currentStep].description}
          </p>
        </div>
        
        <div className="relative">
          <div className="text-xs font-mono text-gray-700 dark:text-cyan-500 mb-1 uppercase">{'> '}Data Upload Progress: {Math.round(progressPercentage)}%</div>
          <div className="w-full bg-gray-100 dark:bg-black/60 rounded-sm h-3 border border-gray-300 dark:border-cyan-500/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-green-400 transition-all duration-500 shadow-[0_0_20px_rgba(0,255,255,0.8)] relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {submitError && (
        <Alert variant="error" title="Submission Error" dismissible className="mb-4">
          {submitError}
        </Alert>
      )}

      {/* Show form for steps 0-2, show Calendly for step 3 */}
      {currentStep < 3 ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {currentStep === 0 && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                id="firstName"
                label="First Name"
                placeholder="John"
                required
                size="lg"
                autoComplete="given-name"
                {...register('firstName')}
                error={errors.firstName?.message}
                success={dirtyFields.firstName && !errors.firstName}
              />
              <Input
                id="lastName"
                label="Last Name"
                placeholder="Doe"
                required
                size="lg"
                autoComplete="family-name"
                {...register('lastName')}
                error={errors.lastName?.message}
                success={dirtyFields.lastName && !errors.lastName}
              />
            </div>
            
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              required
              size="lg"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
              success={dirtyFields.email && !errors.email}
            />
            
            <Input
              id="phone"
              type="tel"
              label="Phone Number"
              placeholder="(555) 123-4567"
              required
              size="lg"
              autoComplete="tel"
              {...register('phone')}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                e.target.value = formatted;
                register('phone').onChange(e);
              }}
              error={errors.phone?.message}
              success={dirtyFields.phone && !errors.phone}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                id="company"
                label="Company"
                placeholder="Acme Inc."
                size="lg"
                autoComplete="organization"
                {...register('company')}
                success={dirtyFields.company && !errors.company}
              />
              <Input
                id="jobTitle"
                label="Job Title"
                placeholder="CEO"
                size="lg"
                autoComplete="organization-title"
                {...register('jobTitle')}
                success={dirtyFields.jobTitle && !errors.jobTitle}
              />
            </div>
            
            <Select
              id="companySize"
              label="Company Size"
              placeholder="Select company size"
              size="lg"
              value={watch('companySize')}
              options={[
                { value: '1-10', label: '1-10 employees' },
                { value: '11-50', label: '11-50 employees' },
                { value: '51-200', label: '51-200 employees' },
                { value: '201-500', label: '201-500 employees' },
                { value: '500+', label: '500+ employees' },
              ]}
              onChange={(value) => setValue('companySize', value as z.infer<typeof intakeFormSchema>['companySize'], { shouldValidate: true })}
              error={errors.companySize?.message}
              success={!!watch('companySize') && !errors.companySize}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-3">
            <RadioGroup
              id="projectType"
              name="projectType"
              label="Project Type"
              required
              size="lg"
              orientation="horizontal"
              className=""
              value={watch('projectType')}
              options={[
                { value: 'consulting', label: 'Consulting' },
                { value: 'development', label: 'Development' },
                { value: 'design', label: 'Design' },
                { value: 'landing', label: '🎃 Landing Page 👻', isHalloween: true },
                { value: 'other', label: 'Other' },
              ]}
              onChange={(value) => setValue('projectType', value as z.infer<typeof intakeFormSchema>['projectType'], { shouldValidate: true })}
              error={errors.projectType?.message}
              success={!!watch('projectType') && !errors.projectType}
            />
            
            <Select
              id="budget"
              label="Budget Range"
              placeholder="Select budget"
              size="lg"
              value={watch('budget')}
              options={[
                { value: '<10k', label: 'Less than $10,000' },
                { value: '10k-50k', label: '$10,000 - $50,000' },
                { value: '50k-100k', label: '$50,000 - $100,000' },
                { value: '100k+', label: 'More than $100,000' },
              ]}
              onChange={(value) => setValue('budget', value as z.infer<typeof intakeFormSchema>['budget'], { shouldValidate: true })}
              error={errors.budget?.message}
              success={!!watch('budget') && !errors.budget}
            />
            
            <Select
              id="timeline"
              label="Timeline"
              placeholder="Select timeline"
              size="lg"
              value={watch('timeline')}
              options={[
                { value: 'asap', label: 'ASAP' },
                { value: '1-3months', label: '1-3 months' },
                { value: '3-6months', label: '3-6 months' },
                { value: '6months+', label: '6+ months' },
              ]}
              onChange={(value) => setValue('timeline', value as z.infer<typeof intakeFormSchema>['timeline'], { shouldValidate: true })}
              error={errors.timeline?.message}
              success={!!watch('timeline') && !errors.timeline}
            />
            
            <Textarea
              id="message"
              label="Project Details"
              placeholder="Tell us about your project..."
              required
              size="lg"
              minRows={4}
              maxRows={8}
              showCount
              maxLength={1000}
              {...register('message')}
              error={errors.message?.message}
              success={dirtyFields.message && !errors.message}
            />
            <datalist id="project-messages">
              {savedMessages.map((msg, idx) => (
                <option key={idx} value={msg} />
              ))}
            </datalist>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-black/80 backdrop-blur-sm p-4 rounded-sm border-2 border-gray-300 dark:border-cyan-400/50 shadow-lg dark:shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono font-semibold text-gray-900 dark:text-cyan-300 text-sm uppercase tracking-wide">{'> '}DATA VERIFICATION</h3>
                <span className="text-cyan-500 font-mono text-xs animate-pulse">█</span>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}NAME............</span>
                  <div className="flex items-center gap-2">
                    {formData.firstName || formData.lastName ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.firstName || '---'} {formData.lastName || '---'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}EMAIL...........</span>
                  <div className="flex items-center gap-2">
                    {formData.email ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.email || '---'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}PHONE...........</span>
                  <div className="flex items-center gap-2">
                    {formData.phone ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.phone || '---'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}COMPANY.........</span>
                  <div className="flex items-center gap-2">
                    {formData.company ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.company || '---'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}POSITION........</span>
                  <div className="flex items-center gap-2">
                    {formData.jobTitle ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.jobTitle || '---'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}SIZE............</span>
                  <div className="flex items-center gap-2">
                    {formData.companySize ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.companySize || '---'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}PROJECT.........</span>
                  <div className="flex items-center gap-2">
                    {formData.projectType ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.projectType || '---'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}BUDGET..........</span>
                  <div className="flex items-center gap-2">
                    {formData.budget ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.budget || '---'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-cyan-600">{'> '}TIMELINE........</span>
                  <div className="flex items-center gap-2">
                    {formData.timeline ? (
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="h-3 w-3" />
                    )}
                    <span className="text-gray-800 dark:text-green-400">{formData.timeline || '---'}</span>
                  </div>
                </div>
                {formData.message && (
                  <div className="mt-2 pt-2 border-t border-cyan-500/30">
                    <div className="flex items-start justify-between">
                      <span className="text-gray-600 dark:text-cyan-600">{'> '}PROJECT DETAILS.</span>
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400 mt-1" />
                    </div>
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-black/80 backdrop-blur-sm rounded-sm border-2 border-gray-300 dark:border-cyan-500/50 shadow-inner dark:shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]">
                      <div className="relative">
                        <div className="absolute -top-1 -left-1 text-cyan-500 text-xs font-mono opacity-50">{'<'}</div>
                        <div className="absolute -bottom-1 -right-1 text-cyan-500 text-xs font-mono opacity-50">{'>'}</div>
                        <p className="text-gray-800 dark:text-green-400 text-xs font-mono whitespace-pre-wrap break-words leading-relaxed">
                          {formData.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-3 pt-3 border-t border-cyan-500/30">
                <div className="text-xs font-mono text-cyan-500 animate-pulse">
                  {'> '}ALL DATA VERIFIED // READY FOR TRANSMISSION
                </div>
              </div>
            </div>
            
            <Checkbox
              id="termsAccepted"
              label="I accept the terms and conditions"
              description="By submitting this form, you agree to our privacy policy and terms of service."
              required
              size="lg"
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

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleStepChange('prev')}
            disabled={currentStep === 0}
            leftIcon={<ChevronLeft className="h-4 w-4" />}
          >
            Previous
          </Button>
          
          {currentStep === 2 ? (
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit & Schedule'}
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={() => handleStepChange('next')}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              Next
            </Button>
          )}
        </div>
        </form>
      ) : (
        /* Step 3: Calendly Scheduler */
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-black/80 backdrop-blur-sm p-4 rounded-sm border-2 border-gray-300 dark:border-cyan-400/50 shadow-lg dark:shadow-[0_0_30px_rgba(0,255,255,0.3)]">
            <div className="text-sm font-mono text-green-600 dark:text-green-400 mb-2">
              {'> '}FORM SUBMITTED SUCCESSFULLY
            </div>
            <p className="text-xs font-mono text-gray-600 dark:text-cyan-500">
              Now let&apos;s schedule your consultation call
            </p>
          </div>
          
          <CalendlyScheduler
            url={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-link'}
            prefillData={{
              email: submittedData?.email || '',
              firstName: submittedData?.firstName || '',
              lastName: submittedData?.lastName || '',
              phone: submittedData?.phone || '',
              company: submittedData?.company || '',
              customAnswers: submittedData?.projectType ? {
                a1: submittedData.projectType,
              } : undefined,
            }}
            height="600px"
            backgroundColor="001111"
            textColor="00ffff"
            primaryColor="00ff00"
            onScheduled={() => {
              // Redirect to thank you page after scheduling
              window.location.href = '/thank-you';
            }}
            className="shadow-[0_0_50px_rgba(0,255,255,0.3)]"
          />
          
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setCurrentStep(2)}
              leftIcon={<ChevronLeft className="h-4 w-4" />}
            >
              Back to Review
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              onClick={() => window.location.href = '/thank-you'}
            >
              Skip Scheduling
            </Button>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}