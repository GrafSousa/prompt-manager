import { CreatePromptRequest } from '@/domain/prompt/application/dtos/create-prompt-request';
import { CreatePromptUseCase } from '@/domain/prompt/application/use-cases/create-prompt';
import { InvalidContentError } from '@/domain/prompt/application/use-cases/errors/invalid-content-error';
import { InvalidTitleError } from '@/domain/prompt/application/use-cases/errors/invalid-title-error';

export class CreatePromptCommand {
  constructor(private createPromptUseCase: CreatePromptUseCase) {}

  async handle(request: CreatePromptRequest) {
    const result = await this.createPromptUseCase.execute(request);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidTitleError:
          throw error;
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
