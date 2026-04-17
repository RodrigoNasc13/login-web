import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface PrefixProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Prefix({ className, children, ...rest }: PrefixProps) {
  return (
    <div
      {...rest}
      className={twMerge(
        'flex items-center text-outline transition-colors group-focus-within:text-primary',
        className,
      )}
    >
      {children}
    </div>
  );
}
