import { deletePromptAction } from '@/app/prompts/actions/delete-prompt-action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeletePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePromptAction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prompts'] }),
  });
}
