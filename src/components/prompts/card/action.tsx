import { ComponentProps, ElementType } from 'react';

import { Button } from '@/components/ui/button';

type PromptCardActionProps = ComponentProps<'button'> & {
  loading?: boolean;
  icon: ElementType;
};

export function PromptCardAction({
  loading,
  icon: Icon,
  ...rest
}: PromptCardActionProps) {
  return (
    <Button loading={loading} variant="ghost" size="icon" {...rest}>
      <Icon color="#ff5c5c" />
    </Button>
  );
}
