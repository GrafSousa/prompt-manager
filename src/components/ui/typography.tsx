import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ElementType } from 'react';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      'heading-hg': 'text-5xl font-bold text-leading-heading',
      'heading-xl': 'text-3xl font-bold leading-heading',
      'heading-lg': 'text-heading-lg font-bold leading-heading',
      'heading-md': 'text-heading-md font-bold leading-heading',
      'heading-sm': 'text-xl font-bold leading-heading',
      'heading-xs': 'text-base font-bold leading-heading',

      'body-md': 'text-base font-normal leading-body',
      'body-sm': 'text-sm font-normal leading-body',
      'body-xs': 'text-xs font-normal leading-body',
    },
  },
  defaultVariants: {
    variant: 'body-md',
  },
});

type TypographyVariantProps = VariantProps<typeof typographyVariants>;

interface TypographyProps<
  T extends ElementType,
> extends TypographyVariantProps {
  as?: T;
}

export function Typography<T extends ElementType = 'span'>(
  props: TypographyProps<T> & Omit<ComponentProps<T>, keyof TypographyProps<T>>
) {
  const { as, children, className, variant = 'body-md', ...rest } = props;

  const Component = as || 'span';

  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...rest}
    >
      {children}
    </Component>
  );
}
