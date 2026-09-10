'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/textarea';

import { PromptResponseDTO } from '@/infra/dtos/prompt-dto';
import { useEditPrompt } from '@/presentation/prompts/hooks/use-edit-prompt';

const editPromptSchema = z.object({
  title: z.string().trim().min(1, 'Title required'),
  content: z.string().trim().min(1, 'Content required'),
});

export type EditPromptFormData = z.infer<typeof editPromptSchema>;

interface EditPromptFormProps {
  prompt: PromptResponseDTO;
}

export function EditPromptForm({ prompt }: EditPromptFormProps) {
  const { mutateAsync } = useEditPrompt();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<EditPromptFormData>({
    defaultValues: {
      title: prompt.title,
      content: prompt.content,
    },
    resolver: zodResolver(editPromptSchema),
  });

  const onSubmit: SubmitHandler<EditPromptFormData> = async (data) => {
    const { success, message } = await mutateAsync({ id: prompt.id, ...data });

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <form
      id="edit-prompt-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col py-16 px-31 space-y-8"
    >
      <header className="flex gap-4 flex-row justify-end">
        <Button variant="ghost" className="w-27">
          Copy
        </Button>

        <Button
          type="submit"
          form="edit-prompt-form"
          className="w-37.5"
          disabled={!isValid}
        >
          Save
        </Button>
      </header>

      <Input.Root>
        <Input.Content variant={errors?.title ? 'error' : 'transparent'}>
          <Input.Control
            size="lg"
            placeholder="Prompt title"
            {...register('title')}
          />
        </Input.Content>

        <div className="h-4">
          {errors?.title?.message && (
            <Input.Error message={errors.title.message} />
          )}
        </div>
      </Input.Root>

      <TextArea.Root>
        <TextArea.Content
          variant={errors?.content ? 'error' : 'default'}
          placeholder="Prompt content"
          {...register('content')}
        />
        {errors?.content?.message && (
          <TextArea.Error message={errors.content.message} />
        )}
      </TextArea.Root>
    </form>
  );
}
