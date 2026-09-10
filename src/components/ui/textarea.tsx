import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { cva, VariantProps } from 'class-variance-authority';

import { Typography } from './typography';
import { cn } from '@/lib/utils';

const textAreaContentVariants = cva(
  twMerge(
    'w-full min-h-30 px-4 py-2 min-w-0 text-white text-base leading-8 rounded-md resize-y',
    'shadow-xs transition-[color,box-shadow] outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20'
  ),
  {
    variants: {
      variant: {
        default: twMerge(
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
        ),
        error: twMerge(
          'border border-alert-600 py-2',
          'focus-within:border-ring focus-within:ring-2 focus-within:ring-alert-600/50'
        ),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type TextAreaRootProps = React.ComponentProps<'div'>;

function TextAreaRoot(props: TextAreaRootProps) {
  return <div className="space-y-2" {...props} />;
}

type TextAreaProps = React.ComponentProps<'textarea'> &
  VariantProps<typeof textAreaContentVariants>;

export const TextAreaContent = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ className, variant, ...rest }: TextAreaProps, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(textAreaContentVariants({ className, variant }))}
      {...rest}
    />
  );
});

TextAreaContent.displayName = 'TextAreaContent';

interface TextAreaErrorProps {
  message: string;
}

function TextAreaError({ message }: TextAreaErrorProps) {
  return (
    <Typography variant="body-xs" className="text-alert-600">
      {message}
    </Typography>
  );
}

export const TextArea = {
  Root: TextAreaRoot,
  Content: TextAreaContent,
  Error: TextAreaError,
};
