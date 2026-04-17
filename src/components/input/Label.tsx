import type { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: string;
  mandatory?: boolean;
  htmlFor?: string;
}

export function Label({
  mandatory,
  children,
  className,
  htmlFor,
  ...rest
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        'mb-2 ml-1 block font-body font-medium text-outline text-sm transition-colors group-focus-within:text-primary',
        className,
      )}
      {...rest}
    >
      {children} {mandatory && <span className="text-red-500">*</span>}
    </label>
  );
}
