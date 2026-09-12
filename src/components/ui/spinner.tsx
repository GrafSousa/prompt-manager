import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
const spinnerVariants = cva(
  'animate-spin inline-block rounded-full border border-t-transparent',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-6',
        lg: 'size-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type SpinnerProps = React.ComponentProps<'div'> &
  VariantProps<typeof spinnerVariants>;

export function Spinner(props: SpinnerProps) {
  const { size, className, ...rest } = props;

  return (
    <div
      className={cn(spinnerVariants({ size, className }))}
      role="status"
      aria-label="loading"
      {...rest}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
