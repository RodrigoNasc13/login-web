import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  withError?: boolean;
  count?: number;
  limit?: number;
}

export function Root({
  className,
  withError,
  count,
  limit,
  children,
  ...rest
}: RootProps) {
  return (
    <div
      {...rest}
      className={twMerge(
        'group relative flex w-full items-center gap-3 rounded-t-xl border-outline border-b-2 bg-default-gray px-4 py-4 transition-all',

        'focus-within:border-primary focus-within:shadow-[0_2px_15px_-3px_rgba(182,160,255,0.2)]',

        'has-disabled:cursor-not-allowed has-disabled:opacity-50',

        withError &&
          'border-red-500 focus-within:border-red-500 focus-within:shadow-[0_2px_15px_-3px_rgba(239,68,68,0.2)]',

        !withError &&
          'focus-secondary border-secondary focus-within:border-primary',

        className,
      )}
    >
      {children}

      {limit && (
        <p className="absolute right-0 -bottom-6 select-none font-label text-outline text-xs">
          {count}/{limit}
        </p>
      )}
    </div>
  );
}
