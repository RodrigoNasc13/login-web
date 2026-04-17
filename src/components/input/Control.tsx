import { forwardRef, type InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ControlProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Control = forwardRef<HTMLInputElement, ControlProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        className={twMerge(
          'flex-1 border-0 bg-transparent p-0 font-body text-white outline-none placeholder:text-outline focus-visible:outline-none disabled:cursor-not-allowed [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]',
          className,
        )}
      />
    );
  },
);
