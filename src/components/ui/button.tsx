import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';
import { Box } from './box';
import { Spinner } from './spinner';
import { Typography } from './typography';

const buttonVariants = cva(
  twMerge(
    'inline-flex shrink-0 items-center px-6 w-full justify-center',
    'rounded-md border border-transparent bg-clip-padding whitespace-nowrap',
    'transition-all outline-none select-none',
    'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
    'active:not-aria-[haspopup]:translate-y-px',
    'hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
    'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40'
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary',
        ghost: 'hover:bg-gray-200',
      },
      size: {
        default: 'h-11',
        'icon-sm': 'p-1 size-6',
        icon: 'p-3 size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

function Button(props: ButtonProps) {
  const {
    className,
    type = 'button',
    variant = 'default',
    size = 'default',
    loading = false,
    ...rest
  } = props;

  if (loading) {
    return (
      <Box
        className={cn(
          buttonVariants({ variant, size, className: `${className} gap-2` })
        )}
      >
        <Spinner size="sm" />
        {size !== 'icon' && (
          <Typography variant="body-xs">Loading...</Typography>
        )}
      </Box>
    );
  }

  return (
    <ButtonPrimitive
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    />
  );
}

export { Button, buttonVariants };
