'use client';

import { createPromptAction } from '@/app/prompts/actions/create-prompt-action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreatePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPromptAction,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['prompts'] });
      }
    },
  });
}
