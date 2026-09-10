'use server';

import { NewPromptFormData } from '@/components/prompts/edit-form';
import { InvalidContentError } from '@/domain/prompt/application/use-cases/errors/invalid-content-error';
import { InvalidTitleError } from '@/domain/prompt/application/use-cases/errors/invalid-title-error';
import { MakeCreatePromptCommandFactory } from '@/infra/factories/make-create-prompt-command';

interface ActionResponse {
  success: boolean;
  message: string;
}

export async function createPromptAction(
  request: NewPromptFormData
): Promise<ActionResponse> {
  try {
    const { success } =
      await MakeCreatePromptCommandFactory.create().handle(request);

    return {
      success,
      message: 'Prompt created!',
    };
  } catch (error) {
    if (
      error instanceof InvalidTitleError ||
      error instanceof InvalidContentError
    ) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Unable to create the prompt. Please try again.',
    };
  }
}
