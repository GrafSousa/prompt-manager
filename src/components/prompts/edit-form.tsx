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
  const { isPending, mutateAsync } = useEditPrompt();

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
      className="grid grid-cols-3 mt-30 px-4 space-y-8"
    >
      <header className="col-span-3 flex justify-end gap-4">
        <Button variant="ghost" className="w-27">
          Copy
        </Button>

        <Button
          type="submit"
          form="edit-prompt-form"
          className="w-37.5"
          disabled={!isValid || isPending}
          loading={isPending}
        >
          Save
        </Button>
      </header>

      <Input.Root className="col-span-3">
        <Input.Content variant={errors?.title ? 'error' : 'transparent'}>
          <label htmlFor="prompt-title" className="sr-only">
            Prompt title
          </label>
          <Input.Control
            size="lg"
            id="prompt-title"
            placeholder="Prompt title"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'prompt-title-error' : undefined}
            {...register('title')}
          />
        </Input.Content>

        <div className="h-4">
          {errors?.title?.message && (
            <Input.Error
              message={errors.title.message}
              id="prompt-title-error"
            />
          )}
        </div>
      </Input.Root>

      <TextArea.Root className="col-span-3">
        <label htmlFor="prompt-content" className="sr-only">
          Prompt content
        </label>
        <TextArea.Content
          id="prompt-content"
          variant={errors?.content ? 'error' : 'default'}
          placeholder="Prompt content"
          aria-invalid={Boolean(errors.content)}
          aria-describedby={errors.content ? 'prompt-content-error' : undefined}
          {...register('content')}
        />
        {errors?.content?.message && (
          <TextArea.Error
            message={errors.content.message}
            id="prompt-content-error"
          />
        )}
      </TextArea.Root>
    </form>
  );
}
