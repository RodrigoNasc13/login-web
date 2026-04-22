import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
  base: 'rounded-2xl text-white font-body overflow-hidden',
  variants: {
    variant: {
      default: 'bg-default-gray border border-outline/20',
      glass:
        'bg-[#181920]/40 backdrop-blur-[20px] border border-white/10 shadow-xl',
      outline: 'bg-transparent border-2 border-outline/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export function Card({ className, variant, ...props }: CardProps) {
  return (
    <div className={cardVariants({ variant, class: className })} {...props} />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 pb-3 ${className}`}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-bold font-headline text-xl tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  );
}
