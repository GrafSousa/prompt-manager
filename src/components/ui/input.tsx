import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { twMerge } from 'tailwind-merge';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Typography } from './typography';

const inputContentVariants = cva(
  twMerge(
    'w-full min-w-0 text-white px-4 rounded-md border border-input',
    'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50',
    'shadow-xs transition-[color,box-shadow] outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20'
  ),
  {
    variants: {
      variant: {
        default: twMerge(
          'flex flex-row gap-1.5 items-center',
          ' bg-background'
        ),
        error: twMerge(
          'border border-alert-600 py-2',
          'focus-within:border-ring focus-within:ring-2 focus-within:ring-alert-600/50'
        ),
        transparent: 'py-2 border border-transparent bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const inputControlVariants = cva(
  'w-full outline-none placeholder:text-muted-foreground placeholder:leading-body',
  {
    variants: {
      size: {
        default:
          'h-11 text-base font-normal leading-body placeholder:text-base',
        lg: 'font-semibold text-3xl placeholder:text-3xl placeholder:font-bold',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

type DivProps = React.ComponentProps<'div'>;

function InputPrefix(props: DivProps) {
  return <div {...props} />;
}

type InputContentProps = DivProps & VariantProps<typeof inputContentVariants>;
type InputControlProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputControlVariants>;

function InputRoot(props: DivProps) {
  return <div className="space-y-2" {...props} />;
}

function InputContent(props: InputContentProps) {
  const { variant, className, ...rest } = props;

  return (
    <div
      className={cn(inputContentVariants({ variant, className }))}
      {...rest}
    />
  );
}

const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>(
  ({ type, size, className, ...props }, ref) => {
    return (
      <InputPrimitive
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputControlVariants({ size, className }))}
        {...props}
      />
    );
  }
);

InputControl.displayName = 'InputControl';

interface InputErrorProps extends React.ComponentProps<'span'> {
  message: string;
}

function InputError({ message, ...rest }: InputErrorProps) {
  return (
    <Typography variant="body-xs" className="text-alert-600" {...rest}>
      {message}
    </Typography>
  );
}

export const Input = {
  Root: InputRoot,
  Content: InputContent,
  Error: InputError,
  Prefix: InputPrefix,
  Control: InputControl,
};
