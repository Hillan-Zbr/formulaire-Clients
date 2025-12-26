import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
        
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div key={step} className="flex flex-col items-center bg-gray-50 px-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300",
                  isCompleted
                    ? "border-blue-600 bg-blue-600 text-white"
                    : isCurrent
                    ? "border-blue-600 bg-white text-blue-600"
                    : "border-gray-300 bg-white text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-semibold">{stepNumber}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium transition-colors duration-300",
                  isCurrent || isCompleted ? "text-blue-600" : "text-gray-400"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

