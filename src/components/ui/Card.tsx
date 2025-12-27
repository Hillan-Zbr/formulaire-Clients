import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl text-slate-950 shadow-xl shadow-blue-900/5",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
