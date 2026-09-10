import { PromptsPresenter } from '@/presentation/prompts/presenters/prompts-presenter';
import { GetPromptRequest } from '@/domain/prompt/application/dtos/get-prompt-request';
import { GetPromptUseCase } from '@/domain/prompt/application/use-cases/get-prompt';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

export class GetPromptQuery {
  constructor(private getPromptUseCase: GetPromptUseCase) {}

  async handle({ id }: GetPromptRequest) {
    const result = await this.getPromptUseCase.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw error;
        default:
          throw new Error('500 - Internal Server Error');
      }
    }

    const { prompt, success } = result.value;

    return {
      success,
      prompt: PromptsPresenter.toView(prompt),
    };
  }
}
