import { cva, type VariantProps } from 'class-variance-authority';

import { Box, BoxProps } from './box';
import { cn } from '@/lib/utils';

const skeletonVariants = cva('animate-pulse bg-gray-200 pointer-events-none', {
  variants: {
    rounded: {
      sm: 'rounded-sm',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    rounded: 'sm',
  },
});

type SkeletonProps = BoxProps & VariantProps<typeof skeletonVariants>;

export function Skeleton({ className, rounded, ...rest }: SkeletonProps) {
  return (
    <Box className={cn(skeletonVariants({ className, rounded }))} {...rest} />
  );
}
