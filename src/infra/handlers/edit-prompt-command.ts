import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { EditPromptRequest } from '@/domain/prompt/application/dtos/edit-prompt-request';
import { EditPromptUseCase } from '@/domain/prompt/application/use-cases/edit-prompt';
import { InvalidContentError } from '@/domain/prompt/application/use-cases/errors/invalid-content-error';
import { InvalidTitleError } from '@/domain/prompt/application/use-cases/errors/invalid-title-error';

export class EditPromptCommand {
  constructor(private editPromptUseCase: EditPromptUseCase) {}

  async handle(request: EditPromptRequest) {
    const result = await this.editPromptUseCase.execute(request);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
        case InvalidTitleError:
        case InvalidContentError:
          throw error;
        default:
          throw new Error('500 - Internal Server Error');
      }
    }

    const { success } = result.value;

    return { success };
  }
}
