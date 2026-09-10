'use client';

import { Trash } from 'lucide-react';
import { toast } from 'sonner';

import { PromptResponseDTO } from '@/infra/dtos/prompt-dto';

import { PromptCardRoot } from './root';
import { PromptCardTitle } from './title';
import { PromptCardContent } from './content';
import { PromptCardAction } from './action';
import { useDeletePrompt } from '@/presentation/prompts/hooks/use-delete-prompt';
import { useRouter } from 'next/navigation';

interface PromptCardProps {
  prompt: PromptResponseDTO;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const { mutateAsync } = useDeletePrompt();
  const router = useRouter();

  async function handleDelete(id: string) {
    const response = await mutateAsync({ id });

    if (response?.success) {
      toast.success(response.message);
    } else {
      toast.error(response?.message);
    }
  }

  function handleCardClick() {
    router.push(`/prompts/edit/${prompt.id}`);
  }

  return (
    <PromptCardRoot id={prompt.id}>
      <div className="flex flex-col truncate">
        <PromptCardTitle title={prompt.title} />
        <PromptCardContent content={prompt.content} />
      </div>

      <PromptCardAction icon={Trash} onClick={() => handleDelete(prompt.id)} />
    </PromptCardRoot>
  );
}
