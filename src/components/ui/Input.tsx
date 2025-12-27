import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2 group">
        <label className="text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-blue-600">
          {label}
        </label>
        <input
          className={cn(
            "flex h-12 w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-3 text-sm ring-offset-white transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-300 focus:border-red-500 focus:ring-red-100",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm font-medium text-red-500 animate-pulse">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
