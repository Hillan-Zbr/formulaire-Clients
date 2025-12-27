import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Barre de fond grise */}
        <div className="absolute left-0 top-1/2 -z-20 h-1 w-full -translate-y-1/2 bg-slate-200 rounded-full" />
        
        {/* Barre de progression colorée (Animée) */}
        <motion.div 
          className="absolute left-0 top-1/2 -z-10 h-1 -translate-y-1/2 bg-blue-600 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentStep - 1) / (steps.length - 1) }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ width: '100%' }}
        />
        
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div key={step} className="flex flex-col items-center px-2 z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent ? '#2563eb' : '#ffffff', // blue-600 vs white
                  borderColor: isCompleted || isCurrent ? '#2563eb' : '#cbd5e1', // blue-600 vs slate-300
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm transition-colors duration-300",
                  isCompleted || isCurrent ? "text-white" : "text-slate-400"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-bold">{stepNumber}</span>
                )}
              </motion.div>
              <span
                className={cn(
                  "mt-3 text-sm font-medium transition-colors duration-300",
                  isCurrent ? "text-blue-700" : isCompleted ? "text-blue-600" : "text-slate-400"
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
