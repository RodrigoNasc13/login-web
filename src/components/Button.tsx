import type { ButtonHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-xl font-headline font-bold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian',

  variants: {
    variant: {
      primary:
        'bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-400 shadow-[0_0px_15px_rgba(139,92,246,0.3)] hover:from-violet-500 hover:via-violet-400 hover:to-indigo-400 transform hover:-translate-y-0.5 hover:shadow-primary/40 hover:scale-[1.02]',
      outline:
        'border border-outline-variant/30 bg-transparent text-slate-200 hover:border-primary/50 hover:bg-surface-container/60',
      ghost: 'bg-transparent text-primary hover:bg-primary/10 hover:text-white',
      destructive:
        'bg-gradient-to-r from-red-600 via-rose-500 to-orange-400 text-white shadow-[0_0px_15px_rgba(244,63,94,0.25)] hover:from-red-500 hover:via-rose-400 hover:to-orange-300',
      link: 'h-auto rounded-none bg-transparent p-0 text-primary underline-offset-4 hover:underline',
    },
    size: {
      sm: 'min-h-9 px-4 py-2 text-sm',
      md: 'min-h-10 px-5 py-2.5 text-sm',
      lg: 'min-h-12 px-6 py-3 text-base',
      icon: 'h-10 w-10 p-0',
    },
    disabled: {
      true: 'pointer-events-none cursor-not-allowed opacity-50 active:scale-100 hover:translate-y-0 hover:scale-100',
    },
    fullWidth: {
      true: 'w-full',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    fullWidth: false,
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  disabled,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({
        variant,
        size,
        disabled,
        fullWidth,
        class: className,
      })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
