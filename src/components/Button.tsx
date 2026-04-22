import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'flex items-center justify-center gap-2 rounded-xl font-headline font-bold transition-all cursor-pointer active:scale-[0.98]',

  variants: {
    variant: {
      primary:
        'bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-400 shadow-[0_0px_15px_rgba(139,92,246,0.3)] hover:from-violet-500 hover:via-violet-400 hover:to-indigo-400 transform hover:-translate-y-0.5 hover:shadow-primary/40 hover:scale-[1.02]',
      secondary:
        'bg-surface-container border border-outline-variant/20 text-on-surface hover:bg-surface-container-high',
      ghost: 'bg-transparent text-primary hover:bg-primary/10',
    },
    size: {
      md: 'py-3 text-sm',
      lg: 'py-4 text-base',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none active:scale-100 hover:scale-100',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, disabled, class: className })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
