import { ComponentProps, ElementType } from 'react';

import { Button } from '@/components/ui/button';

type PromptCardActionProps = ComponentProps<'button'> & {
  icon: ElementType;
};

export function PromptCardAction({
  icon: Icon,
  ...rest
}: PromptCardActionProps) {
  return (
    <Button variant="ghost" size="icon" {...rest}>
      <Icon color="#ff5c5c" />
    </Button>
  );
}
