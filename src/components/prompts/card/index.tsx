'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';

import { PromptResponseDTO } from '@/infra/dtos/prompt-dto';

import { PromptCardRoot } from './root';
import { PromptCardTitle } from './title';
import { PromptCardContent } from './content';
import { PromptCardAction } from './action';
import { useDeletePrompt } from '@/presentation/prompts/hooks/use-delete-prompt';

interface PromptCardProps {
  prompt: PromptResponseDTO;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const { isPending, mutateAsync } = useDeletePrompt();

  async function handleDelete(id: string) {
    const response = await mutateAsync({ id });

    if (response?.success) {
      toast.success(response.message);
    } else {
      toast.error(response?.message);
    }
  }

  return (
    <PromptCardRoot id={prompt.id}>
      <Link
        href={`/prompts/${prompt.id}/edit`}
        className="min-w-0 flex-1 cursor-pointer overflow-hidden"
      >
        <PromptCardTitle title={prompt.title} />
        <PromptCardContent content={prompt.content} />
      </Link>

      <PromptCardAction
        loading={isPending}
        icon={Trash}
        onClick={() => handleDelete(prompt.id)}
        aria-label={`Delete ${prompt.title}`}
      />
    </PromptCardRoot>
  );
}
