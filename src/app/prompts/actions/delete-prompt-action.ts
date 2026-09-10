'use server';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { MakeDeletePromptCommandFactory } from '@/infra/factories/make-delete-prompt-command';

interface ActionResponse {
  success: boolean;
  message: string;
}

interface DeletePromptActionRequest {
  id: string;
}

export async function deletePromptAction({
  id,
}: DeletePromptActionRequest): Promise<ActionResponse> {
  try {
    const { success } = await MakeDeletePromptCommandFactory.create().handle({
      id,
    });

    return {
      success,
      message: 'Prompt deleted!',
    };
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Unable to delete the prompt. Please try again.',
    };
  }
}
