'use server';

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { EditPromptRequest } from '@/domain/prompt/application/dtos/edit-prompt-request';
import { InvalidContentError } from '@/domain/prompt/application/use-cases/errors/invalid-content-error';
import { InvalidTitleError } from '@/domain/prompt/application/use-cases/errors/invalid-title-error';
import { MakeEditPromptCommandFactory } from '@/infra/factories/make-edit-prompt-command';

interface ActionResponse {
  success: boolean;
  message: string;
}

export async function editPromptAction(
  request: EditPromptRequest
): Promise<ActionResponse> {
  try {
    const { success } =
      await MakeEditPromptCommandFactory.create().handle(request);

    return {
      success,
      message: 'Prompt edited!',
    };
  } catch (error) {
    if (
      error instanceof InvalidTitleError ||
      error instanceof ResourceNotFoundError ||
      error instanceof InvalidContentError
    ) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Unable to edit the prompt. Please try again.',
    };
  }
}
