'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/textarea';
import { useCreatePrompt } from '@/presentation/prompts/hooks/use-create-prompt';

const newPromptSchema = z.object({
  title: z.string().trim().min(1, 'Title required'),
  content: z.string().trim().min(1, 'Content required'),
});

export type NewPromptFormData = z.infer<typeof newPromptSchema>;

export function NewPromptForm() {
  const { mutateAsync } = useCreatePrompt();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<NewPromptFormData>({
    resolver: zodResolver(newPromptSchema),
  });

  const onSubmit: SubmitHandler<NewPromptFormData> = async (data) => {
    const { success, message } = await mutateAsync(data);

    if (success) {
      toast.success(message);

      reset();
    } else {
      toast.error(message);
    }
  };

  return (
    <form
      id="new-prompt-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col py-16 px-31 space-y-8"
    >
      <header className="flex gap-4 flex-row justify-end">
        <Button variant="ghost" className="w-27">
          Copiar
        </Button>

        <Button
          type="submit"
          form="new-prompt-form"
          className="w-37.5"
          disabled={!isValid}
        >
          Salvar
        </Button>
      </header>

      <Input.Root>
        <Input.Content variant={errors?.title ? 'error' : 'transparent'}>
          <Input.Control
            size="lg"
            placeholder="Título do prompt"
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
          placeholder="Conteúdo do prompt"
          {...register('content')}
        />
        {errors?.content?.message && (
          <TextArea.Error message={errors.content.message} />
        )}
      </TextArea.Root>
    </form>
  );
}
