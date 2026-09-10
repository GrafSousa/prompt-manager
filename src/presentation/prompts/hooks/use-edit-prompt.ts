'use client';

import { editPromptAction } from '@/app/prompts/actions/edit-prompt-action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditPrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPromptAction,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['prompts'] });
      }
    },
  });
}
