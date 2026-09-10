import { EditPromptForm } from '@/components/prompts/edit-form';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { PromptResponseDTO } from '@/infra/dtos/prompt-dto';
import { getPromptQuery } from '@/presentation/prompts/queries/get-prompt-query';
import { notFound } from 'next/navigation';

interface EditPromptPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getPrompt(id: string): Promise<PromptResponseDTO> {
  try {
    const { prompt } = await getPromptQuery({ id });

    return prompt;
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      notFound();
    }

    throw error;
  }
}

export default async function EditPromptPage({ params }: EditPromptPageProps) {
  const { id } = await params;

  const prompt = await getPrompt(id);

  return <EditPromptForm prompt={prompt} />;
}
