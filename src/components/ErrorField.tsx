import { TriangleAlert } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ErrorFieldProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export function ErrorField({ children, className, ...rest }: ErrorFieldProps) {
  return (
    <span
      {...rest}
      className={twMerge(
        'flex items-center justify-start gap-1.5',
        'font-label font-medium text-red-500/90 text-xs tracking-wide',
        'mt-1 drop-shadow-[0_0_8px_rgba(239,68,68,0.2)]',
        className,
      )}
    >
      <TriangleAlert size={14} className="text-red-500/90" />
      {children}
    </span>
  );
}
