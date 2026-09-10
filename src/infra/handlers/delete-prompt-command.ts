import { DeletePromptUseCase } from '@/domain/prompt/application/use-cases/delete-prompt';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface DeletePromptRequest {
  id: string;
}

export class DeletePromptCommand {
  constructor(private deletePromptUseCase: DeletePromptUseCase) {}

  async handle({ id }: DeletePromptRequest) {
    const result = await this.deletePromptUseCase.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw error;
        default:
          throw new Error('500 - Internal Server Error');
      }
    }

    const { success } = result.value;

    return { success };
  }
}
