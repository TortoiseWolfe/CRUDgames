'use client';

import { forwardRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';
import { z } from 'zod';

export interface Step {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode | ((props: {
    data: Record<string, unknown>;
    updateData: (data: Record<string, unknown>) => void;
    errors?: string;
  }) => React.ReactNode);
  validation?: z.ZodSchema;
  isOptional?: boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete: (data: StepData) => void;
  onCancel?: () => void;
  allowSkip?: boolean;
  showProgressBar?: boolean;
  persistData?: boolean;
  className?: string;
}

interface StepData {
  [stepId: string]: Record<string, unknown>;
}

export const MultiStepForm = forwardRef<HTMLDivElement, MultiStepFormProps>(
  ({ 
    steps, 
    currentStep: controlledStep,
    onStepChange,
    onComplete,
    onCancel,
    allowSkip = false,
    showProgressBar = true,
    persistData = true,
    className 
  }, ref) => {
    const [internalStep, setInternalStep] = useState(0);
    const [stepData, setStepData] = useState<StepData>({});
    const [stepErrors, setStepErrors] = useState<{ [stepId: string]: string }>({});
    const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));

    const currentStepIndex = controlledStep !== undefined ? controlledStep : internalStep;
    const currentStepData = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;
    const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

    useEffect(() => {
      if (persistData) {
        const savedData = localStorage.getItem('multiStepFormData');
        if (savedData) {
          try {
            setStepData(JSON.parse(savedData));
          } catch {
            // Failed to load saved form data
          }
        }
      }
    }, [persistData]);

    useEffect(() => {
      if (persistData && Object.keys(stepData).length > 0) {
        localStorage.setItem('multiStepFormData', JSON.stringify(stepData));
      }
    }, [stepData, persistData]);

    const validateStep = useCallback((stepIndex: number, data: Record<string, unknown>): boolean => {
      const step = steps[stepIndex];
      if (!step.validation) return true;

      try {
        step.validation.parse(data);
        setStepErrors(prev => {
          const next = { ...prev };
          delete next[step.id];
          return next;
        });
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = error.issues.map(e => e.message).join(', ');
          setStepErrors(prev => ({
            ...prev,
            [step.id]: errorMessage
          }));
        }
        return false;
      }
    }, [steps]);

    const handleStepChange = useCallback((newStep: number) => {
      if (newStep < 0 || newStep >= steps.length) return;

      setVisitedSteps(prev => new Set([...prev, newStep]));
      
      if (controlledStep === undefined) {
        setInternalStep(newStep);
      }
      
      onStepChange?.(newStep);
    }, [controlledStep, onStepChange, steps.length]);

    const handleNext = useCallback(() => {
      const currentData = stepData[currentStepData.id] || {};
      
      if (!currentStepData.isOptional && !validateStep(currentStepIndex, currentData)) {
        return;
      }

      if (isLastStep) {
        // Validate all required steps before completion
        const allValid = steps.every((step, index) => {
          if (step.isOptional) return true;
          return validateStep(index, stepData[step.id] || {});
        });

        if (allValid) {
          onComplete(stepData);
          if (persistData) {
            localStorage.removeItem('multiStepFormData');
          }
        }
      } else {
        handleStepChange(currentStepIndex + 1);
      }
    }, [
      currentStepData,
      currentStepIndex,
      isLastStep,
      stepData,
      steps,
      validateStep,
      handleStepChange,
      onComplete,
      persistData
    ]);

    const handlePrevious = useCallback(() => {
      handleStepChange(currentStepIndex - 1);
    }, [currentStepIndex, handleStepChange]);

    const handleSkip = useCallback(() => {
      if (allowSkip && currentStepData.isOptional) {
        handleNext();
      }
    }, [allowSkip, currentStepData, handleNext]);

    const updateStepData = useCallback((data: Record<string, unknown>) => {
      setStepData(prev => ({
        ...prev,
        [currentStepData.id]: data
      }));
    }, [currentStepData]);

    const handleStepClick = useCallback((stepIndex: number) => {
      // Allow navigation to visited steps or previous steps
      if (stepIndex <= currentStepIndex || visitedSteps.has(stepIndex)) {
        // Validate current step before navigating away
        const currentData = stepData[currentStepData.id] || {};
        if (currentStepData.isOptional || validateStep(currentStepIndex, currentData)) {
          handleStepChange(stepIndex);
        }
      }
    }, [currentStepIndex, currentStepData, stepData, visitedSteps, validateStep, handleStepChange]);

    return (
      <div
        ref={ref}
        className={cn('w-full max-w-4xl mx-auto', className)}
        role="form"
        aria-label="Multi-step form"
      >
        {/* Progress Bar */}
        {showProgressBar && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(index)}
                  disabled={!visitedSteps.has(index) && index > currentStepIndex}
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full transition-all',
                    'text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                    index === currentStepIndex && 'bg-blue-600 text-white focus:ring-blue-500',
                    index < currentStepIndex && 'bg-green-600 text-white hover:bg-green-700',
                    index > currentStepIndex && visitedSteps.has(index) && 
                      'bg-yellow-500 text-white hover:bg-yellow-600',
                    index > currentStepIndex && !visitedSteps.has(index) && 
                      'bg-gray-200 text-gray-400 cursor-not-allowed'
                  )}
                  aria-label={`Step ${index + 1}: ${step.title}`}
                  aria-current={index === currentStepIndex ? 'step' : undefined}
                >
                  {index < currentStepIndex ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </button>
              ))}
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                  role="progressbar"
                  aria-label={`Step ${currentStepIndex + 1} of ${steps.length}`}
                  aria-valuenow={currentStepIndex + 1}
                  aria-valuemin={1}
                  aria-valuemax={steps.length}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {currentStepData.title}
              {currentStepData.isOptional && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (Optional)
                </span>
              )}
            </h2>
            {currentStepData.description && (
              <p className="mt-2 text-gray-600">{currentStepData.description}</p>
            )}
          </div>

          {/* Error Message */}
          {stepErrors[currentStepData.id] && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{stepErrors[currentStepData.id]}</p>
            </div>
          )}

          {/* Dynamic Step Content */}
          <div className="step-content">
            {typeof currentStepData.content === 'function'
              ? currentStepData.content({
                  data: stepData[currentStepData.id] || {},
                  updateData: updateStepData,
                  errors: stepErrors[currentStepData.id]
                })
              : currentStepData.content}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {!isFirstStep && (
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrevious}
                leftIcon={<ChevronLeft className="h-4 w-4" />}
              >
                Previous
              </Button>
            )}
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {allowSkip && currentStepData.isOptional && !isLastStep && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
              >
                Skip
              </Button>
            )}
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              rightIcon={!isLastStep && <ChevronRight className="h-4 w-4" />}
            >
              {isLastStep ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Step Indicator Text */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Step {currentStepIndex + 1} of {steps.length}
        </div>
      </div>
    );
  }
);

MultiStepForm.displayName = 'MultiStepForm';