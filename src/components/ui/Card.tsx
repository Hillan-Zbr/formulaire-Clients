import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-white/50 bg-white/80 backdrop-blur-sm text-slate-950 shadow-xl shadow-slate-200/50",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
